"use client";

export function SkipLink() {
  function handleClick() {
    const target = document.getElementById("main-content");
    target?.focus();
  }

  return (
    <a className="skip-link" href="#main-content" onClick={handleClick}>
      본문으로 바로가기
    </a>
  );
}
