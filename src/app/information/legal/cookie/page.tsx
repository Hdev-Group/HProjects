"use client"

import React from 'react'
import NavigationMenuMain from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'

export default function CookiePage() {
    return (
        <>
            <NavigationMenuMain />
            <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
                <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
                    <div className='flex md:px-[4.5rem] z-10 px-4 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
                        <div className="w-full max-w-5xl mx-auto text-white">
                            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                            <nav className="mb-6">
                                <h2 className="text-2xl font-semibold">Table of Contents</h2>
                                <ul className="list-disc gap-2 flex flex-col pl-6">
                                    <li><a href="#what-are-cookies" className="underline">What are cookies?</a></li>
                                    <li><a href="#how-we-use-cookies" className="underline">How we use cookies</a></li>
                                    <li><a href="#types-of-cookies" className="underline">Types of cookies we use</a></li>
                                    <li><a href="#your-choices" className="underline">Your choices regarding cookies</a></li>
                                    <li><a href="#changes-to-policy" className="underline">Changes to our cookie policy</a></li>
                                    <li><a href="#contact-us" className="underline">Contact us</a></li>
                                </ul>
                            </nav>

                            <h2 id="what-are-cookies" className="text-2xl font-semibold mb-4">What are cookies?</h2>
                            <p className="mb-6">
                                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                            </p>

                            <h2 id="how-we-use-cookies" className="text-2xl font-semibold mb-4">How we use cookies</h2>
                            <p className="mb-6">
                                We use cookies for various purposes, including:
                            </p>
                            <ul className="list-disc pl-6 mb-6">
                                <li>To provide essential website functionality</li>
                                <li>To remember your preferences</li>
                                <li>To analyze how our website is used</li>
                            </ul>

                            <h2 id="types-of-cookies" className="text-2xl font-semibold mb-4">Types of cookies we use</h2>
                            <p className="mb-6">
                                We use both session and persistent cookies on our website.
                            </p>

                            <div className="my-6 w-full h-0.5 bg-neutral-200" />

                            <h2 id="your-choices" className="text-2xl font-semibold mb-4">Your choices regarding cookies</h2>
                            <p className="mb-6">
                                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                            </p>

                            <h2 id="changes-to-policy" className="text-2xl font-semibold mb-4">Changes to our cookie policy</h2>
                            <p className="mb-6">
                                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                            </p>

                            <h2 id="contact-us" className="text-2xl font-semibold mb-4">Contact us</h2>
                            <p>
                                If you have any questions about our Cookie Policy, please contact us at: privacy@hdev.uk
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}