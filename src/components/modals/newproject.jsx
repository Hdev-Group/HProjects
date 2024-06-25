"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import SelectDemo from '../dropdowns/newprojects';

const NewProjectModal = ({ onClose }) => {
  const { userId, isLoaded, isSignedIn, error } = useAuth();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');

  const addProject = useMutation(api.projects.add);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
    try {
      await addProject({ userId, projectName, projectDescription, projectStatus });
      onClose();
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
    <div id="outerclickclose" className="absolute modalmain top-0 justify-end items-center flex h-[100%] w-[100%] bg-neutral-950/40  z-[1000000]">
      <div className="flex flex-col px-5 py-5 slide-in-right bg--400shadow-lg rounded-tl-[1rem] border-neutral-600 border-l shadow-black bg-neutral-900 h-[100%] md:w-[540px] w-[100%]">
        <div className="flex items-center flex-row justify-between">
          <h1 className="text-2xl font-bold dark:text-white text-dark">Add a Project</h1>
          <p onClick={onClose} className="text-2xl text-red-600 cursor-pointer hover:text-red-400 transition-all-300">x</p>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-5 border-b border-neutral-100/20 pb-4">
            <input
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2"
              id="projectname"
              name="nameproject"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <input
              className="bg-neutral-800 border-neutral-800 text-white border rounded-lg px-3 py-2"
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-5 border-b border-neutral-100/20 pb-4">
            <a href="https://github.com" className="flex flex-row items-center gap-3 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700">
              <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>
              <p className="font-semibold">Link Github</p>
            </a>
          </div>
          <div className="flex flex-col gap-5 ">
            <SelectDemo  />
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
