"use client";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import Video from "./components/Videos";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await apiClient.getVideos();
        setVideos(videos);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchVideos();
  }, []);
  return (
    <main className="px-6 py-4 min-h-screen h-full w-full flex flex-col items-center space-y-6">
      <h1 className="text-6xl text-center py-6 font-bold">ImageKit ReelsPro</h1>

      <Video videos={videos} />
    </main>
  );
}
