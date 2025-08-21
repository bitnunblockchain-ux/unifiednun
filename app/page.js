export default function Home() {
  return (
    <main className="bg-black text-white font-sans">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 fade-in">
        <h1 className="text-5xl font-bold mb-4 neon">UnifiedNUN</h1>
        <p className="text-xl mb-6 fade-in">The Browser-Native Blockchain for Dreamers</p>
        <div className="space-x-4 fade-in">
          <a href="/mining-docs" className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">Start Mining</a>
          <a href="/launchpad-docs" className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50">Launch Token</a>
          <a href="/nun-ai" className="bg-gray-800 px-6 py-2 rounded hover:bg-gray-700 hover:shadow-lg hover:shadow-cyan-500/50">Meet NUN AI</a>
        </div>
      </section>
    </main>
  );
}


      {/* How It Works */}
      <section className="py-20 px-6 text-center fade-in">
        <h2 className="text-3xl font-semibold mb-8 neon">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Connect Wallet", "Mine NUN", "Launch Assets", "Earn & Govern"].map((step, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded shadow hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{step}</h3>
              <p className="text-sm text-gray-400">Simple, fast, and fully browser-native.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-indigo-900 to-black fade-in">
        <h2 className="text-3xl font-semibold mb-8 neon">Showcase</h2>
        <p className="mb-6 text-gray-300">Featured projects powered by UnifiedNUN</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["BitNUN", "UnifiedNFT", "Founder Console"].map((project, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded shadow hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{project}</h3>
              <p className="text-sm text-gray-400">Live, fast, and growing with every block.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 text-center fade-in">
        <h2 className="text-3xl font-semibold mb-8 neon">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Mining Console",
            "Launchpad",
            "Explorer",
            "Wallet Connect",
            "Founder Dashboard",
            "Airdrops",
            "DAO Governance",
            "Staking",
            "NUN AI Assistant",
            "Backend Automation"
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded shadow hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{feature}</h3>
              <p className="text-sm text-gray-400">Powerful, elegant, and fully integrated.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-800 fade-in">
        <h2 className="text-3xl font-semibold mb-4 neon">The Vision</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          “I built UnifiedNUN so no dreamer would be left behind. The eye eats before the mouth — so I made it beautiful.”
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-gray-900 fade-in">
        <h2 className="text-3xl font-semibold mb-6 neon">Ready to Build Your Future?</h2>
        <div className="space-x-4">
          <button className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
            Start Mining
          </button>
          <button className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50">
            Join the DAO
          </button>
          <button className="bg-gray-800 px-6 py-2 rounded hover:bg-gray-700 hover:shadow-lg hover:shadow-cyan-500/50">
            Activate NUN AI
          </button>
        </div>
      </section>
    </main>
  );
}

      {/* Footer */}
    <footer className="bg-black text-gray-400 py-10 px-6 text-sm">
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
