'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 text-red-800">
          <h1 className="mb-4 text-6xl font-bold">Error</h1>
          <h2 className="mb-8 text-2xl font-semibold">Something went wrong!</h2>
          <p className="mb-8 text-lg text-red-700">
            We apologize for the inconvenience. Please try again later.
          </p>
          <button
            className="mb-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
          <Link href="/" className="text-red-600 hover:underline">
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
