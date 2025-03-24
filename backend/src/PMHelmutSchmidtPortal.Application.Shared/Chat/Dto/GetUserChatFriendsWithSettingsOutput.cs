using System;
using System.Collections.Generic;
using Castle.Components.DictionaryAdapter;
using PMHelmutSchmidtPortal.Friendships.Dto;

namespace PMHelmutSchmidtPortal.Chat.Dto
{
    public class GetUserChatFriendsWithSettingsOutput
    {
        public DateTime ServerTime { get; set; }
        
        public List<FriendDto> Friends { get; set; }

        public GetUserChatFriendsWithSettingsOutput()
        {
            Friends = new EditableList<FriendDto>();
        }
    }
}