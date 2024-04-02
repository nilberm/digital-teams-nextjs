/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import style from "./style.module.scss";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onCancel: () => void;
}
export default function Modal({ children, open, onCancel }: ModalProps) {
  const modalContentRef = useRef<any>(null);

  const handleClickOutsideModalContent = (e: MouseEvent) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onCancel();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutsideModalContent);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideModalContent);
    };
  }, [open]);

  return (
    <div className={`${style.modalOverlay} ${open ? style.open : ""}`}>
      <div ref={modalContentRef} className={style.modalContent}>
        {children}
      </div>
    </div>
  );
}
