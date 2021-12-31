using API.DTO;

namespace API.Interfaces;

public interface IMailService
{
    Task SendAsync(MailRequest request);
    Task SendContactMessageAsync(MailRequest request);
}