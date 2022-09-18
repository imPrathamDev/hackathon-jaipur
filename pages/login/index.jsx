import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, getSession, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rounter = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      rounter.push("/");
    }
  }, [session]);

  const handlerChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async () => {
    if (email.length > 0 && password.length > 0) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result.error) {
          toast.error(
            result.error.response &&
              result.error.response.data &&
              result.error.response.data.message
              ? result.error.response.data.message
              : result.error.message,
            {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          toast.success("Login Successfully", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Fill Details Correctally!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-xl lg:max-w-3xl">
        <div className="text-center">
          <h1 className="mt-6 text-4xl font-semibold text-primary-black sm:text-3xl md:text-4xl">
            Welcome Back to Channel.
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handlerChange}
              className="w-full mt-1 text-sm text-gray-600 bg-white border-gray-200 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={handlerChange}
              className="w-full mt-1 text-sm text-gray-600 bg-white border-gray-200 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              Forgot Password?
              <Link href={"/"}>
                <a className="text-gray-600 underline mx-1">Click here</a>
              </Link>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              onClick={() => onSubmit()}
              className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary-black border border-primary-black transition rounded-md shrink-0 hover:bg-transparent hover:text-primary hover:border-primary focus:outline-none focus:ring active:text-primary"
            >
              Login Now
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Don't have an account?
              <Link href={"/register"}>
                <a className="text-gray-600 underline mx-1">
                  Create an account
                </a>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
