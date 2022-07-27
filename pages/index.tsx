import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast"

interface Note {
  user: string;
  content: string;
}

const Home: NextPage = () => {
  const [data, setData] = useState<Note>({
    user: "",
    content: "",
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { user, content } = data;
      const body: Note = {
        user,
        content,
      };

      await fetch("api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setData({ user: "", content: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>What&#39;s on your mind?</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen p-4 flex flex-col justify-center items-center gap-8 lg:flex-row">
        <div className="w-full">
          <h1 className="text-xl font-bold text-center">
            What&#39;s on your mind?
          </h1>
          <form
            className="w-full flex flex-col justify-center items-center gap-1"
            onSubmit={(e) => submitHandler(e)}
          >
            <input
              required
              type="text"
              value={data.user}
              onChange={(e) => setData({ ...data, user: e.target.value })}
              className="w-full border-2 border-gray-600 p-2"
              placeholder="Insert name"
            />
            <textarea
              required
              placeholder="What are you thinking about?"
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className="w-full border-2 border-gray-600 p-2"
            ></textarea>
            <button
              type="submit"
              className="py-1 w-full bg-blue-400 text-white"
            >
              Add
            </button>
          </form>
        </div>
        <div className="w-full">
          <div className="w-full border-2 p-4 flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div className="font-bold text-lg">Thanos</div>
              <div className="text-slate-300">14/07</div>
            </div>
            <div className="font-normal text-md">
              Balance as all things should be..!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
