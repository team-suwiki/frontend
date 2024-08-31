import { PropsWithChildren, Suspense, type ComponentProps } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface AsyncBoundaryProps extends Omit<ErrorBoundaryProps, 'fallbackRender'> {
  pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback: ErrorBoundaryProps['fallbackRender'];
}

const Substitute = ({ error }: FallbackProps) => {
  return <>{error.message}</>;
};

const AsyncBoundary = ({
  pendingFallback,
  rejectedFallback,
  children,
}: PropsWithChildren<AsyncBoundaryProps>) => {
  return (
    <ErrorBoundary fallbackRender={rejectedFallback || Substitute}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
