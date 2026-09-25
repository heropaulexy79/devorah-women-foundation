'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, status } = useChat({ streamProtocol: 'text' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'streaming' || status === 'submitted';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: trimmed }] });
    setInputValue('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-white text-[#6E3A82] border border-[#E8DDF0]'
              : 'bg-[#6E3A82] text-white hover:bg-[#8B4FA0] hover:scale-105'
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#E8DDF0] flex flex-col overflow-hidden z-50"
          >
            {/* Chat Header */}
            <div className="bg-[#3B214F] p-4 text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6E3A82] flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-[#C5A8D8]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">Devorah Assistant</h3>
                <p className="text-[10px] text-[#C5A8D8] tracking-widest uppercase font-semibold">
                  Powered by AI
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF8F5]">
              {messages.length === 0 && (
                <div className="text-center text-[#716A73] text-sm mt-8 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#F4ECF7] rounded-full flex items-center justify-center text-[#6E3A82]">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg text-[#3B214F]">Hello! I'm here to help.</p>
                  <p className="text-xs max-w-[250px] mx-auto leading-relaxed">
                    Ask me anything about the Devorah Women Foundation's programs, mission, or how to get involved.
                  </p>
                </div>
              )}

              {messages.map((m) => {
                // Extract text from parts (v4+ API) or fall back
                const text = m.parts
                  ? m.parts
                      .filter((p: { type: string }) => p.type === 'text')
                      .map((p: { type: string; text?: string }) => p.text ?? '')
                      .join('')
                  : (m as unknown as { content: string }).content ?? '';

                return (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        m.role === 'user'
                          ? 'bg-[#6E3A82] text-white rounded-tr-sm'
                          : 'bg-white text-[#3B214F] border border-[#E8DDF0] rounded-tl-sm'
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E8DDF0] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                    <Loader2 className="w-4 h-4 text-[#6E3A82] animate-spin" />
                    <span className="text-xs text-[#716A73]">Typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-[#E8DDF0]">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#F4ECF7] text-[#3B214F] placeholder-[#A088B0] text-sm rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6E3A82]/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-[#6E3A82] text-white flex items-center justify-center hover:bg-[#8B4FA0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
