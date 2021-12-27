using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class MainHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
        await Clients.Caller.SendAsync("Message", "Connected successfully!");
    }

    public async Task AddUser(string connectionId, string[] roles)
    {
        if (roles.Length > 0 && roles.Contains("Admin"))
            await Groups.AddToGroupAsync(connectionId, "Admin");
        else
            await Groups.AddToGroupAsync(connectionId, "Members");
    }
}