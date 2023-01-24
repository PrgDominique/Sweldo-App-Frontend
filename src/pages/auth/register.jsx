import RegisterForm from '../../components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <div className='h-auto md:h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='container mx-auto p-5 md:p-16'>
        <RegisterForm />
      </div>
      <div className='hidden md:flex bg-blue-500 justify-center items-center'>
        Right Side
      </div>
    </div>
  )
}

export default RegisterPage
