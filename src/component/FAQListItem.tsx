import { useRef } from "react";
import PropTypes from "prop-types";
import { FAQItem } from "../type/type";

interface Props {
  faqItem: FAQItem;
  tab: string;
}

const FAQListItem = (props: Props) => {
  const listItemRef = useRef<HTMLLIElement>(null); // li 요소 참조
  const contentRef = useRef<HTMLDivElement>(null); // div.q 요소 참조

  const handleToggle = () => {
    const listItem = listItemRef.current;
    const content = contentRef.current;

    if (!listItem || !content) return;

    // 열려 있는 다른 listItem 찾기
    const parent = listItem.parentNode;
    const otherActiveItem = parent?.querySelector("li.active"); // active된 다른 listItem

    const closeListItem = (item: HTMLLIElement, content: HTMLDivElement) => {
      if (!item || !content) return;

      item.classList.remove("active", "show");
      item.classList.add("ing");
      content.style.height = `${content.scrollHeight}px`; // 현재 높이 설정
      requestAnimationFrame(() => {
        content.style.height = "0px"; // 0으로 트랜지션
      });

      content.addEventListener(
        "transitionend",
        (e) => {
          if (e.target === content) {
            // 대상 확인
            item.classList.remove("ing");
            content.style.height = ""; // 높이 초기화
          }
        },
        { once: true }
      );
    };

    if (listItem.classList.contains("active")) {
      // 현재 클릭한 listItem 닫기
      closeListItem(listItem, content);
    } else {
      // 열려 있는 다른 listItem 닫기
      if (otherActiveItem && otherActiveItem !== listItem) {
        const otherContent = otherActiveItem.querySelector("div.q");
        if (
          otherActiveItem instanceof HTMLLIElement &&
          otherContent instanceof HTMLDivElement
        )
          closeListItem(otherActiveItem, otherContent);
      }

      // 현재 클릭한 listItem 열기
      listItem.classList.add("ing", "active");
      content.style.height = "0px"; // 초기값 설정
      requestAnimationFrame(() => {
        content.style.height = `${content.scrollHeight}px`; // 실제 높이로 트랜지션
      });

      content.addEventListener(
        "transitionend",
        (e) => {
          if (e.target === content) {
            // 대상 확인
            listItem.classList.add("show");
            listItem.classList.remove("ing");
          }
        },
        { once: true }
      );
    }
  };

  return (
    <li data-ui-item ref={listItemRef} onClick={handleToggle}>
      <h4 className="a">
        <button type="button" data-ui-click="dropdown-toggle">
          {props.tab === "USAGE" && <em>{props.faqItem.categoryName}</em>}
          <em>{props.faqItem.subCategoryName}</em>
          <strong>{props.faqItem.question}</strong>
        </button>
      </h4>
      <div className="q" ref={contentRef} data-ui-target>
        <div
          className="inner"
          dangerouslySetInnerHTML={{ __html: props.faqItem.answer }}
        />
      </div>
    </li>
  );
};

FAQListItem.propTypes = {
  faqItem: PropTypes.object,
  tab: PropTypes.string,
};

export default FAQListItem;
