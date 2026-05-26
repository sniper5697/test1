import type { Metadata } from "next";
import { SecondaryPageCta } from "../../components/SecondaryPageCta";
import { aboutHighlights, aboutPrinciples, contactItems } from "../../lib/page-content";

export const metadata: Metadata = {
  title: "소개 | Velora Voice",
  description:
    "소통의 가치를 더하는 Velora Voice의 미션과, 음성 경험을 제품 수준으로 끌어올리는 팀의 기준을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="section-card">
        <p className="eyebrow">회사 소개</p>
        <h1 className="title-md">Velora Voice를 만든 팀의 방향과 기준</h1>
        <p className="muted secondary-lead">
          Velora Voice는 사람과 시스템 사이의 가장 자연스러운 연결을 음성 경험으로
          다시 설계하는 팀입니다. 기술은 복잡하게 보이지 않아야 하고, 사용자는 몇 초
          안에 제품의 신뢰와 가능성을 체감할 수 있어야 한다는 기준으로 움직입니다.
        </p>
      </section>

      <section className="section-card secondary-section-spacing">
        <p className="eyebrow">핵심 방향</p>
        <div className="secondary-grid-3">
          {aboutHighlights.map((item) => (
            <article key={item.title} className="section-card secondary-surface-card">
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{item.title}</h2>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-card secondary-section-spacing secondary-grid-2"
      >
        <div>
          <p className="eyebrow">운영 원칙</p>
          <h2 className="title-md">기술적 진정성과 제품 경험을 동시에 지키는 방식</h2>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {aboutPrinciples.map((principle) => (
            <article key={principle} className="section-card secondary-surface-card--sm">
              <p style={{ margin: 0, lineHeight: 1.8 }}>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card secondary-section-spacing">
        <p className="eyebrow">연락처</p>
        <h2 className="title-md">문의와 협업을 위한 기본 정보</h2>
        <div className="secondary-grid-3">
          {contactItems.map((item) => (
            <article key={item.label} className="section-card secondary-surface-card">
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{item.label}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SecondaryPageCta
        eyebrow="데모 CTA"
        title="팀 설명보다 빠른 이해는 직접 체험에서 시작됩니다"
        body="Velora Voice가 어떤 팀인지 파악했다면, 다음은 실시간 음성 리듬을 직접 보는 단계입니다. 홈의 데모 구간에서 바로 확인할 수 있습니다."
        primaryHref="/#demo"
        primaryLabel="데모 보기"
        secondaryHref="/service"
        secondaryLabel="서비스 보기"
      />
    </div>
  );
}
