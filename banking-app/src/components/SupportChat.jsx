import { useEffect, useState } from 'react';

const initialMessages = [
  { id: 1, sender: 'bot', text: 'Hi there! I am your virtual assistant. How can I help you today?' },
];

const SupportChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (messages.length <= 1) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sender === 'user') {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'bot',
            text: 'Thanks for your message. Our support team will review your request and get back to you shortly! ✨',
          },
        ]);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: input.trim() },
    ]);
    setInput('');
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-900/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/90">Customer Service</p>
          <h2 className="text-2xl font-semibold text-white">Live Support</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
          Online
        </span>
      </div>
      <div className="space-y-4 max-h-[320px] overflow-y-auto pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-3xl px-4 py-3 ${
              message.sender === 'bot' ? 'bg-slate-800 text-slate-100 self-start' : 'bg-cyan-500/15 text-cyan-100 self-end'
            }`}
          >
            <p className="text-sm leading-6">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-5 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or request help"
          className="flex-1 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
        />
        <button type="submit" className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Send
        </button>
      </form>
    </div>
  );
};

export default SupportChat;
