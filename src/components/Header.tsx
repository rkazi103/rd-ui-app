import { NextComponentType } from "next";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { signIn, useSession, signOut } from "next-auth/react";

const Header: NextComponentType = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="/assets/reddit-logo.png"
          alt="Reddit Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="header-icon" />
        <GlobeIcon className="header-icon" />
        <VideoCameraIcon className="header-icon" />

        <hr className="h-10 border border-gray-100" />

        <ChatIcon className="header-icon" />
        <BellIcon className="header-icon" />
        <PlusIcon className="header-icon" />
        <SpeakerphoneIcon className="header-icon" />
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="header-icon" />
      </div>

      <div
        className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        onClick={session ? () => signOut() : () => signIn()}
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="/assets/reddit-small.png"
            alt="Small reddit logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {session ? (
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
        ) : (
          <p className="text-gray-400">Sign In</p>
        )}

        {session && (
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        )}
      </div>
    </header>
  );
};

export default Header;
