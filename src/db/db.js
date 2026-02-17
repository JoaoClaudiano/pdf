import Dexie from 'dexie';

export const db = new Dexie('pdfLibrary');

db.version(1).stores({
  pdfs: '++id, name, size, groupId, tags, uploadedAt',
  groups: '++id, name, createdAt',
  tags: '++id, name, count'
});

// Relação muitos-para-muitos na prática: armazenamos array de IDs de tags no pdf
// Para grupos, é one-to-many: cada pdf pertence a um grupo (ou null)
