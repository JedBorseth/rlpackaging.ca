import { z } from 'zod';
import { Resend } from 'resend';

const post = async ({ request }) => {
  const api_key = "re_EdJxWWjZ_M9ec1gEh6KY1hpg1fH6TyHCJ";
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields"
      }),
      { status: 400 }
    );
  }
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1)
  });
  try {
    schema.parse({
      name,
      email,
      message
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Invalid data"
      }),
      { status: 400 }
    );
  }
  const resend = new Resend(api_key);
  (async function() {
    try {
      const data2 = await resend.emails.send({
        from: `"${name}" <noreply@jedborseth.com>`,
        to: ["orders@rlpackaging.ca"],
        subject: `From: ${email}`,
        html: `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #494949;
              color: #ffffff;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              margin-top: 50px;
              padding: 20px;
              background-color: #212121;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #ffffff;
              color: #000000;
              text-decoration: none;
              border-radius: 3px;
            }
            h1 {
              color: #ffffff;
            }
            p {
              color: #ffffff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${name} - ${email}</h1>
            <p>${message}</p>
            <a href="mailto:${email}" class="button">Reply</a>
          </div>
        </body>
      </html>
      `
      });
      console.log(data2);
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({
          message: `Error: ${error}}`
        }),
        { status: 500 }
      );
    }
  })();
  console.log(`Feedback from ${name} <${email}>: ${message}`);
  return new Response(data, { status: 200 });
};

export { post };
