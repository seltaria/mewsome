import { FC } from "react";
import styles from "./Pagination.module.scss";
import { ArrowIcon } from "../icons";

interface PaginationProps {
  setPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({
  setPage,
  currentPage,
  totalPages,
}) => {
  const nextPage = () => {
    setPage(currentPage > totalPages - 1 ? totalPages : currentPage + 1);
  };

  const prevPage = () => {
    setPage(currentPage < 2 ? 1 : currentPage - 1);
  };

  return (
    <div className={styles.pagination}>
      <button disabled={currentPage <= 1} onClick={() => setPage(1)}>
        <ArrowIcon type="double" />
      </button>
      <button disabled={currentPage <= 1} onClick={prevPage}>
        <ArrowIcon rotate={270} />
      </button>
      <div>
        {currentPage} / {totalPages}
      </div>
      <button disabled={currentPage >= totalPages} onClick={nextPage}>
        <ArrowIcon rotate={90} />
      </button>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => setPage(totalPages)}
      >
        <ArrowIcon type="double" rotate={180} />
      </button>
    </div>
  );
};
