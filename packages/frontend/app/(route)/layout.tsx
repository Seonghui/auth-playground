import StyledComponentsRegistry from '@/lib/registry';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <nav>
            <ul>
              <li>
                <Link href="/">홈</Link>
              </li>
              <li>
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <Link href="/register">회원가입</Link>
              </li>
              <li>
                <Link href="/my-page">내 정보</Link>
              </li>
            </ul>
          </nav>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
