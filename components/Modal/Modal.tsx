import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Style from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={Style.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={Style.modal}>{children}</div>
    </div>,
    document.body
  );
}
