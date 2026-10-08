import React, { useState, useEffect } from 'react';
import UserModule from './components/UserModule';
import GroupModule from './components/GroupModule';
import ExpenseModule from './components/ExpenseModule';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [groups, setGroups] = useState(() => JSON.parse(localStorage.getItem('groups')) || []);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses')) || []);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddUser = (user) => setUsers((prev) => [...prev, user]);
  const handleAddGroup = (group) => setGroups((prev) => [...prev, group]);
  const handleAddExpense = (expense) => setExpenses((prev) => [...prev, expense]);
  const handleDeleteExpense = (id) => setExpenses((prev) => prev.filter((exp) => exp.id !== id));

  return (
    <div>
      <header>
        <h1>PS26: Expense Sharing Application</h1>
        <p>Collaborative Financial Tracking Platform</p>
      </header>

      <main className="layout-grid">
        <div className="flex-column">
          <UserModule 
            users={users} 
            onAddUser={handleAddUser} 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
          <GroupModule 
            users={users} 
            groups={groups} 
            onAddGroup={handleAddGroup} 
          />
          <ExpenseModule 
            users={users} 
            groups={groups} 
            currentUser={currentUser} 
            onAddExpense={handleAddExpense} 
          />
        </div>

        <div>
          <AdminDashboard 
            users={users} 
            groups={groups} 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
        </div>
      </main>
    </div>
  );
}