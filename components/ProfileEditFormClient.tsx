"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserProfile, updateUserEmail, uploadProfileImage } from "@/lib/actions/profile.action";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface ProfileEditFormClientProps {
  user: User;
}

export default function ProfileEditFormClient({ user }: ProfileEditFormClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleImageUpload = async (file: File) => {
    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;
      const result = await uploadProfileImage(user.id, base64Data);
      
      if (result.success) {
        router.refresh();
      }
      
      return result;
    } catch (error) {
      console.error("Image upload error:", error);
      return {
        success: false,
        message: "Failed to upload image. Please try again.",
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let hasChanges = false;

      // Update name if changed
      if (formData.name !== user.name) {
        const nameResult = await updateUserProfile(user.id, { name: formData.name });
        if (!nameResult.success) {
          toast.error(nameResult.message || "Failed to update name");
          setIsLoading(false);
          return;
        }
        hasChanges = true;
      }

      // Update email if changed
      if (formData.email !== user.email) {
        const emailResult = await updateUserEmail(user.id, formData.email);
        if (!emailResult.success) {
          toast.error(emailResult.message || "Failed to update email");
          setIsLoading(false);
          return;
        }
        hasChanges = true;
      }

      if (hasChanges) {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh();
      } else {
        toast.info("No changes to save");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center pb-8 border-b border-white/10 w-full">
        <h3 className="text-white text-lg font-semibold mb-6">Profile Picture</h3>
        <ProfileImageUpload
          currentPhotoURL={user.photoURL}
          userName={user.name}
          onUpload={handleImageUpload}
        />
      </div>

      {/* Personal Information */}
      <div className="space-y-6 w-full">
        <h3 className="text-white text-lg font-semibold mb-4">Personal Information</h3>
        
        <div className="space-y-2 w-full">
          <Label htmlFor="name" className="text-white text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-purple-500 focus:ring-purple-500/20 w-full"
            required
          />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="email" className="text-white text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-purple-500 focus:ring-purple-500/20 w-full"
            required
          />
          <p className="text-sm text-gray-400">
            Changing your email will require verification
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 w-full">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-8 py-3 h-12 shadow-lg shadow-purple-500/25"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Saving Changes..." : "Save Changes"}
        </Button>
        
        <Button
          type="button"
          asChild
          variant="outline"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-8 py-3 h-12 border-white/10 text-white hover:bg-white/5"
        >
          <Link href="/profile">
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </Button>
      </div>
    </form>
  );
}
