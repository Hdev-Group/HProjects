"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ExitModal from '../modals/exit';
import IncidentProcess from '../dropdowns/IncidentProcess';
import { timestamps } from '../../../convex/incident';

const IncidentProcesschange = ({ onClose, id, projectid, taskProcessold }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskProcess, setTaskProcess] = useState(taskProcessold);
  const [showExitModal, setShowExitModal] = useState(false);
  const [status, setStatus] = useState('');
  const editProcess = useMutation(api.incident.editprocess);
  const addlog = useMutation(api.incidentlogs.add);

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }


    if (!taskProcess) {
      console.error('Task Priority is null or empty');
      return;
    }

    try {
        if(taskProcessold !== taskProcess){
            await editProcess({
                incidentid: id,
                process: taskProcess,
              });
        
              await addlog({
                projectid: projectid,
                incidentid: id,
                userid: userId,
                action: 'StatusChanged',
                description: taskProcess,
                previous: taskProcessold,
              });
        }
      onClose();
    } catch (error) {
      console.error('Error changing priority:', error);
    }
  }, [id, onClose, taskProcess, userId, addlog, projectid]);

  const handleCloseModal = () => {
    if (taskProcess !== taskProcessold) {
      setShowExitModal(true); 
    } else {
      onClose();
    }
  };

  const hideexitmodal = () => {
    setShowExitModal(false);
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
  }, [taskProcess]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[30%] w-[100%]">
        {showExitModal && (
          <ExitModal onClose={onClose} mainholdRemove={hideexitmodal} /> 
        )}
        <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Update Status</h1>
          <p 
            onClick={handleCloseModal} 
            className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
          <div className='px-4 flex flex-col'>
            <div className="flex flex-col gap-3">
              <div className='flex w-full flex-col'>
                <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Incident Category</label>
                <fieldset>
                <div className='flex flex-col w-full border rounded-xl'>
                  <div className='flex flex-row items-center gap-4 border-b px-4 py-2'>
                    <input type='radio' className='border h-4 w-4 border-neutral-700 rounded-full'  name="radiostatus" value="ongoing"/><p className='font-semibold'>Ongoing Incident</p>
                  </div>
                  <div className='flex items-center flex-row gap-4 border-b px-4 py-2'>
                    <input type='radio' className='border h-4 w-4 border-neutral-700 rounded-full' name="radiostatus" value="paused" /><p className='font-semibold'>Paused</p>
                  </div>
                  <div className='flex items-center flex-row gap-4 border-b px-4 py-2'>
                    <input type='radio' className='border h-4 w-4 border-neutral-700 rounded-full' name="radiostatus" value="resolved" /><p className='font-semibold'>Resolved</p>
                  </div>
                </div>
                </fieldset>
              </div>
                <div className='flex w-full flex-col'>
                    <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Incident Status</label>
                    <IncidentProcess
                    value={taskProcess}
                    onValueChange={setTaskProcess}
                    />
                    <p className='text-sm text-neutral-400'>
                    {taskProcess === "investigation" && (
                      <span>Something has gone wrong. We are investigating what has.</span>
                    )
                  }
                   { taskProcess === "fixing" && (
                      <span>We have found the issue and working on a fix.</span>
                    )
                    } {taskProcess === "monitoring" && (
                      <span>We have fixed the issue and are monitoring the situation.</span>
                    )
                    } {taskProcess === "resolved" && (
                      <span>The issue has been resolved.</span>
                    )
                    }
                    </p>
                </div>
            </div>
          </div>
          <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
            <button type="submit" className="bg-black font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
              Change Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(IncidentProcesschange);
