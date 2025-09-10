import { MutableRefObject, useEffect } from 'react';

export const useClickAway = (
  element: MutableRefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
  isModalsCheck?: boolean,
) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeOpenMenus = (e: MouseEvent) => {
      if (!e?.target || e.button !== 0) return;
      if (
        isOpen &&
        element?.current &&
        !element.current.contains(e.target as Node)
      ) {
        if (
          isModalsCheck &&
          document.querySelectorAll(`[data-component="modal"]`).length > 1
        )
          return;
        onClose();
      }
    };

    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };

    //eslint-disable-next-line
  }, [element, isOpen]);
};
