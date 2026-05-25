import type { Metadata } from "next";
import Link from "next/link";
import { FaqItem } from "../../components/FaqItem";
import { faqEntries } from "../../lib/page-content";

export const metadata: Metadata = {
  title: "FAQ | Velora Voice",
  description:
    "Velora Voice 데모 전 가장 많이 묻는 질문과 도입 전 확인해야 할 핵심 답변을 빠르게 살펴보세요.",
};

export default function FaqPage() {
  return (
    <div className="page-shell">
      <section className="section-card">
        <p className="eyebrow">FAQ</p>
        <h1 className="title-md">데모 전 가장 많이 묻는 질문을 한 자리에서 정리합니다</h1>
        <p className="muted" style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 860 }}>
          도입 전 확인해야 하는 핵심 질문을 먼저 해소하면, 데모 체험까지의 거리도
          짧아집니다. 기술 방식, 정확도, 준비 사항, 도입 흐름을 중심으로 정리했습니다.
        </p>
      </section>

      <section className="section-card" style={{ marginTop: 48 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {faqEntries.map((entry, index) => (
            <FaqItem
              id={`faq-${index + 1}`}
              key={entry.question}
              question={entry.question}
              answer={entry.answer}
            />
          ))}
        </div>
      </section>

      <section
        className="section-card"
        style={{
          marginTop: 48,
          background: "linear-gradient(180deg, #f0f6ff 0%, #e1eeff 100%)",
        }}
      >
        <p className="eyebrow">지원</p>
        <h2 className="title-md">원하는 답을 찾지 못했다면 데모로 바로 확인하세요</h2>
        <p className="muted" style={{ lineHeight: 1.8, maxWidth: 760 }}>
          FAQ에서 해결되지 않는 부분은 데모 체험을 통해 더 빠르게 이해할 수 있습니다.
        </p>
        <Link className="primary-button" href="/#demo">
          데모 보기
        </Link>
      </section>

    </div>
  );
}
