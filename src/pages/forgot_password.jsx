const ForgotPassword = () => {
  return (
    <div className="container border mx-auto m-5 p-5">
      Forgot Password
      <form className="border rounded p-5">
        <div className="form-group p-2">
          <label htmlFor="email">Email address:</label>
          <input type="email" className="form-control border rounded" id="email" />
        </div>
        <button type="button" className="bg-blue-500 rounded p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
