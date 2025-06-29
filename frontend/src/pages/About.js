import React, { useState } from 'react';


function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can add actual message sending logic here
  };

  return (
    <div style={{ padding: '32px 0', maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '2rem', fontWeight: 700 }}>About Us</h2>
      <div style={{ fontSize: '1.1rem', marginBottom: 32 }}>
        Lending Protocol is a decentralized finance (DeFi) platform built on Ethereum, enabling users to deposit ETH as collateral, borrow DAI, and participate in automated, secure, and transparent lending and liquidation processes.<br /><br />
        <b>Why choose our protocol?</b><br />
        - <b>Security-first:</b> Built with Chainlink Data Feeds, Automation, and VRF for tamper-proof oracles, trustless automation, and provable randomness.<br />
        - <b>Truly decentralized:</b> No admin keys, no upgradeable proxies, and open-source smart contracts.<br />
        - <b>Fair and transparent:</b> All actions are on-chain, with real-time pricing and automated liquidations.<br />
        - <b>Innovative features:</b> Credit scoring, airdrops, and leaderboard rewards.<br /><br />
        <b>How is collateral used?</b><br />
        When you deposit ETH, it is locked as collateral in the protocol. This collateral backs your DAI loan and protects the protocol from insolvency. If your collateral value drops too low, automated liquidation ensures the protocol remains solvent and fair for all users.<br />
        <br />
        Powered by Chainlink oracles and automation, our protocol ensures fair pricing, robust security, and innovative features like credit scoring and airdrops.
      </div>
      <h3 style={{ marginBottom: '12px', fontSize: '1.3rem', fontWeight: 600 }}>Contact Us</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: 6, border: '1px solid #CBD5E0', fontSize: '1rem' }}
        />
        <input
          name="email"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: 6, border: '1px solid #CBD5E0', fontSize: '1rem' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: 6, border: '1px solid #CBD5E0', fontSize: '1rem', minHeight: 80 }}
        />
        <button
          type="submit"
          style={{ background: '#319795', color: 'white', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
        >
          Send
        </button>
        {submitted && <span style={{ color: '#38A169', marginTop: 8 }}>Message sent! Thank you for contacting us.</span>}
      </form>
    </div>
  );
}

export default About;
