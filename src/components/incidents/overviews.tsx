export function Overview({firstchild} : {firstchild?: boolean}) {
    return(
        <div className="w-full h-auto flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full" src="/staff/jamesblackhurst.jpeg"></img>
                {firstchild != true && <div className="border-l h-full" />}
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal"><span className="font-semibold">James Blackhurst</span> declared an incident</p>
                    <p className="text-md font-normal text-neutral-400"> 2 hours ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-300 font-semibold gap-4 flex">Status <span className="text-white">Investigation</span></p>
                    <p className="text-neutral-300 font-semibold gap-4 flex">Severity <span className="text-white">Minor</span></p>
                </div>
            </div>
        </div>
    )
}
export function StatusChanges(){
    return(
        <div className="w-full h-auto flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full" src="/staff/jamesblackhurst.jpeg"></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal"><span className="font-semibold">James Blackhurst</span> updated the incident</p>
                    <p className="text-md font-normal text-neutral-400"> 1 hour ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-300 font-semibold gap-4 flex">
                        Status <span className="text-white line-through">Investigation</span> 
                        <svg className='w-4 dark:text-white text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg> 
                        <span className="text-white">Fixing</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export function PriorityChanges(){
    return(
        <div className="w-full h-auto flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full" src="/staff/jamesblackhurst.jpeg"></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal"><span className="font-semibold">James Blackhurst</span> updated the incident</p>
                    <p className="text-md font-normal text-neutral-400"> 1 hour ago</p>
                </div>
                <div className="flex flex-col bg-neutral-900/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <p className="text-neutral-300 font-semibold gap-4 flex">
                        Severity <span className="text-white line-through">Minor</span> 
                        <svg className='w-4 dark:text-white text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg> 
                        <span className="text-white">Critical</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export function LeadResponder(){
    return(
        <div className="w-full h-auto flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full" src="/staff/jamesblackhurst.jpeg"></img>
                <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal"><span className="font-semibold">James Blackhurst</span> has been apointed as the lead responder</p>
                    <p className="text-md font-normal text-neutral-400"> 1 hour ago</p>
                </div>
            </div>
        </div>
    )
}