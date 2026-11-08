# Red de Corrupción Política · España

Mapa interactivo de casos de corrupción política en España, desde los años 80 hasta 2026.
Cada político aparece como un nodo dentro de una **nube del color de su partido**. Las líneas unen a quienes
comparten caso. Al hacer clic en un político se abre su ficha con todos sus casos, el partido en el que
militaba cuando ocurrieron los hechos, el estado judicial y enlaces a noticias, informes y sentencias.

> ⚖️ **Presunción de inocencia.** Estar investigado o pendiente de juicio no implica culpabilidad.
> Los estados judiciales son los últimos conocidos a la fecha de corte (`DATOS.actualizado`) y los procesos
> abiertos cambian con frecuencia. Verifica siempre en las fuentes enlazadas.

## Cómo abrirla

Es una web estática sin compilación. Basta con abrir `index.html` en el navegador, o servir la carpeta:

```bash
python3 -m http.server 8000   # y visitar http://localhost:8000
```

Se puede publicar tal cual en GitHub Pages (Settings → Pages → rama y carpeta raíz).

## Qué incluye

| Función | Detalle |
|---|---|
| Nubes por partido | Agrupa por **partido del caso** (en el que militaba cuando ocurrieron la mayoría de sus casos) o por **partido actual** |
| Cambios de partido | Anillo discontinuo en el nodo, trayectoria de partidos en la ficha y partido concreto de cada caso (p. ej. Ábalos: PSOE → Grupo Mixto; Blasco: PSOE → PP) |
| Filtros | Partido (en el momento del caso), estado judicial, comunidad autónoma, número mínimo de casos, año de inicio, búsqueda libre y "solo quien cambió de partido" |
| Estados | En investigación · Pendiente/en juicio · Condenado (firme o no firme) · Absuelto · Archivado/sobreseído · Anulado/extinguido |
| Ficha del político | Casos ordenados por fecha, detalle personal, descripción del caso, tribunal, fuentes y botón para ver a todos los implicados |
| Ficha del caso | Implicados con su partido en el momento y su estado judicial |
| Fuentes | Noticias, informes y notas del CGPJ enlazadas por caso, más accesos a enciclopedia, hemeroteca, CENDOJ y notas del CGPJ |
| Vistas | Red (grafo de fuerzas con zoom y arrastre) y Listado (tabla) |
| Estilos | Tres temas intercambiables desde la cabecera: **Expediente**, **Hemeroteca** y **Radar** |

## Estructura

```
index.html        Maquetación
css/estilos.css   Estilos y los tres temas (variables CSS por data-theme)
js/app.js         Filtros, grafo D3 (nubes, fuerzas, zoom), fichas y listado
data/datos.js     Conjunto de datos: partidos, estados, casos y políticos
```

## Añadir o corregir datos

Todo está en `data/datos.js`.

```js
// Un caso
{ id: "mi_caso", nombre: "Caso X", inicio: 2020, ccaa: ["Madrid"],
  tribunal: "Audiencia Nacional", descripcion: "…", wiki: "Caso X",
  fuentes: [{ titulo: "…", medio: "El País", url: "https://…", tipo: "noticia" }] } // tipo: noticia | informe | sentencia

// Un político
{ id: "fulano", nombre: "Fulano de Tal", cargo: "Exalcalde de …", ccaa: "Madrid", partidoActual: "PP",
  historial: [{ partido: "PSOE", desde: 1990, hasta: 2003 }, { partido: "PP", desde: 2003 }],
  casos: [{ caso: "mi_caso", partido: "PP", estado: "juicio", firme: null, anio: 2026, detalle: "…" }] }
```

- `partido` dentro de cada caso es **el partido en el momento de los hechos**; `partidoActual` es el de hoy.
- `firme`: `true`, `false` o `null` si no aplica o no consta.
- Para un partido nuevo, añádelo en `partidos` con su color.

## Cobertura actual (corte: 8-nov-2026)

**109 personas y 78 casos**, desde el caso Banca Catalana (1984) hasta las causas abiertas en 2026,
repartidos entre más de 20 partidos estatales, autonómicos y locales, actuales y desaparecidos:

| Ámbito | Partidos incluidos |
|---|---|
| Estatales | PP, PSOE/PSC, IU, Podemos, Vox (como trayectoria) |
| Cataluña | CDC/CiU, Unió Democràtica, Junts, ERC |
| País Vasco y Navarra | PNV, UPN |
| Comunitat Valenciana | Compromís, Ens Uneix |
| Andalucía | GIL, Partido Andalucista, Partido Socialista de Andalucía |
| Canarias | Coalición Canaria, Independientes de Lanzarote |
| Otros | Unió Mallorquina, Partido Aragonés, UPCA (Cantabria), Coalición por Melilla, Democracia Ourensana |

