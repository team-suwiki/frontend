import { toast as reactToast } from 'react-toastify';

export interface ToastOptions {
  message: string;
  closeTime?: number;
}

export const useToast = () => {
  const toast = ({ message, closeTime = 2_000 }: ToastOptions) => {
    return reactToast(message, { autoClose: closeTime });
  };

  return { toast };
};
