"use client";

import React, { useState } from 'react';
import NavigationMenuMain from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

const FAQs = [
    {
        question: "What is the purpose of this project planning tool?",
        answer: "HProjects helps teams manage their projects effectively by providing features for task assignment, progress tracking, Incident managment, feedback collection and collaboration."
    },
    {
        question: "How do I report an incident?",
        answer: "To report an incident, navigate to the 'Incidents' section in the menu, fill out the incident report form, and submit it. Our team will review it promptly."
    },
    {
        question: "Can I integrate this tool with other applications?",
        answer: "Not currently, However that is on the way!"
    },
    {
        question: "Is there a mobile version of the tool?",
        answer: "Yes, our tool is optimized for mobile devices, allowing you to manage your projects and incidents on the go."
    },
    {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking on the 'Forgot Password?' link on the login page and following the instructions."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
        <head>
            <title>FAQs | HProjects</title>
            <meta name="description" content="Frequently Asked Questions about HProjects." />
        </head>
            <NavigationMenuMain />
            <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
                <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
                    <div className='flex md:px-[4.5rem] z-10 px-4 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
                        <div className="w-full max-w-5xl mx-auto text-white">
                            <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
                            <div className="faq-list">
                                {FAQs.map((faq, index) => (
                                    <div key={index} className="faq-item mb-4">
                                        <h2 
                                            className={`cursor-pointer text-xl font-semibold transition-all duration-300 ${openIndex === index ? 'text-blue-400' : 'text-white'}`}
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                        </h2>
                                        {openIndex === index && (
                                            <p className="mt-2 text-gray-300 transition-all duration-300">{faq.answer}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
