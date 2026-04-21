// Interfície que representa l'estructura JSON que retorna l'API
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

// Interfície del model intern de l'aplicació
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

// Interfície original mantinguda per compatibilitat
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
