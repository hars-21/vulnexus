'use client';

import { chatConversations } from '@/data/mockData';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState(chatConversations[0].messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: input
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="h-12 border-b border-gray-200 px-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider">Pentester Assistant</h2>
          <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded font-bold uppercase">
            AI Active
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-black transition-colors">
            <span className="text-sm">↗</span>
          </button>
          <button className="text-gray-400 hover:text-black transition-colors">
            <span className="text-sm">🔖</span>
          </button>
          <div className="text-[10px] font-medium text-gray-400">VULN-Engine v4.2</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 bg-white">
        {messages.map((msg: any) => (
          <div key={msg.id} className="max-w-3xl mx-auto flex gap-4">
            <div
              className={`size-8 rounded flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-gray-100' : 'bg-black'
              }`}
            >
              {msg.role === 'user' ? (
                <span className="text-gray-500 text-sm">👤</span>
              ) : (
                <span className="text-white text-sm">🤖</span>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-sm leading-relaxed">{msg.content}</p>
              
              {msg.relatedCve && (
                <div className="p-3 rounded border border-gray-200 bg-black flex items-start gap-3">
                  <span className="text-white text-sm mt-1">📄</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Related CVE Entry</h4>
                    <p className="text-[11px] text-gray-300">
                      {msg.relatedCve.id}: {msg.relatedCve.description}
                    </p>
                  </div>
                </div>
              )}
              
              {msg.code && (
                <div className="bg-black rounded p-3 font-mono text-xs text-white">
                  <div className="flex justify-between items-center mb-2 text-[10px] text-gray-400 uppercase font-bold tracking-widest border-b border-gray-700 pb-1">
                    <span>code</span>
                    <span>copy</span>
                  </div>
                  <code>{msg.code}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="p-6 pt-0 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white border border-gray-200 rounded overflow-hidden">
            <div className="p-3">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-gray-400 resize-none text-black"
                placeholder="Ask about CVEs, exploits, or security concepts..."
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                <span className="text-gray-400 text-sm cursor-pointer hover:text-black">📎</span>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-black">🌐</span>
              </div>
              <button
                onClick={handleSend}
                className="bg-black text-white px-4 py-1.5 rounded text-xs font-bold"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </footer>

      <aside className="w-72 flex-shrink-0 border-l border-gray-200 bg-white hidden xl:block">
        <div className="p-4 border-b border-gray-200 font-bold text-[10px] uppercase tracking-widest text-gray-500">
          Example Conversations
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatConversations.map((conv) => (
            <div key={conv.id} className="p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
              <p className="text-xs font-bold text-black mb-1">{conv.title}</p>
              <p className="text-[10px] text-gray-500">{conv.messages.length} messages</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
