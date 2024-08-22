import Link from 'next/link'

export default function HeaderLinker({_id, currentpage}: { _id: any, currentpage: string }) {
    return(
        <>
        <div className='w-16 items-center justify-center flex flex-row relative'>
            <Link href={`/projects/${encodeURI(_id)}/project-settings/`} className={`${currentpage === "project" ? "text-white" : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"} w-full transition-all items-center justify-center flex`}>
                <p>Project</p>
                { currentpage === "project" && <div className='bg-white w-full h-0.5 bottom-[-9px] absolute'></div> }
                </Link>
            </div>
            <div className='w-16 items-center justify-center flex relative transition-all'>
            <Link href={`/projects/${encodeURI(_id)}/project-settings/team`} className={`${currentpage === "team" ? "text-white" : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"} transition-all w-full items-center justify-center flex`}>
            <p>Team</p>
                { currentpage === "team" && <div className='bg-white w-full h-0.5 bottom-[-9px] absolute'></div> }
                </Link>
            </div>
            <div className='w-16 items-center justify-center flex relative'>
            <Link href={`/projects/${encodeURI(_id)}/project-settings/personal`} className={`${currentpage === "personal" ? "text-white" : "text-neutral-500 rounded-md hover:bg-neutral-600/20 p-1"} w-full transition-all items-center justify-center flex`}>
                <p>Personal</p>
                { currentpage === "personal" && <div className='bg-white w-full h-0.5 bottom-[-9px] absolute'></div> }
                </Link>
            </div>
            <div className='w-25 items-center justify-center flex relative'>
            <Link href={`/projects/${encodeURI(_id)}/project-settings/danger`} className={`${currentpage === "danger" ? "text-red-300" : "text-neutral-500 rounded-md hover:bg-red-600/20 p-1"} w-full transition-all items-center justify-center flex`}>
                <p>Danger Zone</p>
                { currentpage === "danger" && <div className='bg-red-600 w-full h-0.5 bottom-[-9px] absolute'></div> }
            </Link>
        </div>
        </>
    )
}