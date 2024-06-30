import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteProject from '../modals/deleteproject';

function DropdownMenuMain({ id, pname }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function deleteclick() {
        console.log(id);
        setShowDeleteModal(true);
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
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
                    <DropdownMenuItem className="text-orange-300">Pin</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400" onClick={deleteclick} id={`delete${id}`}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {showDeleteModal && <DeleteProject id={id} pname={pname} onClose={closeDeleteModal} />}
        </>
    );
}

export default DropdownMenuMain;
