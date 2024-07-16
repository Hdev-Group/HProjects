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
import { api } from '../../../convex/_generated/api';

function DropdownMenuMain({ id, pname, pinned }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const pinProjectMutation = useMutation(api.pinProject.pinProject);

    function deleteclick() {
        setShowDeleteModal(true);
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
            <DropdownMenuItem className="text-orange-300 cursor-pointer" id="pinproject" 
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
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute top-[-9rem] left-[13rem]">
                    <ToastDemo />
                    <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400 cursor-pointer" onClick={deleteclick} id={`delete${id}`}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {showDeleteModal && <DeleteProject id={id} pname={pname} onClose={closeDeleteModal} />}
        </>
    );
}

export default DropdownMenuMain;
