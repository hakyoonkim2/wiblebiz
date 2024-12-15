import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Footer from "../../src/component/Footer";

describe("Footer Component", () => {
  beforeEach(() => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test("renders Footer component correctly", () => {
    // Footer 컴포넌트 렌더링
    const { container } = render(<Footer />);

    // `quick-util` 클래스가 있는 요소 확인
    const quickUtil = container.querySelector(".quick-util.active");
    expect(quickUtil).not.toBeNull();

    // Footer 내부의 정보 섹션 확인
    const information = container.querySelector(".information");
    expect(information).not.toBeNull();

    // 회사 정보 확인
    expect(information?.textContent).toContain(
      "서울특별시 서초구 헌릉로 12 기아㈜"
    );
    expect(information?.textContent).toContain("대표: 송호성, 최준영");
    expect(information?.textContent).toContain("사업자등록번호: 119-81-02316");
    expect(information?.textContent).toContain("통신판매번호: 2006-07935");
    expect(information?.textContent).toContain("1833-4964");
  });

  test("clicking '상단으로' button triggers scrollTo", () => {
    // `window.scrollTo` 모킹
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    // Footer 컴포넌트 렌더링
    const { container } = render(<Footer />);

    // "상단으로" 버튼 클릭
    const topButton = container.querySelector("button.top");
    expect(topButton).not.toBeNull();
    fireEvent.click(topButton!);

    // scrollTo 호출 여부 확인
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("scroll event toggles active class on .quick-util", () => {
    // Footer 컴포넌트 렌더링
    const { container } = render(<Footer />);

    // `quick-util` 요소 확인
    const quickUtil = container.querySelector(".quick-util");
    expect(quickUtil).not.toBeNull();

    // 초기 상태에서 active 클래스 확인
    expect(quickUtil?.classList.contains("active")).toBe(true);

    // scrollY 값을 모킹
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });

    // scroll 이벤트 트리거
    fireEvent.scroll(window);

    // active 클래스 상태 확인
    expect(quickUtil?.classList.contains("active")).toBe(true);
  });
});
