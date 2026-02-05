export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  convertedBlob?: Blob;
  convertedSize?: number;
  originalSize: number;
  error?: string;
}

export interface ConversionSettings {
  format: string;
  quality: number;
  compression: boolean;
  resize: boolean;
  resizeWidth: number;
  resizeHeight: number;
  maintainAspectRatio: boolean;
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  grayscale: boolean;
  brightness: number;
  contrast: number;
}

export const defaultSettings: ConversionSettings = {
  format: 'png',
  quality: 90,
  compression: false,
  resize: false,
  resizeWidth: 1920,
  resizeHeight: 1080,
  maintainAspectRatio: true,
  rotate: 0,
  flipHorizontal: false,
  flipVertical: false,
  grayscale: false,
  brightness: 100,
  contrast: 100,
};

// All supported image formats
export const formats = [
  // Common Formats
  { id: 'png', name: 'PNG', description: 'شفافية عالية', category: 'شائع' },
  { id: 'jpeg', name: 'JPEG', description: 'ضغط ممتاز', category: 'شائع' },
  { id: 'webp', name: 'WebP', description: 'حجم صغير جداً', category: 'شائع' },
  { id: 'gif', name: 'GIF', description: 'صور متحركة', category: 'شائع' },
  { id: 'bmp', name: 'BMP', description: 'بدون ضغط', category: 'شائع' },
  
  // Advanced Formats
  { id: 'ico', name: 'ICO', description: 'أيقونات ويندوز', category: 'متقدم' },
  { id: 'tiff', name: 'TIFF', description: 'طباعة احترافية', category: 'متقدم' },
  { id: 'avif', name: 'AVIF', description: 'ضغط حديث', category: 'متقدم' },
];

// Supported input formats (what we can read)
export const supportedInputFormats = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/svg+xml',
  'image/tiff',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/avif',
  'image/heic',
  'image/heif',
];

export const formatCategories = ['شائع', 'متقدم'];
