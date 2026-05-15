import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages Import
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import RoleSelection from './pages/RoleSelection';
import CustomerHome from './pages/CustomerHome';
import CustomerProfile from './pages/CustomerProfile';
import ProviderHome from './pages/ProviderHome';
import ProviderProfile from './pages/ProviderProfile';
import CompleteProfile from './pages/CompleteProfile';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import ProviderOrders from './pages/ProviderOrders';
import Search from './pages/Search';
import CustomerOrders from './pages/CustomerOrders';
import ProviderDetails from './pages/ProviderDetails';

// Layouts Import
import CustomerLayout from './components/CustomerLayout';
import ProviderLayout from './components/ProviderLayout';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/role" element={<RoleSelection />} />
        
        {/* Customer Routes (With Bottom Navigation) */}
        <Route element={<CustomerLayout />}>
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/profile" element={<CustomerProfile />} />
        </Route>
        
        {/* Flow Routes (Full Screen - No Nav) */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/provider-details" element={<ProviderDetails />} />

        {/* Provider Routes (With Sidebar/Bottom Nav Layout) */}
        <Route element={<ProviderLayout />}>
          <Route path="/provider-home" element={<ProviderHome />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/provider-orders" element={<ProviderOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;