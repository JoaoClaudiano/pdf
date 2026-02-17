import React, { useState } from 'react';
import { usePDFs } from '../hooks/usePDFs';

function GroupList({ groups, selectedGroup, onSelectGroup }) {
  const { addGroup } = usePDFs();
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return;
    await addGroup(newGroupName.trim());
    setNewGroupName('');
  };

  return (
    <div className="group-list">
      <h3>Grupos</h3>
      <ul>
        <li className={!selectedGroup ? 'selected' : ''} onClick={() => onSelectGroup(null)}>
          Todos
        </li>
        {groups?.map(group => (
          <li
            key={group.id}
            className={selectedGroup === group.id ? 'selected' : ''}
            onClick={() => onSelectGroup(group.id)}
          >
            {group.name}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Novo grupo..."
        />
        <button onClick={handleAddGroup}>+</button>
      </div>
    </div>
  );
}

export default GroupList;
