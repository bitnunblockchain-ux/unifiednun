export default function WhitepaperPage() {
  return (
    <main className="p-10 text-white space-y-10 fade-in">
      <h1 className="text-4xl font-bold neon">UnifiedNUN Whitepaper</h1>
      <p className="text-lg text-gray-300">
        UnifiedNUN è la prima blockchain browser‑native progettata per abbattere le barriere di accesso
        e dare a chiunque la possibilità di creare, governare e innovare direttamente dal proprio browser.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">1. Visione</h2>
        <p className="text-gray-400">
          Creare un ecosistema decentralizzato dove ogni utente è un nodo, ogni browser è un miner,
          e ogni idea può diventare un asset digitale senza costi proibitivi.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">2. Architettura Tecnica</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Mining nel browser con WebAssembly</li>
          <li>Comunicazione P2P via WebRTC</li>
          <li>Storage distribuito con KV store</li>
          <li>Smart contract leggeri e modulari</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 neon">3. Tokenomics</h2>
        <p className="text-gray-400">
          Il token NUN alimenta transazioni, governance e incentivi. Supply limitata, emissione
          decrescente e staking per la sicurezza della rete.
        </p>
      </section>

      <div className="pt-6">
        <a href="/docs" className="bg-cyan-500 text-black px-6 py-3 rounded hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
          Vai alla Documentazione
        </a>
      </div>
    </main>
  );
}
