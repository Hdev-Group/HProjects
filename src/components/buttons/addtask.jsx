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
    // check url for query params
    const urlParams = new URLSearchParams(window.location.search);
    const addTask = urlParams.get('addTask');
    if (addTask) {
      handleClick();
    }
  }, []);

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
        className="dark:text-white text-black rounded-md p-2 px-4 border md:w-60 flex items-center justify-center hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600 "
      >
        <span className='md:flex hidden'>Add Task</span>
        <span className='md:hidden font-semibold text-xl'>+</span>
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewTaskModal id={id} onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddTaskButton;
