import './globals.css'

export const metadata = {
  title: 'DevCraft Labs API',
  description: 'Professional AI tools API for businesses, developers, and AEC professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}