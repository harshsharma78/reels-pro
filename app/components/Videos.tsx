"use client";
import { IVideo } from "@/models/Video";
import React from "react";
import VideoCard from "./VideoCard";

const Videos = ({ videos }: { videos: IVideo[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map(video =>
        Array.from({ length: 10 }).map((_, index) => (
          <VideoCard
            key={`${video._id?.toString()}-${index}`}
            video={video}
          />
        )),
      )}
      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
};

export default Videos;
