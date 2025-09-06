'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export default function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) {
    return (
      <div style={{ 
        padding: '1rem',
        textAlign: 'center',
        background: '#f0f0f0',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        Loading authentication...
      </div>
    );
  }

  if (authenticated && user) {
    return (
      <div style={{ 
        padding: '1rem',
        background: '#e8f5e8',
        borderRadius: '8px',
        margin: '1rem',
        border: '1px solid #4caf50'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>
            Welcome to the Game! 🎮
          </h3>
          <p style={{ margin: '0', color: '#388e3c' }}>
            {user.email && `Email: ${user.email}`}
            {user.wallet && `Wallet: ${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`}
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '1rem',
      background: '#fff3e0',
      borderRadius: '8px',
      margin: '1rem',
      border: '1px solid #ff9800'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#e65100' }}>
        Please Login to Play 🚀
      </h3>
      <p style={{ margin: '0 0 1rem 0', color: '#f57c00' }}>
        Connect your wallet or sign in with email to start playing!
      </p>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#676FFF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        {isLoading ? 'Connecting...' : 'Login / Connect Wallet'}
      </button>
    </div>
  );
}
