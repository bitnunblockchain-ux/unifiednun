export async function createP2P(peers = []) {
  // Only initialize in the browser
  if (typeof window === 'undefined') {
    return { gun: null, chainNode: null, reportsNode: null };
  }
  const { default: Gun } = await import('gun');
  const gun = Gun({ peers }); // stay peerless for pure browser demo
  return {
    gun,
    chainNode: gun.get('unun_chain_v31'),
    reportsNode: gun.get('unun_reports_v31')
  };
}
