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
        <p className="hidden lg:block">P1-Critical</p>
        <p className="lg:hidden block">P1</p>
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
        <p className="hidden lg:block">P2-High</p>
        <p className="lg:hidden block">P2</p>
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
        <p className="hidden lg:block">P3-Medium</p>
        <p className="lg:hidden block">P3</p>
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
        <p className="hidden lg:block">P4-Low</p>
        <p className="lg:hidden block">P4</p>
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
        <p className="hidden lg:block">P5-Feature</p>
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
        <div className="flex h-[20px] items-center security justify-center p-3 rounded-xl live gap-2">
        <p className="hidden lg:block">PS-Security</p>
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
