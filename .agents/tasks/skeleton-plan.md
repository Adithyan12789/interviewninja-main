# Implementation Plan

## Overview
Create loading skeleton components to improve UX while data loads across the InterviewNinja application. The project uses Next.js 15 with server components and Tailwind CSS.

## Key Findings from Codebase Exploration
1. **Project Structure**: Next.js 15 with TypeScript, Tailwind CSS, and server components
2. **Build System**: `npm run build` for production, `npm run dev` for development
3. **Testing**: No test framework detected in package.json scripts
4. **Key Components**: 
   - `InterviewCard.tsx`: 360px wide, min-h-96, uses `card-border` and `card-interview` classes
   - Dashboard page (`app/(root)/page.tsx`): Has two sections "Your Interviews" and "Take an Interview" with async data fetching
   - Interview detail page: Shows interview info and Agent component
   - Feedback page: Shows detailed feedback breakdown
5. **Styling**: Uses custom CSS classes in `globals.css` including `card-border`, `card-interview`, `interviews-section`, etc.
6. **UI Components**: Located in `components/ui/` with pattern using `class-variance-authority` and `cn` utility

## Implementation Plan

- [ ] 1. **Create base Skeleton component**
   - Create `components/ui/skeleton.tsx` with pulse animation variant
   - Component should accept className prop and support different sizes
   - Include proper accessibility attributes: `aria-hidden='true'` on skeleton elements, wrapper with `aria-busy='true'` and `role='status'`
   - Use Tailwind's `animate-pulse` class with custom bg-gray-700 color for dark mode compatibility
   - Files: `components/ui/skeleton.tsx`
   - Verify: Component compiles without TypeScript errors.

- [ ] 2. **Create InterviewCardSkeleton component**
   - Create `components/InterviewCardSkeleton.tsx` matching exact dimensions of InterviewCard
   - Width: `w-[360px] max-sm:w-full`, Height: `min-h-96`
   - Use same structure: `card-border` wrapper, `card-interview` inner div
   - Include skeleton placeholders for:
     - Type badge in top-right corner
     - Circular image placeholder (90x90)
     - Title placeholder (role text)
     - Date and score placeholders with icon placeholders
     - Description placeholder (2 lines)
     - Tech icons placeholder area
     - Button placeholder
   - Files: `components/InterviewCardSkeleton.tsx`
   - Verify: Component renders correctly in Storybook or test page, matches InterviewCard dimensions exactly.

- [ ] 3. **Create ListSkeleton component**
   - Create `components/ListSkeleton.tsx` that renders N InterviewCardSkeletons
   - Accept `count` prop to control number of skeletons (default: 3)
   - Wrap in `interviews-section` class for proper layout
   - Files: `components/ListSkeleton.tsx`
   - Verify: Renders correct number of skeletons with proper spacing.

- [ ] 4. **Create StatisticsSkeleton component**
   - Create `components/StatisticsSkeleton.tsx` for potential stats sections
   - Design flexible grid/card layout for stats display
   - Include placeholders for numerical values and labels
   - Files: `components/StatisticsSkeleton.tsx`
   - Verify: Component compiles and provides flexible stat placeholder layout.

- [ ] 5. **Create FeedbackSkeleton component**
   - Create `components/FeedbackSkeleton.tsx` matching feedback page layout
   - Based on `app/(root)/interview/[id]/feedback/page.tsx` structure:
     - Header with title placeholder
     - Overall impression section with star icon and score placeholder
     - Date section with calendar icon placeholder
     - Divider line
     - Final assessment paragraph placeholder (3-4 lines)
     - Interview breakdown section with 3-5 category placeholders
     - Strengths section with 3-5 bullet point placeholders
     - Areas for improvement section with 3-5 bullet point placeholders
     - Button section placeholders
   - Use `section-feedback` class for wrapper
   - Files: `components/FeedbackSkeleton.tsx`
   - Verify: Matches feedback page layout structure.

- [ ] 6. **Integrate skeletons into dashboard page**
   - Modify `app/(root)/page.tsx` to use Suspense boundaries
   - Wrap async data fetching sections in `<Suspense>` with skeleton fallbacks
   - For "Your Interviews" section: Use `ListSkeleton` with count based on expected items
   - For "Take an Interview" section: Use `ListSkeleton` with count based on expected items
   - Consider loading states for user data if needed
   - Files: `app/(root)/page.tsx`
   - Verify: Page compiles, Suspense boundaries work, skeletons show during loading.

- [ ] 7. **Integrate skeletons into interview detail page**
   - Modify `app/(root)/interview/[id]/page.tsx` to show skeleton while interview data loads
   - Create skeleton for header section with:
     - Image placeholder
     - Role title placeholder
     - Tech icons placeholder area
     - Type badge placeholder
   - Consider skeleton for Agent component loading
   - Files: `app/(root)/interview/[id]/page.tsx`
   - Verify: Skeleton shows during data fetching, transitions to real content.

- [ ] 8. **Integrate skeletons into feedback page**
   - Modify `app/(root)/interview/[id]/feedback/page.tsx` to use `FeedbackSkeleton`
   - Wrap async data fetching in Suspense with `FeedbackSkeleton` as fallback
   - Files: `app/(root)/interview/[id]/feedback/page.tsx`
   - Verify: Feedback page shows skeleton while loading data.

- [ ] 9. **Add skeleton exports to components index**
   - Create or update `components/index.ts` to export all skeleton components
   - Export: `Skeleton`, `InterviewCardSkeleton`, `ListSkeleton`, `StatisticsSkeleton`, `FeedbackSkeleton`
   - Files: `components/index.ts` (create if doesn't exist)
   - Verify: All skeleton components can be imported from '@/components'

- [ ] 10. **Test and verify implementation**
   - Run `npm run build` to ensure no TypeScript or compilation errors
   - Start dev server with `npm run dev` and verify skeletons appear during loading
   - Test with slow network simulation to see skeleton transitions
   - Check accessibility attributes are properly set
   - Files: All modified files
   - Verify: Build succeeds, skeletons work correctly, accessibility attributes present.

## Technical Decisions and Rationale

1. **Base Skeleton Component**: Creating a reusable `Skeleton` component in `components/ui/` follows the existing UI component pattern and allows for consistent styling across all skeletons.

2. **Component-Specific Skeletons**: Creating separate skeleton components for each major UI element ensures exact dimension matching and proper visual hierarchy during loading.

3. **Suspense Integration**: Using Next.js Suspense boundaries is the recommended approach for server components with async data fetching. This provides the best user experience with seamless skeleton transitions.

4. **Accessibility**: Including `aria-hidden='true'` on skeleton elements and `aria-busy='true'` with `role='status'` on wrappers ensures screen readers properly announce loading states.

5. **Tailwind Classes**: Using `animate-pulse` with custom `bg-gray-700` ensures the skeletons work well with the dark theme while providing subtle shimmer animation.

6. **File Structure**: Placing skeleton components alongside their real counterparts (e.g., `InterviewCardSkeleton.tsx` next to `InterviewCard.tsx`) maintains organizational consistency.

## Verification Commands
- `npm run build` - Should compile without errors
- `npm run dev` - Start development server to visually verify skeletons
- Manual testing with browser DevTools network throttling to simulate slow loading