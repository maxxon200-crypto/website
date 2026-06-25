# Immagini del sito — Idraulico H24 Milano

Il sito funziona **anche senza foto**: al posto delle immagini mostra placeholder
chiaramente etichettati `[FOTO REALE DEL CLIENTE]`. Ma diventa molto più convincente con
**foto reali** dei tuoi lavori (DESIGN.md: foto vere &gt; immagini stock, sempre).

## ✅ Come aggiungere le tue foto (semplicissimo, zero codice)

Carica in questa cartella `images/` i file con **esattamente questi nomi**.
Appariranno **da soli** nel sito, al posto dei segnaposto. Non serve toccare il codice.

| File                  | Dove appare nel sito                         | Formato consigliato        |
|-----------------------|----------------------------------------------|----------------------------|
| `hero.jpg`            | Riquadro foto dell'hero (in alto a destra)   | ~1200×1000 px (quasi quadrata) |
| `titolare.jpg`        | Sezione "Chi siamo" (volto del titolare/squadra) | ~1000×1100 px (verticale) |
| `lavoro-1.jpg` … `lavoro-6.jpg` | Galleria "Lavori realizzati" (6 caselle) | ~1000×750 px (orizzontale) |
| `condizionatori.jpg`  | Sezione "Sanificazione condizionatori"       | ~1200×900 px (orizzontale) |
| `logo.svg`            | Anteprima social (Open Graph) / favicon       | — il nome in pagina è l'insegna testuale |

> I nomi devono essere **identici** (minuscolo). Puoi caricarne anche solo alcune:
> gli slot senza foto restano segnaposto grafici.

### Idee per le foto
- **hero.jpg**: un intervento in corso, attrezzatura, un bagno/cucina rifatti, o l'idraulico al lavoro.
- **condizionatori.jpg**: pulizia/sanificazione di uno split, lavaggio filtri.

### Modo più facile per caricarle (da browser, senza programmi)
1. Vai nel repository su GitHub → cartella `idraulico-h24/images/`
2. **Add file → Upload files**
3. Trascina le foto **rinominate** come sopra (`hero.jpg`, `condizionatori.jpg`)
4. **Commit changes**. Fatto: il sito si aggiorna da solo.

## Logo / insegna
Nell'header e nel footer il nome **"Idraulico H24"** è reso come **insegna testuale**
(targa calce con filo ottone, font Fraunces) — la firma prevista da `DESIGN.md`. Non serve
un file logo per il sito. `logo.svg` resta usato solo per l'anteprima social (Open Graph).

## Consigli per foto perfette
- Scatta/scegli foto **luminose e ben inquadrate**.
- **Comprimi** le immagini (es. https://squoosh.app) per un sito veloce: punta a **< 300 KB** ciascuna.
- Evita di mostrare volti o dati dei clienti senza il loro consenso.
