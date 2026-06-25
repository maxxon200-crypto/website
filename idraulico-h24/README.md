# Sito web — Idraulico H24 Milano

Sito vetrina **statico, responsive e veloce** per un idraulico di pronto intervento a Milano.
Segue il sistema di design del progetto (`../DESIGN.md`): palette **calce + rame brunito**,
tipografia **Fraunces / Mona Sans / Space Grotesk**, firma "insegna d'officina", accento rame
solo dove guida l'occhio. Prende dai migliori siti anglofoni i *principi di conversione*
(telefono come azione primaria ripetuta, urgenza 24h, prova sociale), restando caldo e italiano.
Nessuna dipendenza, nessun build: sono solo file HTML/CSS/JS, pronti da pubblicare ovunque.

> Questo sito è **separato** dal sito della palestra (che resta nella cartella principale del repo).
> Vive tutto dentro la cartella `idraulico-h24/`.

🔧 **Dati dell'attività usati nel sito** (da Google e dalle recensioni):
- Attività: **Idraulico H24**
- Telefono / WhatsApp: **345 083 4365**
- Indirizzo: Piazza Napoli, 36 — 20152 Milano (MI)
- Orari: **Aperto 24 ore su 24, 7 giorni su 7**
- Zona: Milano e provincia
- Valutazione: **5,0/5 su 14 recensioni Google**
- Servizi: perdite d'acqua, disotturazione scarichi, WC e sanitari, rubinetteria,
  caldaie e scaldabagni, docce e impianti, **sanificazione e lavaggio condizionatori**.

## Struttura

```
idraulico-h24/
├── index.html        # tutte le sezioni (hero, servizi, condizionatori, come lavoriamo,
│                     #  perché noi, zone servite, recensioni, FAQ, contatti)
├── 404.html          # pagina di errore
├── css/style.css     # stile completo (calce + rame, token da DESIGN.md)
├── js/main.js        # menu mobile, animazioni, contatori, FAQ, form
├── images/           # logo + slot per le tue foto (vedi images/README.md)
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Come vederlo in locale

Apri `idraulico-h24/index.html` con il browser, **oppure** avvia un piccolo server dalla
cartella principale del repo:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000/idraulico-h24/
```

## Come pubblicarlo online (gratis)

Essendo un sito statico puoi pubblicarlo in pochi minuti con:
- **GitHub Pages** — Settings → Pages. Il sito sarà raggiungibile su `…/idraulico-h24/`.
- **Netlify** o **Vercel** — trascina la cartella `idraulico-h24/` (così diventa la root del sito).
- Qualsiasi hosting tradizionale (carica i file via FTP).

## Personalizzazioni rapide

| Cosa cambiare              | Dove                                                            |
|----------------------------|-----------------------------------------------------------------|
| **Numero di telefono**     | è già impostato a **345 083 4365**. Per cambiarlo, sostituisci `345 083 4365` (testo) e `+393450834365` / `393450834365` (link `tel:` e `wa.me`) in `index.html`, `404.html` e `js/main.js` |
| Email che riceve il form   | `js/main.js` → variabile `CONTACT_EMAIL`                        |
| Form senza email client    | `js/main.js` → `FORMSPREE_ENDPOINT` (account Formspree gratuito) |
| Testi, servizi, recensioni | `index.html`                                                    |
| Colori del brand           | `css/style.css` → blocco `:root` (`--bg` calce, `--ink`, `--accent` rame). Per ogni cliente adatta la palette ai suoi materiali, come indicato in `DESIGN.md`. |
| Foto                       | cartella `images/` (vedi `images/README.md`)                    |
| Dominio nei dati SEO       | `index.html` → `<link rel="canonical">`, JSON-LD, `sitemap.xml`, `robots.txt` |

## Note
- Il **form contatti** è funzionante: di default apre il programma di posta con il
  messaggio precompilato. Per riceverlo direttamente via web (senza email client),
  configura un endpoint **Formspree** gratuito in `js/main.js`.
- Il sito funziona **anche senza foto**: al posto delle immagini mostra placeholder
  chiaramente etichettati `[FOTO REALE DEL CLIENTE]`. Sostituiscili con foto vere del lavoro
  (hero: `images/hero.jpg`, condizionatori: `images/condizionatori.jpg`) — vedi `images/README.md`.
- Le **recensioni** mostrate sono quelle reali e pubbliche su Google.
- Inserisci la **P.IVA** nel footer di `index.html` (segnaposto `[P.IVA del cliente]`).
