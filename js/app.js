/* Red de corrupción política — lógica de la aplicación (D3 v7) */
(() => {
  "use strict";

  const D = window.DATOS;
  const casoPorId = new Map(D.casos.map(c => [c.id, c]));
  const politicoPorId = new Map(D.politicos.map(p => [p.id, p]));

  const COLOR_ESTADO = {
    investigacion: "#E8A33D",
    juicio: "#E2622B",
    condenado: "#C0182F",
    absuelto: "#2E9E5B",
    archivado: "#6E9C9E",
    anulado: "#8A8F98"
  };
  // De más a menos grave: se usa para el color "estado" del nodo
  const GRAVEDAD = ["condenado", "juicio", "investigacion", "anulado", "archivado", "absuelto"];
  const REALES = p => p !== "NINGUNO" && p !== "MIXTO";

  /* ------------------------- Enriquecer datos ------------------------- */
  D.politicos.forEach(p => {
    const reales = new Set(
      p.historial.map(h => h.partido).concat(p.casos.map(c => c.partido), [p.partidoActual]).filter(REALES)
    );
    p.cambioPartido = p.cambioPartido || reales.size > 1 ||
      p.historial.some((h, i) => i > 0 && h.partido !== p.historial[i - 1].partido && REALES(p.historial[i - 1].partido));
    // Partido "del caso": el más frecuente entre sus casos (empate -> el más reciente)
    const cuenta = d3.rollup(p.casos, v => ({ n: v.length, ult: d3.max(v, c => c.anio) }), c => c.partido);
    p.partidoCaso = [...cuenta].sort((a, b) => b[1].n - a[1].n || b[1].ult - a[1].ult)[0][0];
    p.texto = [p.nombre, p.cargo, ...p.casos.map(c => casoPorId.get(c.caso).nombre)].join(" ").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  });

  const todasCCAA = [...new Set(D.casos.flatMap(c => c.ccaa).concat(D.politicos.map(p => p.ccaa)))]
    .sort((a, b) => (a === "Nacional" ? -1 : b === "Nacional" ? 1 : a.localeCompare(b, "es")));
  const anioMin = d3.min(D.casos, c => c.inicio);
  const anioMax = d3.max(D.casos, c => c.inicio);
  const maxCasos = d3.max(D.politicos, p => p.casos.length);

  /* ------------------------------ Estado ------------------------------ */
  const inicial = () => ({
    partidos: new Set(Object.keys(D.partidos)),
    estados: new Set(Object.keys(D.estados)),
    ccaa: "",
    min: 1,
    desde: anioMin,
    hasta: anioMax,
    q: "",
    soloCambio: false,
    enlaces: true,
    agrupar: "caso",
    colorear: "partido",
    vista: "red"
  });
  let E = inicial();
  let seleccion = null; // { tipo: "politico"|"caso", id }

  /* ------------------------------ Utilidades ------------------------------ */
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const colorPartido = id => (D.partidos[id] || D.partidos.NINGUNO).color;
  const nombrePartido = id => (D.partidos[id] || D.partidos.NINGUNO).nombre;
  const chipPartido = id =>
    `<span class="etiqueta"><span class="punto" style="background:${colorPartido(id)}"></span>${esc(nombrePartido(id))}</span>`;
  const chipEstado = (estado, firme) => {
    const f = estado === "condenado" ? (firme === true ? " · firme" : firme === false ? " · no firme" : "") : "";
    return `<span class="etiqueta" style="border-color:${COLOR_ESTADO[estado]};color:${COLOR_ESTADO[estado]}">` +
      `<span class="punto" style="background:${COLOR_ESTADO[estado]}"></span>${esc(D.estados[estado].nombre)}${f}</span>`;
  };
  const peorEstado = casos => GRAVEDAD.find(g => casos.some(c => c.estado === g)) || "anulado";
  const grupoDe = p => (E.agrupar === "caso" ? p.partidoCaso : p.partidoActual);

  const urlWiki = t => `https://es.wikipedia.org/w/index.php?search=${encodeURIComponent(t)}&title=Especial:Buscar&go=Ir`;
  const urlNoticias = q => `https://news.google.com/search?q=${encodeURIComponent(q)}&hl=es&gl=ES&ceid=ES:es`;
  const URL_CENDOJ = "https://www.poderjudicial.es/search/indexAN.jsp";
  const URL_CGPJ = "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/";

  function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ } }
  function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }

  /* ------------------------------ Filtrado ------------------------------ */
  function casosFiltrados(p) {
    return p.casos.filter(pc => {
      const c = casoPorId.get(pc.caso);
      if (!E.partidos.has(pc.partido)) return false;
      if (!E.estados.has(pc.estado)) return false;
      if (E.ccaa && !(c.ccaa.includes(E.ccaa) || p.ccaa === E.ccaa)) return false;
      if (c.inicio < E.desde || c.inicio > E.hasta) return false;
      return true;
    });
  }

  function calcularVisibles() {
    const q = norm(E.q.trim());
    const res = [];
    D.politicos.forEach(p => {
      const fc = casosFiltrados(p);
      if (fc.length < E.min || fc.length === 0) return;
      if (q && !p.texto.includes(q)) return;
      if (E.soloCambio && !p.cambioPartido) return;
      res.push({ p, fc });
    });
    return res;
  }

  /* ------------------------------ Filtros (UI) ------------------------------ */
  function construirFiltros() {
    $("#actualizado").textContent = "datos a " + new Date(D.actualizado).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

    const cuentaPartido = d3.rollup(D.politicos.flatMap(p => p.casos), v => v.length, c => c.partido);
    const contP = $("#f-partidos");
    contP.innerHTML = Object.entries(D.partidos)
      .filter(([id]) => cuentaPartido.has(id))
      .sort((a, b) => (cuentaPartido.get(b[0]) || 0) - (cuentaPartido.get(a[0]) || 0))
      .map(([id, p]) => `<button class="chip" data-partido="${id}" aria-pressed="true">
          <span class="punto" style="background:${p.color}"></span>${esc(p.nombre)} <span class="n">${cuentaPartido.get(id)}</span></button>`)
      .join("");
    contP.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const id = b.dataset.partido;
      E.partidos.has(id) ? E.partidos.delete(id) : E.partidos.add(id);
      actualizar();
    });

    $("#f-estados").innerHTML = Object.entries(D.estados).map(([id, s]) =>
      `<label class="check"><input type="checkbox" data-estado="${id}" checked>
        <span class="muestra" style="background:${COLOR_ESTADO[id]}"></span>${esc(s.nombre)}</label>`).join("");
    $("#f-estados").addEventListener("change", e => {
      const id = e.target.dataset.estado; if (!id) return;
      e.target.checked ? E.estados.add(id) : E.estados.delete(id);
      actualizar();
    });

    document.querySelectorAll("[data-todos]").forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.todos;
      const todos = k === "partidos" ? Object.keys(D.partidos) : Object.keys(D.estados);
      E[k] = E[k].size === todos.length ? new Set() : new Set(todos);
      actualizar();
    }));

    $("#f-ccaa").insertAdjacentHTML("beforeend", todasCCAA.map(c => `<option>${esc(c)}</option>`).join(""));
    $("#f-ccaa").addEventListener("change", e => { E.ccaa = e.target.value; actualizar(); });

    const fMin = $("#f-min");
    fMin.max = maxCasos;
    fMin.addEventListener("input", () => { E.min = +fMin.value; actualizar(); });

    const fd = $("#f-desde"), fh = $("#f-hasta");
    [fd, fh].forEach(r => { r.min = anioMin; r.max = anioMax; r.step = 1; });
    fd.addEventListener("input", () => { E.desde = Math.min(+fd.value, E.hasta); actualizar(); });
    fh.addEventListener("input", () => { E.hasta = Math.max(+fh.value, E.desde); actualizar(); });

    let t;
    $("#buscar").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { E.q = e.target.value; actualizar(); }, 120); });
    $("#f-cambio").addEventListener("change", e => { E.soloCambio = e.target.checked; actualizar(); });
    $("#f-enlaces").addEventListener("change", e => { E.enlaces = e.target.checked; actualizar(); });

    segmentado("#agrupar", v => { E.agrupar = v; actualizar(true); });
    segmentado("#colorear", v => { E.colorear = v; actualizar(); });

    $("#reset").addEventListener("click", () => {
      const vista = E.vista; E = inicial(); E.vista = vista;
      $("#buscar").value = ""; $("#f-ccaa").value = "";
      actualizar(true);
    });

    document.querySelectorAll(".vista").forEach(b => b.addEventListener("click", () => {
      E.vista = b.dataset.vista; actualizar();
      if (E.vista === "red") ajustarZoom();
    }));

    $("#abrir-filtros").addEventListener("click", () => $("#filtros").classList.add("abierto"));
    $("#cerrar-filtros").addEventListener("click", () => $("#filtros").classList.remove("abierto"));
    $("#cerrar-panel").addEventListener("click", cerrarPanel);
    document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarPanel(); });

    const selTema = $("#tema");
    const temaGuardado = leer("tema");
    if (temaGuardado) { selTema.value = temaGuardado; document.documentElement.dataset.theme = temaGuardado; }
    selTema.addEventListener("change", () => {
      document.documentElement.dataset.theme = selTema.value; guardar("tema", selTema.value);
    });
  }

  function segmentado(sel, alCambiar) {
    const cont = $(sel);
    cont.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      alCambiar(b.dataset.valor);
    });
  }

  function sincronizarFiltros() {
    document.querySelectorAll("#f-partidos .chip").forEach(b => b.setAttribute("aria-pressed", E.partidos.has(b.dataset.partido)));
    document.querySelectorAll("#f-estados input").forEach(i => { i.checked = E.estados.has(i.dataset.estado); });
    $("#f-min").value = E.min; $("#f-min-valor").textContent = E.min;
    $("#f-desde").value = E.desde; $("#f-hasta").value = E.hasta;
    $("#f-anios-valor").textContent = `${E.desde} – ${E.hasta}`;
    $("#f-cambio").checked = E.soloCambio; $("#f-enlaces").checked = E.enlaces;
    document.querySelectorAll("#agrupar button").forEach(b => b.classList.toggle("activo", b.dataset.valor === E.agrupar));
    document.querySelectorAll("#colorear button").forEach(b => b.classList.toggle("activo", b.dataset.valor === E.colorear));
    document.querySelectorAll(".vista").forEach(b => {
      const a = b.dataset.vista === E.vista; b.classList.toggle("activa", a); b.setAttribute("aria-selected", a);
    });
    $("#vista-red").hidden = E.vista !== "red";
    $("#vista-listado").hidden = E.vista !== "listado";
  }

  /* ------------------------------ Grafo ------------------------------ */
  const svg = d3.select("#grafo");
  const raiz = svg.append("g");
  const capaNubes = raiz.append("g").attr("class", "capa-nubes");
  const capaEnlaces = raiz.append("g").attr("class", "capa-enlaces");
  const capaNodos = raiz.append("g").attr("class", "capa-nodos");
  const capaEtiquetas = raiz.append("g").attr("class", "capa-etiquetas");
  const tooltip = $("#tooltip");

  const zoom = d3.zoom().scaleExtent([0.25, 5]).on("zoom", e => {
    raiz.attr("transform", e.transform);
    svg.classed("zoom-cerca", e.transform.k >= 1.35);
  });
  svg.call(zoom).on("dblclick.zoom", null);
  svg.on("click", e => { if (e.target === svg.node()) cerrarPanel(); });
  $("#zoom-mas").addEventListener("click", () => svg.transition().duration(250).call(zoom.scaleBy, 1.35));
  $("#zoom-menos").addEventListener("click", () => svg.transition().duration(250).call(zoom.scaleBy, 1 / 1.35));
  $("#zoom-ajustar").addEventListener("click", () => ajustarZoom(true));

  const nodosPorId = new Map(); // conserva posiciones entre actualizaciones
  let nodos = [], enlaces = [], centros = new Map();
  let primeraVez = true;

  const radio = n => 6 + 4 * Math.sqrt(n.fc.length - 1) * 1.6 + (n.fc.length > 1 ? 1 : 0);

  const sim = d3.forceSimulation()
    .force("carga", d3.forceManyBody().strength(-60).distanceMax(220))
    .force("colision", d3.forceCollide().radius(n => radio(n) + 11).iterations(3))
    .force("x", d3.forceX(n => centros.get(n.grupo)?.x ?? 0).strength(0.11))
    .force("y", d3.forceY(n => centros.get(n.grupo)?.y ?? 0).strength(0.11))
    .force("enlaces", d3.forceLink().id(n => n.id).distance(46)
      .strength(l => (l.source.grupo === l.target.grupo ? 0.08 : 0.004)))
    .alphaDecay(0.035)
    .on("tick", dibujarTick);

  function tamLienzo() {
    const r = svg.node().getBoundingClientRect();
    return { w: Math.max(r.width, 320), h: Math.max(r.height, 320) };
  }

  function calcularCentros() {
    const { w, h } = tamLienzo();
    const grupos = d3.rollup(nodos, v => v.length, n => n.grupo);
    // El peso de cada nube tiene en cuenta el número de nodos y la longitud de su etiqueta,
    // para que los partidos pequeños con nombres largos no se pisen entre sí.
    const jer = d3.hierarchy({ children: [...grupos].map(([g, n]) => ({ g, n })) })
      .sum(d => (d.n ? Math.max(Math.pow(d.n, 1.35) + 4, Math.pow(nombrePartido(d.g).length / 3.2, 2)) : 0));
    d3.pack().size([w, h]).padding(Math.min(w, h) * 0.035)(jer);
    centros = new Map(jer.leaves().map(l => [l.data.g, { x: l.x, y: l.y }]));
  }

  function dibujarGrafo(visibles, reagrupar) {
    const ids = new Set(visibles.map(v => v.p.id));
    nodos = visibles.map(({ p, fc }) => {
      let n = nodosPorId.get(p.id);
      if (!n) { n = { id: p.id, p }; nodosPorId.set(p.id, n); }
      n.fc = fc; n.grupo = grupoDe(p);
      return n;
    });
    calcularCentros();
    nodos.forEach(n => {
      if (n.x == null || reagrupar) {
        const c = centros.get(n.grupo);
        if (n.x == null) { n.x = c.x + (Math.random() - .5) * 60; n.y = c.y + (Math.random() - .5) * 60; }
      }
    });

    // Enlaces: políticos que comparten algún caso (visible tras filtros)
    const porCaso = new Map();
    nodos.forEach(n => n.fc.forEach(c => {
      if (!porCaso.has(c.caso)) porCaso.set(c.caso, []);
      porCaso.get(c.caso).push(n.id);
    }));
    const mapa = new Map();
    porCaso.forEach((lista, caso) => {
      for (let i = 0; i < lista.length; i++) for (let j = i + 1; j < lista.length; j++) {
        const [a, b] = [lista[i], lista[j]].sort();
        const k = a + "|" + b;
        if (!mapa.has(k)) mapa.set(k, { source: a, target: b, casos: [] });
        mapa.get(k).casos.push(caso);
      }
    });
    enlaces = E.enlaces ? [...mapa.values()].filter(l => ids.has(l.source) && ids.has(l.target)) : [];

    // --- Nubes
    const grupos = d3.groups(nodos, n => n.grupo);
    const nubes = capaNubes.selectAll("g.nube").data(grupos, d => d[0]);
    nubes.exit().remove();
    const nubesNuevas = nubes.enter().append("g").attr("class", "nube");
    nubesNuevas.append("path");
    nubesNuevas.append("text").attr("class", "nube-etiqueta").attr("text-anchor", "middle");
    nubesNuevas.merge(nubes).each(function ([g]) {
      const col = colorPartido(g);
      d3.select(this).select("path")
        .attr("fill", col).style("fill-opacity", "var(--nube-opacidad)")
        .attr("stroke", col).style("stroke-opacity", "var(--nube-borde)").attr("stroke-width", 1.5);
      d3.select(this).select("text").attr("fill", col).text(nombrePartido(g));
    });

    // --- Enlaces
    const lin = capaEnlaces.selectAll("line").data(enlaces, d => (d.source.id || d.source) + "|" + (d.target.id || d.target));
    lin.exit().remove();
    lin.enter().append("line").attr("class", "enlace")
      .merge(lin).attr("stroke-width", d => 1 + d.casos.length * 0.8);

    // --- Nodos
    const nod = capaNodos.selectAll("g.nodo").data(nodos, d => d.id);
    nod.exit().remove();
    const nuevos = nod.enter().append("g").attr("class", "nodo")
      .attr("tabindex", 0).attr("role", "button")
      .on("click", (e, d) => { e.stopPropagation(); abrirPolitico(d.p.id); })
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirPolitico(d.p.id); } })
      .on("mouseenter", (e, d) => mostrarTooltip(e, d))
      .on("mousemove", e => moverTooltip(e))
      .on("mouseleave", () => { tooltip.hidden = true; })
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.2).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
    nuevos.append("circle").attr("class", "anillo-cambio");
    nuevos.append("circle").attr("class", "cuerpo");
    nuevos.append("text").attr("text-anchor", "middle");

    nuevos.merge(nod).each(function (d) {
      const g = d3.select(this);
      const r = radio(d);
      const color = E.colorear === "estado" ? COLOR_ESTADO[peorEstado(d.fc)] : colorPartido(d.grupo);
      g.attr("aria-label", `${d.p.nombre}, ${d.fc.length} caso(s)`);
      g.select("circle.cuerpo").attr("r", r).attr("fill", color).style("color", color);
      // Anillo discontinuo si cambió de partido: con el color del "otro" partido
      const otro = E.agrupar === "caso" ? d.p.partidoActual : d.p.partidoCaso;
      g.select("circle.anillo-cambio")
        .attr("r", r + 4)
        .attr("stroke", colorPartido(otro !== d.grupo ? otro : d.grupo))
        .attr("display", d.p.cambioPartido ? null : "none");
      g.classed("varios", d.fc.length > 1);
      g.select("text").attr("dy", r + 13).text(d.p.nombre);
    });

    sim.nodes(nodos);
    sim.force("enlaces").links(enlaces);
    sim.force("x").x(n => centros.get(n.grupo).x);
    sim.force("y").y(n => centros.get(n.grupo).y);
    sim.alpha(reagrupar ? 0.9 : 0.5).restart();

    aplicarResaltado();
    if (primeraVez) { primeraVez = false; setTimeout(() => ajustarZoom(false), 900); }
  }

  const lineaNube = d3.line().curve(d3.curveCatmullRomClosed.alpha(0.6));
  function caminoNube(ns) {
    const pts = [];
    ns.forEach(n => {
      const r = radio(n) + 20;
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2;
        pts.push([n.x + r * Math.cos(a), n.y + r * Math.sin(a)]);
      }
    });
    const casco = d3.polygonHull(pts);
    return casco ? lineaNube(casco) : null;
  }

  function dibujarTick() {
    capaNubes.selectAll("g.nube").each(function ([, ns]) {
      const g = d3.select(this);
      g.select("path").attr("d", caminoNube(ns));
      const minY = d3.min(ns, n => n.y - radio(n)) - 26;
      g.select("text").attr("x", d3.mean(ns, n => n.x)).attr("y", minY);
    });
    capaEnlaces.selectAll("line")
      .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    capaNodos.selectAll("g.nodo").attr("transform", d => `translate(${d.x},${d.y})`);
  }

  function ajustarZoom(animado = true) {
    if (!nodos.length) return;
    const { w, h } = tamLienzo();
    const x0 = d3.min(nodos, n => n.x) - 70, x1 = d3.max(nodos, n => n.x) + 70;
    const y0 = d3.min(nodos, n => n.y) - 70, y1 = d3.max(nodos, n => n.y) + 50;
    const k = Math.min(2.2, 0.95 / Math.max((x1 - x0) / w, (y1 - y0) / h));
    const t = d3.zoomIdentity.translate(w / 2, h / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
    (animado ? svg.transition().duration(500) : svg).call(zoom.transform, t);
  }

  function aplicarResaltado() {
    let activos = null;
    if (seleccion?.tipo === "politico") {
      activos = new Set([seleccion.id]);
      enlaces.forEach(l => {
        if (l.source.id === seleccion.id) activos.add(l.target.id);
        if (l.target.id === seleccion.id) activos.add(l.source.id);
      });
    } else if (seleccion?.tipo === "caso") {
      activos = new Set(D.politicos.filter(p => p.casos.some(c => c.caso === seleccion.id)).map(p => p.id));
    }
    svg.classed("hay-seleccion", !!activos);
    capaNodos.selectAll("g.nodo")
      .classed("atenuado", d => activos && !activos.has(d.id))
      .classed("seleccionado", d => seleccion?.tipo === "politico" && d.id === seleccion.id);
    capaEnlaces.selectAll("line")
      .classed("atenuado", d => activos && !(activos.has(d.source.id) && activos.has(d.target.id)))
      .classed("resaltado", d => seleccion && (
        (seleccion.tipo === "politico" && (d.source.id === seleccion.id || d.target.id === seleccion.id)) ||
        (seleccion.tipo === "caso" && d.casos.includes(seleccion.id))));
  }

  /* ------------------------------ Tooltip ------------------------------ */
  function mostrarTooltip(e, d) {
    const nombres = d.fc.map(c => esc(casoPorId.get(c.caso).nombre)).join("<br>");
    tooltip.innerHTML = `<strong>${esc(d.p.nombre)}</strong><span class="suave">${esc(d.p.cargo)}</span>
      <div style="margin-top:6px">${chipEstado(peorEstado(d.fc))}</div>
      <div style="margin-top:6px">${nombres}</div>
      ${d.p.cambioPartido ? `<div class="suave" style="margin-top:6px">↺ Cambió de partido</div>` : ""}`;
    tooltip.hidden = false; moverTooltip(e);
  }
  function moverTooltip(e) {
    const caja = $("#vista-red").getBoundingClientRect();
    let x = e.clientX - caja.left + 14, y = e.clientY - caja.top + 14;
    if (x + 290 > caja.width) x -= 300;
    if (y + 160 > caja.height) y -= 170;
    tooltip.style.left = x + "px"; tooltip.style.top = y + "px";
  }

  /* ------------------------------ Panel ------------------------------ */
  function fuentesHTML(caso, extra) {
    const lista = (caso.fuentes || []).map(f =>
      `<li><span class="tipo">${esc(f.tipo)}</span><span><a href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">${esc(f.titulo)}</a>
       <span class="medio"> — ${esc(f.medio)}</span></span></li>`).join("");
    return `${lista ? `<ul class="fuentes">${lista}</ul>` : ""}
      <div class="mas-fuentes">
        <a href="${urlWiki(caso.wiki || caso.nombre)}" target="_blank" rel="noopener noreferrer">Enciclopedia</a>
        <a href="${urlNoticias(extra ? `"${extra}" ${caso.nombre}` : caso.nombre)}" target="_blank" rel="noopener noreferrer">Hemeroteca de noticias</a>
        <a href="${URL_CENDOJ}" target="_blank" rel="noopener noreferrer">Sentencias (CENDOJ)</a>
        <a href="${URL_CGPJ}" target="_blank" rel="noopener noreferrer">Notas del CGPJ</a>
      </div>`;
  }

  function abrirPolitico(id) {
    const p = politicoPorId.get(id);
    seleccion = { tipo: "politico", id };
    const tray = p.historial.length
      ? p.historial.map(h => `${chipPartido(h.partido)}<small>${h.desde || ""}${h.desde || h.hasta ? "–" : ""}${h.hasta || (h.desde ? "hoy" : "")}</small>`)
          .join('<span class="flecha">→</span>')
      : '<span class="suave">Sin militancia conocida</span>';
    const casos = [...p.casos].sort((a, b) => b.anio - a.anio).map(pc => {
      const c = casoPorId.get(pc.caso);
      const nImpl = D.politicos.filter(o => o.casos.some(x => x.caso === c.id)).length;
      return `<article class="tarjeta-caso" style="border-left-color:${COLOR_ESTADO[pc.estado]}">
        <h3>${esc(c.nombre)}</h3>
        <div class="meta">
          ${chipEstado(pc.estado, pc.firme)}
          <span class="etiqueta" title="Partido en el que militaba cuando ocurrieron los hechos">En el caso: <span class="punto" style="background:${colorPartido(pc.partido)}"></span>${esc(nombrePartido(pc.partido))}</span>
          <span class="etiqueta">Inicio ${c.inicio}</span>
          <span class="etiqueta">${esc(c.ccaa.join(", "))}</span>
        </div>
        <p class="detalle">${esc(pc.detalle)}</p>
        <p class="desc">${esc(c.descripcion)}</p>
        <p class="tribunal">⚖ ${esc(c.tribunal)}</p>
        ${nImpl > 1 ? `<button class="btn-enlace" data-caso="${c.id}">Ver los ${nImpl} implicados en este caso</button>` : ""}
        ${fuentesHTML(c, p.nombre)}
      </article>`;
    }).join("");

    mostrarPanel(`
      <h2>${esc(p.nombre)}</h2>
      <p class="cargo">${esc(p.cargo)} · ${esc(p.ccaa)}</p>
      <div class="etiquetas">
        <span class="etiqueta">Partido actual:&nbsp;<span class="punto" style="background:${colorPartido(p.partidoActual)}"></span>${esc(nombrePartido(p.partidoActual))}</span>
        <span class="etiqueta">${p.casos.length} caso${p.casos.length > 1 ? "s" : ""}</span>
        ${p.cambioPartido ? '<span class="etiqueta alerta">↺ Cambió de partido</span>' : ""}
      </div>
      <div class="seccion-titulo">Trayectoria de partido</div>
      <div class="trayectoria">${tray}</div>
      <div class="seccion-titulo">Casos</div>
      ${casos}`);
  }

  function abrirCaso(id) {
    const c = casoPorId.get(id);
    seleccion = { tipo: "caso", id };
    const impl = D.politicos.map(p => ({ p, pc: p.casos.find(x => x.caso === id) })).filter(x => x.pc);
    mostrarPanel(`
      <h2>${esc(c.nombre)}</h2>
      <p class="cargo">Desde ${c.inicio} · ${esc(c.ccaa.join(", "))}</p>
      <p>${esc(c.descripcion)}</p>
      <p class="tribunal">⚖ ${esc(c.tribunal)}</p>
      <div class="seccion-titulo">Implicados (${impl.length})</div>
      <ul class="implicados">${impl.map(({ p, pc }) => `
        <li><button class="btn-enlace" data-politico="${p.id}">${esc(p.nombre)}</button>
        ${chipPartido(pc.partido)} ${chipEstado(pc.estado, pc.firme)}</li>`).join("")}</ul>
      <div class="seccion-titulo">Noticias, informes y sentencias</div>
      ${fuentesHTML(c)}`);
  }

  function mostrarPanel(html) {
    const panel = $("#panel");
    $("#panel-contenido").innerHTML = html;
    panel.hidden = false; panel.scrollTop = 0;
    aplicarResaltado();
  }

  function cerrarPanel() {
    if ($("#panel").hidden) return;
    $("#panel").hidden = true; seleccion = null; aplicarResaltado();
  }

  $("#panel").addEventListener("click", e => {
    const bc = e.target.closest("[data-caso]"); if (bc) return abrirCaso(bc.dataset.caso);
    const bp = e.target.closest("[data-politico]"); if (bp) return abrirPolitico(bp.dataset.politico);
  });

  /* ------------------------------ Listado ------------------------------ */
  function dibujarListado(visibles) {
    const filas = [...visibles].sort((a, b) => b.fc.length - a.fc.length || a.p.nombre.localeCompare(b.p.nombre, "es"));
    $("#tabla-cuerpo").innerHTML = filas.map(({ p, fc }) => `
      <tr data-politico="${p.id}" tabindex="0">
        <td><strong>${esc(p.nombre)}</strong><br><small style="color:var(--texto-suave)">${esc(p.cargo)}</small></td>
        <td>${chipPartido(p.partidoActual)}${p.cambioPartido ? ' <span title="Cambió de partido">↺</span>' : ""}</td>
        <td>${esc(p.ccaa)}</td>
        <td>${fc.map(c => esc(casoPorId.get(c.caso).nombre)).join("<br>")}</td>
        <td>${[...new Set(fc.map(c => c.estado))].map(s => chipEstado(s)).join(" ")}</td>
      </tr>`).join("") || `<tr><td colspan="5">Ningún resultado con estos filtros.</td></tr>`;
  }
  $("#tabla-cuerpo").addEventListener("click", e => {
    const tr = e.target.closest("tr[data-politico]"); if (tr) abrirPolitico(tr.dataset.politico);
  });
  $("#tabla-cuerpo").addEventListener("keydown", e => {
    const tr = e.target.closest("tr[data-politico]");
    if (tr && e.key === "Enter") abrirPolitico(tr.dataset.politico);
  });

  /* ------------------------------ Resumen y leyenda ------------------------------ */
  function dibujarResumen(visibles) {
    const pcs = visibles.flatMap(v => v.fc);
    const nCasos = new Set(pcs.map(c => c.caso)).size;
    const porEstado = d3.rollup(pcs, v => v.length, c => c.estado);
    $("#resumen").innerHTML =
      `<span><b>${visibles.length}</b> políticos</span><span><b>${nCasos}</b> casos</span>` +
      Object.keys(D.estados).filter(s => porEstado.get(s))
        .map(s => `<span class="estado-mini"><i style="background:${COLOR_ESTADO[s]}"></i>${esc(D.estados[s].nombre)}: <b>${porEstado.get(s)}</b></span>`).join("");
  }

  function dibujarLeyenda() {
    const filas = [
      `<div class="fila"><i style="background:var(--texto-suave);width:7px;height:7px"></i> 1 caso &nbsp; <i style="background:var(--texto-suave);width:15px;height:15px"></i> varios</div>`,
      `<div class="fila"><i class="anillo"></i> Cambió de partido</div>`,
      `<div class="fila">— Comparten caso</div>`
    ];
    if (E.colorear === "estado") {
      filas.unshift(...Object.entries(D.estados).map(([id, s]) => `<div class="fila"><i style="background:${COLOR_ESTADO[id]}"></i>${esc(s.nombre)}</div>`));
    } else {
      filas.unshift(`<div class="fila"><strong>Nube = ${E.agrupar === "caso" ? "partido en sus casos" : "partido actual"}</strong></div>`);
    }
    $("#leyenda").innerHTML = filas.join("");
  }

  /* ------------------------------ Ciclo principal ------------------------------ */
  function actualizar(reagrupar = false) {
    sincronizarFiltros();
    const visibles = calcularVisibles();
    dibujarResumen(visibles);
    dibujarLeyenda();
    dibujarListado(visibles);
    dibujarGrafo(visibles, reagrupar);
  }

  let tRes;
  window.addEventListener("resize", () => {
    clearTimeout(tRes);
    tRes = setTimeout(() => { calcularCentros(); sim.alpha(0.4).restart(); }, 150);
  });

  construirFiltros();
  actualizar(true);
})();
