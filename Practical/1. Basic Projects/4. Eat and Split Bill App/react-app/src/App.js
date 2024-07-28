import React, { useState } from 'react';
import { initialFriends } from './data';


const Button = ({ children, onClick })=>
{
  return (  <button className='button' onClick={onClick}>{children}</button>)
}

const FormSplitBill = ({ selectedFriend, onSplitBill })=>
{
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    if(!bill || !paidByUser)
    {
      return;
    }

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);

  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit} >
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input type='text' value={bill} onChange={(e)=> setBill(Number(e.target.value))} />

      <label>🕴🏻Your expense</label>
      <input type='text' value={paidByUser} onChange={(e)=> setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
  
      <label>🧑‍🤝‍🧑{selectedFriend.name}'s expense</label>
      <input type='text' disabled value={paidByFriend} />

      <label>🤑Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={(e)=> setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>)
  
}

const FormAddFriend = ({ onAddFriend })=>
{
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  
  const handleSubmit = (e)=>
  {
    e.preventDefault();

    if(!name || !image)
    {
      return;
    }

    const id = crypto.randomUUID();
    const newFriend = { name, image : `${image}?=${id}`, balance: 0, id };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
  <form className='form-add-friend'onSubmit={handleSubmit}>
    
    <label>🧑‍🤝‍🧑Friend Name</label>
    <input type='text' value={name} onChange={(e)=> setName(e.target.value)} />

    <label>🌄Image URL</label>
    <input type='text' value={image} onChange={(e)=> setImage(e.target.value)} />
    <Button>Add</Button>
  </form>)
}

const Friend = ({ friend, onSelction, selectedFriend })=>
{
  const isSelected = selectedFriend && selectedFriend.id === friend.id;
  return (
  <li className={ isSelected ? "selected" : "" }>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    { friend.balance < 0 && (<p className='red'> You owe {friend.name} {Math.abs(friend.balance)} € </p>)}
    { friend.balance > 0 && (<p className='green'>  {friend.name} owes you {friend.balance} € </p>)}
    { friend.balance === 0 && (<p> You and  {friend.name} are even. </p>)}
    <Button onClick={()=> onSelction(friend)} >{ isSelected ? "Close" : "Select" }</Button>
  </li>);
}


const FriendList = ({ friends, onSelction, selectedFriend })=>
{
  

  return (
  <ul>
    { friends.map((friend)=> <Friend key={friend.id} friend={friend} onSelction={onSelction} selectedFriend={selectedFriend} />)}
  </ul>);
}

const App = () => 
{
  const [friends, setFriends]= useState(initialFriends);
  const [selectedFriend, setSelectedFriend]= useState(null);

  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  
  const handleShowAddFriend = ()=>
  {
    setShowAddFriendForm((show)=> !show);
    setSelectedFriend(null);
  }

  const handleAddFriend = (friend)=>
  {
    setFriends((friends)=> [...friends, friend]);
    setShowAddFriendForm(false);
  }

  const handleSelection = (friend)=>
  {
    setSelectedFriend(selectedFriend => selectedFriend && selectedFriend.id === friend.id ? null: friend);
    setShowAddFriendForm(false);
  }

  const handleSplitBill = (value)=>
  {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
    setSelectedFriend(null);
  }

  return (
    <div className='app'>
     <div className='sidebar'>
      <FriendList friends={friends} onSelction={handleSelection} selectedFriend={selectedFriend}/>
      { showAddFriendForm && (<FormAddFriend onAddFriend={handleAddFriend} />)}
      <Button onClick={handleShowAddFriend}>{showAddFriendForm ? "Close" : "Add Friend"}</Button>
     </div>
     { selectedFriend && (<FormSplitBill selectedFriend={selectedFriend} key={selectedFriend.id} onSplitBill={handleSplitBill} />)}
    </div>
  );
}

export default App;
