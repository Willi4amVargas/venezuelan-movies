import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";

export async function AddImageToBucket(filename: string, FileInput: File) {
  const { data, error } = await supabase.storage
    .from("covers")
    .upload(filename, FileInput);
  if (error) {
    toast.error("Error uploading image: " + error.message);
    return;
  }
}

export async function GetImageUrl(filename: string | null): Promise<string | null> {
  const { data } = await supabase.storage.from("covers").getPublicUrl(filename || "");
  return data.publicUrl;
}
