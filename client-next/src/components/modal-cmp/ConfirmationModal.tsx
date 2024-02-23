import React, { useEffect } from "react";
import ReactPortal from "../reactportal-cmp/ReactPortal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function ConfirmationModal({
  children,
  isOpen,
  handleClose,
}: Props) {
  console.log("HERE!");

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId='react-portal-modal-container'>
      <div
        className={`
      fixed inset-0 m-auto 
      flex items-end justify-center 
      z-10
      md:items-center 
      `}
      >
        <section className='max-w-[400px] w-full bg-[white] shadow-xl flex-1 rounded-t-[1rem] absolute z-50 md:rounded-[1rem]'>
          {/* {title && <ModalTitle>{title}</ModalTitle>} */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleClose}
          >
            ✕
          </button>
          <div className='p-4'>{children}</div>
        </section>
        <span
          className='backdrop-blur-sm w-full h-full bg-accent/50 cursor-pointer'
          onClick={handleClose}
        >
          ¿CERRAR?
        </span>
      </div>
    </ReactPortal>
  );
}
