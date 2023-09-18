import React from "react";

function Loading() {
    console.log('loading')
  return (
    <div className="flex h-full w-full justify-center items-center min-h-16">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
}

export default Loading;
