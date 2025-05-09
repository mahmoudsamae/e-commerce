import EmailTemplate from "../../_components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const emailData = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: emailData.email,
      replyTo: emailData.email,
      subject: "Order Confirmation",
      react: EmailTemplate({
        fullname: emailData.name,
        amount: emailData.amount,
        products: emailData.products,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
