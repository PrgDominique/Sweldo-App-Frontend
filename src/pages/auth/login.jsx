import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div className='h-auto md:h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='hidden md:flex bg-blue-500 justify-center items-center'>
        Left Side
      </div>
      <div className='container mx-auto p-5 md:p-16'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
