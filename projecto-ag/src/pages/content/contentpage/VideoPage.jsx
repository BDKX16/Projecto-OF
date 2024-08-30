import React from "react";

const VideoPage = ({ video }) => {
  return (
    <div className="main-container">
      <h1>Video Page</h1>
      {/* Aquí puedes agregar el reproductor de video y otros elementos relacionados */}
      <div className="video-container"></div>
      <div className="video-info"></div>
      <div className="video-comments"></div>
    </div>
  );
};
export default VideoPage;
