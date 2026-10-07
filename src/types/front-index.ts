export interface HomeService {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  imageUrl: string;
}

export interface HomePortfolio {
  id: number;
  title: string;
  slug: string;
  type: string;
  imageType: string;
  clientName: string;
  images: {
    id: number;
    image: string;
    imageUrl: string;
  }[];
  albums: {
    id: number;
    title: string;
    images: {
      id: number;
      image: string;
      imageUrl: string;
    }[];
  }[];
  coverImage: string;
  coverImageUrl: string;
}

export interface HomeSoftware {
  id: number;
  name: string;
  slug: string;
  image: string;
  imageUrl: string;
}

export interface HomeClient {
  id: number;
  name: string;
  websiteUrl: string;
  image: string;
  imageUrl: string;
}

export interface HomeTestimonial {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  rating: number;
  testimonial: string;
  photo: string;
  videoUrl: string | null;
  status: boolean;
  photoUrl: string;
}

export interface HomeBlog {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  description:string;
}

export interface HomeData {
  seo: {
    id: number;
    pageKey: string;
    pageName: string;
    metaTitle: string;
    metaKeyword: string | null;
    metaDescription: string | null;
    headScript: string | null;
    bodyScript: string | null;
  };

  services: HomeService[];
  portfolios: HomePortfolio[];
  software: HomeSoftware[];
  clients: HomeClient[];
  testimonials: HomeTestimonial[];
  blogs: HomeBlog[];
}