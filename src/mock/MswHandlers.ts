// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { FAQItem } from "../type/type";
import {
  accident,
  business,
  consultCategories,
  contract,
  counseling,
  coupon,
  product,
  refuel,
  reservation,
  signup,
  usageCategories,
  vehicle,
} from "../assets/data/data";

export const mswHandlers = [
  // FAQ Category List API
  http.get("/mop/bo/api/faq", ({ request }) => {
    // req.url을 URL 객체로 변환
    const url = new URL(request.url);

    const tab = url.searchParams.get("tab");
    const offset = parseInt(url.searchParams.get("offset") ?? "0");
    const category = url.searchParams.get("faqCategoryID");
    const searchText = url.searchParams.get("question");

    let responseData: FAQItem[] = [];

    if (tab === "CONSULT") {
      if (category === "PRODUCT") {
        responseData = product;
      } else if (category === "COUNSELING") {
        responseData = counseling;
      } else if (category === "CONTRACT") {
        responseData = contract;
      } else {
        responseData = [...product, ...counseling, ...contract];
      }
    } else {
      if (category === "SIGN_UP") {
        responseData = signup;
      } else if (category === "BUSINESS") {
        responseData = business;
      } else if (category === "ACCIDENT") {
        responseData = accident;
      } else if (category === "RESERVATION") {
        responseData = reservation;
      } else if (category === "VEHICLE") {
        responseData = vehicle;
      } else if (category === "REFUEL") {
        responseData = refuel;
      } else if (category === "COUPON") {
        responseData = coupon;
      } else {
        responseData = [
          ...signup,
          ...business,
          ...accident,
          ...reservation,
          ...vehicle,
          ...refuel,
          ...coupon,
        ];
      }
    }
    if (searchText)
      responseData = responseData.filter(
        (value) =>
          value.answer.includes(searchText) ||
          value.question.includes(searchText)
      );
    const totalLength = responseData.length;

    responseData = responseData.filter(
      (value, index) => index >= offset && index < offset + 10
    );

    const pageInfo = {
      totalRecord: totalLength,
      offset: 0,
      limit: 10,
      prevOffset: offset >= 10 ? offset - 10 : 0,
      nextOffset: offset + 10 < totalLength - 1 ? offset + 10 : totalLength - 1,
    };

    return new HttpResponse(
      JSON.stringify({ items: responseData, pageInfo: pageInfo })
    );
  }),
  // FAQ Category List API
  http.get("/mop/bo/api/faq/category", ({ request }) => {
    // req.url을 URL 객체로 변환
    const url = new URL(request.url);

    // 쿼리 파라미터에서 'tab' 값을 추출
    const tab = url.searchParams.get("tab");

    return new HttpResponse(
      JSON.stringify(tab === "CONSULT" ? consultCategories : usageCategories)
    );
  }),
];
