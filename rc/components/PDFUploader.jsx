import React, { useState } from 'react';

function PDFUploader({ onUpload, groups, tags }) {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await onUpload(file, selectedGroup || null, selectedTags);
    e.target.value = ''; // reset
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="uploader">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>Grupo (opcional):</label>
        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="">Sem grupo</option>
          {groups?.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <div>
        <label>Tags:</label>
        <div className="tag-selector">
          {tags?.map(tag => (
            <label key={tag.id}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PDFUploader;
