# Raumwerk – Astro

Die statische Raumwerk-Website als Astro-Projekt. Aus den ursprünglichen HTML-Dateien
wurden wiederverwendbare Komponenten (Nav, Footer) und ein gemeinsames Layout, sodass
Kopf, Navigation und Fußzeile nur noch an einer Stelle gepflegt werden.

## Befehle

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server unter http://localhost:4321
npm run build    # Produktions-Build nach ./dist
npm run preview  # den Build lokal ansehen
```

## Struktur

```
src/
├── layouts/
│   └── BaseLayout.astro   # <head>, Google Fonts, Nav, Footer + Interaktions-Script
├── components/
│   ├── Nav.astro          # Navigation (Prop `active` markiert die aktuelle Seite)
│   └── Footer.astro       # Fußzeile
├── pages/                 # je eine Datei pro Route
│   ├── index.astro        # /
│   ├── projekte.astro     # /projekte
│   ├── leistungen.astro   # /leistungen
│   ├── ueber-uns.astro    # /ueber-uns
│   ├── kontakt.astro      # /kontakt
│   ├── impressum.astro    # /impressum
│   ├── datenschutz.astro  # /datenschutz
│   └── projekte/
│       └── [slug].astro   # /projekte/<slug> – Detailseite je Projekt (dynamisch)
├── content/
│   ├── config.ts          # Schema der Projekte-Collection
│   └── projekte/          # ein .md pro Projekt (Custom Post Type)
├── data/                  # editierbare Inhalte (CloudCannon)
│   ├── site.json          # global: Navigation, Footer, Kontaktdaten
│   ├── home.json          # Inhalt der Startseite
│   ├── projekte.json      # Fallstudien
│   ├── leistungen.json    # Phasen, Honorarpakete, FAQ
│   ├── ueber-uns.json     # Story, Werte, Team, Auszeichnungen
│   └── kontakt.json       # Kontaktblöcke, Formular-Optionen
├── legal/                 # Rechtstexte als Markdown (Content-Editor / Rich-Text)
│   ├── impressum.md
│   └── datenschutz.md
└── styles/
    └── style.css          # unverändert aus dem Original übernommen
```

## Was sich geändert hat

- **Links** verwenden jetzt saubere Routen (`/projekte` statt `projekte.html`).
- **Nav & Footer** liegen einmalig in `src/components/` – keine Duplikate mehr pro Seite.
- **script.js** wurde in das Layout eingebettet und wird von Astro gebündelt (als Modul).
- **style.css** wurde unverändert übernommen und im Layout importiert.

## CloudCannon / Visual Editing

Damit sich die Website in CloudCannon bearbeiten lässt, stecken die **Inhalte
nicht mehr fest in den `.astro`-Templates**, sondern in editierbaren Datenquellen.
Die Templates rendern nur noch daraus. Konfiguriert wird das in
[`cloudcannon.config.yml`](cloudcannon.config.yml):

- **Data → site** — globale Inhalte (Navigation, Footer, Kontakt) aus `src/data/site.json`.
- **Seiten** — je Seite eine JSON-Datei in `src/data/`, Bearbeitung als Formular.
- **Rechtstexte** — Impressum/Datenschutz aus `src/legal/*.md`, Bearbeitung im Content-Editor (Rich-Text/WYSIWYG).

### Projekte als Collection (Custom Post Type)

Jedes Projekt ist eine eigene Markdown-Datei in `src/content/projekte/`. In CloudCannon
erscheint dafür die Sammlung **Projekte**; über **„Add"** legt der Kunde ein neues Projekt an
(Vorlage: `.cloudcannon/schemas/projekt.md`). Beim nächsten Build erzeugt Astro daraus
automatisch:

- die Übersicht `/projekte` (Karten-Raster, sortiert nach `order`) und
- eine Detailseite `/projekte/<slug>` (Slug = Dateiname).

Felder je Projekt (`src/content/config.ts` erzwingt das Schema): `title`, `category`,
`location`, `year`, `order`, `size` (Kachelgröße), `image`, `image_alt`, `facts` (Liste aus
Label/Wert), `tags` (Liste) sowie der Markdown-Body als Projektbeschreibung.

Weil die `.astro`-Dateien reine Templates sind, tauchen sie nicht mehr als
„bearbeitbarer Inhalt" auf – dadurch verschwindet die WYSIWYG-Fehlermeldung.

Build-Einstellungen in CloudCannon (falls nachzutragen):

- **Install:** `npm install`
- **Build:** `npm run build`
- **Output:** `dist`

Optionaler nächster Schritt: echtes On-Page-WYSIWYG über das Paket
`@cloudcannon/editable-regions` (Bindings direkt auf der Live-Seite). Das ist eine
frühe Version und sollte gegen eine echte CloudCannon-Instanz getestet werden.

## Hinweise

- Die Bilder werden weiterhin von Unsplash geladen. Für einen produktiven Auftritt
  empfiehlt es sich, sie lokal in `public/` oder `src/assets/` abzulegen und über
  Astros `<Image />`-Komponente auszuliefern.
- Das Kontaktformular ist wie im Original nur eine Frontend-Attrappe (kein Versand).
