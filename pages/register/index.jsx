import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const router = useRouter();

  const handlerChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "comfirm_password") {
      setComfirmPassword(e.target.value);
    }
  };

  const onSubmit = async () => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      comfirmPassword.length > 0
    ) {
      if (password.length >= 8 && comfirmPassword.length >= 8) {
        if (password === comfirmPassword) {
          const response = await axios.post("/api/user/register", {
            username,
            email,
            password,
          });
          console.log(response);
          if (response?.data?.success) {
            toast.success("Register Successfully!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/login");
          } else {
            toast.error(response?.data?.error, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.error("Password not match!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Password should greater than 8!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Fill Correct Info!", {
        position: "bottom-left",
        autoClose: 5000,
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
        position="top-right"
        autoClose={5000}
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
            Welcome to Channel.
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-600"
            >
              @Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handlerChange}
              className="w-full mt-1 text-sm text-gray-600 bg-white border-gray-200 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>

            <input
              type="text"
              id="Email"
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

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Confirm_Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password Confirmation
            </label>

            <input
              type="password"
              id="comfirm_Password"
              name="comfirm_password"
              value={comfirmPassword}
              onChange={handlerChange}
              className="w-full mt-1 text-sm text-gray-600 bg-white border-gray-200 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <Link href={"/"}>
                <a className="text-gray-600 underline mx-1">
                  terms and conditions
                </a>
              </Link>
              and
              <Link href={"/"}>
                <a className="text-gray-600 underline mx-1">privacy policy</a>
              </Link>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              onClick={() => onSubmit()}
              className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary-black border border-primary-black transition rounded-md shrink-0 hover:bg-transparent hover:text-primary hover:border-primary focus:outline-none focus:ring active:text-primary"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link href={"/login"}>
                <a className="text-gray-600 underline mx-1">Log in</a>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
