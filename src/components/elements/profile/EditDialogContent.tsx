import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/multibleInput";
import SmallLoading from "@/components/ui/smallLoading";
import { Textarea } from "@/components/ui/textarea";
import { useUploadImageMutation } from "@/lib/features/image/imageApiSlice";
import { useUpdateUserMutation } from "@/lib/features/users/usersSlice";
import { UserType } from "@/types/user.type";
import { renderImg } from "@/utils/renderImg";
import Image from "next/image";
import React, { useCallback, useState } from "react";

const EditDialogContent = ({
  profile,
  refetch,
  setIsEditOpen,
}: {
  profile: UserType;
  refetch: (id: string) => void;
  setIsEditOpen: (value: boolean) => void;
}) => {
  const [uploadImage, { isLoading: isUploadImageLoading }] =
    useUploadImageMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const isLoading = isUploadImageLoading || isUpdateUserLoading;

  const [data, setData] = useState({
    username: profile?.username || "",
    bio: profile?.bio || "",
    avatar: profile?.avatar || "",
    role: profile?.role || "",
    banar: profile?.banar || "",
  });

  const [imagesBase64, setImageBase64] = useState({
    image: "",
    banar: "",
  });

  const [imagesFiles, setImagesFiles] = useState<{
    image: File | null;
    banar: File | null;
  }>({ banar: null, image: null });

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "banar") => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        if (file.type.startsWith("image/")) {
          if (type === "image")
            setImagesFiles((prevData) => ({ ...prevData, image: file }));
          else setImagesFiles((prevData) => ({ ...prevData, banar: file }));

          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64((prevData) => ({
              ...prevData,
              [type]: reader.result as string,
            }));
          };

          reader.readAsDataURL(file);
        } else {
          alert("Please select an image file");
        }
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, imagesFiles: any) => {
      e.preventDefault();
      let imageUrl = {
        image: "",
        banar: "",
      };

      const uploadPromises = Object.entries(imagesFiles).map(
        async ([key, imageFile]) => {
          if (imageFile) {
            const formDataObj = new FormData();
            formDataObj.append("file", imageFile as File);

            try {
              const result = await uploadImage(formDataObj).unwrap();

              if (key === "image") {
                imageUrl.image = result.url;
              } else {
                imageUrl.banar = result.url;
              }
            } catch (error) {
              if (error instanceof Error) {
                console.error("Error:", error);
                alert(`Error: ${error.message}`);
                throw error;
              }
            }
          }
        }
      );

      try {
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("One or more uploads failed:", error);
      }

      if (data.username && data.bio) {
        try {
          await updateUser({
            userId: profile?._id as string,
            newUser: {
              username: data.username,
              bio: data.bio,
              avatar: imageUrl["image"] || data.avatar,
              banar: imageUrl["banar"] || data.banar,
              role: data.role,
            },
          }).unwrap();
        } catch (error) {
          if (error instanceof Error) {
            alert(`Error: ${error.message}`);
          }
        } finally {
          // Close the dialog
          setIsEditOpen(false);
        }
      } else {
        alert("Please fill out all fields");
      }
    },
    [data, uploadImage, updateUser]
  );

  if (!profile) return null;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => handleSubmit(e, imagesFiles)}
    >
      <div>
        <label htmlFor="name">Username</label>
        <Input
          id="name"
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      {/* <div>
        <label htmlFor="role">Role</label>
        <Input
          id="role"
          type="text"
          name="role"
          placeholder="Role"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        />
      </div> */}
      <div>
        <label htmlFor="bio">Bio</label>
        <Textarea
          id="bio"
          name="profile bio"
          placeholder="User Bio"
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="banar">Banar</label>
        <Input
          id="banar"
          type="file"
          accept="image/*"
          name="profile banar"
          placeholder="User Banar"
          onChange={(e) => handleImageChange(e, "banar")}
        />
        <div className="flex items-center gap-4">
          <Image
            src={renderImg(profile?.banar)}
            alt="User Banar"
            width={200}
            height={100}
            className="rounded-md my-2 max-h-[100px] object-cover"
          />

          {imagesBase64.banar && <div>---&gt;</div>}
          {imagesBase64.banar && (
            <Image
              src={imagesBase64.banar}
              alt="User Banar"
              width={200}
              height={100}
              className="rounded-md my-2 max-h-[100px] object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          name="profile image"
          placeholder="User Image"
          onChange={(e) => handleImageChange(e, "image")}
        />
        <div className="flex items-center gap-4">
          <Image
            src={renderImg(profile?.avatar)}
            alt="User Image"
            width={100}
            height={100}
            className="rounded-md my-2"
          />

          {imagesBase64.image && <div>---&gt;</div>}
          {imagesBase64.image && (
            <Image
              src={imagesBase64.image}
              alt="User Image"
              width={100}
              height={100}
              className="rounded-md my-2"
            />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <SmallLoading /> : ""} Update
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => setIsEditOpen(false)}
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default EditDialogContent;
