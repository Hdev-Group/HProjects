import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NewProjectModal from '../modals/newproject';

const AddProjectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleClick} className="dark:border-neutral-800 border-neutral-200 border-b-transparent  rounded-tl-[0] bg-neutral-300 dark:bg-neutral-900 hover:bg-blue-700 w-[200px] transition-all rounded-b-none border border-b-0 text-black dark:text-white font-bold py-2 px-4 rounded">
        Add Project
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewProjectModal onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddProjectButton;
