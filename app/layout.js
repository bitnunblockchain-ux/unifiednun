import './globals.css';

"use client";
import { useState } from "react";
import './globals.css';

export const metadata = {
  title: 'UnifiedNUN',
  description: 'The browser-native blockchain for dreamers',
};

export default function RootLayout({ children }) {
  const [aiOpen, setAiOpen] = useState(false);

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
              <div className="text-gray-300">👋 Ciao Simona, sono pronta ad assisterti nella tua missione.</div>
              <div className="text-gray-300">Puoi chiedermi di cercare dati, guidarti nei documenti o avviare processi.</div>
            </div>
            <div className="p-3 border-t border-cyan-500">
              <input
                type="text"
                placeholder="Scrivi un messaggio..."
                className="w-full p-2 rounded bg-black border border-gray-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
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
