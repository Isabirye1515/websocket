import React from "react";
const Chat = () => {
    return (
        <div className="App">
                <h1>Chat</h1>
                <div className="chat-window">
                    <div className="chat-message">
                        <p>Hello, how are you?</p>
                    </div>
                    <div className="chat-message">
                        <p>I'm good, thanks! How about you?</p>
                    </div>
                </div>
                <input type="text" placeholder="Type a message..." />
        </div>
    );
}
export default Chat;