"use client";

import { useState } from "react";
import useRoutes from "~/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
import SettingModal from "./SettingModal";

type TypeDesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar = ({ currentUser }: TypeDesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden border-neutral-100 text-neutral-100 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex  lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-r lg:pb-4 xl:px-4">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1 ">
            {routes.map(item => (
              <DesktopItem key={item.label} {...item} />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col items-center justify-between">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition hover:opacity-75">
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
