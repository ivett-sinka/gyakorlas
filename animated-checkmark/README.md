# Animált Pipa Ikon - Vonalvezetés Animáció

Egy SVG alapú animált pipa (checkmark) ikon, ahol először a kör rajzolódik körbe, majd a pipa vonala jelenik meg vonalvezetés animációval.

## Funkciók

- ✅ **Stroke Drawing Animáció** - A vonalak fokozatosan rajzolódnak ki
- ✅ **Szekvenciális megjelenés** - Először a kör, majd a pipa
- ✅ **Smooth easing** - Cubic-bezier animáció görbével
- ✅ **Újrajátszható** - Gombnyomásra újraindítható
- ✅ **Responsive** - Minden képernyőmérethez alkalmazkodik
- ✅ **Standalone SVG** - Használható HTML nélkül is

## Fájlok

```
animated-checkmark/
├── index.html                  # Demo oldal
├── style.css                   # Animáció stílusok
├── checkmark-animated.svg      # Standalone animált SVG
└── README.md                   # Dokumentáció
```

## Használat

### 1. HTML + CSS verzió

```html
<link rel="stylesheet" href="style.css">

<svg xmlns="http://www.w3.org/2000/svg"
     class="animated-checkmark animate"
     viewBox="0 0 378.9 446.19">
    <circle class="checkmark-circle" cx="189.45" cy="223.09" r="170.67"
            style="fill: none; stroke: #caa961; stroke-width: 15px;"/>
    <polyline class="checkmark-check" points="111.52 224.01 160.61 277.17 267.38 169.02"
              style="fill: none; stroke: #caa961; stroke-width: 27.76px;"/>
</svg>
```

**JavaScript trigger:**
```javascript
// Animáció indítása
document.querySelector('.animated-checkmark').classList.add('animate');
```

### 2. Standalone SVG verzió

Egyszerűen használd a `checkmark-animated.svg` fájlt:

```html
<img src="checkmark-animated.svg" alt="Animated Checkmark" width="200">
```

vagy

```html
<object data="checkmark-animated.svg" type="image/svg+xml" width="200"></object>
```

Az animáció automatikusan elindul amikor az SVG betöltődik!

## Animáció Részletei

### Időzítés

1. **0.0s - 0.3s**: Opacity fade-in (láthatatlanból láthatóvá)
2. **0.3s - 1.8s**: Kör rajzolódik körbe (1.5s)
3. **1.8s - 2.6s**: Pipa vonala rajzolódik (0.8s)

### CSS Animáció Paraméterei

```css
/* Kör */
stroke-dasharray: 1072;  /* Teljes kerület */
stroke-dashoffset: 1072 → 0;  /* Rajzolás */
animation: 1.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Pipa */
stroke-dasharray: 250;  /* Vonal hossza */
stroke-dashoffset: 250 → 0;  /* Rajzolás */
animation: 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.5s;  /* 1.5s delay */
```

## Testreszabás

### Szín módosítása

CSS-ben:
```css
.checkmark-circle,
.checkmark-check {
    stroke: #YOUR_COLOR;
}
```

Vagy SVG-ben:
```html
<circle ... style="stroke: #YOUR_COLOR;"/>
```

### Sebesség módosítása

CSS-ben:
```css
/* Gyorsabb animáció */
.checkmark-circle {
    transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkmark-check {
    transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s;
}
```

### Méret módosítása

```css
.animated-checkmark {
    width: 300px;  /* Kívánt méret */
    height: auto;
}
```

## Böngésző Támogatás

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## Kipróbálás

Nyisd meg az `index.html` fájlt böngészőben:

```bash
open index.html
# vagy
python -m http.server 8000
# majd nyisd meg: http://localhost:8000
```

## Licenc

Szabad felhasználás, módosítás.

## Készítette

Ivett Sinka - 2025
