import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiLogOut,
    FiMenu,
    FiChevronRight,
    FiChevronLeft,
    FiShoppingBag,
    FiSettings,
    FiSearch,
} from 'react-icons/fi';
import douran_logo from '../assets/douran.png';
import { LuBriefcase } from 'react-icons/lu';
import { useSidebar } from '../contexts/SidebarContext';

const Sidebar = () => {
    const { collapsed, toggleSidebar } = useSidebar();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();
    
    const menuItems = [
        { path: '/', name: 'داشبورد', icon: FiHome, badge: null },
        { path: '/mission-request', name: 'درخواست ماموریت', icon: LuBriefcase, badge: null},
        { path: '/products', name: 'محصولات', icon: FiShoppingBag, badge: null },
        { path: '/users', name: 'کاربران', icon: FiUsers, badge: null },
        { path: '/settings', name: 'تنظیمات', icon: FiSettings, badge: null },
    ];

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // به‌روزرسانی متغیر CSS برای سایز سایدبار
    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', collapsed ? '5rem' : '18rem');
    }, [collapsed]);

    const toggleMobileSidebar = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.pathname = "/login";
    };

    const handleNavigation = (path) => {
        window.location.pathname = path;
    };

    return (
        <div style={{ fontFamily: "Rubik" }} dir="rtl">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileSidebar}
                className="fixed top-4 right-4 z-40 md:hidden bg-gradient-to-br from-orange-500 to-amber-500 text-white p-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <FiMenu size={24} />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-gradient-to-b from-[#0A0A0A] to-[#121212] transition-all duration-500 ease-in-out z-40 ${
                    collapsed ? 'w-20' : 'w-72'
                } ${
                    mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                } shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-hide border-l border-white/5 flex flex-col`}
            >
                {/* Logo Section */}
                <div className={`flex items-center justify-between p-4 border-b border-white/5 ${
                    collapsed ? 'flex-col gap-3' : 'flex-row'
                }`}>
                    <div className={`flex items-center ${collapsed ? 'flex-col' : 'gap-2'}`}>
                        <div className={`relative group ${
                            collapsed ? 'w-10 h-10' : 'w-12 h-12'
                        }`}>
                            <img
                                src={douran_logo}
                                alt="Logo"
                                className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                            />
                            {!collapsed && (
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A0A0A]" />
                            )}
                        </div>
                        
                        {!collapsed && (
                            <div className="mr-2">
                                <p className="text-lg font-bold text-white">
                                    گروه دوران
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    پنل مدیریت
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                {!collapsed && (
                    <div className="px-3 py-3">
                        <div className="relative">
                            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="جستجو..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pr-9 pl-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-200"
                            />
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 px-2 py-2">
                    <div className="flex flex-col gap-1">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`relative group block cursor-pointer rounded-xl transition-all duration-200 ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20' 
                                            : 'hover:bg-white/10'
                                    } ${
                                        collapsed ? 'py-2.5' : 'py-2'
                                    }`}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className={`flex items-center ${
                                        collapsed ? 'justify-center' : 'px-3'
                                    }`}>
                                        <item.icon className={`text-lg transition-all duration-200 ${
                                            !collapsed && 'ml-2.5'
                                        } ${
                                            hoveredItem === index && 'scale-110'
                                        } ${
                                            isActive 
                                                ? 'text-orange-400' 
                                                : 'text-gray-300 group-hover:text-white'
                                        }`} />
                                        
                                        {!collapsed && (
                                            <>
                                                <span className={`flex-1 text-sm font-medium text-right ${
                                                    isActive 
                                                        ? 'text-white' 
                                                        : 'text-gray-300 group-hover:text-white'
                                                }`}>
                                                    {item.name}
                                                </span>
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 font-medium">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Tooltip for collapsed mode */}
                                    {collapsed && (
                                        <div className="absolute right-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <item.icon className="text-orange-400" size={14} />
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom Section */}
                <div className="border-t border-white/5">
                    {/* Collapse Button */}
                    <div className="p-2">
                        <button
                            onClick={toggleSidebar}
                            className={`w-full flex items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 ${
                                collapsed ? 'mx-auto' : 'px-3'
                            }`}
                        >
                            {collapsed ? (
                                <FiChevronLeft size={18} />
                            ) : (
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm">بستن منو</span>
                                    <FiChevronRight size={18} />
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Logout Button */}
                    <div className="p-2 pt-0">
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center ${
                                collapsed ? 'justify-center' : 'gap-2.5 px-3'
                            } p-2.5 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group relative`}
                        >
                            <FiLogOut className={`text-lg ${!collapsed && 'ml-1.5'}`} />
                            {!collapsed && (
                                <span className="text-sm flex-1 text-right text-gray-300 group-hover:text-red-400">
                                    خروج از حساب
                                </span>
                            )}
                            {collapsed && (
                                <div className="absolute right-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <FiLogOut className="text-red-400" size={14} />
                                        <span>خروج از حساب</span>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;