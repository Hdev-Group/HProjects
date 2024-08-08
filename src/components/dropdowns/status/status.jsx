export function BackLog(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-xl backlog backlog-light gap-2">
        Backlog
        </div>
        </div>
    )
}
export function Todo(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-xl todo todo-light live gap-2">
        To-Do
        </div>
        </div>
    )
}
export function InProgress(){
    return(
        <div className="flex items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-xl inprogress inprogress-light live gap-2">
        In Progress
        </div>
        </div>
    )
}
export function Done(){
    return(
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center low-light justify-center p-3 rounded-xl developing developing-light gap-2">
        Done
        </div>
        </div>
    )
}