Además de los grandes casos (Filesa, Roldán, Gürtel, ERE, Púnica, Palau, Pujol, Koldo…) se incluyen, entre
otros: Brugal, Emarsa, Azud, Alquería, financiación del PP valenciano, Gürtel Boadilla y visita del Papa,
Auditorio y Novo Carthago (Murcia), Faffe, Invercaria, Mercasevilla, Astapa, Juan Guerra, las camisetas de
Gil, caso asesores de Jerez, compra de votos en Melilla, Pallerols, Mercurio, 3%, Sitges, La Muela,
Hormaechea, Unión (Lanzarote), Eólico (Canarias), Urralburu, dietas de Caja Navarra, Pokémon, Over, túnel de
Sóller, Perla Negra, trama eólica de Castilla y León, viajes de Monago, Dos Hermanas, Plus Ultra y Auria TV.

**Partidos sin casos judiciales relevantes encontrados.** En la búsqueda no aparecieron condenas ni
imputaciones de relevancia por corrupción de cargos de Ciudadanos, EH Bildu, BNG o Más Madrid, ni de Vox
como partido. El único caso ligado a Vox es el de su exportavoz andaluz Francisco Serrano, por hechos de 2016
anteriores a su entrada en el partido, y figura así en los datos.

**Militancia no confirmada.** Algunos altos cargos designados (por ejemplo, Rafael Delgado en Castilla y León
o Celso Perdomo en Canarias) figuran como "Sin partido / no consta" porque no se ha podido confirmar su
afiliación, aunque se indica el Gobierno en el que servían.

No es exhaustiva: hay cientos de causas municipales que se pueden ir incorporando.

---

## Ideas de características para añadir

1. **Línea temporal animada**: un deslizador por años que reproduzca cómo aparecen y se cierran los casos de 1984 a hoy.
2. **Mapa de España por comunidades** (coropletas) con el número de casos y condenas, enlazado con los filtros.
3. **Nodos de caso y de empresa**: un modo "bipartito" donde casos, empresas (Gürtel, Aldama, Marjaliza…) e intermediarios sean nodos propios, para ver tramas que cruzan partidos.
4. **Cifras económicas**: dinero presuntamente defraudado, cantidades recuperadas, multas y años de condena; tamaño del nodo según importe.
5. **Cronología por caso**: hitos (detención, imputación, apertura de juicio, sentencia, recursos, indultos) con su fuente.
6. **Enlaces compartibles**: guardar los filtros y la ficha abierta en la URL para enviar una vista concreta.
7. **Aviso de cambios**: un registro de cambios y la fecha de la última verificación de cada caso.
8. **Actualización semiautomática**: un script que revise RSS de prensa y notas del CGPJ y proponga cambios de estado para revisión humana.
9. **Comparador de partidos**: gráficos de casos por partido y década, porcentaje de condenas frente a archivos y tiempo medio de instrucción.
10. **Indultos y amnistías**: etiqueta específica (p. ej. el indulto parcial a Laura Borràs) y filtro propio.
11. **Exportar** los datos filtrados a CSV/JSON y la imagen del grafo a PNG.
12. **Formulario de correcciones** con fuente obligatoria, para mantener los datos al día con ayuda de los lectores.

## Propuestas de estilo

Las tres primeras ya están implementadas y se cambian desde el selector **Estilo**:

- **Expediente** (por defecto): oscuro y sobrio, tipografía de máquina de escribir y acento rojo, como un sumario judicial. Transmite seriedad e investigación.
- **Hemeroteca**: papel crema, tipografías serif de periódico (Playfair Display y Source Serif), doble filete bajo la cabecera y trama de puntos. Encaja con la idea de archivo de prensa.
- **Radar**: fondo azul noche, nodos con brillo y acento turquesa, estilo sala de control de datos. Pensado para presentarlo en pantallas grandes o redes sociales.

Otras direcciones posibles:

- **Sumario confidencial**: fichas tipo carpeta con clips, sellos de "CONDENADO" o "ARCHIVADO" y texto tachado al estilo de un documento desclasificado.
- **Institucional / datos abiertos**: blanco, tipografía neutra y colores accesibles, cercano a un portal público de transparencia. Es el estilo más creíble para un uso periodístico.
- **Póster editorial**: colores planos muy saturados por partido y grandes titulares, para extraer piezas visuales y compartir.

## Fuentes y metodología

Los datos se han recopilado de prensa española (elDiario.es, El Independiente, Vozpópuli, The Objective,
Ara, Valencia Plaza, Infobae/EFE/Europa Press, Euronews, RTVC, Deia, Diari de Tarragona, entre otros), notas
de prensa del Consejo General del Poder Judicial y enciclopedias. Los casos recientes (2024-2026) se han
contrastado con noticias de 2026. Cuando no consta si una condena es firme, se deja como desconocido.
