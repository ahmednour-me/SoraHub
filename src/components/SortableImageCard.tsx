import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { ImageCard } from './ImageCard';
import { ImageFile } from '@/types/image';

interface SortableImageCardProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onDownload: (image: ImageFile) => void;
}

export const SortableImageCard = ({ image, onRemove, onDownload }: SortableImageCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-10 p-1.5 bg-background/90 rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <ImageCard
        image={image}
        onRemove={onRemove}
        onDownload={onDownload}
      />
    </div>
  );
};
