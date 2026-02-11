import {  useState } from "react";
import Register from "./Register";
import Login from "./Login";

// import { Button } from "@mui/material";

const HomePage = () => {
  const [role, setRole] = useState("Patient");
  const [signin, setSignin] = useState("login");
 

  return (
    <div className="min-h-screen  sm:w-fit md:w-auto justify-items-center flex md:justify-end flex-auto items-center bg-gradient-to-b from-blue-900 to-blue-500">
   <div className="absolute cursor-pointer top-4 left-4 text-white text-lg flex items-center">
      <img src="https://w7.pngwing.com/pngs/957/974/png-transparent-hospital-logo-clinic-health-care-physician-business-thumbnail.png" alt="" className="w-10 h-10" />
      <span className='px-2'>HOSPITAL MANAGEMENT SYSTEM</span>
    </div>
    <nav className="absolute top-4 right-4 text-white flex space-x-6">
      <a href="#" className="hover:underline">Contact</a>
    </nav>
    <div className="bg-white sm:rounded-l-full shadow-lg py-8 px-8 md:w-[80%] lg:w-[60%] ">
     
      <div className="flex w-100 justify-self-end space-x-2 mb-4 bg-amber-500 rounded-r-full rounded-l-full ">
        {["Patient", "Doctor", "Admin"].map((r) => (
          <button
            key={r}
            className={`p-1 m-1 gap-1 rounded-full w-32 ${
              role === r ?  "bg-white text-amber-500" : "bg-amber-500 text-white"
            }`}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>
        <section>
        {(role === "Patient" && signin === "register")? <Register setSignin={setSignin} /> : <Login rolee={role} setSignin={setSignin} />}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
