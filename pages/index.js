import Link from "next/link";
import BlogCard from "../components/cards/BlogCard";
import SmallBlogCard from "../components/cards/SmallBlogCard";
import HomeSectionTabs from "../components/tabs/HomeSectionTabs";
import connectdb from "../utils/connectDB";
import Post from "../models/Post";
import { Fragment } from "react";

export async function getServerSideProps(context) {
  await connectdb();
  const posts = await Post.find().populate("author");
  posts.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default function Home({ posts }) {
  return (
    <main className="relative pl-16 flex">
      <section className="w-[70%] divide-y divide-gray-300">
        <HomeSectionTabs />
        {posts.map((post, key) => (
          <Fragment key={key}>
            <BlogCard post={post} />
          </Fragment>
        ))}
      </section>
      <footer className="fixed right-0 h-screen border-l border-gray-200 w-3/12 px-4">
        <div className="mt-8">
          <h4 className="text-lg font-semibold my-2">Most Bookmarked</h4>
          <SmallBlogCard />
          <SmallBlogCard />
          <SmallBlogCard />
          <SmallBlogCard />
        </div>
        <div
          style={{ marginTop: "auto" }}
          className="flex items-center gap-x-2"
        >
          <Link href={"/"}>
            <a className="text-sm text-gray-500 hover:underline transition-all">
              Home
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-sm text-gray-500 hover:underline transition-all">
              Privacy
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-sm text-gray-500 hover:underline transition-all">
              Term & Condition
            </a>
          </Link>
        </div>
      </footer>
    </main>
  );
}
