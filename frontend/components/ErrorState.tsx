interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="card border-l-4 border-l-[var(--color-error)] bg-red-50/50">
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-error)] mb-1">
            Evaluation failed
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] break-words">
            {error}
          </p>
          <button
            onClick={onRetry}
            className="mt-3 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
