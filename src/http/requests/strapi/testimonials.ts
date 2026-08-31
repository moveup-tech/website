import { strapi } from "../../../libs/strapi";

export type Testimonial = {
  id: number;
  documentId: string;
  quote: string;
  details: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  rating: number;
  contactName?: string;
  contactRole?: string;
  contact?: {
    name?: string;
    role?: string;
  };
  partner: {
    id: number;
    documentId: string;
    name: string;
    page: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    contact: {
      id: 2;
      documentId: string;
      name: string;
      role: string;
      initials: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};

export const getTestimonials = async () => {
  try {
    const response = await strapi.get<{ data: Testimonial[] }>(
      "/testimonials?populate[partner][populate][contact]=true",
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
