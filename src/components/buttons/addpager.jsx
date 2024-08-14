import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NewPagerModal from '../modals/newpagermodal';

const AddPagerButton = (id) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('startpager')) {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <>
      <button onClick={handleClick} className="bg-primary-500 dark:text-white text-black rounded-md p-2 w-60 hover:bg-neutral-600/20 hover:border-neutral-200 hover:dark:shadow-neutral-800 transition-all bg-neutral-200 shadow-gray-300 dark:shadow-neutral-900 shadow-lg dark:bg-neutral-400/10">
        Add a responder
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewPagerModal id={id} onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddPagerButton;
