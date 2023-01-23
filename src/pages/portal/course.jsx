const Course = () => {
  return (
    <>
<div className="container">

      <div className=' h-16  flex justify-center w-full bg-slate-600'>
        <div className='flex items-center'>
          <div className='flex space-x-1'>
            <input
              type='text'
              className='block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Search...'
            />
            <button className='px-4 text-white bg-purple-600 rounded-full '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

        <div className=" flex h-16 w-full bg-slate-800">
qwe
      </div>
</div>
      
      

      {/* <div className="m-5 p-5">

      <div className=' h-24 w-auto '>
        <div className='flex '>
          <button
            type='button'
            class='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-800 hover:bg-opacity-3 hover:text-white transition duration-150 ease-in-out'
          >
            ➕ Course
          </button>
        </div>
      </div>
 </div> */}
    </>
  )
}

export default Course
