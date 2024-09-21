import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import { Critical, High, Medium, Low, Security, Feature } from '../dropdowns/priorities/critical';

function ChatTaskEmbed({ projectid, taskid }: { projectid: string, taskid: any }) {
  // Fetch the task details based on the project ID and task ID
  const task = useQuery(api.getexacttask.get, { _id: taskid });

  if (!task || task.projectid !== projectid) {
    return null; // If task not found or project ID doesn't match, return null
  }
  const taskPriority = task.taskPriority;


  return (
    <a href={`../../${projectid}/${taskid}`}>
          <div className="bg-neutral-800 rounded-md border cursor-pointer transition-all p-4 hover:border-white">
      <p className="text-neutral-200 text-xs">Task</p>
      <div className="flex  flex-col gap-2">
        <div className="flex flex-row items-end gap-2">
        <p className="text-neutral-200">{task.taskTitle}</p>
        <div>
            {taskPriority === 'critical' && <Critical />}
            {taskPriority === 'high' && <High />}
            {taskPriority === 'medium' && <Medium />}
            {taskPriority === 'low' && <Low />}
            {taskPriority === 'security' && <Security />}
            {taskPriority === 'Feature' && <Feature />}
          </div>
        </div>
      </div>
    </div>
    </a>
  );
}


export default function BlueChat({ message, projectid }: { message: string, projectid: string }) {
  const { user } = useUser();

  // Improved regex to capture task-related URLs more reliably
  const urlPattern = /https:\/\/hprojects.hdev.uk\/projects\/([^\/]+)\/([a-zA-Z0-9]+)\b/g;
  const match = urlPattern.exec(message);

  const extractedProjectId = match ? match[1] : null;
  const taskid = match ? match[2] : null;
  // remove that url from the message
  message = message.replace(urlPattern, '');

  return (
    <div className="flex w-full justify-end flex-row items-end gap-4 dark:hover:bg-neutral-900 hover:bg-neutral-200/20 rounded-md px-1 py-2">
      <div className="flex flex-col gap-[4px] max-w-full justify-end items-end">
        <p className="dark:text-neutral-400 text-neutral-700 text-xs">{user?.firstName} {user?.lastName}</p>
        <div className="w-full px-5 py-2 relative mb-2.5 rounded-sm items-end justify-end h-auto bg-blue-600 z-30 max-w-[90%]">
        <div className="absolute bottom-0 mr-[-10px] right-0 w-0 h-0 border-r-[10px] border-r-transparent border-l-[10px] border-l-blue-600 border-b-[10px] border-b-blue-600 rounded-l-lg rotate-0 z-10"></div>
        <div className="flex flex-col max-w-full">
            <p className="text-white text-sm break-words">{message}</p>
            {extractedProjectId && taskid && (
              <ChatTaskEmbed projectid={extractedProjectId} taskid={taskid} />
            )}
          </div>
        </div>
      </div>
      <img src={user?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
    </div>
  );
}
