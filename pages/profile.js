import { useEffect, useState } from 'react';
import { UnifiedNUNCore } from '../lib/core';

export default function Profile() {
  const [core, setCore] = useState(null);
  const [addr, setAddr] = useState('');
  const [bal, setBal] = useState(0);
  const [form, setForm] = useState({ username:'', bio:'' });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const c = new UnifiedNUNCore();
      await c.ready;
      setCore(c);
      const a = 'user_' + Math.random().toString(36).slice(2, 10);
      setAddr(a);
      await c.mine(a, [c.actions.register(a)]);
      setBal(c.state.balances[a] || 0);
      setProfile(c.state.profiles[a] || null);
    })();
  }, []);

  async function mineMore() { await core.mine(addr, []); setBal(core.state.balances[addr] || 0); }

  async function save(e) {
    e.preventDefault();
    const act = core.actions.setProfile(addr, form);
    await core.mine(addr, [act]);
    setProfile(core.state.profiles[addr]);
    setBal(core.state.balances[addr] || 0);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      <p><b>Your address:</b> {addr}</p>
      <p><b>Your NUN:</b> {bal}</p>
      <button onClick={mineMore}>Mine more NUN</button>
      <h2>Set Profile (fees apply)</h2>
      <form onSubmit={save}>
        <input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} /><br/>
        <textarea placeholder="bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} /><br/>
        <button type="submit">Save</button>
      </form>
      {profile && (
        <div style={{ marginTop: 12 }}>
          <h3>Current</h3>
          <div><b>Username:</b> {profile.username}</div>
          <div><b>Bio:</b> {profile.bio}</div>
        </div>
      )}
    </div>
  );
}
