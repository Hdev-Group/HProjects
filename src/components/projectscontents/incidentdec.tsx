import Link from 'next/link';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuTrigger,
    ContextMenuSubTrigger,
    ContextMenuSubContent
  } from "../ui/context-menu"

export function IncidentDeclaration({_id, activeSection}: { _id: string, activeSection: string }) {
    const getItemClass = (section: string) =>
        `text-sm text-black dark:text-neutral-100 transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-500/20 text-black dark:text-white" : ""}`;
  return (
    <ContextMenu>
        <ContextMenuTrigger>
        <li key="incident" className={getItemClass("incident")}>
        <Link href={`/projects/${encodeURIComponent(_id)}/incident`}>
            Incidents
        </Link>
        </li>
        </ContextMenuTrigger>
        <ContextMenuContent>
        <ContextMenuItem>
            <Link href={`/projects/${encodeURIComponent(_id)}/incident`}>
            All Incidents (0)
            </Link>
        </ContextMenuItem>
        <ContextMenuItem className='bg-red-900/20 text-red-400 hover:bg-red-900/80'>
            <Link href={`/projects/${encodeURIComponent(_id)}/incident/create`}>
            Declare Incident
            </Link>
        </ContextMenuItem>
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                Current Incidents
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
                <ContextMenuItem>
                <Link href={`/projects/${encodeURIComponent(_id)}/incident/1`}>
                    Incident 1
                </Link>
                </ContextMenuItem>
                <ContextMenuItem>
                <Link href={`/projects/${encodeURIComponent(_id)}/incident/2`}>
                    Incident 2
                </Link>
                </ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        </ContextMenuContent>

    </ContextMenu>
  );
}