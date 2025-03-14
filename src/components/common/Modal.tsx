import { css } from '@emotion/react';
import { Portal, Slot } from '@radix-ui/themes';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import { type PropsWithChildren, useEffect } from 'react';

export interface ModalProps {
  opened?: boolean;
  onClose?: () => void;
  asChild?: boolean;
}

export const Modal = ({
  opened = false,
  onClose,
  asChild = false,
  children,
  ...restArticleProps
}: PropsWithChildren<ModalProps>) => {
  useBodyScrollLock(opened);

  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, onClose]);

  const ModalContents = asChild ? Slot : 'article';

  return opened ? (
    <Portal css={modalWrapperStyles}>
      <div
        tabIndex={0}
        role="button"
        css={overlayStyles}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            onClose?.();
          }
        }}
      />
      <ModalContents css={contentStyles} {...restArticleProps}>
        {children}
      </ModalContents>
    </Portal>
  ) : null;
};

const modalWrapperStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: fadeIn 0.2s ease-in;
  z-index: 10;
`;

const overlayStyles = css`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  opacity: 0.7;
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 335px;
  height: fit-content;
  max-height: 100%;
  white-space: pre-wrap;
  overflow: auto;
  text-align: center;
`;
