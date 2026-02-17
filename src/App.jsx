import React, { useState } from 'react';
import { usePDFs } from './hooks/usePDFs';
import PDFUploader from './components/PDFUploader';
import GroupList from './components/GroupList';
import TagManager from './components/TagManager';
import PDFViewer from './components/PDFViewer';
import './index.css';

function App() {
  const { pdfs, groups, tags, addPDF, movePDFToGroup, updatePDFTags } = usePDFs();
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [filterGroup, setFilterGroup] = useState(null);
  const [filterTag, setFilterTag] = useState(null);

  const filteredPDFs = pdfs?.filter(pdf => {
    if (filterGroup && pdf.groupId !== filterGroup) return false;
    if (filterTag && !pdf.tags.includes(filterTag)) return false;
    return true;
  });

  return (
    <div className="app">
      <header>
        <h1>📚 Minha Biblioteca PDF</h1>
        <PDFUploader onUpload={addPDF} groups={groups} tags={tags} />
      </header>

      <div className="main-panel">
        <aside className="sidebar">
          <GroupList
            groups={groups}
            selectedGroup={filterGroup}
            onSelectGroup={setFilterGroup}
          />
          <TagManager
            tags={tags}
            selectedTag={filterTag}
            onSelectTag={setFilterTag}
          />
        </aside>

        <section className="pdf-list">
          <h2>PDFs {filterGroup && `no grupo ${groups?.find(g => g.id === filterGroup)?.name}`}
              {filterTag && ` com tag #${tags?.find(t => t.id === filterTag)?.name}`}</h2>
          <ul>
            {filteredPDFs?.map(pdf => (
              <li key={pdf.id} onClick={() => setSelectedPDF(pdf)}>
                <span>{pdf.name}</span>
                <small>
                  {groups?.find(g => g.id === pdf.groupId)?.name && ` (${groups.find(g => g.id === pdf.groupId).name})`}
                </small>
                <div className="pdf-tags">
                  {pdf.tags.map(tagId => {
                    const tag = tags?.find(t => t.id === tagId);
                    return tag ? <span key={tagId} className="tag">#{tag.name}</span> : null;
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="pdf-viewer-panel">
          {selectedPDF ? (
            <PDFViewer
              pdf={selectedPDF}
              tags={tags}
              groups={groups}
              onUpdateTags={(tagIds) => updatePDFTags(selectedPDF.id, tagIds)}
              onMoveToGroup={(groupId) => movePDFToGroup(selectedPDF.id, groupId)}
            />
          ) : (
            <p>Selecione um PDF para visualizar</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
