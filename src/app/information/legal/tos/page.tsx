"use client"

import React from 'react'
import NavigationMenuMain from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'

export default function TOSPage() {
    return (
        <>
            <NavigationMenuMain />
            <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
                <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
                    <div className='flex md:px-[4.5rem] z-10 px-4 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
                        <div className="w-full max-w-5xl mx-auto text-white">
                            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                            <nav className="mb-6">
                                <h2 className="text-2xl font-semibold">Table of Contents</h2>
                                <ul className="list-disc gap-2 flex flex-col pl-6">
                                    <li><a href="#acceptance" className="underline">1. Acceptance of Terms</a></li>
                                    <li><a href="#changes" className="underline">2. Changes to Terms</a></li>
                                    <li><a href="#access" className="underline">3. Access to the Service</a></li>
                                    <li><a href="#account" className="underline">4. Your Account</a></li>
                                    <li><a href="#content" className="underline">5. Content and Conduct</a></li>
                                    <li><a href="#copyright" className="underline">6. Copyright Policy</a></li>
                                    <li><a href="#termination" className="underline">7. Termination</a></li>
                                    <li><a href="#disclaimer" className="underline">8. Disclaimer of Warranties</a></li>
                                    <li><a href="#limitation" className="underline">9. Limitation of Liability</a></li>
                                    <li><a href="#governing-law" className="underline">10. Governing Law</a></li>
                                    <li><a href="#contact-us" className="underline">11. Contact Us</a></li>
                                </ul>
                            </nav>

                            <h2 id="acceptance" className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-6">
                                By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing this service.
                            </p>

                            <h2 id="changes" className="text-2xl font-semibold mb-4">2. Changes to Terms</h2>
                            <p className="mb-6">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>

                            <h2 id="access" className="text-2xl font-semibold mb-4">3. Access to the Service</h2>
                            <p className="mb-6">
                                We reserve the right to withdraw or amend our service, and any service or material we provide via the service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the service, or the entire service, to users, including registered users.
                            </p>

                            <h2 id="account" className="text-2xl font-semibold mb-4">4. Your Account</h2>
                            <p className="mb-6">
                                If you create an account with us, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
                            </p>

                            <h2 id="content" className="text-2xl font-semibold mb-4">5. Content and Conduct</h2>
                            <p className="mb-6">
                                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness. By posting content to the service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service.
                            </p>

                            <h2 id="copyright" className="text-2xl font-semibold mb-4">6. Copyright Policy</h2>
                            <p className="mb-6">
                                We respect the intellectual property rights of others. It is our policy to respond to any claim that content posted on the service infringes on the copyright or other intellectual property rights of any person or entity. If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to dmca@hdev.uk, with the subject line: "Copyright Infringement".
                            </p>

                            <h2 id="termination" className="text-2xl font-semibold mb-4">7. Termination</h2>
                            <p className="mb-6">
                                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the service.
                            </p>

                            <h2 id="disclaimer" className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
                            <p className="mb-6">
                                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                            </p>

                            <h2 id="limitation" className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                            <p className="mb-6">
                                In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                            </p>
                            <h2 id="governing-law" className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                            <p className="mb-6">
                                These Terms shall be governed and construed in accordance with the laws of United Kingdom, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                            <h2 id="distruption" className="text-2xl font-semibold mb-4">12. Distruption to Systems</h2>
                            <p className="mb-6">
                            If you are found to be disrupting our systems in any way, we reserve the right to terminate your account and ban you from using our services. Disruption to systems includes, but is not limited to, the following actions:
                            </p>
                            <ul className='gap-1 ml-5 flex flex-col mt-1 list-disc'>
                                <li>Denial of Service Attacks (DoS/DDoS): Flooding the network or server with excessive traffic to cause service interruptions.</li>
                                <li>Malicious Code: Introducing harmful software (e.g., viruses, worms) that compromises system integrity.</li>
                                <li>Unauthorized Access: Attempting to gain access to systems, networks, or data without permission.</li>
                                <li>Data Manipulation: Altering or deleting data without authorization.</li>
                                <li>SQL Injection: Exploiting vulnerabilities to manipulate databases.</li>
                                <li>Exploitation of Vulnerabilities: Taking advantage of software bugs or weaknesses to disrupt services.</li>
                            </ul>
                            <h2 id='misleading' className='text-2xl font-semibold mb-4'>13. Misleading Users / Businesses</h2> <p className='mb-6'> We do not tolerate any activities that mislead or deceive users or businesses. This includes, but is not limited to, creating phishing websites, impersonating legitimate services, or spreading false information. Engaging in such activities may result in immediate termination of your account and a ban from our services. Additionally, we reserve the right to report such activities to relevant authorities to protect our users and maintain the integrity of our platform. </p>
                            <h2 id="contact-us" className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                            <p className="mb-6">
                                If you have any questions about these Terms, please contact us at: legal@hdev.uk
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}