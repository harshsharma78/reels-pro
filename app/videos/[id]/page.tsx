"use client";
import { apiClient, SingleVideoProps } from "@/lib/api-client";
import { IKVideo } from "imagekitio-next";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleVideo = () => {
  const [video, setVideo] = useState<SingleVideoProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await apiClient.getVideo(id);
        setVideo(res);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      {
        video && (
          <div className="hover:opacity-80 text-center py-2 transition-opacity">
            <h2 className="text-6xl py-4">{video.video.title}</h2>

            <p className="text-2xl text-base-content/70 line-clamp-2">
              {video.video.description}
            </p>
            <IKVideo
              path={video.video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.video.controls}
              className="w-[60vw] object-cover rounded-[50px] px-4 py-6"
            />
          </div>
        )
        // ))
      }
    </div>
  );
};

export default SingleVideo;
