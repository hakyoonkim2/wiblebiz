import React from "react";
import { render } from "@testing-library/react";
import AppDownload from "../../src/component/AppDownload"; // AppDownload 파일의 경로를 실제 위치로 바꿔주세요.

describe("AppDownload Component", () => {
  it("renders the component with correct text and links", () => {
    const { container } = render(<AppDownload />);

    // 헤더 텍스트 확인
    const header = container.querySelector(".app-info h2");
    expect(header).not.toBeNull();
    expect(header?.textContent).toContain("위블 비즈 App 지금 만나보세요!");

    // Google Play 링크 확인
    const googlePlayLink = container.querySelector(".app-info .gp");
    expect(googlePlayLink).not.toBeNull();
    expect(googlePlayLink?.getAttribute("href")).toBe(
      "https://play.google.com/store/apps/details?id=kor.mop.user.app"
    );
    expect(googlePlayLink?.getAttribute("target")).toBe("_blank");
    expect(googlePlayLink?.getAttribute("rel")).toBe("noreferrer");

    // App Store 링크 확인
    const appStoreLink = container.querySelector(".app-info .as");
    expect(appStoreLink).not.toBeNull();
    expect(appStoreLink?.getAttribute("href")).toBe(
      "https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794"
    );
    expect(appStoreLink?.getAttribute("target")).toBe("_blank");
    expect(appStoreLink?.getAttribute("rel")).toBe("noreferrer");
  });
});
