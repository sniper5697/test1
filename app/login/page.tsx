import type { Metadata } from "next";
import { LoginPageClient } from "./LoginPageClient";

export const metadata: Metadata = {
  title: "로그인 | Velora Voice",
  description:
    "Velora Voice 계정으로 로그인하여 실시간 음성 AI 데모와 개인화된 진입 흐름을 바로 이어가세요.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
