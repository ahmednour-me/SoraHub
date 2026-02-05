import { Zap, Shield, Layers, Wand2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Layers,
      titleKey: 'feature1Title',
      descKey: 'feature1Desc',
    },
    {
      icon: Zap,
      titleKey: 'feature2Title',
      descKey: 'feature2Desc',
    },
    {
      icon: Shield,
      titleKey: 'feature3Title',
      descKey: 'feature3Desc',
    },
    {
      icon: Wand2,
      titleKey: 'feature4Title',
      descKey: 'feature4Desc',
    },
  ];

  return (
    <div className="mt-12 space-y-6 animate-slide-up">
      <h2 className="text-xl font-bold text-center text-foreground">
        {t('featuresTitle')}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="feature-card text-center">
            <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-3">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {t(feature.titleKey)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t(feature.descKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
