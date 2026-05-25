import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link href="/" aria-label="Velora Voice 홈으로">
          <strong>Velora Voice</strong>
        </Link>
        <span className="muted">홈 · 서비스 · 소개 · FAQ · 로그인 · 회원가입</span>
      </div>
    </footer>
  );
}
