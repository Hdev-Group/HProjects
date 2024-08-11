export default function DarkChat({assigneeData, message}: {assigneeData: any, message: string}) {
    return(
        <div className="flex w-full justify-start flex-row items-end gap-4 rounded-md px-1 py-2 hover:bg-neutral-900">
            <div className="justify-between w-full flex flex-row">
            <div className="flex flex-row gap-4 justify-end items-end">
            <img src={assigneeData?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-[4px]">
                <p className="text-neutral-400 text-xs">{assigneeData?.firstName} {assigneeData?.lastName}</p>
                <div className="w-max px-5 py-2 relative mb-2.5 rounded-sm h-auto bg-neutral-800 z-30">
                <div className="absolute bottom-0 ml-[-10px] left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-neutral-800 border-b-[10px] border-b-neutral-800 rounded-l-lg rotate-0 z-10"></div>
                <div className="flex flex-col">
                </div>
                <p className="text-white text-wrap text-sm">{message}</p>
                </div>
            </div>
            </div>
            </div>
            </div>
    )
}