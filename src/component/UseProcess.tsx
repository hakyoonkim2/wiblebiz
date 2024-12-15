import { Link } from "react-router-dom";
import "../style/UseProcess.scss";

/**
 * UseProcess 컴포넌트
 * - 서비스 문의 및 이용 프로세스 안내 섹션
 */
const UseProcess = () => {
  return (
    <>
      {/* 서비스 문의 섹션 */}
      <h2 className="heading-2">서비스 문의</h2>
      <div className="inquiry-info">
        {/* 상품제안서 다운로드 링크 */}
        <a
          className="btn-xxlg btn-tertiary"
          href={"./src/assets/proposal.pdf"}
          download="위블비즈 상품제안서.pdf"
        >
          <i className="ic download"></i>
          <span>상품제안서 다운로드</span>
        </a>

        {/* 상담문의 페이지로 이동 */}
        <Link to="/Counsel" className="btn-xxlg btn-tertiary">
          <i className="ic write"></i>
          <span>상담문의 등록하기</span>
        </Link>

        {/* 카카오톡 문의 링크 */}
        <a
          className="btn-xxlg btn-tertiary"
          href="https://pf.kakao.com/_xfLxjdb"
          target="_blank"
          rel="noreferrer"
        >
          <i className="ic talk"></i>
          <span>
            카톡으로 문의하기 <em>ID: Wible Biz(위블 비즈)</em>
          </span>
        </a>
      </div>

      {/* 이용 프로세스 안내 섹션 */}
      <h2 className="heading-2">이용 프로세스 안내</h2>

      <ol className="process-info">
        {/* 프로세스 단계 1: 문의 등록 */}
        <li>
          <i className="ic process-1"></i>
          <span>
            <strong>문의 등록</strong>
            <em>
              상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.
            </em>
          </span>
        </li>

        {/* 프로세스 단계 2: 관리자 설정 */}
        <li>
          <i className="ic process-2"></i>
          <span>
            <strong>관리자 설정</strong>
            <em>관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.</em>
          </span>
        </li>

        {/* 프로세스 단계 3: 임직원 가입 */}
        <li>
          <i className="ic process-3"></i>
          <span>
            <strong>임직원 가입</strong>
            <em>사용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.</em>
          </span>
        </li>

        {/* 프로세스 단계 4: 서비스 이용 */}
        <li>
          <i className="ic process-4"></i>
          <span>
            <strong>서비스 이용</strong>
            <em>사용자 App에서 차량 예약을 하고 위블존에서 바로 이용하세요!</em>
          </span>
        </li>
      </ol>
    </>
  );
};

export default UseProcess;
