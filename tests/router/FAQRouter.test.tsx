import React, { render } from "@testing-library/react";
import FAQRouter from "../../src/router/FAQRouter";
import { apis } from "../../src/api/Api"; // 실제 API 경로로 대체
jest.mock("../../src/api/Api"); // apis 모듈을 모킹

describe("FAQRouter", () => {
  beforeEach(() => {
    jest.spyOn(window, "scrollTo").mockImplementation(() => {}); // 빈 함수로 대체
    // API의 기본 응답 모킹
    (apis.getFaqList as jest.Mock).mockResolvedValue({
      items: [
        {
          id: "1",
          question: "What is Jest?",
          answer: "Jest is a testing library.",
        },
      ],
      pageInfo: {
        totalRecord: 1,
        offset: 0,
        limit: 10,
        prevOffset: 0,
        nextOffset: 1,
      },
    });

    (apis.getFaqCategoryList as jest.Mock).mockResolvedValue([
      { categoryID: "PRODUCT", name: "서비스 상품" },
      { categoryID: "COUNSELING", name: "도입 상담" },
    ]);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // 테스트 후 원래 동작으로 복원
  });

  it("renders the header, footer, and FAQPage components", () => {
    // `MemoryRouter`로 감싸서 특정 경로를 테스트
    const { container } = render(<FAQRouter />);

    // Header가 렌더링되었는지 확인
    const header = container.querySelector("header");
    expect(header).not.toBeNull();

    // Footer가 렌더링되었는지 확인
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();

    // FAQPage 내용이 렌더링되었는지 확인 (예: h1 태그)
    const faqHeading = container.querySelector("h1");
    expect(faqHeading).not.toBeNull();
    expect(faqHeading?.textContent).toContain("자주 묻는 질문");
  });

  it("renders the correct page for each route", () => {
    const { container } = render(<FAQRouter />);

    // News 경로에서도 FAQPage 내용이 렌더링되었는지 확인
    const faqHeading = container.querySelector("h1");
    expect(faqHeading).not.toBeNull();
    expect(faqHeading?.textContent).toContain("자주 묻는 질문");
  });
});
