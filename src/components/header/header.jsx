import { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import '../../styles/globals.css';
import { useClerk } from '@clerk/clerk-react';
import './head.css';

const Header = () => {
  const { user } = useClerk();

  useEffect(() => {
    const loaderbar = document.getElementById('loaderbar');

    const startLoading = () => {
      if (loaderbar) {
        loaderbar.style.transition = 'none';
        loaderbar.style.width = '0%';
        setTimeout(() => {
          loaderbar.style.transition = 'width 0.5s ease';
          loaderbar.style.width = '100%';
        }, 50);
      }
    };

    const stopLoading = () => {
      if (loaderbar) {
        loaderbar.style.width = '100%';
        setTimeout(() => {
          loaderbar.style.transition = 'width 0.5s ease, opacity 0.5s ease';
          loaderbar.style.opacity = '0';
          setTimeout(() => {
            loaderbar.style.width = '0%';
            loaderbar.style.opacity = '1';
          }, 500);
        }, 200);
      }
    };

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Router.events.on('routeChangeError', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
      Router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return (
    <>
      <div
        id="loaderbar"
        className="h-0.5 bg-blue-600 fixed top-0 left-0 z-50"
        style={{ width: '0%', opacity: 1 }}
      />
    <header className="dropper absolute z-70 top-0 w-[100%] max-[460px]:block sm:block md:flex left-0 right-0 z-50 flex items-center justify-center p-8 pb-5 transition-colors duration-300">
      <div className="flex items-center gap-10  justify-between md:w-[110rem] w-[94%]">
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
              <a href="/help/" className="ease-in-out duration-300 flex items-center justify-center  font-semibold hover:text-neutral-50">Product<svg className='height-[30px] w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg></a>
            </li>
            <li>
              <a href="/download" className="ease-in-out duration-300 font-semibold hover:text-neutral-50">Docs</a>
            </li>
            <li>
              <a href="/blog" className="ease-in-out duration-300 font-semibold hover:text-neutral-50">Changelog</a>
            </li>
          </ul>
        </nav>
        </div>
        <nav className='max-[460px]:hidden'>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li className='gap-5 flex items-center'>
                  <img src={user.imageUrl} alt={user.fullName} className="w-8 h-8 rounded-full" />
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
    </>
  );
};

export default Header;