"use client"

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NewProjectModal from '../modals/newproject';

const ModalContainer = ({ children }) => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) throw new Error('Modal root element not found');
  
    // Use state to track the first child appended status
    const [hasAppendedFirstChild, setHasAppendedFirstChild] = useState(false);
  
    useEffect(() => {
      // Append the first child only once
      if (!hasAppendedFirstChild && modalRoot.firstChild) {
        modalRoot.appendChild(modalRoot.firstChild);
        setHasAppendedFirstChild(true);
      }
    }, [modalRoot, hasAppendedFirstChild]);
  
    return ReactDOM.createPortal(children, modalRoot);
  };
  const NoProjects = () => {
    const [showModal, setShowModal] = useState(false);
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const deployModal = () => {
      setShowModal(true);
    };
  
    return (
      <div className="flex flex-col justify-center min-w-[100%] gap-2 items-center">
        <h1 className="font-bold text-xl">No projects here 📋</h1>
        <p>Create a project!</p>
        <button onClick={deployModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create a Project
        </button>
  
        {showModal && (
          <ModalContainer>
            <NewProjectModal onClose={closeModal} />
          </ModalContainer>
        )}
      </div>
    );
  };
  
  export default NoProjects;