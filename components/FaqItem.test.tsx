import { fireEvent, render, screen } from "@testing-library/react";
import { FaqItem } from "./FaqItem";

describe("FaqItem", () => {
  it("toggles the answer when the question is clicked", () => {
    render(
      <FaqItem
        id="faq-1"
        question="이 데모는 어떤 음성 AI 기능을 보여주나요?"
        answer="음성 입력, 실시간 파형, 텍스트 전사, 응답 재생을 보여줍니다."
      />,
    );

    expect(
      screen.queryByText("음성 입력, 실시간 파형, 텍스트 전사, 응답 재생을 보여줍니다."),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", {
      name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
    });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(
      screen.getByText("음성 입력, 실시간 파형, 텍스트 전사, 응답 재생을 보여줍니다."),
    ).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", {
        name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
      }),
    ).toBeVisible();
  });

  it("closes the open panel when Escape is pressed and keeps focus on the trigger", () => {
    render(
      <FaqItem
        id="faq-2"
        question="실시간 대화는 어떤 방식으로 동작하나요?"
        answer="인식 상태와 응답 상태를 동시에 노출해 실제 운영 환경에 가까운 체험을 제공합니다."
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "실시간 대화는 어떤 방식으로 동작하나요?",
    });

    fireEvent.click(trigger);
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(
      screen.queryByRole("region", {
        name: "실시간 대화는 어떤 방식으로 동작하나요?",
      }),
    ).not.toBeInTheDocument();
  });
});
