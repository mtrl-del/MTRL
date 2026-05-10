import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    projectId: "ai-studio-applet-webapp-5eac4",
    appId: "1:415638094814:web:82044a28996880f463934f",
    apiKey: "AIzaSyADygYO5UO6lIgoiXlAmo5oKBYAW6Mvkqg",
    authDomain: "ai-studio-applet-webapp-5eac4.firebaseapp.com",
    firestoreDatabaseId: "ai-studio-0455b3b9-8b1a-4b7a-9c3d-02dbde5c5da7",
    storageBucket: "ai-studio-applet-webapp-5eac4.firebasestorage.app",
    messagingSenderId: "415638094814"
};

async function updateCounter() {
    console.log("Visitor counter: Initializing...");
    
    // Safety check for browser environment
    if (typeof document === 'undefined') return;

    const counterEl = document.getElementById('visitorCount');
    if (!counterEl) {
        console.warn("Visitor counter: Element #visitorCount not found on this page.");
        return;
    }

    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
        const statsDoc = doc(db, 'stats', 'site');

        console.log("Visitor counter: Attempting to increment views...");
        
        try {
            // Optimistic update
            await updateDoc(statsDoc, {
                views: increment(1)
            });
        } catch (updateError) {
            console.log("Visitor counter: Update failed, trying setDoc (upsert)...", updateError.message);
            // Fallback to setDoc for creation or if updateDoc fails for other reasons
            await setDoc(statsDoc, { views: 1 }, { merge: true });
        }

        // Fetch back to display
        const snapshot = await getDoc(statsDoc);
        if (snapshot.exists()) {
            const count = snapshot.data().views || 0;
            counterEl.textContent = count.toLocaleString('en-US');
            console.log("Visitor counter: Successfully updated to", count);
        } else {
            console.warn("Visitor counter: Document was not found after update/set.");
            counterEl.textContent = "—";
        }

    } catch (error) {
        console.error("Visitor counter: Critical Error:", error);
        counterEl.textContent = "—";
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCounter);
} else {
    updateCounter();
}
