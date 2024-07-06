import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';

function DeleteTask({ taskname, _taskid, onClose }) {
    const deleteTaskMutation = useMutation(api.deleteTask.deleteTask);
    const [showDeleteModal, setShowDeleteModal] = useState(true);
    function closeDeleteModal() {
        setShowDeleteModal(false);
    }
    const handleDeleteTask = async () => {
        try {
            await deleteTaskMutation({ taskid: _taskid });
            onClose();
        } catch (error) {
            console.error(`Failed to delete task with ID ${_taskid}:`, error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#09090B] border-neutral-900 border w-1/3 h-1/5 rounded-lg flex flex-col">
                <div className="p-4 flex justify-between flex-col h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold">Delete Task - {taskname}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to delete this task? After deletion, it cannot be recovered.</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            className={`bg-red-600 text-white px-4 py-2 rounded-lg`}
                            onClick={handleDeleteTask}
                        >
                            Delete
                        </button>
                        <button className="bg-neutral-500 text-white px-4 py-2 rounded-lg" onClick={closeDeleteModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteTask;