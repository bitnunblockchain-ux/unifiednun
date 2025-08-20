import { createP2P } from './p2p';
import { kvGet, kvSet } from './kv';

// IMPORTANT: insert your hardware wallet address here (do this before deploy)
const FOUNDER_ADDRESS = 'YOUR_HARD_WALLET_ADDRESS'; // e.g. "nun1abc123..."

const BLOCK_REWARD = 1;
const FOUNDER_PERCENT = 0.5;

const FEE = {
  REGISTER:       0.00,
  SET_PROFILE:    0.01,
  CREATE_TOKEN:   0.20,
  MINT_TOKEN:     0.01,
  TRANSFER_TOKEN: 0.005,
  CREATE_NFT:     0.20,
  MINT_NFT:       0.01,
  TRANSFER_NFT:   0.005,
  LIST_NFT:       0.01,
  BUY_NFT:        0.01
};

export class UnifiedNUNCore {
  constructor() {
    this.blocks = [];
    this.state = {
      balances: { [FOUNDER_ADDRESS]: 0 },
      registrations: {},
      profiles: {},
      tokens: {},      // tokenId -> { name, symbol, decimals, totalSupply, owner, balances }
      nfts: {},        // collectionId -> { name, symbol, owner, items: { tokenId -> owner } }
      listings: []     // { type:'NFT', collectionId, tokenId, seller, price }
    };
    this.ready = this._init();
  }

  async _init() {
    const { chainNode } = await createP2P();
    this.chainNode = chainNode;
    await this._load();
    this._subscribe();
  }

  _subscribe() {
    if (!this.chainNode) return;
    this.chainNode.on((data) => {
      if (!data) return;
      try {
        const blocks = typeof data === 'string' ? JSON.parse(data) : data;
        if (Array.isArray(blocks) && blocks.length >= this.blocks.length) {
          this._rebuild(blocks);
        }
      } catch {}
    });
  }

  async _save() {
    await kvSet('unun_blocks', JSON.stringify(this.blocks));
  }

  async _load() {
    const raw = await kvGet('unun_blocks');
    if (!raw) return;
    try {
      const blocks = JSON.parse(raw);
      if (Array.isArray(blocks)) this._rebuild(blocks);
    } catch {}
  }

  _rebuild(blocks) {
    this.blocks = [];
    this.state = {
      balances: { [FOUNDER_ADDRESS]: 0 },
      registrations: {},
      profiles: {},
      tokens: {},
      nfts: {},
      listings: []
    };
    blocks.forEach((b) => this._applyBlock(b));
  }

  _credit(addr, amt) {
    this.state.balances[addr] = (this.state.balances[addr] || 0) + amt;
  }

  _debit(addr, amt) {
    const bal = this.state.balances[addr] || 0;
    if (bal >= amt) { this.state.balances[addr] = bal - amt; return true; }
    return false;
  }

  _collectFee(payer, type) {
    const fee = FEE[type] || 0;
    if (fee === 0) return true;
    if (this._debit(payer, fee)) { this._credit(FOUNDER_ADDRESS, fee); return true; }
    return false;
  }

  _applyBlock(block) {
    // Proof-of-Visit reward split
    const founderShare = BLOCK_REWARD * FOUNDER_PERCENT;
    const minerShare = BLOCK_REWARD - founderShare;
    this._credit(block.miner, minerShare);
    this._credit(FOUNDER_ADDRESS, founderShare);

    (block.actions || []).forEach((a) => this._applyAction(a));
    this.blocks.push(block);
  }

