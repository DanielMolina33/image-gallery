import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Header.css';

const Header = () => (
  <h1 className="header">
    <Link to="/">
      Image gallery
    </Link>
  </h1>
);

export default Header;