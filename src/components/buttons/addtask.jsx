import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NewTaskModal from '../modals/taskadd';

const AddTaskButton = (id) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'n') {
        handleClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-primary-500 dark:text-white text-black rounded-md p-2 border w-60 hover:bg-neutral-300/20 hover:border-neutral-200 transition-all bg-neutral-500/20 dark:bg-neutral-400/10 border-neutral-800"
      >
        Add Task
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewTaskModal id={id} onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddTaskButton;
