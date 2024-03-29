"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Converasation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

import Avatar from "~/components/Avatar";
import useOtherUser from "~/hooks/useOtherUsers";
import ConfirmModal from "./ConfirmModal";

type TypeProfileDrawer = {
  data: Converasation & {
    user: User[];
  };
  isOpen: boolean;
  onClose: () => void;
};

const ProfileDrawer = ({ data, isOpen, onClose }: TypeProfileDrawer) => {
  const otherUser = useOtherUser(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.user.length} members`;
    return "Active";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition-all duration-500 ease-in-out"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition-all duration-500 ease-in-out"
                  leaveTo="translate-x-full">
                  <Dialog.Panel
                    className={"pointer-events-auto w-screen max-w-md"}>
                    <div className="flex h-full flex-col overflow-y-hidden bg-neutral-950 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              className="text-neutral-100 hover:text-fuchsia-900 focus:outline-none "
                              type="button">
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2 text-neutral-100">
                            <Avatar user={otherUser} />
                          </div>
                          <div className="text-neutral-100">{title}</div>
                          <div className="text-sm text-fuchsia-900">
                            {statusText}
                          </div>
                          <div className="my-8 flex gap-10">
                            <div
                              onClick={() => setIsModalOpen(true)}
                              className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75">
                              <div className="flex h-10 w-10 items-center justify-center bg-neutral-900 text-neutral-100">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-100">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-neutral-100 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-neutral-100 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-neutral-100 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-neutral-100 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
