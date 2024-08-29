"use client";
import React, { useState, useEffect, useCallback, act } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ConvexClient } from "convex/browser";
import PriorityResponse from '../dropdowns/responderp';
import ExitModal from '../modals/exit';
import IncidentProcess from '../dropdowns/IncidentProcess';
import TimeUpdate from '../dropdowns/time';


const UpdateSender = ({ onClose, id, projectid, taskProcesser, taskPriorityy, responders }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskPriority, setTaskPriority] = useState(taskPriorityy);
  const [taskTime, setTaskTime] = useState('');
  const [taskProcess, setTaskProcess] = useState(taskProcesser);
  const [showExitModal, setShowExitModal] = useState(false);
  const addlog = useMutation(api.incidentlogs.add);
const incidentsUpdate = useMutation(api.incident.updater);

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();
    
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    const respondersa = [...responders]; // Create a copy of responders array        // Append the user id to the responders array if it's not already present
    if (!respondersa.includes(userId)) {
        respondersa.push(userId);
    }
    try {
      await incidentsUpdate({
        incidentid: id,
        process: taskProcess,
        priority: taskPriority,
        responders: respondersa,
      });
      await addlog({
        projectid: projectid,
        incidentid: id,
        action: 'IncidentUpdate',
        userid: userId,
        description: document.getElementById('textupdater').value,
        nextupdate: taskTime,
      });
      if (taskPriority !== taskPriorityy || taskPriority !== taskPriorityy) {
        await addlog({
          projectid: projectid,
          incidentid: id,
          action: 'PriorityChanged',
          description: taskPriority,
          previous: taskPriorityy,
        });
      }
  
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding incident:', error);
    }
  }, [id, onClose, addlog, userId]);

  const handleCloseModal = () => {
    if (taskProcess || taskPriority || taskTime || document.getElementById('textupdater').value) {
      setShowExitModal(true); // Show ExitModal if there are unsaved changes
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
  }, []);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-auto overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
        <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[50%] w-[100%]">
          {showExitModal && (
            <ExitModal onClose={() => onClose()} mainholdRemove={() => hideexitmodal()} /> 
          )}
          <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
            <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Share Update</h1>
            <p 
              onClick={handleCloseModal} 
              className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
          </div>
              <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
              <div className='px-4 flex flex-col'>
                <div className="flex flex-col gap-3">
                  <div className='flex w-full gap-3 flex-col'>
                    <div>
                        <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Process</label>
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
                    <div>
                        <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Priority</label>
                        <PriorityResponse 
                            required
                            value={taskPriority}
                            onChange={setTaskPriority} 
                        />
                        {taskPriority === 'low' && (
                        <span className='text-neutral-300 mt-1 text-xs'>
                            Issues with minor impact. These can be resolved within hours. Most customers are unlikely to notice any problems. 
                            <br />
                            Example: Minor UI bug in an admin panel.
                        </span>
                        )}
                        {taskPriority === 'medium' && (
                        <span className='text-yellow-300 mt-1 text-xs'>
                            Issues causing moderate service disruption. These may require prompt attention but are not urgent. 
                            <br />
                            Example: Degraded performance in a non-critical service.
                        </span>
                        )}
                        {taskPriority === 'high' && (
                        <span className='text-red-300 mt-1 text-xs'>
                            Issues causing significant service disruption. Immediate action is required, though there may be workarounds to mitigate the impact.
                            <br />
                            Example: A key microservice is failing, impacting a subset of users.
                        </span>
                        )}
                        {taskPriority === 'critical' && (
                        <span className='text-red-400 mt-1 text-xs'>
                            Critical issues causing severe service disruption. Immediate response is essential.
                            <br />
                            Example: Data breach or full system outage affecting all users.
                        </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white">Message</label>
                        <p className='text-sm mb-2 font-medium text-black dark:text-neutral-400'>Share a message to the team to keep them updated and on the same page.</p>
                        <textarea id="textupdater" className='bg-transparent w-full border-neutral-800 text-white border rounded-lg px-3 py-2 resize-y min-h-[8rem]' placeholder={`What is the situation? \nWhat is your next move? \nWhat do you need?`} />
                    </div>
                    <div>
                        <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Time</label>
                        <p className='text-sm mb-2 font-medium text-black dark:text-neutral-400'>How long for your next update?</p>
                        <TimeUpdate value={taskTime} onValueChange={setTaskTime} />
                    </div>
                  </div>
              </div>
              </div>
              <div className='px-2 py-3 flex flex-row gap-3 justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
              <button type='button' onClick={handleCloseModal} className="bg-transparent hover:border-neutral-500 transition-all border font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2 ml-2">Cancel</button>
                <button type="submit" className="bg-black hover:bg-neutral-700 transition-all font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
                  Send Update
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(UpdateSender);
