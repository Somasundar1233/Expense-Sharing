import React from 'react';

export default function AdminDashboard({ users, groups, expenses, onDeleteExpense }) {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="card flex-column">
      <h2>Admin Dashboard & Analytics</h2>
      <div className="flex-row" style={{ gap: '1rem' }}>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h4>Total Users</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{users.length}</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h4>Total Groups</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{groups.length}</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h4>Total Spent</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs {totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <h3>All Expense Activity Log</h3>
      <ul className="history-list">
        {expenses.map((exp) => {
          const payer = users.find((u) => u.id === exp.paidBy)?.name || 'Unknown';
          const group = groups.find((g) => g.id === exp.groupId)?.name || 'Unknown Group';
          return (
            <li key={exp.id} className="history-item flex-row">
              <div>
                <strong>{exp.description}</strong> - ${exp.amount.toFixed(2)}
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Paid by: {payer} | Group: {group} | Date: {exp.date}
                </div>
              </div>
              <button className="danger-btn" onClick={() => onDeleteExpense(exp.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}