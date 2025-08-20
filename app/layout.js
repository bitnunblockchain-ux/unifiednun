export const metadata = {
  title: 'UnifiedNUN',
  description: 'The browser-native blockchain for dreamers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">{children}</body>
    </html>
  );
}

