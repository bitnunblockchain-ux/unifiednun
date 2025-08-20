import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function GetNUN() {
  const [core, setCore] = useState(null);
  const [addr, setAddr] = useState('');
  const [bal, setBal] = useState(0);

  useEffect(() => {
    (async () => {
      const c = new UnifiedNUNCore();
      await c.ready;
      setCore(c);
      const a = 'user_' + Math.random().toString(36).slice(2, 10);
      setAddr(a);
      await c.mine(a, [c.actions.register(a)]);
      setBal(c.state.balances[a] || 0);
    })();
  }, []);

  async function mine() {
    await core.mine(addr, []);
    setBal(core.state.balances[addr] || 0);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Get NUN</h1>
      <p><b>Your address:</b> {addr}</p>
      <p><b>Your balance:</b> {bal}</p>
      <button onClick={mine}>Mine small NUN</button>
      <p style={{ marginTop: 12 }}>
        Faucet and advanced acquisition flows require local bots (not on Vercel). You can add them later.
      </p>
    </div>
  );
}
