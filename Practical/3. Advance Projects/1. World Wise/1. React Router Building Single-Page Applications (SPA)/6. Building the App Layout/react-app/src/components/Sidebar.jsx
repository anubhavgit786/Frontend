import React from 'react';
import Logo from "./Logo";
import AppNav from './AppNav';
import Footer from './Footer';

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav />
      <p>List of Cities</p>
      <Footer />
    </div>
  );
}

export default Sidebar;
