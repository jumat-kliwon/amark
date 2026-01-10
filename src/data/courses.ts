export interface Chapter {
  id: string;
  title: string;
  lessonsCompleted: number;
  totalLessons: number;
  duration: string;
}

export interface Course {
  id: string;
  number: string;
  title: string;
  author: string;
  thumbnail: string;
  category: string;
  description: string;
  highlights: string[];
  rating: number;
  totalRatings: number;
  participants: number;
  duration: string;
  chapters: Chapter[];
}

export const courses: Course[] = [
  {
    id: "1",
    number: "01",
    title: "Personal Branding",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
    category: "fast-track",
    description: "Learn how to build your personal brand from scratch — develop your unique identity, create compelling content, and grow your audience.",
    highlights: [
      "Building Your Identity",
      "Content Strategy",
      "Audience Growth",
      "Monetization Basics",
      "Social Media Presence"
    ],
    rating: 4.5,
    totalRatings: 523,
    participants: 3250,
    duration: "12,5 jam",
    chapters: [
      { id: "1-1", title: "Bagian 1: Introduction to Personal Branding", lessonsCompleted: 2, totalLessons: 5, duration: "45m" },
      { id: "1-2", title: "Bagian 2: Finding Your Unique Value", lessonsCompleted: 0, totalLessons: 7, duration: "1j 15m" },
      { id: "1-3", title: "Bagian 3: Building Your Visual Identity", lessonsCompleted: 0, totalLessons: 4, duration: "52m" },
      { id: "1-4", title: "Bagian 4: Content Creation Fundamentals", lessonsCompleted: 0, totalLessons: 6, duration: "1j 30m" },
      { id: "1-5", title: "Bagian 5: Growing Your Audience", lessonsCompleted: 0, totalLessons: 5, duration: "58m" },
    ]
  },
  {
    id: "2",
    number: "02",
    title: "Advance Personal Branding",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    category: "fast-track",
    description: "Take your personal brand to the next level with advanced strategies for growth, partnerships, and monetization.",
    highlights: [
      "Advanced Positioning",
      "Brand Partnerships",
      "Revenue Streams",
      "Team Building",
      "Scale Your Brand"
    ],
    rating: 4.7,
    totalRatings: 312,
    participants: 1890,
    duration: "15,5 jam",
    chapters: [
      { id: "2-1", title: "Bagian 1: Advanced Brand Strategy", lessonsCompleted: 0, totalLessons: 6, duration: "1j 10m" },
      { id: "2-2", title: "Bagian 2: Partnership & Collaboration", lessonsCompleted: 0, totalLessons: 5, duration: "55m" },
      { id: "2-3", title: "Bagian 3: Multiple Revenue Streams", lessonsCompleted: 0, totalLessons: 8, duration: "1j 45m" },
    ]
  },
  {
    id: "3",
    number: "03",
    title: "Men's Fashion",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&h=500&fit=crop",
    category: "fast-track",
    description: "Master men's fashion essentials — from wardrobe basics to styling techniques that elevate your personal image.",
    highlights: [
      "Wardrobe Essentials",
      "Color Coordination",
      "Fit & Tailoring",
      "Occasion Dressing",
      "Accessorizing"
    ],
    rating: 4.3,
    totalRatings: 287,
    participants: 2100,
    duration: "8,5 jam",
    chapters: [
      { id: "3-1", title: "Bagian 1: Fashion Fundamentals", lessonsCompleted: 0, totalLessons: 4, duration: "40m" },
      { id: "3-2", title: "Bagian 2: Building Your Wardrobe", lessonsCompleted: 0, totalLessons: 6, duration: "1j 20m" },
    ]
  },
  {
    id: "4",
    number: "04",
    title: "Content Strategy",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
    category: "content-creator",
    description: "Develop a winning content strategy that attracts and engages your target audience consistently.",
    highlights: [
      "Content Planning",
      "Audience Research",
      "Content Calendar",
      "Engagement Tactics",
      "Analytics & Optimization"
    ],
    rating: 4.6,
    totalRatings: 445,
    participants: 2780,
    duration: "10 jam",
    chapters: [
      { id: "4-1", title: "Bagian 1: Strategy Foundations", lessonsCompleted: 0, totalLessons: 5, duration: "55m" },
      { id: "4-2", title: "Bagian 2: Content Planning", lessonsCompleted: 0, totalLessons: 7, duration: "1j 25m" },
    ]
  },
  {
    id: "5",
    number: "05",
    title: "Video Production",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop",
    category: "content-creator",
    description: "Learn professional video production techniques — from shooting to editing and publishing.",
    highlights: [
      "Camera Basics",
      "Lighting Setup",
      "Audio Recording",
      "Video Editing",
      "Publishing & SEO"
    ],
    rating: 4.8,
    totalRatings: 678,
    participants: 4120,
    duration: "18 jam",
    chapters: [
      { id: "5-1", title: "Bagian 1: Equipment & Setup", lessonsCompleted: 0, totalLessons: 6, duration: "1j 15m" },
      { id: "5-2", title: "Bagian 2: Shooting Techniques", lessonsCompleted: 0, totalLessons: 8, duration: "1j 45m" },
      { id: "5-3", title: "Bagian 3: Post-Production", lessonsCompleted: 0, totalLessons: 10, duration: "2j 30m" },
    ]
  },
  {
    id: "6",
    number: "06",
    title: "Monetization Mastery",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=500&fit=crop",
    category: "monetization",
    description: "Master the art of monetizing your content and audience across multiple platforms and revenue streams.",
    highlights: [
      "Ad Revenue",
      "Sponsorships",
      "Affiliate Marketing",
      "Digital Products",
      "Memberships"
    ],
    rating: 4.4,
    totalRatings: 389,
    participants: 2340,
    duration: "14 jam",
    chapters: [
      { id: "6-1", title: "Bagian 1: Revenue Fundamentals", lessonsCompleted: 0, totalLessons: 5, duration: "50m" },
      { id: "6-2", title: "Bagian 2: Platform Monetization", lessonsCompleted: 0, totalLessons: 7, duration: "1j 30m" },
    ]
  },
  {
    id: "7",
    number: "07",
    title: "Digital Product Launch",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "digital-product",
    description: "Learn how to create, launch, and sell digital products successfully — from ebooks to online courses.",
    highlights: [
      "Product Ideation",
      "Creation Process",
      "Launch Strategy",
      "Sales Funnels",
      "Customer Support"
    ],
    rating: 4.5,
    totalRatings: 256,
    participants: 1560,
    duration: "11 jam",
    chapters: [
      { id: "7-1", title: "Bagian 1: Product Planning", lessonsCompleted: 0, totalLessons: 4, duration: "45m" },
      { id: "7-2", title: "Bagian 2: Building Your Product", lessonsCompleted: 0, totalLessons: 8, duration: "1j 50m" },
    ]
  },
  {
    id: "8",
    number: "08",
    title: "Instagram Growth Hacks",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
    category: "ig-hack",
    description: "Discover proven strategies to grow your Instagram following and engagement rapidly.",
    highlights: [
      "Algorithm Mastery",
      "Content Optimization",
      "Hashtag Strategy",
      "Reels & Stories",
      "Engagement Hacks"
    ],
    rating: 4.6,
    totalRatings: 892,
    participants: 5670,
    duration: "9 jam",
    chapters: [
      { id: "8-1", title: "Bagian 1: Instagram Fundamentals", lessonsCompleted: 0, totalLessons: 5, duration: "55m" },
      { id: "8-2", title: "Bagian 2: Growth Strategies", lessonsCompleted: 0, totalLessons: 9, duration: "2j" },
    ]
  },
  {
    id: "9",
    number: "09",
    title: "Live Streaming Pro",
    author: "Akademi Creator",
    thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&h=500&fit=crop",
    category: "kumpulan-live",
    description: "Master the art of live streaming — from technical setup to audience engagement and monetization.",
    highlights: [
      "Technical Setup",
      "Audience Engagement",
      "Live Monetization",
      "Multi-platform Streaming",
      "Community Building"
    ],
    rating: 4.2,
    totalRatings: 198,
    participants: 980,
    duration: "7,5 jam",
    chapters: [
      { id: "9-1", title: "Bagian 1: Getting Started", lessonsCompleted: 0, totalLessons: 4, duration: "40m" },
      { id: "9-2", title: "Bagian 2: Going Live", lessonsCompleted: 0, totalLessons: 6, duration: "1j 15m" },
    ]
  },
];
