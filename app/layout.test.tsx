import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import RootLayout from "./layout";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("RootLayout", () => {
  it("renders skip link, header, main landmark, and footer in order", () => {
    render(
      <RootLayout>
        <div>page body</div>
      </RootLayout>,
    );

    const skipLink = screen.getByRole("link", { name: "본문으로 바로가기" });
    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");

    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(header).getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Velora Voice 홈으로" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
