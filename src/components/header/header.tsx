import { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import '../../styles/globals.css';
import { useClerk } from '@clerk/clerk-react';
import './head.css';

export default function NavigationMenuMain() {
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
    <div className="w-full px-2 md:px-[4.5rem] py-3  flex items-center fixed justify-center z-10 backdrop-blur-lg border-b " id="headermain">
      <div className="max-w-[120rem] w-[100%] flex ">
        <a href='/'>
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="HProjects"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
        </a>

        </div>
        <nav className='max-[460px]:hidden'>
          <ul className="flex">
            {user ? (
              <>
                <li className='gap-5 flex w-full items-center'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img src={user.imageUrl} className="rounded-full" />
                  </div>
                  <a href="/dashboard" className="ease-in-out duration-300 hovmain py-1 px-2 flex items-center justify-center bg-blue-600 rounded-md hover:bg-blue-800">Dashboard <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></a>
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
      </>
  )
}

