"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [activeBtn, setActiveBtn] = useState('home'); // Stanje za aktivno dugme

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleButtonClick = (btn) => {
    setActiveBtn(btn); // Postavi aktivno dugme na osnovu klika
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 rounded-md items-center justify-center'>
        <div className='flex items-center justify-center relative w-14 h-14  lg:w-18 lg:h-18 2xl:w-20 2xl:h-20'>
          <Image
            src='/assets/images/logo.png'
            alt='logo'
            width={60} 
            height={60} 
            sizes="(max-width: 640px) 3rem, (max-width: 768px) 3.2rem, (max-width: 1024px) 3.5rem, 4rem"
            style={{ width: 'auto', height: 'auto' }}
            className='rounded-md'
          />
        </div>
        <p className='logo_text'>Tripoteka</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex items-center gap-3 md:gap-5'>
            <Link
              href='/'
              className={activeBtn === 'home' ? 'black_btn' : 'outline_btn'}
              onClick={() => handleButtonClick('home')}
            >
              Početna
            </Link>
            <Link
              href='/create-prompt'
              className={activeBtn === 'create-prompt' ? 'black_btn' : 'outline_btn'}
              onClick={() => handleButtonClick('create-prompt')}
            >
              Nova Tema
            </Link>
            <button type='button' onClick={handleSignOut} className='outline_btn'>
              OdjaviSe
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={60}
                height={60}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id, { prompt: 'select_account' });
                  }}
                  className='black_btn'
                >
                  PrijaviSe
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown '>
                <Link
                  href='/'
                  className={activeBtn === 'home' ? 'black_btn' : 'outline_btn'}
                  onClick={() => { setToggleDropdown(false); handleButtonClick('home'); }}
                >
                  Početna
                </Link>
                <Link
                  href='/profile'
                  className={activeBtn === 'profile' ? 'black_btn' : 'outline_btn'}
                  onClick={() => { setToggleDropdown(false); handleButtonClick('profile'); }}
                >
                  Moj Profil
                </Link>
                <Link
                  href='/create-prompt'
                  className={activeBtn === 'create-prompt' ? 'black_btn' : 'outline_btn'}
                  onClick={() => { setToggleDropdown(false); handleButtonClick('create-prompt'); }}
                >
                  Nova Tema
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                    handleButtonClick(''); // Opcionalno, za resetovanje aktivnog dugmeta
                  }}
                  className='w-full outline_btn'
                >
                  OdjaviSe
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id, { prompt: 'select_account' });
                  }}
                  className='black_btn'
                >
                  PrijaviSe
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
