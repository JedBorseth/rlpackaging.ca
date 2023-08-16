import { useState } from "react";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        submit(e);
      }}
      className="flex col-span-2 flex-col gap-5 sm:col-start-2 row-span-2 text-left"
    >
      <label className=" p-1 m-2 flex flex-col">
        Name
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name..."
          className="rounded shadow-lg p-1"
        />
      </label>
      <label className=" p-1 m-2 flex flex-col">
        Email
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="sample@example.com"
          className="rounded shadow-lg p-1"
        />
      </label>
      <label className=" p-1 m-2 flex flex-col">
        Message
        <textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          className="rounded shadow-lg p-1 min-h-[10rem]"
        />
      </label>
      <button className="p-5 bg-[#ED1C24] w-1/2 place-self-center rounded hover:-translate-y-2 transition-all text-white">
        Send
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
