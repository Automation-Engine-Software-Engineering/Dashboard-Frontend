import { PencilIcon } from "lucide-react";

import { editProfileImage } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useProfile } from "@/hooks/server-state/use-profile";

import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL as string;

const ProfileImage = () => {
  const queryClient = useQueryClient();
  const { data: profileData } = useProfile();

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => editProfileImage(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] })
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", String(profileData?.id));

    mutate(formData);
  };

  return (
    <div className="group relative -ms-20 size-40 overflow-hidden rounded-full border-8 border-slate-50 bg-white">
      <div className="invisible absolute inset-0 flex items-center justify-center bg-black/10 group-hover:visible">
        <Button variant="secondary" size="sm" asChild>
          <label className="flex cursor-pointer items-center gap-2">
            <PencilIcon />
            <input
              type="file"
              accept="images/*"
              onInput={handleChangeImage}
              className="absolute size-0 cursor-pointer opacity-0"
            />
          </label>
        </Button>
      </div>
      <img
        src={
          profileData?.imageUrl
            ? `${API_URL}/${profileData?.imageUrl}`
            : "/images/placeholder-person.webp"
        }
        alt="profile image"
        className="size-full object-cover"
      />
    </div>
  );
};
export default ProfileImage;
