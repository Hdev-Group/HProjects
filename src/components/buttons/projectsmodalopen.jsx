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
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <button onClick={handleClick}         className=" dark:text-white text-black rounded-t-md p-2 border w-60 hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600 "
      >
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
