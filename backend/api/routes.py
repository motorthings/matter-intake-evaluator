"""API routes for the Matter Intake Evaluator."""

from fastapi import APIRouter

from evaluator import (
    EVALUATOR_MODEL,
    ROUTER_MODEL,
    PipelineTimer,
    calculate_overall_score,
    run_evaluator,
    run_router,
)
from logger import get_logger
from models import EvaluateRequest, EvaluateResponse

log = get_logger("api")
router = APIRouter(prefix="/api", tags=["evaluate"])


@router.post("/evaluate", response_model=EvaluateResponse)
async def evaluate_matter(request: EvaluateRequest):
    """
    Evaluate a legal matter intake summary.

    Two-stage pipeline:
      1. Router classifies the matter into a practice area
      2. Evaluator scores across 5 dimensions

    Returns structured JSON with scores, reasoning, risk level, and recommendations.
    """
    timer = PipelineTimer()

    log.info(
        "evaluation_start",
        extra={
            "event_type": "evaluation_start",
            "context": None,
            "data": {"summary_length": len(request.matter_summary)},
            "duration_ms": 0,
        },
    )

    # Stage 1: Router — classify
    router_result = await run_router(request.matter_summary)
    timer.record("router")
    log.info(
        "pipeline_stage",
        extra={
            "event_type": "pipeline_stage",
            "context": {"stage": "router"},
            "data": {
                "practice_area": router_result.get("practice_area"),
                "confidence": router_result.get("confidence"),
            },
            "duration_ms": timer.elapsed("router"),
        },
    )

    # Stage 2: Evaluator — score 5 dimensions
    evaluator_result = await run_evaluator(request.matter_summary, router_result)
    timer.record("evaluator")
    log.info(
        "pipeline_stage",
        extra={
            "event_type": "pipeline_stage",
            "context": {"stage": "evaluator"},
            "data": {},
            "duration_ms": timer.elapsed("evaluator"),
        },
    )

    # Programmatic scoring
    overall_score, risk_level, dimensions = calculate_overall_score(
        router_result, evaluator_result
    )
    timer.record("scoring")

    # Build response
    pa_data = evaluator_result.get("practice_area", {})
    response = EvaluateResponse(
        overall_score=overall_score,
        overall_risk_level=risk_level,
        practice_area={
            "practice_area": pa_data.get(
                "practice_area", router_result.get("practice_area", "Unknown")
            ),
            "confidence": pa_data.get(
                "confidence", router_result.get("confidence", 0)
            ),
            "reasoning": pa_data.get(
                "reasoning", router_result.get("reasoning", "")
            ),
        },
        urgency_risk=evaluator_result.get("urgency_risk", {}),
        conflict_check=evaluator_result.get("conflict_check", {}),
        staffing=evaluator_result.get("staffing", {}),
        data_integrity=evaluator_result.get("data_integrity", {}),
        dimension_scores=dimensions,
        processing_time_ms=timer.total_ms(),
        model_used=f"{ROUTER_MODEL} / {EVALUATOR_MODEL}",
    )

    log.info(
        "evaluation_complete",
        extra={
            "event_type": "evaluation_complete",
            "context": None,
            "data": {
                "overall_score": overall_score,
                "risk_level": risk_level,
            },
            "duration_ms": timer.total_ms(),
        },
    )

    return response
