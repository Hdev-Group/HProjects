"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AssigneeSelect from '../dropdowns/assignee';
import PriorityStatus from '../dropdowns/priority';
import StatusTime from '../dropdowns/status';

const NewTaskModal = ({ onClose, id }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState(false); 
  const [taskAssignee, setTaskAssignee] = useState('');
  const addTask = useMutation(api.taskssender.add);
  console.log("id:", id.id);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    try {
      await addTask({ projectid: id.id, userId, taskTitle, taskDescription, taskPriority, taskStatus, taskAssignee });
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  useEffect(() => {
    const outerclickclose = document.getElementById('outerclickclose');
    const innercloser = document.getElementById('innercloser');
    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') {
        innercloser.classList.add('slide-out-right');
        setTimeout(() => {
          onClose();
        }, 500);
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
    <div id="outerclickclose" className="absolute modalmain top-0 justify-end items-center flex overflow-y-auto min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-[1000000]">
      <div id='innercloser' className="flex flex-col px-5 py-5 slide-in-right bg--400shadow-lg rounded-tl-[1rem] border-neutral-600 border-l shadow-black bg-neutral-900 h-[100%] md:w-[540px] w-[100%]">
        <div className="flex items-center flex-row justify-between">
          <h1 className="text-2xl font-bold dark:text-white text-dark">Add a Task</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col border-b border-neutral-100/20 pb-4">
            <label name="projectname" className="text-sm mb-2 font-bold dark:text-white text-dark">Title</label>
            <input
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2"
              id="projectname"
              name="nameproject"
              placeholder="Add a dashboard"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <label name="assignee" className="text-sm mb-2 mt-2 font-bold dark:text-white text-dark">Assignee</label>
            <AssigneeSelect
              id={id}
              value={taskAssignee}
              onValueChange={setTaskAssignee}
              required
            />
          </div>

          <div className="flex flex-row gap-5">
            <PriorityStatus 
              required
              onChange={setTaskPriority}
            />
            <StatusTime
              required
              onValueChange={setTaskStatus}
            />
          </div>
          <div className="flex flex-col gap-5 border-b border-neutral-100/20 pb-4">
            <label name="projectdescription" className="text-sm mb-1 font-bold dark:text-white text-dark">Description</label>
            <textarea
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2 resize-y"
              placeholder="The server room is on fire, Send help."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="dark:bg-cyan-600 dark:text-white bg-cyan-600 text-white rounded-lg px-3 py-2">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;