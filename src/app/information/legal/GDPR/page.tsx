"use client"

import React from 'react'
import NavigationMenuMain from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'

export default function GDPRPage() {
    return (
        <>
            <NavigationMenuMain />
            <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
                <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
                    <div className='flex md:px-[4.5rem] z-10 px-4 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
                        <div className="w-full max-w-5xl mx-auto text-white">
                            <h1 className="text-4xl font-bold mb-8">GDPR Compliance</h1>
                            <nav className="mb-6">
                                <h2 className="text-2xl font-semibold">Table of Contents</h2>
                                <ul className="list-disc gap-2 flex flex-col pl-6">
                                    <li><a href="#what-is-gdpr" className="underline">What is GDPR?</a></li>
                                    <li><a href="#our-commitment" className="underline">Our Commitment to GDPR</a></li>
                                    <li><a href="#your-rights" className="underline">Your Rights Under GDPR</a></li>
                                    <li><a href="#data-collection" className="underline">Data We Collect</a></li>
                                    <li><a href="#data-processing" className="underline">How We Process Your Data</a></li>
                                    <li><a href="#data-protection" className="underline">How We Protect Your Data</a></li>
                                    <li><a href="#contact-us" className="underline">Contact Us</a></li>
                                </ul>
                            </nav>

                            <h2 id="what-is-gdpr" className="text-2xl font-semibold mb-4">What is GDPR?</h2>
                            <p className="mb-6">
                                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It also addresses the export of personal data outside the EU and EEA areas.
                            </p>

                            <h2 id="our-commitment" className="text-2xl font-semibold mb-4">Our Commitment to GDPR</h2>
                            <p className="mb-6">
                                We are committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have always had a robust and effective data protection program in place which complies with existing law and abides by the data protection principles.
                            </p>

                            <h2 id="your-rights" className="text-2xl font-semibold mb-4">Your Rights Under GDPR</h2>
                            <p className="mb-6">
                                Under GDPR, you have the following rights:
                            </p>
                            <ul className="list-disc pl-6 mb-6">
                                <li>The right to be informed</li>
                                <li>The right of access</li>
                                <li>The right to rectification</li>
                                <li>The right to erasure</li>
                                <li>The right to restrict processing</li>
                                <li>The right to data portability</li>
                                <li>The right to object</li>
                                <li>Rights in relation to automated decision making and profiling</li>
                            </ul>

                            <h2 id="data-collection" className="text-2xl font-semibold mb-4">Data We Collect</h2>
                            <p className="mb-6">
                                We collect and process personal data for specific purposes under a number of lawful bases as defined by GDPR. This includes data you provide to us directly, as well as data we collect automatically when you use our services.
                            </p>

                            <div className="my-6 w-full h-0.5 bg-neutral-200" />

                            <h2 id="data-processing" className="text-2xl font-semibold mb-4">How We Process Your Data</h2>
                            <p className="mb-6">
                                We process personal data only for the purposes for which it was collected and in accordance with our Privacy Policy. We review our data collection, storage, and processing practices to ensure we only collect, store and process the personal data needed to provide or improve our services.
                            </p>

                            <h2 id="data-protection" className="text-2xl font-semibold mb-4">How We Protect Your Data</h2>
                            <p className="mb-6">
                                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate:
                            </p>
                            <ul className="list-disc pl-6 mb-6">
                                <li>The pseudonymisation and encryption of personal data</li>
                                <li>The ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services</li>
                                <li>The ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident</li>
                                <li>A process for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing</li>
                            </ul>
                            <h2 id="contact-us" className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="mb-6">
                                If you have any questions about our GDPR compliance or how we handle your personal data, please contact our Data Protection Officer at: dpo@hdev.uk
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}