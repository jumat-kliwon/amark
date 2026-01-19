export type RowData = {
  id: number;
  images: string[];
  reverse?: boolean;
};

export const marqueeRows: RowData[] = [
  {
    id: 1,
    reverse: false, // kiri
    images: [
      '/images/p1.webp',
      '/images/p2.webp',
      '/images/p3.webp',
      '/images/p4.webp',
      '/images/p1.webp',
      '/images/p2.webp',
    ],
  },
  {
    id: 2,
    reverse: true, // kanan
    images: [
      '/images/p5.webp',
      '/images/p6.webp',
      '/images/p7.webp',
      '/images/p8.webp',
      '/images/p9.webp',
      '/images/p10.webp',
    ],
  },
  {
    id: 3,
    reverse: false, // kiri
    images: [
      '/images/p11.webp',
      '/images/p12.webp',
      '/images/p13.webp',
      '/images/p14.webp',
      '/images/p11.webp',
      '/images/p12.webp',
    ],
  },
];

