"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import AssigneeSelect from '../dropdowns/assignee';


const NewPagerModal = ({ onClose, id }) => {
  const { userId, isLoaded, isSignedIn, error } = useAuth();
  const [taskAssignee, setTaskAssignee] = useState('');
  const [time, setTime] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [Smarttimerr, setSmartTimerr] = useState('');
  const [assigneeFirstName, setAssigneeFirstName] = useState(''); 
  const [assigneeData, setAssigneeData] = useState('');
  const projectsholder = useQuery(api.idgetprojects.get, { _id: id.id });
  const addPager = useMutation(api.pageradd.add);


  useEffect(() => {
    async function fetchAssigneeData() {
      if (taskAssignee) {
        try {
          const response = await fetch(`/api/get-user?userId=${taskAssignee}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAssigneeData(data);
          setAssigneeFirstName(data.firstName); // Set the first name
        } catch (error) {
          console.error('Error fetching assignee data:', error);
          setAssigneeData(null);
        }
      }
    }
  
    fetchAssigneeData();
  }, [taskAssignee]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    try {
      await addPager({ projectid: id.id, userId: taskAssignee, time: time, status: 'active'});
      document.getElementById
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };


  const timeworkout = () => {
    const timeObj = new Date(time);
    const date = timeObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const timeString = timeObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    const calculatedTime = timeObj.getTime() - Date.now();
    const hours = Math.floor(calculatedTime / (1000 * 60 * 60));
    const minutes = Math.floor((calculatedTime % (1000 * 60 * 60)) / (1000 * 60));
    if (hours < 0 || minutes < 0) return 'Invalid time';
    if (hours === 0 && minutes === 0) return 'Now';
    if (assigneeFirstName === '') return `... will be on call for ...`;
    if (isNaN(hours) && isNaN(minutes)) return `${assigneeFirstName} will be on call for ...`;
    if (hours > 168) return `${assigneeFirstName} will be on call for ${hours} hours and ${minutes} minutes. | Please note this is high for a single responder`;
    if (hours === 0) return `${assigneeFirstName} will be on call for ${minutes} minutes`;
    if (minutes === 0) return `${assigneeFirstName} will be on call for ${hours} hours`;
    return `${assigneeFirstName} will be on call for ${hours} hours and ${minutes} minutes`;
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
    <div id="outerclickclose" className="absolute modalmain top-0 justify-end items-center flex h-[100%] w-[100%] bg-neutral-950/40  z-[1000000]">
      <div id='innercloser' className="flex flex-col px-5 py-5 slide-in-right bg--400 shadow-lg rounded-tl-[1rem] border-neutral-600 border-l shadow-black bg-neutral-900 h-[100%] md:w-[40%] w-[100%]">
        <div className="flex items-center flex-row justify-between">
          <h1 className="text-2xl font-bold dark:text-white text-dark">Add Responder</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-5 border-b border-neutral-100/20 pb-4">
            <label htmlFor="taskAssignee" className="text-lg font-bold dark:text-white text-dark">Responder</label>
            <AssigneeSelect
              id={id}
              name='taskAssignee'
              invalidator='assigneeinvalidatorinput'
              value={taskAssignee}
              onValueChange={setTaskAssignee}
              required
            />
            <label htmlFor="time" className="text-lg font-bold dark:text-white text-dark">Work Until</label>
            <input
              name="time"
              value={time}
              id="timesetter"
              onChange={(e) => setTime(e.target.value)}
              type="datetime-local" // Use datetime-local type for date and time input
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2"
            />
            <h1>{timeworkout()}</h1>
          </div>

          <div className="flex flex-col gap-5 ">

          </div>
          <button type="submit" className="dark:bg-cyan-600 w-auto dark:text-white bg-cyan-600 text-white rounded-lg px-3 py-2">
            Add Responder
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPagerModal;
