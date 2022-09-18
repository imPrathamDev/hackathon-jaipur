import React from "react";

const SmallBlogCard = () => {
  return (
    <div className="mx-2 my-3">
      <div className="flex items-center gap-x-1">
        <img
          src="https://avatars.dicebear.com/api/adventurer/Pratham.svg"
          alt="Pratham"
          className="h-8 w-8 rounded-full"
        />
        <span className="">Pratham</span>
        <span className="text-gray-400 font-medium">in</span>
        <span className="font-medium">UI&UX</span>
      </div>
      <h3 className="text-lg font-semibold">
        We love to hate Clippy — but what if Clippy was right?
      </h3>
    </div>
  );
};

export default SmallBlogCard;
