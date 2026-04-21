# Formularis Reactius - EAC3 Angular

## FormulariCerca Component

Component amb formulari reactiu que implementa validacions síncrones i asíncrones.

### Ubicació

`src/app/components/formulari-cerca/formulari-cerca.component.ts`

---

## Validacions Síncrones

### 1. Required

```typescript
Validators.required;
```

**Propòsit:** Assegurar que el camp no estigui buit.

### 2. Longitud Mínima

```typescript
Validators.minLength(2);
```

**Propòsit:** El terme de cerca ha de tenir almenys 2 caràcters.

### 3. Longitud Màxima

```typescript
Validators.maxLength(50);
```

**Propòsit:** Limitar la longitud màxima a 50 caràcters.

---

## Validacions Asíncrones

### Validador personalitzat: `codiDisponibleValidator`

```typescript
private codiDisponibleValidator(control: any) {
  if (!control.value || control.value.length < 2) {
    return of(null);
  }

  return of(control.value).pipe(
    delay(500), // Simula retard de 500ms
    switchMap(terme => {
      if (terme.toLowerCase().includes('noresultats')) {
        return of({ sensResultats: true });
      }
      return of(null);
    }),
    catchError(() => of(null))
  );
}
```

**Funcionalitat:**

- Simula una consulta a l'API amb retard de 500ms
- Retorna error si el terme conté "noresultats"
- Gestiona errors de xarxa graciosament

---

## Debouncing

### Configuració Automàtica

```typescript
private configurarCercaAutomatica(): void {
  const termeCercaControl = this.formulariCerca.get('termeCerca');

  termeCercaControl?.valueChanges
    .pipe(
      debounceTime(400), // Espera 400ms després de l'última tecla
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
    .subscribe(valor => {
      if (valor && valor.length >= 2 && this.formulariCerca.valid) {
        this.cercaEmitida.emit(valor);
        this.elementService.cercar(valor);
      }
    });
}
```

**Beneficis:**

- Redueix crides a l'API
- Millora l'experiència d'usuari
- Optimitza el rendiment

---

## FormArray - PreferitsPanel

Component que utilitza FormArray per gestionar notes dinàmiques.

### Ubicació

`src/app/components/preferits-panel/preferits-panel.component.ts`

### Estructura FormArray

```typescript
notesForm = this.fb.group({
  notes: this.fb.array([])
});

get notesArray(): FormArray {
  return this.notesForm.get('notes') as FormArray;
}
```

### Creació Dinàmica de FormGroups

```typescript
private crearFormGroupNota(element: ElementCataleg, notaInicial: string = ''): FormGroup {
  return this.fb.group({
    elementId: [element.nom, Validators.required],
    elementNom: [element.nom],
    nota: [notaInicial, [
      Validators.maxLength(200),
      this.validadorNotaPersonalitzat
    ]]
  });
}
```

### Validador Personalitzat per Notes

```typescript
private validadorNotaPersonalitzat(control: any) {
  const valor = control.value;
  if (!valor) return null;

  // Prohibir només caràcters especials sense text
  if (valor.match(/^[^a-zA-Z0-9\s]*$/)) {
    return { notaInvalida: true };
  }

  // Prohibir paraules inapropiades
  const paraulesProhibides = ['spam', 'test123'];
  if (paraulesProhibides.some(paraula =>
    valor.toLowerCase().includes(paraula.toLowerCase()))) {
    return { paraulaProhibida: true };
  }

  return null;
}
```

### Sincronització amb Dades

```typescript
private sincronitzarFormAmbNotes(): void {
  // Netejar FormArray actual
  while (this.notesArray.length !== 0) {
    this.notesArray.removeAt(0);
  }

  // Afegir FormGroup per cada preferit
  this.preferits().forEach(preferit => {
    const notaActual = this.notes()[preferit.nom] || '';
    this.notesArray.push(this.crearFormGroupNota(preferit, notaActual));
  });
}
```

---

## Avantatges dels Formularis Reactius

### 1. **Validació en temps real**

- Feedback immediat a l'usuari
- Validacions síncrones i asíncrones
- Estats de validació granulars

### 2. **Immutabilitat**

- Predictibilitat del flux de dades
- Facilita debugging
- Millor rendiment

### 3. **Composició**

- FormArray per llistes dinàmiques
- FormGroup per estructures complexes
- Validadors personalitzats reutilitzables

### 4. **Accessibilitat**

- ARIA labels automàtics
- Focus management
- Missatges d'error descriptius
