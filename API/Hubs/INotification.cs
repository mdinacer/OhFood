namespace API.Hubs;

public interface INotification
{
    Task ReceiveMessage(NotificationMessage message);
}