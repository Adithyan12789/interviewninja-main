"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  currentPhotoURL?: string;
  userName: string;
  onUpload: (file: File) => Promise<{ success: boolean; photoURL?: string; message?: string }>;
}

// Function to compress image
const compressImage = (file: File, maxWidth: number = 400, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader2 = new FileReader();
              reader2.readAsDataURL(blob);
              reader2.onloadend = () => {
                resolve(reader2.result as string);
              };
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export default function ProfileImageUpload({ 
  currentPhotoURL, 
  userName,
  onUpload 
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhotoURL || null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB for original)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    toast.loading("Compressing and uploading image...");
    
    try {
      // Compress image before upload
      const compressedImage = await compressImage(selectedFile, 400, 0.85);
      
      // Check compressed size (base64 is roughly 1.37x the binary size)
      const sizeInBytes = compressedImage.length;
      const sizeInKB = Math.round(sizeInBytes / 1024);
      
      if (sizeInBytes > 900000) { // 900KB limit to be safe
        toast.dismiss();
        toast.error(`Compressed image is still too large (${sizeInKB}KB). Please use a smaller image.`);
        setPreview(currentPhotoURL || null);
        setIsUploading(false);
        return;
      }

      // Create a new File object from the compressed data
      const response = await fetch(compressedImage);
      const blob = await response.blob();
      const compressedFile = new File([blob], selectedFile.name, { type: 'image/jpeg' });
      
      toast.dismiss();
      const result = await onUpload(compressedFile);
      
      if (result.success) {
        toast.success("Profile image updated successfully!");
        setSelectedFile(null);
      } else {
        toast.error(result.message || "Failed to upload image");
        setPreview(currentPhotoURL || null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss();
      toast.error("Failed to process image. Please try a different image.");
      setPreview(currentPhotoURL || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(currentPhotoURL || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Image Preview */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center ring-4 ring-white/10 overflow-hidden">
          {preview ? (
            <Image
              src={preview}
              alt={userName}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-5xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
          
          {/* Camera overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <Camera className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Action buttons */}
      {selectedFile ? (
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6 py-2"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={isUploading}
            variant="outline"
            className="flex items-center gap-2 border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="flex items-center gap-2 border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-2"
        >
          <Camera className="w-4 h-4" />
          Change Photo
        </Button>
      )}

      <p className="text-sm text-gray-400 text-center">
        Recommended: Square image, at least 400x400px<br />
        Images will be automatically compressed
      </p>
    </div>
  );
}
