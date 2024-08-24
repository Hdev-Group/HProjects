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
            <div className="dark:bg-neutral-900 bg-neutral-200 text-black dark:text-white mt-1 rounded-md border cursor-pointer transition-all p-4 hover:border-white">
        <p className="text-xs">Task</p>
        <div className="flex  flex-col gap-2">
          <div className="flex flex-row items-end gap-2">
          <p className="">{task.taskTitle}</p>
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
  

export default function DarkChat({assigneeData, message}: {assigneeData: any, message: string}) {
    const { user } = useUser();

    // Improved regex to capture task-related URLs more reliably
    const urlPattern = /https:\/\/h-projects.vercel.app\/projects\/([^\/]+)\/([a-zA-Z0-9]+)\b/g;
    const match = urlPattern.exec(message);
  
    const extractedProjectId = match ? match[1] : null;
    const taskid = match ? match[2] : null;
    // remove that url from the message
    message = message.replace(urlPattern, '');
    return(
        <div className="flex w-full justify-start flex-row items-end gap-4 rounded-md px-1 py-2 dark:hover:bg-neutral-900 hover:bg-neutral-200/20">
            <div className="justify-between w-full flex flex-row">
            <div className="flex flex-row gap-4 justify-end items-end">
            <img src={assigneeData?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-[4px]">
                <p className="dark:text-neutral-400 text-neutral-700 text-xs">{assigneeData?.firstName} {assigneeData?.lastName}</p>
                <div className="w-max px-5 py-2 relative mb-2.5 rounded-sm h-auto bg-neutral-800 z-30">
                <div className="absolute bottom-0 ml-[-10px] left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-neutral-800 border-b-[10px] border-b-neutral-800 rounded-l-lg rotate-0 z-10"></div>
                <div className="flex flex-col">
                </div>
                <p className="text-white text-wrap text-sm">{message}</p>
                {extractedProjectId && taskid && (
              <ChatTaskEmbed projectid={extractedProjectId} taskid={taskid} />
            )}
                </div>
            </div>
            </div>
            </div>
            </div>
    )
}