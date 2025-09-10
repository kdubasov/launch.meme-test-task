export type TModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  zIndex?: number;
  className?: string;
  title?: string;
  isCloseHidden?: boolean;
};
