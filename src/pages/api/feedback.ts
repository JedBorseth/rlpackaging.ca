import type { APIRoute } from "astro";
import { z } from "zod";
import nodemailer from "nodemailer";
export const post: APIRoute = async ({ request }) => {
  const user = "rlpackaging.ca";
  const pass = "c7WII5nGVlmOvn53";
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
};
