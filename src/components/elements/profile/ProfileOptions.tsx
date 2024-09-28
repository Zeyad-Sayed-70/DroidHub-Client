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
import { UserType } from "@/types/user.type";
import { signOut } from "next-auth/react";

const EditDialogContent = lazy(() => import("./EditDialogContent"));

const ProfileOptions = ({
  profile,
  refetch,
}: {
  profile: UserType;
  refetch: (id: string) => void;
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
            onClick={() => signOut()}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit the profile</DialogTitle>
          </DialogHeader>

          <Suspense fallback={<SmallLoading />}>
            <EditDialogContent
              profile={profile}
              refetch={refetch}
              setIsEditOpen={setIsEditOpen}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileOptions;
