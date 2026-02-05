import { useCallback, useState, forwardRef } from 'react';
import { Upload, Images, Plus } from 'lucide-react';
import { supportedInputFormats } from '@/types/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface DropZoneProps {
  onFilesSelect: (files: FileList | File[]) => void;
  hasImages: boolean;
}

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  ({ onFilesSelect, hasImages }, ref) => {
    const { t, dir } = useLanguage();
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setIsDragActive(true);
      } else if (e.type === 'dragleave') {
        setIsDragActive(false);
      }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFilesSelect(files);
      }
    }, [onFilesSelect]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFilesSelect(files);
      }
      e.target.value = '';
    }, [onFilesSelect]);

    const acceptFormats = supportedInputFormats.join(',');
    const iconMargin = dir === 'rtl' ? 'ml-1' : 'mr-1';

    if (hasImages) {
      return (
        <label className="card-interactive flex items-center gap-3 p-4 cursor-pointer">
          <input
            type="file"
            accept={acceptFormats}
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="gradient-btn p-2 rounded-lg">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-medium text-foreground">{t('addMore')}</span>
        </label>
      );
    }

    return (
      <div
        ref={ref}
        className={`drop-zone min-h-[220px] flex items-center justify-center p-8 ${isDragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
          <input
            type="file"
            accept={acceptFormats}
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="gradient-btn p-5 rounded-2xl">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">{t('dropImages')}</p>
              <p className="text-sm text-muted-foreground">{t('orClick')}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-lg max-w-md">
              <Images className={`w-4 h-4 ${iconMargin}`} />
              <span>PNG, JPG, JPEG, WebP, GIF, BMP, SVG, TIFF, ICO, AVIF, HEIC</span>
            </div>
          </div>
        </label>
      </div>
    );
  }
);

DropZone.displayName = 'DropZone';
