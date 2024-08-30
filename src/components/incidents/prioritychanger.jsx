"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ExitModal from '../modals/exit';
import PriorityResponse from '../dropdowns/responderp';

const IncidentPrioritychange = ({ onClose, id, projectid, taskPriorityold }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskPriority, setTaskPriority] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  
  const editPriority = useMutation(api.incident.editPriority);
  const addlog = useMutation(api.incidentlogs.add);

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }


    if (!taskPriority) {
      console.error('Task Priority is null or empty');
      return;
    }

    try {
        if(taskPriorityold !== taskPriority){
            await editPriority({
                incidentid: id,
                priority: taskPriority,
              });
        
              await addlog({
                projectid: projectid,
                incidentid: id,
                userid: userId,
                action: 'PriorityChanged',
                description: taskPriority,
                previous: taskPriorityold,
              });
        }
      onClose();
    } catch (error) {
      console.error('Error changing priority:', error);
    }
  }, [id, onClose, taskPriority, userId, editPriority, addlog, projectid]);

  const handleCloseModal = () => {
    if (taskPriority !== taskPriorityold) {
      setShowExitModal(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [taskPriority]);

  if (!isLoaded || !isSignedIn) return null;
  const priorityDetails = {
    low: {
      text: 'Issues with minor impact. These can be resolved within hours. Most customers are unlikely to notice any problems.',
      example: 'Example: Minor UI bug in an admin panel.',
      style: 'text-neutral-300'
    },
    medium: {
      text: 'Issues causing moderate service disruption. These may require prompt attention but are not urgent.',
      example: 'Example: Degraded performance in a non-critical service.',
      style: 'text-yellow-300'
    },
    high: {
      text: 'Issues causing significant service disruption. Immediate action is required, though there may be workarounds to mitigate the impact.',
      example: 'Example: A key microservice is failing, impacting a subset of users.',
      style: 'text-red-300'
    },
    critical: {
      text: 'Critical issues causing severe service disruption. Immediate response is essential.',
      example: 'Example: Data breach or full system outage affecting all users.',
      style: 'text-red-400'
    }
  };

  return (
    <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[30%] w-[100%]">
        {showExitModal && (
          <ExitModal onClose={onClose} mainholdRemove={hideexitmodal} /> 
        )}
        <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Edit Priority</h1>
          <p 
            onClick={handleCloseModal} 
            className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
          <div className='px-4 flex flex-col'>
            <div className="flex flex-col gap-3">
              <div className='flex w-full flex-col'>
                <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Incident Priority</label>
                <PriorityResponse 
                  required
                  value={taskPriority}
                  onChange={setTaskPriority} 
                />
                {taskPriority && (
                  <span className={`${priorityDetails[taskPriority].style} mt-1 text-xs`}>
                    {priorityDetails[taskPriority].text}
                    <br />
                    {priorityDetails[taskPriority].example}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
            <button type="submit" className="bg-black font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
              Change Priority
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(IncidentPrioritychange);
