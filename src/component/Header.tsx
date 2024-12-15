import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Header.scss";

/**
 * Header 컴포넌트
 * - 페이지 내비게이션 및 로고를 포함하는 헤더
 */
const Header = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // 현재 선택된 메뉴의 인덱스
  const location = useLocation(); // 현재 URL 경로 가져오기

  // 경로 변경 시 상태 업데이트
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedIndex(-1);
        document.body.classList.add("main");
        break;
      case "/Guide":
        setSelectedIndex(0);
        document.body.classList.remove("main");
        break;
      case "/FAQ":
        setSelectedIndex(1);
        document.body.classList.remove("main");
        break;
      case "/News":
        setSelectedIndex(2);
        document.body.classList.remove("main");
        break;
      case "/Counsel":
        setSelectedIndex(3);
        document.body.classList.remove("main");
        break;
      default:
        setSelectedIndex(-1);
        document.body.classList.remove("main");
        break;
    }

    // 페이지 이동 시 스크롤을 상단으로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 불필요한 클래스 제거
    document.body.classList.remove("nav-opened");
    document.body.classList.remove("modal-opened");
  }, [location]);

  /**
   * 메뉴 클릭 시 네비게이션 상태 토글
   */
  const handleMenuClick = () => {
    document.body.classList.toggle("nav-opened");
  };

  return (
    <>
      {/* 스크롤 상태를 감지하는 숨겨진 요소 */}
      <i className="sticky-checker"></i>

      <header>
        <div className="inner">
          {/* 로고 클릭 시 홈으로 이동 */}
          <Link to="/" className="logo" onClick={() => setSelectedIndex(-1)}>
            Wible BIZ
          </Link>

          {/* 내비게이션 메뉴 */}
          <nav>
            <ul>
              <li className={selectedIndex === 0 ? "active" : undefined}>
                <Link to="/Guide" onClick={() => setSelectedIndex(0)}>
                  서비스 소개
                </Link>
              </li>
              <li className={selectedIndex === 1 ? "active" : undefined}>
                <Link to="/FAQ" onClick={() => setSelectedIndex(1)}>
                  자주 묻는 질문
                </Link>
              </li>
              <li className={selectedIndex === 2 ? "active" : undefined}>
                <Link to="/News" onClick={() => setSelectedIndex(2)}>
                  새소식
                </Link>
              </li>
              <li className={selectedIndex === 3 ? "active" : undefined}>
                <Link to="/Counsel" onClick={() => setSelectedIndex(3)}>
                  상담문의
                </Link>
              </li>
            </ul>
          </nav>

          {/* 메뉴 버튼 */}
          <span className="util">
            <button type="button" className="nav" onClick={handleMenuClick}>
              메뉴 열기/닫기
            </button>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
