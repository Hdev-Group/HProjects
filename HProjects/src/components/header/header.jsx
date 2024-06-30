import { useEffect } from 'react';
import Image from 'next/image';
import '../../styles/globals.css';
import { UserButton, useClerk } from '@clerk/clerk-react';


const Header = () => {
  const { user, signOut } = useClerk();

  return (
    <header className="z-70 top-0 w-[100%] border-b-neutral-200 max-[460px]:block backdrop-blur-md sm:block md:flex left-0 right-0 z-50 flex items-center justify-center p-8 pb-5 dark:bg-cyan-950 light:bg-white transition-colors duration-300">
      <div className='borderhold'></div>
      <div className="flex items-center gap-10  justify-between md:w-[90rem]">
        <div className='flex items-center gap-8 justify-center'>
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
              <a href="/help/" className="ease-in-out duration-300 text-neutral-300 flex items-center justify-center  font-semibold hover:text-neutral-50">Product<svg className='height-[30px] w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg></a>
            </li>
            <li>
              <a href="/download" className="ease-in-out duration-300 text-neutral-300 font-semibold hover:text-neutral-50">Docs</a>
            </li>
            <li>
              <a href="/blog" className="ease-in-out duration-300 text-neutral-300 font-semibold hover:text-neutral-50">Changelog</a>
            </li>
          </ul>
        </nav>
        </div>
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
                  <a href="/dashboard" className="cursor-pointer hovmain flex pl-2 border border-white/40 hover:border-white transition-all items-center p-1 rounded-lg hover:bg-neutral-500/10 hover:ring-2 hover:ring-neutral-500/30">Dashboard <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></a>
                </li>
              </>
            ) : (
              <li className='gap-5 flex items-center'>
                <a href="/sign-in" className="ease-in-out duration-300 rounded-2xl text-white">Login</a>
                <a href="/sign-up" className="cursor-pointer flex pl-2 border border-white/40 hover:border-white transition-all items-center p-1 rounded-lg hover:bg-neutral-500/10 hover:ring-2 hover:ring-neutral-500/30 hovmain">Get Started <svg  xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;