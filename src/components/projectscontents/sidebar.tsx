function SideBar() {
    return (
        <article className="w-[15%] min-w-[200px] max-h-screen overflow-y-auto border border-transparent border-b-neutral-600/40 border-r-neutral-600/40">
            <div className="p-5 pt-3">
                <h2 className="font-bold">Information</h2>
                <ul className="mt-4 space-y-2 pb-4">
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Dashboard</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Plan</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Tasks</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Roadmap</li>
                </ul>
                <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Manage</h2>
                <ul className="mt-4 space-y-2 pb-4">
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Feedback</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Changelog</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Finances</li>
                </ul>
                <h2 className="font-bold pt-3  border border-transparent border-t-neutral-300/30">Logs</h2>
                <ul className="mt-4 space-y-2 pb-4">
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Activity</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">History</li>
                </ul>
                <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Messaging</h2>
                <ul className="mt-4 space-y-2 pb-4">
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Chat</li>
                </ul>
                <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Settings</h2>
                <ul className="mt-4 space-y-2">
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Project settings</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Team settings</li>
                    <li className="text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md">Billing</li>
                </ul>
            </div>
        </article>
    );
}

export default SideBar;
