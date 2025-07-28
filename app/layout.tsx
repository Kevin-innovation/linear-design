import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

export const metadata = {
  title: 'Linear Design System',
  description: 'Complete component library based on Linear.app design system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}