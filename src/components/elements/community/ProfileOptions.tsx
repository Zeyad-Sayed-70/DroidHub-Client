import React, { lazy, Suspense } from "react";
import { HiDotsVertical } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SmallLoading from "@/components/ui/smallLoading";
import { CommunityType } from "@/types/community";

const EditDialogContent = lazy(() => import("./EditDialogContent"));
const DeleteDialogContent = lazy(() => import("./DeleteDialogContent"));

const ProfileOptions = ({
  community,
  refetch,
}: {
  community: CommunityType | undefined;
  refetch: () => void;
}) => {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="text-xl   bg-red-300 ">
            <HiDotsVertical />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:!text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit the community</DialogTitle>
          </DialogHeader>

          <Suspense fallback={<SmallLoading />}>
            <EditDialogContent
              community={community}
              refetch={refetch}
              setIsEditOpen={setIsEditOpen}
            />
          </Suspense>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to DELETE this community?
            </DialogTitle>
          </DialogHeader>

          <Suspense fallback={<SmallLoading />}>
            <DeleteDialogContent />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileOptions;
