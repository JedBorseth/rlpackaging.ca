import type { APIRoute } from "astro";
import { z } from "zod";

export const post: APIRoute = async ({ request }) => {
  const api_key = "api-8B42D5DE3D2D11EEACC4F23C91C88F4E";
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 420 }
    );
  }
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1),
  });
  try {
    schema.parse({
      name,
      email,
      message,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Invalid data",
      }),
      { status: 400 }
    );
  }
  const sendMail = async () => {
    const res = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: api_key,
        subject: "New feedback from your website!",
        text_body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }),
    });
  };
  try {
    await sendMail();
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
      }),
      { status: 500 }
    );
  }
  console.log(`Feedback from ${name} <${email}>: ${message}`);
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
