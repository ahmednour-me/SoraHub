import { ArrowRight, Download, Loader2, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActionBarProps {
  imageCount: number;
  completedCount: number;
  isConverting: boolean;
  allCompleted: boolean;
  totalOriginalSize: number;
  totalConvertedSize: number;
  onConvert: () => void;
  onDownloadAll: () => void;
  onDownloadPdf: () => void;
  onClearAll: () => void;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const ActionBar = ({
  imageCount,
  completedCount,
  isConverting,
  allCompleted,
  totalOriginalSize,
  totalConvertedSize,
  onConvert,
  onDownloadAll,
  onDownloadPdf,
  onClearAll,
}: ActionBarProps) => {
  const { t, dir } = useLanguage();
  
  const savings = totalConvertedSize > 0
    ? Math.round((1 - totalConvertedSize / totalOriginalSize) * 100)
    : 0;

  const iconMargin = dir === 'rtl' ? 'ml-2' : 'mr-2';

  return (
    <div className="card-elevated p-4 space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            <span className="font-bold text-foreground">{imageCount}</span> {t('images')}
          </span>
          {completedCount > 0 && (
            <span className="text-muted-foreground">
              <span className="font-bold text-success">{completedCount}</span> {t('completed')}
            </span>
          )}
        </div>
        
        {totalConvertedSize > 0 && (
          <div className="text-muted-foreground">
            {formatBytes(totalOriginalSize)} → {formatBytes(totalConvertedSize)}
            {savings > 0 && (
              <span className={`${dir === 'rtl' ? 'mr-1' : 'ml-1'} font-bold text-success`}>(-{savings}%)</span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onClearAll}
          className="flex-shrink-0"
        >
          <Trash2 className={`w-4 h-4 ${iconMargin}`} />
          {t('clearAll')}
        </Button>

        {allCompleted && (
          <Button
            variant="outline"
            onClick={onDownloadPdf}
            className="flex-shrink-0"
          >
            <FileText className={`w-4 h-4 ${iconMargin}`} />
            {t('downloadPdf')}
          </Button>
        )}

        {allCompleted ? (
          <Button
            onClick={onDownloadAll}
            className="flex-1 gradient-btn text-primary-foreground"
          >
            <Download className={`w-4 h-4 ${iconMargin}`} />
            {t('downloadAll')} ({completedCount})
          </Button>
        ) : (
          <Button
            onClick={onConvert}
            disabled={isConverting || imageCount === 0}
            className="flex-1 gradient-btn text-primary-foreground disabled:opacity-50"
          >
            {isConverting ? (
              <>
                <Loader2 className={`w-4 h-4 ${iconMargin} animate-spin`} />
                {t('converting')}
              </>
            ) : (
              <>
                <ArrowRight className={`w-4 h-4 ${iconMargin}`} />
                {t('convert')} {imageCount} {t('images')}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
