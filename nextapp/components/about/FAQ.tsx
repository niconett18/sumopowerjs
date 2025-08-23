"use client";
import { useState } from "react";

const items = [
  { q: "Are your capacity ratings real?", a: "Yes. We publish nominal capacities based on batch testing; reports are available for distributors." },
  { q: "Do you support DIY installers?", a: "We provide fitment notes and safety tips. For swollen batteries, stop using the device and contact support immediately." },
  { q: "How do I claim warranty?", a: "Submit the order proof, product label, and QC code via our support form. Most cases resolve within 48 hours after receiving the item." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">FAQ</h3>
        <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {items.map((item, idx) => (
            <div key={item.q}>
              <button
                className="w-full text-left p-5 focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span className="text-2xl text-gray-500">
                    {open === idx ? '−' : '+'}
                  </span>
                </div>
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="text-gray-700 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
