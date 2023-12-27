import React from "react";
import Limk from "next/link";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
         <div className="bg-[#212121] p-8 rounded shadow-md w-96">
           <h1 className="text-4xl text-center font-semibold mb-8">  Register </h1>
           <form>
            <input 
            type="text" 
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
             required 
             />
              <input
            type="password" 
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="password"
             required 
             />
             <button
            type="submit"
             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-500" 
             >
                {""}
             Register
             </button>
           </form>
           <div className="text-center text-gray-500 nt-4"> -OR- </div>
           <Limk
           className="block text-center text-blue-500 hover:underline mt-2" 
           href="/login"
           > 
           Login with an existing account 
           </Limk>
        </div>
    </div>
  );
};

export default Register;