import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import ProfileEditFormClient from "@/components/ProfileEditFormClient";

export default async function ProfileEditPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-white text-3xl font-bold">Edit Profile</h2>
            <p className="text-gray-400 text-sm mt-1">Update your personal information and preferences</p>
          </div>
        </div>
        
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-3xl blur-2xl"></div>
          <div className="relative card-border w-full">
            <div className="dark-gradient rounded-3xl p-6 md:p-8 w-full">
              <ProfileEditFormClient user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
