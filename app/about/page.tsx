import type { Metadata } from "next";
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
        <p className="muted" style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 860 }}>
          Velora Voice는 사람과 시스템 사이의 가장 자연스러운 연결을 음성 경험으로
          다시 설계하는 팀입니다. 기술은 복잡하게 보이지 않아야 하고, 사용자는 몇 초
          안에 제품의 신뢰와 가능성을 체감할 수 있어야 한다는 기준으로 움직입니다.
        </p>
      </section>

      <section className="section-card" style={{ marginTop: 48 }}>
        <p className="eyebrow">핵심 방향</p>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            marginTop: 24,
          }}
        >
          {aboutHighlights.map((item) => (
            <article
              key={item.title}
              className="section-card"
              style={{ padding: 24, background: "#fff", borderRadius: 24 }}
            >
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{item.title}</h2>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-card"
        style={{
          marginTop: 48,
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <div>
          <p className="eyebrow">운영 원칙</p>
          <h2 className="title-md">기술적 진정성과 제품 경험을 동시에 지키는 방식</h2>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {aboutPrinciples.map((principle) => (
            <article
              key={principle}
              className="section-card"
              style={{ padding: 20, background: "#fff", borderRadius: 22 }}
            >
              <p style={{ margin: 0, lineHeight: 1.8 }}>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" style={{ marginTop: 48 }}>
        <p className="eyebrow">연락처</p>
        <h2 className="title-md">문의와 협업을 위한 기본 정보</h2>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            marginTop: 24,
          }}
        >
          {contactItems.map((item) => (
            <article
              key={item.label}
              className="section-card"
              style={{ padding: 24, background: "#fff", borderRadius: 24 }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{item.label}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
