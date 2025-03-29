import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-extrabold">404</h1>
      <h2 className="mb-6 text-2xl font-bold">Page Not Found</h2>
      
      <div className="mb-8 relative h-48 w-full">
        <Image 
          src="/images/404-burger.png"
          alt="A sad burger"
          fill
          className="object-contain"
        />
      </div>
      
      <p className="mb-8 text-gray-500">
        Looks like this burger has been eaten already! The page you&apos;re looking for 
        doesn&apos;t exist or has been moved.
      </p>
      
      <Link
        href="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-600/90"
      >
        Return Home
      </Link>
    </div>
  );
} 