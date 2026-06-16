# Immagini del sito — Palestra Disnel ASD

Il sito funziona **anche senza foto** (mostra eleganti sfondi grafici nei colori del brand),
ma diventa molto più bello con le **foto reali** della palestra.

## ✅ Come aggiungere le tue foto (semplicissimo, zero codice)

Carica in questa cartella `images/` i file con **esattamente questi nomi**.
Appariranno **da soli** nel sito, al posto dei segnaposto. Non serve toccare il codice.

| File             | Dove appare nel sito           | Formato consigliato        |
|------------------|--------------------------------|----------------------------|
| `hero.jpg`       | Sfondo grande in cima (hero)   | 1920×1080 px (orizzontale) |
| `about.jpg`      | Sezione "Chi siamo"            | 1000×1250 px (verticale)   |
| `gallery-1.jpg`  | Galleria — foto 1              | ~1200×900 px (orizzontale) |
| `gallery-2.jpg`  | Galleria — foto 2              | ~1200×900 px               |
| `gallery-3.jpg`  | Galleria — foto 3              | ~1200×900 px               |
| `gallery-4.jpg`  | Galleria — foto 4              | ~1200×900 px               |
| `gallery-5.jpg`  | Galleria — foto 5              | ~1200×900 px               |
| `gallery-6.jpg`  | Galleria — foto 6              | ~1200×900 px               |
| `logo.svg`       | Logo (già presente)            | — sostituibile con `logo.png` |

> I nomi devono essere **identici** (minuscolo, estensione `.jpg`). Puoi caricarne anche
> solo alcune: gli slot senza foto restano segnaposto grafici.

### 📌 Mappa consigliata per le foto inviate
In base alle foto della palestra, ecco come rinominarle per avere già le didascalie giuste:

| Foto                                              | Rinominala in     |
|---------------------------------------------------|-------------------|
| Zona cardio (tapis roulant/ellittiche, pilastri gialli) | `hero.jpg` **e** `gallery-1.jpg` |
| Macchina isotonica (pilastri azzurri)             | `about.jpg` (verticale) **e** `gallery-3.jpg` |
| Sala corsi (parquet, specchio, spalliera)         | `gallery-2.jpg`   |
| Zona pesi (macchine guidate, cavi)                | `gallery-4.jpg`   |
| Allenamento alla panca piana                      | `gallery-5.jpg`   |

> `gallery-6.jpg` resta libero: caricaci un'altra foto della sala attrezzi quando vuoi.
> La stessa foto può essere usata per più slot (es. la zona cardio sia come `hero` sia in galleria).

### Modo più facile per caricarle (da browser, senza programmi)
1. Vai nel repository su GitHub → cartella `images/`
2. **Add file → Upload files**
3. Trascina le foto **rinominate** come sopra (`hero.jpg`, `about.jpg`, `gallery-1.jpg`…)
4. **Commit changes**. Fatto: il sito si aggiorna da solo.

### In alternativa (da computer, con git)
```bash
# copia le foto in images/ con i nomi giusti, poi:
git add images/
git commit -m "Aggiunte foto reali della palestra"
git push
```

## Logo
È già presente `logo.svg` (ricostruzione vettoriale nei colori originali). Per usare il tuo
logo originale in PNG, caricalo come `logo.png` e sostituisci `logo.svg` con `logo.png`
nei riferimenti in `index.html` (header e footer).

## Consigli per foto perfette
- Scatta/scegli foto **luminose e ben inquadrate**: sala attrezzi, zona cardio, sala corsi, reception.
- **Comprimi** le immagini (es. https://squoosh.app) per un sito veloce: punta a **< 300 KB** ciascuna.
- Orizzontali per `hero` e `gallery`, verticale per `about`.
- Evita di mostrare volti riconoscibili senza il consenso delle persone.
