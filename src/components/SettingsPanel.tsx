import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ConversionSettings } from '@/types/image';
import { FormatSelector } from './FormatSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Minimize2, 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical, 
  Palette,
  Sun,
  Contrast
} from 'lucide-react';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onUpdateSettings: (settings: Partial<ConversionSettings>) => void;
}

export const SettingsPanel = ({ settings, onUpdateSettings }: SettingsPanelProps) => {
  const { t } = useLanguage();
  const supportsQuality = settings.format === 'jpeg' || settings.format === 'webp';

  return (
    <div className="space-y-4">
      {/* Format Selection */}
      <div className="control-section">
        <FormatSelector
          selectedFormat={settings.format}
          onFormatSelect={(format) => onUpdateSettings({ format })}
        />
      </div>

      {/* Quality & Compression */}
      <div className="control-section space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{t('compression')}</span>
          </div>
          <Switch
            checked={settings.compression}
            onCheckedChange={(checked) => onUpdateSettings({ compression: checked })}
          />
        </div>

        {supportsQuality && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('quality')}</span>
              <span className="font-bold text-primary">{settings.quality}%</span>
            </div>
            <Slider
              value={[settings.quality]}
              onValueChange={(value) => onUpdateSettings({ quality: value[0] })}
              min={10}
              max={100}
              step={5}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t('smallerSize')}</span>
              <span>{t('higherQuality')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Resize */}
      <div className="control-section space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{t('resize')}</span>
          </div>
          <Switch
            checked={settings.resize}
            onCheckedChange={(checked) => onUpdateSettings({ resize: checked })}
          />
        </div>

        {settings.resize && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">{t('width')}</label>
              <Input
                type="number"
                value={settings.resizeWidth}
                onChange={(e) => onUpdateSettings({ resizeWidth: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t('height')}</label>
              <Input
                type="number"
                value={settings.resizeHeight}
                onChange={(e) => onUpdateSettings({ resizeHeight: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Switch
                checked={settings.maintainAspectRatio}
                onCheckedChange={(checked) => onUpdateSettings({ maintainAspectRatio: checked })}
              />
              <span className="text-xs text-muted-foreground">{t('maintainAspect')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Transform */}
      <div className="control-section space-y-3">
        <span className="text-sm font-semibold text-foreground">{t('transforms')}</span>
        
        <div className="flex flex-wrap gap-2">
          {[0, 90, 180, 270].map((angle) => (
            <button
              key={angle}
              onClick={() => onUpdateSettings({ rotate: angle })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                settings.rotate === angle
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <RotateCw className="w-4 h-4" style={{ transform: `rotate(${angle}deg)` }} />
              {angle}°
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdateSettings({ flipHorizontal: !settings.flipHorizontal })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              settings.flipHorizontal
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <FlipHorizontal className="w-4 h-4" />
            {t('flipHorizontal')}
          </button>
          <button
            onClick={() => onUpdateSettings({ flipVertical: !settings.flipVertical })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              settings.flipVertical
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <FlipVertical className="w-4 h-4" />
            {t('flipVertical')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="control-section space-y-4">
        <span className="text-sm font-semibold text-foreground">{t('filters')}</span>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{t('grayscale')}</span>
          </div>
          <Switch
            checked={settings.grayscale}
            onCheckedChange={(checked) => onUpdateSettings({ grayscale: checked })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{t('brightness')}</span>
            </div>
            <span className="font-medium text-primary">{settings.brightness}%</span>
          </div>
          <Slider
            value={[settings.brightness]}
            onValueChange={(value) => onUpdateSettings({ brightness: value[0] })}
            min={50}
            max={150}
            step={5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{t('contrast')}</span>
            </div>
            <span className="font-medium text-primary">{settings.contrast}%</span>
          </div>
          <Slider
            value={[settings.contrast]}
            onValueChange={(value) => onUpdateSettings({ contrast: value[0] })}
            min={50}
            max={150}
            step={5}
          />
        </div>
      </div>
    </div>
  );
};
