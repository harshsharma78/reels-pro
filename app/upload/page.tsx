import React from "react";
import VideoUploadForm from "../components/VideoForm";

const VideoUplaod = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
    </div>
  );
};

export default VideoUplaod;
