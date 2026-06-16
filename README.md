# Sito web — Palestra Disnel ASD

Sito vetrina **statico, responsive e veloce** per la Palestra Disnel ASD di Sanremo.
Nessuna dipendenza, nessun build: sono solo file HTML/CSS/JS, pronti da pubblicare ovunque.

🔗 **Dati della palestra usati nel sito** (da Google e dalle recensioni):
- Indirizzo: Via Zeffiro Massa, 140 — 18038 Sanremo (IM)
- Telefono: 0184 506325
- Orari: Lun–Ven 9:00–22:00 · Sab 9:00–13:00 · Dom chiuso
- Dal 1997 · Affiliata C.S.E.N. · Macchinari Technogym
- Valutazione: 4,6/5 su 75 recensioni Google

## Struttura

```
.
├── index.html        # tutte le sezioni (home, chi siamo, corsi, servizi, orari, recensioni, contatti)
├── 404.html          # pagina di errore
├── css/style.css     # stile completo (colori brand rosso/blu/bianco)
├── js/main.js        # menu mobile, animazioni, contatori, form, stato aperto/chiuso
├── images/           # logo + slot per le tue foto (vedi images/README.md)
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Come vederlo in locale

Apri semplicemente `index.html` con il browser, **oppure** avvia un piccolo server:

```bash
# con Python
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Come pubblicarlo online (gratis)

Essendo un sito statico puoi pubblicarlo in pochi minuti con:
- **GitHub Pages** — Settings → Pages → Branch → `main` (o quello in uso) → Save
- **Netlify** o **Vercel** — trascina la cartella o collega il repository
- Qualsiasi hosting tradizionale (carica i file via FTP)

## Personalizzazioni rapide

| Cosa cambiare              | Dove                                                |
|----------------------------|-----------------------------------------------------|
| Foto della palestra        | cartella `images/` (vedi `images/README.md`)        |
| Email che riceve il form   | `js/main.js` → variabile `CONTACT_EMAIL`            |
| Form senza email client    | `js/main.js` → `FORMSPREE_ENDPOINT` (account Formspree gratuito) |
| Testi, corsi, recensioni   | `index.html`                                        |
| Colori del brand           | `css/style.css` → blocco `:root` (`--red`, `--blue`)|
| Link social (FB/Instagram) | `index.html` → sezione `footer` (`href="#"`)        |
| Dominio nei dati SEO       | `index.html` → `<link rel="canonical">`, JSON-LD, `sitemap.xml` |

## Note
- Il **form contatti** è funzionante: di default apre il programma di posta con il
  messaggio precompilato. Per riceverlo direttamente via web (senza email client),
  configura un endpoint **Formspree** gratuito in `js/main.js`.
- Il logo è una **ricostruzione vettoriale** dei colori originali; puoi sostituirlo
  con il tuo file originale (vedi `images/README.md`).
- Le recensioni mostrate sono reali e pubbliche (Google). Puoi modificarle/aggiungerne in `index.html`.
