import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    const postUrls = posts.map((post) => ({
        url: `https://hexphyre.com/blog/${post.slug}`,
        lastModified: new Date(post.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {
            url: 'https://hexphyre.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://hexphyre.com/#technology',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://hexphyre.com/#posts',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://hexphyre.com/#about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...postUrls,
    ];
}
