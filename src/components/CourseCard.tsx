import { cn } from "@/lib/utils";

interface CourseCardProps {
  number: string;
  title: string;
  author: string;
  thumbnail: string;
  className?: string;
  style?: React.CSSProperties;
}

const CourseCard = ({ number, title, author, thumbnail, className, style }: CourseCardProps) => {
  return (
    <div
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl bg-card transition-all duration-300 hover:bg-card-hover hover:shadow-xl hover:shadow-primary/5",
        className
      )}
      style={style}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Logo overlay */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground">
            <span className="text-xs font-bold text-background">A</span>
          </div>
          <span className="text-[10px] font-medium leading-tight">
            AKADEMI<br />CREATOR
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-3 text-base font-semibold leading-tight">
          {number}. {title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground">
            <span className="text-xs font-bold text-background">A</span>
          </div>
          <span className="text-sm text-muted-foreground">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
