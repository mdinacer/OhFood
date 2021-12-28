using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class OrdersHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
        await Clients.Caller.SendAsync("Message", "Connected successfully!");
    }

    public async Task AddToGroup()
    {   
        var id = Context.ConnectionId;
        await Groups.AddToGroupAsync(id, "Admin");
    }
}