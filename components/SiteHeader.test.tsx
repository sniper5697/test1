import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { SiteHeader } from "./SiteHeader";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it("renders the full route list inside a single primary navigation landmark", () => {
    mockUsePathname.mockReturnValue("/");
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    const navigation = within(header).getByRole("navigation", { name: "주요 메뉴" });

    expect(within(navigation).getByRole("link", { name: "홈" })).toHaveAttribute("href", "/");
    expect(within(navigation).getByRole("link", { name: "서비스" })).toHaveAttribute(
      "href",
      "/service",
    );
    expect(within(navigation).getByRole("link", { name: "소개" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(navigation).getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/faq",
    );
    expect(within(navigation).getByRole("link", { name: "로그인" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(
      within(navigation).getByRole("link", { name: "회원가입" }),
    ).toHaveAttribute("href", "/signup");
  });

  it("marks exactly one active route with aria-current", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<SiteHeader />);

    const activeLink = screen.getByRole("link", { name: "소개" });
    const activeLinks = screen.getAllByRole("link").filter((link) =>
      link.getAttribute("aria-current") === "page",
    );

    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(activeLink).toHaveClass("is-active");
    expect(activeLinks).toHaveLength(1);
    expect(screen.getByRole("link", { name: "서비스" })).not.toHaveAttribute("aria-current");
  });
});
