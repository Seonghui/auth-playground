import React, { ReactNode, useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

function Modal({ header, content, footer }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div>{header}</div>
        <div>{content}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
}

export default Modal;
