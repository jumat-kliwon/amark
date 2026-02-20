'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatPrice } from '@/lib/subscription-utils';

interface ProductCardProps {
  slug: string;
  name: string;
  shortDescription: string | null;
  productType: string;
  price: string;
  thumbnailUrl: string | null;
  thumbnail: string | null;
  className?: string;
  style?: React.CSSProperties;
}

const productTypeLabels: Record<string, string> = {
  physical: 'Fisik',
  digital: 'Digital',
  webinar: 'Webinar',
};

const ProductCard = ({
  slug,
  name,
  shortDescription,
  productType,
  price,
  thumbnailUrl,
  thumbnail,
  className,
  style,
}: ProductCardProps) => {
  const imageSrc =
    thumbnailUrl ||
    (thumbnail ? `https://lms.acrehub.lol/storage/${thumbnail}` : null) ||
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23222" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

  return (
    <Link href={`/products/${slug}`}>
      <div
        className={cn(
          'group cursor-pointer overflow-hidden rounded-xl bg-card transition-all duration-300 hover:bg-card-hover hover:shadow-xl hover:shadow-primary/5',
          className
        )}
        style={style}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm text-xs"
            >
              {productTypeLabels[productType] || productType}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-base font-semibold leading-tight">{name}</h3>
          <div className="min-h-[40px]">
            {shortDescription ? (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {shortDescription}
              </p>
            ) : null}
          </div>
          <p className="mt-3 font-semibold text-primary">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
