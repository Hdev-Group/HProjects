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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm bg-red-700 border-red-700 border gap-2">
        <p className="hidden lg:flex flex-row items-center justify-center font-semibold"><img src="/4.svg" />Critical</p>
        <p className="lg:hidden block"><img src="/4.svg" /></p>
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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <p className="hidden lg:flex flex-row items-center justify-center gap-2 font-semibold"><img src="/3.svg" />High</p>
        <p className="lg:hidden block"><img src="/3.svg" /></p>
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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <p className="hidden lg:flex flex-row items-center justify-center gap-2 font-semibold"><img src="/2.svg" />Major</p>
        <p className="lg:hidden block"><img src="/2.svg" /></p>
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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <p className="hidden lg:flex gap-2 flex-row font-semibold items-center justify-center"><img src="/1.svg" />Minor</p>
        <p className="lg:hidden block"><img src="/1.svg" /></p>
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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border feature feature-light gap-2">
        <p className="hidden lg:block">Feature</p>
        <p className="lg:hidden block">P5</p>
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
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border security security-light gap-2">
        <p className="hidden lg:block">Security</p>
        <p className="lg:hidden block">PS</p>
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
export function Paused(){
    return(
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <div className="flex items-center gap-4">
        <div className="flex h-[20px] items-center justify-center p-3 rounded-sm border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-400/20 gap-2">
        <p className="hidden lg:flex gap-2 flex-row font-semibold items-center justify-center"><img src="/1.svg" />Paused</p>
        <p className="lg:hidden block"><img src="/1.svg" /></p>
        </div>
        </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Paused</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}