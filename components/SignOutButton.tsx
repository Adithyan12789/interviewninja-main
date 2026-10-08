"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await signOut();
      
      if (result.success) {
        toast.success("Signed out successfully");
        router.push("/sign-in");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to sign out");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      variant="outline"
      className="flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 cursor-pointer min-h-11 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
    >
      <LogOut className="w-4 h-4" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
