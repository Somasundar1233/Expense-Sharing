import React, { useState } from 'react';

export default function GroupModule({ users, groups, onAddGroup }) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName || selectedMembers.length === 0) return;
    onAddGroup({
      id: Date.now().toString(),
      name: groupName,
      members: selectedMembers,
    });
    setGroupName('');
    setSelectedMembers([]);
  };

  return (
    <section className="card flex-column">
      <h2>Group Management</h2>
      <form onSubmit={handleCreateGroup} className="flex-column">
        <input 
          type="text" 
          placeholder="Group Name" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
          required 
        />
        
        <fieldset style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
          <legend style={{ fontSize: '0.85rem' }}>Select Members</legend>
          {users.map((u) => (
            <label key={u.id} className="flex-row" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <input 
                type="checkbox" 
                checked={selectedMembers.includes(u.id)} 
                onChange={() => toggleMember(u.id)} 
              />
              {u.name}
            </label>
          ))}
        </fieldset>

        <button type="submit">Create Group</button>
      </form>

      <div>
        <h3>Existing Groups</h3>
        <ul className="history-list">
          {groups.map((g) => (
            <li key={g.id} className="history-item flex-row">
              <strong>{g.name}</strong>
              <span className="badge">{g.members.length} Members</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}