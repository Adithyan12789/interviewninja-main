"use server";

import { db } from "@/firebase/admin";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
  userId: string,
  data: { name?: string; photoURL?: string }
) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await userRef.update(data);

    revalidatePath("/profile");
    revalidatePath("/");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}

export async function updateUserEmail(userId: string, newEmail: string) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Check if email is already in use
    const existingUser = await db
      .collection("users")
      .where("email", "==", newEmail)
      .get();

    if (!existingUser.empty && existingUser.docs[0].id !== userId) {
      return {
        success: false,
        message: "Email is already in use",
      };
    }

    await userRef.update({ email: newEmail });

    revalidatePath("/profile");
    revalidatePath("/");

    return {
      success: true,
      message: "Email updated successfully",
    };
  } catch (error) {
    console.error("Error updating email:", error);
    return {
      success: false,
      message: "Failed to update email. Please try again.",
    };
  }
}

export async function uploadProfileImage(
  userId: string,
  imageData: string
) {
  try {
    // In a real implementation, you would:
    // 1. Upload to Firebase Storage
    // 2. Get the download URL
    // 3. Update user profile with photoURL
    
    // For now, we'll store the base64 data directly
    // In production, use Firebase Storage or another service
    
    const userRef = db.collection("users").doc(userId);
    await userRef.update({ 
      photoURL: imageData,
      updatedAt: new Date().toISOString()
    });

    revalidatePath("/profile");
    revalidatePath("/profile/edit");

    return {
      success: true,
      photoURL: imageData,
      message: "Profile image updated successfully",
    };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return {
      success: false,
      message: "Failed to upload image. Please try again.",
    };
  }
}
