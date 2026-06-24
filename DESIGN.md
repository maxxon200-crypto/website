# DESIGN.md — Sistema di Design per Siti di Artigiani e Servizi Locali

> **Come usare questo file:** Tienilo nella cartella del progetto. All'inizio di ogni sessione con Claude Code, scrivi:
> *"Leggi DESIGN.md e usalo come guida assoluta per ogni decisione di UI. Non deviare dai token senza chiedermelo."*
> Questo è l'ancora che impedisce all'AI di tornare ai suoi default generici dopo ~15 messaggi.

---

## 0. Scopo e contesto

Questo è il sistema di design di base per siti web di **artigiani e servizi locali italiani**: idraulici, elettricisti, fabbri, imbianchini, muratori, falegnami, termoidraulici, ecc.

- **Lingua:** Italiano prima, inglese come secondaria opzionale (`/en`). I contenuti, i microcopy e gli errori sono scritti in italiano naturale, non tradotto.
- **Cliente tipo:** una piccola impresa o ditta individuale che vuole apparire seria, affidabile e raggiungibile. Il sito deve far sembrare l'attività più professionale dei concorrenti senza tradire le sue radici artigiane.
- **Obiettivo unico di ogni pagina:** far sì che un visitatore *chiami* o *richieda un preventivo*. Tutto serve questa azione.
- **Regola anti-slop:** ogni scelta deve nascere dal mestiere del cliente (i suoi materiali, strumenti, il suo lavoro reale), non da un template. Foto vere > immagini stock. Sempre.

---

## 1. La trappola da evitare (leggi prima di tutto)

L'estetica "warm editorial" — sfondo crema, serif ad alto contrasto, accento terracotta — è diventata **il default riconoscibile dell'AI nel 2026**. Da sola, urla "sito generato con l'AI".

Per questo questo sistema parte dal calore italiano ma lo **ancora ai materiali reali del mestiere**: ottone e rame degli impianti, terracotta dei tetti, cemento e calce dei cantieri, il legno del banco da falegname, l'azzurro smaltato delle insegne d'officina. È la *specificità* che rende un sito credibile, non la palette in sé.

Tre regole non negoziabili:
1. **Foto reali del lavoro del cliente** nell'hero e nelle sezioni. Mai placeholder, mai stock generico.
2. **Una sola voce umana** nei testi — come parlerebbe davvero un artigiano serio, non il marketese.
3. **Movimento con uno scopo.** Niente fade-in identici ovunque: è la firma numero uno dei siti AI.

---

## 2. Token di colore

Palette calda ma terrosa, ispirata ai materiali del mestiere. Usa **sempre** variabili CSS, mai hex hardcoded fuori da `:root`.

```css
:root {
  /* Base — calce e gesso, non "crema da AI" */
  --bg:            #F2EDE4;   /* sfondo principale, tono calce */
  --surface:       #FBF8F2;   /* card e superfici sollevate */
  --ink:           #1F1A14;   /* testo principale, quasi-nero caldo */
  --ink-soft:      #5C5247;   /* testo secondario */

  /* Accento — ottone/rame brunito (l'identità) */
  --accent:        #9A5B2E;   /* rame brunito, per CTA e link */
  --accent-deep:   #6E3E1F;   /* hover/stato attivo */
  --accent-tint:   #E9D9C6;   /* sfondi tenui, evidenziazioni */

  /* Funzionali */
  --line:          #D8CDBC;   /* righe sottili, bordi */
  --positive:      #3E6B4F;   /* conferme, "disponibile" */
  --warning:       #B5462E;   /* errori, urgenze */

  /* Profondità (usata con parsimonia) */
  --shadow:        0 1px 2px rgba(31,26,20,.06),
                   0 8px 24px rgba(31,26,20,.08);
}
```

**Regola d'uso:** lo sfondo è quieto, l'inchiostro fa il lavoro, il rame compare *solo* dove vuoi che l'occhio vada (un CTA, un numero di telefono, un link attivo). Se il rame è ovunque, non significa più niente.

> **Variante "officina scura"** (opzionale, per fabbri/meccanici/elettricisti che vogliono un tono più tecnico): inverti su `--bg: #1A1714`, `--ink: #F2EDE4`, mantieni il rame come accento. Usala solo se coerente col mestiere, non perché "fa moderno".

---

## 3. Tipografia

