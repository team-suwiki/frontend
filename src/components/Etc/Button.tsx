import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  id?: string;
  disabled?: boolean;
  width?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  onClick,
  color,
  id,
  disabled,
  width,
  type,
}: PropsWithChildren<ButtonProps>) => (
  <Wrapper
    type={type || 'button'}
    disabled={disabled || false}
    onClick={onClick}
    color={color}
    width={width}
    id={id}
  >
    {children}
  </Wrapper>
);

export default Button;

const Wrapper = styled.button<{ width: string | undefined }>`
  margin: 8px 0;
  width: ${({ width }) => width || '100%'};
  padding: 1rem;
  border: none;
  background: ${({ color }) => color || '#336af8'};
  color: white;
  text-align: center;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s all;
  &:disabled {
    background-color: rgba(170, 170, 170);
    cursor: auto;
  }
  &#email {
    width: 40%;
    margin: 16px 0 8px 8px;
    font-size: 0.9rem;
  }
  &#emailcheck {
    width: 40%;
    margin: 16px 0 8px 8px;
    font-size: 0.9rem;
    background-color: skyblue;
  }
  &#auth {
    @media only screen and (max-width: 550px) {
      margin-top: 10rem;
    }
  }
`;
