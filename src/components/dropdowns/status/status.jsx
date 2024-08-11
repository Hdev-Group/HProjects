export function BackLog(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/5.png" height={20} width={20} />Backlog
        </div>
        </div>
    )
}
export function Todo(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/!.png" height={20} width={20} />To-Do
        </div>
        </div>
    )
}
export function InProgress(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/7.png" height={20} width={20} />In Progress
        </div>
        </div>
    )
}
export function Done(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/8.png" height={20} width={20} />Done
        </div>
        </div>
    )
}
export function Archived(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center font-semibold p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <img src="/9.png" height={20} width={20} />Archived
        </div>
        </div>
    )
}
