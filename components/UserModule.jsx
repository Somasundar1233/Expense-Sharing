import React, { useState } from 'react';

export default function UserModule({ users, onAddUser, currentUser, setCurrentUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onAddUser({ id: Date.now().toString(), name, email });
    setName('');
    setEmail('');
  };

  return (
    <section className="card flex-column">
      <h2>User Profile & Registration</h2>
      
      <form onSubmit={handleSubmit} className="flex-column">
        <input 
          type="text" 
          placeholder="User Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Register / Add User</button>
      </form>

      <div>
        <h3>Select Active User</h3>
        <select 
          value={currentUser} 
          onChange={(e) => setCurrentUser(e.target.value)}
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          <option value="">-- Select Active User --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
          ))}
        </select>
      </div>
    </section>
  );
}