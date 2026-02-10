import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface Taxonomy {
    id: string;
    name: string;
    slug: string;
    description?: string;
    count?: number; // Number of posts using this taxonomy
}

// Helper to generate slug
export const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Helper to get collection ref safely
function getCollection(name: string) {
    if (!db || Object.keys(db).length === 0) return null;
    return collection(db, name);
}

// Categories CRUD
export async function getCategories(): Promise<Taxonomy[]> {
    const col = getCollection('categories');
    if (!col) return [];
    const q = query(col, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Taxonomy));
}

export async function createCategory(data: Omit<Taxonomy, 'id'>) {
    const col = getCollection('categories');
    if (!col) throw new Error('Firebase not initialized');
    const docRef = await addDoc(col, data);
    return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Taxonomy>) {
    if (!db || Object.keys(db).length === 0) throw new Error('Firebase not initialized');
    const docRef = doc(db, 'categories', id);
    await updateDoc(docRef, data);
}

export async function deleteCategory(id: string) {
    if (!db || Object.keys(db).length === 0) throw new Error('Firebase not initialized');
    const docRef = doc(db, 'categories', id);
    await deleteDoc(docRef);
}

// Tags CRUD
export async function getTags(): Promise<Taxonomy[]> {
    const col = getCollection('tags');
    if (!col) return [];
    const q = query(col, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Taxonomy));
}

export async function createTag(data: Omit<Taxonomy, 'id'>) {
    const col = getCollection('tags');
    if (!col) throw new Error('Firebase not initialized');
    const docRef = await addDoc(col, data);
    return docRef.id;
}

export async function updateTag(id: string, data: Partial<Taxonomy>) {
    if (!db || Object.keys(db).length === 0) throw new Error('Firebase not initialized');
    const docRef = doc(db, 'tags', id);
    await updateDoc(docRef, data);
}

export async function deleteTag(id: string) {
    if (!db || Object.keys(db).length === 0) throw new Error('Firebase not initialized');
    const docRef = doc(db, 'tags', id);
    await deleteDoc(docRef);
}
