import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

// *****************************************************
const modalRoot = document.getElementById('modal-root');
// *****************************************************
export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', evt => {
      evt.code === 'Escape' && onClose();
    });
    return () => {
      window.removeEventListener('keydown', evt => {
        evt.code === 'Escape' && onClose();
      });
    };
  }, [onClose]);

  function onBackgroundClose(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    onClose();
  }

  return createPortal(
    <div className="Overlay" onClick={onBackgroundClose}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}
