import type { Metadata } from "next";
import { FaqItem } from "../../components/FaqItem";
import { SecondaryPageCta } from "../../components/SecondaryPageCta";
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
        <p className="muted secondary-lead">
          도입 전 확인해야 하는 핵심 질문을 먼저 해소하면, 데모 체험까지의 거리도
          짧아집니다. 기술 방식, 정확도, 준비 사항, 도입 흐름을 중심으로 정리했습니다.
        </p>
      </section>

      <section className="section-card secondary-section-spacing">
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

      <SecondaryPageCta
        eyebrow="지원"
        title="원하는 답을 찾지 못했다면 데모로 바로 확인하세요"
        body="FAQ에서 해결되지 않는 부분은 실시간 데모를 보는 편이 더 빠릅니다. 필요하면 서비스 구조 설명도 이어서 확인할 수 있습니다."
        primaryHref="/#demo"
        primaryLabel="데모 보기"
        secondaryHref="/service"
        secondaryLabel="서비스 보기"
      />
    </div>
  );
}
