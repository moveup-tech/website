import { strapi } from "../../../libs/strapi";

export type PartnerLogo = {
  id: number;
  alternativeText: string | null;
  width: number;
  height: number;
  url: string;
};

export type Partner = {
  id: number;
  documentId: string;
  name: string;
  page: string;
  logo: PartnerLogo[];
};

export const getPartners = async () => {
  const response = await strapi.get<{ data: Partner[] }>("/partners?populate=*");

  return response.data;
};

export const getPartnerMediaUrl = (path: string) => {
  if (!path) return "";

  try {
    return new URL(path, strapi.defaults.baseURL).href;
  } catch {
    return "";
  }
};
