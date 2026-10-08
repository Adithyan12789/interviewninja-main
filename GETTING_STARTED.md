# 🚀 Getting Started with Interview Ninja

## ⚠️ Important: You Must Configure Firebase First!

The application is complete and ready to use, but it **requires Firebase credentials** to run. Without them, the build will fail.

## Quick Setup (5 minutes)

### Step 1: Get Your Firebase Credentials

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Click on your project: **interview-ninja-36875**
3. Click the **gear icon** (⚙️) → **Project Settings**
4. Go to the **Service Accounts** tab
5. Click **"Generate New Private Key"** button
6. Download the JSON file (keep it safe!)

### Step 2: Configure Environment Variables

1. Open the downloaded JSON file
2. In your project folder, rename `.env.example` to `.env.local`
3. Open `.env.local` and fill in these three values:

```env
# Copy from the JSON file:
FIREBASE_PROJECT_ID=interview-ninja-36875
FIREBASE_CLIENT_EMAIL=<paste "client_email" value here>
FIREBASE_PRIVATE_KEY="<paste "private_key" value here>"
```

**⚠️ Important Notes:**
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Don't modify the `\n` characters in the private key
- The file must be named `.env.local` (not `.env` or `.env.example`)

### Step 3: Set Up Firestore Database

1. In Firebase Console, click **Firestore Database** in the left menu
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (we'll secure it next)
4. Select a location (choose closest to your users)
5. Click **"Enable"**

### Step 4: Configure Security Rules

1. In Firestore Database, click on the **"Rules"** tab
2. Replace the content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /interviews/{interviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

3. Click **"Publish"**

### Step 5: Enable Authentication

1. Click **"Authentication"** in the left menu
2. Click **"Get Started"**
3. Select **"Email/Password"** as a sign-in method
4. Toggle **"Enable"**
5. Click **"Save"**

### Step 6: Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎉 What You Get

### New Pages
- ✅ **Dashboard** (`/`) - Enhanced with statistics overview
- ✅ **Profile** (`/profile`) - View your account and stats
- ✅ **Edit Profile** (`/profile/edit`) - Update your information
- ✅ **History** (`/history`) - All your past interviews
- ✅ **Statistics** (`/statistics`) - Comprehensive analytics
- ✅ **Interview** (`/interview`) - Start practice interviews
- ✅ **Feedback** (`/interview/[id]/feedback`) - Enhanced feedback view

### New Features
- ✅ Profile management with edit functionality
- ✅ Comprehensive statistics tracking
- ✅ Interview history with filtering
- ✅ Enhanced feedback with visual charts
- ✅ Responsive navigation (desktop + mobile)
- ✅ Loading skeletons for better UX
- ✅ Mobile-friendly bottom navigation

## 🧪 Test the Application

### 1. Create an Account
- Go to `/sign-up`
- Enter name, email, and password
- Click "Sign Up"

### 2. Explore Features
- **Dashboard**: View performance overview
- **Profile**: See your account information
- **Start Interview**: Practice with AI interviewer
- **View Feedback**: Get detailed analysis
- **Check Statistics**: Track your progress
- **History**: Browse past interviews

## 🔧 Troubleshooting

### "Failed to parse private key" Error

**Cause**: Invalid or missing Firebase credentials

**Fix**:
1. Check `.env.local` file exists (not `.env.example`)
2. Verify `FIREBASE_PRIVATE_KEY` has quotes
3. Ensure `\n` characters are preserved
4. Restart dev server: `Ctrl+C` then `npm run dev`

### Build Fails

**Cause**: Missing Firebase credentials

**Fix**: Complete Steps 1-2 above

### "Permission denied" in Firestore

**Cause**: Security rules not configured

**Fix**: Complete Step 4 above

### Can't Sign In/Sign Up

**Cause**: Authentication not enabled

**Fix**: Complete Step 5 above

## 📚 Additional Resources

- **`README.md`** - Full documentation
- **`SETUP_GUIDE.md`** - Detailed setup guide
- **`.env.example`** - Environment variable template

## 🎯 What's Working

✅ All pages created and functional  
✅ All components built and styled  
✅ Navigation with mobile support  
✅ Profile management system  
✅ Statistics and analytics  
✅ Enhanced feedback display  
✅ Interview history tracking  
✅ Loading states and skeletons  
✅ Responsive design  
✅ TypeScript types defined  
✅ No ESLint errors  

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm start            # Run production build

# Linting
npm run lint         # Check for issues
npm run lint --fix   # Auto-fix issues
```

## 🎊 You're All Set!

Once you configure Firebase (Steps 1-5), everything will work perfectly!

The application includes:
- Complete profile management
- Interview practice with AI
- Detailed feedback and analytics
- Performance tracking
- Interview history
- And much more!

**Happy interviewing! 🥷**
