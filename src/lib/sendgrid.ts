import sgMail from "@sendgrid/mail";
import ejs from "ejs";
import fs from "fs";
import path from "path";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!!);

export const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = {
    to,
    from: "QA Flow <info@qaflow.tech>",
    subject,
    text,
  };
  await sgMail.send(msg);
};

export const sendTemplatedEmail = async (mailData: {
  from: string;
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}) => {
  try {
    const templatePath = path.join(process.cwd(), 'templates', 'email', `${mailData.template}.ejs`);
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    
    const html = ejs.render(templateSource, mailData.context);

    const msg = {
      to: mailData.to,
      from: mailData.from || "info@qaflow.tech",
      subject: mailData.subject,
      html,
    };
    
    await sgMail.send(msg);
  } catch (error) {
    console.error("Şablonlu e-posta gönderirken hata oluştu:", error);
    throw error;
  }
};


export const sendContactEmailWithTemplate = async (name: string, email: string, subject: string, message: string) => {
  const mailData = {
    from: `QA Flow Contact <info@qaflow.tech>`,
    to: process.env.EMAIL_USER || "info@qaflow.tech",
    subject: subject || "QA Flow Contact Form",
    template: "contact",
    context: {
      name,
      email,
      subject: subject || "Not Specified",
      message: message.replace(/\n/g, "<br>"),
    },
  };
  
  await sendTemplatedEmail(mailData);
};

export const sendSubscribeEmailWithTemplate = async (email: string, name?: string) => {
  const mailData = {
    from: `QA Flow <info@qaflow.tech>`,
    to: email,
    subject: "QA Flow - Subscription",
    template: "subscribe",
    context: {
      name: name || "Dear User",
      email,
      date: new Date().toLocaleDateString("en-US"),
    },
  };
  
  await sendTemplatedEmail(mailData);
};

export const sendWelcomeEmailWithTemplate = async (name: string, email: string) => {
  const mailData = {
    from: `QA Flow <info@qaflow.tech>`,
    to: email,
    subject: "Welcome to QA Flow",
    template: "welcome",
    context: {
      name,
      email,
    },
  };
  
  await sendTemplatedEmail(mailData);
};