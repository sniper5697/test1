import { render, screen } from "@testing-library/react";
import { AuthCard } from "./AuthCard";

describe("AuthCard", () => {
  it("renders alternate link and children content", () => {
    render(
      <AuthCard
        title="로그인"
        description="테스트 설명"
        alternateHref="/signup"
        alternateLabel="계정이 아직 없나요?"
        alternateCta="회원가입"
      >
        <div>폼 내용</div>
      </AuthCard>,
    );

    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByText("폼 내용")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "회원가입" })).toHaveAttribute(
      "href",
      "/signup",
    );
  });
});
