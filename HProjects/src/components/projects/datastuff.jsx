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