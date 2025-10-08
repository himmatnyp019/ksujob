import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, UserPlus, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../src/assets/assets';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContent';
import { signOut } from "firebase/auth";
import { auth } from "../../src/firebase.js";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    {
      id: 1,
      name: 'Recruitment & Talent Search',
      hasDropdown: true,
      submenu: ['Job Postings', 'Talent Pool', 'Headhunting']
    },
    {
      id: 2,
      name: 'Support Services',
      hasDropdown: true,
      submenu: ['Consulting', 'Training', 'HR Solutions']
    },
    {
      id: 3,
      name: 'Community',
      hasDropdown: true,
      submenu: ['Forum', 'Events', 'News']
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogin = () => {
    // toast.info('Redirecting to login...', {
    //   position: "top-right",
    //   autoClose: 2000,
    // });
    navigate("/login")

  };

  const handleJoin = () => {
    toast.info('Redirecting to registration...', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-background-animation"></div>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={assets.logoimage} alt="" />
            {/* <span className="logo-text">Job Board For International Students</span> */}
          </Link>

          <ul className="navbar-menu desktop-menu">
            {navItems.map((item) => (
              <li
                key={item.id}
                className="nav-item"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href="#" className="nav-link">
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={16} className="dropdown-icon" />}
                </a>
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="dropdown-menu">
                    {item.submenu.map((subItem, index) => (
                      <a key={index} href="#" className="dropdown-item">
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>



          <div className="navbar-actions">

            {!currentUser ? (
              <>
                <button className="btn btn-login" onClick={handleLogin}>
                  <User size={18} />
                  <span>Login</span>
                </button>
                {/* // onClick={handleJoin} */}
               
              </>
            ) : (
              <div className="user-profile">
                <div className="btn btn-login" onClick={handleLogout}>Log Out</div>
              </div>
            )}
             <Link to="/profile" className="btn btn-join">
                  <UserPlus size={18} />
                  <span>Profile</span>
                </Link>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`mobile-search-overlay ${isSearchOpen ? 'open' : ''}`}>
          <div className="mobile-search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search jobs, talents..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              autoFocus
            />
            <button
              type="button"
              className="close-search"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </div>
              <span className="logo-text">KSU JOB</span>
            </div>
          </div>
          <ul className="sidebar-menu">
            {navItems.map((item) => (
              <li key={item.id} className="sidebar-item">
                <div
                  className="sidebar-link"
                  onClick={() => item.hasDropdown && toggleDropdown(item.id)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown
                      size={18}
                      className={`sidebar-dropdown-icon ${activeDropdown === item.id ? 'rotated' : ''}`}
                    />
                  )}
                </div>
                {item.hasDropdown && activeDropdown === item.id && (
                  <ul className="sidebar-submenu">
                    {item.submenu.map((subItem, index) => (
                      <li key={index}>
                        <a href="#" className="sidebar-sublink">{subItem}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isMobileMenuOpen && (
          <div className="overlay" onClick={toggleMobileMenu}></div>
        )}
      </nav>


    </>
  );
};

export default Navbar;