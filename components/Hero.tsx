export function Hero() {
  return (
    <section className="section-card" aria-labelledby="hero-title">
      <p className="eyebrow">실시간 음성 AI 데모</p>
      <h1 id="hero-title" className="title-lg">
        실시간 음성 AI를
        <br />
        더 빠르고 정확하게
      </h1>
      <p className="muted" style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
        Velora Voice는 정확도, 속도, 실시간성을 하나의 경험으로 묶어 잠재 고객이
        제품의 핵심 가치를 즉시 체험할 수 있게 돕습니다.
      </p>
      <a className="primary-button" href="#demo">
        데모 보기
      </a>
    </section>
  );
}
