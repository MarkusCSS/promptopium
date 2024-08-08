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

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 rounded-md items-center justify-center'>
  <div className='flex items-center justify-center relative  w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16'>
    <Image
      src='/assets/images/logo.png'
      alt='logo'
      width={60} 
      height={60} 
      sizes="(max-width: 640px) 2.5rem, (max-width: 768px) 3rem, (max-width: 1024px) 3.5rem, 4rem"
      className='rounded-md'
    />
  </div>
  <p className='logo_text'>Tripoteka</p>
</Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/' className='black_btn'>
              Početna
            </Link>
            <Link href='/create-prompt' className='black_btn'>
              Kreiraj Objavu
            </Link>
            

            <button type='button' onClick={handleSignOut} className='outline_btn'>
              OdjaviSe
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
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
                    signIn(provider.id,{prompt:'select_account'});
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
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                 <Link href='/' className='black_btn'
                 onClick={() => setToggleDropdown(false)} >
              Početna
            </Link>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Moj Profil
                </Link>
               
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Kreiraj objavu
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                  className='mt-5 w-full black_btn'
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
                    signIn(provider.id,{prompt:'select_account'});
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
