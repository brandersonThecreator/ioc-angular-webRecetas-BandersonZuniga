export interface Element {
  id: number;
  nom: string;
  valor: number;
  categoria?: string;
  temps: number;
  dificultat: string;
  imatge: string;
  ingredients: string[];
}
