import type { Metadata } from "next";
import { SignupPageClient } from "./SignupPageClient";

export const metadata: Metadata = {
  title: "회원가입 | Velora Voice",
  description:
    "Velora Voice와 함께하는 스마트한 음성 AI 경험의 시작점으로, 데모 계정 생성 흐름을 빠르게 확인하세요.",
};

export default function SignupPage() {
  return <SignupPageClient />;
}
