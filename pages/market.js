import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function Market() {
  const [core, setCore] = useState(null);
  const [addr, setAddr] = useState('');
  const [bal, setBal] = useState(0);
  const [listings, setListings] = useState([]);
  const [listForm, setListForm] = useState({ collectionId:'', tokenId:'', price:1 });

  useEffect(() => {
    (async () => {
      const c = new UnifiedNUNCore();
      await c.ready;
      setCore(c);
      const a = 'user_' + Math.random().toString(36).slice(2, 10);
      setAddr(a);
      await c.mine(a, [c.actions.register(a)]);
      setBal(c.state.balances[a] || 0);
      setListings([...c.state.listings]);
    })();
  }, []);

  async function mineMore() { await core.mine(addr, []); setBal(core.state.balances[addr] || 0); }

  async function listNFT(e) {
    e.preventDefault();
    const act = core.actions.listNFT({ collectionId:listForm.collectionId, tokenId:listForm.tokenId, seller:addr, price:Number(listForm.price) });
    await core.mine(addr, [act]);
    setListings([...core.state.listings]); setBal(core.state.balances[addr] || 0);
  }

  async function buy(l) {
    const act = core.actions.buyNFT({ collectionId:l.collectionId, tokenId:l.tokenId, buyer:addr });
    await core.mine(addr, [act]);
    setListings([...core.state.listings]); setBal(core.state.balances[addr] || 0);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Marketplace</h1>
      <p><b>Your address:</b> {addr}</p>
      <p><b>Your NUN:</b> {bal}</p>
      <button onClick={mineMore}>Mine more NUN</button>

      <h2>List NFT (fees apply)</h2>
      <form onSubmit={listNFT}>
        <input placeholder="collectionId" value={listForm.collectionId} onChange={e=>setListForm({...listForm, collectionId:e.target.value})} /><br/>
        <input placeholder="tokenId" value={listForm.tokenId} onChange={e=>setListForm({...listForm, tokenId:e.target.value})} /><br/>
        <input type="number" placeholder="price (NUN)" value={listForm.price} onChange={e=>setListForm({...listForm, price:e.target.value})} /><br/>
        <button type="submit">List</button>
      </form>

      <h2>Listings</h2>
      {listings.length === 0 && <p>No listings yet.</p>}
      {listings.map((l, i) => (
        <div key={i} style={{ border:'1px solid #ccc', padding:8, margin:'8px 0' }}>
          <div><b>NFT:</b> {l.collectionId} / {l.tokenId}</div>
          <div><b>Seller:</b> {l.seller}</div>
          <div><b>Price:</b> {l.price} NUN</div>
          <button onClick={() => buy(l)}>Buy (fees apply)</button>
        </div>
      ))}
    </div>
  );
}
