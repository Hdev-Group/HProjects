import ChatSelector from "../quickchat/quickchatselector";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { api } from '../../../convex/_generated/api';
import { useQuery, useMutation } from "convex/react";
import Chatside from "./chatside";

interface SideBarChatProps {
  user: any;
  id: string;
}

interface AssigneeData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  id: string;
}

interface Chat {
  _id: string;
  userId: string;
  otherchatter: string;
  projectid: string;
}

interface ChatStart {
  userId: string;
  otherchatter: string;
  projectid: string;
}

export default function SideBarChat({ user, id }: SideBarChatProps) {
  const { userId } = useAuth();
  const [taskAssignee, setTaskAssignee] = useState<string>('');
  const chatstart = useMutation(api.startchat.create);
  const getchat = useQuery(api.getchat.get);
  const filteredgetchat = getchat?.filter((chat: Chat) => 
    (chat.projectid === id && chat.userId === userId) || 
    (chat.projectid === id && chat.otherchatter === userId)
  );

  function submitchat() {
    if (taskAssignee && taskAssignee !== '' && taskAssignee !== null) {
      try {
        const taskAssigneeArray: any = JSON.parse(taskAssignee);

        if (taskAssigneeArray.length >= 3) {
          const assigneeId: string = taskAssigneeArray[0];
          const assigneeName: string = taskAssigneeArray[1];

          const assigneeExists = filteredgetchat?.some((chat: Chat) => chat.otherchatter === assigneeId);
          if (assigneeExists) {
            console.warn('Direct message with this user already exists.');
          } else {
            chatstart({
              userId: userId!,
              otherchatter: assigneeId,
              projectid: id,
            });
          }
        } else {
          console.error('Invalid taskAssignee structure:', taskAssigneeArray);
        }
      } catch (error) {
        console.error('Error parsing taskAssignee:', error);
      }
    } else {
      console.warn('Invalid taskAssignee or User already exists in DMs');
    }
  }

  return (
    <div className="min-w-[300px] border bg-bglight dark:bg-bgdark border-l-transparent rounded-3xl border-neutral-600/40">
      <div className="flex items-center justify-start pl-4 border border-transparent border-b-neutral-600/40 py-4">
        <h1 className="font-semibold text-xl">Direct Messages</h1>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex flex-row px-2 w-full h-full gap-1 items-center">
          <ChatSelector
            id={id}
            value={taskAssignee}
            onValueChange={(value: string) => setTaskAssignee(value)}
          />
          <button onClick={submitchat} className="w-1/3 h-10 bg-primary-500 text-white font-semibold rounded-md border transition-all hover:bg-blue-600">Chat</button>
        </div>
        {filteredgetchat?.map((chat: Chat) => (
          <Chatside key={chat._id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
