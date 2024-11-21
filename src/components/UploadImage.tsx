"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  initialImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  initialImage,
  className = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
 
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      onUpload(result.url);
    } catch (error) {
      console.error("Upload error:", error); 
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onUpload("");
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        id="image-upload"
      />

      <div className="relative w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <ImagePlus size={48} className="text-gray-400" />
            <span className="text-gray-500 mt-2">Upload Image</span>
          </label>
        )}
      </div>

      {file && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <Upload size={16} className="mr-2" />
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
