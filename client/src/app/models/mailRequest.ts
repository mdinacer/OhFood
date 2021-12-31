export interface IMailRequest {
    to?: string;
    subject: string;
    body: string;
    from: string;
    displayName: string;
}

export class MailRequest implements IMailRequest{
    body="";
    displayName="";
    from="";
    subject="";

}
