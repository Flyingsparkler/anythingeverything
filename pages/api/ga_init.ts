import ReactGA from ‘react-ga4';

export const gaEnvKey = ‘GTMID’;

const ga = {
    initGoogleAnalytics() {
        const trackingId = process.env[gaEnvKey];
        if (!trackingId) console.warn("No tracking id is found for Google Analytics")

        ReactGA.initialize([
            {
                trackingId,
                gaOptions: {
                    anonymizeIp: true,
                    clientId: generateClientIdGa()
                }
            }
        ]);
    }
};

export default ga;