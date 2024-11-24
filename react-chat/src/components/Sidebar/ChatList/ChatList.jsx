import ChatListItem from "../ChatListItem/ChatListItem.jsx";
import FloatingButton from "../../FloatingButton/FloatingButton.jsx";

const ChatList = ({ chats, activeChat, onSelectChat, onCreateChat }) => {
    return (
        <>
            {Object.keys(chats).map((chatId) => (
                <ChatListItem
                    key={chatId}
                    chatId={chatId}
                    messages={chats[chatId]}
                    isActive={chatId === activeChat}
                    onSelectChat={onSelectChat}
                />
            ))}
            <FloatingButton onClick={onCreateChat}/>
        </>
    );
};

export default ChatList;
