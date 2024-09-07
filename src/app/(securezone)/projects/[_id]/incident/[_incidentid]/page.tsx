"use client";
import { useEffect, useState, useCallback, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import SideBar from "../../../../../../components/projectscontents/sidebar";
import { Critical, High, Medium, Low } from "../../../../../../components/dropdowns/priorities/critical";
import { FirstSend, StatusChanges, LeadResponder, PriorityChanges, IncidentUpdate, PagedResponders } from "../../../../../../components/incidents/overviews";
import AddLeadResponder from "../../../../../../components/buttons/addleadresponder";
import ReactDOM from 'react-dom';
import LeadResponderchange from '../../../../../../components/incidents/leadresponderadd';
import IncidentPrioritychange from '../../../../../../components/incidents/prioritychanger';
import IncidentProcesschange from '../../../../../../components/incidents/incidentprocess';
import UpdateSender from '../../../../../../components/incidents/updates';
import PageSelectResponder from '../../../../../../components/incidents/pageresponders';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '../../../../../../components/ui/dropdown-menu';
  import { useToast } from "../../../../../../components/ui/use-toast";
import DeleteIncident from "../../../../../../components/incidents/deleteincident";

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

function IncidentProcess({ response, onOpenModal }: { response: string, onOpenModal: () => void}) {
    function editactiveclick() {
        const edit = document.getElementById('priorityeditt');
        edit?.classList.remove('hidden');
        edit?.classList.add('flex');

        const priorityshower = document.getElementById('priorityshowerr');
        priorityshower?.classList.add('hidden');
        priorityshower?.classList.remove('flex');
    }

    function hideedit() {
        const edit = document.getElementById('priorityeditt');
        edit?.classList.remove('flex');
        edit?.classList.add('hidden');

        const priorityshower = document.getElementById('priorityshowerr');
        priorityshower?.classList.add('flex');
        priorityshower?.classList.remove('hidden');
    }

    return (
        <>
                <div
                className="relative border w-[25rem] rounded-lg flex cursor-pointer items-center justify-center"
                onClick={onOpenModal}
                onMouseEnter={editactiveclick}
                onMouseLeave={hideedit}
                >
                <div
                    className="border-neutral-500 w-full bg-neutral-700/50 border hover:flex hidden rounded-md items-center transition-all justify-center"
                    id="priorityeditt">
                    Edit
                </div>
                <div className="hover:hidden flex w-full items-center justify-center py-0.5 px-2 hover:opacity-0 opacity-100 transition-all" id="priorityshowerr">
                    {["investigation", "fixing", "monitoring", "resolved"].map((step, index) => (
                        <div key={index} className="flex flex-row gap-1 items-center">
                            <div className="flex flex-row gap-2">
                                <p className={`${response === step ? `font-semibold dark:text-white text-black` : "text-neutral-500"}`}>
                                    {step.charAt(0).toUpperCase() + step.slice(1)}
                                </p>
                            </div>
                            {index < 3 && (
                                <svg
                                    className="w-4 dark:text-white text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M16 12L10 18V6L16 12Z"></path>
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


function TypeOfPriority({ priority, onOpenModal }: { priority: string, onOpenModal: () => void }) {
    const PriorityComponent = {
      critical: Critical,
      high: High,
      medium: Medium,
      low: Low,
    }[priority];
  
    function editactiveclick() {
      const edit = document.getElementById('priorityedit');
      edit?.classList.remove('hidden');
      edit?.classList.add('flex');
  
      const priorityshower = document.getElementById('priorityshower');
      priorityshower?.classList.add('hidden');
      priorityshower?.classList.remove('flex');
    }
  
    function hideedit() {
      const edit = document.getElementById('priorityedit');
      edit?.classList.remove('flex');
      edit?.classList.add('hidden');
  
      const priorityshower = document.getElementById('priorityshower');
      priorityshower?.classList.add('flex');
      priorityshower?.classList.remove('hidden');
    }
  
    return (
      <div
        className="relative w-20 flex cursor-pointer items-center justify-center"
        onClick={onOpenModal} // Use the prop function here
        onMouseEnter={editactiveclick}
        onMouseLeave={hideedit}
      >
        <div
          className="w-full border-neutral-500 bg-neutral-700/50 border hover:flex hidden rounded-md items-center transition-all justify-center"
          id="priorityedit"
        >
          Edit
        </div>
        <div
          className="hover:hidden flex hover:opacity-0 opacity-100 transition-all"
          id="priorityshower"
        >
          {PriorityComponent ? <PriorityComponent /> : null}
        </div>
      </div>
    );
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

function NavMenu({ currentpage, _id, incidentid, onOpenModalEdit }: { currentpage: string, _id: string, incidentid: string, onOpenModalEdit: () => void }) {
    const router = useRouter();


    function handleChangePage(page: string) {
        router.push(`/projects/${_id}/incident/${incidentid}/?tab=${page}`);
    }

    return (
        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-4">
            <div className='w-16 items-center justify-center flex relative transition-all' onClick={() => handleChangePage("overview")}>
                <div className={`${currentpage === "overview" ? "dark:text-white text-black" : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"} transition-all w-full items-center justify-center flex`}>
                    <p>Overview</p>
                    { currentpage === "overview" && <div className='dark:bg-white bg-black w-full h-0.5 bottom-[-9px] absolute'></div> }
                </div>
            </div>
            <div className='w-16 items-center justify-center flex relative transition-all' onClick={() => handleChangePage("timeline")}>
                <div className={`${currentpage === "timeline" ? "dark:text-white text-black" : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"} transition-all w-full items-center justify-center flex`}>
                    <p>Timeline</p>
                    { currentpage === "timeline" && <div className='dark:bg-white bg-black w-full h-0.5 bottom-[-9px] absolute'></div> }
                </div>
            </div>
            </div>
            <button onClick={onOpenModalEdit} className="flex flex-row font-medium dark:hover:text-neutral-100 hover:text-neutral-800 items-center dark:text-neutral-400 text-black px-2 py-1 rounded-md transition-all">
                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                Update
            </button>
        </div>
    );
}


function firstlettercapital(string: string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}


export default function IncidentEr({ params }: { params: { _id: string; _incidentid: string; slug: string[] } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const searchParams = new URLSearchParams(window.location.search);
    const projectsholder = useQuery(api.projectsget.get);
    const [activeSection, setActiveSection] = useState("incident");

    const project = projectsholder?.find((project: Project) => project._id === params._id);
    const summarychanger = useMutation(api.incident.summaryupdate);
    const projectname = project?.projectName;
    const projectUserId = project?.userId;
    const incident = useQuery(api.incident.get);
    const {toast} = useToast();
    const currentpage = searchParams.get('tab');
    const [activePage, setActivePage] = useState(currentpage || "overview");
    const filteredIncident = incident?.find((incident: any) => incident._id === params._incidentid);
    const incidentlogs = useQuery(api.incidentlogs.get);
    const incidentlog = incidentlogs?.filter((log: any) => log.incidentid === params._incidentid);
    const incidenttitle = filteredIncident?.title;
    const response = filteredIncident?.process;
    const priority = filteredIncident?.priority;
    const summary = filteredIncident?.summary;
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriorityModalOpen, setIsPriorityModalOpen] = useState<boolean>(false);
    const [isProcessModalOpen, setIsProcessModalOpen] = useState<boolean>(false);
    const [isPageModalOpen, setIsPageModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen ,setIsDeleteModalOpen] = useState<boolean>(false);
    const handlePriorityOpen = () => setIsPriorityModalOpen(true);
    const handlePriorityClose = () => setIsPriorityModalOpen(false);
    const handleProcessOpen = () => setIsProcessModalOpen(true);
    const handleProcessClose = () => setIsProcessModalOpen(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const handleUpdateOpen = () => setIsUpdateModalOpen(true);
    const handleUpdateClose = () => setIsUpdateModalOpen(false);
    const time = filteredIncident?._creationTime;

    const leadresponder = filteredIncident?.leadresponder;
    const reporter = filteredIncident?.reporterid;
    const responders = filteredIncident?.responders || [];

    const allUserIds = [leadresponder, reporter, ...responders].filter(Boolean).join(',');

    useEffect(() => {
        if (!isLoaded || !projectsholder) return;

        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }
        if (!project) {            
            router.push('/projects');
            return;
        }

        if (projectUserId !== userId && !project.otherusers.includes(userId)) {
            router.push('/projects');
            return;
        }

        if (!filteredIncident) {
            router.push(`/projects/${params._id}/incident`);
            return;
        }

        async function fetchUserData() {
            if (allUserIds) {
                try {
                    // get user ids that are not duplicated from allUserIds
                    const nonDuplicatedUserIds = allUserIds.split(',').filter((id, index, self) => self.indexOf(id) === index);

                    const encodedUserIds = encodeURIComponent(nonDuplicatedUserIds.join(','));
                    const response = await fetch(`/api/get-incidents-users?userIds=${encodedUserIds}&projectId=${params._id}`);
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
    }, [isLoaded, isSignedIn, projectsholder, project, filteredIncident, userId, router, allUserIds]);

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

    const title = `${incidenttitle} | ${projectname}`;

    const handleClick = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const statusOrder = ['investigating', 'fixing', 'monitoring', 'resolved'];
    const uniqueDescriptions = new Set();

    const sortedLogs = incidentlog?.sort((a: any, b: any) => {
        return statusOrder.indexOf(a.description) - statusOrder.indexOf(b.description);
    });



    function SummarySender(summary: string, incidentid: string, projectid: string) {
        let summaryinfo = summary?.trim() || ""; // Handle undefined, null, and trim whitespace
        
        function turnintotextareansave() {
            const savearea = document.getElementById('savearea');
            savearea?.classList.add('hidden');
            savearea?.classList.remove('flex');
            const summary = document.getElementById('summaryarea');
            if (summary) {
                summary.classList.add('flex');
                summary.classList.remove('hidden');
            }
    
            // Add event listener to the textarea to handle empty state dynamically
            const textarea = document.getElementById('textsummary') as HTMLTextAreaElement;
            textarea?.addEventListener('input', handleTextAreaInput);
        }
    
        function hidesummary() {
            const summaryarea = document.getElementById('summaryarea');
            summaryarea?.classList.add('hidden');
            summaryarea?.classList.remove('flex');
            const savearea = document.getElementById('savearea');
            savearea?.classList.remove('hidden');
            savearea?.classList.add('flex');
        }
    
        function handleTextAreaInput(e: Event) {
            const textarea = e.target as HTMLTextAreaElement;
            const trimmedValue = textarea.value.trim();
            // Update summaryinfo dynamically based on textarea content
            summaryinfo = trimmedValue;
        }
    
        function checkersummary(e: any) {
            e.preventDefault();
            const summaryarea = document.getElementById('summaryarea');
            const summary = summaryarea?.querySelector('textarea');
            
            if (summary) {
            const summaryinfovalue = summary.value.trim(); // Trim whitespace
            summaryinfo = summaryinfovalue; // Update global summaryinfo

            const responders = [...filteredIncident?.responders]; // Create a copy of responders array        // Append the user id to the responders array if it's not already present
            if (!responders.includes(user?.id)) {
                responders.push(user?.id);
            }
            if (summaryinfovalue.length > 2000){
                toast({
                    variant: "destructive",
                    description: "Summary is too long",
                })
                return;
            }
            // Send the summary to the server, even if empty
            summarychanger({
                projectid: projectid,
                incidentid: incidentid,
                summary: summaryinfovalue,
                responders: responders
            });
            hidesummary();
            }
        }
        return (
            <div className="w-full flex flex-row justify-between gap-2 border rounded-lg dark:hover:shadow-neutral-800/40 hover:shadow-neutral-300 transition-all shadow-md">
                <div id="savearea" className="flex flex-row px-4 py-4 justify-between w-full items-center">
                    <div className="flex flex-row gap-2 items-center">
                        {
                            !summaryinfo ? ( // Check for empty or undefined summary
                                <p className="text-neutral-500 font-semibold">No Summary</p>
                            ) : (
                                <p className="text-white w-full" onClick={turnintotextareansave}>{summaryinfo}</p>
                            )
                        }
                    </div>
                    {!summaryinfo ? (
                        <button onClick={turnintotextareansave} className="flex flex-row font-medium gap-2 items-center bg-neutral-100 dark:bg-neutral-800 dark:text-white text-black px-2 py-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </svg>
                            Add Summary
                        </button>
                    ) : null}
                </div>
                <div id="summaryarea" className="hidden flex-row justify-between w-full items-center">
                    <form className="flex flex-col px-4 py-4 w-full" onSubmit={checkersummary}>
                        <textarea id="textsummary" className="w-full h-20 focus:outline-none bg-transparent dark:text-white text-black rounded-md p-2" maxLength={2000} placeholder="Add a summary">{summaryinfo}</textarea>
                        <div className="flex flex-row gap-4">
                            <button type="submit" className="flex w-20 justify-center flex-row font-medium gap-2 items-center bg-neutral-100 dark:bg-neutral-900 dark:text-white text-black px-2 py-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">Save</button>
                            <button type="button" onClick={hidesummary} className="flex w-20 justify-center flex-row font-medium gap-2 items-center dark:text-white text-black px-2 py-1 rounded-md border hover:border-neutral-200 dark:hover:border-neutral-700 transition-all">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

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
                                    <div className="px-7 flex flex-row items-center justify-between">
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
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                <div className="p-2 font-semibold items-center flex justify-center text-lg dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                                                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                                                </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800" onClick={() => setIsPageModalOpen(true)}>
                                                        Page Responders
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800" onClick={() => setIsDeleteModalOpen(true)}>
                                                        Delete Incident
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                                <div className='dark:bg-neutral-900 bg-neutral-200 py-3 mb-1 flex flex-row w-full px-7'>
                                    <div className='flex flex-row flex-wrap gap-4 justify-start items-center'>
                                        <IncidentProcess response={response} onOpenModal={() => setIsProcessModalOpen(true)}  />
                                        <TypeOfPriority priority={priority} onOpenModal={() => setIsPriorityModalOpen(true)} />
                                        <TimeOngoing time={time} />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full items-center flex justify-center h-full overflow-y-scroll'>
                                <div className='w-full max-w-[1447px] px-3 h-full justify-center relative'>
                                    <div className='flex-row flex justify-center mt-5 w-full h-full gap-10'>
                                        <div className='flex flex-col gap-4 w-full h-auto'>
                                            {   
                                                response !== "investigation" && summary != "" || summary != undefined ? ( SummarySender(summary, params._incidentid, params._id)) : null
                                            }
                                            <div className='w-full h-auto  flex flex-row pb-2 mb-1 gap-3 border border-transparent border-b-neutral-700'>
                                                <NavMenu currentpage={activePage} _id={params._id} incidentid={params._incidentid} onOpenModalEdit={() => setIsUpdateModalOpen(true)} />
                                            </div>
                                            <div>
                                            {activePage === "overview" ? (
                                                <div className='flex flex-col mb-[10rem] w-full h-full'>
                                                    {
                                                    // Ensure incidentlog is defined and sort it by _creationTime before mapping
                                                    incidentlog?.sort((a: any, b: any) => {
                                                        const dateA = new Date(a._creationTime);
                                                        const dateB = new Date(b._creationTime);
                                                        return dateA.getTime() - dateB.getTime();
                                                    }).reverse().map((log: any, index: number) => {
                                                        switch (log.action) {
                                                        case "PagedResponders":
                                                            return <PagedResponders key={index} log={log} />;
                                                        case "LeadResponderChanged":
                                                            return <LeadResponder key={index} log={log} />;
                                                        case "StatusChanged":
                                                            return <StatusChanges key={index} log={log} />;
                                                        case "PriorityChanged":
                                                            return <PriorityChanges key={index} log={log} />;
                                                        case "IncidentUpdate":
                                                            return <IncidentUpdate key={index} log={log} />;
                                                        default:
                                                            return null; 
                                                        }
                                                    })
                                                    }
                                                    <FirstSend
                                                    firstchild={true}
                                                    reporter={userData.filter((user: User) => user.id === reporter)}
                                                    incidentstarted={filteredIncident?._creationTime}
                                                    incidentdetails={filteredIncident}
                                                    />
                                                </div>
                                                ) : null}
                                                {activePage === "timeline" && (
                                                    <div className='flex flex-col  w-full h-full'>
                                                        timeline section
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='lg:flex flex-col hidden relative h-full items-center gap-4 w-80 min-w-80'>
                                            <div className="fixed gap-4 flex flex-col max-w-80 w-80">
                                            <div className='gap-3 w-full flex flex-col border-b pb-4 border-neutral-600'>
                                                <div className='flex justify-between w-full flex-row gap-4'>
                                                    <p className='font-medium text-neutral-400'>Lead Responder</p>
                                                    {leadresponder === "" || leadresponder === "none" ? (
                                                        <AddLeadResponder id={params._incidentid} projectid={params._id} />
                                                    ) : (
                                                        userData.filter((user: User) => user.id === leadresponder).map((user: User) => (
                                                            <div key={`reporter-${user.id}`} className="flex text-black dark:text-white flex-row gap-2 py-0.5 px-2 transition-all cursor-pointer border border-transparent rounded-lg hover:bg-neutral-700/20 hover:border-neutral-400/20" onClick={handleClick}>
                                                                <img src={user.imageUrl || "/loadingimg.jpg"} className='w-6 h-6 rounded-full' alt={`${user.firstName} ${user.lastName}`} />
                                                                <p>{user.firstName} {user.lastName}</p>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                                <div className='flex justify-between w-full flex-row gap-4'>
                                                    <p className='font-medium text-neutral-400'>Reporter</p>
                                                    {userData.filter((user: User) => user.id === reporter).map((user: User) => (
                                                        <div key={`reporter-${user.id}`} className="flex text-black dark:text-white flex-row gap-2">
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
                                                <h2 className='font-semibold text-black dark:text-white'>Related Incidents</h2>
                                                <div className='flex flex-row gap-1 text-black dark:text-white hover:text-neutral-300 transition-all cursor-pointer'>
                                                    <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path></svg> <p className='font-normal'>Link an incident</p>
                                                </div>
                                            </div>
                                            <div className='gap-3 w-full flex flex-col border-b pb-4 border-neutral-600'>
                                                <h2 className='font-semibold text-black dark:text-white'>Timestamps</h2>
                                                <div className='flex flex-col gap-1 w-full'> 
                                                    {    
                                                        sortedLogs?.map((log: any, index: number) => {
                                                            // Check if the log action is 'StatusChanged' and the description is unique
                                                            if (log.action === 'StatusChanged' && !uniqueDescriptions.has(log.description)) {
                                                                // Add the description to the Set
                                                                uniqueDescriptions.add(log.description);
                                                                
                                                                return (
                                                                    <div key={index} className='flex flex-row gap-2'>
                                                                        <p className='font-normal text-neutral-400'>{firstlettercapital(log.description)} at</p>
                                                                        <p className='font-semibold text-black dark:text-white'>{timesince(new Date(log?._creationTime))}</p>
                                                                    </div>
                                                                );
                                                            }

                                                            // Return null if the log description is a duplicate
                                                            return null;
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='gap-3 w-full flex flex-col pb-4'>
                                                <h2 className='font-semibold text-black dark:text-white'>Incident Notes</h2>
                                                <textarea className='resize-y border bg-transparent text-black dark:text-white rounded-md px-2 min-h-[40px]' placeholder='Incident Notes' value={filteredIncident?.description} />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        {isPriorityModalOpen &&
                            ReactDOM.createPortal(
                            <IncidentPrioritychange 
                                taskPriorityold={priority}
                                id={params._incidentid} 
                                projectid={params._id} 
                                onClose={handlePriorityClose} 
                            />,
                            document.getElementById('modal-root')!
                            )
                        }
                        {isModalOpen && 
                            ReactDOM.createPortal(
                            <LeadResponderchange 
                                id={params._incidentid} 
                                projectid={params._id} 
                                onClose={handleClose}
                                />,
                            document.getElementById('modal-root')!
                        )}
                        {isProcessModalOpen &&
                            ReactDOM.createPortal(
                            <IncidentProcesschange 
                                taskProcessold={response}
                                id={params._incidentid} 
                                projectid={params._id} 
                                onClose={handleProcessClose} 
                            />,
                            document.getElementById('modal-root')!
                            )
                        }
                        {isUpdateModalOpen &&
                            ReactDOM.createPortal(
                                <UpdateSender
                                    id={params._incidentid}
                                    projectid={params._id}
                                    onClose={handleUpdateClose}
                                    taskProcesser={response}
                                    taskPriorityy={priority}
                                    responders={responders}
                                />,
                                document.getElementById('modal-root')!
                            )
                        }
                        {isPageModalOpen &&
                            ReactDOM.createPortal(
                                <PageSelectResponder
                                    id={params._incidentid}
                                    projectid={params._id}
                                    onClose={() => setIsPageModalOpen(false)}
                                    responders={responders}
                                    incidenttitle={incidenttitle}
                                />,
                                document.getElementById('modal-root')!
                            )
                        }
                        {
                            isDeleteModalOpen &&
                            ReactDOM.createPortal(
                                <DeleteIncident
                                    id={params._incidentid}
                                    projectid={params._id}
                                    onClose={() => setIsDeleteModalOpen(false)}
                                    projectowner={projectUserId}
                                />,
                                document.getElementById('modal-root')!
                            )
                        }
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )};

    function timesince(date: Date) {
        const timenow = date.getTime();
        const now = new Date().getTime();
        const diff = now - timenow;

        // now lets format it to be like 1/2/2022 12:00:00
        const dateobj = new Date(date);
        return dateobj.toLocaleString();
        
    }