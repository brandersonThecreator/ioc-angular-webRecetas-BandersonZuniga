# Serveis - EAC3 Angular

## ElementService

Servei responsable de la comunicació HTTP amb l'API i gestió d'estat amb signals.

### Ubicació

`src/app/services/element.service.ts`

### Funcionalitats

#### 1. Gestió d'Estats amb Signals

```typescript
// Estats reactius
elements = signal<ElementCataleg[]>([]);
estaCarregant = signal<boolean>(false);
errorCarrega = signal<string | null>(null);
```

#### 2. Mètodes Públics

**obtenirPopulars()**

- Carrega elements populars de l'API
- Actualitza els signals d'estat
- Gestiona errors automàticament

**cercar(termeCerca: string)**

- Realitza cerques filtrades a l'API
- Implementa debouncing (400ms)
- Manté historial de cerca

#### 3. Gestió d'Errors

- Missatges d'error localitzats
- Retry automàtic en cas de fallada
- Loading states reactius

---

## PreferitsService

Servei per gestionar elements preferits i notes associades amb persistència localStorage.

### Ubicació

`src/app/services/preferits.service.ts`

### Funcionalitats

#### 1. Signals Reactius

```typescript
// Estats dels preferits
preferits = signal<ElementCataleg[]>([]);
notes = signal<Record<string, string>>({});
totalPreferits = computed(() => this.preferits().length);
```

#### 2. Operacions CRUD

**afegirPreferit(element: ElementCataleg)**

- Afegeix element als preferits
- Persisteix a localStorage
- Evita duplicats automàticament

**eliminarPreferit(nomElement: string)**

- Elimina element i nota associada
- Actualitza localStorage
- Emet esdeveniment de canvi

**afegirNota(nomElement: string, nota: string)**

- Associa nota a element preferit
- Validació de contingut
- Persistència automàtica

**esborrarNota(nomElement: string)**

- Elimina nota específica
- Manté l'element com a preferit
- Actualitza emmagatzematge

#### 3. Persistència

- **Clau localStorage:** `webrecetes_preferits`
- **Clau notes:** `webrecetes_notes`
- **Format:** JSON serialitzat
- **Sincronització:** Automàtica en cada canvi

#### 4. Utilitats

- `esPreferit(nom: string)`: Verifica si un element és preferit
- `netejarTots()`: Elimina tots els preferits i notes
- `obtenirNotaElement(nom: string)`: Recupera nota específica

### Avantatges dels Signals

- Reactivitat automàtica
- Optimització de rerenderitzat
- Millor debugging
- Integració nativa amb Angular
