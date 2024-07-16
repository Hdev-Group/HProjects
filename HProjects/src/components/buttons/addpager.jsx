import React, { useState } from 'react';
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

  return (
    <>
      <button onClick={handleClick} className="bg-primary-500 dark:text-white text-black rounded-md p-2 border w-60 hover:bg-neutral-300/20 hover:border-neutral-200 transition-all bg-neutral-500/20 dark:bg-neutral-400/10 border-neutral-800">
        Pager Edit
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewPagerModal id={id} onClose={handleClose} />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AddPagerButton;
