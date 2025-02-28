import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bell, CheckCircle } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";

const notifications = [
  { type: "announcement", message: "New update tomorrow, stay tuned!" },
  { type: "announcement", message: "New update tomorrow, stay tuned!" },
  {
    type: "badge",
    message: "You just unlocked the",
    badge: "Music Connoisseur",
  },
  {
    type: "badge",
    message: "You just unlocked the",
    badge: "Music Connoisseur",
  },
];

export const NotificationModal = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-end p-4 sm:p-6 lg:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="space-y-6">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-start border-b pb-3 last:border-none"
                    >
                      <div className="p-2 bg-gray-100 rounded-full">
                        {notification.type === "announcement" ? (
                          <FaBell className="text-gray-700 " />
                        ) : (
                          <LuPartyPopper className="text-gray-700" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-xs">
                          {notification.type === "announcement"
                            ? "Announcement"
                            : "Way to go thetimileyin!!!"}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {notification.message}{" "}
                          {notification.badge && (
                            <span className="text-green-500 font-semibold">
                              {notification.badge}
                            </span>
                          )}
                          {notification.badge && " badge."}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm">
                    <button className="text-green-500 font-semibold">
                      View all notifications
                    </button>
                    <button
                      className="font-semibold text-gray-800"
                      onClick={onClose}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
