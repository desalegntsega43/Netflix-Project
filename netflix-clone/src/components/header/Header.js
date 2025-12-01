import React from 'react'
import '../header/header.css'
import netflixLogo from '../../assets/image/netflixLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  return (
    <div>
      <div className="header-container">

        <div className="header-left">
          <div className="tv-shows">
            <img src={netflixLogo} alt="Netflix logo" width="100%" />

            <a href="#">Netflix</a>
            <a href="#">Home</a>
            <a href="#">TV Shows</a>
            <a href="#">Movies</a>
            <a href="#">Latest</a>
            <a href="#">Mylist</a>
            <a href="#">Movies</a>
            <a href="#">Browse by Languages</a>
          </div>
        </div>

        <div className="header-right">
            <div><SearchIcon /></div>
            <div><CircleNotificationsIcon /></div>
            <div><AccountBoxIcon /></div>
            <div><ArrowDropDownIcon /></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
