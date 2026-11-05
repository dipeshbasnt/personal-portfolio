import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? "rockyrabbit977@gmail.com",
    to,
    subject: "Your 6-digit verification code",
    text: `Your verification code is ${otp}. It expires in 5 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Verification Code</h2>
        <p>Your 6-digit verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 20px; background: #f5f5f5; text-align: center; border-radius: 8px;">
          ${otp.split("").join("&nbsp;")}
        </div>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });
}
