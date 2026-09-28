import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AGENCY_WHATSAPP } from '../../data/mockData.ts';

export const WhatsAppButton: React.FC = () => {
  const message = encodeURIComponent(
    'Hello Digital Rankup Agency! I am interested in launching an advertising campaign and have questions regarding budget, packages, or JazzCash payment.'
  );
  const whatsappUrl = `https://wa.me/${AGENCY_WHATSAPP}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      aria-label="Chat with Digital Rankup Agency on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full" />
      </div>
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
        WhatsApp Agency Support
      </span>
      <span className="text-[11px] font-mono bg-black/15 px-1.5 py-0.5 rounded text-white/90 hidden md:inline-block">
        0321-2583543
      </span>
    </a>
  );
};
