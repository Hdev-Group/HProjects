"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ConvexClient } from "convex/browser";
import PriorityStatus from '../dropdowns/priority';

const NewIncidentModal = ({ onClose, id }) => {
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
    
    if (taskPriority === '') {
      document.getElementById('priorityinvalidator').classList.remove('hidden');
      return;
    }
    if (taskStatus === '') {
      document.getElementById('statusinvalidator').classList.remove('hidden');
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
    <div id="outerclickclose" className="absolute top-0 justify-center flex items-center  overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex flex-col zoomin overflow-y-auto bg--400 md:shadow-lg md:rounded-xl shadow-md rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[50%] w-[100%]">
        <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600  border  border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-2xl font-bold text-black dark:text-white text-dark">Incident</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-4">
        <div className='px-4 flex flex-col'>
          <div className="flex flex-col gap-3">
            <div className='flex w-full flex-col'>
            <label htmlFor="projecttitle" className="text-sm mb-2 font-bold text-black dark:text-white text-dark">Title</label>
            <input
              required
              type="text"
              id='title'
              className="dark:bg-neutral-800 dark:border-neutral-800 pb-1 border-neutral-300 text-black dark:text-white border rounded-lg px-3 py-2"
              placeholder="Incident Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <span className='text-red-400 hidden' id='titleinvalidator'>Invalid Title</span>
            </div>
            <div className='flex w-full flex-col'>
            <label htmlFor="projecttitle" className="text-sm mb-2 font-bold text-black dark:text-white text-dark">Priority</label>
            <PriorityStatus 
              required
              id='priority'
              onChange={(value) => setTaskPriority(value)}
              invalidator='priorityinvalidatorinput'
            />
            <span className='text-red-400 hidden' id='priorityinvalidator'>Invalid Priority</span>
            </div>
          <div className="flex flex-col pb-4">
            <label htmlFor="projectdescription" className="text-sm mb-2 font-bold text-black dark:text-white text-dark">Summary <span className='text-neutral-500 text-xs'>(optional)</span></label>
            <textarea
              className="dark:bg-neutral-800 dark:border-neutral-800 border-neutral-300 text-black dark:text-white border rounded-lg px-3 py-2 resize-y"
              placeholder="What would you like to read at 3am getting paged?"
              invalidator='descriptioninvalidatorinput'
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <span className='text-red-400 hidden' id='descriptioninvalidator'>Invalid Description</span>
          </div>
          </div>
          </div>
          <div className='px-2 py-3 flex justify-end  border-t-neutral-600 border border-b-transparent border-x-transparent'>
          <button type="submit" className="bg-black font-semibold dark:text-white  text-white rounded-md w-auto px-5 py-2">
            Declare Incident
          </button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default React.memo(NewIncidentModal);
