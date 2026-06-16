# Immagini del sito — Palestra Disnel ASD

Questa cartella contiene la grafica del sito. Il sito funziona **anche senza foto**
(usa sfondi grafici nei colori del brand), ma diventa molto più bello con le **foto reali**
della palestra.

## Come aggiungere le tue foto

Basta inserire in questa cartella i file con **esattamente questi nomi**:

| File              | Dove appare                | Formato consigliato      |
|-------------------|----------------------------|--------------------------|
| `hero.jpg`        | Sfondo grande in cima      | 1920×1080 px (orizzontale) |
| `about.jpg`       | Sezione "Chi siamo"        | 1000×1250 px (verticale)  |
| `logo.svg`        | Logo (già presente)        | — sostituibile con `logo.png` |

### Per attivare la foto di sfondo (hero)
Apri `css/style.css`, cerca `.hero__bg` e **togli i `/* */`** dalla riga:

```css
.hero__bg { background-image: url("../images/hero.jpg"); background-size: cover; background-position: center; }
```

### Per la foto "Chi siamo"
Basta caricare `about.jpg` in questa cartella: appare automaticamente
(altrimenti resta un elegante sfondo grafico segnaposto).

### Logo
È già presente `logo.svg` (versione vettoriale ricostruita). Se vuoi usare il tuo
logo originale in PNG, caricalo come `logo.png` e sostituisci `logo.svg` con `logo.png`
nei riferimenti dentro `index.html`.

## Consigli
- Usa foto luminose e ben inquadrate (sala attrezzi, sala corsi, reception).
- Comprimi le immagini (es. https://squoosh.app) per un sito veloce: punta a < 300 KB ciascuna.
- Evita foto con volti di persone riconoscibili senza il loro consenso.
