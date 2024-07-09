import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface CommentBoxProps {
    taskId: any;
    _id: any;
}

export default function CommentBox({ taskId, _id }: CommentBoxProps) {
    const { userId } = useAuth();

    const taskident = taskId;
    const projectident = _id;
    console.log(_id);
    console.log('CommentBox', taskident, projectident);
    const [CommenterMessage, setCommenterMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const addComment = useMutation(api.commentsender.add);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await addComment({
            taskId,
            userId: userId!,
            ProjectId: _id,
            CommenterMessage,
        });
        setCommenterMessage('');
        setIsLoading(false);
    };
    return (
        <div className='border-dashed border p-4 flex gap-4 flex-col justify-center rounded-md  transition-all'>
            <textarea
                className='p-2 w-full rounded-md min-h-[5rem] border border-neutral-700 placeholder:dark:text-white placeholder:text-black bg-transparent'
                id='descriptioner'
                placeholder='Thanks for the task! I will get on it now.'
                value={CommenterMessage}
                onChange={(e) => setCommenterMessage(e.target.value)}
            />
            <button
                className={` hover:bg-neutral-500/60 transition-all dark:text-white text-black p-2 max-w-[10rem] rounded-md ${
                    CommenterMessage ? 'cursor-pointer bg-blue-600' : 'cursor-not-allowed bg-neutral-500/20'
                }`}
                disabled={!CommenterMessage || isLoading}
                onClick={handleFormSubmit}
            >
                {isLoading ? 'Loading...' : 'Comment'}
            </button>
        </div>
    );
}