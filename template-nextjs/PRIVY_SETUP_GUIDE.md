# Privy Authentication Setup Guide

This guide will help you set up Privy authentication for your World-Games template-nextjs project.

## 🚀 Quick Start

### 1. Install Dependencies

First, install the Privy React SDK:

```bash
npm install @privy-io/react-auth@latest
```

Or if you're using pnpm:

```bash
pnpm add @privy-io/react-auth@latest
```

### 2. Get Your Privy App ID

1. Go to the [Privy Dashboard](https://dashboard.privy.io/)
2. Sign up or log in to your account
3. Create a new app or select an existing one
4. Go to the "Settings" page
5. Under the "Basics" tab, find your "App ID"
6. Copy the App ID

### 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp env.example .env.local
```

Then edit `.env.local` and add your Privy App ID:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_actual_app_id_here
```

### 4. Configure Login Methods

In the Privy Dashboard:
1. Go to "Login Methods"
2. Enable the methods you want:
   - Email/Password
   - Wallet (MetaMask, WalletConnect, etc.)
   - Social logins (Google, Twitter, Discord, etc.)

## 🎮 How It Works

### Authentication Flow

1. **Unauthenticated State**: Users see a login button and cannot access the game
2. **Login Process**: Users can connect via wallet, email, or social login
3. **Authenticated State**: Users can play the game and see their profile info
4. **Logout**: Users can disconnect and return to the login state

### Components Added

#### 1. `PrivyProvider.tsx`
- Wraps the entire app with Privy authentication context
- Handles configuration and error states
- Requires `NEXT_PUBLIC_PRIVY_APP_ID` environment variable

#### 2. `AuthButton.tsx`
- Displays login/logout UI
- Shows user information when authenticated
- Handles loading states and errors

#### 3. Updated `App.tsx`
- Integrates authentication with the game
- Only shows the Phaser game when user is authenticated
- Shows welcome message when not authenticated

## 🔧 Configuration Options

### PrivyProvider Configuration

You can customize the PrivyProvider in `src/components/PrivyProvider.tsx`:

```tsx
<PrivyProviderBase
  appId={appId}
  config={{
    // Login methods
    loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord'],
    
    // Appearance
    appearance: {
      theme: 'light', // or 'dark'
      accentColor: '#676FFF',
      logo: 'https://your-logo-url.com/logo.png',
    },
    
    // Embedded wallets
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
    },
  }}
>
```

### Available Login Methods

- `email` - Email/password authentication
- `wallet` - Web3 wallet connection (MetaMask, WalletConnect, etc.)
- `google` - Google OAuth
- `twitter` - Twitter OAuth
- `discord` - Discord OAuth
- `github` - GitHub OAuth
- `apple` - Apple Sign-In
- `linkedin` - LinkedIn OAuth

## 🎨 Customization

### Styling

The authentication components use inline styles. You can customize them by:

1. **Modifying the components directly** - Edit the style objects in `AuthButton.tsx`
2. **Adding CSS classes** - Replace inline styles with CSS classes
3. **Using a CSS framework** - Integrate with Tailwind CSS or styled-components

### User Experience

- **Loading states** - Components show loading indicators during authentication
- **Error handling** - Errors are logged to console and can be displayed to users
- **Responsive design** - Components adapt to different screen sizes

## 🔒 Security Features

- **Environment variables** - App ID is stored securely in environment variables
- **Client-side only** - Authentication components are marked with `'use client'`
- **Token management** - Privy handles access tokens automatically
- **Session persistence** - User sessions persist across browser refreshes

## 🚨 Troubleshooting

### Common Issues

1. **"NEXT_PUBLIC_PRIVY_APP_ID is not set"**
   - Make sure you've created `.env.local` with your App ID
   - Restart your development server after adding environment variables

2. **"Cannot find module '@privy-io/react-auth'"**
   - Run `npm install @privy-io/react-auth@latest`
   - Make sure you're in the correct directory

3. **Login not working**
   - Check your App ID in the Privy Dashboard
   - Verify login methods are enabled
   - Check browser console for errors

4. **Styling issues**
   - Check if CSS is being applied correctly
   - Verify component imports are correct

### Debug Mode

Add this to your `.env.local` for additional logging:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
NEXT_PUBLIC_PRIVY_DEBUG=true
```

## 📚 Next Steps

1. **Install the package**: `npm install @privy-io/react-auth@latest`
2. **Set up your App ID** in `.env.local`
3. **Configure login methods** in the Privy Dashboard
4. **Test the authentication flow**
5. **Customize the UI** to match your game's design
6. **Add user-specific features** like high scores, progress tracking, etc.

## 🔗 Useful Links

- [Privy Documentation](https://docs.privy.io/)
- [Privy Dashboard](https://dashboard.privy.io/)
- [Privy React SDK Reference](https://docs.privy.io/reference/react)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🎯 Features You Can Add

- **User profiles** - Store and display user information
- **High scores** - Track user achievements
- **Progress saving** - Save game state per user
- **Social features** - Share scores, invite friends
- **Premium features** - Unlock content for authenticated users
- **Analytics** - Track user engagement and behavior
