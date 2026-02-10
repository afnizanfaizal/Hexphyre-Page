import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface SiteSettings {
    siteTitle: string;
    siteDescription: string;
    adminEmail: string;
    socialLinks: {
        linkedin?: string;
        facebook?: string;
        instagram?: string;
    };
    heroLabel?: string;
    heroTitle: string;
    heroSubtitle: string;
}

const SETTINGS_DOC_ID = 'global_settings';

// Helper to get document ref safely
function getSettingsRef() {
    if (!db || typeof db.collection !== 'function' && Object.keys(db).length === 0) {
        return null;
    }
    return doc(db, 'settings', SETTINGS_DOC_ID);
}

export const DEFAULT_SETTINGS: SiteSettings = {
    siteTitle: 'HEXPHYRE TECHNOLOGIES',
    siteDescription: 'Inspiring future through advanced AI solutions, from predictive analytics to autonomous systems.',
    adminEmail: '',
    socialLinks: {
        linkedin: '',
        facebook: '',
        instagram: ''
    },
    heroLabel: '',
    heroTitle: 'DR AFNIZANFAIZAL',
    heroSubtitle: 'Inspiring future through advanced AI solutions, from predictive analytics to autonomous systems, that deliver measurable results.'
};

export async function getSettings(): Promise<SiteSettings> {
    try {
        const ref = getSettingsRef();
        if (!ref) return DEFAULT_SETTINGS;

        const snap = await getDoc(ref);
        if (snap.exists()) {
            return snap.data() as SiteSettings;
        }
        return DEFAULT_SETTINGS;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return DEFAULT_SETTINGS;
    }
}

export async function updateSettings(settings: Partial<SiteSettings>) {
    try {
        const ref = getSettingsRef();
        if (!ref) throw new Error('Firebase not initialized');

        const current = await getSettings();
        await setDoc(ref, { ...current, ...settings }, { merge: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
}
