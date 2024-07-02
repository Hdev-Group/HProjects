export default function Footer(){
    return(
        <>
            <div className="border border-transparent flex items-center justify-center border-t-neutral-700/60 w-full text-white text-center p-4">
                <div className="flex justify-between max-w-[95rem] w-full">
                    <div className="flex flex-col gap-2">
                        <img src="/logo.png" alt="HProjects" className="h-8 w-8" />
                        <p className="text-neutral-400 text-sm w-[70%] text-left">Seamlessly track, manage and maintain all of your projects in one place.</p>
                    </div>
                    <div>
                        <div>
                        <h1 className="text-xl font-bold">HProjects</h1>
                        <ul className="flex flex-col gap-2">
                            <li className="text-neutral-400 text-sm">Product</li>
                            <li className="text-neutral-400 text-sm">Docs</li>
                            <li className="text-neutral-400 text-sm">Changelog</li>
                        </ul>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Support</h1>
                            <ul className="flex flex-col gap-2">
                                <li className="text-neutral-400 text-sm">Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}