  _applyAction(a) {
    switch (a.type) {
      case 'REGISTER': {
        const actor = a.address;
        if (!this._collectFee(actor, 'REGISTER')) return;
        if (!this.state.registrations[actor]) this.state.registrations[actor] = { ts: a.timestamp };
        break;
      }
      case 'SET_PROFILE': {
        const actor = a.address;
        if (!this._collectFee(actor, 'SET_PROFILE')) return;
        const prev = this.state.profiles[actor] || {};
        this.state.profiles[actor] = { ...prev, ...a.profile };
        break;
      }
      case 'CREATE_TOKEN': {
        const actor = a.caller;
        if (!this._collectFee(actor, 'CREATE_TOKEN')) return;
        if (this.state.tokens[a.tokenId]) return;
        this.state.tokens[a.tokenId] = {
          name: a.name, symbol: a.symbol, decimals: a.decimals ?? 18,
          totalSupply: 0, owner: actor, balances: {}
        };
        break;
      }
      case 'MINT_TOKEN': {
        const actor = a.caller;
        if (!this._collectFee(actor, 'MINT_TOKEN')) return;
        const t = this.state.tokens[a.tokenId]; if (!t) return;
        if (t.owner !== actor) return;
        t.totalSupply += a.amount;
        t.balances[a.to] = (t.balances[a.to] || 0) + a.amount;
        break;
      }
      case 'TRANSFER_TOKEN': {
        const actor = a.from;
        if (!this._collectFee(actor, 'TRANSFER_TOKEN')) return;
        const t = this.state.tokens[a.tokenId]; if (!t) return;
        const bal = t.balances[a.from] || 0;
        if (bal >= a.amount) {
          t.balances[a.from] = bal - a.amount;
          t.balances[a.to] = (t.balances[a.to] || 0) + a.amount;
        }
        break;
      }
      case 'CREATE_NFT': {
        const actor = a.caller;
        if (!this._collectFee(actor, 'CREATE_NFT')) return;
        if (this.state.nfts[a.collectionId]) return;
        this.state.nfts[a.collectionId] = { name: a.name, symbol: a.symbol, owner: actor, items: {} };
        break;
      }
      case 'MINT_NFT': {
        const actor = a.caller;
        if (!this._collectFee(actor, 'MINT_NFT')) return;
        const col = this.state.nfts[a.collectionId]; if (!col) return;
        if (col.owner !== actor) return;
        if (!col.items[a.tokenId]) col.items[a.tokenId] = a.to;
        break;
      }
      case 'TRANSFER_NFT': {
        const actor = a.from;
        if (!this._collectFee(actor, 'TRANSFER_NFT')) return;
        const col = this.state.nfts[a.collectionId]; if (!col) return;
        if (col.items[a.tokenId] === a.from) col.items[a.tokenId] = a.to;
        break;
      }
      case 'LIST_NFT': {
        const actor = a.seller;
        if (!this._collectFee(actor, 'LIST_NFT')) return;
        const col = this.state.nfts[a.collectionId]; if (!col) return;
        if (col.items[a.tokenId] !== a.seller) return;
        this.state.listings.push({
          type: 'NFT', collectionId: a.collectionId, tokenId: a.tokenId, seller: a.seller, price: a.price
        });
        break;
      }
      case 'BUY_NFT': {
        const actor = a.buyer;
        if (!this._collectFee(actor, 'BUY_NFT')) return;
        const idx = this.state.listings.findIndex(l => l.type === 'NFT' && l.collectionId === a.collectionId && l.tokenId === a.tokenId);
        if (idx === -1) return;
        const listing = this.state.listings[idx];
        if (this._debit(actor, listing.price)) {
          this._credit(listing.seller, listing.price);
          const col = this.state.nfts[a.collectionId];
          if (col && col.items[a.tokenId] === listing.seller) {
            col.items[a.tokenId] = actor;
            this.state.listings.splice(idx, 1);
          }
        }
        break;
      }
      default: break;
    }
  }

  async mine(miner, actions = []) {
    const block = { index: this.blocks.length + 1, timestamp: Date.now(), miner, actions };
    this._applyBlock(block);
    await this._save();
    if (this.chainNode) this.chainNode.put(JSON.stringify(this.blocks));
    return block;
  }

  actions = {
    register: (address) => ({ type: 'REGISTER', address, timestamp: Date.now() }),
    setProfile: (address, profile) => ({ type: 'SET_PROFILE', address, profile }),
    createToken: ({ tokenId, name, symbol, decimals, caller }) =>
      ({ type: 'CREATE_TOKEN', tokenId, name, symbol, decimals, caller }),
    mintToken: ({ tokenId, to, amount, caller }) =>
      ({ type: 'MINT_TOKEN', tokenId, to, amount, caller }),
    transferToken: ({ tokenId, from, to, amount }) =>
      ({ type: 'TRANSFER_TOKEN', tokenId, from, to, amount }),
    createNFT: ({ collectionId, name, symbol, caller }) =>
      ({ type: 'CREATE_NFT', collectionId, name, symbol, caller }),
    mintNFT: ({ collectionId, tokenId, to, caller }) =>
      ({ type: 'MINT_NFT', collectionId, tokenId, to, caller }),
    transferNFT: ({ collectionId, tokenId, from, to }) =>
      ({ type: 'TRANSFER_NFT', collectionId, tokenId, from, to }),
    listNFT: ({ collectionId, tokenId, seller, price }) =>
      ({ type: 'LIST_NFT', collectionId, tokenId, seller, price }),
    buyNFT: ({ collectionId, tokenId, buyer }) =>
      ({ type: 'BUY_NFT', collectionId, tokenId, buyer })
  };
}
