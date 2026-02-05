import { memo } from 'react';
import { X, Download, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ImageFile } from '@/types/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageCardProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onDownload: (image: ImageFile) => void;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const ImageCard = memo(({ image, onRemove, onDownload }: ImageCardProps) => {
  const { t, dir } = useLanguage();
  
  const savings = image.convertedSize
    ? Math.round((1 - image.convertedSize / image.originalSize) * 100)
    : 0;

  const iconMargin = dir === 'rtl' ? 'ml-2' : 'mr-2';

  return (
    <div className="image-preview-card animate-scale-in">
      <div className="relative aspect-video bg-secondary">
        <img
          src={image.previewUrl}
          alt={image.file.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Status Overlay */}
        {image.status === 'processing' && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={() => onRemove(image.id)}
          className={`absolute top-2 ${dir === 'rtl' ? 'left-2' : 'right-2'} p-1.5 bg-background/90 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Badge */}
        {image.status === 'completed' && (
          <div className={`absolute top-2 ${dir === 'rtl' ? 'right-2' : 'left-2'} p-1.5 bg-success text-success-foreground rounded-lg`}>
            <Check className="w-4 h-4" />
          </div>
        )}
        {image.status === 'error' && (
          <div className={`absolute top-2 ${dir === 'rtl' ? 'right-2' : 'left-2'} p-1.5 bg-destructive text-destructive-foreground rounded-lg`}>
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {image.status === 'processing' && (
        <div className="progress-bar mx-3 -mt-1">
          <div className="progress-bar-fill" style={{ width: `${image.progress}%` }} />
        </div>
      )}

      {/* Info */}
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium truncate text-foreground">{image.file.name}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatBytes(image.originalSize)}</span>
          {image.convertedSize && (
            <span className="flex items-center gap-1">
              → {formatBytes(image.convertedSize)}
              {savings > 0 && (
                <span className="text-success font-medium">(-{savings}%)</span>
              )}
            </span>
          )}
        </div>

        {/* Download Button */}
        {image.status === 'completed' && image.convertedBlob && (
          <button
            onClick={() => onDownload(image)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className={`w-4 h-4 ${iconMargin}`} />
            {t('download')}
          </button>
        )}

        {/* Error */}
        {image.status === 'error' && (
          <p className="text-xs text-destructive">{image.error}</p>
        )}
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';
