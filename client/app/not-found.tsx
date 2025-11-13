'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <h2 className="mb-8 text-2xl font-semibold">Page Not Found</h2>
          <p className="mb-8 text-lg text-gray-700">
            Could not find the requested resource.
          </p>
          <Link href="/" className="text-pink-600 hover:underline">
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
