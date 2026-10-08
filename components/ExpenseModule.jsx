import React, { useState } from 'react';

export default function ExpenseModule({ users, groups, currentUser, onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupId, setGroupId] = useState('');
  const [splitType, setSplitType] = useState('EQUAL');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !currentUser || !groupId) return;

    onAddExpense({
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      paidBy: currentUser,
      groupId,
      splitType,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
  };

  return (
    <section className="card flex-column">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex-column">
        <input 
          type="text" 
          placeholder="Expense Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        
        <select value={groupId} onChange={(e) => setGroupId(e.target.value)} required>
          <option value="">-- Select Group --</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
          <option value="EQUAL">Equal Split</option>
          <option value="CUSTOM">Custom/Percentage Split</option>
        </select>

        <button type="submit">Record Expense</button>
      </form>
    </section>
  );
}