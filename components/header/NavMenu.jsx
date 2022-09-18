import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NavMenu = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const menu = [
    { title: "Home", path: "/" },
    { title: "All Blogs", path: "/blogs" },
    { title: "My List", path: "/account/lists" },
  ];
  return (
    <nav className="flex items-center gap-x-4">
      <ul className="flex items-center gap-x-3">
        {menu.map((item, key) => (
          <Fragment key={key}>
            <Link href={item?.path}>
              <a>
                <li className="relative text-base font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:rounded-full after:transform after:transition-all after:duration-700 hover:after:w-full transform transition-all hover:text-primary hover:scale-105">
                  {item?.title}
                </li>
              </a>
            </Link>
          </Fragment>
        ))}
      </ul>
      <button onClick={() => router.push("/account")}>
        {session ? (
          <>
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="h-7 w-7 rounded-full bg-gray-300"
            />
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transform transition-all hover:scale-110 hover:text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 transform transition-all hover:scale-110 hover:text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </nav>
  );
};

export default NavMenu;
