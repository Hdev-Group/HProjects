import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';

function WaitingLoader({ projectid }) {
  const randomemessageswhenloading = ["I wonder when I will be used", "Scanning for feedback", "I cant wait!", "I've trained for years for this", "I'm ready when you are", "Scanning for feedback."]
  const successMessage = "Setup! We received your feedback test. You're ready to start getting feedback."
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(!isLoading);
  const [currentMessage, setCurrentMessage] = useState(randomemessageswhenloading[0]);
  const checkfeedback = useQuery(api.feedback.get, { projectid: projectid.id});
  const filteredfeedback = checkfeedback.filter((feedback) => feedback.projectId === projectid.id);

  useEffect(() => {
    if (filteredfeedback && filteredfeedback.length > 0) {
      setIsLoading(false); // Set state correctly
    }
  }, [filteredfeedback, setIsLoading]);
  


  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSuccess(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      const messageInterval = setInterval(() => {
        setCurrentMessage(randomemessageswhenloading[Math.floor(Math.random() * randomemessageswhenloading.length)]);
      }, 5000);
      return () => clearInterval(messageInterval);
    }
  }, [isLoading, randomemessageswhenloading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center w-auto max-w-sm px-4 py-2 mt-4 rounded-lg bg-primary text-primary-foreground"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="ml-2 text-sm font-medium">{currentMessage}</span>
        </motion.div>
      ) : showSuccess ? (
        <motion.div
          key="success" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center w-auto max-w-sm px-4 py-2 mt-4 rounded-lg bg-green-500/20 text-green-700 dark:bg-green-500/40 dark:text-green-300"
        >
          <div className="p-1 bg-green-100 rounded-full dark:bg-green-800/30">
            <Check className="w-4 h-4" />
          </div>
          <span className="ml-2 text-sm font-medium">{successMessage}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const AddAPI = (id) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  function CurlCommand(id) {
    // Assuming id.id.id.projectid is a valid way to extract projectId
    const idd = id.id.id;
  
    // Construct the curl command with proper string interpolation
    const codeString = `curl -X POST https://hprojects.hdev.uk/api/feedback -H "Content-Type: application/json" -d "{\\"projectId\\": \\"${idd}\\", \\"feedback\\": \\"You should add a pinned message\\", \\"title\\": \\"Pinned Message Feature\\", \\"name\\": \\"James Blackhurst\\", \\"email\\": \\"test@example.com\\", \\"label\\": \\"featureRequest\\"}"`;
  
    // Copy to clipboard function
    const CopytoClipboard = () => {
      const innerArea = document.getElementById('buttonclickercopycurl');
      innerArea.innerText = 'Copied!';
      setTimeout(() => {
        innerArea.innerHTML = `
          <svg class='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
          </svg>
        `;
      }, 1000);
    
      const curlCommand = `curl -X POST https://hprojects.hdev.uk/api/feedback -H "Content-Type: application/json" -d "{\\"projectId\\": \\"${idd}\\", \\"feedback\\": \\"You should add a pinned message\\", \\"title\\": \\"Pinned Message Feature\\", \\"name\\": \\"James Blackhurst\\", \\"email\\": \\"test@example.com\\", \\"label\\": \\"featureRequest\\"}"`;
    
      // Write the properly escaped curl command to the clipboard
      navigator.clipboard.writeText(curlCommand);
    };
    

  
  
    return (
      <div className='border border-neutral-400 dark:border-neutral-700 rounded-xl mt-2'>
        <div className='p-2 flex items-center w-full justify-between border-b'>
          <h1 className='text-white font-semibold text-lg pl-5'>Curl the API:</h1>
          <button
            id='buttonclickercopycurl'
            onClick={CopytoClipboard}
            className='bg-neutral-400/20 dark:bg-neutral-700/40 text-white p-2 rounded-md hover:bg-neutral-500 dark:hover:bg-neutral-600 transition-all'
          >
            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
            </svg>
          </button>
        </div>
        <div className='p-2'>
          <SyntaxHighlighter language="bash" className="flex flex-wrap text-wrap" style={materialDark}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
  

  function CodeAPI(id){
    const idd = id.id.id;
    const codeString = `await fetch("https://hprojects.hdev.uk/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: "${idd}", // required
      feedback: "You should add a pinned message", // required
      title: "Pinned Message", // optional - if you want to ask users for a short title,
      name: "James Blackhurst", // optional - if you want to ask users for their name,
      email: "test@example.com", // optional - if you want to ask users for their email,
      label: "featureRequest" // optional - "idea" | "issue" | "question" | "complaint" | "featureRequest" | "other" - default is "featureRequest"
    }),
  });`;

    const CopytoClipboard = () => {
      const innerArea = document.getElementById('buttonclickercopy');
      innerArea.innerText = 'Copied!';
      setTimeout(() => {
        innerArea.innerHTML = `
          <svg class='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
          </svg>
        `;
      }, 1000);
      navigator.clipboard.writeText(`
  // Extra information: /feedback has a ratelimit of 5 requests per second
  await fetch("https://hprojects.hdev.uk/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: "${idd}", // required
      feedback: "You should add a pinned message", // required
      title: "Pinned Message", // optional - if you want to ask users for a short title,
      name: "James Blackhurst", // optional - if you want to ask users for their name,
      email: "test@example.com", // optional - if you want to ask users for their email,
      label: "featureRequest" // optional - "idea" | "issue" | "question" | "complaint" | "featureRequest" | "other" - default is "featureRequest"
    }),
  });`);
    }
    return (
      <div className='border border-neutral-400 dark:border-neutral-700 rounded-xl mt-2'>
        <div className='p-2 flex items-end w-full justify-end border-b'>
          <button id='buttonclickercopy' onClick={CopytoClipboard} className='bg-neutral-400/20 dark:bg-neutral-700/40 text-white p-2 rounded-md hover:bg-neutral-500 dark:hover:bg-neutral-600 transition-all'>
            <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
            </svg>
          </button>
        </div>
        <div className='p-2'>
          <SyntaxHighlighter language="typescript" className="flex flex-wrap text-wrap" style={materialDark}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }


  return (
    <>
    <Sheet style={{ minWidth: '6000px' }}>
      <SheetTrigger>
      <button onClick={handleClick}
        className="dark:text-white text-black rounded-md p-1.5 px-3.5 border w-auto flex items-center justify-center hover:bg-blue-700 hover:border-neutral-400 transition-all bg-blue-500 dark:bg-blue-600 "
        >
          <span className='md:flex hidden'>Setup Guide</span>
        </button>
      </SheetTrigger>
      <SheetContent className='!w-1/2'>
        <SheetHeader>
          <SheetTitle>Feedback API</SheetTitle>
          <SheetDescription >
            Add a feedback API to your project
            <CodeAPI id={id} />
            <CurlCommand id={id} />
            <WaitingLoader projectid={id} />
            
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </>
  );
};

export default AddAPI;
