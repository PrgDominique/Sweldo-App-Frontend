const Announcement = ({ announcements }) => {
  return (
    <>
      <div>
        <h1 className='mb-8 font-bold'>Announcement</h1>
        <hr className='mb-2' />
        {announcements.map((item) => (
          <div key={item.id}>
            <h1 className='mb-8'>{item.title} </h1>
            <hr className='mb-2' />
          </div>
        ))}
      </div>
    </>
  )
}

export default Announcement
