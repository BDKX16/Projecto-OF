import React from "react";

const VideoPage = ({ video }) => {
  return (
    <div className="main-container">
      <h1>Video Page</h1>
      {/* Aquí puedes agregar el reproductor de video y otros elementos relacionados */}
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src={
            video.videoUrl ||
            "https://s3.almendragala.com/api/v1/buckets/almen/objects/download?preview=true&prefix=video-test.mp4&version_id=null"
          }
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info"></div>
      <div className="video-comments"></div>
    </div>
  );
};
export default VideoPage;
