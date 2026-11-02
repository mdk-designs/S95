import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="page-intro">
      <div className="container">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="rise" style={{ "--d": "120ms" } as React.CSSProperties}>
          {title}
        </h1>
        {children && (
          <div className="lead rise" style={{ "--d": "260ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
