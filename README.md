# Interview Ninja 🥷

An AI-powered interview practice platform built with Next.js, Firebase, and Vapi AI. Practice real interview scenarios and receive instant, detailed feedback to improve your interview skills.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Mock Interviews**: Practice interviews with an AI interviewer using voice interaction
- **Instant Feedback**: Get detailed analysis of your performance after each interview
- **Multiple Interview Types**: Technical, behavioral, and mixed interview formats
- **Tech Stack Customization**: Tailor interviews to specific technologies and frameworks
- **User Authentication**: Secure Firebase authentication with email/password

### 📊 Analytics & Tracking
- **Comprehensive Dashboard**: View your performance overview and statistics at a glance
- **Interview History**: Browse all past interviews with scores and details
- **Detailed Statistics**: Track progress across different skill categories
- **Performance Metrics**: 
  - Total interviews taken
  - Average score tracking
  - Highest score achieved
  - Most practiced roles
  - Category-wise performance breakdown

### 👤 Profile Management
- **User Profile**: View and manage your account information
- **Profile Editing**: Update name, email, and preferences
- **Settings**: Customize your interview experience
- **Account Security**: Change email and manage account settings

### 📈 Enhanced Feedback
- **Score Breakdown Charts**: Visual representation of category scores
- **Strengths Identification**: Highlighted areas where you excel
- **Improvement Checklist**: Actionable items to work on
- **Detailed Category Analysis**: Feedback on:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence and Clarity

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading Skeletons**: Smooth loading states for better perceived performance
- **Mobile Navigation**: Bottom navigation bar for easy mobile access
- **Dark Theme**: Eye-friendly dark interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project set up
- Vapi AI account (for voice interactions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interviewninja-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Then fill in your Firebase credentials:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to: Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Copy the values to `.env.local`:
     ```
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
interviewninja-main/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # Main application pages
│   │   ├── interview/       # Interview pages
│   │   │   └── [id]/
│   │   │       ├── feedback/  # Feedback page
│   │   │       └── page.tsx   # Interview detail
│   │   ├── history/         # Interview history page
│   │   ├── statistics/      # Statistics page
│   │   ├── profile/         # Profile pages
│   │   │   ├── edit/        # Edit profile
│   │   │   └── page.tsx     # View profile
│   │   └── page.tsx         # Dashboard
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # UI components (button, input, etc.)
│   ├── Agent.tsx            # AI agent component
│   ├── InterviewCard.tsx    # Interview display card
│   ├── StatisticsSummary.tsx
│   ├── ScoreBreakdownChart.tsx
│   ├── ImprovementChecklist.tsx
│   ├── StrengthsBadges.tsx
│   └── ProfileEditForm.tsx
├── lib/
│   ├── actions/             # Server actions
│   │   ├── auth.action.ts   # Authentication logic
│   │   ├── general.action.ts # General data operations
│   │   └── profile.action.ts # Profile management
│   └── utils.ts             # Utility functions
├── firebase/
│   ├── admin.ts             # Firebase Admin SDK
│   └── client.ts            # Firebase Client SDK
├── types/                   # TypeScript definitions
└── constants/               # App constants

```

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)
- **Database**: [Cloud Firestore](https://firebase.google.com/products/firestore)
- **AI Integration**: 
  - [Vapi AI](https://vapi.ai/) for voice interactions
  - [Google Gemini](https://ai.google.dev/) for feedback generation
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [Day.js](https://day.js.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📊 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard with performance overview |
| `/interview` | Start a new interview |
| `/interview/[id]` | Interview session page |
| `/interview/[id]/feedback` | Detailed feedback page |
| `/history` | View all past interviews |
| `/statistics` | Comprehensive analytics |
| `/profile` | View user profile |
| `/profile/edit` | Edit profile settings |
| `/sign-in` | Sign in page |
| `/sign-up` | Sign up page |

## 🎯 Key Features Breakdown

### Dashboard
- Performance overview with statistics cards
- Recent interviews section
- Available interviews to practice
- Quick action buttons

### Interview System
- Voice-based AI interviewer
- Real-time conversation
- Multiple question types
- Customizable tech stack and difficulty

### Feedback System
- Overall score (0-100)
- Category-wise breakdown:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence and Clarity
- Strengths identified
- Areas for improvement
- Final assessment

### Profile Management
- View and edit personal information
- Update email address
- Account settings
- Performance statistics

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database with these collections:
   - `users` - User profiles
   - `interviews` - Interview sessions
   - `feedback` - Interview feedback

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /interviews/{interviewId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Built with ❤️ using Next.js and Firebase
