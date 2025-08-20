import { createP2P } from './p2p';

export async function createBus() {
  const { reportsNode } = await createP2P();
  return { reports: reportsNode };
}

export function makeReport(kind, payload) {
  return { kind, payload, ts: Date.now() };
}
