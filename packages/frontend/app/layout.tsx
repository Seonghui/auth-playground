import queryClient from '@/lib/reactQuery';
import StyledComponentsRegistry from '@/lib/registry';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
