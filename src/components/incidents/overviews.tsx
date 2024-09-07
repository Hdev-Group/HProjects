import React, { useState, useEffect } from 'react';

export function timesince(date: Date) {
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
        timeinwords = years + ' years';
        if (years > 1) {
            timeinwords += 's';
        }
    } else if (months > 0) {
        timeinwords = months + ' months';
        if (months > 1) {
            timeinwords += 's';
        }
    } else if (weeks > 0) {
        timeinwords = weeks + ' weeks';
        if (weeks > 1) {
            timeinwords += 's';
        }
    } else if (days > 0) {
        timeinwords = days + ' days';
        if (days > 1) {
            timeinwords += 's';
        }
    } else if (hours > 0) {
        timeinwords = hours + ' hour';
        if (hours > 1) {
            timeinwords += 's';
        }
    } else if (minutes > 0) {
        timeinwords = minutes + ' minute';
        if (minutes > 1) {
            timeinwords += 's';
        }
    } else {
        timeinwords = seconds + ' second';
        if (seconds > 1) {
            timeinwords += 's';
        }
    }

    return timeinwords;
}

const usersMap = new Map();

async function getuserdata(userid: string) {
    if (usersMap.has(userid)) {
        return usersMap.get(userid);
    }
    const fetchPromise = fetch(`/api/get-user?userId=${userid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            usersMap.set(userid, data); 
            return data;
        })
        .catch(error => {
            usersMap.delete(userid);
            throw error; 
        });

    usersMap.set(userid, fetchPromise); // Temporarily store the promise in the map

    return fetchPromise;
}

function firstlettercapital(string: string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}


export function IncidentUpdate({ log }: any): JSX.Element {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [remainingTime, setRemainingTime] = useState<string>('');

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

    useEffect(() => {
        function calculateRemainingTime() {
            const now = new Date();
            const creationTime = new Date(log._creationTime);
            const nextUpdateTime = new Date(creationTime.getTime() + log.nextupdate * 60 * 1000); // Assuming `log.nextupdate` is in minutes
            const difference = nextUpdateTime.getTime() - now.getTime();

            if (difference <= 0) {
                setRemainingTime('now');
                return;
            }

            const minutes = Math.floor(difference / (1000 * 60));
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));

            if (minutes < 60) {
                setRemainingTime(`in ${minutes} minutes`);
            } else if (hours < 48) {
                setRemainingTime(`in ${hours} hours`);
            } else {
                setRemainingTime(`in ${days} days`);
            }
        }

        // Calculate the remaining time initially and set an interval to update it
        calculateRemainingTime();
        const interval = setInterval(calculateRemainingTime, 60000); // Update every minute

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [log._creationTime, log.nextupdate]);

    return (
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full h-8" src={userData?.imageUrl} alt={`${userData?.firstName}'s avatar`} />
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white">
                        <span className="font-semibold">{userData?.firstName} {userData?.lastName}</span> provided an update
                    </p>
                    <p className="text-md font-normal text-neutral-400">{timesince(new Date(log._creationTime))} ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 ml-2">
                    <p className="text-white border-b pb-2 px-4 font-semibold gap-4 flex">
                        {log.description}
                    </p>
                    <p className="text-neutral-300 text-sm pb-2 px-4 font-semibold gap-4 flex">
                        Next update expected {remainingTime}
                    </p>
                </div>
            </div>
        </div>
    );
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
                <img className="w-8 h-8 rounded-full" src={reportera?.imageUrl} alt={`${reportera?.firstName} ${reportera?.lastName}`} />
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
export function PagedResponders({ log }: any): JSX.Element{
    const [userData, setUserData] = useState<any>(null); 
    const [pagedUserData, setPagedUserData] = useState<any>(log.description);
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

    useEffect(() => {
        async function fetchPagedData() {
            try {
                const data = await getuserdata(log?.description);
                setPagedUserData(data);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }

        fetchPagedData();
    }, [log?.description]);


    return(
        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full h-8" src={userData?.imageUrl}></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white"><span className="font-semibold">{userData?.firstName} {userData?.lastName}</span> has sent a pager to</p>
                    <p className="text-md font-normal text-neutral-400">{timesince(new Date(log._creationTime))} ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-300 font-semibold items-center gap-3 flex">
                        <img className="w-8 h-8 rounded-full" src={pagedUserData?.imageUrl}></img>
                        <span className="text-black dark:text-white">{pagedUserData?.firstName} {pagedUserData?.lastName}</span>
                    </p>
                </div>
            </div>
        </div>
    )
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
