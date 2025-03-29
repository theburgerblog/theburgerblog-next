import Image from 'next/image';

export const metadata = {
  title: 'About | TheBurgerBlog',
  description: 'Learn more about TheBurgerBlog and our mission to find the best burgers in Vienna and beyond.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="text-center">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          About TheBurgerBlog
        </h1>
        <p className="text-xl text-gray-500">
          Our journey to find the best burgers in Vienna and beyond.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 p-6">
        <div className="md:flex md:items-center md:gap-6">
          <div className="mb-4 md:mb-0 md:w-1/2">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/images/posts/kenks_header.jpeg"
                alt="A delicious burger"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="mb-4 text-gray-500">
              TheBurgerBlog was founded with a simple mission: to find and document the best burger experiences in Vienna and beyond. We believe that a great burger is more than just a meal—it&apos;s an experience worth sharing.
            </p>
            <p className="text-gray-500">
              Through detailed reviews and ratings, we aim to guide fellow burger enthusiasts to their next favorite spot.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">How We Rate Burgers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Taste</h3>
            <p className="text-gray-500">
              The most important factor. We evaluate the overall flavor profile, seasoning, and how all ingredients work together.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Consistency</h3>
            <p className="text-gray-500">
              How well the burger holds together, the texture of the patty, and the balance of juiciness.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Price</h3>
            <p className="text-gray-500">
              Value for money is key. A great burger doesn&apos;t have to be expensive, but it should be worth its price.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Satiation</h3>
            <p className="text-gray-500">
              How filling the burger is and whether it leaves you satisfied after eating.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Presentation</h3>
            <p className="text-gray-500">
              We eat with our eyes first. The visual appeal and presentation contribute to the overall experience.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">Overall</h3>
            <p className="text-gray-500">
              The final score considers all factors plus the ambiance, service, and special touches that make the experience memorable.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-100/10 p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Join Our Burger Quest</h2>
        <p className="mb-6 text-gray-500">
          Have a burger spot we should try? Or want to share your own burger experience?
          We&apos;d love to hear from you!
        </p>
        <div className="flex justify-center">
          <a
            href="https://instagram.com/theburgerblog.at"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-600/90"
          >
            Follow Us on Instagram
          </a>
        </div>
      </section>
    </div>
  );
} 