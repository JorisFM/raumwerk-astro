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
│   └── datenschutz.astro  # /datenschutz
└── styles/
    └── style.css          # unverändert aus dem Original übernommen
```

## Was sich geändert hat

- **Links** verwenden jetzt saubere Routen (`/projekte` statt `projekte.html`).
- **Nav & Footer** liegen einmalig in `src/components/` – keine Duplikate mehr pro Seite.
- **script.js** wurde in das Layout eingebettet und wird von Astro gebündelt (als Modul).
- **style.css** wurde unverändert übernommen und im Layout importiert.

## Hinweise

- Die Bilder werden weiterhin von Unsplash geladen. Für einen produktiven Auftritt
  empfiehlt es sich, sie lokal in `public/` oder `src/assets/` abzulegen und über
  Astros `<Image />`-Komponente auszuliefern.
- Das Kontaktformular ist wie im Original nur eine Frontend-Attrappe (kein Versand).
