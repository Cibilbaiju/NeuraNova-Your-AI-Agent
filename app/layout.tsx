import '@fontsource/inter';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-secondary text-gray-100 min-h-screen font-sans">{children}</body>
    </html>
  )
}
