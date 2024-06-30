import { useEffect } from 'react';
import Image from 'next/image';
import '../../styles/globals.css';
import { UserButton, useClerk } from '@clerk/clerk-react';


const Header = () => {
  const { user, signOut } = useClerk();
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 45) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed z-70 top-0  max-[460px]:block backdrop-blur-md sm:block md:flex left-0 right-0 z-50 flex items-center justify-center p-8 dark:bg-cyan-950 light:bg-white transition-colors duration-300 ${user ? 'scrolled' : ''}`}>
      <div className="flex items-center gap-10 justify-between md:w-[90rem]">
        <a href='/'>
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="HProjects"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
        </a>
        <nav>
          <ul className="space-x-4 md:flex hidden">
            <li>
              <a href="/help/" className="ease-in-out duration-300 border border-gunmetal/20 hover:border-sky-800 bg-gunmetal/10 px-4 py-2 rounded hover:bg-sky-800/40 transform light:bg-gray-400/10 light:border-slate-400">Help</a>
            </li>
            <li>
              <a href="/download" className="ease-in-out duration-300 border border-gunmetal/20 hover:border-sky-800 bg-gunmetal/10 px-4 py-2 rounded hover:bg-sky-800/40 transform">Download</a>
            </li>
            <li>
              <a href="/blog" className="ease-in-out duration-300 border border-gunmetal/20 hover:border-sky-800 bg-gunmetal/10 px-4 py-2 rounded hover:bg-sky-800/40 transform">Blog</a>
            </li>
          </ul>
        </nav>
        <nav className='max-[460px]:hidden'>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li className='gap-5 flex items-center'>
                  <UserButton
                      appearance={{
                        variables: {
                          height: '400px',
                          width: '400px',
                        }
                      }}
                  />
                  <a href="/dashboard" className="ease-in-out duration-300 border dark:border-cyan-700 border-cyan-300 bg-cyan-600/30 hover:border-teal-700 hover:bg-teal-400/40 dark:hover:border-teal-500 dark:bg-cyan-600/30 px-4 py-2 rounded-2xl dark:hover:bg-teal-300/40">Dashboard</a>
                </li>
              </>
            ) : (
              <li className='gap-5 flex items-center'>
                <a href="/sign-in" className="ease-in-out duration-300 rounded-2xl dark:text-white text-black">Login</a>
                <a href="/sign-up" className="cursor-pointer ease-in-out duration-300 border dark:border-neutral-800 border-slate-500 bg-cyan-600/100 hover:border-teal-700 hover:bg-teal-400/40 dark:hover:border-teal-300 dark:bg-cyan-600/100 px-4 py-2 rounded-2xl dark:hover:bg-teal-300/40">Get Started</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;