"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserProfile, updateUserEmail } from "@/lib/actions/profile.action";

interface ProfileEditFormProps {
  user: User;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update name if changed
      if (formData.name !== user.name) {
        const nameResult = await updateUserProfile(user.id, { name: formData.name });
        if (!nameResult.success) {
          toast.error(nameResult.message || "Failed to update name");
          setIsLoading(false);
          return;
        }
      }

      // Update email if changed
      if (formData.email !== user.email) {
        const emailResult = await updateUserEmail(user.id, formData.email);
        if (!emailResult.success) {
          toast.error(emailResult.message || "Failed to update email");
          setIsLoading(false);
          return;
        }
      }

      toast.success("Profile updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-white">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <p className="text-sm text-gray-400">
          Changing your email will require verification
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="text-sm font-semibold bg-white hover:bg-gray-600 hover:text-white rounded-full px-5 py-3 cursor-pointer min-h-10"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="text-sm font-semibold rounded-full px-5 py-3 cursor-pointer min-h-10 border-white/10 text-white hover:bg-white/5"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
