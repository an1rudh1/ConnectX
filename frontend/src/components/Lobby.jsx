import { Button, TextField } from "@mui/material";

export default function Lobby({
    username,
    setUsername,
    connect,
    localVideoref,
}) {
    return (
        <div>
            <h2>Enter into Lobby</h2>

            <TextField
                id="outlined-basic"
                label={localStorage.getItem("username")}
                // value={localStorage.getItem("username")}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
            />

            <Button variant="contained" onClick={connect}>
                Connect
            </Button>

            <div>
                <video ref={localVideoref} autoPlay muted></video>
            </div>
        </div>
    );
}