# Implementation Plan

## Overview
Add three new pages to the InterviewNinja application: User Profile, Interview History, and Statistics/Analytics pages. Also update navigation to include links to these pages.

## Technical Decisions

1. **New Server Action**: Create `getAllFeedbackByUserId` in `general.action.ts` that fetches all feedback documents for a user, including associated interview data for role information.

2. **Page Structure**: All new pages will be async Server Components under `app/(root)/` following existing patterns:
   - `/profile` → `app/(root)/profile/page.tsx`
   - `/history` → `app/(root)/history/page.tsx`
   - `/stats` → `app/(root)/stats/page.tsx`

3. **Data Aggregation**: The stats page needs to compute averages across all feedback, including per-category breakdowns matching the 5 categories from `feedbackSchema`.

4. **Navigation Update**: Add three new navigation links to `app/(root)/layout.tsx` following the same pattern as existing navigation.

5. **Reuse Components**: Use existing `InterviewCard` component for the history page, passing appropriate props.

6. **Styling Consistency**: Use existing CSS utility classes: `card-border`, `card-interview`, `dark-gradient`, `blue-gradient-dark`, `section-feedback`, `btn-primary`, `btn-secondary`, `interviews-section`.

## Implementation Steps

### 1. Add getAllFeedbackByUserId Server Action
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\lib\actions\general.action.ts`
- Add function signature: `export async function getAllFeedbackByUserId(userId: string): Promise<Array<Feedback & { interview?: Interview }> | null>`
- Query Firestore: get all feedback documents where `userId` matches
- For each feedback, optionally fetch the associated interview document to get role information
- Return array of feedback objects with optional interview data
- Return `null` if no feedback exists
**Verification**: Test by calling function with test user ID, verify it returns correct data structure

### 2. Create Profile Page
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\app\(root)\profile\page.tsx`
- Fetch current user with `getCurrentUser()` from auth.action
- Fetch user stats using `getAllFeedbackByUserId(user.id)` to compute:
  - Total interviews taken (count of feedback)
  - Average score (average of `totalScore` across all feedback)
- Page structure:
  - Header: User Profile
  - User info section: name, email
  - Stats summary card: total interviews, average score
  - Back to dashboard link using `btn-primary` class
- Style with `section-feedback` class for consistent layout
**Verification**: Build and run dev server, navigate to `/profile`, verify user info and stats display correctly

### 3. Create History Page
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\app\(root)\history\page.tsx`
- Fetch current user with `getCurrentUser()`
- Fetch all feedback with `getAllFeedbackByUserId(user.id)`
- Map feedback data to props for `InterviewCard` component:
  - `id`: feedback.interviewId
  - `role`: feedback.interview?.role or "Unknown Role"
  - `type`: feedback.interview?.type or "Mixed"
  - `techstack`: feedback.interview?.techstack or []
  - `createdAt`: feedback.createdAt
- Render grid of `InterviewCard` components using `interviews-section` class
- Include page header and empty state message
**Verification**: Build and run dev server, navigate to `/history`, verify all past interviews display with scores and dates

### 4. Create Statistics/Analytics Page
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\app\(root)\stats\page.tsx`
- Fetch current user with `getCurrentUser()`
- Fetch all feedback with `getAllFeedbackByUserId(user.id)`
- Compute analytics:
  - Total interviews count
  - Average score across all feedback
  - Per-category score breakdown (5 categories from `feedbackSchema`):
    - Communication Skills
    - Technical Knowledge  
    - Problem Solving
    - Cultural Fit
    - Confidence and Clarity
  - Strengths and areas for improvement aggregated across all feedback
- Display:
  - Overall stats cards
  - Category breakdown with progress bars (use `.progress` CSS class)
  - Aggregated strengths list
  - Aggregated areas for improvement list
- Style with `section-feedback` class
**Verification**: Build and run dev server, navigate to `/stats`, verify all analytics display correctly with proper calculations

### 5. Update Navigation
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\app\(root)\layout.tsx`
- Add navigation links container after the logo link
- Add three new `Link` components:
  - Profile: href="/profile", text "Profile"
  - History: href="/history", text "History"
  - Stats: href="/stats", text "Stats"
- Style links with consistent text-white styling
- Use flex layout for horizontal navigation
**Verification**: Build and run dev server, verify navigation appears with all three new links, all links work correctly

### 6. Add Type Definitions (if needed)
**Files**: `c:\Users\adith\OneDrive\Desktop\Projects\interviewninja-main\types\index.d.ts`
- Add type for aggregated stats if needed for the stats page computations
- Likely not needed as we can compute inline in the page component

## Verification Commands
- Build: `npm run build` - should succeed without TypeScript errors
- Dev server: `npm run dev` - all new pages should load without errors
- Navigation: Click all nav links, verify pages load correctly
- Data: Verify all pages show correct user data and computed statistics

## Dependencies
- No new packages needed
- All data fetching uses existing Firebase configuration
- All styling uses existing Tailwind utility classes

## Notes
- All pages must be Server Components (async functions)
- All text must use `text-white` class for consistency
- Empty states should be handled gracefully (show "No data" messages)
- Firestore queries should be efficient: batch operations where possible
- Category names must match exactly those in `feedbackSchema` from constants
- Use `dayjs` for date formatting (already installed)
