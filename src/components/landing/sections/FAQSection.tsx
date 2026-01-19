'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { FAQS } from '@/components/landing/data/faq';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="w-full pb-8 pt-16 px-4"
      style={{
        backgroundImage: 'url("/images/bg-red.webp")',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1000px',
      }}
    >
      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          FREQUENTLY ASKED <span className="text-red-600">QUESTION</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${
                  isOpen ? 'bg-zinc-800' : 'bg-neutral-900/80'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  type="button"
                >
                  <span className="text-lg font-semibold text-white">
                    {item.q}
                  </span>

                  <span className="text-red-600">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-300">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

