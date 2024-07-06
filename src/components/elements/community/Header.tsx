"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Paragraph from "@/components/ui/paragraph";
import { TooltipUi } from "@/components/ui/tooltip";
import CreateDialogContent from "./CreateDialogContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);
  return (
    <>
      <div className="flex items-center gap-3 justify-between">
        <Paragraph content="Join our communities today to discover and explore everything the world offer!" />
        <TooltipUi
          title="Create new Communitiy"
          delayDuration={100}
          trigger={
            <span
              className="w-10 h-10 flex justify-center items-center bg-primary hover:opacity-85 transition-all rounded-full"
              onClick={handleDialogOpen}
            >
              <IoAddOutline className="text-2xl text-white" />
            </span>
          }
        />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Community</DialogTitle>
          </DialogHeader>

          <CreateDialogContent setOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
