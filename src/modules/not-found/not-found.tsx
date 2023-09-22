import React from "react";
import { TbError404 } from "react-icons/tb";

function NotFoundPage() {
  return (
    <div className="h-screen text-white text-3xl flex items-center justify-center">
        <TbError404 size={50} className="mr-5"/> <span className="font-semibold font-mono tracking-wider ">Not Found</span>
    </div>
  );
}

export default NotFoundPage;
