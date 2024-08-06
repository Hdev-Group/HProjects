import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';

function DeleteProject({ id, onClose, pname }) {
    const [inputValue, setInputValue] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const deleteProjectMutation = useMutation(api.deleteProject.deleteProject);

    useEffect(() => {
        const deleteidkeyframe = document.getElementById('deleteidkeyframe');

        const handleInput = () => {
            if (deleteidkeyframe.value === pname) {
                deleteidkeyframe.classList.add('border-green-500');
                deleteidkeyframe.classList.remove('border-red-500');
                setIsButtonDisabled(false);
            } else {
                deleteidkeyframe.classList.add('border-red-500');
                deleteidkeyframe.classList.remove('border-green-500');
                setIsButtonDisabled(true);
            }
        };

        deleteidkeyframe.addEventListener('input', handleInput);

        return () => {
            deleteidkeyframe.removeEventListener('input', handleInput);
        };
    }, [pname]);

    const handleDeleteProject = async () => {
        try {
            await deleteProjectMutation({ id });
            onClose();
        } catch (error) {
            console.error(`Failed to delete project with ID ${id}:`, error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#09090B] border-neutral-900 border w-1/3 h-1/4 rounded-lg flex flex-col">
                <div className="p-4 flex justify-between flex-col h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold">Delete Project - {pname}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Please type <b>{pname}</b> to delete this project. After deletion, it cannot be recovered.</p>
                        <input
                            type="text"
                            id="deleteidkeyframe"
                            className="bg-neutral-800/50 border text-white px-4 py-2 rounded-lg"
                            placeholder="Type project name"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            className={`bg-red-600 text-white px-4 py-2 rounded-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleDeleteProject}
                            disabled={isButtonDisabled}
                        >
                            Delete
                        </button>
                        <button className="bg-neutral-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProject;