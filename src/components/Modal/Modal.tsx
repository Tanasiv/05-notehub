import '../Modal/Modal.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}