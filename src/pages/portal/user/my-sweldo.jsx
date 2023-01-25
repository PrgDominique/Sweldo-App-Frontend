const MySweldo = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 border rounded">
            <p className="text-2xl text-center m-5">Hours worked</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 border rounded m-5">
                <p className="text-2xl text-center m-5">Weekly</p>
                <p className="text-7xl text-center m-5">54</p>
              </div>
              <div className="col-span-1 border rounded m-5">
                <p className="text-xl text-center m-5">Montly</p>
                <p className="text-7xl text-center m-5">452</p>
              </div>
            </div>
            <p className="text-2xl text-center m-5">Employee Rate</p>
            
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Announcements */}
        </div>
      </div>
    </>
  );
};

export default MySweldo;
