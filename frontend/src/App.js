import Repay from './components/Repay';
import Withdraw from './components/Withdraw';
import Security from './pages/Security';
import Docs from './pages/Docs';
import AirdropLeaderboard from './components/AirdropLeaderboard';
import ProtocolStats from './components/ProtocolStats';
import Hero from './components/Hero';
import HowItWorks from './pages/HowItWorks';
import UserDashboard from './components/UserDashboard';

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import Borrow from './components/Borrow';
import Airdrop from './components/Airdrop';
import CreditScore from './components/CreditScore';
import LiquidationStatus from './components/LiquidationStatus';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
        <Routes>
          <Route path="/" element={<><Hero /><ProtocolStats /><Dashboard /><UserDashboard /></>} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/repay" element={<Repay />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/security" element={<Security />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/airdrop-leaderboard" element={<AirdropLeaderboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/credit-score" element={<CreditScore />} />
          <Route path="/liquidation" element={<LiquidationStatus />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
