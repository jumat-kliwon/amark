'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatPrice } from '@/lib/subscription-utils';

interface BundleCardProps {
  slug: string;
  name: string;
  shortDescription: string | null;
  bundleType: string | null;
  price: string;
  originalPrice: string | null;
  thumbnailUrl: string | null;
  thumbnail: string | null;
  className?: string;
  style?: React.CSSProperties;
}

const bundleTypeLabels: Record<string, string> = {
  starter: 'Starter',
  premium: 'Premium',
  ultimate: 'Ultimate',
};

const BundleCard = ({
  slug,
  name,
  shortDescription,
  bundleType,
  price,
  originalPrice,
  thumbnailUrl,
  thumbnail,
  className,
  style,
}: BundleCardProps) => {
  const imageSrc =
    thumbnailUrl ||
    (thumbnail ? `https://lms.acrehub.lol/storage/${thumbnail}` : null) ||
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23222" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EBundle%3C/text%3E%3C/svg%3E';

  return (
    <Link href={`/bundles/${slug}`}>
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
          {bundleType && (
            <div className="absolute left-3 top-3">
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm text-xs"
              >
                {bundleTypeLabels[bundleType] ?? bundleType}
              </Badge>
            </div>
          )}
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
          <div className="mt-3 flex items-baseline gap-2">
            <p className="font-semibold text-primary">{formatPrice(price)}</p>
            {originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
