export default function QuickChat({userId, userfirst}: {userId: any, userfirst: any}) {
    return(
        <input type='text' placeholder={`Send a quick message to ${userfirst}`} className='w-full text-sm dark:bg-neutral-800 bg-white border border-neutral-300 dark:border-neutral-700 rounded-md p-1' />
    )
}