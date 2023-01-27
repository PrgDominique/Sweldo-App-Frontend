const EmployeePage = () => {
  return (
    <div>
      <div>Employee Page</div>
      <div>
        <table className='w-full text-left'>
          <thead className='bg-gray-100 uppercase'>
            <tr>
              <th className='p-2.5'>#</th>
              <th className='p-2.5'>First Name</th>
              <th className='p-2.5'>Last Name</th>
              <th className='p-2.5'>Email</th>
              <th className='p-2.5'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <th className='p-2.5'>1</th>
              <td className='p-2.5'>Jason</td>
              <td className='p-2.5'>Lerit</td>
              <td className='p-2.5'>jason@gmail.com awdawdwd</td>
              <td className='p-2.5'>
                <button>Edit</button>
              </td>
            </tr>
            <tr className='border-b'>
              <th className='p-2.5'>1</th>
              <td className='p-2.5'>Jason</td>
              <td className='p-2.5'>Lerit</td>
              <td className='p-2.5'>jason@gmail.com awdawdwd</td>
              <td className='p-2.5'>
                <button>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeePage
