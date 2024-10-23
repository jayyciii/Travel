import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import avatarImg from "../assets/commentor.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const navLists = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    // Reference to popover element
    const popoverRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    // Popover content for Planner
    const plannerPopover = (
        <Popover id="popover-basic" ref={popoverRef}>
            <Popover.Body>
                <ul className="list-none p-4 m-0 bg-white rounded-md drop-shadow">
                    {['Create Your Trip', 'My Trip'].map((text, index) => (
                        <li key={index} style={{ padding: '8px 0' }}>
                            <NavLink
                                to={index === 0 ? "/your-trip" : `/${text.toLowerCase().replace(' ', '-')}`}
                                onClick={() => {
                                    setActiveLink(text);
                                    setIsMenuOpen(false);
                                    setIsPopoverOpen(false);
                                }}
                                style={{
                                    textDecoration: 'none',
                                    color: activeLink === text ? '#007bff' : '#000',
                                }}
                            >
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </Popover.Body>
        </Popover>
    );


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsPopoverOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className='bg-white py-6 border'>
            <nav className='container mx-auto flex justify-between px-5'>
                <a href='/'>
                    <img src="/w.png" alt='' className='h-12' />
                </a>
                <ul className='sm:flex hidden items-center gap-8'>
                    {navLists.map((list, index) => (
                        <li key={index}>
                            <NavLink
                                to={list.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    {/* Popover for "Planner" */}
                    <OverlayTrigger trigger="click" placement="bottom" overlay={plannerPopover} show={isPopoverOpen} onToggle={() => setIsPopoverOpen(!isPopoverOpen)}>
                        <li>
                            <span className="cursor-pointer" onClick={() => {
                                setIsPopoverOpen(!isPopoverOpen);
                                setIsMenuOpen(false);
                            }}>Planner</span>
                        </li>
                    </OverlayTrigger>

                    {/* Render button based on user login status */}
                    {user ? (
                        <li className='flex items-center gap-3'>
                            <img src={avatarImg} alt='' className='h-8 w-8' />
                            {user.role === "user" ? (
                                <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm' onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <NavLink to="/dashboard" className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>
                                    Dashboard
                                </NavLink>
                            )}
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>

                {/* Toggle menu for mobile view */}
                <div className='flex items-center sm:hidden'>
                    <button
                        onClick={toggleMenu}
                        className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'>
                        {isMenuOpen ? <IoClose className='size-6' /> : <IoMdMenu className='size-6' />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
                <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
                    {navLists.map((list, index) => (
                        <li className='mt-5 px-4' key={index}>
                            <NavLink
                                onClick={() => setIsMenuOpen(false)}
                                to={list.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
};

export default Navbar;
