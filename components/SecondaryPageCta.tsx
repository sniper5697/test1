import Link from "next/link";

type SecondaryPageCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function SecondaryPageCta({
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: SecondaryPageCtaProps) {
  return (
    <section className="section-card secondary-cta-band">
      <div className="secondary-cta-band__body">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="title-md">{title}</h2>
        <p className="muted secondary-lead">{body}</p>
      </div>
      <div className="secondary-cta-band__actions">
        <Link className="primary-button" href={primaryHref}>
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link className="secondary-link-button" href={secondaryHref}>
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
