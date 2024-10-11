import { Dispatch, SetStateAction, useCallback } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<
    SetStateAction<{
      currentPage: number;
      rowsPerPage: number;
      totalPage: number;
    }>
  >;
}

export const Paginated = ({ currentPage, totalPages, onPageChange }: Props) => {
  // Cambia de página usando -1 o +1 para anterior/siguiente
  const handlePageChange = (value: number) => {
    const newCurrentPage = currentPage + value;
    // Asegurarse de no ir más allá de las páginas disponibles
    if (newCurrentPage < 1 || newCurrentPage > totalPages) return;
    onPageChange((prevState) => ({
      ...prevState,
      currentPage: newCurrentPage,
    }));
  };

  // Cambiar directamente a una página específica
  const handleDirectClick = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      onPageChange((prevState) => ({
        ...prevState,
        currentPage: page, // Cambiamos la página, no rowsPerPage
      }));
    },
    [onPageChange, totalPages]
  );

  return (
    <div className='join'>
      {/* Botón de anterior, desactivado si es la primera página */}
      <button
        onClick={() => handlePageChange(-1)}
        className='join-item btn'
        disabled={currentPage === 1}
      >
        «
      </button>

      {/* Renderizar botones de páginas */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            onClick={() => handleDirectClick(page)}
            key={page}
            className={`join-item btn ${
              currentPage === page ? "btn-primary btn-active" : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Botón de siguiente, desactivado si es la última página */}
      <button
        onClick={() => handlePageChange(1)}
        className='join-item btn'
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};
