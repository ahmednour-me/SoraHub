import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Header
  appName: { en: 'SoraHub', ar: 'SoraHub' },
  tagline: { en: 'Convert & compress your images instantly with advanced editing tools - everything runs locally on your device', ar: 'حوّل وضغط صورك بسرعة فائقة مع أدوات تحرير متقدمة - كل شيء يعمل محلياً على جهازك' },
  developer: { en: 'Developed by', ar: 'تطوير بواسطة' },
  developerName: { en: 'Ahmed Nour Ahmed', ar: 'أحمد نور أحمد' },
  
  // DropZone
  dropImages: { en: 'Drop images here', ar: 'أفلت الصور هنا' },
  orClick: { en: 'or click to browse', ar: 'أو انقر للاختيار' },
  supportedFormats: { en: 'Supports: PNG, JPG, WebP, GIF, BMP, SVG, TIFF, ICO, AVIF, HEIC', ar: 'يدعم: PNG, JPG, WebP, GIF, BMP, SVG, TIFF, ICO, AVIF, HEIC' },
  addMore: { en: 'Add more images', ar: 'أضف المزيد من الصور' },
  
  // Settings Panel
  compression: { en: 'Image Compression', ar: 'ضغط الصور' },
  quality: { en: 'Quality', ar: 'الجودة' },
  smallerSize: { en: 'Smaller size', ar: 'حجم أصغر' },
  higherQuality: { en: 'Higher quality', ar: 'جودة أعلى' },
  resize: { en: 'Resize', ar: 'تغيير الحجم' },
  width: { en: 'Width (px)', ar: 'العرض (px)' },
  height: { en: 'Height (px)', ar: 'الارتفاع (px)' },
  maintainAspect: { en: 'Maintain aspect ratio', ar: 'الحفاظ على نسبة العرض للارتفاع' },
  transforms: { en: 'Transforms', ar: 'التحويلات' },
  flipHorizontal: { en: 'Flip H', ar: 'قلب أفقي' },
  flipVertical: { en: 'Flip V', ar: 'قلب عمودي' },
  filters: { en: 'Filters', ar: 'الفلاتر' },
  grayscale: { en: 'Black & White', ar: 'أبيض وأسود' },
  brightness: { en: 'Brightness', ar: 'السطوع' },
  contrast: { en: 'Contrast', ar: 'التباين' },
  
  // Format categories
  common: { en: 'Common', ar: 'شائع' },
  advanced: { en: 'Advanced', ar: 'متقدم' },
  
  // PDF
  pdfExport: { en: 'Export to PDF', ar: 'تصدير إلى PDF' },
  pdfMerge: { en: 'Merge all images into one PDF', ar: 'دمج جميع الصور في ملف PDF واحد' },
  downloadPdf: { en: 'Download PDF', ar: 'تحميل PDF' },
  
  // Action Bar
  images: { en: 'images', ar: 'صورة' },
  completed: { en: 'completed', ar: 'مكتملة' },
  clearAll: { en: 'Clear All', ar: 'مسح الكل' },
  downloadAll: { en: 'Download All', ar: 'تحميل الكل' },
  convert: { en: 'Convert', ar: 'تحويل' },
  converting: { en: 'Converting...', ar: 'جاري التحويل...' },
  
  // Image Card
  pending: { en: 'Pending', ar: 'في الانتظار' },
  processing: { en: 'Processing', ar: 'جاري المعالجة' },
  done: { en: 'Done', ar: 'تم' },
  error: { en: 'Error', ar: 'خطأ' },
  download: { en: 'Download', ar: 'تحميل' },
  remove: { en: 'Remove', ar: 'حذف' },
  
  // Features
  featuresTitle: { en: 'Why Choose SoraHub?', ar: 'لماذا تختار SoraHub؟' },
  feature1Title: { en: 'Batch Processing', ar: 'معالجة دفعية' },
  feature1Desc: { en: 'Convert hundreds of images at once', ar: 'حوّل مئات الصور دفعة واحدة' },
  feature2Title: { en: 'All Formats', ar: 'جميع الصيغ' },
  feature2Desc: { en: 'Support for 10+ image formats', ar: 'دعم أكثر من 10 صيغ صور' },
  feature3Title: { en: 'Privacy First', ar: 'الخصوصية أولاً' },
  feature3Desc: { en: 'Everything runs locally, no upload', ar: 'كل شيء يعمل محلياً، بدون رفع' },
  feature4Title: { en: 'Advanced Tools', ar: 'أدوات متقدمة' },
  feature4Desc: { en: 'Resize, rotate, filter & compress', ar: 'تغيير الحجم، التدوير، الفلاتر والضغط' },
  
  // Footer
  madeWith: { en: 'Made with ❤️ for designers & creators', ar: 'صُنع بـ ❤️ للمصممين والمبدعين' },
  
  // Errors
  conversionError: { en: 'Image conversion failed', ar: 'فشل في تحويل الصورة' },
  loadError: { en: 'Image loading failed', ar: 'فشل في تحميل الصورة' },
  
  // PWA
  installApp: { en: 'Install App', ar: 'تثبيت التطبيق' },
  installPrompt: { en: 'Install SoraHub for quick access', ar: 'ثبّت SoraHub للوصول السريع' },
  installButton: { en: 'Install', ar: 'تثبيت' },
  installDismiss: { en: 'Not now', ar: 'ليس الآن' },
  
  // Drag & Drop
  dragToReorder: { en: 'Drag to reorder', ar: 'اسحب لإعادة الترتيب' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };
  
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
