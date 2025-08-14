import ReactPaginate from "react-paginate";
import Style from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={Style.pagination}
      pageClassName={Style.pageItem}
      pageLinkClassName={Style.pageLink}
      activeClassName={Style.active} // для останньої версії можна залишити
      nextLabel="→"
      previousLabel="←"
      previousClassName={Style.navButton}
      nextClassName={Style.navButton}
      disabledClassName={Style.disabled}
    />
  );
}
