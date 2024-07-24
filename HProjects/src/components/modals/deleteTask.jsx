import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';

function DeleteTask({ taskname, _taskid, onClose }) {
    const deleteTaskMutation = useMutation(api.deleteTask.deleteTask);
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
            await deleteTaskMutation({ id: _taskid });
            onClose();
        } catch (error) {
            console.error(`Failed to delete task with ID ${_taskid}:`, error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" id='outerclickclose'>
            <div className="bg-[#09090B] border-neutral-900 border w-1/3 h-1/5 rounded-lg flex flex-col" id='innercloser'>
                <div className="p-4 flex justify-between flex-col h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold">Archive Task - {taskname}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to Archive this task? <br></br> Once you archive it your able to get it back. <b>We will log this in your changelog</b>.</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            className={`bg-red-600 text-white hover:bg-red-500 transition-all px-4 py-2 rounded-lg`}
                            onClick={handleDeleteTask}
                        >
                            Delete
                        </button>
                        <button className="bg-neutral-500 hover:bg-neutral-700 transition-all text-white px-4 py-2 rounded-lg" onClick={closeDeleteModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteTask;