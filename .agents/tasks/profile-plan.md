# Implementation Plan

- [ ] 1. **Update TypeScript definitions in `types/index.d.ts`**
      Add UserProfile interface with fields: id, userId, name, email, jobTitle?, experienceLevel?, techStack?, bio?, profilePicture?, createdAt, updatedAt.
      Add ProfileSetupData and ProfileEditData interfaces for form validation.
      Files: `types/index.d.ts`
      Verify: `npm run lint` passes with no TypeScript errors.

- [ ] 2. **Create profile server actions in `lib/actions/profile.action.ts`**
      Implement getUserProfile(userId): fetch from 'users' collection.
      Implement updateUserProfile(userId, data): update Firestore user doc with new profile fields.
      Implement updateUserPassword(params: {currentPassword, newPassword, email}): use Firebase Client SDK for re-authentication then update password.
      Implement updateUserEmail(params: {newEmail, idToken, userId}): update both Firebase Auth email (admin.auth().updateUser) and Firestore doc.
      All server actions use 'use server' directive and proper error handling.
      Files: `lib/actions/profile.action.ts`
      Verify: `npm run lint` passes with no TypeScript errors.

- [ ] 3. **Create Profile Setup page at `app/(root)/profile/setup/page.tsx`**
      Client component form for users to complete profile after sign-up.
      Fields: name (pre-filled, read-only), jobTitle (text input), experienceLevel (dropdown: Junior/Mid/Senior/Lead/Principal), techStack (comma-separated textarea), bio (textarea).
      Form validation with zod schema matching ProfileSetupData interface.
      On submit: call updateUserProfile server action, show success toast, redirect to '/'.
      Use existing FormField component and styling patterns from AuthForm.tsx.
      Files: `app/(root)/profile/setup/page.tsx`
      Verify: `npm run lint` passes, page compiles without errors.

- [ ] 4. **Create Profile View page at `app/(root)/profile/page.tsx`**
      Server component that shows user profile information.
      Fetch user with getCurrentUser() and profile data with getUserProfile(user.id).
      Display: name, email, jobTitle, experienceLevel, techStack (as badges), bio, account created date, total interviews taken (use getInterviewsByUserId).
      Has "Edit Profile" button linking to /profile/edit.
      Style with existing card classes and consistent dark theme.
      Files: `app/(root)/profile/page.tsx`
      Verify: `npm run lint` passes, page compiles without errors.

- [ ] 5. **Create Profile Edit page at `app/(root)/profile/edit/page.tsx`**
      Client component with two sections:
      - Profile Info form: name, jobTitle, experienceLevel, techStack, bio (pre-filled with current data)
      - Account Settings section: change password form (current password, new password, confirm new password) handled client-side with Firebase Client SDK reauthentication
      - Change email section: new email input, current password for re-auth, calls updateUserEmail server action
      Use existing FormField component and form patterns.
      All forms have proper validation and error handling.
      Files: `app/(root)/profile/edit/page.tsx`
      Verify: `npm run lint` passes, page compiles without errors.

- [ ] 6. **Update navigation in `app/(root)/layout.tsx`**
      Add profile link/avatar in the nav bar next to the logo.
      Show user initials or a profile icon (lucide-react User icon).
      Link to /profile page.
      Maintain existing styling and layout.
      Files: `app/(root)/layout.tsx`
      Verify: `npm run lint` passes, navigation displays correctly.

- [ ] 7. **Update sign-up flow (optional enhancement)**
      After successful sign-up, check if user has completed profile (jobTitle field exists).
      If profile incomplete, show a banner or redirect suggestion on home page.
      Keep existing sign-up → sign-in flow intact to avoid breaking changes.
      Files: `app/(root)/page.tsx` (add profile completion check)
      Verify: Existing sign-up flow still works, profile completion check doesn't break anything.

- [ ] 8. **Run full verification**
      Execute `npm run build` to ensure no TypeScript errors or compilation issues.
      Run `npm run lint` to check code quality.
      Test navigation to all new profile pages works correctly.
      Verify all forms submit properly and update Firestore.
      Files: Entire project
      Verify: `npm run build` completes successfully, all new features work as expected.