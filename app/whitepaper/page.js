export default function WhitepaperPage() {
  return (
    <main className="p-10 text-white space-y-8 fade-in">
      <h1 className="text-4xl font-bold neon">UnifiedNUN Whitepaper</h1>
      <p className="text-lg text-gray-300">
        UnifiedNUN è la prima blockchain browser‑native pensata per creatori, innovatori e sognatori.
      </p>
      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">Visione</h2>
        <p className="text-gray-400">Democratizzare l’accesso alla blockchain, eliminando barriere tecniche e costi di ingresso.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">Architettura</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Mining nel browser</li>
          <li>Protocollo P2P WebRTC</li>
          <li>Storage distribuito</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">Tokenomics</h2>
        <p className="text-gray-400">Token NUN per transazioni, governance e incentivi.</p>
      </section>
    </main>
  );
}
