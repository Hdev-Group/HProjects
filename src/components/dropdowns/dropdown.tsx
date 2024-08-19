import React, { useState } from 'react';
import { useToast } from "../ui/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteProject from '../modals/deleteproject';
import { useMutation } from 'convex/react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function DropdownMenuMain({ id, pname, pinned }: { id: any, pname: string, pinned: boolean }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userId } = useAuth();
    const pinProjectMutation = useMutation(api.pinProject.pinProject);
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find((project: any) => project._id === id);

    function deleteclick() {
        setShowDeleteModal(true);
    }
    function leaveclick(){

    }
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }

    const handlePinProject = async () => {
        try {
            const updatedProject = await pinProjectMutation({ id, pinned: !pinned });
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    
        const ToastDemo = () => {
            const { toast } = useToast()
        
            return (
            <DropdownMenuItem className="dark:text-orange-300 text-orange-600 cursor-pointer" id="pinproject" 
                onClick={() => {
                handlePinProject();
                toast({
                    description: pinned ? 'Unpinned Project' : 'Pinned Project',
                });
                }}
            >
                {pinned ? 'Unpin Project' : 'Pin Project'}
            </DropdownMenuItem>
            )
        }
      
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="gap-1 flex flex-col cursor-pointer absolute top-4 right-2 px-4 py-2 hover:bg-neutral-600/20 rounded-lg">
                        <div className="h-[3px] w-[3px] rounded-full bg-black dark:bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-black dark:bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-black dark:bg-white" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute top-[-9rem] left-[13rem]">
                    <ToastDemo />
                    <DropdownMenuItem className='cursor-pointer'>
                        <a className='w-full' href={`/projects/${id}/project-settings`}>Settings</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {
                        project?.userId === userId && (
                            <>
                                <DropdownMenuItem className="dark:text-red-300 text-red-600 cursor-pointer" id="deleteproject" onClick={deleteclick}>
                                    Delete Project
                                </DropdownMenuItem>
                            </>
                        )} { 
                            project?.otherusers.includes(userId) && (
                            <>
                                <DropdownMenuItem className="dark:text-red-300 text-red-600 cursor-pointer" id="leaveproject" onClick={leaveclick}>
                                    Leave Project
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {showDeleteModal && <DeleteProject id={id} pname={pname} onClose={closeDeleteModal} />}
        </>
    );
}

export default DropdownMenuMain;
