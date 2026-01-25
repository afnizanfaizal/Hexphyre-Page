import Hero from '@/components/Hero';
import Technology from '@/components/Technology';
import PostList from '@/components/PostList';
import About from '@/components/About';
import { getAllPosts } from '@/lib/posts';
import { getSettings } from '@/lib/settings';
import styles from '@/components/PostList.module.css';

export default async function Home() {
  const [posts, settings] = await Promise.all([
    getAllPosts(),
    getSettings()
  ]);

  return (
    <div>
      <Hero settings={settings} />
      <Technology />
      <section id="posts" className={styles.section} style={{ scrollMarginTop: 'var(--header-height)' }}>
        <PostList initialPosts={posts} />
      </section>
      <About />
    </div>
  );
}
