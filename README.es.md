[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Pumpkin Jam — Creador de música y juego de memoria de Halloween

🎃 El baterista calabaza busca compañeros fantasmales. En Pumpkin Jam puedes mezclar percusión cálida, bajos burbujeantes, campanas de caramelo y voces de medianoche. Elige los personajes de esta banda original, inicia el bucle y escucha cómo cuatro partes pequeñas transforman la melodía.

**[Jugar ahora](https://halloween-sprunki.crazy3d.org/)** · [Ver los 12 juegos de Halloween](https://github.com/AshinTop/halloween-games) · [⭐ Dar una estrella en GitHub](https://github.com/AshinTop/halloween-sprunki)

El README está disponible en cinco idiomas. La **interfaz del juego solo ofrece inglés y chino simplificado**.

![Creador musical Pumpkin Jam con cuatro monstruos, selección de sonidos y controles de reproducción](docs/images/gameplay.jpg)

## Qué lo hace especial

- Cuatro funciones: ritmo, bajo, melodía y voz, con dos personajes originales para cada una.
- Tres preajustes, tres conjuntos secretos y cambios que entran al empezar el siguiente compás.
- Silencio por pista, Solo, eliminación de partes y volumen general.
- Ghost Echo: cinco rondas de memoria musical con cuatro notas y sin contrarreloj.
- Personajes SVG e instrumentos Web Audio originales, enlaces de mezcla y movimiento reducido.

## Cómo jugar

Elige un personaje para cada función o empieza con un preajuste. Pulsa **Start**: el navegador necesita esa interacción antes de iniciar el audio. Toca otra tarjeta para cambiar un personaje. En escritorio también puedes arrastrarlo a su puesto correspondiente; un bajista no ocupa la posición de melodía.

Todas las partes comparten **96 BPM, do menor y un compás de 16 pasos**. Mientras suena la banda, los cambios esperan al inicio del siguiente compás. Mute silencia una parte, Solo permite escucharla aislada y el botón de eliminar deja libre su puesto.

### Prueba Ghost Echo

Pulsa **Listen**, recuerda las notas que tocan los personajes y repítelas en orden con los cuatro botones. Las cinco rondas crecen de tres a siete notas. Si te equivocas, puedes escuchar de nuevo. Abrir Echo pausa la banda; ocultar la página detiene la reproducción y cancela la secuencia pendiente. Al volver, pulsa Start o Listen para continuar.

## Controles

| Acción | Cómo hacerlo |
| --- | --- |
| Elegir personaje | Clic o toque; arrastrar al puesto correcto en escritorio |
| Reproducir o pausar | Botón de reproducción; **Espacio** fuera de controles y diálogos |
| Ajustar las partes | Botones **Mute**, **Solo** y eliminar |
| Volumen general | Deslizador de volumen |
| Repetir notas de Echo | Cuatro botones o **1–4** durante tu turno |
| Compartir | Abrir Share y copiar el enlace mostrado |

## Un poco de estrategia

Empieza con ritmo y bajo; añade después melodía y voz de una en una. Escucha una parte con Solo y luego reúne al grupo. Los conjuntos secretos se descubren cuando la combinación completa está sonando: activa todas las pistas, desactiva Solo, sube el volumen y deja comenzar el siguiente compás.

## Progreso y enlaces de desafío

La mezcla, los silencios, el volumen, el idioma, los descubrimientos y los logros de Echo se guardan en el navegador. Otro navegador tendrá registros independientes. El juego sigue funcionando si no hay almacenamiento disponible.

Un [enlace de ejemplo](https://halloween-sprunki.crazy3d.org/#mix=v1-1010-0000) recupera los cuatro personajes y sus silencios, pero no el modo Solo. Quien lo recibe pulsa Start para escucharlo. El enlace no sube una grabación ni reproduce sonido automáticamente.

## Capturas y presentación en vídeo

![Pumpkin Jam en un iframe compacto con instrumentos y botón para empezar la música](docs/images/mobile.jpg)

Captura real dentro de un iframe compacto. Muestra la distribución en una ventana pequeña, no una prueba en un teléfono físico.

[Reproductor y transcripción](https://halloween-sprunki.crazy3d.org/intro.html) · [Descargar el MP4](docs/media/intro.mp4)

La **presentación de 24 segundos, sin sonido**, combina capturas reales y rótulos. Es un recorrido visual, no una partida grabada de forma continua ni una muestra de audio.

## Preguntas frecuentes

### ¿Es un mod de otro juego Sprunki?

No. Los personajes, ilustraciones, instrumentos sintetizados, patrones y código son propios de Pumpkin Jam. Forma parte de la misma colección del sitio.

### ¿Por qué no escucho nada?

Pulsa Start y revisa volumen general, pistas silenciadas, volumen del dispositivo y permisos de sonido del navegador. Tras ocultar la página debes pulsar Start o Listen de nuevo.

### ¿Puedo grabar o exportar una canción?

Esta versión comparte enlaces de arreglos. No graba micrófonos, exporta archivos WAV ni sube interpretaciones.

## Ejecutar en local e insertar el juego

Sirve la raíz del repositorio mediante HTTP:

```sh
python3 -m http.server 4173
```

Abre **http://localhost:4173/**. No requiere compilación ni dependencias. Usa HTTP: `file://` puede bloquear los módulos JavaScript.

Ejecuta las comprobaciones incluidas con Node:

```sh
npm test
```

Las pruebas comprueban enlaces, conjuntos, eventos musicales, Echo y el programador de audio real con relojes simulados, incluidos bloqueos largos y cancelaciones. No miden la latencia de un dispositivo físico ni sustituyen una escucha humana.

```html
<iframe src="https://halloween-sprunki.crazy3d.org/?embed=1"
  title="Pumpkin Jam"
  style="display:block;width:100%;height:654px;border:0"
  allow="autoplay; fullscreen" allowfullscreen></iframe>
```

Se revisaron tamaños de **1160×654**, **390×794**, **390×650** y **844×340**. Los preajustes y las instrucciones adicionales usan diálogos compactos. Se necesitan Web Audio y módulos JavaScript. El permiso autoplay del iframe no sustituye el botón Start ni reanuda automáticamente una página que estuvo oculta.

Consulta [EMBEDDING.md](EMBEDDING.md) para tamaño, almacenamiento, foco y permisos. Mide la altura restante después de la barra del sitio anfitrión.

## Más pequeñas aventuras de Halloween

- **[Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-rhythm-parade) — Interpreta tres canciones originales en cuatro carriles.
- **[Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-3d) — Enciende un jardín de calabazas con lógica Lights Out y vínculos de almas.
- **[Haunted Hearts](https://halloween-love-game.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-love-game) — Ayuda a dos fantasmas a compartir puertas, caminos y una linterna.
- **[Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-tripeaks) — Encadena cartas de valores consecutivos en ocho rescates.

## Créditos y apoyo

Creado para **AshinTop** y **Midnight Candy Club** con diseño, programación y revisión dirigidos por personas y asistidos por IA. Arte y sonidos sintetizados originales del proyecto. No necesita cuenta remota; el alojamiento puede añadir scripts o registros de solicitudes.

¿Te ha gustado? **[Dale una estrella en GitHub](https://github.com/AshinTop/halloween-sprunki)**. Para informar de errores, incluye navegador, tamaño del iframe, enlace y pasos para reproducirlos.
