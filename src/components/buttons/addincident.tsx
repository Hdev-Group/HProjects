import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NewIncidentModal from '../modals/incident';

export default function AddIncident(id: any) {
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
        <button
        onClick={handleClick}
        className="dark:text-white text-black rounded-md p-2 px-4 border w-auto hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600 "
      >
        <span className='md:flex hidden'>Declare Incident</span>
        <span className='md:hidden font-semibold text-xl'>+</span>
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <NewIncidentModal id={id} onClose={handleClose} />,
        document.getElementById('modal-root') as Element
      )}
    </>
    )
}