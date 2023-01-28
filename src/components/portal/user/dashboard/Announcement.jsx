const Announcement = ({ announcements }) => {
  return (
    <>
      <div>
        {announcements.map((item) => (
          <div key={item.id}>
            <h1 className='mb-8 flex justify-center items-center p-3'>
              {item.title}{' '}
            </h1>
            <hr className='mb-2' />
          </div>
        ))}
      </div>
    </>
  )
}

export default Announcement
