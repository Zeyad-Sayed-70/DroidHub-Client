import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SmallLoading from "@/components/ui/smallLoading";
import { useCreateCommunityMutation } from "@/lib/features/communities/communitiesApiSlice";
import { useUploadImageMutation } from "@/lib/features/image/imageApiSlice";

interface CommunityFormData {
  name: string;
  description: string;
  imageFile: File | null;
}

const CreateDialogContent = ({
  setOpen,
}: {
  setOpen: (val: boolean) => void;
}) => {
  const [uploadImage, { isLoading: isUploadImageLoading }] =
    useUploadImageMutation();
  const [createCommunity, { isLoading: isCreatingLoading }] =
    useCreateCommunityMutation();

  const [formData, setFormData] = useState<CommunityFormData>({
    name: "",
    description: "",
    imageFile: null,
  });

  const [imageBase64, setImageBase64] = useState<string>("");

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        if (file.type.startsWith("image/")) {
          setFormData((prevData) => ({ ...prevData, imageFile: file }));

          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64(reader.result as string);
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
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let imageUrl = "";

      if (formData.imageFile) {
        const formDataObj = new FormData();
        formDataObj.append("file", formData.imageFile);

        try {
          const result = await uploadImage(formDataObj).unwrap();
          imageUrl = result.url;
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
            return;
          }
        }
      }

      if (formData.name && formData.description) {
        try {
          const newCommunity = await createCommunity({
            name: formData.name,
            description: formData.description,
            image: imageUrl,
          }).unwrap();

          // Reset the form and close the dialog
          setFormData({ name: "", description: "", imageFile: null });
          setImageBase64("");
          setOpen(false);
        } catch (error) {
          if (error instanceof Error) {
            alert(`Error: ${error.message}`);
          }
        }
      } else {
        alert("Please fill out all fields");
      }
    },
    [formData, uploadImage, createCommunity, setOpen]
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={formData.name}
        maxLength={20}
        placeholder="Community Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type="text"
        value={formData.description}
        maxLength={150}
        placeholder="Community Description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        placeholder="Community Image"
      />
      {imageBase64 && (
        <Image
          src={imageBase64}
          alt="Community Image"
          width={100}
          height={100}
          className="rounded-md"
        />
      )}
      <Button
        type="submit"
        className="w-fit"
        disabled={isUploadImageLoading || isCreatingLoading}
      >
        {(isUploadImageLoading || isCreatingLoading) && (
          <span className="mr-2">
            <SmallLoading />
          </span>
        )}
        Create
      </Button>
    </form>
  );
};

export default CreateDialogContent;
