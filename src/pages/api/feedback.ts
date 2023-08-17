import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";

export const post: APIRoute = async ({ request }) => {
  const api_key = "re_GahC8JBr_Gu4WseF9od9hDZB6kuUJHyEv";
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
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

  const resend = new Resend(api_key);

  (async function () {
    try {
      const data = await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to: ["jedborseth@gmail.com"],
        subject: `From: ${email}`,
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          margin-top: 50px;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
        }
        p {
          color: #666666;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ED1C24;
          color: #ffffff;
          text-decoration: none;
          border-radius: 3px;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <h1>Website: ${name} - ${email}  </h1>
          <p>${message}</p>
          <a href="mailto:${email}" class="button">Reply</a>
        </div>
      </body>
      </html>
      `,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          message: `Error: ${error}}`,
        }),
        { status: 500 }
      );
    }
  })();

  console.log(`Feedback from ${name} <${email}>: ${message}`);
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
