"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import NoProjects from '../noitems/projectsnone';
import { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning } from './projectboxdashboard';

function ProjectsDataAdder() {
  const projectsholder = useQuery(api.projectsget.get);
  const { userId, isLoaded, isSignedIn, error } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }
    
  const userProjects = projectsholder?.filter(project => project.userId === userId) || [];
      // check if there is data that has pinned set to true if so then we will have a pinned section
      if (userProjects.some(project => project.pinned === true)) {
        const pinnedProjects = userProjects.filter(project => project.pinned === true);
        const nonPinnedProjects = userProjects.filter(project => project.pinned === false);

        return (
          <>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Pinned Projects</h2>
              {pinnedProjects.map((project, index) => {
                if (project.projectStatus === 'developing') {
                  return <BoxProjectBuilding pinned={project.pinned}  key={index} name={project.projectName} id={project._id}/>;
                } else if (project.projectStatus === 'live') {
                  return <BoxProjectlive pinned={project.pinned}  key={index} name={project.projectName} id={project._id}/>;
                } else if (project.projectStatus === 'planning') {
                  return <BoxProjectPlanning pinned={project.pinned}  key={index} name={project.projectName} id={project._id}/>;
                } else {
                  return <div key={index}>Unknown status</div>;
                }
              })}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              {nonPinnedProjects.map((project, index) => {
                if (project.projectStatus === 'developing') {
                  return <BoxProjectBuilding pinned={project.pinned} key={index} name={project.projectName} id={project._id}/>;
                } else if (project.projectStatus === 'live') {
                  return <BoxProjectlive pinned={project.pinned} key={index} name={project.projectName} id={project._id}/>;
                } else if (project.projectStatus === 'planning') {
                  return <BoxProjectPlanning pinned={project.pinned} key={index} name={project.projectName} id={project._id}/>;
                } else {
                  return <div key={index}>Unknown status</div>;
                }
              })}
            </div>
          </>
        );
      }

  return (
    <>
      {userProjects.length > 0 ? (
        userProjects.map((project, index) => {
          if (project.projectStatus === 'developing') {
            return <BoxProjectBuilding key={index} name={project.projectName} id={project._id}/>;
          } else if (project.projectStatus === 'live') {
            return <BoxProjectlive key={index} name={project.projectName} id={project._id}/>;
          } else if (project.projectStatus === 'planning') {
            return <BoxProjectPlanning key={index} name={project.projectName} id={project._id}/>;
          } else {
            return <div key={index}>Unknown status</div>;
          }
        })
      ) : (
        <NoProjects />
      )}
    </>
  );
}

export default ProjectsDataAdder;