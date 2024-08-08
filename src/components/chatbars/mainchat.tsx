import React from 'react';
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import Chatside from "./chatside";

interface Chat {
    _id: string;
    userId: string;
    otherchatter: string;
    projectid: string;
}

interface MainChatProps {
    id: string;
}

export default function MainChat({ id }: MainChatProps) {
  const { userId } = useAuth();
  const chats = useQuery(api.getchat.get);

  const filteredgetchat = chats?.filter((chat: Chat) => 
    (chat.projectid === id && chat.userId === userId) || 
    (chat.projectid === id && chat.otherchatter === userId)
  );

  return (
    <div>
      {filteredgetchat?.map((chat: Chat) => (
        <Chatside key={chat._id} chat={chat} projectid={id} />
      ))}
    </div>
  );
}