import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/multibleInput";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCommunityMutation } from "@/lib/features/communities/communitiesApiSlice";
import { useUploadImageMutation } from "@/lib/features/image/imageApiSlice";
import { CommunityType } from "@/types/community";
import Image from "next/image";
import React, { useCallback, useState } from "react";

const EditDialogContent = ({
  community,
  refetch,
  setIsEditOpen,
}: {
  community: CommunityType | undefined;
  refetch: () => void;
  setIsEditOpen: (value: boolean) => void;
}) => {
  const [uploadImage, { isLoading: isUploadImageLoading }] =
    useUploadImageMutation();
  const [updateCommunity, { isLoading: isUpdateCommunityLoading }] =
    useUpdateCommunityMutation();

  const [data, setData] = useState({
    name: community?.name || "",
    description: community?.description || "",
    image: community?.image || "",
    banar: community?.banar || "",
    category: community?.category || "",
    tags: community?.tags || [],
  });

  const [imagesBase64, setImageBase64] = useState({
    image: "",
    banar: "",
  });
  // const [imagesFiles, setImagesFiles] = useState<[null | File, null | File]>([
  //   null,
  //   null,
  // ]);
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

      console.log("imagesFiles", imagesFiles);

      const uploadPromises = Object.entries(imagesFiles).map(
        async ([key, imageFile]) => {
          console.log("imageFile", imageFile);
          if (imageFile) {
            const formDataObj = new FormData();
            formDataObj.append("file", imageFile as File);

            try {
              const result = await uploadImage(formDataObj).unwrap();
              console.log("result", result);

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

      console.log("imageUrl", imageUrl);

      if (data.name && data.description) {
        try {
          const newCommunity = await updateCommunity({
            communityId: community?._id as string,
            newCommunity: {
              name: data.name,
              description: data.description,
              image: imageUrl["image"] || data.image,
              banar: imageUrl["banar"] || data.banar,
              tags: data.tags,
            },
          }).unwrap();
          console.log(newCommunity);
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
    [data, uploadImage, updateCommunity]
  );

  if (!community) return;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => handleSubmit(e, imagesFiles)}
    >
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          name="community name"
          placeholder="Community Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="community description"
          placeholder="Community Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <TagInput setFormData={setData} initialTags={community.tags} />
      </div>
      <div>
        <label htmlFor="banar">Banar</label>
        <Input
          id="banar"
          type="file"
          accept="image/*"
          name="community banar"
          placeholder="Community Banar"
          onChange={(e) => handleImageChange(e, "banar")}
        />
        <div className="flex items-center gap-4">
          <Image
            src={
              community.banar
                ? `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${community.banar}`
                : "/community-robots.jfif"
            }
            alt="Community Banar"
            width={200}
            height={100}
            className="rounded-md my-2 max-h-[100px] object-cover"
          />

          {imagesBase64.banar && <div>---&gt;</div>}
          {imagesBase64.banar && (
            <Image
              src={imagesBase64.banar}
              alt="Community Banar"
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
          name="community image"
          placeholder="Community Image"
          onChange={(e) => handleImageChange(e, "image")}
        />
        <div className="flex items-center gap-4">
          <Image
            src={
              community.image
                ? `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${community.image}`
                : "/robo-user.png"
            }
            alt="Community Image"
            width={100}
            height={100}
            className="rounded-md my-2"
          />

          {imagesBase64.image && <div>---&gt;</div>}
          {imagesBase64.image && (
            <Image
              src={imagesBase64.image}
              alt="Community Image"
              width={100}
              height={100}
              className="rounded-md my-2"
            />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Update</Button>
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
