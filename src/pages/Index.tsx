import { Header } from '@/components/Header';
import { DropZone } from '@/components/DropZone';
import { SortableImageGrid } from '@/components/SortableImageGrid';
import { SettingsPanel } from '@/components/SettingsPanel';
import { ActionBar } from '@/components/ActionBar';
import { Features } from '@/components/Features';
import { InstallPrompt } from '@/components/InstallPrompt';
import { useBatchConverter } from '@/hooks/useBatchConverter';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { dir, language, t } = useLanguage();
  
  const {
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
  } = useBatchConverter();

  const hasImages = images.length > 0;

  return (
    <div 
      className={`min-h-screen bg-background ${language === 'ar' ? 'font-ar' : 'font-en'}`} 
      dir={dir}
    >
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* SEO-optimized Header with semantic HTML */}
        <header role="banner">
          <Header />
        </header>

        <main role="main" aria-label="Image Converter Tool">
          <section className="mt-6 grid lg:grid-cols-3 gap-6" aria-label="Image Conversion Area">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Drop Zone */}
              <article aria-label="Upload Images">
                <DropZone 
                  onFilesSelect={addImages} 
                  hasImages={hasImages}
                />
              </article>

              {/* Images Grid with Drag & Drop */}
              {hasImages && (
                <section aria-label="Uploaded Images Gallery">
                  <SortableImageGrid
                    images={images}
                    onRemove={removeImage}
                    onDownload={downloadImage}
                    onReorder={reorderImages}
                  />
                </section>
              )}

              {/* Action Bar */}
              {hasImages && (
                <nav aria-label="Conversion Actions">
                  <ActionBar
                    imageCount={images.length}
                    completedCount={completedCount}
                    isConverting={isConverting}
                    allCompleted={allCompleted}
                    totalOriginalSize={totalOriginalSize}
                    totalConvertedSize={totalConvertedSize}
                    onConvert={convertAll}
                    onDownloadAll={downloadAll}
                    onDownloadPdf={downloadAsPdf}
                    onClearAll={clearAll}
                  />
                </nav>
              )}
            </div>

            {/* Settings Sidebar */}
            <aside className="lg:col-span-1" aria-label="Conversion Settings">
              <div className="sticky top-6">
                <SettingsPanel
                  settings={settings}
                  onUpdateSettings={updateSettings}
                />
              </div>
            </aside>
          </section>

          {/* Features */}
          {!hasImages && (
            <section aria-label="Features">
              <Features />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground" role="contentinfo">
          <p>{t('madeWith')}</p>
          <p className="mt-2 text-xs">
            <span className="sr-only">Keywords: </span>
            Free Image Converter | PNG to JPG | WebP Converter | AVIF Converter | HEIC to JPG | Batch Image Compressor | Online Photo Editor | محول صور مجاني
          </p>
        </footer>
      </div>
      
      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
};

export default Index;
