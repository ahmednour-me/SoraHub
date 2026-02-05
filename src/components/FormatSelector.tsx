import { Check } from 'lucide-react';
import { formats, formatCategories } from '@/types/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatSelect: (format: string) => void;
}

export const FormatSelector = ({ selectedFormat, onFormatSelect }: FormatSelectorProps) => {
  const { t, language } = useLanguage();
  
  const getCategoryLabel = (category: string) => {
    if (category === 'شائع') return t('common');
    if (category === 'متقدم') return t('advanced');
    return category;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">
        {language === 'ar' ? 'صيغة الإخراج' : 'Output Format'}
      </h3>
      
      {formatCategories.map((category) => (
        <div key={category} className="space-y-2">
          <p className="text-xs text-muted-foreground">{getCategoryLabel(category)}</p>
          <div className="flex flex-wrap gap-2">
            {formats
              .filter((f) => f.category === category)
              .map((format) => (
                <button
                  key={format.id}
                  onClick={() => onFormatSelect(format.id)}
                  className={`format-chip flex items-center gap-2 ${
                    selectedFormat === format.id ? 'selected' : ''
                  }`}
                >
                  {selectedFormat === format.id && (
                    <Check className="w-3 h-3 text-primary" />
                  )}
                  <span className="font-semibold text-foreground text-sm">{format.name}</span>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
