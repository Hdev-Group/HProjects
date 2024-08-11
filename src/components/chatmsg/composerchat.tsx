import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import DarkChat from './darkchat';
import BlueChat from './bluechat';
import { useAuth } from '@clerk/nextjs';

export default function ComposerChat({ chatId, projectid, assigneeData }: { chatId: string, projectid: string, assigneeData: any }) {
    const getMessages = useQuery(api.getdm.get);
    const { userId } = useAuth();
    const chats = getMessages?.filter((chat: any) => chat.chatId === chatId && chat.projectid === projectid);

    // If chats is undefined or empty, return a message
    if (!chats || chats.length === 0) {
        return <div>No messages found.</div>;
    }


    // Render the messages depending on the userId
    return (
        <div>
            {chats.map((chat: any) => (
                <div key={chat._id}>
                    {chat.userId === userId ? (
                        <BlueChat message={chat.message} />
                    ) : (
                        <DarkChat assigneeData={assigneeData} message={chat.message} />
                    )}
                </div>
            ))}
        </div>
    );
}