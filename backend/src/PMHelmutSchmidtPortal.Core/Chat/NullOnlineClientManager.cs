using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using Abp.Dependency;
using Abp.RealTime;

namespace PMHelmutSchmidtPortal.Chat
{
    /// <summary>
    /// Null implementation of IOnlineClientManager for ChatChannel
    /// Used as temporary workaround for ABP 10.x compatibility
    /// </summary>
    public class NullOnlineClientManager<T> : IOnlineClientManager<T>, ISingletonDependency
    {
        public event EventHandler<OnlineUserEventArgs> UserConnected;
        public event EventHandler<OnlineUserEventArgs> UserDisconnected;
        public event EventHandler<OnlineClientEventArgs> ClientConnected;
        public event EventHandler<OnlineClientEventArgs> ClientDisconnected;

        public Task<bool> IsOnlineAsync(UserIdentifier user)
        {
            return Task.FromResult(false);
        }

        public Task<IReadOnlyList<IOnlineClient>> GetAllByUserIdAsync(UserIdentifier user)
        {
            return Task.FromResult<IReadOnlyList<IOnlineClient>>(new List<IOnlineClient>());
        }

        public Task<IReadOnlyList<IOnlineClient>> GetAllByUserIdAsync(IUserIdentifier user)
        {
            return Task.FromResult<IReadOnlyList<IOnlineClient>>(new List<IOnlineClient>());
        }

        public Task<IOnlineClient> GetByConnectionIdOrNullAsync(string connectionId)
        {
            return Task.FromResult<IOnlineClient>(null);
        }

        public Task<IReadOnlyList<IOnlineClient>> GetAllClientsAsync()
        {
            return Task.FromResult<IReadOnlyList<IOnlineClient>>(new List<IOnlineClient>());
        }

        public Task AddAsync(IOnlineClient client)
        {
            return Task.CompletedTask;
        }

        public Task<bool> RemoveAsync(string connectionId)
        {
            return Task.FromResult(false);
        }
    }
}
