import React, { render, fireEvent } from "@testing-library/react";
import FAQListItem from "../../src/component/FAQListItem";

describe("FAQListItem Component", () => {
  const mockFaqItem = {
    id: 1,
    categoryName: "Category 1",
    subCategoryName: "Subcategory A",
    question: "What is FAQ?",
    answer: "<p>FAQ stands for Frequently Asked Questions.</p>",
  };

  it("renders the FAQListItem with correct content and toggles visibility", () => {
    const { container } = render(
      <FAQListItem faqItem={mockFaqItem} tab="USAGE" />
    );

    // FAQListItem 요소 가져오기
    const listItem = container.querySelector("li[data-ui-item]");
    expect(listItem).not.toBeNull();

    // 버튼 및 컨텐츠 요소 확인
    const button = listItem?.querySelector(
      "button[data-ui-click='dropdown-toggle']"
    );
    const content = listItem?.querySelector("div.q");
    expect(button).not.toBeNull();
    expect(content).not.toBeNull();

    // 초기 상태 확인: `active` 클래스 없음
    expect(listItem?.classList.contains("active")).toBe(false);

    // 버튼 클릭하여 활성화
    button && fireEvent.click(button);

    // 활성화 상태 확인
    expect(listItem?.classList.contains("active")).toBe(true);

    // 버튼 다시 클릭하여 비활성화
    button && fireEvent.click(button);

    // 비활성화 상태 확인
    expect(listItem?.classList.contains("active")).toBe(false);
  });

  it("renders the FAQ content correctly", () => {
    const { container } = render(
      <FAQListItem faqItem={mockFaqItem} tab="USAGE" />
    );

    // 컨텐츠 내부의 질문 및 답변 확인
    const question = container.querySelector("strong");
    const answer = container.querySelector("div.inner");

    expect(question?.textContent).toBe(mockFaqItem.question);
    expect(answer?.innerHTML).toBe(mockFaqItem.answer);
  });
});
