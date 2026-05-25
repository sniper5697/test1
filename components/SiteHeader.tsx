"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/service", label: "서비스" },
  { href: "/about", label: "소개" },
  { href: "/faq", label: "FAQ" },
  { href: "/login", label: "로그인" },
  { href: "/signup", label: "회원가입" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
      <Link
        href="/"
        className="site-brand"
        aria-label="Velora Voice 홈으로"
      >
        <span className="site-brand__dot" aria-hidden="true" />
        <strong>Velora Voice</strong>
      </Link>
      <nav aria-label="주요 메뉴">
        <ul className="site-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`site-nav__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </div>
    </header>
  );
}
