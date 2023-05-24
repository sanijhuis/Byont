import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'outlook',  
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });
  }

  async sendScanPerformedEmail(to: string, scanResults: any) {
    const mailOptions = {
      from: process.env.EMAIL,
      to, 
      subject: 'Scan Performed', 
      text: `A scan has been performed. Results: ${JSON.stringify(scanResults)}`, 
    };

    await this.transporter.sendMail(mailOptions);
  }
}
