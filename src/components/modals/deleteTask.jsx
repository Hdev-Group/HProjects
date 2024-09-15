import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';

function ArchiveTask({ taskname, _taskid, onClose, projectid }) {
    const archiveTaskMutation = useMutation(api.archiveTask.Task);
    const logtask = useMutation(api.updater.logger);
    const [isloading, setIsLoading] = useState(false);
    const { userId } = useAuth();

    const [showDeleteModal, setShowDeleteModal] = useState(true);
    function closeDeleteModal() {
        setShowDeleteModal(false);
        onClose();
    }
    useEffect(() => {
        const outerclickclose = document.getElementById('outerclickclose');
        const innercloser = document.getElementById('innercloser');
        const handleClickOutside = (e) => {
          if (e.target.id === 'outerclickclose') {
            innercloser.classList.add('slide-out-right');
            setTimeout(() => {
              onClose();
            }, 500);
          }
        };
    
        if (outerclickclose) {
          outerclickclose.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          if (outerclickclose) {
            outerclickclose.removeEventListener('click', handleClickOutside);
          }
        };
      }, [onClose]);
    const handleDeleteTask = async () => {
        try {
            setIsLoading(true);
            await archiveTaskMutation({ _id: _taskid, archived: true, projectid: projectid });
            // log archive task
            await logtask({ taskId: _taskid, archived: true, usercommited: userId, ProjectId: projectid, timestamp: new Date().toISOString() });
            onClose();
            setIsLoading(false);
        } catch (error) {
            console.error(`Failed to delete task with ID ${_taskid}:`, error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" id='outerclickclose'>
            <div className="bg-[#09090B] border-neutral-900 border md:w-1/3 h-auto rounded-lg flex flex-col" id='innercloser'>
                <div className="p-4 flex justify-between flex-col h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold">Archive Task - {taskname}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to Archive this task? <br></br> Once you archive it your able to get it back. <b>We will log this in your changelog</b>.</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            className={`bg-yellow-600/20 text-white hover:bg-yellow-600 transition-all px-4 py-2 rounded-lg`}
                            onClick={handleDeleteTask}
                        >
                            {isloading ? 'Archiving...' : 'Archive Task'}
                        </button>
                        <button className="bg-neutral-900/20 hover:bg-neutral-900 transition-all text-white px-4 py-2 rounded-lg" onClick={closeDeleteModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchiveTask;
