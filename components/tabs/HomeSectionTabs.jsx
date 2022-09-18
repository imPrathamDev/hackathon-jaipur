import React from "react";

const HomeSectionTabs = () => {
  return (
    <div className="flex items-center gap-x-4 my-8">
      <button className="text-gray-600 leading-6 pb-3 hover:border-b hover:border-gray-500 hover:text-primary-black transition-all">
        Newest Blogs
      </button>
      <button className="text-gray-600 leading-6 pb-3 hover:border-b hover:border-gray-500 hover:text-primary-black transition-all">
        Trending Blogs
      </button>
    </div>
  );
};

export default HomeSectionTabs;