Niente Inter. Niente font di sistema. La tipografia è dove si vince o si perde la personalità.

```css
:root {
  /* Display — un serif con carattere, per i titoli. Usato con restraint. */
  --font-display: "Fraunces", "Bricolage Grotesque", Georgia, serif;
  /* Body — sans umanista, leggibile e caldo */
  --font-body:    "Mona Sans", "Inter", system-ui, sans-serif;
  /* Utility — per etichette, dati, numeri di telefono, orari */
  --font-util:    "Space Grotesk", "IBM Plex Mono", monospace;
}
```

**Scala tipografica** (mobile-first, scala ~1.25):

| Ruolo | Dimensione | Peso | Note |
|---|---|---|---|
| Hero / H1 | `clamp(2.4rem, 6vw, 4.2rem)` | 380–420 | display, line-height 1.05, leggera spaziatura negativa |
| H2 sezione | `clamp(1.8rem, 4vw, 2.6rem)` | 400 | display |
| H3 | `1.3rem` | 600 | body |
| Corpo | `1.0625rem` | 400 | body, line-height 1.6 |
| Etichetta/eyebrow | `0.8rem` | 600 | util, maiuscoletto, letter-spacing 0.08em |
| Telefono/orari | `1.1rem` | 500 | util — devono "sembrare dati" |

**Firma tipografica:** i numeri di telefono, gli orari e i prezzi indicativi vanno in `--font-util`. Questo piccolo dettaglio fa sembrare l'attività precisa e affidabile — come un'insegna fatta bene.

---

## 4. Layout e spaziatura

- **Griglia:** contenuto centrato, larghezza massima `1120px`, padding laterale `clamp(1.25rem, 5vw, 4rem)`.
- **Ritmo verticale:** sezioni separate da `clamp(4rem, 9vw, 7rem)` di spazio. Il respiro = professionalità. Il contrario di "tutto ammassato".
- **Border-radius:** `10px` su card e bottoni. Coerente ovunque. (Niente angoli vivi da "broadsheet AI", niente bolle troppo arrotondate.)
- **Bordi:** righe sottili `1px solid var(--line)` per separare, mai ombre pesanti dappertutto.
- **Mobile-first sempre:** il 64% del traffico è da telefono. Se si rompe sul telefono, hai perso il cliente.

### Struttura della homepage (wireframe)

```
┌─────────────────────────────────────────┐
│  [logo]            Servizi  Chi siamo  ☎ │  ← nav: telefono sempre visibile
├─────────────────────────────────────────┤
│                                           │
│   FOTO REALE DEL LAVORO (a tutta larghezza)│
│   H1: una promessa chiara in una riga     │
│   sottotitolo: zona servita + cosa fai    │
│   [ Chiama ora ]  [ Richiedi preventivo ] │  ← CTA rame, ripetuta
│                                           │
├─────────────────────────────────────────┤
│  I servizi (3–4 card con icona + foto)    │
├─────────────────────────────────────────┤
│  Perché sceglierci (prove concrete:       │
│  anni di attività, zona, garanzie, P.IVA) │
├─────────────────────────────────────────┤
│  Lavori realizzati (galleria foto vere)   │
├─────────────────────────────────────────┤
│  Recensioni reali (nome + città)          │
├─────────────────────────────────────────┤
│  Zona servita (mappa / lista comuni)      │
├─────────────────────────────────────────┤
│  Contatti: telefono GRANDE, form breve,   │
│  WhatsApp, orari, indirizzo               │
└─────────────────────────────────────────┘
```

**La CTA principale (chiamare/preventivo) si ripete circa ogni schermata.** Su mobile, un pulsante fisso "Chiama" in basso è quasi sempre giusto per questo settore.

---

## 5. Movimento

Poco, ma intenzionale. Il movimento deve *dimostrare cura*, non riempire spazio.

- **Caricamento hero:** una singola sequenza pulita — il titolo entra, poi il sottotitolo, poi le CTA. Una volta sola.
- **Hover:** micro-interazioni sui pulsanti (il rame si scurisce, leggero sollevamento di 1px). Devono dare la sensazione di un interruttore ben fatto.
- **Scroll:** rivela le sezioni con tempi e direzioni *variati*, mai lo stesso fade-in identico ovunque (è la firma dei siti AI).
- **Sempre:** rispetta `prefers-reduced-motion`. Niente movimento per chi lo ha disattivato.

