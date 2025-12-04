# Photo Gallery - Húzható Carousel

## Funkciók

- ✅ **Végtelen auto-scroll**: A képek folyamatosan gördülnek jobbról balra
- ✅ **Egérrel húzható**: A carousel-t lehet húzni egérrel jobbra-balra
- ✅ **Érintéssel húzható**: Mobilon/tableten működik az érintéses húzás
- ✅ **Folyamatos mozgás**: Elengedés után folytatja a mozgást onnan, ahol éppen tartott
- ✅ **Lightbox**: Kép nagyításhoz kattints a + gombra
- ✅ **Billentyűzet támogatás**: Nyilak a navigáláshoz, ESC a bezáráshoz

## Használat

1. Nyisd meg az `index.html` fájlt böngészőben
2. Húzd a carousel-t egérrel vagy ujjal jobbra-balra
3. Engedje el, és a carousel folytatja a mozgást
4. Kattints a + gombra a képek nagyításához

## Fájlok

- `index.html` - Főoldal demo képekkel
- `photo-gallery.css` - Stílusok
- `photo-gallery.js` - Működés (drag & resume logika)

## Technikai megoldás

A carousel-t teljes egészében JavaScript-tel animálom `requestAnimationFrame` használatával:
- Folyamatosan követi az aktuális pozíciót
- Drag közben frissíti a pozíciót a húzás alapján
- Elengedés után folytatja az auto-scroll-t onnan, ahol éppen volt
- Végtelen loop: amikor eléri a végét, seamless módon visszaugrik az elejére

## Böngésző kompatibilitás

Működik minden modern böngészőben:
- Chrome, Firefox, Safari, Edge
- Mobil böngészők (iOS Safari, Chrome Mobile)
