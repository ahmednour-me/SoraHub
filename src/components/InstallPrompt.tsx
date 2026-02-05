import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{t('installApp')}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t('installPrompt')}</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={handleInstall}>
              {t('installButton')}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              {t('installDismiss')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
