# Environment Setup

## Required Environment Variables

To run this application, you need to set up the following environment variables:

### 1. Privy App ID (Required)

Create a `.env.local` file in the root directory with:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

**How to get your Privy App ID:**
1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Create a new app or select an existing one
3. Copy the App ID from the dashboard
4. Add it to your `.env.local` file

### 2. Base Sepolia RPC URL (Optional)

```bash
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

This defaults to `https://sepolia.base.org` if not provided.

## Build Issues

If you encounter build errors related to Privy, it's likely because the `NEXT_PUBLIC_PRIVY_APP_ID` environment variable is not set. The application will show a helpful error message when this happens.

## Deployment

For deployment platforms like Vercel:

1. Set the environment variables in your deployment platform's settings
2. Make sure `NEXT_PUBLIC_PRIVY_APP_ID` is set to a valid Privy app ID
3. The application will work without the RPC URL (it has a default)

## Development

1. Copy `.env.example` to `.env.local`
2. Fill in your Privy App ID
3. Run `npm run dev`
