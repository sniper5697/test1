export function Hero() {
  return (
    <section className="section-card hero-a1" aria-labelledby="hero-title">
      <div className="hero-a1__grid">
        <div className="hero-a1__copy">
          <p className="eyebrow">실시간 음성 AI 데모</p>
          <h1 id="hero-title" className="title-lg hero-a1__title">
            실시간 음성 AI를
            <br />
            더 빠르고 정확하게
          </h1>
          <p className="muted hero-a1__body">
            Velora Voice는 정확도, 속도, 실시간성을 하나의 경험으로 묶어 잠재 고객이
            제품의 핵심 가치를 즉시 체험할 수 있게 돕습니다.
          </p>
          <div className="hero-a1__actions">
            <a className="primary-button" href="#demo">
              데모 보기
            </a>
          </div>
        </div>

        <div className="hero-a1__visual" aria-hidden="true">
          <div className="hero-a1__panel">
            <div className="hero-a1__panel-top">
              <span className="hero-a1__pill">Live Voice Stack</span>
              <span className="hero-a1__tiny-label">Realtime</span>
            </div>

            <div className="hero-a1__bars">
              <span style={{ height: 62 }} />
              <span style={{ height: 88 }} />
              <span style={{ height: 110 }} />
              <span style={{ height: 78 }} />
              <span style={{ height: 126 }} />
              <span style={{ height: 92 }} />
              <span style={{ height: 70 }} />
            </div>

            <div className="hero-a1__metrics">
              <div>
                <strong>Fast turn</strong>
                <span>실시간 음성 흐름</span>
              </div>
              <div>
                <strong>Clear reply</strong>
                <span>텍스트와 음성 동시 응답</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
