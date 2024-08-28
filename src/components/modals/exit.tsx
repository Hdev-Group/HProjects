import React from 'react';

interface ExitModalProps {
    onClose: () => void;
    mainholdRemove: () => void;
}

export default function ExitModal({ onClose, mainholdRemove }: ExitModalProps) {
    return (
        <div className="inset-1 w-full h-full rounded-md bg-black bg-opacity-50 z-40 flex justify-center absolute top-0 left-0" id="mainhold">
            <div className="bg-white dark:bg-neutral-800 rounded-md absolute pb-4 h-auto w-[100%]">
                <div className="flex items-center flex-row px-5 pt-4 justify-between border-b-neutral-600 border border-t-transparent border-x-transparent w-full h-auto py-3">
                    <h1 className="text-xl font-semibold text-black dark:text-white">Close modal</h1>
                </div>
                <div className="flex mt-3 flex-col w-full px-4">
                    <p className="text-md text-neutral-300">Are you sure you want to close this modal? You will lose any unsaved changes.</p>
                    <div className="flex justify-end items-center">
                        <button className="border dark:border-neutral-600 font-semibold text-white dark:text-white px-4 py-2 rounded-md mr-2" onClick={mainholdRemove}>Cancel</button>
                        <button className="bg-black dark:bg-black font-semibold text-white dark:text-white px-4 py-2 rounded-md hover:bg-neutral-900 transition-all" onClick={onClose}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
