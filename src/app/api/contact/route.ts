import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { "first-name": firstName, "last-name": lastName, email, "phone-number": phone, message } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // обязательно свой Gmail
      replyTo: email,               // клиентский email
      to: process.env.EMAIL_USER,
      subject: `Message from ${firstName} ${lastName}`,
      text: `Message: ${message}\nPhone: ${phone}\nEmail: ${email}`,
      html: `<p><strong>Message:</strong> ${message}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  
  }

