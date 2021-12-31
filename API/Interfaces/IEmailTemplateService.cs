namespace API.Interfaces;

public interface IEmailTemplateService
{
    string GenerateEmailConfirmationMail(string userName, string email, string emailVerificationUri);
}