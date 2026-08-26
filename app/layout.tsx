import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jinyu-3d-creator.fbfkcswjdn.chatgpt.site'),
  title: 'Jinyu — 3D Creator',
  description:
    'Portfolio of Jinyu, a multidisciplinary 3D creator crafting vivid digital experiences.',
  openGraph: {
    title: 'Jinyu — 3D Creator',
    description:
      'Portfolio of Jinyu, a multidisciplinary 3D creator crafting vivid digital experiences.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Jinyu — 3D Creator' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinyu — 3D Creator',
    description:
      'Portfolio of Jinyu, a multidisciplinary 3D creator crafting vivid digital experiences.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
