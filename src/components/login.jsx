import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import Logo from '../assets/douran.png'
import { FaEye, FaLock, FaUser } from 'react-icons/fa'
import axios from 'axios';
import { ArcaptchaWidget } from "arcaptcha-react";

const showLoginError = (errText) => {
    Swal.fire({
        title: 'خطا در ورود',
        text: errText,
        icon: 'error',
        confirmButtonText: 'برگرد',
        confirmButtonColor: '#3085d6',
    });
};

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [PasswordShown, setPasswordShow] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("token") != null)
    const [ArRef, setArRef] = useState(React.createRef())
    const [CaptchaApproved, setCaptchaApproval] = useState(false)
    
    // Check responsiveness on resize
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    if (isLoggedIn) {
        location.pathname = "/"
    }
    
    function getToken() {
        setCaptchaApproval(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username == "" || password == "" ) {
            alert("لطفاً نام کاربری و رمز عبور را وارد کنید")
            return
        }
        if(!CaptchaApproved){
            alert("لطفا کپچا را کامل کنید")
            return
        }
        setIsLoading(true)
        try {
            setTimeout(() => { }, 1000)
            console.log("Logging in with:", { username, password })
            await axios.post("http://192.168.5.50:8080/api/users/login", {
                Username: username,
                Password: password
            })
                .then((res) => {
                    var result = res.data
                    if (String(result).includes("|")) {
                        localStorage.setItem("token", String(result).split("|")[1])
                        location.pathname = "/"
                    }
                    else {
                        showLoginError(result)
                    }
                })
        } catch (error) {
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div 

            className='min-h-screen flex flex-col lg:flex-row overflow-hidden' 
            style={{ fontFamily: "Rubik, sans-serif" }}
        >

            <div className='flex-1 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto'>
                <div className='w-full max-w-md'>
                    <div className='bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl mx-2'>
                        <div className='text-center mb-6 md:mb-10'>
                            <h1
                                dir='rtl'
                                className='text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3'
                                style={{ fontFamily: "Nastaliq, cursive" }}
                            >
                                خوش آمدید !
                            </h1>
                            <p className='text-gray-600 text-sm md:text-md'>
                                لطفا اطلاعات خود را به درستی وارد کنید
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                            {/* Username Field */}
                            <div className='space-y-1 md:space-y-2'>
                                <label
                                    htmlFor="username"
                                    className='block text-right text-gray-700 font-medium text-sm md:text-base'
                                >
                                    نام کاربری
                                </label>
                                <div className='relative'>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        dir='rtl'
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='w-full p-2 py-3 md:py-3 pr-10 md:pr-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none placeholder:text-gray-400'
                                        placeholder="نام کاربری خود را وارد کنید"
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                        <FaUser />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div className='space-y-1 md:space-y-2'>
                                <label
                                    htmlFor="password"
                                    className='block text-right text-gray-700 font-medium text-sm md:text-base'
                                >
                                    رمز عبور
                                </label>
                                <div className='relative'>
                                    <input
                                        type={PasswordShown ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        dir='rtl'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full p-2 py-3 md:py-3 pr-10 md:pr-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none placeholder:text-gray-400'
                                        placeholder="رمز عبور خود را وارد کنید"
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                        <FaLock />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setPasswordShow(!PasswordShown)} 
                                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                            
                            <div className='w-full flex justify-center '>

                                    <ArcaptchaWidget
                                        ref={ArRef}
                                        site-key="7vyo8ffzq8"
                                        callback={getToken}
                                        theme="light"
                                        lang="fa"
                                        required
                                        style={{
                                            width: '100%',
                                            transform: windowWidth < 640 ? 'scale(0.9)' : 'scale(1)',
                                            transformOrigin: 'center'
                                        }}
                                    />
                            </div>
                            
                            {/* Forgot Password Link */}
                            <div className='text-center'>
                                <a
                                    href="#"
                                    className='text-orange-600 hover:text-orange-700 transition-colors duration-300 font-medium text-sm md:text-base'
                                >
                                    رمز عبور را فراموش کرده‌اید؟
                                </a>
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 md:py-4 px-6 rounded-xl text-white font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${isLoading
                                    ? 'bg-orange-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className='flex items-center justify-center space-x-2 space-x-reverse'>
                                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span className='text-sm md:text-base'>در حال ورود...</span>
                                    </div>
                                ) : (
                                    'ورود به حساب کاربری'
                                )}
                            </button>
                        </form>
                    </div>
                    
                </div>
            </div>

            {/* Right Panel - Branding */}
            <div className='hidden lg:flex flex-1 flex-col justify-center items-center px-6 md:px-8 bg-gradient-to-tr from-orange-200 to-orange-400 relative overflow-hidden logo_bg'>
                <div className='absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full -translate-y-32 -translate-x-32 opacity-10'></div>
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full translate-y-32 translate-x-32 opacity-10'></div>
                
                <div className='relative z-10 text-center w-full max-w-lg'>
                    <div className='flex justify-center mb-6 md:mb-8'>
                        <img
                            src={Logo}
                            alt="Logo"
                            className='w-48 md:w-64 h-auto drop-shadow-2xl animate-float'
                        />
                    </div>

                    <h2
                        className='text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4'
                        style={{ fontFamily: "Rubik" }}
                    >
                        گروه دوران
                    </h2>
                    
                    <div className='mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-4'>
                        {[
                            { icon: '⚡', text: 'سرعت زیاد' },
                            { icon: '🛡️', text: 'امنیت بالا' },
                            { icon: '📊', text: 'گزارش‌گیری پیشرفته' },
                            { icon: '🔄', text: 'بروزرسانی مداوم' }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300'
                            >
                                <span className='text-xl mb-1 md:mb-2'>{feature.icon}</span>
                                <span className='text-white text-xs md:text-sm'>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Mobile Branding (Hidden on desktop) */}
            <div className='lg:hidden flex flex-col items-center p-6 bg-gradient-to-tr from-orange-200 to-orange-400 relative'>
                <div className='text-center'>
                    <div className='flex justify-center mb-4'>
                        <img
                            src={Logo}
                            alt="Logo"
                            className='w-32 h-auto drop-shadow-2xl'
                        />
                    </div>
                    <h2
                        className='text-xl font-bold text-white mb-4'
                        style={{ fontFamily: "Rubik" }}
                    >
                        گروه دوران
                    </h2>
                </div>
            </div>
        </div>
    )
}