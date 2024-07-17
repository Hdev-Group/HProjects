"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import NoProjects from '../noitems/projectsnone';
import { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning } from './projectboxdashboard';

function ProjectsDataAdder() {
  const projectsholder = useQuery(api.projectsget.get);
  const tasksholder = useQuery(api.tasksget.get);
  const { userId, isLoaded, isSignedIn, error } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }
    
  const userProjects = projectsholder?.filter(project => project.userId === userId) || [];
  const userTeams = projectsholder?.filter(project => project.otherusers.includes(userId)) || [];
  const pinnedProjects = userProjects.filter(project => project.pinned);
  const nonPinnedProjects = userProjects.filter(project => !project.pinned);

  const countTasks = (projectId) => {
    const projectTasks = tasksholder?.filter(task => task.projectid === projectId) || [];
    const totalTasks = projectTasks.length;
    const incompleteTasks = projectTasks.filter(task => task.status !== 'done').length;
    return `${incompleteTasks}/${totalTasks}`;
  };

  const renderProjects = (projects) => {
    return projects.map((project, index) => {
      const taskCounter = countTasks(project._id);
      if (project.projectStatus === 'developing') {
        return <BoxProjectBuilding pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else if (project.projectStatus === 'live') {
        return <BoxProjectlive pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else if (project.projectStatus === 'planning') {
        return <BoxProjectPlanning pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else {
        return <div key={index}>Unknown status</div>;
      }
    });
  };

  return (
    <>
      {pinnedProjects.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex flex-row flex-wrap w-full items-center gap-3">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.8273 1.69L22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69ZM14.5344 5.22554L9.86358 9.89637L7.0417 10.4607L13.5418 16.9609L14.1062 14.139L18.7771 9.46818L14.5344 5.22554Z"></path>
            </svg>
            Pinned Projects
          </h2>
          <div className="flex flex-row gap-4 flex-wrap">
            {renderProjects(pinnedProjects)}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold flex flex-row flex-wrap w-full items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.0834 15.1999L21.2855 15.9212C21.5223 16.0633 21.599 16.3704 21.457 16.6072C21.4147 16.6776 21.3559 16.7365 21.2855 16.7787L12.5145 22.0412C12.1979 22.2313 11.8022 22.2313 11.4856 22.0412L2.71463 16.7787C2.47784 16.6366 2.40106 16.3295 2.54313 16.0927C2.58536 16.0223 2.64425 15.9634 2.71463 15.9212L3.91672 15.1999L12.0001 20.0499L20.0834 15.1999ZM20.0834 10.4999L21.2855 11.2212C21.5223 11.3633 21.599 11.6704 21.457 11.9072C21.4147 11.9776 21.3559 12.0365 21.2855 12.0787L12.0001 17.6499L2.71463 12.0787C2.47784 11.9366 2.40106 11.6295 2.54313 11.3927C2.58536 11.3223 2.64425 11.2634 2.71463 11.2212L3.91672 10.4999L12.0001 15.3499L20.0834 10.4999ZM12.5145 1.30864L21.2855 6.5712C21.5223 6.71327 21.599 7.0204 21.457 7.25719C21.4147 7.32757 21.3559 7.38647 21.2855 7.42869L12.0001 12.9999L2.71463 7.42869C2.47784 7.28662 2.40106 6.97949 2.54313 6.7427C2.58536 6.67232 2.64425 6.61343 2.71463 6.5712L11.4856 1.30864C11.8022 1.11864 12.1979 1.11864 12.5145 1.30864ZM12.0001 3.33233L5.88735 6.99995L12.0001 10.6676L18.1128 6.99995L12.0001 3.33233Z"></path>
          </svg>
          Projects
        </h2>
        <div className="flex flex-row gap-4 flex-wrap">
          {renderProjects(nonPinnedProjects)}
        </div>
      </div>
      {userTeams.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold flex flex-row flex-wrap w-full items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.0834 10.4999L21.2855 11.2212C21.5223 11.3633 21.599 11.6704 21.457 11.9072C21.4147 11.9776 21.3559 12.0365 21.2855 12.0787L12.0001 17.6499L2.71463 12.0787C2.47784 11.9366 2.40106 11.6295 2.54313 11.3927C2.58536 11.3223 2.64425 11.2634 2.71463 11.2212L3.91672 10.4999L12.0001 15.3499L20.0834 10.4999ZM12.5145 1.30864L21.2855 6.5712C21.5223 6.71327 21.599 7.0204 21.457 7.25719C21.4147 7.32757 21.3559 7.38647 21.2855 7.42869L12.0001 12.9999L2.71463 7.42869C2.47784 7.28662 2.40106 6.97949 2.54313 6.7427C2.58536 6.67232 2.64425 6.61343 2.71463 6.5712L11.4856 1.30864C11.8022 1.11864 12.1979 1.11864 12.5145 1.30864ZM12.0001 3.33233L5.88735 6.99995L12.0001 10.6676L18.1128 6.99995L12.0001 3.33233Z"></path>
            </svg>
            Team Projects
          </h2>
          <div className="flex flex-row gap-4 flex-wrap">
            {renderProjects(userTeams)}
          </div>
        </div>
      )}
      {projectsholder?.length === 0 && <NoProjects />}
    </>
  );
}

export default ProjectsDataAdder;
