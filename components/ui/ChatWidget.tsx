'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Lightweight markdown renderer for chat bubbles
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Markdown bullet list: lines starting with - or *<space>
    if (/^[-]\s+/.test(line.trim())) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-]\s+/, '');
        items.push(
          <li key={i} className="flex gap-2">
            <span className="text-[#6E3A82] mt-1 shrink-0">•</span>
            <span>{renderInline(itemText)}</span>
          </li>
        );
        i++;
      }
      nodes.push(<ul key={`ul-${i}`} className="space-y-1.5 my-1">{items}</ul>);
      continue;
    }

    // Markdown headings: ## or ###
    if (/^#{1,3}\s+/.test(line)) {
      const headingText = line.replace(/^#{1,3}\s+/, '');
      nodes.push(
        <p key={i} className="font-semibold text-[#3B214F] mt-2 mb-0.5">
          {renderInline(headingText)}
        </p>
      );
      i++;
      continue;
    }

    // A line that is entirely **bold** — treat as a section heading
    if (/^\*\*[^*]+\*\*:?$/.test(line.trim())) {
      const headingText = line.trim().replace(/^\*\*/, '').replace(/\*\*:?$/, '');
      nodes.push(
        <p key={i} className="font-semibold text-[#3B214F] mt-2 mb-0.5">
          {headingText}
        </p>
      );
      i++;
      continue;
    }

    // Regular paragraph
    nodes.push(<p key={i} className="mb-1 leading-relaxed">{renderInline(line)}</p>);
    i++;
  }

  return nodes;
}

// Render inline markdown: **bold** and *italic*
function renderInline(text: string): React.ReactNode {
  // Split on **bold** and *italic* patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      // Render *italic* as bold in chat context (easier to read)
      return <strong key={idx} className="font-semibold">{part.slice(1, -1)}</strong>;
    }
    return part;
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    const assistantId = Date.now().toString() + '-ai';
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I'm sorry, I couldn't connect. Please try again or email info@devorahwomen.org." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
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
            className="fixed bottom-24 z-50 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-[400px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#E8DDF0] flex flex-col overflow-hidden"
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
                  <p className="font-serif text-lg text-[#3B214F]">Hello! I&apos;m here to help.</p>
                  <p className="text-xs max-w-[250px] mx-auto leading-relaxed">
                    Ask me anything about the Devorah Women Foundation's programs, mission, or how
                    to get involved.
                  </p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-[#6E3A82] text-white rounded-tr-sm'
                        : 'bg-white text-[#3B214F] border border-[#E8DDF0] rounded-tl-sm'
                    }`}
                  >
                    {m.role === 'user' ? (
                      m.content
                    ) : m.content ? (
                      <div className="space-y-1">{renderMarkdown(m.content)}</div>
                    ) : isLoading ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="text-xs text-[#716A73]">Typing…</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-[#E8DDF0]">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question…"
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
