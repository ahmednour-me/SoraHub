import { Moon, Sun, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="text-center py-6 space-y-4 animate-slide-up">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="gap-2"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'عربي' : 'EN'}
          </Button>
        </div>
        
        <a
          href="https://ahmednour.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {t('developer')}: {t('developerName')}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Logo & Title */}
      <div className="flex items-center justify-center gap-4">
        <img 
          src="/logo.png" 
          alt="SoraHub Logo" 
          className="w-16 h-16 object-contain"
        />
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">{t('appName')}</span>
          </h1>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-lg mx-auto text-sm">
        {t('tagline')}
      </p>
    </header>
  );
};
