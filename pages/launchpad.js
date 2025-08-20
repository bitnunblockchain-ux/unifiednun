import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function Launchpad() {
  const [core, setCore] = useState(null);
  const [addr, setAddr] = useState('');
  const [bal, setBal] = useState(0);

  const [tokenForm, setTokenForm] = useState({ tokenId:'', name:'', symbol:'', decimals:18, supply:0 });
  const [nftForm, setNftForm] = useState({ collectionId:'', name:'', symbol:'' });
  const [mintNFTForm, setMintNFTForm] = useState({ collectionId:'', tokenId:'', to:'' });

  useEffect(() => {
    (async () => {
      const c = new UnifiedNUNCore();
      await c.ready;
      setCore(c);
      const a = 'creator_' + Math.random().toString(36).slice(2, 10);
      setAddr(a);
      await c.mine(a, [c.actions.register(a)]);
      setBal(c.state.balances[a] || 0);
    })();
  }, []);

  async function mineMore() { await core.mine(addr, []); setBal(core.state.balances[addr] || 0); }

  async function createToken(e) {
    e.preventDefault();
    const a = core.actions;
    await core.mine(addr, [
      a.createToken({ tokenId: tokenForm.tokenId, name: tokenForm.name, symbol: tokenForm.symbol, decimals: Number(tokenForm.decimals), caller: addr }),
      a.mintToken({ tokenId: tokenForm.tokenId, to: addr, amount: Number(tokenForm.supply), caller: addr })
    ]);
    setBal(core.state.balances[addr] || 0);
    alert('Token created (fees applied).');
  }

  async function createNFT(e) {
    e.preventDefault();
    const a = core.actions;
    await core.mine(addr, [ a.createNFT({ collectionId: nftForm.collectionId, name: nftForm.name, symbol: nftForm.symbol, caller: addr }) ]);
    setBal(core.state.balances[addr] || 0);
    alert('NFT collection created (fees applied).');
  }

  async function mintNFT(e) {
    e.preventDefault();
    const a = core.actions;
    await core.mine(addr, [ a.mintNFT({ collectionId: mintNFTForm.collectionId, tokenId: mintNFTForm.tokenId, to: mintNFTForm.to || addr, caller: addr }) ]);
    setBal(core.state.balances[addr] || 0);
    alert('NFT minted (fees applied).');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Launchpad</h1>
      <p><b>Your address:</b> {addr}</p>
      <p><b>Your NUN:</b> {bal}</p>
      <button onClick={mineMore}>Mine more NUN</button>
      <hr />

      <h2>Create Token</h2>
      <form onSubmit={createToken}>
        <input placeholder="tokenId" value={tokenForm.tokenId} onChange={e=>setTokenForm({...tokenForm, tokenId:e.target.value})} /><br/>
        <input placeholder="name" value={tokenForm.name} onChange={e=>setTokenForm({...tokenForm, name:e.target.value})} /><br/>
        <input placeholder="symbol" value={tokenForm.symbol} onChange={e=>setTokenForm({...tokenForm, symbol:e.target.value})} /><br/>
        <input type="number" placeholder="decimals" value={tokenForm.decimals} onChange={e=>setTokenForm({...tokenForm, decimals:e.target.value})} /><br/>
        <input type="number" placeholder="initial supply" value={tokenForm.supply} onChange={e=>setTokenForm({...tokenForm, supply:e.target.value})} /><br/>
        <button type="submit">Create Token (fees apply)</button>
      </form>

      <h2>Create NFT Collection</h2>
      <form onSubmit={createNFT}>
        <input placeholder="collectionId" value={nftForm.collectionId} onChange={e=>setNftForm({...nftForm, collectionId:e.target.value})} /><br/>
        <input placeholder="name" value={nftForm.name} onChange={e=>setNftForm({...nftForm, name:e.target.value})} /><br/>
        <input placeholder="symbol" value={nftForm.symbol} onChange={e=>setNftForm({...nftForm, symbol:e.target.value})} /><br/>
        <button type="submit">Create Collection (fees apply)</button>
      </form>

      <h2>Mint NFT</h2>
      <form onSubmit={mintNFT}>
        <input placeholder="collectionId" value={mintNFTForm.collectionId} onChange={e=>setMintNFTForm({...mintNFTForm, collectionId:e.target.value})} /><br/>
        <input placeholder="tokenId" value={mintNFTForm.tokenId} onChange={e=>setMintNFTForm({...mintNFTForm, tokenId:e.target.value})} /><br/>
        <input placeholder="to (optional)" value={mintNFTForm.to} onChange={e=>setMintNFTForm({...mintNFTForm, to:e.target.value})} /><br/>
        <button type="submit">Mint (fees apply)</button>
      </form>
    </div>
  );
}
