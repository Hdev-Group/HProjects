import React, { useRef } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from "@clerk/nextjs";

interface MessageSubmitterProps {
  chatid: string;
  _id: string;
}

export default function MessageSubmitter({ chatid, _id }: MessageSubmitterProps) {
  const sendermsg = useMutation(api.messagesender.add);
  const { userId } = useAuth();
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const chatmsg = messageInputRef.current?.value;


    if (messageInputRef.current) {
      messageInputRef.current.value = '';
    }

    await sendermsg({ chatId: chatid, userId: userId!, message: chatmsg!, projectid: _id });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row w-full items-center justify-center h-full" id="messagesubmitter">
      <input
        type="text"
        id="messageinput"
        placeholder={`Type a message`}
        className="w-full px-3 bg-transparent h-full text-black dark:text-white placeholder:text-black placeholder:dark:text-white"
        ref={messageInputRef}
      />
      <button type="submit" className="h-full bg-blue-500 hover:bg-blue-600 transition-all w-10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path>
        </svg>
      </button>
    </form>
  );
}
