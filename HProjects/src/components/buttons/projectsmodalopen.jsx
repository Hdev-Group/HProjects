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
      <button onClick={handleClick} className="bg-neutral-900/60 hover:bg-blue-700 w-[200px] transition-all rounded-b-none border border-neutral-800 border-b-0 text-white font-bold py-2 px-4 rounded">
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
