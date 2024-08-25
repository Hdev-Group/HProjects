"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import StatusSelect from '../dropdowns/newprojects';

const NewProjectModal = ({ onClose }) => {
  const { userId, isLoaded, isSignedIn, error } = useAuth();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [pinned, setPinned] = useState(false); // Fixed useState call
  const [otherusers, setOtherUsers] = useState([]);
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const addProject = useMutation(api.projects.add);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    try {
      await addProject({ userId, projectName, projectDescription, projectStatus, otherusers, pinned });
      onClose(); // Close the modal after adding the project
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  useEffect(() => {
    const outerclickclose = document.getElementById('outerclickclose');
    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') {
        onClose();
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
    <div id="outerclickclose" className="absolute top-0 justify-center flex overflow-y-hidden overflow-x-hidden min-h-[100%] h-full w-[100%] bg-neutral-950/40 z-10">
      <div id='innercloser' className="flex flex-col zoomin overflow-y-auto z-[10000000000000000] md:shadow-lg mt-[9rem] md:rounded-xl shadow-md rounded-md border dark:shadow-black bg-neutral-100 dark:bg-neutral-900 h-[30rem] md:w-[50%] w-[100%]">
      <div className="flex items-center flex-row px-5 justify-between border-b-neutral-600  border  border-t-transparent border-x-transparent w-full h-auto py-3">
          <h1 className="text-2xl font-bold dark:text-white text-black">Add a Project</h1>
          <p onClick={onClose} className="text-2xl dark:text-neutral-200 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className='px-4 flex flex-col mt-4'>
          <div className="flex flex-col gap-5  pb-4">
            <div className='w-full flex flex-col '>
            <label htmlFor="projectname" className="text-sm font-bold text-black dark:text-white text-dark">Project Name</label>
            <label htmlFor="projectname" className="text-xs font-semibold text-black dark:text-neutral-300 text-dark mb-3">Give your project a name</label>
            <input
              className="bg-transparent dark:border-neutral-500 text-black placeholder:dark:text-white placeholder:text-black dark:text-white border rounded-lg px-3 py-2"
              id="projectname"
              name="nameproject"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            </div>
            <div className='w-full flex flex-col'>
            <label htmlFor="projectname" className="text-sm font-bold text-black dark:text-white text-dark">Project Description</label>
            <label htmlFor="projectname" className="text-xs font-semibold text-black dark:text-neutral-300 text-dark mb-3">Describe your project</label>
            <input
              className="bg-transparent dark:border-neutral-500 text-black placeholder:dark:text-white placeholder:text-black dark:text-white border rounded-lg px-3 py-2"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          </div>
          <div className='w-full flex flex-col relative'>
          <label htmlFor="projectname" className="text-sm font-bold text-black dark:text-white text-dark">Project Status</label>
          <label htmlFor="projectname" className="text-xs font-semibold text-black dark:text-neutral-300 text-dark mb-3">Set the status of your project</label>
          <div className="flex flex-col gap-5">
            <StatusSelect 
              value={projectStatus}
              onChange={(value) => setProjectStatus(value)}
              required
            />
          </div>
          </div>
          </div>
          <div className='px-2 py-3 flex justify-end  border-t-neutral-600 border border-b-transparent border-x-transparent'>
          <button type="submit" className="bg-black font-semibold dark:text-white  text-white rounded-md w-auto px-5 py-2">
            Add Project
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
