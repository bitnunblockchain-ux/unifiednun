import { useEffect, useState } from 'react';
import { createBus, makeReport } from '../lib/bus';
import { UnifiedNUNCore } from '../lib/core';

export default function Console() {
  const [feed, setFeed] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    (async () => {
      const { reports } = await createBus();
      reports.map().on((msg) => { if (msg) setFeed(f => [msg, ...f].slice(0, 200)); });

      const c = new UnifiedNUNCore();
      await c.ready;
      setHeight(c.blocks.length);

      // demo report in-browser
      reports.set(makeReport('info', { message: 'Console online' }));
    })();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Chain Console</h1>
      <p><b>Height:</b> {height}</p>
      <h2>Reports</h2>
      {feed.length === 0 && <p>No reports yet.</p>}
      {feed.map((r, i) => (
        <div key={i} style={{ border:'1px solid #ddd', margin:'8px 0', padding:8 }}>
          <div><b>Type:</b> {r.kind}</div>
          <div><b>Time:</b> {new Date(r.ts).toLocaleString()}</div>
          <pre style={{ whiteSpace:'pre-wrap' }}>{JSON.stringify(r.payload, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
