"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AssigneeSelect from '../dropdowns/assignee';
import ExitModal from './exit';

const NewPagerModal = ({ onClose, id }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskAssignee, setTaskAssignee] = useState('');
  const [time, setTime] = useState('');
  const [assigneeFirstName, setAssigneeFirstName] = useState(''); 
  const [assigneeData, setAssigneeData] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false); 

  const projectsholder = useQuery(api.idgetprojects.get, { _id: id.id });
  const addPager = useMutation(api.pageradd.add);

  useEffect(() => {
    const fetchAssigneeData = async () => {
      if (!taskAssignee) return;
      try {
        const response = await fetch(`/api/get-user?userId=${taskAssignee}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAssigneeData(data);
        setAssigneeFirstName(data.firstName);
      } catch (error) {
        console.error('Error fetching assignee data:', error);
        setAssigneeData(null);
      }
    };
    fetchAssigneeData();
  }, [taskAssignee]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    try {
      const timestampInSeconds = Math.floor(new Date(time).getTime() / 1);
      const currentTimestampInms = Math.floor(Date.now() / 1);
      const differenceInSeconds = timestampInSeconds - currentTimestampInms;
      await addPager({ projectid: id.id, userId: taskAssignee, time, calctime: differenceInSeconds, status: 'active' });
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const calculateTimeMessage = () => {
    const timeObj = new Date(time);
    const hours = Math.floor((timeObj - Date.now()) / (1000 * 60 * 60));
    const minutes = Math.floor((timeObj - Date.now()) / (1000 * 60)) % 60;

    if (hours < 0 || minutes < 0) return 'Invalid time';
    if (hours === 0 && minutes === 0) return 'Now';
    if (!assigneeFirstName) return '... will be on call for ...';
    if (hours > 168) return `${assigneeFirstName} will be on call for ${hours} hours and ${minutes} minutes. | Please note this is high for a single responder`;
    if (hours === 0) return `${assigneeFirstName} will be on call for ${minutes} minutes`;
    if (minutes === 0) return `${assigneeFirstName} will be on call for ${hours} hours`;
    return `${assigneeFirstName} will be on call for ${hours} hours and ${minutes} minutes`;
  };

  const handleCloseModal = () => {
    if (taskAssignee || time) {
      setShowExitModal(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') handleCloseModal();
    };
    const outerclickclose = document.getElementById('outerclickclose');
    if (outerclickclose) outerclickclose.addEventListener('click', handleClickOutside);

    return () => {
      if (outerclickclose) outerclickclose.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
        <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[50%] w-[100%]">
        {showExitModal && (
          <ExitModal onClose={onClose} mainholdRemove={() => setShowExitModal(false)} />
        )}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-600">
          <h1 className="text-2xl font-bold text-dark dark:text-white">Add Responder</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-4 px-4">
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="taskAssignee" className="text-sm font-bold text-dark dark:text-white">Responder</label>
            <AssigneeSelect id={id} name="taskAssignee" value={taskAssignee} onValueChange={setTaskAssignee} required />
            <label htmlFor="time" className="text-sm font-bold text-dark dark:text-white">Work Until</label>
            <input
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="datetime-local"
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2"
            />
            <h1>{calculateTimeMessage()}</h1>
          </div>
          <div className="flex justify-end py-3 border-t border-neutral-600">
            <button type="submit" className="bg-black font-semibold text-white rounded-md px-5 py-2">
              Add Responder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPagerModal;
