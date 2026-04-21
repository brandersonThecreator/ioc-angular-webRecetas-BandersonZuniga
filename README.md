# EAC3 - WebRecetes Angular 🍽️

Aplicació web de catàleg de receptes desenvolupada amb Angular 18 per l'EAC3 de Programació Avançada.

## 📋 Característiques Implementades

### ✅ Exercici 1: Servei HTTP amb Signals (2 pts)

- `ElementService` amb gestió d'estat reactiu
- Signals per `elements`, `estaCarregant`, `errorCarrega`
- Mètodes `obtenirPopulars()` i `cercar()`
- Gestió d'errors robusta

### ✅ Exercici 2: Models i Adaptadors (2 pts)

- Interfícies `ElementApiResponse`, `ElementCataleg`, `Element`
- Patró adaptador amb `adaptarElementApi()` i `adaptarElementsApi()`
- Transformació automàtica API → Model intern

### ✅ Exercici 3: Formularis Reactius (2 pts)

- Component `FormulariCerca` amb validacions síncrones i asíncrones
- Validadors: `required`, `minLength`, `maxLength`
- Validador asíncron personalitzat amb simulació d'API
- Debouncing automàtic (400ms)

### ✅ Exercici 4: Servei de Preferits (2 pts)

- `PreferitsService` amb localStorage
- CRUD complet per preferits i notes
- Signals reactius: `preferits`, `notes`, `totalPreferits`
- Persistència automàtica

### ✅ Exercici 5: FormArray i Documentació (2 pts)

- Component `PreferitsPanel` amb FormArray dinàmic
- Validadors personalitzats per notes
- Documentació completa en `/docs/`
- Models, serveis i formularis documentats

## 🚀 Instal·lació i Execució

### Prerequisits

- Node.js 18+
- Angular CLI 18+

### Passos d'instal·lació

1. **Clonar el repositori**

```bash
git clone [URL_REPOSITORI]
cd ioc-angular-webRecetas-BrandersonZuniga
```

2. **Canviar a la branca EAC3**

```bash
git checkout ra3
```

3. **Instal·lar dependències**

```bash
npm install
```

4. **Executar l'aplicació amb API mock**

```bash
npm run dev
```

Aquest comandament executarà simultàniament:

- Frontend Angular: `http://localhost:4200`
- API Mock (json-server): `http://localhost:3000`

### Executar components per separat

**Només frontend:**

```bash
npm start
```

**Només API mock:**

```bash
npm run api
```

## 📁 Estructura del Projecte

```
src/app/
├── components/           # Components reutilitzables
│   ├── formulari-cerca/  # Formulari reactiu amb validacions
│   ├── preferits-panel/  # Gestió FormArray per notes
│   └── targeta-element/  # Targeta d'element amb preferits
├── pages/               # Pàgines de l'aplicació
│   ├── cataleg/         # Pàgina principal del catàleg
│   └── preferits/       # Pàgina de gestió de preferits
├── services/            # Serveis Angular
│   ├── element.service.ts    # HTTP + Signals
│   └── preferits.service.ts  # localStorage + CRUD
├── models/              # Interfícies i tipus
│   └── element.model.ts
├── adaptadors/          # Patró adaptador
│   └── element.adaptador.ts
└── environments/        # Configuració d'entorns
docs/                    # Documentació tècnica
├── models.md           # Documentació de models
├── serveis.md          # Documentació de serveis
└── formularis.md       # Documentació de formularis
db.json                 # Dades mock per json-server
```

## 🛠️ Tecnologies Utilitzades

- **Angular 18**: Framework principal amb arquitectura standalone
- **RxJS**: Programació reactiva i gestió d'observables
- **Angular Signals**: Gestió d'estat reactiu
- **Reactive Forms**: Formularis amb validacions avançades
- **SCSS**: Estils amb preprocessador
- **json-server**: API REST mock per desenvolupament
- **localStorage**: Persistència local de preferits

## 🎯 Funcionalitats Clau

### Gestió d'Estats amb Signals

- Reactivitat automàtica
- Optimització de rerenderitzat
- Debugging millorat

### Validacions Avançades

- Síncrones: required, minLength, maxLength
- Asíncrones: validació de disponibilitat
- Personalitzades: validadors específics per notes

### Persistència Local

- Preferits guardats a localStorage
- Notes associades als elements
- Sincronització automàtica

### API Mock Realista

- Simulació de retard (600ms)
- Dades de receptes catalanes
- Endpoints RESTful

## 📖 Documentació

La documentació tècnica es troba a la carpeta `/docs/`:

- **models.md**: Interfícies i patró adaptador
- **serveis.md**: ElementService i PreferitsService
- **formularis.md**: Validacions i FormArray

## 🧪 Testing

```bash
npm test
```

## 🏗️ Build

```bash
npm run build
```

---

**Autor**: Branderson Zuniga  
**Assignatura**: Programació Avançada (Angular) - RA3  
**Data**: 2024
