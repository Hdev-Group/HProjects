"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const DeleteIncident = ({ onClose, id, projectid, projectowner }) => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const deleteIncident = useMutation(api.deleteIncident.deleteIncident);
  const getusers = useMutation(api.userstab.get);
  const filteredusers = getusers.data?.filter((user) => user.userid === userId && user.projectID === projectid);
  const ismanager = filteredusers?.role === 'manager' || filteredusers?.role === 'admin' || projectowner === userId;

  const handleFormSubmitReal = useCallback(async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
        if(ismanager){
            await deleteIncident({
                _id: id,
            })
        } else {
            console.error('User is not a manager');
        }
      onClose();
    } catch (error) {
      console.error('Error changing priority:', error);
    }
  }, [id, onClose, userId, projectid]);

  function handleCloseModal() {
    onClose();
  }

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
  }, [onClose]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div id="outerclickclose" className="absolute top-0 justify-center flex items-center overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex overflow-hidden flex-col zoomin bg--400 md:shadow-lg md:rounded-lg rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-auto md:w-[30%] w-[100%]">
        <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-xl font-semibold text-black dark:text-white text-dark">Delete Incident</h1>
          <p 
            onClick={handleCloseModal} 
            className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmitReal} className="flex flex-col gap-4 mt-4">
          <div className='px-4 flex flex-col'>
            <div className="flex flex-col gap-3">
              <div className='flex w-full flex-col'>
                <p className='text-md font-semibold text-black dark:text-white'>You will be unable to get the data from this incident back.</p> 
                </div>   
            </div>
          </div>
          <div className='px-2 py-3 flex justify-end border-t-neutral-600 border border-b-transparent border-x-transparent'>
            {
                ismanager ? (
                    <button type="submit" className="bg-red-600 font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">Delete</button>
                ) : ( <button disabled className="bg-gray-600 cursor-not-allowed font-semibold dark:text-white text-white rounded-md w-auto px-5 py-2">Please ask a manager to delete this.</button>)
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(DeleteIncident);
