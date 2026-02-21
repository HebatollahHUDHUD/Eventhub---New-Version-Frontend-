"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
import cookies from "js-cookie";
import { API_URL, SESSION_NAME } from "@/constant";
import { getUserSession } from "@/lib/userSession";
import { useQueryClient } from "@tanstack/react-query";

const PusherProvider = () => {
  const user = getUserSession();
  const token = cookies.get(SESSION_NAME);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id || !token) return;

    const pusher = new Pusher("dcfaf2e342d657f7601f", {
      cluster: "eu",
      forceTLS: true,
      authEndpoint: `${API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const channelName = `private-user-${user.id}-channel`;
    const channel = pusher.subscribe(channelName);

    channel.bind("message.created", () => {
      queryClient.invalidateQueries({ queryKey: ["Messages"] });
    });

    channel.bind("notification", () => {
      queryClient.invalidateQueries({ queryKey: ["Notifications"] });
    });

    return () => {
      channel.unsubscribe();
      channel.disconnect();
      pusher.disconnect();
    };
  }, [user?.id, token]);

  return null;
};

export default PusherProvider;
