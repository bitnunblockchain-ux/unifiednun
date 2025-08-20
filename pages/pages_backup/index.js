import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function Home() {
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

  return (
    <div style={{ padding: 20 }}>
      <h1>UnifiedNUN 3.1</h1>
      <p><b>Your address:</b> {addr}</p>
      <p><b>Your NUN:</b> {bal}</p>
      <nav>
        <a href="/getnun">Get NUN</a> | <a href="/launchpad">Launchpad</a> | <a href="/market">Market</a> | <a href="/profile">Profile</a> | <a href="/explorer">Explorer</a> | <a href="/console">Console</a>
      </nav>
    </div>
  );
}
