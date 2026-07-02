import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matter Intake Evaluator | Perkins Coie",
  description:
    "AI-powered legal matter intake evaluation for Perkins Coie — classify, assess risk, check conflicts, and recommend staffing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
