'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/lib/posts';
import { Taxonomy, getCategories } from '@/lib/taxonomy';
import styles from './PostForm.module.css';
import RichTextEditor from './RichTextEditor';



interface PostFormProps {
    initialData?: BlogPost | null;
    onSubmit: (data: Omit<BlogPost, 'id' | 'createdAt'>) => Promise<void>;
    loading: boolean;
    title: string;
}

export default function PostForm({ initialData, onSubmit, loading, title }: PostFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || '',
    });
    const contentSize = useMemo(() => {
        // Estimate payload size (Firestore limit is 1MB)
        const payload = JSON.stringify({
            ...formData
        });
        return payload.length; // Approximate bytes for UTF-16 strings
    }, [formData]);

    const sizeWarning = contentSize > 800000; // Warn at 800KB

    const [availableCategories, setAvailableCategories] = useState<Taxonomy[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.categories || []);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const cats = await getCategories();
                setAvailableCategories(cats);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }
        fetchCategories();
    }, []);


    const toggleCategory = (categoryName: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'title' && !initialData && !formData.slug) {
            const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug: autoSlug }));
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final size check
        if (contentSize > 1000000) {
            alert('⚠️ IMAGE TOO LARGE: Direct pasting of large images is disabled to prevent data limits. Please use the "Featured Image" URL field or upload/link a smaller image.');
            return;
        }

        await onSubmit({
            ...formData,
            categories: selectedCategories,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h1>{title}</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" className={styles.btnPreview}>Preview</button>
                </div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.mainCol}>
                    <div className={styles.titleSection}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles.titleInput}
                            placeholder="Add title"
                            required
                        />
                    </div>

                    <div className={styles.editorWrapper}>
                        {contentSize > 1000000 && (
                            <div className={styles.criticalWarning} style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            }}>
                                <strong>⚠️ Post Too Large:</strong> You have exceeded the 1MB Firestore limit. This is usually caused by large images pasted directly into the editor. Please remove the images and use &quot;Featured Image&quot; or paste direct image URLs instead.
                            </div>
                        )}
                        <RichTextEditor
                            value={formData.content}
                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                            placeholder="Start writing your awesome story..."
                        />
                    </div>

                    <section className={styles.excerptSection}>
                        <label>Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            className={styles.excerptTextarea}
                            placeholder="Write a short summary..."
                        />
                        <p className={styles.excerptHelp}>
                            Excerpts are optional hand-crafted summaries of your content that can be used in your theme.
                        </p>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.widget}>
                        <div className={styles.widgetHeader}>
                            Publish
                            <span style={{ cursor: 'pointer', opacity: 0.5 }}>▼</span>
                        </div>
                        <div className={styles.widgetBody}>
                            <div className={styles.publishMeta}>
                                {/* Meta rows removed for cleaner UI */}
                            </div>
                            <div className={styles.publishActions}>
                                <button type="button" className={styles.btnSaveDraft}>Save Draft</button>
                                <button type="submit" className={styles.btnPublish} disabled={loading || contentSize > 1000000}>
                                    {loading ? 'Saving...' : 'Publish'}
                                </button>
                            </div>
                            {contentSize > 0 && (
                                <div className={styles.sizeIndicator} style={{
                                    color: contentSize > 1000000 ? '#ef4444' : (sizeWarning ? '#f59e0b' : '#6b7280'),
                                    fontSize: '0.75rem',
                                    marginTop: '0.75rem',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }}>
                                    Payload Size: {(contentSize / 1024).toFixed(1)} KB / 1024 KB
                                    {sizeWarning && <div style={{ marginTop: '0.25rem' }}>⚠️ Approaching limit!</div>}
                                </div>
                            )}
                        </div>
                        <div className={styles.widgetFooter}>
                            <button type="button" className={styles.btnTrash}>Move to Trash</button>
                        </div>
                    </div>



                    <div className={styles.widget}>
                        <div className={styles.widgetHeader}>Categories</div>
                        <div className={styles.widgetBody}>
                            <div className={styles.categoryList}>
                                {availableCategories.map(cat => (
                                    <label key={cat.id} className={styles.categoryItem}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.name)}
                                            onChange={() => toggleCategory(cat.name)}
                                        />
                                        {cat.name}
                                    </label>
                                ))}
                                {availableCategories.length === 0 && (
                                    <p className={styles.emptyText}>No categories found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.widget}>
                        <div className={styles.widgetHeader}>Featured Image</div>
                        <div className={styles.widgetBody}>
                            <div className={styles.tagInputBox}>
                                <input
                                    type="url"
                                    placeholder="Paste image URL (Unsplash, etc.)"
                                    value={formData.coverImage}
                                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                    className={styles.tagInput}
                                />
                                <button type="button" className={styles.btnAddTag}>Set</button>
                            </div>
                            <p className={styles.tagHelp}>Paste a direct link to an image.</p>

                            {formData.coverImage && (
                                <div className={styles.imagePreview}>
                                    <img
                                        src={formData.coverImage}
                                        alt="Featured"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 'inherit'
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </form>
    );
}
