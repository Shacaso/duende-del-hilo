import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export const Paginated = ({ currentPage, totalPages, onPageChange }: Props) => {
  const handlePageChange = (value: number) => {
    const newCurrentPage = currentPage + value;
    if (newCurrentPage < 0 || newCurrentPage > totalPages) return;
    onPageChange(newCurrentPage);
  };

  const handleDirectClick = (page: number) => {
    if (page < 0 || page > totalPages) return;
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='join'>
      {/* Botón de anterior, desactivado si es la primera página */}
      <button
        onClick={() => handlePageChange(-1)}
        className='join-item btn'
        disabled={currentPage + 1 === 1}
      >
        «
      </button>

      {/* Renderizar solo las páginas visibles */}
      {visiblePages.map((page) => (
        <button
          onClick={() => handleDirectClick(page - 1)}
          key={page}
          className={`join-item btn ${
            currentPage + 1 === page ? "btn-primary btn-active" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botón de siguiente, desactivado si es la última página */}
      <button
        onClick={() => handlePageChange(1)}
        className='join-item btn'
        disabled={currentPage + 1 === totalPages}
      >
        »
      </button>
    </div>
  );
};
