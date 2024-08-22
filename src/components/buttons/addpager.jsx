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
      <button onClick={handleClick}
              className=" dark:text-white text-black rounded-md p-2 border w-60 hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600">
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
