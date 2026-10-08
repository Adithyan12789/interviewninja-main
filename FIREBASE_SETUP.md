# 🔥 Firebase Setup Instructions

## ⚠️ Required: Get Your Firebase Credentials

Your application needs Firebase credentials to run. Follow these exact steps:

## Step-by-Step Guide

### 1️⃣ Go to Firebase Console

Open this link: [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 2️⃣ Select Your Project

Click on: **interview-ninja-36875**

### 3️⃣ Navigate to Service Accounts

1. Click the **gear icon** (⚙️) at the top left
2. Click **"Project Settings"**
3. Click the **"Service Accounts"** tab

### 4️⃣ Generate Private Key

1. Click the **"Generate New Private Key"** button
2. Click **"Generate Key"** in the confirmation dialog
3. A JSON file will download automatically (e.g., `interview-ninja-36875-firebase-adminsdk-xxxxx.json`)
4. **Keep this file safe!** It contains sensitive credentials

### 5️⃣ Open the Downloaded JSON File

Open the downloaded JSON file in a text editor. It should look like this:

```json
{
  "type": "service_account",
  "project_id": "interview-ninja-36875",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@interview-ninja-36875.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 6️⃣ Update .env.local File

1. Open `.env.local` in your project folder
2. Copy the values from the JSON file:

#### Example:

**From JSON:**
```json
{
  "project_id": "interview-ninja-36875",
  "client_email": "firebase-adminsdk-abcd1@interview-ninja-36875.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...(long key)...xyz==\n-----END PRIVATE KEY-----\n"
}
```

**To .env.local:**
```env
FIREBASE_PROJECT_ID=interview-ninja-36875
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abcd1@interview-ninja-36875.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...(long key)...xyz==\n-----END PRIVATE KEY-----\n"
```

### ⚠️ Important Notes:

1. **Keep the quotes** around `FIREBASE_PRIVATE_KEY`
2. **Don't remove the `\n`** characters in the private key
3. **Copy the entire private key** including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
4. The private key should be **one line** with `\n` characters (not actual line breaks)

### Example of Correct .env.local:

```env
FIREBASE_PROJECT_ID=interview-ninja-36875
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz123@interview-ninja-36875.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAA...(rest of key)...xyz==\n-----END PRIVATE KEY-----\n"
```

### 7️⃣ Restart Your Dev Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🔍 Verification

If everything is configured correctly, you should see:
- No Firebase errors when starting the dev server
- Ability to sign up and sign in
- Dashboard loads successfully

## ❌ Common Mistakes

### Mistake 1: Missing Quotes
```env
# ❌ Wrong (no quotes)
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...

# ✅ Correct (with quotes)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### Mistake 2: Removed \n Characters
```env
# ❌ Wrong (actual line breaks)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgk...
-----END PRIVATE KEY-----"

# ✅ Correct (\n as text)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...\n-----END PRIVATE KEY-----\n"
```

### Mistake 3: Incomplete Private Key
```env
# ❌ Wrong (missing parts)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMII..."

# ✅ Correct (complete key)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCB...(full key)...==\n-----END PRIVATE KEY-----\n"
```

## 🆘 Troubleshooting

### Error: "Service account object must contain a string 'private_key' property"

**Cause:** `FIREBASE_PRIVATE_KEY` is empty or not set

**Solution:** 
1. Check that `.env.local` exists (not `.env` or `.env.example`)
2. Verify all three variables are filled in
3. Make sure there are no spaces around the `=` sign
4. Restart the dev server

### Error: "Failed to parse private key"

**Cause:** Private key format is incorrect

**Solution:**
1. Make sure you copied the ENTIRE private key from the JSON file
2. Keep the quotes: `FIREBASE_PRIVATE_KEY="..."`
3. Keep the `\n` characters as text (don't convert to actual line breaks)
4. The key should start with `-----BEGIN PRIVATE KEY-----\n`
5. The key should end with `\n-----END PRIVATE KEY-----\n`

### Error: "credential-internal.js"

**Cause:** One or more Firebase credentials are missing

**Solution:**
1. Open `.env.local`
2. Verify all three variables have values:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
3. Save the file
4. Restart dev server

## 📧 Need Help?

If you're still having issues:

1. Double-check you followed every step above
2. Verify the downloaded JSON file is not corrupted
3. Try generating a new private key from Firebase Console
4. Make sure you're editing `.env.local` (not `.env.example`)
5. Restart VS Code or your terminal after making changes

## ✅ After Setup

Once configured correctly, you can:
- Sign up for a new account
- Sign in with your credentials
- View your dashboard
- Start practice interviews
- Track your progress

**Your app is ready! Just add the credentials.** 🚀
