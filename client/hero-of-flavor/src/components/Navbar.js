import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>
        Hero of Flavor
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Recipe Tool</Link>
        <Link to="/recipes" style={styles.link}>View All Recipes</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#005033',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#eac03d',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#eac03d',
    fontSize: '18px',
  },
};

export default Navbar;
