
export default function SideBarChat({user}: any) {
    return (
        <div className="min-w-[300px] border bg-bglight dark:bg-bgdark border-l-transparent rounded-3xl border-neutral-600/40">
        <div className="flex items-center justify-start pl-4 border  border-transparent border-b-neutral-600/40 py-4">
            <h1 className="font-semibold text-xl">Direct Messages</h1>
        </div>
        <div className="flex flex-col gap-2 mt-3">
        <div className="flex flex-row items-center gap-4 cursor-pointer transition-all hover:bg-neutral-700/30 w-full h-16 pl-4">
              <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <p className="text-md font-semibold m">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-neutral-500 ">Project Lead Developer</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 cursor-pointer transition-all hover:bg-neutral-700/30 w-full h-16 pl-4">
              <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <p className="text-md font-semibold m">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-neutral-500 ">Project Lead Developer</p>
              </div>
            </div>
        </div>
    </div>
    )
}