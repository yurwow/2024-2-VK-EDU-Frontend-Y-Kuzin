import ChatListItem from "./ChatListItem/ChatListItem.jsx";

const ChatList = ({ messages }) => {

    return (
        <>
            <ChatListItem messages={messages}/>
            <ChatListItem messages={messages}/>
            <ChatListItem messages={messages}/>
        </>
    );
};

export default ChatList;
