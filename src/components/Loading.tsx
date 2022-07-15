import { Jelly } from "@uiball/loaders";
import { NextComponentType } from "next";

const Loading: NextComponentType = () => {
  return (
    <div className="flex w-full items-center justify-center p-10 text-xl">
      <Jelly size={50} color="#FF4501" />
    </div>
  );
};

export default Loading;
