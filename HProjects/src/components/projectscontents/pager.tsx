export default function PagerEl(){
    return(
        <div id="pageroncall" className="w-max flex items-center justify-center">
        <div className='border dark:border-green-400 border-green-600 bg-green-700/20 dark:bg-green-400/20 pr-5 items-center h-[4rem] w-full flex rounded-lg'>
          <div className='pl-2 flex justify-center items-center h-full'>
            <div className='w-1.5 h-[3rem] flex items-center justify-center rounded-lg dark:bg-green-400 bg-green-700'></div>
          </div>
          <div className='pl-3 h-max flex justify-center flex-col text-left'>
            <h1 className='font-semibold text-md text-left dark:text-white text-black'>You're on pager</h1>
            <p className='dark:text-neutral-300 text-neutral-700 text-xs'>For the next 24 hours</p>
          </div>
        </div>
      </div>
    )
}