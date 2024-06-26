"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import NoProjects from '../noitems/projectsnone';
import { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning } from './projectboxdashboard';
import exp from "constants";


function ProjectsDataAdder() {
    const projectsholder = useQuery(api.projectsget.get);
    const { userId, isLoaded, isSignedIn, error } = useAuth();
  
    if (!isLoaded || !isSignedIn) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        {projectsholder?.length ? (
          projectsholder.map((project, index) => {
            if (project.projectStatus === 'developing') {
              return <BoxProjectBuilding key={index} name={project.projectName} />;
            } else if (project.projectStatus === 'live') {
              return <BoxProjectlive key={index} name={project.projectName} />;
            } else if (project.projectStatus === 'planning') {
              return <BoxProjectPlanning key={index} name={project.projectName} />;
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