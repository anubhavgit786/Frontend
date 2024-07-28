import React from 'react';
import { pizzaData } from './data';

const Header = ()=>
{
  return (
  <header className='header'>
    <h1>Fast React Pizza Co.</h1>
  </header>)
}

const Pizza = ({ name, photoName, ingredients, price, soldOut })=>
{
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
    <img src={photoName} alt={name} />
    <div>
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span>{ soldOut ? "SOLD OUT" : price }</span>
    </div>
  </li>);
}

const Pizzas = ()=>
{
  return (<>
  <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
  <ul className='pizzas'>
    { pizzaData.map((pizza, i)=> (<Pizza key={i} 
                                          name={pizza.name} 
                                          photoName={pizza.photoName} 
                                          ingredients={pizza.ingredients} 
                                          price={pizza.price} 
                                          soldOut={pizza.soldOut}  /> ) ) }
    </ul>
    </>);
}

const Menu = ()=>
{
    return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? ( <Pizzas/> ): (<p>We're still working on our menu. Please come back later :)</p>)}
    </main>);
}

const Order = ({ closeHour, openHour })=> 
{
  return (
    <div className="order">
      <p>We're open from {openHour}:00 to {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

const Closed = ({ closeHour, openHour })=>
{
  return (<p>We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>);
}

const Footer = ()=>
{
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
 
  return (
    <footer className="footer">
      {isOpen ? (<Order closeHour={closeHour} openHour={openHour} />) : ( <Closed closeHour={closeHour} openHour={openHour} />)}
    </footer>)
}

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Menu/>
      <Footer/>
    </div>
  );
}

export default App;
