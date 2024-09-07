"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ExitModal from '../modals/exit';
import { PagerSelector } from '../dropdowns/pagerselector';
import { sendpageEmail } from '../../service/aws-ses';
import { useToast } from '../ui/use-toast';

const PageSelectResponder = ({ onClose, id, projectid, responders, incidenttitle }: any) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { toast } = useToast()
  const [taskAssignee, setTaskAssignee] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const IncidentPages = useMutation(api.pagerincidents.add);
  const IncidentPusher = useMutation(api.incident.editResponder);
  const addlog = useMutation(api.incidentlogs.add);
  const pagercallscheck = useQuery(api.pagerincidents.get)
  const filteredpagercalls = pagercallscheck?.filter((pagercall: any) => pagercall.incidentid === id && taskAssignee === pagercall.userid);

  const fetchAssigneeData = async (taskAssignee: string) => {
    if (taskAssignee) {
      try {
        const response = await fetch(`/api/get-user?userId=${taskAssignee}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching assignee data:', error);
        return null;
      }
    }
    return null;
  };
  



    const handleFormSubmitReal = useCallback(async (e: any) => {
      e.preventDefault();
    
      if (!userId) {
        console.error('User is not authenticated');
        return;
      }
      try {
        if (!taskAssignee) {
          console.error('Task Assignee is null or empty');
          return;
        }
              // check if user has already been paged
        if (filteredpagercalls && filteredpagercalls.length > 0) {
          toast({
            variant: 'destructive',
            description: 'User has already been paged',
          });
          return;
        } else if (taskAssignee === userId) {
          toast({
            variant: 'destructive',
            description: 'You cannot page yourself',
          });
          return;
        } 
        if (!responders.includes(taskAssignee)) {
          responders.push(taskAssignee);
        }
    
        // Fetch assignee data
        const fetchedData = await fetchAssigneeData(taskAssignee);
        
        const email = fetchedData?.emailAddresses?.[0]?.emailAddress;
        if (email) {
    
          await sendpageEmail({
            to: email,
            from: 'pager@hprojects.hdev.uk',
            subject: `${incidenttitle} - You have been paged `,
            message: 'You have been assigned as a responder to an incident.',
            pager: fetchedData,
            sentby: userId,
            projectid: projectid,
            incidentid: id,
            title: incidenttitle,
          });
        } else {
          console.error('No email addresses found.');
        }
    
        // Update incident and logs
        await IncidentPusher({
          _id: id,
          responders: responders,
        });
        await IncidentPages({
          projectid: projectid,
          incidentid: id,
          userid: userId,
          acknowledged: false,
          pagerid: taskAssignee,
        });
        await addlog({
          projectid: projectid,
          incidentid: id,
          userid: userId,
          action: 'PagedResponders',
          description: taskAssignee,
        });
    
        onClose(); // Close the modal after successful submission
      } catch (error) {
        console.error('Error adding incident:', error);
      }
    }, [userId, taskAssignee, id, projectid, responders, IncidentPusher, IncidentPages, addlog, onClose]);


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
    const handleClickOutside = (e: any) => {
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
        <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[30%] w-[100%]">
          {showExitModal && (
            <ExitModal onClose={() => onClose()} mainholdRemove={() => hideexitmodal()} /> 
          )}
          <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
            <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Page Responders</h1>
            <p 
              onClick={handleCloseModal} 
              className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
          </div>
          <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
            <div className='px-4 flex flex-col'>
              <div className="flex flex-col gap-3">
                <div className='flex w-full flex-col'>
                  <label htmlFor="projecttitle" className="text-md mb-2 font-bold text-black dark:text-white text-dark">Who do you wish to page for this incident</label>
                  <PagerSelector
                    id={projectid}
                    value={taskAssignee}
                    incidentid={id}
                    onValueChange={setTaskAssignee}
                  />
                </div>
              </div>
            </div>
            <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
              <button type="submit" className="bg-black hover:bg-neutral-800 transition-all font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">
                Page Responders
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PageSelectResponder;
