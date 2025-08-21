import './globals.css';

"use client";
import { useState, useEffect } from "react";
import './globals.css';

export const metadata = {
  title: 'UnifiedNUN',
  description: 'The browser-native blockchain for dreamers',
};

export default function RootLayout({ children }) {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Recupera la chat dal localStorage se esiste
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nunai-messages");
      return saved ? JSON.parse(saved) : [
        { from: "ai", text: "👋 Ciao Simona, sono NUN AI. Scrivi /help per vedere i comandi disponibili." }
      ];
    }
    return [];
  });
  const [input, setInput] = useState("");

  // Salva la chat ogni volta che cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nunai-messages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setMessages(prev => [...prev, { from: "user", text: userMessage }]);
  setInput("");

  // Comandi di navigazione
  if (userMessage.toLowerCase() === "/mine") {
    window.location.href = "/mining-docs";
    return;
  }
  if (userMessage.toLowerCase() === "/launch") {
    window.location.href = "/launchpad-docs";
    return;
  }
  if (userMessage.toLowerCase() === "/dao") {
    window.location.href = "/dao-docs";
    return;
  }

  // Nuovo comando: reset chat
  if (userMessage.toLowerCase() === "/clear") {
    setMessages([
      { from: "ai", text: "🧹 Chat resettata. Scrivi /help per vedere i comandi disponibili." }
    ]);
    localStorage.removeItem("nunai-messages");
    return;
  }

  // Risposta simulata
 setTimeout(() => {
  let aiReply = { text: "", style: "", icon: "" };

  switch (userMessage.toLowerCase()) {
    case "/help":
      aiReply = {
        text: "📜 Comandi disponibili: /mine, /launch, /dao, /clear, /help",
        style: "bg-purple-800 text-purple-200",
        icon: "📜"
      };
      break;
    case "/mine":
      window.location.href = "/mining-docs";
      return;
    case "/launch":
      window.location.href = "/launchpad-docs";
      return;
    case "/dao":
      window.location.href = "/dao-docs";
      return;
    case "/clear":
      setMessages([
        { from: "ai", text: "🧹 Chat resettata. Scrivi /help per vedere i comandi disponibili.", style: "bg-gray-800 text-cyan-300", icon: "🧹" }
      ]);
      localStorage.removeItem("nunai-messages");
      return;
    default:
      aiReply = {
        text: "🤖 Ho ricevuto la tua richiesta. Presto potrò eseguire azioni reali per te.",
        style: "bg-gray-800 text-cyan-300",
        icon: "🤖"
      };
  }

  setMessages(prev => [...prev, { from: "ai", ...aiReply }]);
}, 800);



  return (
    <html lang="en">
      <body className="bg-black text-white font-sans min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">UnifiedNUN</h1>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="/whitepaper" className="hover:text-blue-400">Whitepaper</a>
            <a href="/docs" className="hover:text-blue-400">Docs</a>
            <a href="/nun-ai" className="hover:text-blue-400">NUN AI</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Floating NUN AI Button */}
        <button
          className="fixed bottom-6 right-6 bg-cyan-500 text-black font-bold px-4 py-3 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 animate-fadeIn"
          onClick={() => setAiOpen(!aiOpen)}
        >
          🤖 NUN AI
        </button>

        {/* NUN AI Panel */}
        {aiOpen && (
          <div className="fixed bottom-20 right-6 w-80 h-96 bg-gray-900 border border-cyan-500 rounded-lg shadow-lg animate-slideUp flex flex-col">
            <div className="p-3 border-b border-cyan-500 flex justify-between items-center">
              <span className="font-bold text-cyan-400">NUN AI Assistant</span>
              <button onClick={() => setAiOpen(false)} className="text-gray-400 hover:text-white">✖</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
              {messages.map((msg, i) => (
  <div
    key={i}
    className={`p-2 rounded max-w-[90%] flex items-center gap-2 ${
      msg.from === "ai"
        ? msg.style || "bg-gray-800 text-cyan-300 self-start"
        : "bg-cyan-500 text-black self-end ml-auto"
    }`}
  >
    {msg.icon && <span>{msg.icon}</span>}
    <span>{msg.text}</span>
  </div>
))}

            <div className="p-3 border-t border-cyan-500 flex space-x-2">
              <input
                type="text"
                placeholder="Scrivi un messaggio..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 rounded bg-black border border-gray-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={sendMessage}
                className="bg-cyan-500 text-black px-3 rounded hover:bg-cyan-400"
              >
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-10 px-6 text-sm border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <a href="/whitepaper" className="hover:text-white">Whitepaper</a>
            <a href="/docs" className="hover:text-white">Documentation</a>
            <a href="/nun-ai" className="hover:text-white">NUN AI Assistant</a>
            <a href="/launchpad-docs" className="hover:text-white">Launchpad Guide</a>
            <a href="/mining-docs" className="hover:text-white">Mining Guide</a>
            <a href="/market-docs" className="hover:text-white">Marketplace Guide</a>
            <a href="/dao-docs" className="hover:text-white">DAO Governance</a>
            <a href="/console-docs" className="hover:text-white">Founder Console</a>
            <a href="/dev-portal" className="hover:text-white">Developer Portal</a>
            <a href="/legal" className="hover:text-white">Legal & Privacy</a>
          </div>
          <p className="text-center">© UnifiedNUN 2025</p>
        </footer>
      </body>
    </html>
  );
}
