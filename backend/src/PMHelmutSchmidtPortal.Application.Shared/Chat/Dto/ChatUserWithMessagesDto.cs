using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.Chat.Dto
{
    public class ChatUserWithMessagesDto : ChatUserDto
    {
        public List<ChatMessageDto> Messages { get; set; }
    }
}