import ChatListItem from "../ChatListItem/ChatListItem.jsx";
import FloatingButton from "../../FloatingButton/FloatingButton.jsx";

const ChatList = ({ chats, activeChat, onSelectChat, onCreateChat, handleCreateChat }) => {
    return (
        <>
            {chats.map((chat) => (
                <ChatListItem
                    key={chat.id}
                    chatId={chat.id}
                    title={chat.title}
                    avatar={chat.avatar}
                    lastMessage={chat.last_message}
                    lastUpdated={chat.updated_at}
                    onSelectChat={onSelectChat}
                    isActive={activeChat === chat.id}
                />
            ))}
            <FloatingButton onClick={handleCreateChat} />
        </>
    );
};

export default ChatList;
