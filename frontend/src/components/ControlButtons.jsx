import { Badge, IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";

export default function ControlButtons({
    video,
    audio,
    screen,
    screenAvailable,
    newMessages,
    onVideoToggle,
    onAudioToggle,
    onScreenToggle,
    onEndCall,
    onChatToggle,
    styles,
}) {
    return (
        <div className={styles.buttonContainers}>
            <IconButton onClick={onVideoToggle} style={{ color: "white" }}>
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={onEndCall} style={{ color: "red" }}>
                <CallEndIcon />
            </IconButton>
            <IconButton onClick={onAudioToggle} style={{ color: "white" }}>
                {audio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>

            {screenAvailable && (
                <IconButton onClick={onScreenToggle} style={{ color: "white" }}>
                    {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                </IconButton>
            )}

            <Badge badgeContent={newMessages} max={999} color="orange">
                <IconButton onClick={onChatToggle} style={{ color: "white" }}>
                    <ChatIcon />
                </IconButton>
            </Badge>
        </div>
    );
}
