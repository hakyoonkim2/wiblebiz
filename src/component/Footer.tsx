import { useEffect, useRef } from "react";
import "../style/Footer.scss";

const Footer = () => {
  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // scrollTimeout을 관리할 ref (타입 명시)
  const scrollTimeoutRef = useRef<number | null>(null);

  // scroll 함수 정의
  const scroll = () => {
    if (!scrollTimeoutRef.current) {
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollTimeoutRef.current = null;

        // IntersectionObserver 설정
        document.querySelectorAll(".sticky-checker").forEach((checker) => {
          const element = checker as HTMLElement & { observer?: boolean };

          if (!element.observer) {
            const observer = new IntersectionObserver(
              ([entry]) =>
                entry.target.classList.toggle(
                  "is-pinned",
                  entry.intersectionRatio < 1
                ),
              { threshold: [1] }
            );
            observer.observe(element);
            element.observer = true;
          }
        });

        // Quick Util 상태 변경
        if (!document.body.classList.contains("main")) {
          const quick = document.querySelector(
            ".quick-util"
          ) as HTMLElement | null;
          if (quick) quick.classList.toggle("active", window.scrollY > 0);
        }
      }, 100);
    }
  };

  // useEffect로 scroll 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", scroll);

    // Cleanup 함수로 이벤트 제거
    return () => {
      window.removeEventListener("scroll", scroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current); // Timeout 정리
        scrollTimeoutRef.current = null;
      }
    };
  }, []); // 빈 배열: 컴포넌트 마운트/언마운트 시 실행

  return (
    <>
      <div className="quick-util active">
        <div className="inner">
          <button type="button" className="top" onClick={onClickHandler}>
            상단으로
          </button>
        </div>
      </div>

      <footer>
        <div className="inner">
          <div className="information">
            <span className="util">
              <button type="button">
                <b>개인정보 처리방침</b>
              </button>
              <button type="button">이용약관</button>
            </span>
            <address>
              <span>
                서울특별시 서초구 헌릉로 12 <em>기아㈜</em>
              </span>
              <br />
              <span>
                대표: <i>송호성, 최준영</i>
              </span>
              <br />
              <span>
                사업자등록번호: <i>119-81-02316</i>
              </span>
              <br />
              <span>
                통신판매번호: <i>2006-07935</i>
              </span>
              <br />
              <span>
                고객센터: <i>1833-4964</i>
              </span>
              <br />
              <span>
                제휴문의:{" "}
                <a href="mailto:wible.biz@kia.com">wible.biz@kia.com</a>
              </span>
            </address>
          </div>
          <p className="copyright">© 2023 KIA CORP. All Rights Reserved.</p>
        </div>
        {/* <PolicyPopup ref={policyPopupRef} />
        <PrivacyPopup ref={privacyPopupRef} /> */}
      </footer>
    </>
  );
};

export default Footer;
