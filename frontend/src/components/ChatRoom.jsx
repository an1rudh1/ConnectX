import { Button, TextField } from "@mui/material";

export default function ChatRoom({ messages, message, onMessageChange, onSendMessage, styles }) {
    return (
        <div className={styles.chatRoom}>
            <div className={styles.chatContainer}>
                <h1>Chat</h1>

                <div className={styles.chattingDisplay}>
                    {messages.length !== 0 ? messages.map((item, index) => (
                        <div style={{ marginBottom: "20px" }} key={index}>
                            <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                            <p>{item.data}</p>
                        </div>
                    )) : <p>No Messages Yet</p>}
                </div>

                <div className={styles.chattingArea}>
                    <TextField
                        value={message}
                        onChange={onMessageChange}
                        id="outlined-basic"
                        label="Enter Your chat"
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={onSendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
}
