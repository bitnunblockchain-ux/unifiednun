export default function Footer() {
  return (
    <footer style={{
      background: '#f5f5f5',
      padding: '40px 20px',
      borderTop: '1px solid #ddd',
      marginTop: '40px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
        <div>
          <h4>Introduzione</h4>
          <ul>
            <li><a href="/getnun">Come iniziare</a></li>
            <li><a href="/explorer">Come funziona</a></li>
            <li><a href="/launchpad">Da sapere</a></li>
            <li><a href="/whitepaper">White paper</a></li>
          </ul>
        </div>
        <div>
          <h4>Risorse</h4>
          <ul>
            <li><a href="/market">Borsa</a></li>
            <li><a href="/community">Comunità</a></li>
            <li><a href="/glossary">Glossario</a></li>
            <li><a href="/events">Eventi</a></li>
          </ul>
        </div>
        <div>
          <h4>Partecipa</h4>
          <ul>
            <li><a href="/support">Sostieni UnifiedNUN</a></li>
            <li><a href="/buy">Comprare NUN</a></li>
            <li><a href="/sell">Vendere NUN</a></li>
            <li><a href="/develop">Sviluppo</a></li>
          </ul>
        </div>
        <div>
          <h4>Altro</h4>
          <ul>
            <li><a href="/legal">Note legali</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/press">Stampa</a></li>
            <li><a href="/about">A proposito di UnifiedNUN</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
      </div>
      <p style={{ marginTop: '30px', fontSize: '0.9em', color: '#666' }}>
        © {new Date().getFullYear()} UnifiedNUN Blockchain. Tutti i diritti riservati.
      </p>
    </footer>
  );
}