---

## 6. Voce e microcopy (in italiano vero)

Scrivi come parlerebbe un artigiano serio e competente al telefono — diretto, concreto, senza marketese.

**Sì:**
- "Interventi di idraulica a Milano e provincia. Pronto intervento 24 ore."
- "Chiama ora" / "Richiedi un preventivo gratuito" / "Scrivici su WhatsApp"
- "Oltre 15 anni di lavoro in zona. Preventivi chiari, senza sorprese."

**No (marketese da evitare):**
- "Soluzioni innovative per il tuo benessere abitativo"
- "Il partner ideale per ogni tua esigenza"
- "Eccellenza e qualità al tuo servizio"

**Regole:**
- Voce attiva. Il pulsante dice cosa succede: "Chiama ora", non "Invia".
- Coerenza: il pulsante "Richiedi preventivo" porta a una conferma che dice "Richiesta inviata".
- Gli errori del form non si scusano e non sono vaghi: "Inserisci un numero di telefono valido", non "Si è verificato un errore".
- Stato vuoto = invito ad agire, non decorazione.
- Specifico batte furbo: "Sostituzione caldaia in giornata" è meglio di "Soluzioni termiche su misura".

---

## 7. Elementi di fiducia (cruciali in Italia)

Gli artigiani vendono **fiducia**. Includi sempre, in modo visibile:
- Numero di telefono cliccabile (`tel:`) nell'header e nel footer.
- **Partita IVA** e ragione sociale nel footer (segnale di serietà e legalità).
- Zona/comuni serviti, esplicitati.
- Recensioni con **nome e città reali** (es. "Marco R., Sesto San Giovanni"), mai generiche.
- Foto del titolare o della squadra, se disponibili. Un volto reale converte.
- Eventuali certificazioni, assicurazioni, anni di attività.
- WhatsApp Business come canale: molti clienti italiani preferiscono scrivere.

---

## 8. Pavimento di qualità (non negoziabile)

Claude deve costruire ogni sito rispettando questi minimi, senza bisogno di chiederlo:
- **Responsive** fino a 320px di larghezza.
- **Performance:** caricamento sotto i 2 secondi. Immagini in WebP/AVIF, dimensionate. La velocità è un segnale di credibilità.
- **Accessibilità:** contrasto AA, focus tastiera visibile, `alt` su ogni immagine, navigazione da tastiera.
- **SEO locale:** title e meta description in italiano con città + servizio; dati strutturati `LocalBusiness` (schema.org) con telefono, indirizzo, orari.
- **Mobile:** tap target almeno 44px, telefono sempre a un tocco.
- **Cookie/privacy:** banner conforme, opzione "rifiuta" sullo stesso piano di "accetta" (anche obbligo normativo UE).

---

## 9. La firma (l'elemento da ricordare)

Ogni sito ha **un** elemento memorabile. Per questo settore, la firma di default è:

> **L'insegna d'officina.** L'header (o l'hero) tratta il nome dell'attività come un'insegna artigiana fatta a mano — display serif su una "targa" dal tono ottone/calce, con il mestiere e la zona come sottotitolo in `--font-util`, come la dicitura su una vera insegna. È caldo, italiano, radicato nel mestiere — e non somiglia a nessun template SaaS.

Spendi l'audacia *qui*. Tieni tutto il resto quieto e disciplinato.

---

## 10. Checklist anti-slop (rivedere prima di consegnare)

- [ ] L'hero usa una **foto reale** del lavoro del cliente, non stock?
- [ ] Il titolo è **una promessa in una riga**, non un elenco di servizi?
- [ ] La tipografia display **non è** un font di sistema o Inter?
- [ ] L'accento rame compare **solo dove deve guidare l'occhio**?
- [ ] Il movimento ha tempi **variati** e uno scopo, niente fade-in clonati?
- [ ] I testi suonano come **una persona vera**, non come il marketese?
- [ ] Telefono, P.IVA e zona servita sono **visibili**?
- [ ] Funziona e si legge bene **sul telefono**?
- [ ] C'è **una sola** firma memorabile, e il resto è quieto?

---

*Questo file è il punto di partenza, non una gabbia. Per ogni cliente: cambia la palette in base ai suoi materiali reali, sostituisci le foto con le sue, e adatta la voce al suo modo di parlare. La struttura resta; l'anima è del cliente.*
