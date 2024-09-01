import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LeadResponderchange from '../incidents/leadresponderadd';

export default function AddLeadResponder({id, projectid}: any) {
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
        className="dark:text-white text-black rounded-md py-0.5 px-3 border w-auto hover:bg-neutral-700/20 hover:border-neutral-400/20 transition-all bg-neutral-500/20 dark:bg-neutral-600/20"
      >
        Add Lead Reponder
      </button>
      {isModalOpen && ReactDOM.createPortal(
        <LeadResponderchange id={id} projectid={projectid} onClose={handleClose} />,
        document.getElementById('modal-root') as Element
      )}
    </>
    )
}