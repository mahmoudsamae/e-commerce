import ContactTemplate from "../../_components/ContactTemplate";
import { Resend } from "resend";

// Check if API key is available
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("RESEND_API_KEY is not set in environment variables");
}

const resend = new Resend(apiKey);

export async function POST(req) {
  // Check if API key is available
  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured properly" },
      { status: 500 }
    );
  }

  try {
    const contactData = await req.json();

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Log the request data for debugging
    console.log("Sending email with data:", {
      from: contactData.email, 
      to: ["mahmoudsamaedbm@gmail.com"],
      subject: "New Contact Form Message",
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
    });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Use Resend's default sender for testing
      to: process.env.COTACT_EMAIL, // Your static recipient email
      replyTo: process.env.COTACT_EMAIL,
      subject: "New Contact Form Message",
      react: ContactTemplate({
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
      }),
    });


    if (error) {
      console.error("Resend API error:", error);
      return Response.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error in contact form API:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
