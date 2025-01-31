import styled from '@emotion/styled';
import { Slide, ToastContainer } from 'react-toastify';

export const ToastProvider = () => {
  return (
    <StyledToastContainer
      draggable
      draggableDirection="x"
      draggablePercent={50}
      limit={3}
      position="top-center"
      theme="colored"
      transition={Slide}
      hideProgressBar
      closeButton={false}
    />
  );
};

const StyledToastContainer = styled(ToastContainer)`
  cursor: grab;

  .Toastify__toast {
    display: flex;
    justify-content: center;
    padding: 0;
  }
`;
