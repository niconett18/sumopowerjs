export default function ContactCTA() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Need wholesale pricing or technical documents?
        </h3>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          Our team can share spec sheets, MSDS/UN38.3 docs, and stock availability.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/contact" className="inline-flex justify-center items-center rounded-full bg-black text-white px-6 py-3 min-h-[44px]">Talk to our team</a>
          <a href="/docs" className="inline-flex justify-center items-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-6 py-3 min-h-[44px]">Download spec samples</a>
        </div>
      </div>
    </section>
  );
}


