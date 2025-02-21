"use client";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";

const urlEndpoint = process.env.IMAGE_KIT_URL_ENDPOINT;
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;

const Provider = ({ children }: { children: React.ReactNode }) => {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error(error, "ImageKit authentication request failed!");
      throw new Error(`ImageKit Authentication request failed: ${error}`);
    }
  };

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <NotificationProvider>
        <ImageKitProvider
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}>
          {children}
        </ImageKitProvider>
      </NotificationProvider>
    </SessionProvider>
  );
};

export default Provider;
