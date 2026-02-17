import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export function usePDFs() {
  const pdfs = useLiveQuery(() => db.pdfs.toArray());
  const groups = useLiveQuery(() => db.groups.toArray());
  const tags = useLiveQuery(() => db.tags.toArray());

  const addPDF = async (file, groupId = null, tagIds = []) => {
    await db.pdfs.add({
      name: file.name,
      size: file.size,
      data: await file.arrayBuffer(), // armazena o binário
      groupId,
      tags: tagIds,
      uploadedAt: new Date()
    });
  };

  const updatePDFTags = async (pdfId, tagIds) => {
    await db.pdfs.update(pdfId, { tags: tagIds });
  };

  const movePDFToGroup = async (pdfId, groupId) => {
    await db.pdfs.update(pdfId, { groupId });
  };

  const addGroup = async (name) => {
    const id = await db.groups.add({ name, createdAt: new Date() });
    return id;
  };

  const addTag = async (name) => {
    const existing = await db.tags.where('name').equals(name).first();
    if (existing) return existing.id;
    const id = await db.tags.add({ name, count: 0 });
    return id;
  };

  return {
    pdfs,
    groups,
    tags,
    addPDF,
    updatePDFTags,
    movePDFToGroup,
    addGroup,
    addTag
  };
}
