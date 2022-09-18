import Image from "next/image";
import React from "react";
import moment from "moment";
import placeholder from "../../public/placeholder.png";
import Link from "next/link";
const BlogCard = ({ post }) => {
  const wordsPerMinute = 200;
  let result;
  let textLength = post.content.split(" ").length;
  if (textLength > 0) {
    result = Math.ceil(textLength / wordsPerMinute);
  }
  return (
    <Link href={`/blogs/${post?.author?.username}/${post?.slug}`}>
      <div className="w-full my-4 cursor-pointer">
        <div className="flex items-center gap-x-2">
          <img
            src={post?.author?.avatar}
            alt={post?.author?.username}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-medium">@{post?.author?.username}</span>
          <span className="text-lg text-primary">-</span>
          <span>{moment(post?.createdAt).startOf("day").fromNow()}</span>
        </div>
        <div className="flex gap-x-6">
          <div>
            <h2 className="font-semibold text-2xl my-1 truncate">
              {post?.title}
            </h2>
            <p className="">{post?.shortDescription}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-x-2 text-sm">
                <button className="px-2 py-1 rounded-2xl bg-gray-300 transition-all hover:bg-gray-400">
                  {post?.topic}
                </button>
                <span className="text-gray-500">{result} min read</span>
              </div>
              <button className="group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 transform transition-all group-hover:text-primary group-hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-[168px] w-[168px] relative overflow-hidden">
            <Image
              src={post?.image}
              layout="fill"
              className="object-cover object-center transform transition-all hover:scale-110"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
