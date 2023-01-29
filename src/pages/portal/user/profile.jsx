
const Profile = () => {
    return (
        <>
        <div className="border-2 border-blue p-5 m-5 ">
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Active</span>
            
            <p className="text-2xl font-bold">IT001</p>

            <p className="text-xl font-bold">John Doe</p>

            <p>Junior Web Developer - IT Department</p>
            <p>Expected Salary: 15000</p>


        </div>
        
        <div className="m-5">
            <p>Contact Details</p>
            <p>🏠Manila, Philippines</p>
            <p>📧johndoe@gmail.com</p>
            <p>📞09123456789</p>
        </div>
        <div className="m-5">
           <p>In Case of Emergency:</p> 
            <p>Maria Doe</p>
            <p>🏠 Manila, Philippines</p>
            <p>📞09123584718</p>
        </div>
        
        </>
        
        
    )
}

export default Profile