"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AssigneeSelect from '../dropdowns/assignee';
import { ConvexClient } from "convex/browser";
import PriorityStatus from '../dropdowns/priority';
import StatusTime from '../dropdowns/status';

const NewTaskModal = ({ onClose, id }) => {
  const client = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskId, setTaskId] = useState('');
  const addTask = useMutation(api.taskssender.add);
  const logger = useMutation(api.updater.logger); // log new tasks added
  
  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    if (taskTitle === '') {
      document.getElementById('titleinvalidator').classList.remove('hidden');
      return;
    }
    if (taskAssignee === '') {
      document.getElementById('assigneeinvalidator').classList.remove('hidden');
      return;
    }
    if (taskPriority === '') {
      document.getElementById('priorityinvalidator').classList.remove('hidden');
      return;
    }
    if (taskStatus === '') {
      document.getElementById('statusinvalidator').classList.remove('hidden');
      return;
    }
    if (taskDescription === '') {
      document.getElementById('descriptioninvalidator').classList.remove('hidden');
      return;
    }

    try {
      // Call Convex mutation and get response
      const response = await addTask({
        projectid: id.id,
        userId,
        taskTitle,
        taskDescription,
        taskPriority,
        taskStatus,
        taskAssignee
      });
  
      setTaskId(response);
  
      if (response) {
        // Log the task creation
        await logger({
          taskId: response,
          ProjectId: id.id,
          action: taskStatus,
          taskPriority,
          taskAssignee,
          usercommited: userId,
          added: true,
          timestamp: new Date().toISOString()
        });
      } else {
        console.error('Failed to retrieve taskId.');
      }
  
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, [taskId, addTask, id, taskTitle, taskDescription, taskPriority, taskStatus, taskAssignee, onClose]);

  useEffect(() => {
    const outerclickclose = document.getElementById('outerclickclose');
    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') {
          onClose();
      }
    };

    if (outerclickclose) {
      outerclickclose.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (outerclickclose) {
        outerclickclose.removeEventListener('click', handleClickOutside);
      }
    };
  }, [onClose]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div id="outerclickclose" className="absolute top-0 justify-center flex overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex flex-col zoomin overflow-y-auto z-[10000000000000000] md:shadow-lg mt-[9rem] md:rounded-xl shadow-md rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-[32.3rem] md:w-[50%] w-[100%]">
      <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600  border  border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-2xl font-bold text-black dark:text-white text-dark">Add a Task</h1>
          <p onClick={onClose} className="text-2xl text-black cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 ">
          <div className='px-4 flex flex-col mt-4'>
          <div className="flex flex-col  pb-4">
            <label htmlFor="projectname" className="text-sm mb-2 font-bold text-black dark:text-white text-dark">Title</label>
            <input
              className="bg-neutral-800 border-neutral-800 text-black dark:text-white border rounded-lg px-3 py-2"
              id="titlename"
              name="nameproject"
              invalidator='titleinvalidatorinput'
              placeholder="Add a dashboard"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <span className='text-red-400 hidden' id='titleinvalidator'>Invalid Title</span>
            <h1 htmlFor="" className="text-sm mb-2 mt-2 font-bold text-black dark:text-white text-dark">Assignee</h1>
            <AssigneeSelect
              id={id}
              invalidator='assigneeinvalidatorinput'
              value={taskAssignee}
              onValueChange={setTaskAssignee}
              required
            />
            <span className='text-red-400 hidden' id='assigneeinvalidator'>Invalid Assignee</span>
          </div>
          <div className="flex flex-row gap-5">
            <div className='flex w-full flex-col'>
            <h1 htmlFor="" className="text-sm mb-2  font-bold text-black dark:text-white text-dark">Priority</h1>
            <PriorityStatus 
              required
              id='priority'
              onChange={(value) => setTaskPriority(value)}
              invalidator='priorityinvalidatorinput'
            />
            <span className='text-red-400 hidden' id='priorityinvalidator'>Invalid Priority</span>
            </div>
            <div className='flex w-full flex-col'>
            <h1 htmlFor="" className="text-sm mb-2  font-bold text-black dark:text-white text-dark">Status</h1>
            <StatusTime
              required
              invalidator='statusinvalidatorinput'
              value={taskStatus}
              onValueChange={setTaskStatus}
            />
            <span className='text-red-400 hidden' id='statusinvalidator'>Invalid Status</span>
            </div>
          </div>
          <div className="flex flex-col  pb-4">
            <label htmlFor="projectdescription" className="text-sm pb-2 pt-4 font-bold text-black dark:text-white text-dark">Description</label>
            <textarea
              className="dark:bg-neutral-800 dark:border-neutral-800 border-neutral-300 text-black dark:text-white border rounded-lg px-3 py-2 resize-y"
              placeholder="The server room is on fire, Send help."
              invalidator='descriptioninvalidatorinput'
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <span className='text-red-400 hidden' id='descriptioninvalidator'>Invalid Description</span>
          </div>
          </div>
          <div className='px-2 py-3 flex justify-end  border-t-neutral-600 border border-b-transparent border-x-transparent'>
          <button type="submit" className="bg-black font-semibold dark:text-white  text-white rounded-md w-auto px-5 py-2">
            Add Task
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(NewTaskModal);
