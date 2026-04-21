import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ElementCataleg, ElementApiResponse } from "../models/element.model";
import { adaptarElementsApi } from "../adaptadors/element.adaptador";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ElementService {
  private readonly apiUrl = environment.apiBaseUrl;

  // Signals privats per gestió interna
  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Signals públics de només lectura
  public readonly elements = computed(() => this._elements());
  public readonly carregant = computed(() => this._carregant());
  public readonly error = computed(() => this._error());

  constructor(private http: HttpClient) {}

  /**
   * Carrega els elements populars des de l'API
   */
  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);

    // Primer intenta carregar elements populars, si falla carrega tots
    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}/elements?is_popular=true`)
      .subscribe({
        next: (response) => {
          const elementsAdaptats = adaptarElementsApi(response);
          this._elements.set(elementsAdaptats);
          this._carregant.set(false);
        },
        error: (err) => {
          console.warn(
            "Error carregant elements populars, intentant carregar tots:",
            err,
          );
          // Si falla la consulta de populars, carrega tots els elements
          this.carregarTotsElsElements();
        },
      });
  }

  /**
   * Cerca elements per nom
   */
  cercar(terme: string): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}/elements?name_like=${terme}`)
      .subscribe({
        next: (response) => {
          const elementsAdaptats = adaptarElementsApi(response);
          this._elements.set(elementsAdaptats);
          this._carregant.set(false);
        },
        error: (err) => {
          this._error.set(
            `Error en cercar elements amb el terme "${terme}". Si us plau, comprova la connexió i torna-ho a intentar.`,
          );
          this._carregant.set(false);
          console.error("Error cercant elements:", err);
        },
      });
  }

  /**
   * Carrega tots els elements des de l'API
   */
  carregarTotsElsElements(): void {
    this.http.get<ElementApiResponse[]>(`${this.apiUrl}/elements`).subscribe({
      next: (response) => {
        const elementsAdaptats = adaptarElementsApi(response);
        // Filtrar només els populars si existeixen
        const elementsPopulars = elementsAdaptats.filter(
          (element) => element.esPopular,
        );
        // Si hi ha elements populars, mostrar només aquests, sinó tots
        this._elements.set(
          elementsPopulars.length > 0 ? elementsPopulars : elementsAdaptats,
        );
        this._carregant.set(false);
      },
      error: (err) => {
        this._error.set(
          "Error en carregar els elements. Si us plau, comprova la connexió i torna-ho a intentar.",
        );
        this._carregant.set(false);
        console.error("Error carregant tots els elements:", err);
      },
    });
  }

  /**
   * Carrega tots els elements sense filtrar
   */
  obtenirTots(): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http.get<ElementApiResponse[]>(`${this.apiUrl}/elements`).subscribe({
      next: (response) => {
        const elementsAdaptats = adaptarElementsApi(response);
        this._elements.set(elementsAdaptats);
        this._carregant.set(false);
      },
      error: (err) => {
        this._error.set(
          "Error en carregar els elements. Si us plau, comprova la connexió i torna-ho a intentar.",
        );
        this._carregant.set(false);
        console.error("Error carregant tots els elements:", err);
      },
    });
  }
}
