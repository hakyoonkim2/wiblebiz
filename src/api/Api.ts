import axios from "axios";

// Axios 인스턴스 생성
// 공통 설정: baseURL, headers 지정
const api = axios.create({
  baseURL: "/mop/bo/", // API 기본 경로
  headers: {
    "Content-type": "application/json; charset=UTF-8", // 요청 데이터 타입
    accept: "application/json,", // 수신 데이터 타입
    "Access-Control-Allow-Origin": "*", // CORS 허용 (실제 사용 시 수정 필요)
    "X-MOP-API-KEY": "e3a67ffdc7d29234410e166e98beb2c4", // 인증 키
  },
});

// API 요청 파라미터 타입 정의
type Params = {
  offset: number; // 데이터 시작 위치
  parentCategory: string; // 상위 카테고리 필터
  searchText: string; // 검색 텍스트
  selectedCategory: string; // 선택된 카테고리 ID
};

// API 함수 모음
export const apis = {
  /**
   * FAQ 목록 가져오기
   * @param params - 요청 파라미터
   * @returns FAQ 목록 데이터
   */
  async getFaqList(params: Params) {
    // 기본 URL 생성
    let url = `/api/faq?limit=10&offset=${params.offset}&tab=${params.parentCategory}`;

    // 선택된 카테고리가 "ALL"이 아닌 경우 카테고리 필터 추가
    if (params.selectedCategory !== "ALL") {
      url += `&faqCategoryID=${params.selectedCategory}`;
    }

    // 검색 텍스트가 비어있지 않은 경우 검색 필터 추가
    if (params.searchText !== "") {
      url += `&question=${params.searchText}`;
    }

    try {
      // GET 요청 실행
      const result = await api({
        method: "GET",
        url,
      });

      // 요청 성공 시 데이터 반환
      return result.data;
    } catch (e) {
      // 요청 실패 시 에러 반환
      return e;
    }
  },

  /**
   * FAQ 카테고리 목록 가져오기
   * @param tab - 상위 카테고리 필터
   * @returns FAQ 카테고리 목록 데이터
   */
  async getFaqCategoryList(tab: string) {
    try {
      // GET 요청 실행
      const result = await api({
        method: "GET",
        url: `/api/faq/category?tab=${tab}`,
      });

      // 요청 성공 시 데이터 반환
      return result.data;
    } catch (e) {
      // 요청 실패 시 에러 반환
      return e;
    }
  },
};
