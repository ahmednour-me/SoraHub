import { ArrowRight, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConvertButtonProps {
  isConverting: boolean;
  isConverted: boolean;
  onConvert: () => void;
  onDownload: () => void;
  disabled: boolean;
}

export const ConvertButton = ({ 
  isConverting, 
  isConverted, 
  onConvert, 
  onDownload, 
  disabled 
}: ConvertButtonProps) => {
  if (isConverted) {
    return (
      <Button
        onClick={onDownload}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity glow-effect"
      >
        <Download className="w-5 h-5 ml-2" />
        تحميل الصورة
      </Button>
    );
  }

  return (
    <Button
      onClick={onConvert}
      disabled={disabled || isConverting}
      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-50 glow-effect"
    >
      {isConverting ? (
        <>
          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
          جاري التحويل...
        </>
      ) : (
        <>
          <ArrowRight className="w-5 h-5 ml-2" />
          تحويل الصورة
        </>
      )}
    </Button>
  );
};
