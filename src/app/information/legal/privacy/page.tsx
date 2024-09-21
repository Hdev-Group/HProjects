"use client"

import React from 'react'
import NavigationMenuMain from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'

export default function PrivacyPage() {
    return (
        <>
            <NavigationMenuMain />
            <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
                <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
                    <div className='flex md:px-[4.5rem] z-10 px-4 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
                        <div className="w-full max-w-5xl mx-auto text-white">
                            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                            <nav className="mb-6">
                                <h2 className="text-2xl font-semibold">Table of Contents</h2>
                                <ul className="list-disc gap-2 flex flex-col pl-6">
                                    <li><a href="#information-collection" className="underline">Information Collection and Use</a></li>
                                    <li><a href="#data-sharing" className="underline">Data Sharing and Disclosure</a></li>
                                    <li><a href="#data-security" className="underline">Data Security</a></li>
                                    <li><a href="#your-rights" className="underline">Your Rights</a></li>
                                    <li><a href="#children-privacy" className="underline">Children's Privacy</a></li>
                                    <li><a href="#changes-to-policy" className="underline">Changes to This Privacy Policy</a></li>
                                    <li><a href="#contact-us" className="underline">Contact Us</a></li>
                                </ul>
                            </nav>

                            <h2 id="information-collection" className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
                            <p className="mb-6">
                                We collect several different types of information for various purposes to provide and improve our service to you. Types of data collected include personal data, usage data, and tracking & cookies data.
                            </p>

                            <h2 id="data-sharing" className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
                            <p className="mb-6">
                                We may disclose your personal data in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend our rights or property, prevent or investigate possible wrongdoing in connection with the service, protect the personal safety of users of the service or the public, and protect against legal liability.
                            </p>

                            <h2 id="data-security" className="text-2xl font-semibold mb-4">Data Security</h2>
                            <p className="mb-6">
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                            </p>

                            <h2 id="your-rights" className="text-2xl font-semibold mb-4">Your Rights</h2>
                            <p className="mb-6">
                                You have the right to access, update or to delete the information we have on you. Whenever made possible, you can update your personal data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
                            </p>

                            <h2 id="children-privacy" className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                            <p className="mb-6">
                                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
                            </p>

                            <h2 id="changes-to-policy" className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                            <p className="mb-6">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                            </p>

                            <h2 id="contact-us" className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="mb-6">
                                If you have any questions about this Privacy Policy, please contact us at: privacy@hdev.uk
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}