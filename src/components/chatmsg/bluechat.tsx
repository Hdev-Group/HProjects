import { useUser } from "@clerk/nextjs"

export default function BlueChat({ message }: { message: string}) {
    const { user } = useUser();
    return(
        <div className="flex w-full justify-end flex-row items-end gap-4 hover:bg-neutral-900 rounded-md px-1 py-2">
        <div className="flex flex-col gap-[4px] ">
          <p className="text-neutral-400 text-xs">{user?.firstName} {user?.lastName}</p>
          <div className="w-max px-5 py-2 relative mb-2.5 rounded-sm h-auto bg-blue-600 z-30">
          <div className="absolute bottom-0 mr-[-10px] right-0 w-0 h-0 border-l-[10px] border-l-blue-600 border-r-[10px] border-r-transparent border-b-[10px] border-b-blue-600 rounded-r-lg rotate-0 z-10"></div>
          <div className="flex flex-col">
          </div>
            <p className="text-white text-wrap text-sm">{message}</p>
          </div>
        </div>
        <img src={user?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
      </div>
    )
}