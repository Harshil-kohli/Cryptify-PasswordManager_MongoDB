import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between items-center sm:px-4 h-15 overflow-x-auto'>
    <div className='logo text-white text-2xl sm:ml-5'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></div>
      <ul className='absolute right-37'>
        <li className='hidden sm:flex gap-5 text-white text-lg'>
            <a className='transition-all duration-100 ease-in-out hover:font-bold' href="/">Home</a>
            <a className='transition-all duration-100 ease-in-out hover:font-bold' href="/">About</a>
            <a className='transition-all duration-100 ease-in-out hover:font-bold' href="/">Contact</a>
        </li>
      </ul>
      <button className='bg-green-500 cursor-pointer p-1.5 px-2.5 flex rounded-full border border-white gap-1 justify-center items-center transition-colors duration-300 ease-in-out hover:bg-green-400'>
        <img className='' src="/github.svg" alt="github logo" />
        <span className='font-semibold'>GitHub</span>
      </button>
    </nav>
  )
}

export default navbar
