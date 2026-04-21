# Models de Dades - EAC3 Angular

## Interfícies i Models

### ElementApiResponse

Interface que representa la resposta de l'API externa.

```typescript
interface ElementApiResponse {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price: number;
  category: string;
  units_available: number;
  is_popular: boolean;
}
```

**Propòsit:** Definir l'estructura de dades que rebem de l'API externa sense modificar.

### ElementCataleg

Model intern de l'aplicació per treballar amb elements del catàleg.

```typescript
interface ElementCataleg {
  nom: string;
  titol: string;
  imatgeUrl: string;
  descripcio: string;
  preu: number;
  categoria: string;
  unitats: number;
  esPopular: boolean;
}
```

**Propòsit:** Model normalitzat en català per usar internament a l'aplicació.

### Element (Legacy)

Model original per compatibilitat amb components existents.

```typescript
interface Element {
  id: string;
  nom: string;
  imatge: string;
  categoria: string;
  temps: number;
  dificultat: string;
  valor: number;
  ingredients: string[];
}
```

**Propòsit:** Mantenir compatibilitat amb components preexistents.

## Patró Adaptador

S'utilitza el patró adaptador per transformar dades de l'API (ElementApiResponse) al model intern (ElementCataleg).

### Ubicació

- **Fitxer:** `src/app/adaptadors/element.adaptador.ts`
- **Funcions:** `adaptarElementApi()` i `adaptarElementsApi()`

### Beneficis

- Separació de responsabilitats
- Flexibilitat per canviar APIs
- Traducció automàtica de camps
- Normalització de dades
