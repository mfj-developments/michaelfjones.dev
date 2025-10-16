declare module "resend" {
  type EmailSendParams = {
    from: string;
    to: string[];
    subject: string;
    html: string;
    replyTo?: string;
  };

  type EmailSendResult = {
    data?: unknown;
    error?: { message: string } | null;
  };

  export class Resend {
    constructor(apiKey: string);
    emails: {
      send(params: EmailSendParams): Promise<EmailSendResult>;
    };
  }
}
