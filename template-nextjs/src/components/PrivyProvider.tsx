'use client';

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import { ReactNode } from 'react';

interface PrivyProviderProps {
  children: ReactNode;
}

export default function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = "cm6kv74hr0140cs70eomjoe8y";

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set in environment variables');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2>Configuration Error</h2>
        <p>Please set NEXT_PUBLIC_PRIVY_APP_ID in your environment variables</p>
        <p>Check your .env.local file</p>
      </div>
    );
  }

  return (
    <PrivyProviderBase
      appId={appId}
      config={{
        // Configure login methods
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord'],
        // Appearance configuration
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com/logo.png', // Optional: replace with your logo
        },
        // Embedded wallet configuration
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProviderBase>
  );
}
