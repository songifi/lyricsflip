
import * as Transport from 'winston-transport';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';



export class EmailTransport extends Transport {
  private transporter: any;

  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts);

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Ensure this is a number
      secure: false, // Set to true if you're using port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as SMTPTransport.Options);
  }

  log(info: any, callback: () => void) {
    if (info.level === 'error') {
      this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ERROR_NOTIFICATION_EMAIL,
        subject: `Error Log: ${info.message}`,
        text: JSON.stringify(info, null, 2),
      });
    }

    callback();
  }
}
