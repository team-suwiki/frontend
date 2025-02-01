import styled from '@emotion/styled';
import { Portal, Slot } from '@radix-ui/themes';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import type { PropsWithChildren } from 'react';

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

  const ModalContents = asChild ? Slot : Content;

  return opened ? (
    <ModalWrapper
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      }}
    >
      <Overlay onClick={onClose} />
      <ModalContents {...restArticleProps}>{children}</ModalContents>
    </ModalWrapper>
  ) : null;
};

const ModalWrapper = styled(Portal)`
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

const Overlay = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  opacity: 0.7;
`;

const Content = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 335px;
  height: fit-content;
  max-height: 100%;
  padding: 40px 24px;
  white-space: pre-wrap;
  overflow: auto;
  text-align: center;
`;
