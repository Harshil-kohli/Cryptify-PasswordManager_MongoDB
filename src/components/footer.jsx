import React from 'react'

const footer = () => {
  return (
    <div className='py-4 mt-8 bg-slate-800 flex justify-between items-center h-15 text-white overflow-x-auto'>
      <div className='logo text-white text-xl ml-5'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></div>
      <div className='text-slate-400 mr-6 text-sm'>&copy; 2025 <span>&lt;</span>Pass<span>OP/&gt;</span>. All rights reserved.</div>
    </div>
  )
}

export default footer
