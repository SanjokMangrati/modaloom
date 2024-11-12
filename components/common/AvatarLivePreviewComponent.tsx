import React from "react";

const AvatarLivePreviewComponent = ({ svg }: { svg: string }) => {
  return (
    <div
      className="bg-svgBackground w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 flex justify-center items-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default AvatarLivePreviewComponent;
