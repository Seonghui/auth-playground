import queryClient from '@/lib/reactQuery';
import StyledComponentsRegistry from '@/lib/registry';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Script from 'next/script';

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
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_APP_KEY}&autoload=false&libraries=services`}
            />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
