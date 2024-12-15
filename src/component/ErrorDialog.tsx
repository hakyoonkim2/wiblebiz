import { useRef } from "react";
import "../style/Dialog.scss";

/**
 * ErrorDialog 컴포넌트
 * - 에러 메시지를 표시하고 닫을 수 있는 다이얼로그
 */
const ErrorDialog = () => {
  // dialog 요소의 참조 객체
  const ref = useRef<HTMLDialogElement>(null);

  /**
   * 다이얼로그 닫기 버튼 클릭 핸들러
   * - 다이얼로그를 닫는 애니메이션을 처리한 후 다이얼로그를 닫음
   */
  const onClickHandler = () => {
    if (!ref.current) return; // 참조 객체가 없는 경우 종료

    // 닫기 애니메이션 시작
    ref.current.setAttribute("closing", "");

    setTimeout(() => {
      if (!ref.current) return; // 참조 객체가 없는 경우 종료

      // 닫기 애니메이션 종료
      ref.current.removeAttribute("closing");
      ref.current.close();

      // 다른 모달이 열려 있는지 확인하여 클래스 토글
      const modalDialog = document.body.querySelector("dialog:modal");
      document.body.classList.toggle("modal-opened", modalDialog !== null);
    }, 300); // 300ms 이후 실행
  };

  return (
    <dialog
      className="dialog-wrapper dialog-error" // 스타일 클래스 지정
      id="error_faq" // 고유 ID 지정
      ref={ref} // dialog 요소 참조 연결
    >
      <div className="dialog-body" style={{ marginTop: "35px" }}>
        {/* 에러 메시지 출력 */}
        <p className="message">검색어는 2글자 이상 입력해주세요.</p>
        <div className="button-group">
          {/* 확인 버튼 */}
          <button
            type="button"
            className="btn-xlg btn-tertiary"
            onClick={onClickHandler}
          >
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorDialog;
