'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';
import { useNftCheck } from '../hooks/useNftCheck';
import { EventBus } from '../game/EventBus';

export default function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check NFT ownership
  const { hasNft, isChecking, error } = useNftCheck(user?.wallet?.address);

  // Notify game about authentication status
  useEffect(() => {
    console.log('AuthButton: Authentication status changed', { authenticated, user: !!user });
    if (authenticated) {
      console.log('AuthButton: Emitting user-authenticated event');
      EventBus.emit('user-authenticated', { authenticated, user });
    } else {
      console.log('AuthButton: Emitting user-logged-out event');
      EventBus.emit('user-logged-out', { authenticated: false });
    }
  }, [authenticated, user]);

  // Listen for auth status requests from the game
  useEffect(() => {
    const handleAuthStatusRequest = () => {
      console.log('AuthButton: Received auth status request, current status:', { authenticated, user: !!user });
      if (authenticated) {
        EventBus.emit('user-authenticated', { authenticated, user });
      } else {
        EventBus.emit('user-logged-out', { authenticated: false });
      }
    };

    EventBus.on('request-auth-status', handleAuthStatusRequest);
    
    return () => {
      EventBus.off('request-auth-status', handleAuthStatusRequest);
    };
  }, [authenticated, user]);

  // Notify game about NFT ownership status
  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      EventBus.emit('nft-ownership-updated', { hasNft, isChecking, error });
    }
  }, [authenticated, user?.wallet?.address, hasNft, isChecking, error]);

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
        padding: '0.5rem',
        textAlign: 'center',
        background: '#f0f0f0',
        borderRadius: '4px',
        margin: '0.25rem',
        fontSize: '0.875rem'
      }}>
        Loading...
      </div>
    );
  }

  if (authenticated && user) {
    return (
      <div style={{ 
        padding: '0.5rem',
        background: '#e8f5e8',
        borderRadius: '4px',
        margin: '0.25rem',
        border: '1px solid #4caf50',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.25rem 0', color: '#2e7d32', fontSize: '1rem' }}>
            Welcome! 🎮
          </h3>
          <p style={{ margin: '0', color: '#388e3c', fontSize: '0.75rem' }}>
            {user.email && `Email: ${user.email}`}
            {user.wallet && `Wallet: ${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`}
          </p>
          {isChecking ? (
            <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.7rem' }}>
              Checking NFT ownership...
            </p>
          ) : hasNft ? (
            <p style={{ margin: '0.25rem 0 0 0', color: '#4caf50', fontSize: '0.7rem' }}>
              ✈️ Fighter Jet NFT: Owned
            </p>
          ) : (
            <p style={{ margin: '0.25rem 0 0 0', color: '#f44336', fontSize: '0.7rem' }}>
              ✈️ Fighter Jet NFT: Not Owned
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          style={{
            padding: '0.25rem 0.5rem',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            fontSize: '0.75rem',
            whiteSpace: 'nowrap'
          }}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '0.5rem',
      background: '#fff3e0',
      borderRadius: '4px',
      margin: '0.25rem',
      border: '1px solid #ff9800',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 0.25rem 0', color: '#e65100', fontSize: '1rem' }}>
          Login to Play 🚀
        </h3>
        <p style={{ margin: '0', color: '#f57c00', fontSize: '0.75rem' }}>
          Connect wallet or sign in to start!
        </p>
      </div>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        style={{
          padding: '0.375rem 0.75rem',
          background: '#676FFF',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}
      >
        {isLoading ? 'Connecting...' : 'Login / Connect'}
      </button>
    </div>
  );
}
