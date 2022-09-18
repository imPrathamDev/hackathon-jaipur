import React, { Fragment } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import connectdb from "../../utils/connectDB";
import Post from "../../models/Post";
import BlogCard from "../../components/cards/BlogCard";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const { user } = session;

  await connectdb();
  const posts = await Post.find({ author: user?._id }).populate("author");
  posts.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  return {
    props: { user, posts: JSON.parse(JSON.stringify(posts)) },
  };
}

const AccountPage = ({ user, posts }) => {
  const router = useRouter();
  return (
    <main className="mx-16 flex items-center justify-center">
      <div className="max-w-6xl">
        <div className="w-full text-center">
          <h2 className="text-4xl text-primary-black font-bold mt-6 mb-2">
            My Account.
          </h2>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-base font-medium text-gray-500 hover:underline transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="flex mt-4">
          <div className="w-2/6">
            <div className="flex items-center gap-x-2">
              <img
                src={user?.image}
                alt={user?.name}
                className="h-12 w-12 rounded-full shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-600">@{user?.name}</span>
                <span className="text-600 text-sm">{user?.email}</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => router.push("/new-post")}
                className="flex items-center justify-center gap-x-1 my-2 transition-all hover:text-primary hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <span className="text-sm">New Post</span>
              </button>

              <button className="flex items-center justify-center gap-x-1 my-2 transition-all hover:text-primary hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>

                <span className="text-sm">New Post</span>
              </button>
            </div>
          </div>
          <div className="w-4/6">
            {posts.map((post, key) => (
              <Fragment key={key}>
                <BlogCard post={post} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
