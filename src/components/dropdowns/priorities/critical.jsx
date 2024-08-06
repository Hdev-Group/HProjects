import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../ui/tooltip"

export function Critical(){
    return(
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex cursor-pointer items-center gap-4 justify-start">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-xl critical live gap-2">
        P1-Critical
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>P-1 Critical High Priority</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export function High(){
    return(
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex items-center gap-4 justify-between">
        <div className="flex h-[20px] items-center justify-center p-3 high rounded-xl live gap-2">
        P2-High
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>P-2 High Priority</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export function Medium(){
    return(
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center medium justify-center p-3 rounded-xl developing gap-2">
        P3-Medium
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>P-3 Medium Priority</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export function Low(){
    return(
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center low p-3 rounded-xl planning gap-2">
        P4-Low
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>P-4 Low Priority</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export function Feature(){
    return(
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] feature items-center justify-center p-3 rounded-xl feture gap-2">
        P5-Feature
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>P-5 Feature addition</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
export function Security(){
    return(
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center security justify-center p-3 rounded-xl live gap-2">
        PS-Security
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Security Priority</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
        )
}
