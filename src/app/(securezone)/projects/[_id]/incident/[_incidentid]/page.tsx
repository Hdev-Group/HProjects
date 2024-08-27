"use client";
import { useEffect, useState, useCallback, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import SideBar from "../../../../../../components/projectscontents/sidebar";
import { Critical, High, Medium, Low } from "../../../../../../components/dropdowns/priorities/critical";
import { Overview, StatusChanges, LeadResponder, PriorityChanges } from "../../../../../../components/incidents/overviews";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
};
interface Project {
  _id: string;
  userId: string;
  otherusers: string[];
  projectName: string;
}

function IncidentProcess({ response }: { response: string }) {
  return (
    <div className="flex flex-row gap-1 py-1 bg-white dark:bg-transparent dark:border-neutral-600 border-neutral-300 px-4 rounded-md w-auto justify-start items-center border">
      {["investigation", "fixing", "monitoring", "resolved"].map((step, index) => (
        <div key={index} className="flex flex-row gap-1 items-center">
          <div className="flex flex-row gap-2">
            <p className={`${response === step ? `font-semibold dark:text-white text-black` : "text-neutral-500"}`}>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </p>
          </div>
          {index < 3 && (
            <svg className="w-4 dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12L10 18V6L16 12Z"></path>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}


function TypeOfPriority({ priority }: { priority: string }) {
  const PriorityComponent = {
    critical: Critical,
    high: High,
    medium: Medium,
    low: Low,
  }[priority];

  return PriorityComponent ? <PriorityComponent /> : null;
}

function TimeOngoing({ time }: { time: any }) {
    // it gives the time like: 1724707619736.1836 so we need to convert it to a readable format

    const timenow = new Date(time).getTime();
    const now = new Date().getTime();
    const diff = now - timenow;
    // now lets convert diff to lets say it was made 2m 23s ago
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    // lets return the time in a readable format if less then a day return hour and how many mins ago if less then a min return seconds ago
    let timeinwords = '';
    if (years > 0) {
        timeinwords = years + 'y';
        if (years > 1) {
            timeinwords += 's';
        }
    } else if (months > 0) {
        timeinwords = months + 'm';
        if (months > 1) {
            timeinwords += 's';
        }
    } else if (weeks > 0) {
        timeinwords = weeks + 'w';
        if (weeks > 1) {
            timeinwords += 's';
        }
    } else if (days > 0) {
        timeinwords = days + 'd';
        if (days > 1) {
            timeinwords += 's';
        }
    } else if (hours > 0) {
        timeinwords = hours + 'h' ;
        if (hours > 1) {
            timeinwords += 's';
        }
    } else if (minutes > 0) {
        timeinwords = minutes + 'm';
        if (minutes > 1) {
            timeinwords += 's';
        }
    } else {
        timeinwords = seconds + 's';
        if (seconds > 1) {
            timeinwords += 's';
        }
    }

  return (
    <div className="flex flex-row gap-1 py-1 bg-white dark:bg-transparent dark:border-neutral-600 border-neutral-300 px-4 rounded-md w-auto justify-start items-center border">
      <div className="flex flex-row gap-2">
        <div className="flex items-center flex-row dark:text-white text-black justify-center rounded-lg dark:bg-transparent bg-white">
          <p className="flex flex-row gap-1">
            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path>
            </svg>
            <p className="md:block hidden">Created:</p>
            <code className="font-semibold">{timeinwords} ago</code>
          </p>
        </div>
      </div>
    </div>
  );
}

function SummarySender() {
  return (
    <div className="w-full flex flex-row justify-between gap-2 hover:bg-neutral-700/20 border rounded-lg px-4 py-4 dark:hover:shadow-neutral-800 hover:shadow-neutral-300 transition-all shadow-md">
      <div className="flex flex-row gap-2 items-center">
        <svg className="w-6 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
        </svg>
        <p className="font-semibold text-neutral-400">Summary not added</p>
      </div>
      <button className="flex flex-row font-medium gap-2 items-center bg-neutral-100 dark:bg-neutral-800 dark:text-white text-black px-2 py-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
        Add Summary
      </button>
    </div>
  );
}

function NavMenu({ currentpage, _id, incidentid }: any) {
    const router = useRouter();

    function handleChangePage(page: string) {
        router.push(`/projects/${_id}/incident/${incidentid}/?tab=${page}`);
    }

    return (
        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4">
                {["overview", "timeline"].map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handleChangePage(page)}
                        className={`w-16 items-center justify-center flex flex-row relative ${
                            currentpage === page || (page === "overview" && !currentpage)
                                ? "text-white"
                                : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"
                        }`}
                    >
                        <p>{page.charAt(0).toUpperCase() + page.slice(1)}</p>
                        {(currentpage === page || (!currentpage && page === "overview")) && (
                            <div className="bg-white w-full h-0.5 bottom-[-9px] absolute"></div>
                        )}
                    </button>
                ))}
            </div>
            <button className="flex flex-row font-medium dark:hover:text-neutral-100 hover:text-neutral-800 items-center dark:text-neutral-400 text-black px-2 py-1 rounded-md transition-all">
                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                Update
            </button>
        </div>
    );
}

export default function IncidentEr({ params }: { params: { _id: string; _incidentid: string; slug: string[] } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectsholder = useQuery(api.projectsget.get);
    const [activeSection, setActiveSection] = useState("incident");

    const project = projectsholder?.find((project: Project) => project._id === params._id);
    const projectname = project?.projectName;
    const projectUserId = project?.userId;
    const incident = useQuery(api.incident.get);

    // Get the current page from the URL
    const currentpage = searchParams.get('tab');
    console.log(currentpage);
    const filteredIncident = incident?.find((incident: any) => incident._id === params._incidentid);
    console.log(filteredIncident);
    const incidenttitle = filteredIncident?.title;
    const response = filteredIncident?.process;
    const priority = filteredIncident?.priority;
    const [userData, setUserData] = useState([]);

    const time = filteredIncident?._creationTime;

    const leadresponder = filteredIncident?.leadresponder;
    const reporter = filteredIncident?.reporterid;
    const responders = filteredIncident?.responders || [];

    const allUserIds = [leadresponder, reporter, ...responders].filter(Boolean).join(',');
    console.log(allUserIds);

    useEffect(() => {
        if (!isLoaded || !projectsholder) return;

        if (!isSignedIn) {
            router.push('/sign-in'); // Redirect to sign-in page if not signed in
        } else if (!project) {
            router.push('/projects');
        } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
            router.push('/projects');
        }

        async function fetchUserData() {
            if (allUserIds) {
                try {
                    // get user ids that are not duplicated from allUserIds
                    const nonDuplicatedUserIds = allUserIds.split(',').filter((id, index, self) => self.indexOf(id) === index);

                    const encodedUserIds = encodeURIComponent(nonDuplicatedUserIds.join(','));
                    const response = await fetch(`/api/get-incidents-users?userIds=${encodedUserIds}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setUserData(data); // Store the fetched user data
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        }
    
        fetchUserData();
    }, [isLoaded, isSignedIn, projectsholder, project, userId, router, allUserIds]);

    if (!isLoaded || !projectsholder) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Unauthorized</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    if (!(projectUserId === userId || project.otherusers.includes(userId))) {
        return <div>Unauthorized</div>;
    }

    const title = `: ${incidenttitle} | ${projectname}`;


    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content="Plan, Build and Push with confidence" />
                <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
            </head>
            <div className="overflow-hidden h-screen" id="modal-root">
                <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
                <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
                <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
                        <div className="w-full bg-bglight dark:bg-bgdark rounded-l-3xl">
                            <div className='flex flex-col'>
                            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between pb-5 mt-5 flex">
                                <div className="px-7 flex  flex-row items-center justify-between">
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div className="p-2 dark:bg-red-500 text-black dark:text-white rounded-md border">
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00001 20V14C4.00001 9.58172 7.58173 6 12 6C16.4183 6 20 9.58172 20 14V20H21V22H3.00001V20H4.00001ZM6.00001 14H8.00001C8.00001 11.7909 9.79087 10 12 10V8C8.6863 8 6.00001 10.6863 6.00001 14ZM11 2H13V5H11V2ZM19.7782 4.80761L21.1924 6.22183L19.0711 8.34315L17.6569 6.92893L19.7782 4.80761ZM2.80762 6.22183L4.22183 4.80761L6.34315 6.92893L4.92894 8.34315L2.80762 6.22183Z"></path></svg>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-sm mb-[-6px] font-medium'>Incidents</p>
                                            <h1 className="flex text-2xl font-bold text-black dark:text-white gap-2" id="tasksproject">IND-00 <span>{incidenttitle}</span></h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <div className="p-2 font-semibold items-center lg:hidden flex justify-center text-lg dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 12L14 6V18L8 12Z"></path></svg><p>Information</p>
                                        </div>
                                        <div className="p-2 font-semibold items-center flex justify-center text-lg dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='dark:bg-neutral-900 bg-neutral-200 py-3 mb-1 flex flex-row w-full px-7'>
                                <div className='flex flex-row flex-wrap gap-4 justify-start items-center'>
                                    <IncidentProcess response={response} />
                                    <TypeOfPriority priority={priority} />
                                    <TimeOngoing time={time} />
                                </div>
                            </div>
                        </div>
                            <div className='w-full items-center flex justify-center overflow-y-scroll  h-full'>
                                <div className='w-full max-w-[1447px] px-3 h-full justify-center'>
                                        <div className='flex-row flex justify-center mt-10 w-full h-full gap-10'>
                                            <div className='flex flex-col h-full gap-4 w-full '>
                                                {
                                                    response != "investigation"  && SummarySender()
                                                }
                                                <div className='w-full h-auto  flex flex-row pb-2 mb-1 gap-3 border border-transparent border-b-neutral-700'>
                                                    <NavMenu currentpage={currentpage} _id={params._id} incidentid={params._incidentid} />
                                                </div>
                                                <div>
                                                    {currentpage === "overview" || currentpage === null ? (
                                                        <div className='flex flex-col w-full h-full'>
                                                            <PriorityChanges />
                                                            <LeadResponder />
                                                            <StatusChanges />
                                                            <Overview firstchild={true} />
                                                        </div>
                                                    ) : null}
                                                    {currentpage === "timeline" && (
                                                        <div className='flex flex-col  w-full h-full'>
                                                            timeline section
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='lg:flex flex-col hidden h-full items-center gap-4 w-80 min-w-80'>
                                                <div className='gap-3 w-full flex flex-col border-b pb-4 border-neutral-600'>
                                                    <div className='flex justify-between w-full flex-row gap-4'>
                                                        <p className='font-medium text-neutral-400'>Lead Responder</p>
                                                        {userData.filter((user: User) => user.id === leadresponder).map((user: User) => (
                                                            <div key={`reporter-${user.id}`} className="flex flex-row gap-1">
                                                                <img src={user.imageUrl || "/loadingimg.jpg"} className='w-6 h-6 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                                                <p>{user.firstName} {user.lastName}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className='flex justify-between w-full flex-row gap-4'>
                                                        <p className='font-medium text-neutral-400'>Reporter</p>
                                                        {userData.filter((user: User) => user.id === reporter).map((user: User) => (
                                                            <div key={`reporter-${user.id}`} className="flex flex-row gap-1">
                                                                <img src={user.imageUrl || "/loadingimg.jpg"} className='w-6 h-6 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                                                <p>{user.firstName} {user.lastName}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className='flex justify-between w-full flex-row gap-4'>
                                                        <p className='font-medium text-neutral-400'>Participants</p>
                                                        <div className='flex flex-row gap-4'>
                                                            {userData.filter((user: User) => responders.includes(user.id) || reporter || leadresponder).map((user: User) => (
                                                                <img key={`participant-${user.id}`} src={user.imageUrl} className='w-6 h-6 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='gap-3 w-full flex flex-col  border-b pb-4 border-neutral-600'>
                                                    <h2 className='font-semibold'>Related Incidents</h2>
                                                    <div className='flex flex-row gap-1 hover:text-neutral-300 transition-all cursor-pointer'>
                                                        <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path></svg> <p className='font-normal'>Link an incident</p>
                                                    </div>
                                                </div>
                                                <div className='gap-3 w-full flex flex-col border-b pb-4 border-neutral-600'>
                                                    <h2 className='font-semibold'>Timestamps</h2>
                                                    <div className='flex flex-col gap-1 w-full'> 
                                                        <div className='flex flex-row justify-between'>
                                                            <p className='font-normal text-neutral-400 text-sm'>Reported at</p>
                                                            <p className='font-normal'>26/8/24, 13:00</p>
                                                        </div>
                                                        <div className='flex flex-row justify-between'>
                                                            <p className='font-normal text-neutral-400 text-sm'>Identified at</p>
                                                            <p className='font-normal'>26/8/24, 13:20</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='gap-3 w-full flex flex-col pb-4'>
                                                    <textarea className='resize-y border bg-transparent rounded-md px-2 min-h-[40px]' placeholder='Incident Notes' value={filteredIncident?.description} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}