import Image from "next/image";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { AppState, useAppDispatch } from "@/app/store";
import MovieModal from "@/components/MovieModal";
import FilterModal from "@/components/FilterModal";
import {
  closeModal,
  closeFilterModal,
  closeProfileModal,
} from "@/features/modal/modalSlice";

const Modals = () => {
  const dispatch = useAppDispatch();
  const modal = useSelector((state: AppState) => state.modal);
  const auth = useSelector((state: AppState) => state.auth);
  const profilePhotoUrl: string | null = auth.data.profilePhotoUrl;

  const openedMovie = modal.openedMovie;
  const openedFilter = modal.openedFilter;
  const showProfileModal = modal.showProfileModal;

  const ProfileModal = () => (
    <div className="rounded-lg bg-[#181818] text-white">
      <div className="p-8">
        <div className="flex w-full items-center justify-end">
          <button
            onClick={() => {
              dispatch(closeProfileModal());
            }}
            type="button"
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border-2 border-white
            bg-[#181818]
            text-white
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="pb-48 pt-16">
          <h1 className="py-4 text-center text-4xl">Who&#39;s watching ?</h1>

          <div className="relative mt-6 flex justify-center gap-12">
            {[
              {
                profilePhotoUrl: profilePhotoUrl,
                name: auth.data.name,
              },
              {
                profilePhotoUrl: "/anonymous.png",
                name: "Anonymous",
              },
              {
                profilePhotoUrl: "/kids.png",
                name: "kids",
              },
            ].map((data, index) => (
              <div
                key={index}
                className={`group flex flex-col
                items-center gap-4 ${
                  index !== 0 ? "cursor-not-allowed opacity-20" : ""
                }`}
              >
                <div
                  className="relative h-32 w-32
                  transition-all
                  duration-500
                  group-hover:scale-110"
                >
                  {data.profilePhotoUrl && (
                    <Image
                      src={data.profilePhotoUrl}
                      className="rounded-md shadow-inner"
                      layout="fill"
                      alt="Profile"
                    />
                  )}
                </div>
                <span className="text-zinc-400 group-hover:text-white">
                  {data.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Transition
        show={openedMovie ? true : false}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 z-[10] bg-black bg-opacity-50"
        onClick={() => dispatch(closeModal())}
      ></Transition>

      <Transition
        show={openedMovie ? true : false}
        enter="transition-scale duration-500"
        enterFrom="scale-75"
        enterTo="scale-100"
        leave="transition-scale duration-500"
        leaveFrom="scale-100"
        leaveTo="scale-0"
        className="fixed inset-0 z-[11] w-full overflow-y-auto"
        onClick={() => dispatch(closeModal())}
      >
        <div
          className="mx-auto mt-8 w-full max-w-7xl"
          onClick={(e) => e.stopPropagation()}
        >
          {openedMovie && <MovieModal movie={openedMovie} />}
        </div>
      </Transition>

      <Transition
        show={openedFilter ? true : false}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 z-[12] bg-black bg-opacity-50"
        onClick={() => dispatch(closeFilterModal())}
      ></Transition>

      <Transition
        show={openedFilter ? true : false}
        enter="transition-scale duration-500"
        enterFrom="scale-75"
        enterTo="scale-100"
        leave="transition-scale duration-500"
        leaveFrom="scale-100"
        leaveTo="scale-0"
        className="fixed inset-0 z-[13] w-full overflow-y-auto"
        onClick={() => dispatch(closeFilterModal())}
      >
        <div
          className="mx-auto mt-8 w-full max-w-7xl"
          onClick={(e) => e.stopPropagation()}
        >
          {openedFilter && (
            <FilterModal type={openedFilter.type} value={openedFilter.value} />
          )}
        </div>
      </Transition>

      <Transition
        show={showProfileModal ? true : false}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 z-[14] bg-black bg-opacity-50"
        onClick={() => dispatch(closeProfileModal())}
      ></Transition>

      <Transition
        show={showProfileModal ? true : false}
        enter="transition-scale duration-500"
        enterFrom="scale-75"
        enterTo="scale-100"
        leave="transition-opacity duration-500"
        leaveFrom="scale-100"
        leaveTo="scale-0"
        className="fixed inset-0 z-[15] w-full  overflow-y-auto"
        onClick={() => dispatch(closeProfileModal())}
      >
        <div
          className="mx-auto mt-8 w-full max-w-7xl"
          onClick={(e) => e.stopPropagation()}
        >
          {showProfileModal && auth.authenticated && <ProfileModal />}
        </div>
      </Transition>
    </>
  );
};

export default Modals;
