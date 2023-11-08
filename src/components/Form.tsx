import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data) {
      toast.success("Message sent!");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <>
      <Toaster />
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
            className="input input-bordered input-primary"
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
            className="input input-bordered input-primary"
          />
        </label>
        <label className=" p-1 m-2 flex flex-col">
          Message
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            className="textarea textarea-primary min-h-[10rem]"
          />
        </label>
        <button
          className="btn btn-primary rounded place-self-center hover:-translate-y-2 transition-all"
          data-sitekey="6LcMH7QnAAAAADn39cJqVnr9wFqZCKhVBO2Ll1RW"
          data-callback="onSubmit"
          data-action="submit"
        >
          Send
        </button>
      </form>
    </>
  );
}
