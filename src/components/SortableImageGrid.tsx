import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImageCard } from './SortableImageCard';
import { ImageFile } from '@/types/image';

interface SortableImageGridProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
  onDownload: (image: ImageFile) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export const SortableImageGrid = ({
  images,
  onRemove,
  onDownload,
  onReorder,
}: SortableImageGridProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-in">
          {images.map((image) => (
            <SortableImageCard
              key={image.id}
              image={image}
              onRemove={onRemove}
              onDownload={onDownload}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
