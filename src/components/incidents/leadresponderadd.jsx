"use client";
import React, { useState, useEffect, useCallback, act } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ConvexClient } from "convex/browser";
import PriorityResponse from '../dropdowns/responderp';
import ExitModal from '../modals/exit';
import RolerAssigneeSelect from '../dropdowns/incidentsroleassignments';

const LeadResponderchange = ({ onClose, id, projectid }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [taskAssignee, setTaskAssignee] = useState('');
  const [showExitModal, setShowExitModal] = useState(false); // State to control ExitModal
  const addLeadResponder = useMutation(api.incident.editLeadResponder);
  const addTimeStamps = useMutation(api.incident.timestamps);
  const addlog = useMutation(api.incidentlogs.add);
  const logger = useMutation(api.updater.logger);
  console.log(taskAssignee);

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();
    console.log(taskAssignee);
    
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
  
    try {
      console.log('Adding Lead Responder');
      if (!taskAssignee) {
        console.error('Task Assignee is null or empty');
        return;
      }
      await addLeadResponder({
        incidentid: id,
        leadresponder: taskAssignee,
      });
      await addlog({
        projectid: projectid,
        incidentid: id,
        action: 'LeadResponderChanged',
        description: taskAssignee,
      });
  
      onClose(); // Close the modal after successful submission
      // take them to the incident page
    } catch (error) {
      console.error('Error adding incident:', error);
    }
  }, [id, onClose, taskAssignee, addLeadResponder, addlog, userId]);

  const handleCloseModal = () => {
    if (taskAssignee) {
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
  }, [taskAssignee]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
        <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-xl rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[30%] w-[100%]">
          {showExitModal && (
            <ExitModal onClose={() => onClose()} mainholdRemove={() => hideexitmodal()} /> 
          )}
          <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
            <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Edit Roles</h1>
            <p 
              onClick={handleCloseModal} 
              className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
          </div>
              <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
              <div className='px-4 flex flex-col'>
                <div className="flex flex-col gap-3">
                  <div className='flex w-full flex-col'>
                    <label htmlFor="projecttitle" className="text-sm mb-2 font-bold text-black dark:text-white text-dark">Lead Responder <span className='text-neutral-500 text-sm font-normal'>(optional)</span></label>
                    <RolerAssigneeSelect
                      id={projectid}
                      value={taskAssignee}
                      incidentid={id}
                      onValueChange={setTaskAssignee}
                      required
                    />
                  </div>

              </div>
              </div>
              <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
                <button type="submit" className="bg-black font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
                  Add Lead Responder
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(LeadResponderchange);
