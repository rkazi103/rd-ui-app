import { NextComponentType, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";

type AvatarProps = {
  seed?: string;
  large?: boolean;
};

const Avatar: NextComponentType<NextPageContext, any, AvatarProps> = ({
  seed,
  large,
}) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/micah/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
        alt="Avatar"
        layout="fill"
      />
    </div>
  );
};

export default Avatar;
