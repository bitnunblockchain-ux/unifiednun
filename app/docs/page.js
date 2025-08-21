export default function DocsPage() {
  return (
    <main className="p-10 text-white space-y-8 fade-in">
      <h1 className="text-4xl font-bold neon">UnifiedNUN Documentation</h1>
      <p className="text-gray-300">
        Qui trovi tutte le guide per usare UnifiedNUN: mining, creazione di asset, governance DAO e integrazione AI.
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-1">
        <li><a href="/mining-docs" className="hover:text-cyan-400">Mining Guide</a></li>
        <li><a href="/launchpad-docs" className="hover:text-cyan-400">Launchpad Guide</a></li>
        <li><a href="/dao-docs" className="hover:text-cyan-400">DAO Governance</a></li>
        <li><a href="/nun-ai" className="hover:text-cyan-400">NUN AI Assistant</a></li>
      </ul>
    </main>
  );
}
