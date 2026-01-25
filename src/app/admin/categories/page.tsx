'use client';

import { useState, useEffect } from 'react';
import { Taxonomy, getCategories, createCategory, updateCategory, deleteCategory, generateSlug } from '@/lib/taxonomy';
import styles from '../taxonomy.module.css';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Taxonomy[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        if (!editingId) {
            setSlug(generateSlug(val));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCategory(editingId, { name, slug, description });
            } else {
                await createCategory({ name, slug, description });
            }
            setName('');
            setSlug('');
            setDescription('');
            setEditingId(null);
            loadCategories();
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const handleEdit = (category: Taxonomy) => {
        setEditingId(category.id);
        setName(category.name);
        setSlug(category.slug);
        setDescription(category.description || '');
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"?`)) {
            try {
                await deleteCategory(id);
                loadCategories();
            } catch (error) {
                console.error('Failed to delete category:', error);
            }
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setName('');
        setSlug('');
        setDescription('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Categories</h1>
            </div>

            <div className={styles.grid}>
                <div className={styles.formCard}>
                    <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className={styles.input}
                            />
                            <p className={styles.helpText}>The name is how it appears on your site.</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className={styles.input}
                            />
                            <p className={styles.helpText}>
                                The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles.textarea}
                            />
                            <p className={styles.helpText}>
                                The description is not prominent by default; however, some themes may show it.
                            </p>
                        </div>
                        <div className={styles.actions}>
                            <button type="submit" className={styles.btnSubmit}>
                                {editingId ? 'Update Category' : 'Add New Category'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={handleCancel} className={styles.btnCancel}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className={styles.listCard}>
                    {loading ? (
                        <div style={{ padding: '2rem', color: '#a1a1aa' }}>Loading categories...</div>
                    ) : categories.length === 0 ? (
                        <div style={{ padding: '2rem', color: '#a1a1aa' }}>No categories found.</div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>NAME</th>
                                    <th style={{ width: '30%' }}>DESCRIPTION</th>
                                    <th style={{ width: '30%' }}>SLUG</th>
                                    <th style={{ width: '10%', textAlign: 'right' }}>COUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat.id}>
                                        <td className={styles.nameCell}>
                                            <strong>{cat.name}</strong>
                                            <div className={styles.actionsCell}>
                                                <button onClick={() => handleEdit(cat)} className={styles.actionBtn}>
                                                    Edit
                                                </button>
                                                <span className={styles.separator}>|</span>
                                                <button onClick={() => handleDelete(cat.id, cat.name)} className={styles.actionBtn}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                        <td>{cat.description || '—'}</td>
                                        <td>{cat.slug}</td>
                                        <td style={{ textAlign: 'right' }}>{cat.count || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
