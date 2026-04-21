export interface ElementApiResponse {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price: number;
  category: string;
  units_available: number;
  is_popular: boolean;
}

export interface ElementCataleg {
  id: string;
  nom: string;
  titol: string;
  imatgeUrl: string;
  descripcio: string;
  preu: number;
  categoria: string;
  unitats: number;
  esPopular: boolean;
}

export interface Element {
  id: string;
  nom: string;
  imatge: string;
  categoria: string;
  temps: number;
  dificultat: string;
  valor: number;
  ingredients: string[];
}
