using API.DTO;

namespace API.Interfaces;

public interface IIdentityService
{
    Task<IResult> RegisterAsync(RegisterRequest request, string origin);

    Task<string> ConfirmEmailAsync(string userId, string code, string tenant);

    Task<string> ConfirmPhoneNumberAsync(string userId, string code);

    Task<IResult> ForgotPasswordAsync(ForgotPasswordRequest request, string origin);

    Task<IResult> ResetPasswordAsync(ResetPasswordRequest request);

    Task<IResult> UpdateProfileAsync(UpdateProfileRequest request, string userId);
}