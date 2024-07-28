import React, { useState } from 'react';


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];


const Logo = ()=>
{
  return(<h1>🌴 Far Away 💼</h1>)
}

const Form = ({ onAddItem })=>
{
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  const amount = Array.from({ length: 20}, (_, i)=> i + 1);
  
  const handleSubmit = (e)=>
  {
    e.preventDefault();
    if(!description)
    {
      return;
    }

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setQuantity(1);
    setDescription("");
  }

  return(
  <form className='add-form' onSubmit={handleSubmit}>
    <h3>What you need for your 😍 trip?</h3>
    <select value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}>
      { amount.map((num)=> (<option value={num} key={num}>{num}</option>))}
    </select>
    <input type='text' placeholder='Item...' value={description} onChange={(e)=> setDescription(e.target.value)} />
    <button>Add</button>
  </form>)
}

const Item = ({ item, onDeleteItem, onToggleItem })=>
{
  return (<li>
    <input type='checkbox' checked={item.packed} onChange={()=> onToggleItem(item.id)} />
    <span style={ item.packed ? { textDecoration: "line-through"}: {}}>{item.quantity} {item.description}</span>
    <button onClick={()=> onDeleteItem(item.id)}>❌</button>
    </li>)
}

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList })=>
{
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if(sortBy === "input")
  {
    sortedItems = items;
  }
  
  if(sortBy === "description")
  {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }
  
  if(sortBy === "packed")
  {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
  <div className="list">
     <ul>
    { sortedItems.map((item)=> (<Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />))}
  </ul>
  <div className="actions">
    <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
      <option value={"input"}>Sort by input order</option>
      <option value={"description"}>Sort by description</option>
      <option value={"packed"}>Sort by packed status</option>
    </select>
    <button onClick={()=> onClearList()}>Clear List</button>
  </div>
  </div>)
}

const Ready = ()=>
{
  return(<em>You got everything! Ready to go ✈️</em>)
}

const PackingItems = ({numItems, numPackedItems, percentage})=>
{
  return (<em>💼 You have { numItems } items on your list, and you have already packed {numPackedItems} ({percentage}%)</em>);
}

const Footer = ()=>
{
  return ( 
  <footer className='footer'>
    <em>Start adding some items to your packing list 🚀</em>
  </footer>)
}

const Stats = ({ numItems, numPackedItems })=>
{
  if (numItems === 0)
  {
    return (<Footer/> );
  }

  const percentage = Math.round((numPackedItems / numItems) * 100);
   return (
   <footer className='stats'>
    { percentage === 100 ? (<Ready/> ) : (<PackingItems numItems={numItems} numPackedItems={numPackedItems} percentage={percentage} />) }
   </footer>)
}

const App = () => 
{
  const [items, setItems] = useState(initialItems);
  const packedItems = items.filter(item => item.packed === true);

  const handleAddItem = (item)=>
  {
    setItems((items)=> [...items, item]);
  }

  const handleDeleteItem = (id)=>
  {
    setItems((items)=> items.filter(item=> item.id !== id));
  }

  const handleToggleItem = (id)=>
  {
    setItems((items)=> items.map(item=> item.id === id ? {...item, packed: !item.packed} : item));
  }

  const handleClearList = ()=>
  {
    const confirmed = window.confirm('Are you sure you want to delete all the items?');
    if(confirmed)
    {
      setItems([]);
    }
    
  }

  return (
    <div className='app'>
     <Logo/>
     <Form onAddItem={handleAddItem}/>
     <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
     <Stats numItems={items.length} numPackedItems={packedItems.length}/>
    </div>
  )
}

export default App

