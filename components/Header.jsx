import React from "react";
import { UserButtonMenu } from "./UserButton";
import { ModeToggle } from "./ThemeButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center shadow-md p-5">
      <p>Lorem ipsum dolor sit.</p>
      <div className="flex gap-3 items-center">
        <ModeToggle />
        <UserButtonMenu />
      </div>
    </div>
  );
};

export default Header;
