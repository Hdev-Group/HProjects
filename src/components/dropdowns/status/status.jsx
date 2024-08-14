export function BackLog(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center font-semibold  p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <div className="lg:flex gap-1 hidden py-2 text-black dark:text-white">
                <img src="/5.png" height={20} width={25} />Backlog
            </div>
            <div className="lg:hidden visible">
                <img src="/5.png" height={20} width={20} />
            </div>
        </div>
        </div>
    )
}
export function Todo(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <div className="lg:flex gap-1 hidden text-black dark:text-white py-2">
                <img src="/!.png" height={20} width={25} />To-Do
            </div>
            <div className="lg:hidden visible">
                <img src="/!.png" height={20} width={20} />
            </div>
        </div>
        </div>
    )
}
export function InProgress(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <div className="lg:flex gap-1 hidden py-2 text-black dark:text-white">
            <img src="/7.png" height={10} width={25} />In Progress
        </div>
        <div className="lg:hidden visible">
            <img src="/7.png" height={20} width={20} />
        </div>
        </div>
        </div>
    )
}
export function Done(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <div className="lg:flex gap-1 hidden py-2 text-black dark:text-white">
                <img src="/8.png" height={20} width={25} />Done
            </div>
            <div className="lg:hidden visible">
                <img src="/8.png" height={20} width={20} />
            </div>
        </div>
        </div>
    )
}
export function Archived(){
    return(
        <div className="flex items-center gap-4 text-black dark:text-white">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/9.png" height={20} width={20} />Archived
        </div>
        </div>
    )
}
