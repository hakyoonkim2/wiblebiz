import React, { render, fireEvent, waitFor } from "@testing-library/react";
import FAQPage from "../../src/component/FAQPage";
import { apis } from "../../src/api/Api";
import { BrowserRouter } from "react-router-dom";

// Mock API 응답
jest.mock("../../src/api/Api", () => ({
  apis: {
    getFaqCategoryList: jest.fn(),
    getFaqList: jest.fn(),
  },
}));

describe("FAQPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders FAQPage and loads categories", async () => {
    // Mock 카테고리 API 응답
    (apis.getFaqCategoryList as jest.Mock).mockResolvedValue([
      { categoryID: "1", name: "Category 1" },
      { categoryID: "2", name: "Category 2" },
    ]);

    const { container } = render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    // 카테고리 탭 요소 확인
    const tabs = container.querySelector(".tabs");
    expect(tabs).not.toBeNull();

    // API 호출 및 렌더링 대기
    await waitFor(() => {
      const filters = container.querySelectorAll(".filter label");
      expect(filters.length).toBe(3); // 전체 + 2개의 카테고리
    });
  });

  it("displays no data message when no results found", async () => {
    // Mock FAQ API 응답
    (apis.getFaqList as jest.Mock).mockResolvedValue({
      items: [],
      pageInfo: { totalRecord: 0, nextOffset: 0 },
    });

    const { container } = render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    // 검색 버튼 클릭
    const searchButton = container.querySelector(".search .submit");
    expect(searchButton).not.toBeNull();

    fireEvent.click(searchButton!);

    // "검색결과가 없습니다" 메시지 확인
    await waitFor(() => {
      const noDataMessage = container.querySelector(".no-data p");
      expect(noDataMessage).not.toBeNull();
      expect(noDataMessage?.textContent).toBe("검색결과가 없습니다.");
    });
  });

  it("shows FAQ items after fetching data", async () => {
    // Mock FAQ API 응답
    (apis.getFaqList as jest.Mock).mockResolvedValue({
      items: [
        {
          id: 1,
          categoryName: "Category 1",
          subCategoryName: "Subcategory A",
          question: "What is FAQ?",
          answer: "<p>Frequently Asked Questions.</p>",
        },
      ],
      pageInfo: { totalRecord: 1, nextOffset: 0 },
    });

    const { container } = render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    // FAQ 리스트 렌더링 확인
    await waitFor(() => {
      const faqItems = container.querySelectorAll(".faq-list li");
      expect(faqItems.length).toBe(1);

      const question = faqItems[0].querySelector("strong");
      expect(question?.textContent).toBe("What is FAQ?");
    });
  });

  it("handles search functionality", async () => {
    const { container } = render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    // 검색 입력 필드 및 버튼 확인
    const input = container.querySelector(".search input") as HTMLInputElement;
    const searchButton = container.querySelector(".search .submit");

    expect(input).not.toBeNull();
    expect(searchButton).not.toBeNull();

    // 검색어 입력
    fireEvent.change(input, { target: { value: "Test" } });

    // 검색 버튼 클릭
    fireEvent.click(searchButton!);

    // API 호출 확인
    await waitFor(() => {
      expect(apis.getFaqList).toHaveBeenCalledWith({
        offset: 0,
        parentCategory: "CONSULT",
        selectedCategory: "ALL",
        searchText: "Test",
      });
    });
  });
});
