import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postAdmin } from '../service/apiadmin';
import { IoBus, IoCar, IoCarSport, IoLogoInstagram } from 'react-icons/io5';


function Sign() {
    const [data, setData] = useState({
        nama: "",
        email: "",
        password: ""
    });

    function submit(e) {
        e.preventDefault();
        postAdmin(data)
            .then(res => {
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error:', error); // Handle errors
            });
    }

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <h6 className="text-center text-gray-600">to RentCarkuuu</h6>
                <form onSubmit={submit} className="space-y-6 mt-4">
                    <div>
                        <input
                            onChange={handle}
                            id='nama'
                            value={data.nama}
                            type="text"
                            placeholder="Insert Your Name..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handle}
                            id='email'
                            value={data.email}
                            type="email"
                            placeholder="Insert Your Email Address..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handle}
                            id='password'
                            value={data.password}
                            type="password"
                            placeholder="Insert Your Password..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
                <p className="text-center mt-6">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Already Have an Account? <span className="font-semibold">Sign In</span>
                    </Link>
                </p>
                <div className="flex justify-center space-x-4 mt-8">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                  <a href="https://www.instagram.com/azkrmt_" target="_blank" rel="noopener noreferrer">
                    <IoLogoInstagram className="text-gray-800" />
                  </a>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <IoCarSport />
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <IoCar />
                </div>
                </div>
            </div>
        </div>
    );
}

export default Sign;
