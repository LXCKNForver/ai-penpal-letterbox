"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Loader2, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ProfileAvatarUploadProps = {
  avatarUrl?: string | null;
  fallbackLabel?: string;
  userId?: string | null;
};

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 2 * 1024 * 1024;

export function ProfileAvatarUpload({
  avatarUrl,
  fallbackLabel,
  userId,
}: ProfileAvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState(avatarUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const initials = fallbackLabel?.trim()?.slice(0, 2) || null;

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!userId) {
      setError("请先登录，再整理你的头像。");
      return;
    }

    if (!allowedTypes.has(file.type)) {
      setError("请选择 jpg、png 或 webp 图片。");
      return;
    }

    if (file.size > maxFileSize) {
      setError("图片有点大，请换一张 2MB 以内的头像。");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const path = `${userId}/avatar-${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) {
        throw updateError;
      }

      setCurrentUrl(publicUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "头像暂时没有上传成功，稍后再试一次。"
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="relative">
      <motion.button
        aria-label="更换头像"
        className={cn(
          "relative grid size-20 place-items-center overflow-hidden rounded-full border-[5px] border-paper-soft bg-olive text-paper-soft shadow-[0_12px_26px_rgba(86,62,33,0.12)] transition",
          "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75"
        )}
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        type="button"
        whileHover={isUploading ? undefined : { y: -1 }}
        whileTap={isUploading ? undefined : { scale: 0.98 }}
      >
        {currentUrl ? (
          <span
            aria-label="我的头像"
            className="size-full bg-cover bg-center"
            role="img"
            style={{ backgroundImage: `url("${currentUrl}")` }}
          />
        ) : initials ? (
          <span className="text-lg font-semibold">{initials}</span>
        ) : (
          <UserRound className="size-8" />
        )}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(63,52,40,0.18))]" />
        {isUploading ? (
          <span className="absolute inset-0 grid place-items-center bg-ink/22 text-paper-soft backdrop-blur-[1px]">
            <Loader2 className="size-5 animate-spin" />
          </span>
        ) : null}
      </motion.button>
      <input
        ref={inputRef}
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        disabled={isUploading}
        onChange={handleFileChange}
        type="file"
      />
      {error ? (
        <p className="absolute left-1/2 top-full mt-2 w-32 -translate-x-1/2 rounded-[12px] border border-stamp-red/20 bg-paper-soft/95 px-2 py-1 text-center text-[10px] leading-4 text-stamp-red shadow-[0_6px_14px_rgba(86,62,33,0.08)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
