import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../ui/tooltip"

export function PageeActive(){
    return(
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
        <div id="pageroncall" className="w-max flex items-center justify-center">
        <div className='border dark:border-green-400 border-green-600 bg-green-700/20 dark:bg-green-400/20 pr-5 items-center h-[2rem] w-full flex rounded-lg'>
          <div className='pl-2 flex justify-center items-center h-full'>
            <div className='w-1 h-[1rem] flex items-center justify-center rounded-lg dark:bg-green-400 bg-green-700'></div>
          </div>
          <div className='pl-3 h-max flex justify-center flex-col text-left'>
            <h1 className='font-semibold text-md text-left dark:text-white text-black'>Harry Campbell</h1>
          </div>
        </div>
      </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="bg-black text-white p-2 rounded-lg">NAME is on pager</div>
        </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}

export function PageeBreak(){
    return(
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
        <div id="pageroncall" className="w-max flex items-center justify-center">
        <div className='border dark:border-yellow-400 border-yellow-600 bg-yellow-700/20 dark:bg-yellow-400/20 pr-5 items-center h-[2rem] w-full flex rounded-lg'>
          <div className='pl-2 flex justify-center items-center h-full'>
            <div className='w-1 h-[1rem] flex items-center justify-center rounded-lg dark:bg-yellow-400 bg-yellow-700'></div>
          </div>
          <div className='pl-3 h-max flex justify-center flex-col text-left'>
            <h1 className='font-semibold text-md text-left dark:text-white text-black'>Harry Campbell</h1>
          </div>
        </div>
      </div>
        </TooltipTrigger>
        <TooltipContent>
        <div className="bg-black text-white p-2 rounded-lg">{} is on break</div>
        </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}

export function Pagermainon(pagername:string, timeonpager:string, totaltime:string, timeleft:string){
    return(
        <tr className='flex flex-row justify-between !border-green-400 bg-green-400/20 border p-1 rounded-md'>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{pagername}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>On Call</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{timeonpager}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{totaltime}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{timeleft}</td>
        </tr>
    )
}

export function Pagermainbreak(pagername:string, pagerstatus:string, timeonpager:string, totaltime:string, timeleft:string){
    return(
        <tr className='flex flex-row items-start justify-between !border-yellow-200 my-1 bg-yellow-400/20 border p-1 rounded-md'>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{pagername}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>Break</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{timeonpager}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{totaltime}</td>
        <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{timeleft}</td>
        </tr>
    )
}