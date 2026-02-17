import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFViewer({ pdf, tags, groups, onUpdateTags, onMoveToGroup }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTags, setSelectedTags] = useState(pdf.tags || []);
  const [selectedGroup, setSelectedGroup] = useState(pdf.groupId || '');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSaveTags = () => {
    onUpdateTags(selectedTags);
  };

  const handleGroupChange = (e) => {
    const groupId = e.target.value || null;
    setSelectedGroup(groupId);
    onMoveToGroup(groupId);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-metadata">
        <h2>{pdf.name}</h2>
        <div>
          <label>Grupo:</label>
          <select value={selectedGroup || ''} onChange={handleGroupChange}>
            <option value="">Sem grupo</option>
            {groups?.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
        <div>
          <label>Tags:</label>
          <div className="tag-editor">
            {tags?.map(tag => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                />
                {tag.name}
              </label>
            ))}
          </div>
          <button onClick={handleSaveTags}>Salvar Tags</button>
        </div>
      </div>

      <div className="pdf-container">
        <Document
          file={new Uint8Array(pdf.data)}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Carregando PDF..."
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Página {pageNumber} de {numPages}
        </p>
        <div className="page-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Anterior
          </button>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
