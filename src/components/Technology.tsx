import Image from 'next/image';
import styles from './Technology.module.css';

const TECH_ITEMS = [
    {
        number: '1',
        title: 'Intelligent Data Architectures',
        description: 'Purpose-built AI systems engineered for domain-specific reasoning, precision, and robustness across complex scientific and industrial environments.',
        image: '/data.jpg'
    },
    {
        number: '2',
        title: 'Integrated AI Infrastructure',
        description: 'An AI-native infrastructure with edge enabled and accelerated computing capabilities that orchestrates data flows, reasoning loops, and continuous learning at enterprise scale.',
        image: '/chip.jpg'
    },
    {
        number: '3',
        title: 'Applied Solution Deployment',
        description: 'An application layer that transforms core AI capabilities into scalable, production-ready applications across various industries including energy, healthcare, agriculture, and beyond.',
        image: '/applications.jpg'
    }
];

export default function Technology() {
    return (
        <section id="technology" className={styles.section} style={{ scrollMarginTop: 'var(--header-height)' }}>
            <div className={`container ${styles.container}`}>
                <span className={styles.label}>Our Technology</span>
                <h2 className={styles.heading}>
                    Our platform enables enterprise-scale <br />
                    <span>AI applications</span> for industries
                </h2>

                <div className={styles.grid}>
                    {TECH_ITEMS.map((item) => (
                        <div key={item.number} className={styles.card}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={styles.bgImage}
                            />
                            <div className={styles.overlay} />
                            <div className={styles.content}>
                                <h3 className={styles.title}>{item.title}</h3>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
