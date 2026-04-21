import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ElementCataleg, ElementApiResponse } from "../models/element.model";
import { adaptarElementsApi } from "../adaptadors/element.adaptador";
import { environment } from "../../environments/environment";
import { ELEMENTS_MOCK } from "../mocks/dades-mock";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ElementService {
  private readonly apiUrl = environment.apiBaseUrl;

  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);

  public readonly elements = computed(() => this._elements());
  public readonly carregant = computed(() => this._carregant());
  public readonly error = computed(() => this._error());

  constructor(private http: HttpClient) {}

  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);

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
            "Error carregant elements populars des de l'API, usant dades mock:",
            err,
          );
          this.usarDadesMock(true);
        },
      });
  }

  private usarDadesMock(nomePopulars: boolean = false): void {
    let elementsAdaptats = adaptarElementsApi(ELEMENTS_MOCK);

    if (nomePopulars) {
      elementsAdaptats = elementsAdaptats.filter(
        (element) => element.esPopular,
      );
    }

    this._elements.set(elementsAdaptats);
    this._carregant.set(false);
  }

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
          console.warn(
            "Error cercant elements des de l'API, usant dades mock:",
            err,
          );
          this.cercarEnDadesMock(terme);
        },
      });
  }

  private cercarEnDadesMock(terme: string): void {
    const termeLowerCase = terme.toLowerCase();
    const elementsFiltrats = ELEMENTS_MOCK.filter(
      (element) =>
        element.name.toLowerCase().includes(termeLowerCase) ||
        element.description.toLowerCase().includes(termeLowerCase) ||
        element.category.toLowerCase().includes(termeLowerCase),
    );

    const elementsAdaptats = adaptarElementsApi(elementsFiltrats);
    this._elements.set(elementsAdaptats);
    this._carregant.set(false);
  }

  carregarTotsElsElements(): void {
    this.http.get<ElementApiResponse[]>(`${this.apiUrl}/elements`).subscribe({
      next: (response) => {
        const elementsAdaptats = adaptarElementsApi(response);
        const elementsPopulars = elementsAdaptats.filter(
          (element) => element.esPopular,
        );
        this._elements.set(
          elementsPopulars.length > 0 ? elementsPopulars : elementsAdaptats,
        );
        this._carregant.set(false);
      },
      error: (err) => {
        console.warn(
          "Error carregant tots els elements des de l'API, usant dades mock:",
          err,
        );
        this.usarDadesMock(true);
      },
    });
  }

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
        console.warn(
          "Error carregant tots els elements des de l'API, usant dades mock:",
          err,
        );
        this.usarDadesMock();
      },
    });
  }
}
