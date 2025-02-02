import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="shadow-md h-screen p-7">
      <div className="flex flex-row items-center">
        <Image src={"/file.svg"} alt="App Logo" width={100} height={100} />
        <span className="font-bold ">Noteble AI</span>
      </div>

      <div className="mt-10">
        <Button className="w-full">+ upload PDF</Button>

        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
