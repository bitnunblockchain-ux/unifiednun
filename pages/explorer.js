import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function Explorer() {
  const [blocks, setBlocks] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    (async () => {
      const c = new UnifiedNUNCore();
      await c.ready;
      setBlocks([...c.blocks]);
      setBalances({ ...c.state.balances });
    })();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Explorer</h1>
      <h2>Blocks</h2>
      {blocks.map(b => (
        <div key={b.index} style={{ border:'1px solid #ddd', margin:'8px 0', padding:8 }}>
          <div><b>#{b.index}</b> mined by {b.miner} at {new Date(b.timestamp).toLocaleString()}</div>
          <div><b>Actions:</b> {(b.actions||[]).map(a=>a.type).join(', ') || 'none'}</div>
        </div>
      ))}
      <h2>Balances (NUN)</h2>
      <ul>
        {Object.entries(balances).map(([a, v], i) => <li key={a}>{i===0 ? 'Treasury [hidden]' : a}: {v}</li>)}
      </ul>
    </div>
  );
}
