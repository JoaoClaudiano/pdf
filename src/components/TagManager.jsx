import React, { useState } from 'react';
import { usePDFs } from '../hooks/usePDFs';

function TagManager({ tags, selectedTag, onSelectTag }) {
  const { addTag } = usePDFs();
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    await addTag(newTagName.trim());
    setNewTagName('');
  };

  return (
    <div className="tag-manager">
      <h3>Tags</h3>
      <ul>
        <li className={!selectedTag ? 'selected' : ''} onClick={() => onSelectTag(null)}>
          Todas
        </li>
        {tags?.map(tag => (
          <li
            key={tag.id}
            className={selectedTag === tag.id ? 'selected' : ''}
            onClick={() => onSelectTag(tag.id)}
          >
            #{tag.name}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Nova tag..."
        />
        <button onClick={handleAddTag}>+</button>
      </div>
    </div>
  );
}

export default TagManager;
