using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize]
public class MainHub : Hub<INotification>
{
    private static readonly ConnectionMapping<string> _connections = new();

    public override Task OnConnectedAsync()
    {
        var name = Context.User?.Identity?.Name;
        var isAdmin = Context.User?.IsInRole("Admin") ?? false;
        if (!string.IsNullOrEmpty(name))
        {
            if (isAdmin)
            {
                Groups.AddToGroupAsync(Context.ConnectionId, "Admin");
            }
            else
            {
                _connections.Add(name, Context.ConnectionId);
            }
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var name = Context.User?.Identity?.Name;
        var isAdmin = Context.User?.IsInRole("Admin") ?? false;
        if (!string.IsNullOrEmpty(name))
        {
            if (isAdmin)
            {
                Groups.RemoveFromGroupAsync(Context.ConnectionId, "Admin");
            }
            else
            {
                _connections.Remove(name, Context.ConnectionId);
            }
        }

        return base.OnDisconnectedAsync(exception);
    }

    

    public async Task NotifyClient(NotificationMessage message)
    {
        if (!string.IsNullOrEmpty(message.User))
        {
            foreach (var connection in _connections.GetConnections(message.User))
            {
                await Clients.Client(connection).ReceiveMessage(message);
            }
        }
    }

    public async Task NotifyAdmin(string testText)
    {
        await Clients.Group("Admin").ReceiveMessage(new NotificationMessage { User = "Admin", Message = testText });
    }
    
    public async Task SendMessage(NotificationMessage message)
    {
        await Clients.All.ReceiveMessage(message);
    }
}