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
      <button onClick={handleClick}        className="dark:text-white text-black rounded-md p-2 border w-auto hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600 "
      >
        <span className='md:flex hidden'>Add Project</span>
        <span className='md:hidden font-semibold text-xl'>+</span>
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewProjectModal onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddProjectButton;
