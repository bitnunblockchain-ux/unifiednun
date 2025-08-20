export const metadata = {
  title: 'UnifiedNUN',
  description: 'Browser-native blockchain platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
