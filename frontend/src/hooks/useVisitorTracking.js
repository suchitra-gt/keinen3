import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const useVisitorTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Get or create session ID
        let sessionId = localStorage.getItem('keinen_session_id');
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('keinen_session_id', sessionId);
        }

        const trackVisit = async () => {
            console.log('[TRACKER] Recording visit to:', location.pathname);
            try {
                const response = await fetch('http://localhost:5000/api/track-visit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId,
                        page: location.pathname
                    })
                });
                if (response.ok) {
                    console.log('[TRACKER] Visit recorded successfully');
                }
            } catch (error) {
                console.error('[TRACKER ERROR] Could not reach server:', error);
            }
        };

        trackVisit();
    }, [location.pathname]);
};

export default useVisitorTracking;
