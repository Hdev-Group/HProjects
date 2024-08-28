import React, { useState, useEffect } from 'react';

function timesince(date: Date) {
    const timenow = date.getTime();
    const now = new Date().getTime();
    const diff = now - timenow;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    let timeinwords = '';
    if (years > 0) {
        timeinwords = years + 'y';
    } else if (months > 0) {
        timeinwords = months + 'm';
    } else if (weeks > 0) {
        timeinwords = weeks + 'w';
    } else if (days > 0) {
        timeinwords = days + 'd';
    } else if (hours > 0) {
        timeinwords = hours + 'h';
    } else if (minutes > 0) {
        timeinwords = minutes + 'm';
    } else {
        timeinwords = seconds + 's';
    }

    return timeinwords;
}

async function getuserdata(userid: string) {
    const response = await fetch(`/api/get-user?userId=${userid}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

function firstlettercapital(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function FirstSend({ firstchild, reporter, incidentdetails, incidentstarted }: { firstchild?: boolean; reporter: any; incidentdetails: any, incidentstarted: any }) {
    const reportera = reporter[0];
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div>Loading...</div> 
        );
    }

    return (
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full" src={reportera?.imageUrl} alt={`${reportera?.firstName} ${reportera?.lastName}`} />
                {firstchild !== true && <div className="border-l h-full" />}
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white">
                        <span className="font-semibold ">{reportera?.firstName} {reportera?.lastName}</span> declared an incident
                    </p>
                    <p className="text-md font-normal text-neutral-400"> {timesince(new Date(incidentstarted))} ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-800 dark:text-neutral-300 font-semibold gap-4 flex">Status <span className="text-black dark:text-white">{firstlettercapital(incidentdetails?.process)}</span></p>
                    <p className=" text-neutral-800 dark:text-neutral-300 font-semibold gap-4 flex">Severity <span className="text-black dark:text-white">{firstlettercapital(incidentdetails?.priority)}</span></p>
                </div>
            </div>
        </div>
    );
}
export function StatusChanges({ log }: any): JSX.Element{
    const [userData, setUserData] = useState<any>(null); 
    const [error, setError] = useState<any>(null); 

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getuserdata(log?.userid);
                setUserData(data);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }

        fetchData();
    }, [log?.userid]);
    return(
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full h-8" src={userData?.imageUrl}></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white"><span className="font-semibold">{userData?.firstName} {userData?.lastName}</span> updated the incident</p>
                    <p className="text-md font-normal text-neutral-400">{timesince(new Date(log._creationTime))} ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-300 font-semibold gap-4 flex">
                        Status <span className="text-black dark:text-white line-through">{firstlettercapital(log.previous)}</span> 
                        <svg className='w-4 dark:text-white text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg> 
                        <span className="text-white">{firstlettercapital(log.description)}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export function PriorityChanges({ log }: any): JSX.Element{
    const [userData, setUserData] = useState<any>(null); 
    const [error, setError] = useState<any>(null); 

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getuserdata(log?.userid);
                setUserData(data);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }

        fetchData();
    }, [log?.userid]);


    if (!userData) {
        return (
            <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <div className="animate-pulse flex flex-col bg-neutral-500/20 rounded-full w-8 h-8 items-center" />
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row  bg-neutral-500/20 w-1/3 h-4 rounded-lg animate-pulse items-center gap-3 ml-2">
                    <p className="text-md font-normal">
                    </p>
                    <p className="text-md font-normal bg-neutral-500/20 w-1/3 h-4 rounded-lg animate-pulse text-neutral-400"></p>
                </div>
            </div>
        </div>
        )
    }

    return(
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 h-8 rounded-full" src={userData.imageUrl}></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-norma dark:text-white text-black"><span className="font-semibold">{userData.firstName} {userData.lastName}</span> updated the incident</p>
                    <p className="text-md font-normal text-neutral-400"> {timesince(new Date(log._creationTime))} ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="dark:text-neutral-300  text-black font-semibold gap-4 flex">
                        Severity <span className="dark:text-white text-black line-through">{firstlettercapital(log.previous)}</span> 
                        <svg className='w-4 dark:text-white text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg> 
                        <span className="text-black dark:text-white">{firstlettercapital(log.description)}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export function LeadResponder({ log }: any): JSX.Element {
    const [userData, setUserData] = useState<any>(null); 
    const [error, setError] = useState<any>(null); 

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getuserdata(log?.description);
                setUserData(data);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }

        fetchData();
    }, [log?.description]); 

    if (error) {
        return <div>Error loading user data</div>;
    }

    if (!userData) {
        return (
            <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <div className="animate-pulse flex flex-col bg-neutral-500/20 rounded-full w-8 h-8 items-center" />
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row  bg-neutral-500/20 w-1/3 h-4 rounded-lg animate-pulse items-center gap-3 ml-2">
                    <p className="text-md font-normal">
                    </p>
                    <p className="text-md font-normal bg-neutral-500/20 w-1/3 h-4 rounded-lg animate-pulse text-neutral-400"></p>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 h-8 rounded-full" src={userData?.imageUrl} alt={`${userData?.firstName} ${userData?.lastName}`} />
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white">
                        <span className="font-semibold ">{userData?.firstName} {userData?.lastName}</span> has been appointed as the lead responder
                    </p>
                    <p className="text-md font-normal text-neutral-400">{timesince(new Date(log._creationTime))} ago</p>
                </div>
            </div>
        </div>
    );
}

export default LeadResponder;
