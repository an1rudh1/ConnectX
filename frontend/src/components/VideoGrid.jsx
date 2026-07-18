export default function VideoGrid({ videos, styles }) {
    return (
        <div className={styles.conferenceView}>
            {videos.map((video) => (
                <div key={video.socketId}>
                    <video
                        data-socket={video.socketId}
                        ref={(ref) => {
                            if (ref && video.stream) {
                                ref.srcObject = video.stream;
                            }
                        }}
                        autoPlay
                        playsInline={video.playsinline}
                    />
                </div>
            ))}
        </div>
    );
}
