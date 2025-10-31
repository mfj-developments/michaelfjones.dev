# Google OAuth Setup Guide

This guide walks you through setting up Google OAuth authentication with Supabase for your portfolio website.

## Overview

The implementation includes:
- **Supabase Auth** for managing user sessions
- **Google OAuth 2.0** for authentication
- **React Context** for global auth state
- **Session persistence** via secure cookies

---

## Prerequisites

- Supabase project (you mentioned you have one ready)
- Google Cloud Console account
- Local development environment running

---

## Step 1: Environment Variables

1. Create a `.env.local` file in the `web/` directory:

```bash
cd web
cp .env.local.example .env.local
```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard: https://supabase.com/dashboard
   - Click on your project
   - Go to **Settings** → **API**
   - Copy the following values:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **Anon/Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 2: Google Cloud Console Setup

### 2.1 Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click **Enable**

### 2.2 Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type (or Internal if you have a workspace)
3. Fill in the required fields:
   - **App name**: Michael F. Jones Portfolio
   - **User support email**: your email
   - **Developer contact**: your email
4. Add scopes (optional, basic profile is included by default):
   - `userinfo.email`
   - `userinfo.profile`
5. Save and continue

### 2.3 Create OAuth Client ID

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: Portfolio Website
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for local dev)
     - `https://michaelfjones.dev` (for production)
   - **Authorized redirect URIs**:
     - `https://your-project.supabase.co/auth/v1/callback`

   > **Note**: Replace `your-project` with your actual Supabase project reference ID from your project URL

5. Click **Create**
6. **Save the Client ID and Client Secret** - you'll need these next!

---

## Step 3: Supabase Dashboard Configuration

### 3.1 Enable Google Provider

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list and click to expand
4. Toggle **Enable Sign in with Google** to ON
5. Enter the credentials from Google Cloud Console:
   - **Client ID**: paste from Google Cloud Console
   - **Client Secret**: paste from Google Cloud Console
6. Click **Save**

### 3.2 Configure Redirect URLs

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Add your site URLs:
   - **Site URL**: `https://michaelfjones.dev` (or your production URL)
   - **Redirect URLs**: Add both:
     - `http://localhost:3000/api/auth/callback` (for local dev)
     - `https://michaelfjones.dev/api/auth/callback` (for production)

---

## Step 4: Local Development Testing

### 4.1 Start Development Server

```bash
cd web
npm run dev
```

Open http://localhost:3000 in your browser.

### 4.2 Test Authentication Flow

1. **Sign In**:
   - Click the "Sign In" button in the navigation bar
   - You should be redirected to Google's OAuth consent screen
   - Choose your Google account
   - Grant permissions
   - You'll be redirected back to your site

2. **Verify Logged-In State**:
   - After successful authentication, you should see:
     - Your Google profile picture (if available)
     - Your name in the navigation bar
   - On mobile: Open the menu to see your profile info

3. **Sign Out**:
   - Click your name/avatar in the nav
   - Click "Sign Out" in the dialog
   - You should be logged out and see "Sign In" button again

4. **Session Persistence**:
   - Log in
   - Refresh the page
   - You should still be logged in

---

## Step 5: Production Deployment

### 5.1 Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the same environment variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy your changes

### 5.2 Verify Production URLs

Double-check these are configured in both Google Cloud Console and Supabase:

**Google Cloud Console** → OAuth client → Authorized redirect URIs:
- `https://your-project.supabase.co/auth/v1/callback`

**Supabase** → Authentication → URL Configuration:
- Site URL: `https://michaelfjones.dev`
- Redirect URLs: `https://michaelfjones.dev/api/auth/callback`

---

## How It Works

### Authentication Flow

1. **User clicks "Sign In"**
   - `Nav` component calls `signInWithGoogle()` from `useAuth` hook
   - Redirects to Google OAuth consent screen

2. **Google authenticates user**
   - User grants permissions
   - Google redirects to: `https://your-project.supabase.co/auth/v1/callback?code=...`

3. **Supabase exchanges code**
   - Supabase receives the OAuth code
   - Exchanges it for user tokens
   - Redirects to: `http://localhost:3000/api/auth/callback?code=...`

4. **Your callback route completes authentication**
   - `/api/auth/callback` receives the code
   - Calls `exchangeCodeForSession()` to finalize the session
   - Redirects user back to home page

5. **AuthContext updates**
   - `onAuthStateChange` listener fires
   - User state updates globally
   - Nav component re-renders with user info

### File Structure

```
web/
├── src/
│   ├── app/
│   │   ├── api/auth/callback/route.ts   # OAuth callback handler
│   │   └── layout.tsx                    # Wraps app with AuthProvider
│   ├── components/
│   │   └── nav.tsx                       # Auth UI (Sign In/Out)
│   ├── contexts/
│   │   └── auth-context.tsx              # Global auth state
│   └── lib/supabase/
│       ├── client.ts                     # Browser Supabase client
│       └── server.ts                     # Server Supabase client
└── .env.local                            # Environment variables
```

---

## Troubleshooting

### "Invalid redirect URI" error
- Verify the redirect URI in Google Cloud Console exactly matches: `https://your-project.supabase.co/auth/v1/callback`
- Make sure there are no trailing slashes

### User gets stuck on OAuth screen
- Check browser console for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Ensure the Google provider is enabled in Supabase dashboard

### Session doesn't persist on refresh
- Check that cookies are enabled in your browser
- Verify the Supabase client is properly configured with cookie handling

### "Cannot read properties of undefined" error
- Make sure `AuthProvider` is wrapping your app in `layout.tsx`
- Check that `useAuth()` is only called within components inside `AuthProvider`

---

## Security Notes

- ✅ **Never commit** `.env.local` to git (already in `.gitignore`)
- ✅ **Use HTTPS** in production for secure cookies
- ✅ **Anon key is safe** to expose (it's public, Supabase has Row Level Security)
- ✅ **Service role key** should NEVER be used in client-side code (not needed for OAuth)

---

## Next Steps

Now that Google OAuth is set up, you can:

1. **Add protected routes** - Create pages only logged-in users can access
2. **Store user data** - Save preferences or content tied to user accounts
3. **Add more providers** - GitHub, Twitter, etc. (similar process)
4. **Customize user metadata** - Extend profile information

---

## Learning Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)

---

## Questions or Issues?

If you run into any problems:
1. Check the browser console for errors
2. Review the Supabase logs in your dashboard
3. Verify all environment variables are set correctly
4. Ensure URLs match exactly between Google Cloud Console and Supabase
