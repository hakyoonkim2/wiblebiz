import React, { render, fireEvent } from "@testing-library/react";
import ErrorDialog from "../../src/component/ErrorDialog";

describe("ErrorDialog", () => {
  it("renders the error dialog and interacts correctly", () => {
    // ErrorDialog 컴포넌트를 렌더링
    const { container } = render(<ErrorDialog />);

    // 다이얼로그 요소를 container에서 직접 찾음
    const dialog = container.querySelector("dialog");

    // 다이얼로그가 존재하는지 확인
    expect(dialog).not.toBeNull();

    // 다이얼로그가 닫혀 있는 상태인지 확인
    expect(dialog?.hasAttribute("open")).toBe(false);

    // 다이얼로그를 수동으로 열기 (테스트 시 다이얼로그는 닫혀 있음)
    dialog?.setAttribute("open", "true");

    // 다이얼로그 내 메시지를 가져와 올바른 텍스트가 있는지 확인
    const message = dialog?.querySelector(".message");
    expect(message?.textContent).toBe("검색어는 2글자 이상 입력해주세요.");

    // 확인 버튼 클릭 핸들러 테스트
    const closeButton = dialog?.querySelector("button");
    expect(closeButton).not.toBeNull();

    // 클릭 이벤트 발생
    closeButton && fireEvent.click(closeButton);

    // 닫기 애니메이션이 실행되었는지 확인
    expect(dialog?.getAttribute("closing")).toBe("");
  });
});
