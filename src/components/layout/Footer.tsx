import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-background py-6">
      <div className="container max-w-screen-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">TheBurgerBlog</h3>
            <p className="text-sm text-gray-500">
              Searching for the best burgers in Vienna and beyond.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">Follow</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="https://instagram.com/theburgerblog.at" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-500 hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-xs text-gray-500">
            © {currentYear} TheBurgerBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 