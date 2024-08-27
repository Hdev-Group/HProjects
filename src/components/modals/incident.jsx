"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ConvexClient } from "convex/browser";
import PriorityResponse from '../dropdowns/responderp';
import ExitModal from './exit';

const NewIncidentModal = ({ onClose, id }) => {
  const client = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [incidentid, setincidentid] = useState('');
  const [showExitModal, setShowExitModal] = useState(false); // State to control ExitModal
  const addIncident = useMutation(api.incident.add);
  const addTimeStamps = useMutation(api.incident.timestamps);
  const logger = useMutation(api.updater.logger);
  const [currentpage, setCurrentPage] = useState("1");

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();
    
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    if (taskTitle === '') {
      document.getElementById('titleinvalidator').classList.remove('hidden');
      return;
    }
    if (taskPriority === '') {
      document.getElementById('priorityinvalidator').classList.remove('hidden');
      return;
    }

    try {
      const response = await addIncident({
        projectid: id.id,
        title: taskTitle,
        reporterid: userId,
        leadresponder: "",
        responders: [],
        description: taskDescription,
        priority: taskPriority,
        status: 'active',
        process: 'investigation',
      });

      setincidentid(response);
      console.log(response);

      if (response){
        await addTimeStamps({
          projectid: id.id,
          incidentid: response,
          reported: new Date().toISOString(),
          investigating: new Date().toISOString(),
        });
      }
  
      onClose(); // Close the modal after successful submission
      // take them to the incident page
      window.location.href = `/projects/${id.id}/incident/${response}`;
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, [id, taskTitle, taskDescription, taskPriority, taskStatus, taskAssignee, onClose]);

  const handleCloseModal = () => {
    if (taskTitle || taskDescription || taskPriority || taskStatus || taskAssignee) {
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
  }, [taskTitle, taskDescription, taskPriority, taskStatus, taskAssignee]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
        <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-xl rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[50%] w-[100%]">
          {showExitModal && (
            <ExitModal onClose={() => onClose()} mainholdRemove={() => hideexitmodal()} /> 
          )}
          <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
            <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Incident</h1>
            <p 
              onClick={handleCloseModal} 
              className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
          </div>
          <div className='px-4 z-0'>
          <div className='flex flex-row relative gap-5 mt-4 border-b w-full pb-1 border-neutral-600'>
            <div onClick={() => setCurrentPage("1")} className={`${currentpage === "1" ? "dark:text-white text-black" : "text-neutral-500"} flex w-25 cursor-pointer flex-col font-semibold `}>
              Active Incident
              {currentpage === "1" && (<div className='bg-white w-full max-w-[7rem] h-0.5 bottom-[-1px] absolute'></div>)}
            </div>
            <div onClick={() => setCurrentPage("2")} className={`${currentpage === "2" ? "dark:text-white text-black" : "text-neutral-500"} flex cursor-pointer flex-col font-semibold `}>
              Test Incident
              {currentpage === "2" && (<div className='bg-white w-full max-w-[6rem] h-0.5 bottom-[-1px] absolute'></div>)}
            </div>
          </div>
          </div>
          {
            currentpage === "1" ? (
              <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
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
                    <PriorityResponse 
                      required
                      value={taskPriority}
                      id='priority'
                      onChange={(value) => setTaskPriority(value)}
                      invalidator='priorityinvalidatorinput'
                    />
                    {/* Priority Helper Text */}
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
              <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
                <button type="submit" className="bg-black font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
                  Declare Incident
                </button>
              </div>
            </form>
            ) : null
          }
          {
            currentpage === "2" ? (
              <p>TBA</p>
            ) : null
          }
        </div>
      </div>
    </>
  );
};

export default React.memo(NewIncidentModal);
