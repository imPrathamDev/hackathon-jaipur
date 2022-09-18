import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const { user } = session;
  return {
    props: { user },
  };
}

const NewPostPage = ({ user }) => {
  const [value, setValue] = useState(
    "<h2>Hello World!</h2><p>Hi from Hackathon.</p>"
  );
  const [uploading, setUploading] = useState();
  const [upload, setUpload] = useState();
  const [uploadData, setUploadData] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  const handleSubmitPost = async (data) => {
    const { data: newData } = await axios.post("/api/post/addPost", {
      title,
      content: value,
      topic: "Web Development",
      authorId: user?._id,
      imageURI: data?.secure_url,
      shortDescription: shortDesc,
    });
    if (newData.success) {
      toast.success("Post Published Successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitle("");
      setValue("<h2>Hello World!</h2><p>Hi from Hackathon.</p>");
    } else {
      toast.error(newData.error, {
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

  async function uploadIamge() {
    const formData = new FormData();
    formData.append("file", uploadData);
    formData.append("upload_preset", "hackkathon-jaipur");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/deitrgyhl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log("run", data);
    await handleSubmitPost(data);
  }

  const validate = () => {
    if (title.length > 0 && value.length > 0 && shortDesc.length > 0) {
      console.log("run");
      uploadIamge();
    } else {
      toast.error("Title & Content is empty!", {
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
    <main className="lg:px-16 px-4">
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
      <div className="flex items-center justify-end">
        <button
          onClick={() => validate()}
          className="inline-block my-4 px-6 py-2 text-sm font-medium text-primary-white bg-primary-black border border-primary-black transition rounded-md shrink-0 hover:bg-transparent hover:text-primary hover:border-primary focus:outline-none focus:ring active:text-primary"
        >
          Publish Post
        </button>
        {/* <button className="px-6 py-2 text-sm transition-all text-gray-400 hover:text-primary-black">
          Save Draft
        </button> */}
      </div>
      <div className="lg:mx-4 lg:my-4">
        <input
          type="text"
          placeholder="Title Here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-5xl w-full font-semibold placeholder:text-gray-400 text-primary-black bg-transparent outline-none"
        />
        <div className="my-4 flex items-center">
          <input
            type="file"
            name=""
            id=""
            onChange={(event) => setUploadData(event.target.files[0])}
          />
        </div>
        <div className="mt-6 lg:mr-12">
          <span className="text-lg font-semibold">Short Description</span>
          <textarea
            name="shortDescription"
            id="shortDescription"
            // cols="30"
            rows="3"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="mb-4 mt-2 w-full p-2"
          ></textarea>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="mt-auto flex flex-col items-end">
        <h4 className="text-lg font-semibold">Important Info</h4>
        <p className="">
          If you use "Save Draft" image will not be saved into our server. Image
          will be save when you publish the post.
        </p>
      </div>
    </main>
  );
};

export default NewPostPage;
