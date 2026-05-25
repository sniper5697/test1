import { render, screen } from "@testing-library/react";
import FaqPage from "./page";
import { faqEntries } from "../../lib/page-content";

describe("FaqPage", () => {
  it("renders the FAQ list and the final demo CTA", () => {
    render(<FaqPage />);

    expect(
      screen.getByRole("heading", {
        name: "데모 전 가장 많이 묻는 질문을 한 자리에서 정리합니다",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(faqEntries.length);
    expect(screen.getByRole("link", { name: "데모 보기" })).toHaveAttribute(
      "href",
      "/#demo",
    );
  });
});
