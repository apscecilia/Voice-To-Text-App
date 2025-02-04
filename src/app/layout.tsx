import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Notes - Voice-to-Text Medical Notes',
  description: 'Record and transcribe medical conversations in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
