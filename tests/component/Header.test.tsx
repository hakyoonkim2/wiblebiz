import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../../src/component/Header";

describe("Header Component", () => {
  afterEach(cleanup);

  const renderWithRouter = (initialPath: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders Header component correctly", () => {
    const { container } = renderWithRouter("/");

    // 로고 확인
    const logo = container.querySelector(".logo");
    expect(logo).not.toBeNull();
    expect(logo?.textContent).toBe("Wible BIZ");

    // 네비게이션 메뉴 확인
    const navItems = container.querySelectorAll("nav ul li");
    expect(navItems.length).toBe(4);

    expect(navItems[0].textContent).toBe("서비스 소개");
    expect(navItems[1].textContent).toBe("자주 묻는 질문");
    expect(navItems[2].textContent).toBe("새소식");
    expect(navItems[3].textContent).toBe("상담문의");
  });

  test("updates selectedIndex based on route", () => {
    const { container } = renderWithRouter("/FAQ");

    // FAQ 메뉴가 활성화되었는지 확인
    const activeItem = container.querySelector("li.active");
    expect(activeItem).not.toBeNull();
    expect(activeItem?.textContent).toBe("자주 묻는 질문");
  });

  test("toggles nav-opened class on menu button click", () => {
    const { container } = renderWithRouter("/");

    // 메뉴 버튼 찾기
    const menuButton = container.querySelector("button.nav");
    expect(menuButton).not.toBeNull();

    // 초기 상태 확인
    expect(document.body.classList.contains("nav-opened")).toBe(false);

    // 버튼 클릭으로 클래스 추가
    fireEvent.click(menuButton!);
    expect(document.body.classList.contains("nav-opened")).toBe(true);

    // 버튼 다시 클릭으로 클래스 제거
    fireEvent.click(menuButton!);
    expect(document.body.classList.contains("nav-opened")).toBe(false);
  });

  test("removes main class when not on home page", () => {
    renderWithRouter("/FAQ");

    // main 클래스가 제거되었는지 확인
    expect(document.body.classList.contains("main")).toBe(false);
  });

  test("adds main class when on home page", () => {
    renderWithRouter("/");

    // main 클래스가 추가되었는지 확인
    expect(document.body.classList.contains("main")).toBe(true);
  });
});
