import { useState, useCallback } from 'react';

export const useImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [quality, setQuality] = useState(90);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isConverted, setIsConverted] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsConverted(false);
    setConvertedBlob(null);
  }, []);

  const handleClear = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsConverted(false);
    setConvertedBlob(null);
  }, [previewUrl]);

  const convertImage = useCallback(async () => {
    if (!selectedFile) return;

    setIsConverting(true);

    try {
      const img = new Image();
      img.src = previewUrl!;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${selectedFormat === 'jpeg' ? 'jpeg' : selectedFormat}`;
      const qualityValue = selectedFormat === 'png' || selectedFormat === 'bmp' || selectedFormat === 'gif' 
        ? undefined 
        : quality / 100;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to convert image'));
          },
          mimeType,
          qualityValue
        );
      });

      setConvertedBlob(blob);
      setIsConverted(true);
    } catch (error) {
      console.error('Error converting image:', error);
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, previewUrl, selectedFormat, quality]);

  const downloadImage = useCallback(() => {
    if (!convertedBlob || !selectedFile) return;

    const extension = selectedFormat === 'jpeg' ? 'jpg' : selectedFormat;
    const originalName = selectedFile.name.replace(/\.[^/.]+$/, '');
    const fileName = `${originalName}_converted.${extension}`;

    const url = URL.createObjectURL(convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [convertedBlob, selectedFile, selectedFormat]);

  return {
    selectedFile,
    previewUrl,
    selectedFormat,
    quality,
    isConverting,
    isConverted,
    handleFileSelect,
    handleClear,
    setSelectedFormat,
    setQuality,
    convertImage,
    downloadImage,
  };
};
