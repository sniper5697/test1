import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  alternateHref: string;
  alternateLabel: string;
  alternateCta: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  alternateHref,
  alternateLabel,
  alternateCta,
  children,
}: AuthCardProps) {
  return (
    <section
      className="section-card"
      style={{
        maxWidth: 560,
        width: "100%",
        margin: "0 auto",
        display: "grid",
        gap: 24,
      }}
    >
      <div>
        <p className="eyebrow">계정 진입</p>
        <h1 className="title-md">{title}</h1>
        <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
      {children}
      <p className="muted" style={{ margin: 0 }}>
        {alternateLabel}{" "}
        <Link href={alternateHref} style={{ color: "var(--primary-b)", fontWeight: 700 }}>
          {alternateCta}
        </Link>
      </p>
    </section>
  );
}
