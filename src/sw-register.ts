// Fichier pour enregistrer le service worker

export function registerServiceWorker() {
  // Check for StackBlitz environment first and exit early
  if (window.location.hostname.includes('stackblitz') || 
      window.location.href.includes('stackblitz.io') ||
      window.location.href.includes('webcontainer')) {
    console.log('Service Worker non supporté dans cet environnement (StackBlitz)');
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker enregistré avec succès:', registration.scope);
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
        });
    });
  }
}
