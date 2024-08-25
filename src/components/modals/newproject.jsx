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
    <div id="outerclickclose" className="absolute modalmain top-0 justify-end items-center flex h-[100%] w-[100%] bg-neutral-950/40 z-[1000000]">
      <div id='innercloser' className="flex flex-col px-5 py-5 slide-in-right bg-white dark:bg-neutral-900 h-[100%] md:w-[540px] w-[100%] rounded-tl-[1rem] border-neutral-600 border-l shadow-lg">
        <div className="flex items-center flex-row justify-between">
          <h1 className="text-2xl font-bold dark:text-white text-black">Add a Project</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-5 border-b border-neutral-100/20 pb-4">
            <input
              className="dark:bg-neutral-800 dark:border-neutral-800 text-black placeholder:dark:text-white placeholder:text-black dark:text-white border rounded-lg px-3 py-2"
              id="projectname"
              name="nameproject"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <input
              className="dark:bg-neutral-800 dark:border-neutral-800 text-black placeholder:dark:text-white placeholder:text-black dark:text-white border rounded-lg px-3 py-2"
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-5">
            <StatusSelect 
              value={projectStatus}
              onChange={(value) => setProjectStatus(value)}
              required
            />
          </div>
          <button type="submit" className="dark:bg-cyan-600 dark:text-white bg-cyan-600 text-white rounded-lg px-3 py-2">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
