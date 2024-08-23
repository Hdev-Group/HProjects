import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function DropdownCommentMenu(commentid: any) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="gap-1 flex flex-col cursor-pointer hover:bg-neutral-600/20 rounded-lg">
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                        <div className="h-[3px] w-[3px] rounded-full bg-white" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuItem className='cursor-pointer' ref={commentid}>Reply</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' ref={commentid}>Reaction</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer' ref={commentid}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' ref={commentid}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default DropdownCommentMenu;
