# Interview Ninja - Setup Guide

## Quick Start

### 1. Firebase Configuration (REQUIRED)

The application needs Firebase credentials to run. Follow these steps:

#### Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `interview-ninja-36875`
3. Click the gear icon ⚙️ > **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key** button
6. A JSON file will be downloaded

#### Step 2: Configure Environment Variables

1. Open the downloaded JSON file
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Open `.env.local` and fill in these values from the JSON:
   ```
   FIREBASE_PROJECT_ID=<value of "project_id">
   FIREBASE_CLIENT_EMAIL=<value of "client_email">
   FIREBASE_PRIVATE_KEY=<value of "private_key">
   ```

**Important**: Keep the quotes around `FIREBASE_PRIVATE_KEY` and preserve the `\n` characters!

#### Step 3: Install and Run

```bash
npm install
npm run dev
```

### 2. First Time Setup

#### Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (you'll configure security later)
4. Select a location close to your users

#### Set Up Collections

The app will automatically create collections when needed:
- `users` - User profiles
- `interviews` - Interview sessions
- `feedback` - Interview feedback

#### Configure Firestore Security Rules

Go to **Firestore Database** > **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone authenticated can read interviews
    // Only interview owners can modify
    match /interviews/{interviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                              request.auth.uid == resource.data.userId;
    }
    
    // Feedback accessible only by owner
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null && 
                           request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Enable Authentication

1. Go to **Authentication** in Firebase Console
2. Click **Get Started**
3. Enable **Email/Password** provider
4. Click **Save**

### 3. Test the Application

1. **Sign Up**: Go to `/sign-up` and create an account
2. **Profile Setup**: After signing up, complete your profile
3. **Start Interview**: Click "Start An Interview" on the dashboard
4. **View Results**: Check your history, statistics, and profile pages

## Troubleshooting

### Build Fails with "Failed to parse private key"

**Problem**: Firebase credentials not configured correctly

**Solution**: 
1. Make sure `.env.local` exists (not `.env.example`)
2. Verify `FIREBASE_PRIVATE_KEY` has quotes: `FIREBASE_PRIVATE_KEY="-----BEGIN..."`
3. Ensure `\n` characters are preserved in the private key
4. Restart the dev server after changing environment variables

### "User not found" Error

**Problem**: User document not created in Firestore

**Solution**:
1. Go to Firestore Database in Firebase Console
2. Check if `users` collection exists
3. Look for a document with your user's UID
4. If missing, try signing up again

### "Permission denied" Errors

**Problem**: Firestore security rules too restrictive

**Solution**:
1. Go to Firestore Database > Rules
2. Update rules as shown in the setup guide above
3. Click **Publish**

### Environment Variables Not Loading

**Problem**: `.env.local` not being read

**Solution**:
1. Ensure file is named exactly `.env.local` (not `.env` or `.env.example`)
2. Restart the development server: `Ctrl+C` then `npm run dev`
3. Check file is in the project root (same folder as `package.json`)

## Features Overview

### Dashboard (/)
- Performance statistics cards
- Your interviews section
- Available interviews to practice

### Interview System (/interview)
- AI-powered voice interviewer
- Customizable tech stack
- Real-time conversation

### History (/history)
- All past interviews
- Summary statistics
- Quick access to feedback

### Statistics (/statistics)
- Overall performance metrics
- Category-wise breakdown
- Progress tracking
- Common strengths and areas to improve

### Profile (/profile)
- View account information
- Edit name and email
- View performance statistics

### Profile Edit (/profile/edit)
- Update personal information
- Change email address
- Manage account settings

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint --fix
```

## Next Steps

1. ✅ Set up Firebase credentials
2. ✅ Configure Firestore security rules
3. ✅ Enable email/password authentication
4. ✅ Create your first account
5. ✅ Take a practice interview
6. 📊 Track your progress
7. 🎯 Improve your interview skills!

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review Firebase Console for any configuration issues
- Ensure all environment variables are set correctly
- Make sure Firestore security rules are published

## What's New

This enhanced version includes:
- ✨ **Profile Management**: Complete user profile with edit functionality
- 📊 **Enhanced Dashboard**: Statistics overview on the main page
- 📜 **Interview History**: Dedicated page for all past interviews
- 📈 **Statistics Page**: Detailed analytics and progress tracking
- 🎨 **Better UI/UX**: Loading skeletons and improved navigation
- 📱 **Mobile Navigation**: Bottom navigation bar for mobile devices
- 🔐 **Security**: Proper authentication and authorization checks
