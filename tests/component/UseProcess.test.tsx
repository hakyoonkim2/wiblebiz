import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UseProcess from "../../src/component/UseProcess";

describe("UseProcess Component", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <UseProcess />
      </MemoryRouter>
    );
  };

  test("renders the headings correctly", () => {
    const { container } = renderComponent();

    // "서비스 문의" 제목 확인
    const serviceInquiryHeading = container.querySelector(".heading-2");
    expect(serviceInquiryHeading).not.toBeNull();
    expect(serviceInquiryHeading?.textContent).toBe("서비스 문의");

    // "이용 프로세스 안내" 제목 확인
    const processInfoHeading = container.querySelectorAll(".heading-2")[1];
    expect(processInfoHeading).not.toBeNull();
    expect(processInfoHeading?.textContent).toBe("이용 프로세스 안내");
  });

  test("renders the inquiry-info section correctly", () => {
    const { container } = renderComponent();

    // 상품제안서 다운로드 링크 확인
    const downloadLink = container.querySelector(
      "a[href='./src/assets/proposal.pdf']"
    );
    expect(downloadLink).not.toBeNull();
    expect(downloadLink?.textContent).toContain("상품제안서 다운로드");

    // 상담문의 링크 확인
    const counselLink = container.querySelector("a[href='/Counsel']");
    expect(counselLink).not.toBeNull();
    expect(counselLink?.textContent).toContain("상담문의 등록하기");

    // 카카오톡 링크 확인
    const kakaoLink = container.querySelector(
      "a[href='https://pf.kakao.com/_xfLxjdb']"
    );
    expect(kakaoLink).not.toBeNull();
    expect(kakaoLink?.textContent).toContain("카톡으로 문의하기");
  });

  test("renders the process steps correctly", () => {
    const { container } = renderComponent();

    // 프로세스 단계 리스트 확인
    const processList = container.querySelectorAll(".process-info li");
    expect(processList.length).toBe(4);

    // 각 단계의 텍스트 확인
    const steps = [
      "문의 등록상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.",
      "관리자 설정관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.",
      "임직원 가입사용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.",
      "서비스 이용사용자 App에서 차량 예약을 하고 위블존에서 바로 이용하세요!",
    ];

    processList.forEach((step, index) => {
      expect(step.textContent).toBe(steps[index]);
    });
  });
});
