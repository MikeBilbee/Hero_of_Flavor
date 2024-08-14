import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoTextImage from '../images/assets/LogoText.png'

const Home = () => {
  return (
    <div style={styles.container} className='bannerContainer'>
      <img alt='Logo with Title' src={logoTextImage} id='logoText'></img>
      <Link to="/recipes">
        <button style={styles.button}>View All Recipes Here</button>
      </Link>
      <h2>Featured Recipes</h2>
      <div style={styles.featuredRecipes}>
        <div style={styles.recipeCard}>Recipe</div>
        <div style={styles.recipeCard}>Recipe</div>
        <div style={styles.recipeCard}>Recipe</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#394043',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '20px 0',
    fontSize: '25px',
    cursor: 'pointer',
    borderRadius: '15px',
    fontFamily: 'HyliaSerif',
    letterSpacing: '1px'
  },
  featuredRecipes: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: '20px',
    width: '150px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
  },
};

export default Home;
