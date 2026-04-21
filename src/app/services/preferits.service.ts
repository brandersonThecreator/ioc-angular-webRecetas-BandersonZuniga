import { Injectable, signal, computed } from "@angular/core";
import { ElementCataleg } from "../models/element.model";

interface ElementAmbNotes {
  element: ElementCataleg;
  notes: string[];
}

@Injectable({
  providedIn: "root",
})
export class PreferitsService {
  private readonly STORAGE_KEY = "preferits-cataleg";
  private readonly NOTES_KEY = "notes-cataleg";

  // Signal privat per gestionar els preferits amb notes
  private _preferitsAmbNotes = signal<ElementAmbNotes[]>([]);

  // Signals públics computats
  public readonly preferits = computed(() =>
    this._preferitsAmbNotes().map((item) => item.element),
  );

  public readonly totalPreferits = computed(
    () => this._preferitsAmbNotes().length,
  );

  // Signal per notes accessible des dels components
  public readonly notes = computed(() => {
    const notesObj: Record<string, string> = {};
    this._preferitsAmbNotes().forEach((item) => {
      if (item.notes.length > 0) {
        notesObj[item.element.id] = item.notes[item.notes.length - 1]; // Última nota
      }
    });
    return notesObj;
  });

  public readonly preferitsAmbNotes = computed(() => this._preferitsAmbNotes());

  constructor() {
    this.carregarPreferits();
  }

  /**
   * Carrega els preferits des de localStorage
   */
  private carregarPreferits(): void {
    try {
      const preferitsGuardats = localStorage.getItem(this.STORAGE_KEY);
      if (preferitsGuardats) {
        const parsed = JSON.parse(preferitsGuardats) as ElementAmbNotes[];
        this._preferitsAmbNotes.set(parsed);
      }
    } catch (error) {
      console.error("Error carregant preferits des de localStorage:", error);
      this._preferitsAmbNotes.set([]);
    }
  }

  /**
   * Guarda els preferits a localStorage
   */
  private guardarPreferits(): void {
    try {
      const preferitsActuals = this._preferitsAmbNotes();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferitsActuals));
    } catch (error) {
      console.error("Error guardant preferits a localStorage:", error);
    }
  }

  /**
   * Afegeix un element als preferits
   */
  afegirPreferit(element: ElementCataleg): void {
    const preferitsActuals = this._preferitsAmbNotes();

    // Comprovar si ja existeix
    if (!preferitsActuals.some((item) => item.element.id === element.id)) {
      const nouElementAmbNotes: ElementAmbNotes = {
        element,
        notes: [],
      };

      this._preferitsAmbNotes.set([...preferitsActuals, nouElementAmbNotes]);
      this.guardarPreferits();
    }
  }

  /**
   * Elimina un element dels preferits
   */
  eliminarPreferit(nomElement: string): void {
    const preferitsActuals = this._preferitsAmbNotes();
    const nouLlistat = preferitsActuals.filter(
      (item) => item.element.id !== nomElement,
    );

    this._preferitsAmbNotes.set(nouLlistat);
    this.guardarPreferits();
  }

  /**
   * Comprova si un element està als preferits
   */
  esPreferit(nomElement: string): boolean {
    return this._preferitsAmbNotes().some(
      (item) => item.element.id === nomElement,
    );
  }

  /**
   * Afegeix una nota a un element preferit
   */
  afegirNota(nomElement: string, nota: string): void {
    const preferitsActuals = this._preferitsAmbNotes();
    const index = preferitsActuals.findIndex(
      (item) => item.element.id === nomElement,
    );

    if (index !== -1 && nota.trim()) {
      const nouLlistat = [...preferitsActuals];
      nouLlistat[index] = {
        ...nouLlistat[index],
        notes: [...nouLlistat[index].notes, nota.trim()],
      };

      this._preferitsAmbNotes.set(nouLlistat);
      this.guardarPreferits();
    }
  }

  /**
   * Elimina una nota d'un element preferit
   */
  eliminarNota(elementId: string, indexNota: number): void {
    const preferitsActuals = this._preferitsAmbNotes();
    const index = preferitsActuals.findIndex(
      (item) => item.element.id === elementId,
    );

    if (index !== -1) {
      const nouLlistat = [...preferitsActuals];
      const notesActualitzades = [...nouLlistat[index].notes];

      if (indexNota >= 0 && indexNota < notesActualitzades.length) {
        notesActualitzades.splice(indexNota, 1);

        nouLlistat[index] = {
          ...nouLlistat[index],
          notes: notesActualitzades,
        };

        this._preferitsAmbNotes.set(nouLlistat);
        this.guardarPreferits();
      }
    }
  }

  /**
   * Actualitza una nota d'un element preferit
   */
  actualitzarNota(
    elementId: string,
    indexNota: number,
    novaNota: string,
  ): void {
    if (!novaNota.trim()) return;

    const preferitsActuals = this._preferitsAmbNotes();
    const index = preferitsActuals.findIndex(
      (item) => item.element.id === elementId,
    );

    if (index !== -1) {
      const nouLlistat = [...preferitsActuals];
      const notesActualitzades = [...nouLlistat[index].notes];

      if (indexNota >= 0 && indexNota < notesActualitzades.length) {
        notesActualitzades[indexNota] = novaNota.trim();

        nouLlistat[index] = {
          ...nouLlistat[index],
          notes: notesActualitzades,
        };

        this._preferitsAmbNotes.set(nouLlistat);
        this.guardarPreferits();
      }
    }
  }

  /**
   * Obté les notes d'un element preferit
   */
  obtenirNotes(nomElement: string): string[] {
    const item = this._preferitsAmbNotes().find(
      (item) => item.element.nom === nomElement,
    );
    return item ? item.notes : [];
  }

  /**
   * Esborra la nota d'un element
   */
  esborrarNota(nomElement: string): void {
    const preferitsActuals = this._preferitsAmbNotes();
    const index = preferitsActuals.findIndex(
      (item) => item.element.nom === nomElement,
    );

    if (index !== -1) {
      const nouLlistat = [...preferitsActuals];
      nouLlistat[index] = {
        ...nouLlistat[index],
        notes: [],
      };

      this._preferitsAmbNotes.set(nouLlistat);
      this.guardarPreferits();
    }
  }

  /**
   * Neteja tots els preferits i notes
   */
  netejarTots(): void {
    this._preferitsAmbNotes.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.NOTES_KEY);
  }
}
