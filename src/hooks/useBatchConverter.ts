import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { ImageFile, ConversionSettings, defaultSettings } from '@/types/image';

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useBatchConverter = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(defaultSettings);
  const [isConverting, setIsConverting] = useState(false);

  const addImages = useCallback((files: FileList | File[]) => {
    const newImages: ImageFile[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending' as const,
        progress: 0,
        originalSize: file.size,
      }));
    
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  }, [images]);

  const updateSettings = useCallback((newSettings: Partial<ConversionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const getMimeType = (format: string): string => {
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpeg': 'image/jpeg',
      'webp': 'image/webp',
      'gif': 'image/gif',
      'bmp': 'image/bmp',
      'ico': 'image/x-icon',
      'tiff': 'image/tiff',
      'avif': 'image/avif',
    };
    return mimeTypes[format] || 'image/png';
  };

  const processImage = useCallback(async (
    imageFile: ImageFile,
    settings: ConversionSettings,
    onProgress: (progress: number) => void
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          onProgress(20);

          let width = img.naturalWidth;
          let height = img.naturalHeight;

          // Handle resize
          if (settings.resize) {
            if (settings.maintainAspectRatio) {
              const ratio = Math.min(
                settings.resizeWidth / width,
                settings.resizeHeight / height
              );
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            } else {
              width = settings.resizeWidth;
              height = settings.resizeHeight;
            }
          }

          // Handle rotation dimensions
          const rotated = settings.rotate === 90 || settings.rotate === 270;
          const canvasWidth = rotated ? height : width;
          const canvasHeight = rotated ? width : height;

          const canvas = document.createElement('canvas');
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          const ctx = canvas.getContext('2d')!;

          onProgress(40);

          // Apply transformations
          ctx.save();
          ctx.translate(canvasWidth / 2, canvasHeight / 2);

          // Rotation
          if (settings.rotate) {
            ctx.rotate((settings.rotate * Math.PI) / 180);
          }

          // Flip
          const scaleX = settings.flipHorizontal ? -1 : 1;
          const scaleY = settings.flipVertical ? -1 : 1;
          ctx.scale(scaleX, scaleY);

          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          ctx.restore();

          onProgress(60);

          // Apply filters
          if (settings.grayscale || settings.brightness !== 100 || settings.contrast !== 100) {
            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              // Brightness
              const brightnessMultiplier = settings.brightness / 100;
              data[i] = Math.min(255, data[i] * brightnessMultiplier);
              data[i + 1] = Math.min(255, data[i + 1] * brightnessMultiplier);
              data[i + 2] = Math.min(255, data[i + 2] * brightnessMultiplier);

              // Contrast
              const contrastFactor = (settings.contrast / 100 - 1) * 255;
              data[i] = Math.min(255, Math.max(0, data[i] + contrastFactor));
              data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + contrastFactor));
              data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + contrastFactor));

              // Grayscale
              if (settings.grayscale) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
              }
            }

            ctx.putImageData(imageData, 0, 0);
          }

          onProgress(80);

          const mimeType = getMimeType(settings.format);
          
          // Calculate quality based on compression setting
          let quality = settings.quality / 100;
          if (settings.compression && (settings.format === 'jpeg' || settings.format === 'webp' || settings.format === 'avif')) {
            quality = Math.max(0.3, quality * 0.7);
          }

          // Formats that don't support quality
          const noQualityFormats = ['png', 'bmp', 'gif', 'ico', 'tiff'];
          const qualityValue = noQualityFormats.includes(settings.format) ? undefined : quality;

          canvas.toBlob(
            (blob) => {
              onProgress(100);
              if (blob) resolve(blob);
              else reject(new Error('Image conversion failed'));
            },
            mimeType,
            qualityValue
          );
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Image loading failed'));
      img.src = imageFile.previewUrl;
    });
  }, []);

  const convertAll = useCallback(async () => {
    if (images.length === 0) return;

    setIsConverting(true);

    for (const image of images) {
      if (image.status === 'completed') continue;

      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'processing', progress: 0 } : img
      ));

      try {
        const blob = await processImage(image, settings, (progress) => {
          setImages(prev => prev.map(img =>
            img.id === image.id ? { ...img, progress } : img
          ));
        });

        setImages(prev => prev.map(img =>
          img.id === image.id
            ? { ...img, status: 'completed', progress: 100, convertedBlob: blob, convertedSize: blob.size }
            : img
        ));
      } catch (error) {
        setImages(prev => prev.map(img =>
          img.id === image.id
            ? { ...img, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
            : img
        ));
      }
    }

    setIsConverting(false);
  }, [images, settings, processImage]);

  const getFileExtension = (format: string): string => {
    const extensions: Record<string, string> = {
      'jpeg': 'jpg',
      'tiff': 'tif',
    };
    return extensions[format] || format;
  };

  const downloadImage = useCallback((image: ImageFile) => {
    if (!image.convertedBlob) return;

    const extension = getFileExtension(settings.format);
    const originalName = image.file.name.replace(/\.[^/.]+$/, '');
    const fileName = `${originalName}_converted.${extension}`;

    const url = URL.createObjectURL(image.convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [settings.format]);

  const downloadAll = useCallback(() => {
    const completedImages = images.filter(img => img.status === 'completed' && img.convertedBlob);
    completedImages.forEach(img => downloadImage(img));
  }, [images, downloadImage]);

  const downloadAsPdf = useCallback(async () => {
    const completedImages = images.filter(img => img.status === 'completed' && img.convertedBlob);
    if (completedImages.length === 0) return;

    const pdf = new jsPDF();
    let isFirstPage = true;

    for (const image of completedImages) {
      if (!image.convertedBlob) continue;

      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(image.convertedBlob!);
      });

      // Get image dimensions
      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = imageData;
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);
      
      let width = img.width;
      let height = img.height;
      
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
      
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      if (!isFirstPage) {
        pdf.addPage();
      }
      isFirstPage = false;

      pdf.addImage(imageData, 'JPEG', x, y, width, height);
    }

    pdf.save('SoraHub_images.pdf');
  }, [images]);

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalConvertedSize = images.reduce((sum, img) => sum + (img.convertedSize || 0), 0);
  const completedCount = images.filter(img => img.status === 'completed').length;
  const allCompleted = images.length > 0 && completedCount === images.length;

  const reorderImages = useCallback((activeId: string, overId: string) => {
    setImages(prev => {
      const oldIndex = prev.findIndex(img => img.id === activeId);
      const newIndex = prev.findIndex(img => img.id === overId);
      
      if (oldIndex === -1 || newIndex === -1) return prev;
      
      const newImages = [...prev];
      const [movedImage] = newImages.splice(oldIndex, 1);
      newImages.splice(newIndex, 0, movedImage);
      
      return newImages;
    });
  }, []);

  return {
    images,
    settings,
    isConverting,
    addImages,
    removeImage,
    clearAll,
    updateSettings,
    convertAll,
    downloadImage,
    downloadAll,
    downloadAsPdf,
    reorderImages,
    totalOriginalSize,
    totalConvertedSize,
    completedCount,
    allCompleted,
  };
};
