import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Check, ExternalLink } from 'lucide-react';
import { AGENCY_WHATSAPP } from '../../data/mockData.ts';

interface ChatMessage {
  id: string;
  sender: 'agency' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agency',
      text: 'Welcome to Digital Rankup Agency! How can we assist your advertising goals today? You can ask about our Meta & Google ad management, pricing packages, or JazzCash payment verification.',
      time: 'Just now',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userQuery = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = 'Thank you for reaching out! A dedicated Digital Rankup advertising strategist has received your message. You can also contact us instantly on WhatsApp at 03212583543.';
      if (userQuery.includes('jazzcash') || userQuery.includes('payment') || userQuery.includes('fee')) {
        reply = 'JazzCash payments are made directly to 03212583543 (Digital Rankup Agency). After transferring, please enter your Transaction ID (TID) on our Checkout page for instant verification!';
      } else if (userQuery.includes('package') || userQuery.includes('price') || userQuery.includes('cost')) {
        reply = 'Our advertising packages start at PKR 35,000/month for Starter, PKR 75,000/month for Professional (most popular), and PKR 140,000 for Enterprise scale.';
      } else if (userQuery.includes('meta') || userQuery.includes('facebook') || userQuery.includes('instagram')) {
        reply = 'We manage full-funnel Meta Ads using advanced CAPI pixel tracking, lookalikes, and high-converting creative video testing. Typical client ROAS ranges between 3.5x to 5.2x!';
      } else if (userQuery.includes('account') || userQuery.includes('password')) {
        reply = 'Security Notice: Digital Rankup Agency NEVER asks for your social media or ad account passwords. We connect securely through official Meta Business Manager and Google Ads Partner invites.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'agency',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle button (bottom-left) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full shadow-xl border border-neutral-700 transition-all transform hover:scale-105 cursor-pointer"
        aria-label="Open Agency Live Chat"
      >
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <span className="text-xs font-semibold hidden md:inline">Live Chat Agency</span>
      </button>

      {/* Chat Popover */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col h-[460px]">
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-xs font-bold leading-tight">Digital Rankup Agency Desk</p>
                <p className="text-[10px] text-neutral-400">Media Buyers Online · Avg reply 2m</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-[11px] text-blue-700 dark:text-blue-300">
            <span>Official JazzCash: 03212583543</span>
            <a
              href={`https://wa.me/${AGENCY_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline flex items-center gap-0.5"
            >
              WhatsApp <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/50 dark:bg-neutral-950/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'agency' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    DR
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700/60 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`text-[9px] mt-1 text-right font-mono ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-neutral-400'
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-2 border-t border-neutral-200 dark:border-neutral-800 flex gap-2 bg-white dark:bg-neutral-900">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an ads question..."
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
