'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
    getDailyStats,
    getCountryStats,
    getTopPosts,
    DailyStats,
    CountryStat,
    PostView
} from '@/lib/analytics';
import { VisitorChart, CountryStats, TopPostsList } from './components/AnalyticsCharts';
import styles from './admin.module.css';

export default function AdminPage() {
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        categories: 0
    });

    const [analytics, setAnalytics] = useState<{
        daily: DailyStats[];
        countries: CountryStat[];
        topPosts: PostView[];
    }>({
        daily: [],
        countries: [],
        topPosts: []
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData() {
        setLoading(true);
        try {
            const [categoriesData, daily, countries, top] = await Promise.all([
                import('@/lib/taxonomy').then(m => m.getCategories()),
                getDailyStats(),
                getCountryStats(),
                getTopPosts(5)
            ]);

            setStats({
                categories: categoriesData.length
            });

            setAnalytics({
                daily,
                countries,
                topPosts: top
            });
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.mainCol}>
                <section className={styles.welcomeSection}>
                    <div className={styles.welcomeText}>
                        <h1>Welcome back, Admin.</h1>
                        <p>Here&apos;s what&apos;s happening with your portfolio today.</p>
                    </div>
                    <Link href="/admin/posts/new" className={styles.btnNewPost}>
                        <span>+</span> New Post
                    </Link>
                </section>



                <div style={{ marginTop: '2.5rem' }}>
                    <VisitorChart data={analytics.daily} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2.5rem', marginTop: '2.5rem' }}>
                    <CountryStats data={analytics.countries} />
                    <TopPostsList data={analytics.topPosts} />
                </div>
            </div>
        </div>
    );
}
