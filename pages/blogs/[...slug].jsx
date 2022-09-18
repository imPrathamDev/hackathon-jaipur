import React from "react";
import connectdb from "../../utils/connectDB";
import Post from "../../models/Post";
import moment from "moment";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";

export async function getServerSideProps(context) {
  await connectdb();
  const post = await Post.findOne({ slug: context?.params?.slug[1] }).populate(
    "author"
  );
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
}

const BlogPage = ({ post }) => {
  console.log(post);
  return <main className="mx-16">
    <h1 className="mb-2 mt-6 mx-6 text-4xl font-semibold">{post?.title}</h1>
    <div className="flex items-center gap-x-2 mx-6">
      <img src={post?.author?.avatar} alt="" className="h-12 w-12 rounded-full bg-gray-300" />
      <span>{post?.author?.username}</span>
      <span className="text-primary">-</span>
      <span>{moment(post?.createdAt).startOf("day").fromNow()}</span>
    </div>
    <div className="mx-16 w-full h-96 relative overflow-hidden">
        <Image src={post?.image} layout="fill" className="object-cover object-center" />
    </div>
    <div className="my-6">
      {HTMLReactParser(post?.content)}
    </div>
  </main>;
};

export default BlogPage;
