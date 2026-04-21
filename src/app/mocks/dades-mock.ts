import { ElementApiResponse } from "../models/element.model";

export const ELEMENTS_MOCK: ElementApiResponse[] = [
  {
    id: "1",
    name: "Paella Valenciana",
    image_url:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400",
    description:
      "Autèntica paella valenciana amb arròs, pollo, conill, garrofó i mongeta tendre",
    price: 18.5,
    category: "Arròs",
    units_available: 8,
    is_popular: true,
  },
  {
    id: "2",
    name: "Fideuà de Marisc",
    image_url:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400",
    description: "Deliciosa fideuà amb gambes, cloïsses, musclos i calamar",
    price: 22.0,
    category: "Marisc",
    units_available: 5,
    is_popular: true,
  },
  {
    id: "3",
    name: "Gazpacho Andalús",
    image_url:
      "https://images.unsplash.com/photo-1571197119842-7d5c55d58f72?w=400",
    description: "Sopa freda de tomàquet, cogombre, pebre vermell i ceba",
    price: 8.75,
    category: "Sopes",
    units_available: 12,
    is_popular: false,
  },
  {
    id: "4",
    name: "Tortilla Espanyola",
    image_url:
      "https://images.unsplash.com/photo-1582041019025-1bbfe38ea40a?w=400",
    description: "Clàssica tortilla de patates amb ceba, ben cuajada",
    price: 12.0,
    category: "Ous",
    units_available: 15,
    is_popular: true,
  },
  {
    id: "5",
    name: "Crema Catalana",
    image_url:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    description: "Postre tradicional català amb capa de sucre cremat",
    price: 6.5,
    category: "Postres",
    units_available: 20,
    is_popular: true,
  },
  {
    id: "6",
    name: "Jamón Ibérico",
    image_url:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400",
    description: "Selecte jamón ibèric de bellota tallat a ganivet",
    price: 28.0,
    category: "Embutits",
    units_available: 6,
    is_popular: true,
  },
  {
    id: "7",
    name: "Pulpo a la Gallega",
    image_url:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    description: "Polvos cuits amb patata, oli d'oliva i pebre dolç",
    price: 16.75,
    category: "Marisc",
    units_available: 4,
    is_popular: false,
  },
  {
    id: "8",
    name: "Croquetes de Pernil",
    image_url:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
    description: "Croquetes casolanes de pernil ibèric amb beixamel cremosa",
    price: 9.5,
    category: "Tapes",
    units_available: 25,
    is_popular: true,
  },
];
