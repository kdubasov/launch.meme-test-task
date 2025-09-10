
import { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import type { TModalProps } from './types';

import stylesModule from './Modal.module.css';
import {useClickAway} from "../../hooks/useClickAway";
import CloseIcon from "../../assets/icons/CloseIcon";

const key = 'modal';

const Modal = (props: TModalProps) => {
  const {
    open,
    children,
    styles,
    zIndex,
    onClose,
    isCloseHidden,
    className,
    title,
  } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement>();

  useClickAway(wrapperRef, open, onClose, true);

  useEffect(() => {
    const containerPortal = document.getElementById('modal-portal-wrapper');
    if (!containerPortal || !open || !container) return;

    containerPortal.appendChild(container);
    document.body.style.overflow = 'hidden';

    return () => {
      containerPortal.removeChild(container);
      const modalsOpened = document.querySelectorAll(`[data-component=${key}]`);
      if (!modalsOpened.length) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [open, container]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      const modalsOpened = document.querySelectorAll(`[data-component=${key}]`);
      if (e.key === 'Escape' && modalsOpened.length === 1) {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscapePressed);
    return () => {
      window.removeEventListener('keydown', closeOnEscapePressed);
    };
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    setContainer(document.createElement('div'));
  }, []);

  if (!container) return null;

  return createPortal(
    <div
      data-component={key}
      className={stylesModule.overlay}
      style={zIndex ? { zIndex } : undefined}
    >
      <div
        style={styles}
        className={`${stylesModule.content} ${className || ''}`}
        ref={wrapperRef}
      >
        <header className={stylesModule.header}>
          <h3>{title ?? ''}</h3>
          {!isCloseHidden && (
            <button
              className={stylesModule.closeButton}
              onClick={onClose}
              title="Закрыть"
            >
              <CloseIcon />
            </button>
          )}
        </header>
        {children}
      </div>
    </div>,
    container,
  );
};

export default Modal;
