import { Slider } from '@/components/ui/slider';

interface QualitySliderProps {
  quality: number;
  onQualityChange: (value: number) => void;
}

export const QualitySlider = ({ quality, onQualityChange }: QualitySliderProps) => {
  return (
    <div className="space-y-4 glass-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">جودة الصورة</h3>
        <span className="text-2xl font-bold gradient-text">{quality}%</span>
      </div>
      <Slider
        value={[quality]}
        onValueChange={(value) => onQualityChange(value[0])}
        min={10}
        max={100}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>حجم أصغر</span>
        <span>جودة أعلى</span>
      </div>
    </div>
  );
};
