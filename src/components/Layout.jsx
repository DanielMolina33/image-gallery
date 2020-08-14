import React from 'react';

import Header from './header';

const Layout = ({children}) => (
  <div className="container">
    <Header/>
    {children}
  </div>
);

export default Layout;