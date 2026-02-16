import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export async function submitContactForm(data: any) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "54ecb307-eec9-4652-a8b8-6f3fec42099a",
        ...data,
      }),
    });

    const result = await response.json();
    if (result.success) {
      return { success: true };
    } else {
      console.error('Web3Forms error:', result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
}

export async function getProjects() {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('No projects found');
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Fallback static projects based on Aatif's updated data
    return [
      {
        id: '1',
        title: 'Workforce One Solutions',
        description: 'A comprehensive professional business ecosystem developed for service-based operations. I architected a responsive UI with a focus on user-centric design to streamline client interaction and service presentation.',
        tags: ['Web Architecture', 'Business Logic'],
        image: 'data:image/jpeg;base64,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',
        link: 'https://www.workforceoneit.com/'
      },
      {
        id: '2',
        title: 'Presence Track',
        description: 'A sophisticated web-based attendance management system. I engineered real-time form handling and a dynamic dashboard to simplify the process of recording and auditing attendance through a modern, mobile-first interface.',
        tags: ['System Design', 'Real-time UI'],
        image: '/images/presencetrack.png',
        link: 'https://presencetrack-five.vercel.app/'
      },
      {
        id: '3',
        title: 'KMR PrepVault',
        description: 'An educational resource portal designed to bridge the gap between students and quality study material. I implemented a structured content delivery system with a minimalist, distraction-free UI to optimize student learning workflows.',
        tags: ['Ed-Tech', 'Content Strategy'],
        image: '/images/prepvault.png',
        link: 'https://kmr-prepvault.vercel.app/'
      },
      {
        id: '4',
        title: 'CUK-IT Portal',
        description: 'A university-style digital hub for IT services. I developed this portal using advanced multi-page navigation and modular layouts, demonstrating how institutional services can be modernized for better accessibility.',
        tags: ['UI Engineering', 'Accessibility'],
        image: '/images/cukweb.png',
        link: 'https://cuk-it.vercel.app/'
      }
    ];
  }
}
