# Immagini del sito — Idraulico H24 Milano

Il sito funziona **anche senza foto** (mostra eleganti sfondi grafici nei colori del brand),
ma diventa ancora più convincente con **foto reali** dei tuoi lavori.

## ✅ Come aggiungere le tue foto (semplicissimo, zero codice)

Carica in questa cartella `images/` i file con **esattamente questi nomi**.
Appariranno **da soli** nel sito, al posto dei segnaposto. Non serve toccare il codice.

| File                  | Dove appare nel sito                         | Formato consigliato        |
|-----------------------|----------------------------------------------|----------------------------|
| `hero.jpg`            | Sfondo grande in cima (hero)                 | 1920×1080 px (orizzontale) |
| `condizionatori.jpg`  | Sezione "Sanificazione condizionatori"       | ~1200×900 px (orizzontale) |
| `logo.svg`            | Logo (già presente)                          | — sostituibile con `logo.png` |

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

## Logo
È già presente `logo.svg` (logo vettoriale "Idraulico H24"). Per usare un logo PNG,
caricalo come `logo.png` e sostituisci `logo.svg` con `logo.png` nei riferimenti in
`index.html` (header e footer).

## Consigli per foto perfette
- Scatta/scegli foto **luminose e ben inquadrate**.
- **Comprimi** le immagini (es. https://squoosh.app) per un sito veloce: punta a **< 300 KB** ciascuna.
- Evita di mostrare volti o dati dei clienti senza il loro consenso.
