import { useEffect, useState } from "react";
import "../style/FAQPage.scss";
import AppDownload from "./AppDownload";
import UseProcess from "./UseProcess";
import FAQListItem from "./FAQListItem";
import { apis } from "../api/Api";
import ErrorDialog from "./ErrorDialog";
import { useNavigate } from "react-router-dom";
import { Category, FAQItem } from "../type/type";

const FAQPage = () => {
  const [offset, setOffset] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [parentCategory, setParentCategory] = useState("CONSULT");
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [faqList, setFaqList] = useState<Array<FAQItem>>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isNoRsult, setIsNoResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/FAQ"); // 페이지 로딩 시 /FAQ로 이동
  }, []);

  useEffect(() => {
    getCategoryList();
    setFaqList([]);

    return () => {};
  }, []);

  useEffect(() => {
    if (faqList.length > 0 || isNoRsult) {
      getCategoryList();
      setOffset(0);
      setIsNext(false);
      setIsSearch(false);
      setSelectedCategory("ALL");
      setSearchText("");
      setFaqList([]);
    }
  }, [parentCategory]);

  useEffect(() => {
    setOffset(0);
    setIsNext(false);
    setFaqList([]);
  }, [selectedCategory]);

  useEffect(() => {
    if (faqList.length === 0) {
      getFaqList();
    }
  }, [faqList]);

  const getCategoryList = async () => {
    const result = await apis.getFaqCategoryList(parentCategory);
    if (result) setCategoryList(result);
  };

  const getFaqList = async () => {
    setIsLoading(true);
    const result = await apis.getFaqList({
      offset,
      parentCategory,
      selectedCategory,
      searchText,
    });

    if (result && result.items.length > 0) {
      setIsNoResult(false);
      setFaqList(faqList.concat(result.items));
      setTotalCount(result.pageInfo.totalRecord);
      if (result.pageInfo.nextOffset === offset) {
        setIsNext(false);
      } else {
        setIsNext(true);
        setOffset(result.pageInfo.nextOffset);
      }
    } else {
      setIsNoResult(true);
      setTotalCount(0);
    }

    setIsLoading(false);
  };

  const smoothShowModel = () => {
    const target = document.querySelector("#error_faq") as HTMLDialogElement;
    if (target) target.showModal();
  };

  const search = () => {
    if (searchText.length === 0) {
      clear();
      return;
    }

    if (searchText.length === 1) {
      smoothShowModel();
      return;
    }
    setOffset(0);
    setIsNext(false);
    setIsSearch(true);
    setFaqList([]);
  };

  const clear = () => {
    setOffset(0);
    setIsNext(false);
    setIsSearch(false);
    setSelectedCategory("ALL");
    setSearchText("");
    setFaqList([]);
  };

  return (
    <div className="content">
      {/* heading */}
      <h1>
        자주 묻는 질문 <em>궁금하신 내용을 빠르게 찾아보세요.</em>
      </h1>
      <i className="sticky-checker"></i>

      {/* tab */}
      <ul className="tabs">
        <li className={parentCategory === "CONSULT" ? "active" : undefined}>
          <a onClick={() => setParentCategory("CONSULT")}>
            <span>서비스 도입</span>
          </a>
        </li>
        <li className={parentCategory === "USAGE" ? "active" : undefined}>
          <a onClick={() => setParentCategory("USAGE")}>
            <span>서비스 이용</span>
          </a>
        </li>
      </ul>

      {/* search */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search">
          <div className="input-wrap">
            <input
              type="text"
              placeholder="찾으시는 내용을 입력해 주세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
            />
            <button
              type="button"
              className="clear"
              data-ui-click="input-clear"
              onClick={() => {
                setSearchText("");
              }}
            >
              다시입력
            </button>
            <button type="button" className="submit" onClick={search}>
              검색
            </button>
          </div>
        </div>
      </form>

      {isSearch && (
        <div className="search-info">
          <h2 className="heading-info">
            검색결과 총 <em>{totalCount}</em>건
          </h2>
          <button type="button" className="init" onClick={() => clear()}>
            검색초기화
          </button>
        </div>
      )}

      {/* category */}
      {categoryList.length > 0 && (
        <div className="filter">
          <label>
            <input
              type="radio"
              name="filter"
              checked={selectedCategory === "ALL"}
              onChange={() => setSelectedCategory("ALL")}
            />
            <i>전체</i>
          </label>
          {categoryList.map((item) => (
            <label key={item.categoryID}>
              <input
                type="radio"
                name="filter"
                checked={selectedCategory === item.categoryID}
                onChange={() => setSelectedCategory(item.categoryID)}
              />
              <i>{item.name}</i>
            </label>
          ))}
        </div>
      )}

      {/* faq list */}
      {isNoRsult === true ? (
        <div className="no-data">
          <p>검색결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="faq-list">
          {faqList.map((item) => (
            <FAQListItem faqItem={item} key={item.id} tab={parentCategory} />
          ))}
        </ul>
      )}

      {isLoading === true && (
        <div className="loading-indicator">
          <i></i> 불러오는 중입니다.
        </div>
      )}

      {isNext === true && (
        <button
          type="button"
          className="list-more"
          onClick={() => getFaqList()}
        >
          <i></i>더보기
        </button>
      )}

      <UseProcess />
      <AppDownload />
      <ErrorDialog />
    </div>
  );
};

export default FAQPage;
