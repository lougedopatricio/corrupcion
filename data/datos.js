/*
 * Red de corrupción política en España — conjunto de datos
 * ---------------------------------------------------------
 * Fuentes: hemerotecas de prensa española, notas del CGPJ y Wikipedia.
 * Cada caso enlaza a sus fuentes. El estado judicial indicado es el último
 * conocido a la fecha de "actualizado"; los procesos abiertos cambian a menudo.
 *
 * IMPORTANTE: rige la presunción de inocencia. Estar "investigado" o
 * "pendiente de juicio" no implica culpabilidad.
 *
 * Estructura
 *   partidos[id]     -> { nombre, color }
 *   casos[]          -> { id, nombre, inicio, ccaa[], tribunal, descripcion, wiki, fuentes[] }
 *   politicos[]      -> { id, nombre, cargo, ccaa, partidoActual, historial[], casos[] }
 *       historial[]  -> { partido, desde, hasta }   (trayectoria de partidos)
 *       casos[]      -> { caso, partido, estado, firme, anio, detalle }
 *           partido  = partido en el que militaba cuando ocurrieron los hechos
 *                      ("NINGUNO" = sin partido o militancia no confirmada)
 *           estado   = investigacion | juicio | condenado | absuelto | archivado | anulado (incluye prescrito o extinguido)
 *           firme    = true | false | null (desconocido / no aplica)
 */
window.DATOS = {
  actualizado: "2026-11-08",

  partidos: {
    PSOE:    { nombre: "PSOE",                 color: "#E30613" },
    PSC:     { nombre: "PSC",                  color: "#F2545B" },
    PP:      { nombre: "Partido Popular",      color: "#1D84CE" },
    CDC:     { nombre: "CDC / CiU",            color: "#16467F" },
    JUNTS:   { nombre: "Junts",                color: "#13B5A6" },
    PNV:     { nombre: "PNV",                  color: "#008D3F" },
    CC:      { nombre: "Coalición Canaria",    color: "#F5C400" },
    GIL:     { nombre: "GIL",                  color: "#8C6A3F" },
    UM:      { nombre: "Unió Mallorquina",     color: "#F08A00" },
    IU:      { nombre: "Izquierda Unida",      color: "#A3172B" },
    PODEMOS: { nombre: "Podemos",              color: "#6E2A84" },
    UDC:     { nombre: "Unió Democràtica",     color: "#3F51B5" },
    ERC:     { nombre: "ERC",                  color: "#FFA000" },
    UPN:     { nombre: "UPN",                  color: "#455A64" },
    PAR:     { nombre: "Partido Aragonés",     color: "#B8860B" },
    UPCA:    { nombre: "UPCA",                 color: "#00ACC1" },
    PIL:     { nombre: "Independientes de Lanzarote", color: "#558B2F" },
    PA:      { nombre: "Partido Andalucista",  color: "#2E7D32" },
    PSA:     { nombre: "Partido Socialista de Andalucía", color: "#1B5E20" },
    CPM:     { nombre: "Coalición por Melilla", color: "#C2185B" },
    DO:      { nombre: "Democracia Ourensana", color: "#FF8A65" },
    ENSUNEIX:{ nombre: "Ens Uneix",            color: "#827717" },
    COMPROMIS:{ nombre: "Compromís",           color: "#E65100" },
    VOX:     { nombre: "Vox",                  color: "#63BE21" },
    MIXTO:   { nombre: "Grupo Mixto / no adscrito", color: "#8A8F98" },
    NINGUNO: { nombre: "Sin partido / no consta", color: "#5F646C" }
  },

  estados: {
    investigacion: { nombre: "En investigación",        grupo: "abierto" },
    juicio:        { nombre: "Pendiente / en juicio",   grupo: "abierto" },
    condenado:     { nombre: "Condenado",               grupo: "condena" },
    absuelto:      { nombre: "Absuelto",                grupo: "cerrado" },
    archivado:     { nombre: "Archivado / sobreseído",  grupo: "cerrado" },
    anulado:       { nombre: "Anulado / extinguido / prescrito", grupo: "cerrado" }
  },

  casos: [
    {
      id: "filesa", nombre: "Caso Filesa", inicio: 1991, ccaa: ["Nacional", "Cataluña"],
      tribunal: "Tribunal Supremo (1997)",
      descripcion: "Financiación ilegal del PSOE mediante las sociedades Filesa, Malesa y Time-Export, que cobraban a grandes empresas por informes ficticios. El Supremo condenó en 1997 a varios responsables, entre ellos el senador Josep Maria Sala.",
      wiki: "Caso Filesa", fuentes: []
    },
    {
      id: "roldan", nombre: "Caso Roldán", inicio: 1993, ccaa: ["Nacional"],
      tribunal: "Audiencia Provincial de Madrid / Tribunal Supremo",
      descripcion: "El director general de la Guardia Civil, Luis Roldán, se enriqueció con comisiones de obras de cuarteles y desvío de fondos reservados. Huyó en 1994 y fue detenido en Laos en 1995. Condenado a 31 años en total.",
      wiki: "Luis Roldán", fuentes: []
    },
    {
      id: "naseiro", nombre: "Caso Naseiro", inicio: 1990, ccaa: ["C. Valenciana", "Nacional"],
      tribunal: "Tribunal Supremo (1992)",
      descripcion: "Investigación sobre presunta financiación ilegal del PP. El Supremo anuló las pruebas en 1992 porque las escuchas telefónicas se habían obtenido en otra causa sin autorización específica, y el caso quedó sin condenas.",
      wiki: "Caso Naseiro", fuentes: []
    },
    {
      id: "banca_catalana", nombre: "Caso Banca Catalana", inicio: 1984, ccaa: ["Cataluña"],
      tribunal: "Audiencia Territorial de Barcelona (1986)",
      descripcion: "Querella de la Fiscalía por la gestión de Banca Catalana, de la que Jordi Pujol había sido vicepresidente. En 1986 el tribunal rechazó procesarle y la causa se archivó para él.",
      wiki: "Caso Banca Catalana", fuentes: []
    },
    {
      id: "malaya", nombre: "Operación Malaya", inicio: 2006, ccaa: ["Andalucía"],
      tribunal: "Audiencia Provincial de Málaga (2013) / Tribunal Supremo (2015)",
      descripcion: "Red de corrupción urbanística en el Ayuntamiento de Marbella dirigida por el asesor de urbanismo Juan Antonio Roca. Llevó a la disolución del consistorio en 2006 y a la condena de varios exalcaldes y concejales.",
      wiki: "Operación Malaya", fuentes: []
    },
    {
      id: "gurtel", nombre: "Caso Gürtel (Época I)", inicio: 2009, ccaa: ["Madrid", "Nacional"],
      tribunal: "Audiencia Nacional (2018) / Tribunal Supremo (2020)",
      descripcion: "Trama de empresas de Francisco Correa que obtenía contratos de administraciones gobernadas por el PP a cambio de comisiones y regalos. La sentencia de 2018 consideró al PP partícipe a título lucrativo y precipitó la moción de censura contra Mariano Rajoy.",
      wiki: "Caso Gürtel", fuentes: []
    },
    {
      id: "gurtel_valencia", nombre: "Gürtel: contratos de la Generalitat (Orange Market)", inicio: 2009, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Nacional (2024)",
      descripcion: "Pieza sobre las adjudicaciones de la Generalitat Valenciana a Orange Market, la filial valenciana de la trama Gürtel. La Audiencia Nacional absolvió a Francisco Camps en mayo de 2024 por falta de pruebas de que ordenara esos contratos.",
      wiki: "Caso Gürtel",
      fuentes: [
        { titulo: "La Audiencia Nacional absuelve a Camps en Gürtel, su última causa judicial pendiente", medio: "Valencia Plaza", url: "https://valenciaplaza.com/camps-absuelto-gurtel", tipo: "noticia" },
        { titulo: "La Audiencia Nacional absuelve a Camps", medio: "Newtral", url: "https://www.newtral.es/audiencia-nacional-absuelve-camps/20240529/", tipo: "noticia" },
        { titulo: "La Audiencia absuelve a Francisco Camps en Gürtel", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2024-05-29/audiencia-absuelve-francisco-camps-gurtel/", tipo: "noticia" }
      ]
    },
    {
      id: "trajes", nombre: "Caso de los trajes", inicio: 2009, ccaa: ["C. Valenciana"],
      tribunal: "TSJ Comunitat Valenciana — jurado popular (2012)",
      descripcion: "Derivada de Gürtel: se investigó si Francisco Camps y otros cargos aceptaron trajes regalados por la trama (cohecho impropio). Un jurado popular absolvió a Camps en 2012.",
      wiki: "Caso de los trajes", fuentes: []
    },
    {
      id: "cooperacion", nombre: "Caso Cooperación", inicio: 2010, ccaa: ["C. Valenciana"],
      tribunal: "TSJ Comunitat Valenciana (2014) / Tribunal Supremo",
      descripcion: "Desvío de fondos de ayuda al desarrollo destinados a países del tercer mundo hacia fines privados, mediante ONG vinculadas a la Conselleria de Solidaridad. El exconseller Rafael Blasco fue condenado a prisión.",
      wiki: "Caso Cooperación", fuentes: []
    },
    {
      id: "fabra", nombre: "Caso Fabra", inicio: 2003, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Castellón (2013) / Tribunal Supremo (2014)",
      descripcion: "Investigación al presidente de la Diputación de Castellón por tráfico de influencias, cohecho y delitos fiscales. Tras casi una década de instrucción fue condenado a 4 años de prisión por delitos contra la Hacienda Pública.",
      wiki: "Carlos Fabra", fuentes: []
    },
    {
      id: "erial", nombre: "Caso Erial", inicio: 2018, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Valencia (2024) — recurrida al Supremo",
      descripcion: "Presuntas comisiones por la adjudicación de las ITV y de parques eólicos durante el Gobierno de Zaplana, ocultadas en el extranjero. En octubre de 2024 la Audiencia de Valencia condenó a Eduardo Zaplana a unos 10 años de prisión por blanqueo, cohecho y falsedad. Ha recurrido en casación al Tribunal Supremo.",
      wiki: "Caso Erial",
      fuentes: [
        { titulo: "Eduardo Zaplana, condenado a 10 años de cárcel por el caso Erial", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2024-10-15/eduardo-zaplana-carcel-erial/", tipo: "noticia" },
        { titulo: "Cronología judicial del caso Erial", medio: "Valencia Plaza", url: "https://valenciaplaza.com/cronologia-judicial-caso-erial-eduardo-zaplana", tipo: "informe" },
        { titulo: "Zaplana pide al Supremo su absolución y habla de pruebas «prefabricadas»", medio: "Vozpópuli", url: "https://www.vozpopuli.com/espana/comunidad-valenciana/zaplana-supremo-condena-caso-erial-basa-pruebas-prefabricadas.html", tipo: "noticia" }
      ]
    },
    {
      id: "taula", nombre: "Caso Taula / Imelsa", inicio: 2016, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Valencia",
      descripcion: "Macrocausa sobre presunta financiación irregular del PP valenciano, comisiones y contrataciones ficticias (los llamados 'zombis') en la empresa pública Imelsa de la Diputación de Valencia. Se juzga por piezas separadas.",
      wiki: "Caso Imelsa",
      fuentes: [
        { titulo: "Alfonso Rus, condenado a cinco años de cárcel por los 'zombies' en Imelsa", medio: "Valencia Plaza", url: "https://valenciaplaza.com/alfonso-rus-condenado-cinco-anos-carcel-zombies-imelsa", tipo: "noticia" },
        { titulo: "Alfonso Rus, condenado a cinco años de prisión por contratar trabajadores 'zombies'", medio: "elDiario.es", url: "https://www.eldiario.es/comunitat-valenciana/alfonso-rus-condenado-cinco-anos-prision-contratar-trabajadores-zombies-fondos-publicos_1_10694397.html", tipo: "noticia" }
      ]
    },
    {
      id: "palma_arena", nombre: "Caso Palma Arena", inicio: 2009, ccaa: ["Baleares"],
      tribunal: "Audiencia Provincial de Baleares / Tribunal Supremo",
      descripcion: "Sobrecostes en la construcción del velódromo Palma Arena, del que derivaron numerosas piezas por corrupción en el Govern balear de Jaume Matas.",
      wiki: "Caso Palma Arena", fuentes: []
    },
    {
      id: "noos", nombre: "Caso Nóos", inicio: 2010, ccaa: ["Baleares", "C. Valenciana"],
      tribunal: "Audiencia Provincial de Baleares (2017) / Tribunal Supremo (2018)",
      descripcion: "Desvío de fondos públicos de los gobiernos balear y valenciano al Instituto Nóos, presidido por Iñaki Urdangarin. Jaume Matas fue condenado como responsable de las adjudicaciones baleares.",
      wiki: "Caso Nóos", fuentes: []
    },
    {
      id: "andratx", nombre: "Caso Andratx", inicio: 2006, ccaa: ["Baleares"],
      tribunal: "Audiencia Provincial de Baleares",
      descripcion: "Corrupción urbanística en el Ayuntamiento de Andratx (Mallorca): licencias ilegales y cohecho. El exalcalde Eugenio Hidalgo fue condenado en varias piezas.",
      wiki: "Caso Andratx", fuentes: []
    },
    {
      id: "can_domenge", nombre: "Caso Can Domenge", inicio: 2009, ccaa: ["Baleares"],
      tribunal: "Audiencia Provincial de Baleares (2013) / Tribunal Supremo",
      descripcion: "Venta amañada por el Consell de Mallorca de los terrenos de Can Domenge, una de las causas que llevaron a la disolución de Unió Mallorquina. Maria Antònia Munar fue condenada a prisión.",
      wiki: "Maria Antònia Munar", fuentes: []
    },
    {
      id: "teresitas", nombre: "Caso Las Teresitas", inicio: 2007, ccaa: ["Canarias"],
      tribunal: "Audiencia Provincial de Santa Cruz de Tenerife / Tribunal Supremo (2019)",
      descripcion: "Compraventa con sobreprecio por el Ayuntamiento de Santa Cruz de Tenerife de los terrenos de la playa de Las Teresitas. El exalcalde Miguel Zerolo fue condenado a 7 años de prisión por malversación y prevaricación.",
      wiki: "Caso Las Teresitas",
      fuentes: [
        { titulo: "La Audiencia de Santa Cruz de Tenerife condena a 7 años de cárcel al exsenador Miguel Zerolo", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/La-Audiencia-de-Santa-Cruz-de-Tenerife-condena-a-7-anos-de-carcel-al-exsenador-Miguel-Zerolo-por-el--caso-Teresitas-", tipo: "sentencia" },
        { titulo: "Caso Teresitas: el TS confirma las penas de prisión", medio: "Público", url: "https://www.publico.es/politica/caso-teresitas-ts-confirma-penas-prision-implicados-caso-teresitas.html", tipo: "noticia" }
      ]
    },
    {
      id: "de_miguel", nombre: "Caso De Miguel", inicio: 2010, ccaa: ["País Vasco"],
      tribunal: "Audiencia Provincial de Álava (2019) / Tribunal Supremo (2023)",
      descripcion: "Trama de cobro de comisiones a cambio de adjudicaciones en instituciones de Álava, encabezada por el exdirigente del PNV Alfredo de Miguel. El Supremo confirmó en 2023 las principales condenas.",
      wiki: "Caso De Miguel",
      fuentes: [
        { titulo: "El TS confirma las principales penas por corrupción impuestas a Alfredo de Miguel", medio: "Orain", url: "https://orain.eus/es/politica/2023/01/10/sentencia-del-caso-de-miguel-ts-confirma-principales-penas-por-corrupcion-impuestas/", tipo: "noticia" },
        { titulo: "El Supremo confirma la corrupción del PNV en el caso De Miguel", medio: "The Objective", url: "https://theobjective.com/espana/pais-vasco/2023-01-10/supremo-corrupcion-pnv/", tipo: "noticia" }
      ]
    },
    {
      id: "marea", nombre: "Caso Marea", inicio: 2012, ccaa: ["Asturias"],
      tribunal: "Audiencia Provincial de Asturias / Tribunal Supremo",
      descripcion: "Amaño de contratos de la Consejería de Educación del Principado de Asturias a cambio de sobornos. El exconsejero José Luis Iglesias Riopedre fue condenado a prisión.",
      wiki: "Caso Marea",
      fuentes: [
        { titulo: "La Audiencia de Asturias condena a los principales acusados del Caso Marea", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/La-Audiencia-de-Asturias-condena-a-los-principales-acusados-del-Caso-Marea-", tipo: "sentencia" },
        { titulo: "La Audiencia de Asturias notifica la sentencia íntegra del caso Marea", medio: "CGPJ — TSJ Asturias", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Tribunales-Superiores-de-Justicia/TSJ-Asturias/Noticias-Judiciales-TSJ-Asturias/La-Audiencia-de-Asturias-notifica-la-sentencia-integra-del-caso-Marea", tipo: "sentencia" }
      ]
    },
    {
      id: "baltar", nombre: "Caso Baltar (contrataciones en la Diputación de Ourense)", inicio: 2011, ccaa: ["Galicia"],
      tribunal: "Audiencia Provincial de Ourense (2014)",
      descripcion: "Contratación irregular de un centenar de personas en la Diputación de Ourense en vísperas de elecciones. José Luis Baltar fue condenado por prevaricación a inhabilitación.",
      wiki: "José Luis Baltar Pumar", fuentes: []
    },
    {
      id: "campeon", nombre: "Caso Campeón", inicio: 2011, ccaa: ["Galicia", "Nacional"],
      tribunal: "Tribunal Supremo (2013)",
      descripcion: "Investigación sobre subvenciones a empresas del empresario Jorge Dorribo. El entonces ministro de Fomento José Blanco fue investigado por tráfico de influencias; el Supremo archivó la causa contra él.",
      wiki: "Caso Campeón", fuentes: []
    },
    {
      id: "pretoria", nombre: "Caso Pretoria", inicio: 2009, ccaa: ["Cataluña"],
      tribunal: "Audiencia Nacional (2018, por conformidad)",
      descripcion: "Trama de corrupción urbanística en Santa Coloma de Gramenet y otros municipios catalanes, con dirigentes del PSC y de CiU. Los principales acusados aceptaron condenas en 2018.",
      wiki: "Caso Pretoria", fuentes: []
    },
    {
      id: "palau", nombre: "Caso Palau de la Música", inicio: 2009, ccaa: ["Cataluña"],
      tribunal: "Audiencia Provincial de Barcelona (2018) / Tribunal Supremo (2020)",
      descripcion: "Expolio del Palau de la Música por Fèlix Millet y Jordi Montull y pago de comisiones de Ferrovial a Convergència a través del Palau. Se condenó al extesorero de CDC y se decomisaron 6,6 millones al partido.",
      wiki: "Caso Palau", fuentes: []
    },
    {
      id: "itv", nombre: "Caso ITV", inicio: 2013, ccaa: ["Cataluña"],
      tribunal: "Audiencia Provincial de Barcelona (2019, por conformidad)",
      descripcion: "Presunto cobro de comisiones para influir en el reparto de concesiones de estaciones de ITV en Cataluña. Oriol Pujol aceptó una condena de 2 años y medio de prisión.",
      wiki: "Oriol Pujol", fuentes: []
    },
    {
      id: "pujol", nombre: "Caso Pujol (fortuna en Andorra)", inicio: 2014, ccaa: ["Cataluña", "Nacional"],
      tribunal: "Audiencia Nacional (juicio nov. 2025 – may. 2026)",
      descripcion: "Tras la confesión de Jordi Pujol en 2014 de tener una fortuna no declarada en Andorra, se juzga a sus hijos por asociación ilícita, blanqueo y delitos fiscales. La causa se archivó para el expresident en 2026 por deterioro cognitivo. El juicio quedó visto para sentencia en mayo de 2026.",
      wiki: "Caso Pujol",
      fuentes: [
        { titulo: "El juicio a los Pujol queda visto para sentencia con el 'expresident' exonerado", medio: "Deia", url: "https://www.deia.eus/politica/2026/05/14/juicio-pujol-queda-visto-sentencia-11070304.html", tipo: "noticia" },
        { titulo: "La Audiencia Nacional confirma el archivo para Pujol", medio: "Deia", url: "https://www.deia.eus/politica/2026/05/11/audiencia-nacional-confirma-archivo-pujol-11052493.html", tipo: "noticia" },
        { titulo: "¿Quién es quién y qué se juzga en el juicio de la familia Pujol Ferrusola?", medio: "Ara", url: "https://es.ara.cat/politica/juzga-juicio-familia-pujol-ferrusola_1_5570707.html", tipo: "informe" }
      ]
    },
    {
      id: "borras", nombre: "Caso Institució de les Lletres Catalanes", inicio: 2018, ccaa: ["Cataluña"],
      tribunal: "TSJ de Cataluña (2023) / Tribunal Supremo (2025)",
      descripcion: "Fraccionamiento de 18 contratos para adjudicarlos a dedo a un conocido cuando Laura Borràs dirigía la ILC (2013-2017). Condenada a 4 años y medio por prevaricación y falsedad; el Supremo lo confirmó en 2025 y rechazó aplicarle la amnistía. El Gobierno le concedió un indulto parcial en julio de 2026.",
      wiki: "Laura Borràs",
      fuentes: [
        { titulo: "El Supremo condena a la exdirigente de Junts Laura Borràs y rechaza su amnistía", medio: "El Independiente", url: "https://www.elindependiente.com/espana/2025/02/12/el-supremo-condena-a-la-exdirigente-de-junts-laura-borras-y-rechaza-su-amnistia/", tipo: "noticia" },
        { titulo: "El Gobierno español indulta parcialmente a Laura Borràs y le rebaja la pena de prisión", medio: "Ara", url: "https://es.ara.cat/politica/gobierno-espanol-indulta-laura-borras-le-rebaja-pena-prision_1_5811426.html", tipo: "noticia" },
        { titulo: "Laura Borràs, condenada a prisión", medio: "The Objective", url: "https://theobjective.com/espana/cataluna/2023-03-30/laura-borras-condenada-prision/", tipo: "noticia" }
      ]
    },
    {
      id: "ere", nombre: "Caso ERE de Andalucía", inicio: 2011, ccaa: ["Andalucía"],
      tribunal: "Audiencia de Sevilla (2019) / Tribunal Supremo (2022) / Tribunal Constitucional (2024)",
      descripcion: "Sistema de ayudas sociolaborales de la Junta de Andalucía concedidas sin control durante una década. La pieza política condenó en 2019 a dos expresidentes y a numerosos altos cargos. En 2024 el Tribunal Constitucional anuló total o parcialmente buena parte de esas condenas y ordenó a la Audiencia de Sevilla dictar nuevas sentencias, todavía pendientes.",
      wiki: "Caso ERE de Andalucía",
      fuentes: [
        { titulo: "Qué dicen las sentencias del Constitucional sobre el caso ERE", medio: "Maldita.es", url: "https://maldita.es/malditateexplica/20240722/sentencias-constitucional-caso-ere-andalucia-penas/", tipo: "informe" },
        { titulo: "El Constitucional exonera a Griñán de toda la malversación de los ERE", medio: "Legal Today", url: "https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/el-constitucional-exonera-al-expresidente-andaluz-jose-antonio-grinan-toda-la-malversacion-de-los-ere-2024-07-16/", tipo: "noticia" },
        { titulo: "El Constitucional revoca la condena de Chaves", medio: "El Independiente", url: "https://www.elindependiente.com/espana/tribunales/2024/07/16/el-constitucional-revoca-la-condena-de-chaves-y-se-dispone-a-rematar-la-exoneracion-de-los-ere/", tipo: "noticia" },
        { titulo: "El TC anula la condena por prevaricación de Manuel Chaves", medio: "Ara", url: "https://es.ara.cat/politica/tc-anula-condena-prevaricacion-manuel-chaves-caso-ere-andalucia_1_5090487.html", tipo: "noticia" }
      ]
    },
    {
      id: "tarjetas_black", nombre: "Tarjetas black de Caja Madrid / Bankia", inicio: 2014, ccaa: ["Madrid"],
      tribunal: "Audiencia Nacional (2017) / Tribunal Supremo (2018)",
      descripcion: "Uso de tarjetas de crédito opacas por consejeros y directivos de Caja Madrid y Bankia, a propuesta de partidos y sindicatos. 64 condenados por apropiación indebida o administración desleal, entre ellos consejeros de PP, PSOE e IU.",
      wiki: "Caso de las tarjetas black",
      fuentes: [
        { titulo: "El Tribunal Supremo confirma cuatro años y medio de prisión para Rodrigo Rato por las 'black'", medio: "Valencia Plaza", url: "https://valenciaplaza.com/valenciaplaza/el-tribunal-supremo-confirma-cuatro-anos-y-medio-de-prision-para-rodrigo-rato-por-las-black", tipo: "noticia" },
        { titulo: "El Constitucional inadmite el recurso de Rato contra su condena por las tarjetas black", medio: "Público", url: "https://www.publico.es/economia/constitucional-inadmite-recurso-rato-condena-tarjetas-black.html", tipo: "noticia" }
      ]
    },
    {
      id: "bankia_bolsa", nombre: "Salida a bolsa de Bankia", inicio: 2012, ccaa: ["Madrid", "Nacional"],
      tribunal: "Audiencia Nacional (2020)",
      descripcion: "Juicio por presunta estafa a inversores y falsedad contable en la salida a bolsa de Bankia en 2011. La Audiencia Nacional absolvió a todos los acusados en 2020.",
      wiki: "Caso Bankia", fuentes: []
    },
    {
      id: "rato_patrimonio", nombre: "Origen del patrimonio de Rodrigo Rato", inicio: 2015, ccaa: ["Madrid"],
      tribunal: "Audiencia Provincial de Madrid (dic. 2024) — recurrida al Supremo",
      descripcion: "Investigación sobre la fortuna del exvicepresidente del Gobierno y exdirector del FMI. Condenado en diciembre de 2024 a 4 años, 9 meses y 1 día por blanqueo, corrupción entre particulares y tres delitos fiscales; ha recurrido al Tribunal Supremo.",
      wiki: "Rodrigo Rato",
      fuentes: [
        { titulo: "Rato, condenado a cuatro años por blanqueo y tres delitos fiscales", medio: "Infobae / EFE", url: "https://www.infobae.com/america/agencias/2024/12/20/el-exdirector-de-fmi-rato-condenado-a-cuatro-anos-por-blanqueo-y-tres-delitos-fiscales/", tipo: "noticia" },
        { titulo: "Rato recurre al Tribunal Supremo su condena por delitos fiscales", medio: "RTVC", url: "https://rtvc.es/rato-recurre-tribunal-supremo-2-mayo-2025/", tipo: "noticia" }
      ]
    },
    {
      id: "punica", nombre: "Caso Púnica", inicio: 2014, ccaa: ["Madrid", "Murcia", "Castilla y León", "C. Valenciana"],
      tribunal: "Audiencia Nacional (varias piezas)",
      descripcion: "Red de adjudicaciones amañadas en ayuntamientos y la Comunidad de Madrid a cambio de comisiones, con Francisco Granados y el empresario David Marjaliza como figuras centrales. Una década después, varias piezas siguen pendientes de juicio; en julio de 2026 la Audiencia Nacional dictó una nueva condena (pieza 7).",
      wiki: "Operación Púnica",
      fuentes: [
        { titulo: "La Audiencia Nacional condena a Francisco Granados a dos años y medio de cárcel", medio: "Infobae", url: "https://www.infobae.com/espana/2026/07/02/la-audiencia-nacional-condena-a-francisco-granados-a-dos-anos-y-medio-de-carcel-por-amanar-contratos-publicos-en-favor-de-una-empresa-de-festejos-del-caso-punica/", tipo: "noticia" },
        { titulo: "La Audiencia Nacional condena a Granados a dos años y medio de cárcel por la Púnica", medio: "Euronews", url: "https://es.euronews.com/my-europe/2026/07/02/la-audiencia-nacional-condena-a-granados-a-dos-anos-y-medio-de-carcel-por-la-punica", tipo: "noticia" },
        { titulo: "Púnica, una década después: dos alcaldes pactan condenas y varios juicios pendientes", medio: "elDiario.es", url: "https://www.eldiario.es/politica/punica-decada-despues-alcaldes-pactan-condenas-mayor-pelotazo-juicios-pendientes_1_12215850.amp.html", tipo: "informe" },
        { titulo: "La Audiencia Nacional avala archivar el caso Púnica para Esperanza Aguirre", medio: "El Independiente", url: "https://www.elindependiente.com/espana/2023/11/21/la-audiencia-nacional-archivar-el-caso-punica-para-esperanza-aguirre/", tipo: "noticia" },
        { titulo: "La Audiencia Nacional saca a Aguirre y González de la Púnica", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2023-11-21/audiencia-nacional-aguirre-gonzalez-caso-punica/", tipo: "noticia" }
      ]
    },
    {
      id: "lezo", nombre: "Caso Lezo (Canal de Isabel II)", inicio: 2017, ccaa: ["Madrid"],
      tribunal: "Audiencia Nacional (juicio en 2026)",
      descripcion: "Presunto saqueo del Canal de Isabel II mediante compras de empresas en Latinoamérica con sobreprecio y cobro de comisiones en obras como el tren de Navalcarnero. Ignacio González pasó siete meses en prisión provisional en 2017. El juicio de las primeras piezas se celebra en otoño de 2026.",
      wiki: "Operación Lezo",
      fuentes: [
        { titulo: "Ignacio González se sentará en el banquillo de los acusados por el caso Lezo", medio: "Público", url: "https://www.publico.es/politica/ignacio-gonzalez-sentara-banquillo-acusados-caso-lezo.html", tipo: "noticia" },
        { titulo: "Esperanza Aguirre niega conocer la presunta corrupción de Ignacio González en el caso Lezo", medio: "Euronews", url: "https://es.euronews.com/2026/10/22/esperanza-aguirre-niega-conocer-la-presunta-corrupcion-de-ignacio-gonzalez-en-el-caso-lezo", tipo: "noticia" },
        { titulo: "El fiscal pide que la sentencia contra Ignacio González sea ejemplar", medio: "Diario de León", url: "https://www.diariodeleon.es/nacional/261105/2102292/fiscal-pide-sentencia-expresidente-comunidad-madrid-ignacio-gonzalez-sea-ejemplar-corrupcion.html", tipo: "noticia" }
      ]
    },
    {
      id: "kitchen", nombre: "Operación Kitchen", inicio: 2018, ccaa: ["Nacional"],
      tribunal: "Audiencia Nacional (juicio abr.–jul. 2026, visto para sentencia)",
      descripcion: "Presunto operativo parapolicial del Ministerio del Interior, pagado con fondos reservados, para espiar a Luis Bárcenas y sustraerle documentación comprometedora para el PP. La Fiscalía pide 15 años para el exministro Jorge Fernández Díaz. Visto para sentencia en julio de 2026.",
      wiki: "Operación Kitchen",
      fuentes: [
        { titulo: "La Audiencia Nacional deja visto para sentencia el juicio de Kitchen", medio: "Diari de Tarragona", url: "https://www.diaridetarragona.com/espana/266956/audiencia-nacional-deja-visto-sentencia-juicio-kitchen.html", tipo: "noticia" },
        { titulo: "Arranca el juicio a la cúpula del Gobierno de Rajoy por el caso Kitchen", medio: "RTVC", url: "https://rtvc.es/juicio-cupula-rajoy-caso-kitchen-6-abril-2026/", tipo: "noticia" },
        { titulo: "Fernández Díaz y la excúpula de Interior, a juicio por la operación Kitchen", medio: "Economist & Jurist", url: "https://www.economistjurist.es/actualidad-juridica/fernandez-diaz-y-la-excupula-de-interior-a-juicio-por-la-operacion-kitchen/", tipo: "informe" }
      ]
    },
    {
      id: "neurona", nombre: "Caso Neurona", inicio: 2020, ccaa: ["Madrid", "Nacional"],
      tribunal: "Juzgado de Instrucción de Madrid / Audiencia Provincial de Madrid",
      descripcion: "Investigación sobre la presunta financiación irregular de Podemos (contratos con la consultora Neurona, 'caja B', sobresueldos). Todas las líneas se archivaron: el juez cerró la causa en diciembre de 2023 al no apreciar delito.",
      wiki: "Caso Neurona",
      fuentes: [
        { titulo: "El juez cierra el caso Neurona", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2023-12-12/juez-cierre-caso-neurona/", tipo: "noticia" },
        { titulo: "Cronología del 'caso Neurona' y el señalamiento a Podemos", medio: "Maldita.es", url: "https://maldita.es/malditateexplica/20231213/caso-neurona-justicia-podemos-cronologia", tipo: "informe" }
      ]
    },
    {
      id: "koldo_mascarillas", nombre: "Caso Koldo — pieza de las mascarillas", inicio: 2024, ccaa: ["Nacional", "Baleares", "Canarias"],
      tribunal: "Tribunal Supremo (sentencia de junio de 2026)",
      descripcion: "Organización que cobró comisiones por contratos de mascarillas durante la pandemia con empresas públicas y administraciones, con el exministro Ábalos, su asesor Koldo García y el comisionista Víctor de Aldama. El Supremo condenó en junio de 2026 a Ábalos a 24 años y 3 meses y a Koldo García a unos 19 años.",
      wiki: "Caso Koldo",
      fuentes: [
        { titulo: "José Luis Ábalos, condenado a cárcel por el Tribunal Supremo", medio: "elDiario.es", url: "https://www.eldiario.es/politica/jose-luis-abalos-condenado-carcel-tribunal-supremo_1_13301658.html", tipo: "noticia" },
        { titulo: "Ábalos y Koldo, condenados a 24 y 19 años de cárcel por el caso mascarillas", medio: "Diari de Tarragona", url: "https://www.diaridetarragona.com/espana/263723/abalos-koldo-condenados-24-19-anos-carcel-caso-mascarillas.html", tipo: "noticia" },
        { titulo: "El Supremo envía a juicio a Ábalos, Koldo García y Víctor de Aldama", medio: "RTVC", url: "https://rtvc.es/el-supremo-envia-a-juicio-a-abalos-koldo-garcia-y-victor-de-aldama-11-diciembre-2025/", tipo: "noticia" },
        { titulo: "Anticorrupción rechaza anular la sentencia de Ábalos y Koldo", medio: "Vozpópuli", url: "https://www.vozpopuli.com/tribunales/anticorrupcion-rechaza-anular-la-sentencia-de-abalos-y-koldo-los-recursos-estan-abocados-al-fracaso.html", tipo: "noticia" }
      ]
    },
    {
      id: "koldo_obra", nombre: "Caso Koldo — pieza de obra pública", inicio: 2025, ccaa: ["Nacional", "Navarra"],
      tribunal: "Tribunal Supremo (instrucción)",
      descripcion: "Presuntas comisiones por la adjudicación de obra pública del Ministerio de Transportes y de Navarra. Santos Cerdán, ex secretario de Organización del PSOE, estuvo en prisión provisional de junio a noviembre de 2025. En 2026 Anticorrupción pidió prorrogar la instrucción.",
      wiki: "Caso Koldo",
      fuentes: [
        { titulo: "La Fiscalía pide prisión provisional para Santos Cerdán", medio: "El Salto", url: "https://www.elsaltodiario.com/corrupcion/fiscalia-prision-provisional-santos-cerdan-corrupcion", tipo: "noticia" },
        { titulo: "Santos Cerdán surt de la presó", medio: "VilaWeb", url: "https://www.vilaweb.cat/noticies/santos-cerdan-surt-preso/", tipo: "noticia" },
        { titulo: "Anticorrupción pide prorrogar una de las piezas del caso Koldo", medio: "Onda Vasca", url: "https://www.ondavasca.com/anticorrupcion-pide-prorrogar-una-de-las-piezas-del-caso-koldo-al-no-descartar-mas-imputaciones/", tipo: "noticia" }
      ]
    },
    {
      id: "leire", nombre: "Caso Leire Díez / SEPI", inicio: 2025, ccaa: ["Nacional", "Madrid"],
      tribunal: "Audiencia Nacional (juez Santiago Pedraz) y juzgado de Madrid",
      descripcion: "Investigación sobre presuntas irregularidades en contratos públicos vinculados a la SEPI y sobre maniobras para desacreditar a investigadores de la UCO. En junio de 2026 el juez amplió la causa a 25 investigados, entre ellos la presidenta de la SEPI.",
      wiki: "Leire Díez",
      fuentes: [
        { titulo: "El juez amplía el caso Leire e investiga a 25 personas, incluida la presidenta de la SEPI", medio: "Euronews", url: "https://es.euronews.com/2026/06/29/el-juez-amplia-el-caso-leire-e-investiga-a-25-personas-incluida-la-presidenta-de-la-sepi", tipo: "noticia" },
        { titulo: "El juez imputa a la presidenta de la SEPI en el caso Leire Díez", medio: "Ara", url: "https://es.ara.cat/economia/juez-imputa-presidenta-sepi-caso-leire-diez_1_5783732.html", tipo: "noticia" },
        { titulo: "La Guardia Civil detiene a la exmilitante del PSOE Leire Díez", medio: "Diari de Tarragona", url: "https://www.diaridetarragona.com/espana/247117/guardia-civil-detiene-exmilitante-psoe-leire-diez.html", tipo: "noticia" }
      ]
    },
    {
      id: "mediador", nombre: "Caso Mediador ('Tito Berni')", inicio: 2023, ccaa: ["Canarias", "Nacional"],
      tribunal: "Juzgado de Santa Cruz de Tenerife — Audiencia Provincial",
      descripcion: "Presunta trama de cobro de sobornos a empresarios a cambio de favores administrativos y ayudas en Canarias, en la que el diputado socialista Juan Bernardo Fuentes Curbelo habría ocupado un papel central. Procesado en 2026 y pendiente de juicio.",
      wiki: "Caso Mediador",
      fuentes: [
        { titulo: "La jueza del caso Mediador procesa a 23 personas, entre ellas a Fuentes Curbelo", medio: "Diario de Avisos", url: "https://diariodeavisos.elespanol.com/2026/02/caso-mediador-procesados-tito-berni-general-espinosa-juicio/", tipo: "noticia" },
        { titulo: "'Tito Berni' estaba «a la cabeza» de la trama corrupta en Canarias", medio: "RTVC", url: "https://rtvc.es/tito-berni-estaba-a-la-cabeza-de-la-trama-corrupta-en-canarias/", tipo: "noticia" },
        { titulo: "Tito Berni reaparece: hay fecha de juicio", medio: "ESdiario", url: "https://www.esdiario.com/nacional/260924/198633/tito-berni-reaparece-peor-momento-psoe-hay-fecha-juicio-turbio-caso-empezo-todo.html", tipo: "noticia" }
      ]
    },
    {
      id: "hermano", nombre: "Caso de la Diputación de Badajoz (David Sánchez)", inicio: 2024, ccaa: ["Extremadura"],
      tribunal: "Audiencia Provincial de Badajoz (julio de 2026) — recurrible",
      descripcion: "Juicio por la creación y adjudicación de una plaza en la Diputación de Badajoz a David Sánchez, hermano del presidente del Gobierno. Condena por prevaricación: 9 años de inhabilitación para David Sánchez y 18 para Miguel Ángel Gallardo. La Fiscalía había pedido la absolución; las defensas recurren.",
      wiki: "David Sánchez Pérez-Castejón",
      fuentes: [
        { titulo: "David Sánchez, condenado a nueve años de inhabilitación por prevaricación", medio: "Euronews", url: "https://es.euronews.com/2026/07/14/david-sanchez-condenado-a-nueve-anos-de-inhabilitacion-por-prevaricacion", tipo: "noticia" },
        { titulo: "David Sánchez, condenado por prevaricación en su contratación en Badajoz", medio: "El Independiente", url: "https://www.elindependiente.com/espana/2026/07/14/david-sanchez-condenado-inhabilitacion-prevaricacion-contratacion-badajoz/", tipo: "noticia" },
        { titulo: "David Sánchez, condenado a 9 años de inhabilitación para empleo público", medio: "Diario de León", url: "https://www.diariodeleon.es/nacional/260714/2091200/david-sanchez-hermano-pedro-sanchez-condenado-9-anos-inhabilitacion-empleo-publico.html", tipo: "noticia" }
      ]
    },
    {
      id: "montoro", nombre: "Caso Montoro (Equipo Económico)", inicio: 2025, ccaa: ["Nacional", "Cataluña"],
      tribunal: "Juzgado de Instrucción n.º 2 de Tarragona",
      descripcion: "Investigación sobre si el despacho Equipo Económico, fundado por Cristóbal Montoro, cobró de empresas gasistas a cambio de cambios legislativos favorables cuando él era ministro de Hacienda. Instrucción abierta desde 2018 y conocida en julio de 2025; prorrogada en julio de 2026.",
      wiki: "Caso Montoro",
      fuentes: [
        { titulo: "El juez prorroga seis meses más la causa «sumamente compleja» en que investiga a Montoro", medio: "Infobae / EP", url: "https://www.infobae.com/espana/agencias/2026/07/27/el-juez-prorroga-seis-meses-mas-la-causa-sumamente-compleja-en-que-investiga-a-montoro/", tipo: "noticia" },
        { titulo: "¿En qué punto está el caso Montoro un año después de salir a la luz?", medio: "Ara", url: "https://es.ara.cat/politica/punto-caso-montoro-ano-despues-salir-luz_1_5821351.amp.html", tipo: "informe" },
        { titulo: "El juez de Tarragona rechaza enviar la causa del caso Montoro a Madrid", medio: "Diari de Tarragona", url: "https://www.diaridetarragona.com/tarragona/258635/juez-tarragona-rechaza-enviar-causa-caso-montoro-madrid.html", tipo: "noticia" }
      ]
    },
    {
      id: "almeria", nombre: "Caso Mascarillas de la Diputación de Almería", inicio: 2020, ccaa: ["Andalucía"],
      tribunal: "Juzgado de Instrucción n.º 1 de Almería",
      descripcion: "Presuntas comisiones en un contrato de emergencia de unos dos millones de euros para comprar mascarillas en la pandemia. En noviembre de 2025 la UCO detuvo al presidente y al vicepresidente de la Diputación, que dimitieron y fueron suspendidos de militancia.",
      wiki: "Diputación Provincial de Almería",
      fuentes: [
        { titulo: "La UCO detiene al presidente de la Diputación de Almería por el amaño de contratos públicos", medio: "Vozpópuli", url: "https://www.vozpopuli.com/tribunales/la-uco-detiene-al-presidente-de-la-diputacion-de-almeria-por-el-amano-de-contratos-publicos.html", tipo: "noticia" },
        { titulo: "¿Qué es el 'Caso mascarillas' de Almería que salpica a la cúpula del PP en la provincia?", medio: "El Salto", url: "https://www.elsaltodiario.com/almeria/es-caso-mascarillas-almeria-salpica-cupula-del-pp-provincia", tipo: "informe" },
        { titulo: "Dimite el presidente de la Diputación de Almería", medio: "Infobae", url: "https://www.infobae.com/espana/2025/11/21/dimite-el-presidente-de-la-diputacion-de-almeria-javier-aureliano-garcia-investigado-por-mordidas-en-la-compra-de-mascarillas/", tipo: "noticia" }
      ]
    },
    /* ===================== Ampliación (búsqueda nov. 2026) ===================== */
    {
      id: "brugal_pgou", nombre: "Caso Brugal (Plan General de Alicante)", inicio: 2007, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Alicante (2021) / Tribunal Supremo",
      descripcion: "Pieza del caso Brugal sobre el presunto amaño del Plan General de Alicante en favor del empresario Enrique Ortiz. La Audiencia condenó a Ortiz por cohecho y a Díaz Alperi a una multa por cohecho impropio, y absolvió a Sonia Castedo por prescripción. El Supremo confirmó la condena a Ortiz y absolvió también a Alperi por prescripción.",
      wiki: "Caso Brugal",
      fuentes: [
        { titulo: "El TS ratifica las exculpaciones sobre el PGOU de Alicante y las amplía a Alperi por prescripción", medio: "Alicante Plaza", url: "https://alicanteplaza.es/ts-ratifica-exculpaciones-pgou-alicante-amplia-alperi", tipo: "noticia" },
        { titulo: "Sentencia del caso PGOU: se cumple el pronóstico con Castedo, Alperi y Ortiz", medio: "ESdiario", url: "https://www.esdiario.com/alicante/133475641/Sentencia-del-caso-PGOU-Se-cumple-el-pronostico-con-Castedo-Alperi-y-Ortiz.html", tipo: "noticia" }
      ]
    },
    {
      id: "emarsa", nombre: "Caso Emarsa", inicio: 2010, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Valencia / Tribunal Supremo",
      descripcion: "Saqueo de la empresa pública de la depuradora de Pinedo (Valencia) con facturas falsas, gastos personales y contrataciones. El Supremo ratificó las penas de prisión de los cabecillas, entre ellos el expresidente Enrique Crespo, condenado a 10 años.",
      wiki: "Caso Emarsa",
      fuentes: [
        { titulo: "El Supremo ratifica las penas de prisión para los cabecillas del caso Emarsa", medio: "Valencia Plaza", url: "https://valenciaplaza.com/supremo-ratifica-penas-emarsa", tipo: "noticia" },
        { titulo: "Enrique Crespo ingresa en Picassent para cumplir condena por el caso Emarsa", medio: "Valencia Plaza", url: "https://valenciaplaza.com/enrique-crespo-ingresa-en-picassent-para-cumplir-condena-por-el-caso-emarsa", tipo: "noticia" },
        { titulo: "La Fiscalía consigue una condena histórica en el caso Emarsa", medio: "Valencia Plaza", url: "https://valenciaplaza.com/la-fiscalia-consigue-una-condena-historica-en-el-caso-emarsa", tipo: "noticia" }
      ]
    },
    {
      id: "ppcv_financiacion", nombre: "Gürtel: financiación ilegal del PP valenciano", inicio: 2009, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Nacional (2018), confirmada en apelación",
      descripcion: "La Audiencia Nacional declaró probado que el PP de la Comunitat Valenciana se financió de forma ilegal en las campañas de 2007 y 2008 mediante facturas falsas de empresas a la trama Gürtel. El ex secretario general Ricardo Costa confesó y fue condenado a 4 años.",
      wiki: "Caso Gürtel",
      fuentes: [
        { titulo: "Costa, condenado a 4 años de prisión y Rambla absuelto, por la financiación ilegal del PPCV", medio: "Valencia Plaza", url: "https://valenciaplaza.com/costa-condenado-a-4-anos-de-prision-y-rambla-absuelto-por-la-financiacion-ilegal-del-ppcv", tipo: "noticia" },
        { titulo: "Declaran firmes las condenas por la financiación ilegal del PP valenciano", medio: "Valencia Plaza", url: "https://valenciaplaza.com/declaran-firme-la-sentencia-del-dopaje-electoral-del-pp-de-francisco-camps", tipo: "noticia" },
        { titulo: "La Audiencia Nacional condena a dieciocho acusados por la trama valenciana del caso Gürtel", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/La-Audiencia-Nacional-condena-a-penas-de-entre-4-meses-y-6-anos-y-9-meses-a-dieciocho-de-los-acusados-por-la-trama-valenciana-del-caso-Gurtel", tipo: "sentencia" }
      ]
    },
    {
      id: "gurtel_papa", nombre: "Gürtel: visita del Papa a Valencia", inicio: 2009, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Nacional (2020)",
      descripcion: "Amaño de los contratos de la visita de Benedicto XVI a Valencia en 2006 en favor de la trama Gürtel. La Audiencia Nacional condenó a 19 de los 23 acusados en 2020. Juan Cotino, ex presidente de Les Corts, murió de covid-19 en abril de 2020, durante el juicio.",
      wiki: "Caso Gürtel",
      fuentes: [
        { titulo: "El juicio de Gürtel por la visita del Papa se reanuda sin Cotino, fallecido por covid-19", medio: "Valencia Plaza", url: "https://valenciaplaza.com/valenciaplaza/juicio-visita-papa-reanuda-sin-cotino", tipo: "noticia" },
        { titulo: "Penas de hasta 15 años a la red Gürtel por la visita del Papa", medio: "Deia", url: "https://www.deia.eus/politica/2020/11/25/penas-15-anos-red-guertel-2024707.html", tipo: "noticia" }
      ]
    },
    {
      id: "gurtel_boadilla", nombre: "Gürtel: Boadilla del Monte", inicio: 2009, ccaa: ["Madrid"],
      tribunal: "Audiencia Nacional (2022) / Tribunal Supremo",
      descripcion: "Rama de Gürtel en Boadilla del Monte: comisiones por adjudicaciones municipales entre 2001 y 2009. El exalcalde Arturo González Panero fue condenado a casi 37 años y el PP, como partícipe a título lucrativo, a devolver 204.198 euros.",
      wiki: "Caso Gürtel",
      fuentes: [
        { titulo: "El Supremo confirma la condena de 36 años de cárcel de 'El Albondiguilla' por la Gürtel", medio: "Onda Vasca", url: "https://www.ondavasca.com/el-supremo-confirma-la-condena-de-36-anos-de-carcel-de-el-albondiguilla-por-la-gurtel/", tipo: "noticia" },
        { titulo: "Tercera condena al PP por corrupción: tendrá que pagar 204.200 euros por la Gürtel de Boadilla", medio: "Ara", url: "https://es.ara.cat/politica/tercera-condena-pp-corrupcion-tendra-pagar-204-200-euros-gurtel-boadilla_1_4331729.html", tipo: "noticia" }
      ]
    },
    {
      id: "alqueria", nombre: "Caso Alquería (Divalterra)", inicio: 2018, ccaa: ["C. Valenciana"],
      tribunal: "Audiencia Provincial de Valencia (2023) / TSJ Comunitat Valenciana",
      descripcion: "Investigación sobre la presunta contratación irregular de altos directivos en Divalterra, empresa de la Diputación de Valencia gobernada por PSPV y Compromís. Los 14 acusados, entre ellos el expresidente Jorge Rodríguez, fueron absueltos en 2023, y el TSJ confirmó la absolución.",
      wiki: "Caso Alquería",
      fuentes: [
        { titulo: "El TSJ de la Comunidad Valenciana confirma la absolución de los 14 acusados en el caso Alquería", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-Tribunal-Superior-de-Justicia-de-la-Comunidad-Valenciana-confirma-la-absolucion-de-los-14-acusados-en-el--caso-Alqueria-", tipo: "sentencia" },
        { titulo: "La Audiencia de Valencia absuelve a Jorge Rodríguez dos días después de las elecciones", medio: "Valencia Plaza", url: "https://valenciaplaza.com/valenciaplaza/la-justicia-absuelve-a-todos-los-acusados-de-alqueria", tipo: "noticia" },
        { titulo: "Absolen Jorge Rodríguez i els altres tretze acusats en el cas Alqueria", medio: "VilaWeb", url: "https://www.vilaweb.cat/noticies/absolen-jorge-rodriguez-tretze-acusats-alqueria/", tipo: "noticia" }
      ]
    },
    {
      id: "azud", nombre: "Caso Azud", inicio: 2017, ccaa: ["C. Valenciana"],
      tribunal: "Juzgado de Instrucción n.º 13 de Valencia (fase intermedia, 2026)",
      descripcion: "Presunta trama de comisiones en adjudicaciones del Ayuntamiento de Valencia y operaciones urbanísticas, encabezada según la jueza por José María Corbín, cuñado de Rita Barberá. En 2026 se cerró la instrucción con 38 procesados, entre ellos dirigentes del PP y del PSPV-PSOE.",
      wiki: "Caso Azud",
      fuentes: [
        { titulo: "La jueza del caso Azud abre procedimiento abreviado contra 38 investigados", medio: "CGPJ — TSJ C. Valenciana", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/La-jueza-del--caso-Azud--abre-procedimiento-abreviado-contra-38-investigados-por-presunta-corrupcion-en-contratos-del-Ayuntamiento-de-Valencia-y-operaciones-urbanisticas-en-otras-localidades-de-la-Comunidad-Valenciana", tipo: "informe" },
        { titulo: "La instrucción del caso Azud llega a su fin tras años de sobreseimientos", medio: "El Español", url: "https://www.elespanol.com/valencia/comunitat/20260731/instruccion-caso-azud-llega-fin-anos-sobreseimientos-empresarios-funcionarios-cargos-psoe/1003744339181_0.html", tipo: "noticia" },
        { titulo: "Procesan al exvicealcalde de Valencia, al cuñado de Barberá y al exsubdelegado del Gobierno", medio: "Vozpópuli", url: "https://www.vozpopuli.com/espana/comunidad-valenciana/procesan-al-exvicealcalde-de-valencia-al-cunado-de-barbera-y-al-exsubdelegado-del-gobierno-por-el-caso-azud.html", tipo: "noticia" },
        { titulo: "La jueza envía a prisión a Rafa Rubio, Alfonso Grau y tres empresarios", medio: "Valencia Plaza", url: "https://valenciaplaza.com/jueza-prision-rafa-rubio-alfonso-grau", tipo: "noticia" }
      ]
    },
    {
      id: "novo_carthago", nombre: "Caso Novo Carthago", inicio: 2010, ccaa: ["Murcia"],
      tribunal: "Audiencia Provincial de Murcia",
      descripcion: "Investigación sobre la recalificación de suelo protegido en el Mar Menor para un gran complejo turístico durante el Gobierno de Ramón Luis Valcárcel. La Audiencia absolvió a todos los acusados, entre ellos dos exconsejeros; la sentencia es recurrible ante el Supremo.",
      wiki: "Novo Carthago",
      fuentes: [
        { titulo: "La Audiencia absuelve a todos los acusados en el caso Novo Carthago", medio: "elDiario.es", url: "https://www.eldiario.es/murcia/politica/audiencia-absuelve-acusados-caso-novo-carthago_1_12782915.html", tipo: "noticia" },
        { titulo: "El juzgado abre juicio oral por el caso Novo Carthago", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Sala-de-Prensa/Notas-de-prensa/El-juzgado-abre-juicio-oral-por-el-caso-Novo-Carthago", tipo: "informe" }
      ]
    },
    {
      id: "auditorio_murcia", nombre: "Caso Auditorio (Puerto Lumbreras)", inicio: 2016, ccaa: ["Murcia"],
      tribunal: "Audiencia Provincial de Murcia (2023) / Tribunal Supremo",
      descripcion: "Irregularidades en el proyecto de un auditorio en Puerto Lumbreras cuando Pedro Antonio Sánchez era alcalde. Condenado a 3 años de prisión por prevaricación y falsedad; el Supremo confirmó la condena.",
      wiki: "Pedro Antonio Sánchez",
      fuentes: [
        { titulo: "El Tribunal Supremo confirma 3 años de cárcel al expresidente de la Región de Murcia Pedro Antonio Sánchez", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-Tribunal-Supremo-confirma-3-anos-de-carcel-al-expresidente-de-la-Region-de-Murcia-Pedro-Antonio-Sanchez-por-delitos-de-falsedad-y-prevaricacion-en-el--caso-auditorio-", tipo: "sentencia" },
        { titulo: "El ex presidente de Murcia, condenado a 3 años de prisión por dos delitos de prevaricación", medio: "OKdiario", url: "https://okdiario.com/espana/pedro-antonio-sanchez-ex-presidente-murcia-condenado-3-anos-prision-10548552", tipo: "noticia" }
      ]
    },
    {
      id: "faffe", nombre: "Caso Faffe", inicio: 2013, ccaa: ["Andalucía"],
      tribunal: "Audiencia de Sevilla (2023) / TSJ de Andalucía",
      descripcion: "Gastos con tarjetas de la Fundación Andaluza Fondo de Formación y Empleo en prostíbulos y contrataciones irregulares en la fundación pública de la Junta de Andalucía. Su exdirector Fernando Villén fue condenado a prisión por malversación.",
      wiki: "Caso Faffe",
      fuentes: [
        { titulo: "La justicia condena a seis años de cárcel al exdirector de la Faffe por gastar dinero público en puticlubs", medio: "El Independiente", url: "https://www.elindependiente.com/espana/2023/09/21/la-justicia-condena-a-seis-anos-de-carcel-al-exdirector-de-la-faffe-por-gastar-dinero-publico-en-puticlubs/", tipo: "noticia" },
        { titulo: "El exdirector de la Faffe, condenado a seis años de cárcel por gastar en prostíbulos dinero público", medio: "Vozpópuli", url: "https://www.vozpopuli.com/espana/andalucia/exdirector-faffe-condenado-seis-anos-carcel-gastar-prostibulos-mas-30-000-euros-dinero-publico.html", tipo: "noticia" }
      ]
    },
    {
      id: "invercaria", nombre: "Caso Invercaria", inicio: 2011, ccaa: ["Andalucía"],
      tribunal: "Audiencia de Sevilla / Tribunal Supremo (varias piezas)",
      descripcion: "Préstamos y ayudas arbitrarias de Invercaria, la sociedad de capital riesgo de la Junta de Andalucía. Su expresidente acumula varias condenas y en julio de 2026 la Audiencia de Sevilla condenó también al exconsejero Francisco Vallejo.",
      wiki: "Caso Invercaria",
      fuentes: [
        { titulo: "El Supremo eleva a cuatro años y medio una condena al expresidente de Invercaria", medio: "elDiario.es", url: "https://www.eldiario.es/andalucia/supremo-eleva-cuatro-anos-medio-condena-expresidente-empresa-capital-riesgo-andalucia_1_11666920.html", tipo: "noticia" },
        { titulo: "Más de 3 años de cárcel para el exconsejero andaluz Vallejo y el expresidente de Invercaria", medio: "Última Hora / EFE", url: "https://www.ultimahora.es/noticias/nacional/2026/07/20/2673713/mas-anos-carcel-para-exconsejero-andaluz-vallejo-expresidente-invercaria.html", tipo: "noticia" }
      ]
    },
    {
      id: "mercasevilla", nombre: "Caso Mercasevilla (venta de terrenos)", inicio: 2009, ccaa: ["Andalucía"],
      tribunal: "Juzgado de lo Penal de Sevilla",
      descripcion: "Pieza del caso Mercasevilla sobre la venta de los terrenos de la empresa municipal. El juzgado absolvió a los diez acusados, entre ellos el ex teniente de alcalde de IU Antonio Rodrigo Torrijos, y la Fiscalía no recurrió.",
      wiki: "Caso Mercasevilla",
      fuentes: [
        { titulo: "La venta de los terrenos, segundo varapalo judicial a las tesis de la jueza Alaya en Mercasevilla", medio: "elDiario.es", url: "https://www.eldiario.es/sevilla/caso-mercasevilla_1_3330825.amp.html", tipo: "noticia" },
        { titulo: "Caso Mercasevilla (hemeroteca)", medio: "Libertad Digital", url: "https://www.libertaddigital.com/temas/caso-mercasevilla/", tipo: "informe" }
      ]
    },
    {
      id: "astapa", nombre: "Caso Astapa (Estepona)", inicio: 2007, ccaa: ["Andalucía"],
      tribunal: "Audiencia Provincial de Málaga (2024)",
      descripcion: "Presunta trama de corrupción urbanística en el Ayuntamiento de Estepona. Diecisiete años después, la sentencia de 2024 impuso penas menores y absolvió a más de 30 acusados; el exalcalde socialista Antonio Barrientos fue condenado por cohecho a suspensión de empleo y multa.",
      wiki: "Operación Astapa",
      fuentes: [
        { titulo: "El exalcalde socialista de Estepona, condenado a cinco meses de suspensión de empleo por el caso Astapa", medio: "El Debate", url: "https://www.eldebate.com/espana/andalucia/malaga/20241108/exalcalde-socialista-estepona-condenado-cinco-meses-suspension-empleo-caso-astapa_243139.html", tipo: "noticia" },
        { titulo: "La Fiscalía reduce la petición de cárcel para el exalcalde de Estepona", medio: "Qué!", url: "https://www.que.es/2024/06/11/fiscalia-reduce-carcel-caso-astapa/", tipo: "noticia" }
      ]
    },
    {
      id: "juan_guerra", nombre: "Caso Juan Guerra", inicio: 1990, ccaa: ["Andalucía", "Nacional"],
      tribunal: "Tribunal Supremo (años 90)",
      descripcion: "Juan Guerra, hermano del vicepresidente Alfonso Guerra, usaba un despacho oficial en la Delegación del Gobierno en Sevilla. Fue procesado en varias causas y finalmente condenado por un delito fiscal. El escándalo forzó la dimisión de Alfonso Guerra en 1991.",
      wiki: "Caso Juan Guerra",
      fuentes: [
        { titulo: "Juan Guerra se reivindica inocente respecto a la 'operación de caza'", medio: "elDiario.es", url: "https://www.eldiario.es/andalucia/juan-guerra-reivindica-inocente-respecto-operacion-caza-sintio-victima-30-anos_1_8726588.html", tipo: "noticia" },
        { titulo: "De Juan Guerra a Koldo García: el PSOE reviu el malson de la corrupció", medio: "Nació Digital", url: "https://naciodigital.cat/politica/de-juan-guerra-a-koldo-garcia-el-psoe-reviu-el-malson-de-la-corrupcio.html", tipo: "informe" }
      ]
    },
    {
      id: "dos_hermanas", nombre: "Contratación de Paco Salazar en Dos Hermanas", inicio: 2025, ccaa: ["Andalucía"],
      tribunal: "Juzgado de Dos Hermanas (archivo, junio de 2026)",
      descripcion: "Querella de Vox por la contratación en 2012 del dirigente socialista Paco Salazar en el Ayuntamiento de Dos Hermanas. La jueza descartó malversación y tráfico de influencias y consideró prescrita la prevaricación, aunque reconoció irregularidades en la contratación.",
      wiki: "Dos Hermanas",
      fuentes: [
        { titulo: "Archivada la querella de Vox contra el exalcalde de Dos Hermanas por la contratación de Salazar", medio: "Deia", url: "https://www.deia.eus/politica/2026/06/26/archivada-querella-vox-exalcalde-hermanas-paco-salazar-11252241.html", tipo: "noticia" },
        { titulo: "Paco Salazar y Francisco Toscano se libran de una condena por prevaricación: el delito ha prescrito", medio: "ESdiario", url: "https://www.esdiario.com/andalucia/260626/191669/socialistas-paco-salazar-francisco-toscano-libran-condena-prevaricacion-delito-prescrito.html", tipo: "noticia" },
        { titulo: "La UCO acude al Ayuntamiento de Dos Hermanas por el contrato a un exasesor de Sánchez", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2025-11-26/uco-ayuntamiento-sevillano-exasesor-sanchez/", tipo: "noticia" }
      ]
    },
    {
      id: "gil_camisetas", nombre: "Caso de las camisetas (Marbella)", inicio: 1999, ccaa: ["Andalucía"],
      tribunal: "Audiencia Provincial de Málaga (2000) / Tribunal Supremo (2002)",
      descripcion: "Desvío de unos 450 millones de pesetas del Ayuntamiento de Marbella al Atlético de Madrid mediante publicidad en camisetas. Jesús Gil fue condenado a inhabilitación por prevaricación, lo que le obligó a dejar la alcaldía en 2002. Murió en 2004.",
      wiki: "Jesús Gil",
      fuentes: [
        { titulo: "El presidente del tribunal de Malaya se abstuvo en 2000 de juzgar a Jesús Gil y Julián Muñoz", medio: "elDiario.es", url: "https://www.eldiario.es/politica/malaya-jesus-gil-julian-munoz_1_5837336.html", tipo: "noticia" },
        { titulo: "Marbella, el patrocinio más oscuro del fútbol español", medio: "Merca2", url: "https://www.merca2.es/2022/01/29/marbella-patrocinio-futbol-866550/", tipo: "informe" }
      ]
    },
    {
      id: "pacheco_asesores", nombre: "Caso asesores (Jerez)", inicio: 2005, ccaa: ["Andalucía"],
      tribunal: "Audiencia de Cádiz / Tribunal Supremo (2014)",
      descripcion: "Pedro Pacheco, exalcalde de Jerez, colocó como asesores en empresas municipales a dos compañeros de partido sin contraprestación. El Supremo elevó la pena a 5 años y medio por prevaricación, malversación y falsedad. Tiene otras condenas (estación de autobuses, Casa del Rocío) y ha pedido el indulto.",
      wiki: "Pedro Pacheco",
      fuentes: [
        { titulo: "El Tribunal Supremo condena a 5 años y medio de prisión a Pedro Pacheco", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Noticias-Judiciales/El-Tribunal-Supremo-condena-a-5-anos-y-medio-de-prision-a-Pedro-Pacheco--ex-alcalde-de-Jerez-de-la-Frontera", tipo: "sentencia" },
        { titulo: "El Supremo agrava la pena por el caso asesores y condena a Pacheco a cinco años y seis meses", medio: "Diario Bahía de Cádiz", url: "https://diariobahiadecadiz.com/jerez/el-supremo-agrava-la-pena-inicial-por-el-caso-asesores-y-condena-pacheco-cinco-anos-y-seis-meses-de-carcel", tipo: "noticia" },
        { titulo: "Pedro Pacheco: cinco años esperando el indulto", medio: "elDiario.es", url: "https://www.eldiario.es/andalucia/cadiz/pedro-pacheco-cinco-anos-esperando-indulto-ahora-justicia-no-cachondeo-sistema-corrupto_1_13417930.html", tipo: "noticia" }
      ]
    },
    {
      id: "melilla_votos", nombre: "Compra de votos por correo en Melilla (2008)", inicio: 2008, ccaa: ["Melilla"],
      tribunal: "Audiencia Provincial de Málaga (2018) / Tribunal Supremo (2021)",
      descripcion: "Compra de votos por correo en las elecciones generales de 2008 a cambio de empleos en planes públicos, organizada según la sentencia por Mustafa Aberchán (CPM) y Dionisio Muñoz (PSOE). Ambos fueron condenados a 2 años de prisión y 30 meses de inhabilitación.",
      wiki: "Coalición por Melilla",
      fuentes: [
        { titulo: "El PSOE recurrirá al Constitucional la condena a su exlíder en Melilla", medio: "Moncloa.com", url: "https://www.moncloa.com/2021/02/18/psoe-recurrira-condena-exlider-melilla-626895/", tipo: "noticia" },
        { titulo: "Imbroda sitúa la condena a Aberchán como lo más relevante de 2021 en Melilla", medio: "El Faro de Melilla", url: "https://elfarodemelilla.es/imbroda-situa-la-condena-a-aberchan-y-la-mala-gestion-de-la-pandemia-como-lo-mas-relevante-de-2021-en-melilla", tipo: "noticia" },
        { titulo: "El líder de Coalición por Melilla no se podrá presentar a las municipales por comprar votos", medio: "OKdiario", url: "https://okdiario.com/andalucia/lider-coalicion-melilla-no-podra-presentar-municipales-comprar-votos-10949862", tipo: "noticia" }
      ]
    },
    {
      id: "pallerols", nombre: "Caso Pallerols", inicio: 2000, ccaa: ["Cataluña"],
      tribunal: "Audiencia Provincial de Barcelona (2013, por conformidad)",
      descripcion: "Desvío de fondos públicos para cursos de formación hacia la financiación de Unió Democràtica de Catalunya. En 2013 los acusados aceptaron condenas y UDC pagó unos 388.000 euros como partícipe a título lucrativo.",
      wiki: "Caso Pallerols",
      fuentes: [
        { titulo: "Caso Pallerols: cumplir las condenas, clave para evitar la corrupción", medio: "Legal Today", url: "https://www.legaltoday.com/practica-juridica/derecho-penal/penal/caso-pallerols-cumplir-las-condenas-clave-para-evitar-la-corrupcion-2014-05-28/", tipo: "informe" },
        { titulo: "Duran i Lleida se niega a dimitir por el caso Pallerols", medio: "La Marea", url: "https://www.lamarea.com/2013/01/09/duran-i-lleida-se-niega-a-dimitir-por-el-caso-pallerols", tipo: "noticia" },
        { titulo: "Lo que perdió en millones de euros el caso Pallerols", medio: "Público", url: "https://www.publico.es/espana/perdio-millones-euros-caso-pallerols.html", tipo: "noticia" }
      ]
    },
    {
      id: "mercurio", nombre: "Caso Mercurio (Sabadell)", inicio: 2014, ccaa: ["Cataluña"],
      tribunal: "Audiencia de Barcelona / TSJ de Cataluña / Tribunal Supremo",
      descripcion: "Macrocausa sobre tráfico de influencias y corrupción en el entorno del exalcalde de Sabadell Manuel Bustos. Entre otras, el Supremo confirmó una condena de 3 años de prisión por ordenar retirar multas de tráfico a familiares.",
      wiki: "Manuel Bustos",
      fuentes: [
        { titulo: "Manuel Bustos tendrá que entrar en prisión antes de un mes por el caso Mercurio", medio: "Ara", url: "https://es.ara.cat/politica/manuel-bustos-tendra-entrar-prision-mes-caso-mercurio_1_4214099.html", tipo: "noticia" },
        { titulo: "El Suprem obre la porta a l'ingrés de Manuel Bustos a la presó", medio: "3Cat", url: "https://www.3cat.cat/3catinfo/el-suprem-obre-la-porta-a-lingres-a-preso-de-manuel-bustos-exalcalde-de-sabadell/noticia/3083752/", tipo: "noticia" },
        { titulo: "Vuit anys del cas Mercuri, el laberint judicial que va posar fi a l'era Bustos", medio: "Nació Digital", url: "https://naciodigital.cat/sabadell/vuit-anys-del-cas-mercuri-el-laberint-judicial-que-va-posar-fi-a-lera-bustos-a-sabadell_1829445_102.html", tipo: "informe" }
      ]
    },
    {
      id: "tres_por_ciento", nombre: "Caso del 3% (CDC / PDeCAT)", inicio: 2015, ccaa: ["Cataluña", "Nacional"],
      tribunal: "Audiencia Nacional (pendiente de juicio)",
      descripcion: "Presunto cobro de comisiones a constructoras a cambio de obra pública para financiar Convergència. En 2022 el juez envió a juicio a CDC, al PDeCAT y a sus extesoreros Germà Gordó, Daniel Osàcar y Andreu Viloca; la Fiscalía pide hasta 21 años.",
      wiki: "Caso del 3%",
      fuentes: [
        { titulo: "La Audiencia Nacional respalda juzgar a Convergència y al PDeCAT por el 3%", medio: "elDiario.es", url: "https://www.eldiario.es/catalunya/audiencia-nacional-respalda-juzgar-cdc-pdecat-exgerente-3_1_7362914.html", tipo: "noticia" },
        { titulo: "La Audiencia Nacional envía a juicio a los acusados por el caso del 3%", medio: "Segre", url: "https://www.segre.com/es/nacional-internacional/221109/la-audiencia-nacional-envia-juicio-los-acusados-por-caso-del_168936.html", tipo: "noticia" },
        { titulo: "Tres extesoreros de CDC y del PDeCAT, a un paso de juicio por el caso 3%", medio: "El Nacional", url: "https://www.elnacional.cat/es/politica/tres-extesoreros-cdc-pdecat-juicio-caso-3-per-cent_913635_102.html", tipo: "noticia" }
      ]
    },
    {
      id: "sitges", nombre: "Caso subvenciones de Sitges", inicio: 2023, ccaa: ["Cataluña"],
      tribunal: "Juzgado de Instrucción n.º 8 de Vilanova i la Geltrú",
      descripcion: "Investigación sobre la adjudicación de subvenciones y contratos menores del Ayuntamiento de Sitges (2017-2022). La alcaldesa fue detenida en 2023 y quedó en libertad; en 2026 declaró de nuevo como investigada por la concesión de una licencia a una empresa de su hijo.",
      wiki: "Sitges",
      fuentes: [
        { titulo: "En libertad la alcaldesa de ERC de Sitges", medio: "The Objective", url: "https://theobjective.com/espana/tribunales/2023-06-21/libertad-alcaldesa-erc-sitges/", tipo: "noticia" },
        { titulo: "La alcaldesa de Sitges niega ante la jueza haber favorecido a su hijo", medio: "Ara (en inglés)", url: "https://en.ara.cat/politics/the-mayor-of-sitges-denies-to-the-judge-having-favored-her-son-for-the-concession-of-market-stall_25_5727110.html", tipo: "noticia" },
        { titulo: "Operativo anticorrupción en Sitges con 11 detenidos", medio: "Ara", url: "https://es.ara.cat/politica/operativo-anticorrupcion-sitges-11-detenidos-incluida-alcaldesa_1_4736889.html", tipo: "noticia" }
      ]
    },
    {
      id: "la_muela", nombre: "Caso La Muela", inicio: 2009, ccaa: ["Aragón"],
      tribunal: "Audiencia Provincial de Zaragoza / Tribunal Supremo",
      descripcion: "Trama de corrupción urbanística en La Muela (Zaragoza). Tras repetirse el juicio, el Supremo condenó a la exalcaldesa María Victoria Pinilla (PAR) a 11 años y 4 meses por cohecho y malversación.",
      wiki: "Caso La Muela",
      fuentes: [
        { titulo: "El Supremo condena a 11 años de prisión a la exalcaldesa de La Muela", medio: "Economist & Jurist", url: "https://www.economistjurist.es/actualidad-juridica/jurisprudencia/el-supremo-condena-a-11-anos-de-prision-a-la-exalcaldesa-de-la-muela", tipo: "noticia" },
        { titulo: "La exalcaldesa de La Muela, condenada a 16 años por corrupción", medio: "Público", url: "https://www.publico.es/politica/exalcaldesa-muela-condenada-16-anos-corrupcion.html", tipo: "noticia" },
        { titulo: "El Tribunal Supremo anula la condena a la exalcaldesa de La Muela y ordena un nuevo juicio", medio: "CGPJ — TSJ Aragón", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Tribunales-Superiores-de-Justicia/TSJ-Aragon/Oficina-de-Comunicacion/Archivo-de-notas-de-prensa/El-Tribunal-Supremo-anula-la-condena-a-la-exalcaldesa-de-La-Muela-por-vulneracion-del-derecho-de-defensa-y-ordena-celebrar-un-nuevo-juicio", tipo: "sentencia" }
      ]
    },
    {
      id: "hormaechea", nombre: "Caso Hormaechea", inicio: 1991, ccaa: ["Cantabria"],
      tribunal: "TSJ de Cantabria (1994)",
      descripcion: "El presidente de Cantabria Juan Hormaechea fue condenado por malversación y prevaricación en la gestión del Gobierno regional. El Gobierno de Felipe González le indultó la pena de prisión en 1995. Fundó la UPCA en 1991 tras romper con el PP.",
      wiki: "Juan Hormaechea", fuentes: []
    },
    {
      id: "union_lanzarote", nombre: "Caso Unión (Lanzarote)", inicio: 2009, ccaa: ["Canarias"],
      tribunal: "Audiencia Provincial de Las Palmas (2019) / Tribunal Supremo",
      descripcion: "Gran causa de corrupción en instituciones de Lanzarote, con cargos de varios partidos y numerosas piezas. El Supremo confirmó 7 años y 5 meses de prisión para Dimas Martín, fundador del Partido de Independientes de Lanzarote, por asociación ilícita, cohecho, malversación, fraude y prevaricación.",
      wiki: "Caso Unión",
      fuentes: [
        { titulo: "El Tribunal Supremo confirma la pena de 7 años y 5 meses de prisión al fundador del PIL", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Tribunal-Supremo/Noticias-Judiciales/El-Tribunal-Supremo-confirma-la-pena-de-7-anos-y-5-meses-de-prision-al-fundador-del-Partido-de-Independientes-de-Lanzarote-por-asociacion-ilicita--cohecho--malversacion--fraude-y-prevaricacion", tipo: "sentencia" },
        { titulo: "Confirman la prisión de 7 años y 5 meses para Dimas Martín", medio: "RTVC", url: "https://rtvc.es/supremo-confirma-7-anos-5-meses-carcel-dimas-martin/", tipo: "noticia" }
      ]
    },
    {
      id: "eolico_canarias", nombre: "Caso Eólico (Canarias)", inicio: 2006, ccaa: ["Canarias"],
      tribunal: "Audiencia Provincial de Las Palmas",
      descripcion: "Amaño del concurso eólico del Gobierno de Canarias (2003-2005, Gobierno CC-PP) a cambio de sobornos. El exdirector general de Industria fue condenado a 2 años y 4 meses; la querella contra el exconsejero Luis Soria (PP) fue archivada.",
      wiki: "Caso Eólico",
      fuentes: [
        { titulo: "La Audiencia de Las Palmas condena a dos años y cuatro meses al principal imputado en el caso Eólico", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/gl/Poder-Xudicial/Novidades/La-Audiencia-de-Las-Palmas-condena-a-dos-anos-y-cuatro-meses-de-carcel-al-principal-imputado-en-el--caso-eolico--", tipo: "sentencia" },
        { titulo: "Guía para entender el caso Eólico", medio: "elDiario.es / Canarias Ahora", url: "https://www.eldiario.es/canariasahora/tribunales/guia-caso-eolico-jose-manuel-soria-esquivel-celso-perdomo-canarias_1_2076824.html", tipo: "informe" },
        { titulo: "El TSJC desestima el recurso de la Fiscalía y mantiene el archivo de la querella contra Soria", medio: "La Voz de Lanzarote", url: "https://www.lavozdelanzarote.com/en/news/politics/the-tsjc-dismisses-the-prosecutor-s-appeal-and-upholds-the-dismissal-of-the-complaint-against-soria-for-the-eolico-case_54285_102.html", tipo: "noticia" }
      ]
    },
    {
      id: "urralburu", nombre: "Caso Urralburu (comisiones en Navarra)", inicio: 1996, ccaa: ["Navarra"],
      tribunal: "Audiencia de Navarra / Tribunal Supremo",
      descripcion: "Cobro de comisiones por obra pública en Navarra durante los gobiernos socialistas. El expresidente Gabriel Urralburu y el exconsejero Antonio Aragón fueron condenados por cohecho y delito fiscal. Javier Otano dimitió en 1996 por una cuenta en Suiza; su causa acabó prescrita.",
      wiki: "Gabriel Urralburu",
      fuentes: [
        { titulo: "Tramas navarras: de Urralburu a Cerdán", medio: "Noticias de Navarra", url: "https://www.noticiasdenavarra.com/politica/2025/06/12/tramas-navarras-urralburu-cerdan-9754699.html", tipo: "informe" },
        { titulo: "Socialists get jail for kickbacks", medio: "The Irish Times", url: "https://www.irishtimes.com/news/socialists-get-jail-for-kickbacks-1.190945", tipo: "noticia" }
      ]
    },
    {
      id: "can_dietas", nombre: "Dietas de Caja Navarra", inicio: 2012, ccaa: ["Navarra"],
      tribunal: "Tribunal Supremo / Juzgado de Pamplona (archivo, 2013)",
      descripcion: "Investigación sobre las dietas cobradas por dirigentes de UPN en órganos de Caja Navarra por reuniones múltiples. El Supremo rechazó imputar a la presidenta Yolanda Barcina y la jueza archivó toda la causa en 2013. Los implicados devolvieron lo cobrado.",
      wiki: "Caja Navarra",
      fuentes: [
        { titulo: "El Supremo archiva la causa contra Barcina por las dietas de la CAN", medio: "Orain", url: "https://orain.eus/es/politica/2013/07/24/supremo-archiva-barcina-dietas--el-supremo-no-imputara-barcina/", tipo: "noticia" },
        { titulo: "La juez Benito archiva el caso Caja Navarra", medio: "Orain", url: "https://orain.eus/es/politica/2013/10/03/caso-caja-navarra--la-juez-benito-archiva-toda-causa/", tipo: "noticia" },
        { titulo: "El ex presidente navarro Sanz, imputado por las dietas en Caja Navarra", medio: "Legal Today / Reuters", url: "https://www.legaltoday.com/rincon-de-reuters/el-ex-presidente-navarro-sanz-imputado-por-las-dietas-en-caja-navarra-2013-04-02/", tipo: "noticia" }
      ]
    },
    {
      id: "pokemon", nombre: "Operación Pokémon", inicio: 2012, ccaa: ["Galicia"],
      tribunal: "Juzgado de Lugo y Audiencia Provincial (varias piezas)",
      descripcion: "Macrocausa por presuntos sobornos de empresas a cargos públicos de ayuntamientos gallegos de varios partidos. La pieza original se cerró en 2024 con condenas inferiores a 3 años por acuerdo con la Fiscalía; la pieza que afectaba al exalcalde de Ourense Francisco Rodríguez se archivó.",
      wiki: "Operación Pokémon",
      fuentes: [
        { titulo: "Archivada la pieza de la 'Pokémon' contra el candidato del PSOE a la Alcaldía de Ourense", medio: "elDiario.es", url: "https://www.eldiario.es/galicia/archivada-pieza-pokemon-candidato-psoe-alcaldia-ourense_1_10111044.html", tipo: "noticia" },
        { titulo: "La pieza original de la Operación Pokémon se cierra con penas inferiores a tres años", medio: "El Debate", url: "https://www.eldebate.com/espana/galicia/20240624/pieza-original-operacion-pokemon-cierra-penas-inferiores-tres-anos-11-acusados_207858.html", tipo: "noticia" }
      ]
    },
    {
      id: "jacome", nombre: "Caso Auria TV (alcalde de Ourense)", inicio: 2024, ccaa: ["Galicia"],
      tribunal: "Tribunal de Instancia de Ourense",
      descripcion: "Investigación al alcalde de Ourense, Gonzalo Pérez Jácome, por compatibilizar el cargo con su televisión privada sin autorización del Pleno. Imputado por prevaricación en abril de 2026; la Fiscalía descartó malversación y falsedad. Hay recursos pendientes.",
      wiki: "Gonzalo Pérez Jácome",
      fuentes: [
        { titulo: "El alcalde de Ourense, imputado por prevaricación al compatibilizar el cargo con su televisión privada", medio: "El Salto", url: "https://www.elsaltodiario.com/galicia/alcalde-ourense-imputado-prevaricacion-al-compatibilizar-cargo-television-privada-aut", tipo: "noticia" },
        { titulo: "La Fiscalía acusará a Jácome por prevaricación, no por malversación ni falsedad", medio: "El Español", url: "https://www.elespanol.com/treintayseis/actualidad/provincia-de-ourense/20260506/fiscalia-acusara-jacome-prevaricacion-no-malversacion-falsedad-documental/1003744236093_0.html", tipo: "noticia" }
      ]
    },
    {
      id: "over_baleares", nombre: "Caso Over (Palma Arena)", inicio: 2010, ccaa: ["Baleares"],
      tribunal: "Audiencia Provincial de Baleares (2019) / Tribunal Supremo",
      descripcion: "Pieza del Palma Arena sobre el desvío de fondos públicos a la campaña del PP balear de 2007 a través de la empresa Over Marketing. El ex secretario general del PP balear José María Rodríguez fue condenado a 3 años y medio; Jaume Matas confesó la financiación irregular.",
      wiki: "Caso Palma Arena",
      fuentes: [
        { titulo: "El Supremo confirma los 3,5 años de cárcel a José María Rodríguez", medio: "Mallorcadiario", url: "https://www.mallorcadiario.com/rodriguez-supremo-confirmacion-caso-over-carcel", tipo: "noticia" },
        { titulo: "El ex dirigente del PP balear José María Rodríguez, condenado a más de tres años", medio: "OKdiario", url: "https://okdiario.com/espana/ex-dirigente-del-pp-balear-jose-maria-rodriguez-condenado-mas-tres-anos-prevaricacion-4250624", tipo: "noticia" },
        { titulo: "Matas confiesa en el juicio que se financió el PP balear de forma irregular", medio: "Periódico de Ibiza", url: "https://www.periodicodeibiza.es/noticias/baleares/2018/10/01/1028917/matas-confiesa-juicio-financio-balear-forma-irregular.html", tipo: "noticia" }
      ]
    },
    {
      id: "soller", nombre: "Caso del túnel de Sóller", inicio: 1995, ccaa: ["Baleares"],
      tribunal: "TSJ de Baleares (1997)",
      descripcion: "La concesión del túnel de Sóller al empresario Antoni Cuart, que pagó 50 millones de pesetas a una fundación presidida por Gabriel Cañellas. El tribunal consideró probado el cohecho, pero el delito estaba prescrito y Cañellas, que dimitió como presidente balear, quedó absuelto.",
      wiki: "Gabriel Cañellas",
      fuentes: [
        { titulo: "El TSJB consideró probado el soborno de Antoni Cuart", medio: "Mallorcadiario", url: "https://www.mallorcadiario.com/canellas-mantiene-su-cuadro-en-el-consolat-pese-al-delito-del-tunel", tipo: "noticia" },
        { titulo: "Del túnel de Sóller al cas Andratx", medio: "Enciclopèdia.cat", url: "https://www.enciclopedia.cat/historia.-politica-societat-i-cultura-dels-paisos-catalans/del-tunel-de-soller-al-cas-andratx", tipo: "informe" }
      ]
    },
    {
      id: "perla_negra", nombre: "Caso Perla Negra", inicio: 2016, ccaa: ["Castilla y León"],
      tribunal: "Audiencia Provincial de Valladolid — recurrible en casación",
      descripcion: "Compra con sobreprecio por la Junta de Castilla y León del edificio Perla Negra, en el Parque Tecnológico de Boecillo. El exviceconsejero Rafael Delgado fue condenado a 2 años y medio por prevaricación y malversación.",
      wiki: "Rafael Delgado",
      fuentes: [
        { titulo: "La corrupción de la Perla Negra se zanja con dos años y medio de prisión", medio: "Diario de León", url: "https://www.diariodeleon.es/castilla-y-leon/250108/1763649/corrupcion-perla-negra-zanja-dos-anos-medio-prision.html", tipo: "noticia" }
      ]
    },
    {
      id: "trama_eolica", nombre: "Trama eólica de Castilla y León", inicio: 2016, ccaa: ["Castilla y León"],
      tribunal: "Audiencia Provincial de Valladolid (visto para sentencia en enero de 2026)",
      descripcion: "Presunto cobro de comisiones y bloqueo de parques eólicos desde la Consejería de Economía de la Junta, con unos 80 millones en presuntas mordidas. La Fiscalía pide 42 años para Rafael Delgado; el juicio quedó visto para sentencia el 22 de enero de 2026.",
      wiki: "Trama eólica de Castilla y León",
      fuentes: [
        { titulo: "Termina el juicio por la trama eólica de Castilla y León", medio: "elDiario.es", url: "https://www.eldiario.es/castilla-y-leon/tribunales/once-procesados-cuentas-monaco-empresarios-coaccionados-termina-juicio-trama-eolica-castilla-leon_1_12918228.amp.html", tipo: "noticia" },
        { titulo: "Rafael Delgado, cabecilla del mayor caso de corrupción de Castilla y León: piden 42 años", medio: "El Debate", url: "https://www.eldebate.com/espana/castilla-y-leon/20250914/rafael-delgado-cabecilla-mayor-caso-corrupcion-castilla-leon-piden-42-anos-carcel_334050.html", tipo: "noticia" }
      ]
    },
    {
      id: "monago", nombre: "Viajes de Monago a Canarias", inicio: 2014, ccaa: ["Extremadura", "Nacional"],
      tribunal: "Tribunal Supremo (archivo)",
      descripcion: "Querella por presunta malversación por los viajes a Canarias que José Antonio Monago hizo como senador entre 2009 y 2010 con cargo al Senado. El Supremo la archivó, aunque pidió diferenciar mejor los viajes oficiales de los privados.",
      wiki: "José Antonio Monago",
      fuentes: [
        { titulo: "El Tribunal Supremo archiva la querella contra José Antonio Monago por sus viajes a Tenerife", medio: "CGPJ — Poder Judicial", url: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Sala-de-Prensa/Archivo-de-notas-de-prensa/El-Tribunal-Supremo-archiva-la-querella-contra-Jose-Antonio-Monago-por-sus-viajes-a-Tenerife", tipo: "sentencia" },
        { titulo: "Monago devolverá «hasta el último céntimo» de los viajes a Canarias", medio: "Libertad Digital", url: "https://www.libertaddigital.com/espana/2014-11-08/monago-devolvera-hasta-el-ultimo-centimo-de-los-viajes-a-canarias-1276532917/", tipo: "noticia" }
      ]
    },
    {
      id: "plus_ultra", nombre: "Caso Plus Ultra", inicio: 2025, ccaa: ["Nacional", "Madrid"],
      tribunal: "Audiencia Nacional (juez José Luis Calama)",
      descripcion: "Investigación sobre el rescate de 53 millones a la aerolínea Plus Ultra en 2021 con fondos para la pandemia. En mayo de 2026 el juez imputó al expresidente José Luis Rodríguez Zapatero por tráfico de influencias, organización criminal, blanqueo y falsedad; hay una pieza separada por joyas halladas en su despacho. Zapatero niega haber cobrado o influido.",
      wiki: "Plus Ultra Líneas Aéreas",
      fuentes: [
        { titulo: "El juez imputa a José Luis Rodríguez Zapatero en el caso Plus Ultra", medio: "Orain", url: "https://orain.eus/es/politica/2026/05/19/el-juez-imputa-jose-luis-rodriguez-zapatero-en-el-caso-plus-ultra-presunto-blanqueo-capitales/", tipo: "noticia" },
        { titulo: "El juez rechaza anular la causa Plus Ultra contra Rodríguez Zapatero", medio: "Euronews", url: "https://es.euronews.com/2026/09/04/juez-rechaza-anular-causa-plus-ultra-expresidente-rodriguez-zapatero", tipo: "noticia" },
        { titulo: "Nuevo frente judicial para Zapatero: el juez investigará si intentó influir en Escrivá", medio: "Artículo 14", url: "https://www.articulo14.es/politica/nuevo-frente-judicial-para-zapatero-el-juez-investigara-si-intento-influir-en-escriva-20261019.html", tipo: "noticia" }
      ]
    },
    {
      id: "serrano_prestamo", nombre: "Préstamo público a una planta de pellets (Francisco Serrano)", inicio: 2020, ccaa: ["Andalucía"],
      tribunal: "Audiencia de Sevilla (juicio fijado para marzo de 2027)",
      descripcion: "Acusación por fraude de subvenciones o estafa por un préstamo de unos 2,5 millones del Ministerio de Industria concedido en 2016 a una empresa de Francisco Serrano para una planta en Niebla (Huelva). Los hechos son anteriores a su etapa en Vox; dejó el partido en 2020 tras la querella de la Fiscalía.",
      wiki: "Francisco Serrano Castro",
      fuentes: [
        { titulo: "Abren juicio con fianza de 3,3 millones al exportavoz de Vox Francisco Serrano", medio: "Valencia Plaza", url: "https://valenciaplaza.com/valenciaplaza/abren-juicio-con-fianza-de-3-3-millones-al-exportavoz-de-vox-francisco-serrano-por-fraude-de-ayudas-publicas", tipo: "noticia" },
        { titulo: "Aplazado a 2027 el juicio a Serrano por fraude", medio: "Demócrata", url: "https://www.democrata.es/tribunales/el-juicio-al-ex-portavoz-de-vox-en-andalucia-francisco-serrano-por-presunto-fraude-se-pospone-a-marzo-de-2027/", tipo: "noticia" },
        { titulo: "Francisco Serrano dimite tras la querella de la Fiscalía", medio: "The Objective", url: "https://theobjective.com/espana/2020-07-01/francisco-serrano-lider-de-vox-en-andalucia-dimite-tras-la-querella-de-la-fiscalia-por-fraude-de-subvenciones/", tipo: "noticia" }
      ]
    }
  ],

  politicos: [
    /* ------------------------------ PSOE / PSC ------------------------------ */
    { id: "sala", nombre: "Josep Maria Sala", cargo: "Senador y exdirigente del PSC-PSOE", ccaa: "Cataluña", partidoActual: "PSOE",
      historial: [{ partido: "PSOE", desde: 1978 }],
      casos: [{ caso: "filesa", partido: "PSOE", estado: "condenado", firme: true, anio: 1997, detalle: "Condenado por el Tribunal Supremo por la financiación ilegal del partido." }] },

    { id: "roldan", nombre: "Luis Roldán", cargo: "Director general de la Guardia Civil (1986-1993)", ccaa: "Nacional", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", desde: 1976, hasta: 1994 }],
      casos: [{ caso: "roldan", partido: "PSOE", estado: "condenado", firme: true, anio: 1998, detalle: "Condenado por malversación, cohecho, estafa y delitos fiscales. Expulsado del PSOE." }] },

    { id: "chaves", nombre: "Manuel Chaves", cargo: "Expresidente de la Junta de Andalucía y exministro", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE", desde: 1972 }],
      casos: [{ caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenado en 2019 a 9 años de inhabilitación por prevaricación; el Tribunal Constitucional anuló la condena en 2024." }] },

    { id: "grinan", nombre: "José Antonio Griñán", cargo: "Expresidente de la Junta de Andalucía", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE", desde: 1977 }],
      casos: [{ caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenado en 2019 a 6 años de prisión por malversación y prevaricación. El TC lo exoneró de la malversación en 2024; la Audiencia de Sevilla debe dictar nueva sentencia." }] },

    { id: "magdalena_alvarez", nombre: "Magdalena Álvarez", cargo: "Exconsejera de Hacienda andaluza y exministra de Fomento", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenada a inhabilitación por prevaricación; el TC estimó su amparo en 2024." }] },

    { id: "zarrias", nombre: "Gaspar Zarrías", cargo: "Exconsejero de Presidencia de la Junta de Andalucía", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenado a inhabilitación por prevaricación; el TC estimó su amparo en 2024." }] },

    { id: "martinez_aguayo", nombre: "Carmen Martínez Aguayo", cargo: "Exconsejera de Hacienda de la Junta de Andalucía", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenada a prisión por malversación; el TC anuló parcialmente la condena y ordenó dictar una nueva." }] },

    { id: "riopedre", nombre: "José Luis Iglesias Riopedre", cargo: "Exconsejero de Educación del Principado de Asturias", ccaa: "Asturias", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "marea", partido: "PSOE", estado: "condenado", firme: true, anio: 2017, detalle: "Condenado a prisión por prevaricación, cohecho, falsedad y fraude; obtuvo la libertad condicional en 2021." }] },

    { id: "blanco", nombre: "José Blanco", cargo: "Exministro de Fomento", ccaa: "Galicia", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "campeon", partido: "PSOE", estado: "archivado", firme: null, anio: 2013, detalle: "Investigado por tráfico de influencias; el Supremo archivó la causa contra él." }] },

    { id: "abalos", nombre: "José Luis Ábalos", cargo: "Exministro de Transportes y ex secretario de Organización del PSOE", ccaa: "C. Valenciana", partidoActual: "MIXTO",
      historial: [{ partido: "PSOE", desde: 1981, hasta: 2024 }, { partido: "MIXTO", desde: 2024 }],
      casos: [
        { caso: "koldo_mascarillas", partido: "PSOE", estado: "condenado", firme: null, anio: 2026, detalle: "Condenado por el Supremo (junio de 2026) a 24 años y 3 meses de prisión. Su defensa pidió la nulidad de la sentencia." },
        { caso: "koldo_obra", partido: "PSOE", estado: "investigacion", firme: null, anio: 2025, detalle: "Investigado en la pieza de comisiones por obra pública." }
      ] },

    { id: "koldo", nombre: "Koldo García", cargo: "Exasesor del Ministerio de Transportes", ccaa: "Navarra", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 2024 }],
      casos: [
        { caso: "koldo_mascarillas", partido: "PSOE", estado: "condenado", firme: null, anio: 2026, detalle: "Condenado por el Supremo (junio de 2026) a unos 19 años y medio de prisión." },
        { caso: "koldo_obra", partido: "PSOE", estado: "investigacion", firme: null, anio: 2025, detalle: "Investigado en la pieza de obra pública." }
      ] },

    { id: "cerdan", nombre: "Santos Cerdán", cargo: "Ex secretario de Organización del PSOE y exdiputado", ccaa: "Navarra", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 2025 }],
      casos: [{ caso: "koldo_obra", partido: "PSOE", estado: "investigacion", firme: null, anio: 2025, detalle: "Investigado por organización criminal, cohecho y tráfico de influencias. En prisión provisional de junio a noviembre de 2025; en libertad con prohibición de salir de España." }] },

    { id: "leire_diez", nombre: "Leire Díez", cargo: "Exmilitante del PSOE y excargo en empresas públicas", ccaa: "Cantabria", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 2025 }],
      casos: [{ caso: "leire", partido: "PSOE", estado: "investigacion", firme: null, anio: 2025, detalle: "Detenida en diciembre de 2025; investigada en la Audiencia Nacional y en un juzgado de Madrid por cohecho y tráfico de influencias, entre otros delitos." }] },

    { id: "tito_berni", nombre: "Juan Bernardo Fuentes Curbelo", cargo: "Exdiputado del PSOE por Las Palmas", ccaa: "Canarias", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 2023 }],
      casos: [{ caso: "mediador", partido: "PSOE", estado: "juicio", firme: null, anio: 2026, detalle: "Procesado en 2026; las acusaciones piden ocho años de prisión. Dejó el acta y el partido en 2023." }] },

    { id: "gallardo", nombre: "Miguel Ángel Gallardo", cargo: "Expresidente de la Diputación de Badajoz y líder del PSOE de Extremadura", ccaa: "Extremadura", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "hermano", partido: "PSOE", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado en julio de 2026 a 18 años de inhabilitación por dos delitos de prevaricación. Recurrible." }] },

    { id: "bartomeu_munoz", nombre: "Bartomeu Muñoz", cargo: "Exalcalde de Santa Coloma de Gramenet", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "PSC", hasta: 2009 }],
      casos: [{ caso: "pretoria", partido: "PSC", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado por conformidad en la Audiencia Nacional." }] },

    { id: "luigi", nombre: "Luis García Sáez", cargo: "Exdiputado del PSC en el Parlament", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "PSC", hasta: 2009 }],
      casos: [{ caso: "pretoria", partido: "PSC", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado por conformidad en la Audiencia Nacional." }] },

    { id: "garcia_marcos", nombre: "Isabel García Marcos", cargo: "Exteniente de alcalde de Marbella", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 2003 }, { partido: "NINGUNO", desde: 2003 }],
      casos: [{ caso: "malaya", partido: "NINGUNO", estado: "condenado", firme: true, anio: 2013, detalle: "Entró en el gobierno municipal de Marisol Yagüe tras la moción de censura de 2003, lo que provocó su salida del PSOE. Condenada en el juicio de Malaya." }] },

    /* --------------------------------- PP ---------------------------------- */
    { id: "naseiro", nombre: "Rosendo Naseiro", cargo: "Extesorero del PP", ccaa: "Nacional", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "naseiro", partido: "PP", estado: "anulado", firme: null, anio: 1992, detalle: "El Supremo anuló las escuchas que sustentaban la acusación." }] },

    { id: "barcenas", nombre: "Luis Bárcenas", cargo: "Extesorero y exgerente del PP", ccaa: "Nacional", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2013 }],
      casos: [{ caso: "gurtel", partido: "PP", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado a 29 años de prisión en la Época I de Gürtel (confirmado por el Supremo en 2020)." }] },

    { id: "sepulveda", nombre: "Jesús Sepúlveda", cargo: "Exalcalde de Pozuelo de Alarcón", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "gurtel", partido: "PP", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado en la Época I de Gürtel." }] },

    { id: "ortega", nombre: "Guillermo Ortega", cargo: "Exalcalde de Majadahonda", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "gurtel", partido: "PP", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado en la Época I de Gürtel." }] },

    { id: "lopez_viejo", nombre: "Alberto López Viejo", cargo: "Exconsejero de Deportes de la Comunidad de Madrid", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "gurtel", partido: "PP", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado en la Época I de Gürtel." }] },

    { id: "camps", nombre: "Francisco Camps", cargo: "Expresidente de la Generalitat Valenciana", ccaa: "C. Valenciana", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [
        { caso: "trajes", partido: "PP", estado: "absuelto", firme: true, anio: 2012, detalle: "Absuelto por un jurado popular." },
        { caso: "gurtel_valencia", partido: "PP", estado: "absuelto", firme: null, anio: 2024, detalle: "Absuelto por la Audiencia Nacional en mayo de 2024." }
      ] },

    { id: "blasco", nombre: "Rafael Blasco", cargo: "Exconseller de la Generalitat Valenciana (con PSOE y con PP)", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE", hasta: 1989 }, { partido: "PP", desde: 1995, hasta: 2014 }],
      casos: [{ caso: "cooperacion", partido: "PP", estado: "condenado", firme: true, anio: 2014, detalle: "Condenado a prisión por malversación y fraude. Antes había sido conseller con el PSPV-PSOE." }] },

    { id: "fabra", nombre: "Carlos Fabra", cargo: "Expresidente de la Diputación de Castellón", ccaa: "C. Valenciana", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "fabra", partido: "PP", estado: "condenado", firme: true, anio: 2014, detalle: "Condenado a 4 años de prisión por delitos fiscales." }] },

    { id: "zaplana", nombre: "Eduardo Zaplana", cargo: "Expresidente de la Generalitat Valenciana y exministro de Trabajo", ccaa: "C. Valenciana", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "erial", partido: "PP", estado: "condenado", firme: false, anio: 2024, detalle: "Condenado en octubre de 2024 a unos 10 años de prisión; ha recurrido en casación al Supremo." }] },

    { id: "rus", nombre: "Alfonso Rus", cargo: "Expresidente de la Diputación de Valencia", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2016 }],
      casos: [{ caso: "taula", partido: "PP", estado: "condenado", firme: null, anio: 2023, detalle: "Condenado a 5 años por la contratación de 'zombis' en Imelsa; absuelto en la pieza del 'call center'. Otras piezas siguen abiertas." }] },

    { id: "barbera", nombre: "Rita Barberá", cargo: "Exalcaldesa de Valencia y senadora", ccaa: "C. Valenciana", partidoActual: "MIXTO",
      historial: [{ partido: "PP", hasta: 2016 }, { partido: "MIXTO", desde: 2016 }],
      casos: [{ caso: "taula", partido: "PP", estado: "anulado", firme: null, anio: 2016, detalle: "Investigada por presunto blanqueo ('pitufeo') en el grupo municipal del PP. Dejó el PP en 2016 y pasó al Grupo Mixto del Senado. La causa se extinguió tras su fallecimiento en noviembre de 2016." }] },

    { id: "matas", nombre: "Jaume Matas", cargo: "Expresidente del Govern balear y exministro de Medio Ambiente", ccaa: "Baleares", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [
        { caso: "palma_arena", partido: "PP", estado: "condenado", firme: true, anio: 2013, detalle: "Condenado por tráfico de influencias en una de las piezas." },
        { caso: "noos", partido: "PP", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado por las adjudicaciones al Instituto Nóos." }
      ] },

    { id: "hidalgo", nombre: "Eugenio Hidalgo", cargo: "Exalcalde de Andratx", ccaa: "Baleares", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "andratx", partido: "PP", estado: "condenado", firme: true, anio: 2008, detalle: "Condenado en varias piezas por corrupción urbanística." }] },

    { id: "baltar", nombre: "José Luis Baltar", cargo: "Expresidente de la Diputación de Ourense", ccaa: "Galicia", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "baltar", partido: "PP", estado: "condenado", firme: null, anio: 2014, detalle: "Condenado por prevaricación a inhabilitación." }] },

    { id: "rato", nombre: "Rodrigo Rato", cargo: "Exvicepresidente del Gobierno, exdirector del FMI y expresidente de Bankia", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2015 }],
      casos: [
        { caso: "tarjetas_black", partido: "PP", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado a 4 años y 6 meses por apropiación indebida." },
        { caso: "bankia_bolsa", partido: "PP", estado: "absuelto", firme: true, anio: 2020, detalle: "Absuelto junto al resto de acusados." },
        { caso: "rato_patrimonio", partido: "PP", estado: "condenado", firme: false, anio: 2024, detalle: "Condenado a 4 años, 9 meses y 1 día; recurso ante el Supremo." }
      ] },

    { id: "granados", nombre: "Francisco Granados", cargo: "Exconsejero de la Comunidad de Madrid y exalcalde de Valdemoro", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2014 }],
      casos: [{ caso: "punica", partido: "PP", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado en julio de 2026 a 2 años y medio por fraude y prevaricación (pieza 7). Ya tenía una condena de 2 años por un chivatazo sobre la investigación. Otras piezas están pendientes de juicio." }] },

    { id: "boza", nombre: "José Carlos Boza", cargo: "Exalcalde de Valdemoro", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "punica", partido: "PP", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado a 4 años de prisión (pieza 7, julio de 2026)." }] },

    { id: "jm_moreno", nombre: "José Miguel Moreno", cargo: "Exalcalde de Valdemoro", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "punica", partido: "PP", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado a 2 años de prisión (pieza 7, julio de 2026)." }] },

    { id: "aguirre", nombre: "Esperanza Aguirre", cargo: "Expresidenta de la Comunidad de Madrid", ccaa: "Madrid", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "punica", partido: "PP", estado: "archivado", firme: true, anio: 2023, detalle: "Investigada en la pieza de financiación del PP de Madrid (2019); archivada en 2022 y confirmado por la Audiencia Nacional en 2023." }] },

    { id: "cifuentes", nombre: "Cristina Cifuentes", cargo: "Expresidenta de la Comunidad de Madrid", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2018 }],
      casos: [{ caso: "punica", partido: "PP", estado: "archivado", firme: null, anio: 2021, detalle: "Investigada en la pieza de financiación del PP de Madrid en 2019; el juez la sacó de la causa." }] },

    { id: "ignacio_gonzalez", nombre: "Ignacio González", cargo: "Expresidente de la Comunidad de Madrid", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2017 }],
      casos: [
        { caso: "lezo", partido: "PP", estado: "juicio", firme: null, anio: 2026, detalle: "Juzgado en la Audiencia Nacional en otoño de 2026." },
        { caso: "punica", partido: "PP", estado: "archivado", firme: true, anio: 2023, detalle: "Archivada para él la pieza de financiación del PP de Madrid." }
      ] },

    { id: "fernandez_diaz", nombre: "Jorge Fernández Díaz", cargo: "Exministro del Interior", ccaa: "Nacional", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "kitchen", partido: "PP", estado: "juicio", firme: null, anio: 2026, detalle: "Juzgado entre abril y julio de 2026; la Fiscalía pide 15 años. Visto para sentencia." }] },

    { id: "fco_martinez", nombre: "Francisco Martínez", cargo: "Ex secretario de Estado de Seguridad", ccaa: "Nacional", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "kitchen", partido: "PP", estado: "juicio", firme: null, anio: 2026, detalle: "Juzgado en 2026; visto para sentencia." }] },

    { id: "montoro", nombre: "Cristóbal Montoro", cargo: "Exministro de Hacienda", ccaa: "Nacional", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2025 }],
      casos: [{ caso: "montoro", partido: "PP", estado: "investigacion", firme: null, anio: 2025, detalle: "Investigado; dejó la militancia del PP en julio de 2025. A finales de agosto de 2026 aún no había sido citado a declarar." }] },

    { id: "aureliano", nombre: "Javier Aureliano García", cargo: "Expresidente de la Diputación y del PP de Almería", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2025 }],
      casos: [{ caso: "almeria", partido: "PP", estado: "investigacion", firme: null, anio: 2025, detalle: "Detenido en noviembre de 2025 y en libertad provisional. Dimitió y fue suspendido de militancia." }] },

    { id: "fdo_gimenez", nombre: "Fernando Giménez", cargo: "Ex vicepresidente de la Diputación de Almería", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", hasta: 2025 }],
      casos: [{ caso: "almeria", partido: "PP", estado: "investigacion", firme: null, anio: 2025, detalle: "Detenido en noviembre de 2025 y en libertad provisional." }] },

    { id: "liria", nombre: "Óscar Liria", cargo: "Ex vicepresidente de la Diputación de Almería", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "almeria", partido: "PP", estado: "investigacion", firme: null, anio: 2021, detalle: "Cesado en 2021; investigado en la causa." }] },

    /* ----------------------------- CDC / Junts ------------------------------ */
    { id: "jordi_pujol", nombre: "Jordi Pujol", cargo: "Expresidente de la Generalitat de Cataluña (1980-2003)", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC", desde: 1974, hasta: 2014 }],
      casos: [
        { caso: "banca_catalana", partido: "CDC", estado: "archivado", firme: true, anio: 1986, detalle: "El tribunal rechazó procesarle." },
        { caso: "pujol", partido: "CDC", estado: "archivado", firme: null, anio: 2026, detalle: "Causa archivada para él en 2026 por falta de capacidad cognitiva para afrontar el juicio." }
      ] },

    { id: "oriol_pujol", nombre: "Oriol Pujol", cargo: "Ex secretario general de CDC y exdiputado", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC", hasta: 2014 }],
      casos: [
        { caso: "itv", partido: "CDC", estado: "condenado", firme: true, anio: 2019, detalle: "Condenado por conformidad a 2 años y medio de prisión." },
        { caso: "pujol", partido: "CDC", estado: "juicio", firme: null, anio: 2026, detalle: "Acusado en el juicio a la familia Pujol, visto para sentencia en mayo de 2026." }
      ] },

    { id: "osacar", nombre: "Daniel Osàcar", cargo: "Extesorero de CDC", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC" }],
      casos: [
        { caso: "palau", partido: "CDC", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado a prisión por la financiación ilegal de CDC a través del Palau." },
        { caso: "tres_por_ciento", partido: "CDC", estado: "juicio", firme: null, anio: 2022, detalle: "Enviado a juicio en 2022; la Fiscalía le pide una pena reducida por colaborar." }
      ] },

    { id: "alavedra", nombre: "Macià Alavedra", cargo: "Exconseller de Economía de la Generalitat", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC" }],
      casos: [{ caso: "pretoria", partido: "CDC", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado por conformidad." }] },

    { id: "prenafeta", nombre: "Lluís Prenafeta", cargo: "Ex secretario general de la Presidencia de la Generalitat", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC" }],
      casos: [{ caso: "pretoria", partido: "CDC", estado: "condenado", firme: true, anio: 2018, detalle: "Condenado por conformidad." }] },

    { id: "borras", nombre: "Laura Borràs", cargo: "Expresidenta del Parlament y de Junts", ccaa: "Cataluña", partidoActual: "JUNTS",
      historial: [{ partido: "NINGUNO", hasta: 2017 }, { partido: "JUNTS", desde: 2017 }],
      casos: [{ caso: "borras", partido: "JUNTS", estado: "condenado", firme: true, anio: 2025, detalle: "Hechos de 2013-2017, cuando dirigía la ILC sin militar en ningún partido; juzgada siendo dirigente de Junts. Condena firme desde 2025 e indulto parcial en julio de 2026." }] },

    /* -------------------------------- Otros -------------------------------- */
    { id: "de_miguel", nombre: "Alfredo de Miguel", cargo: "Ex diputado foral de Álava y exdirigente del PNV", ccaa: "País Vasco", partidoActual: "NINGUNO",
      historial: [{ partido: "PNV", hasta: 2010 }],
      casos: [{ caso: "de_miguel", partido: "PNV", estado: "condenado", firme: true, anio: 2023, detalle: "Condenado a 12 años y 4 meses (rebajados por el Supremo)." }] },

    { id: "telleria", nombre: "Aitor Telleria", cargo: "Exdirigente del PNV en Álava", ccaa: "País Vasco", partidoActual: "NINGUNO",
      historial: [{ partido: "PNV", hasta: 2010 }],
      casos: [{ caso: "de_miguel", partido: "PNV", estado: "condenado", firme: true, anio: 2023, detalle: "Condenado a 5 años y 1 mes." }] },

    { id: "otxandiano", nombre: "Koldo Otxandiano", cargo: "Exdirigente del PNV en Álava", ccaa: "País Vasco", partidoActual: "NINGUNO",
      historial: [{ partido: "PNV", hasta: 2010 }],
      casos: [{ caso: "de_miguel", partido: "PNV", estado: "condenado", firme: true, anio: 2023, detalle: "Condenado a prisión." }] },

    { id: "zerolo", nombre: "Miguel Zerolo", cargo: "Exalcalde de Santa Cruz de Tenerife y exsenador", ccaa: "Canarias", partidoActual: "CC",
      historial: [{ partido: "CC" }],
      casos: [{ caso: "teresitas", partido: "CC", estado: "condenado", firme: true, anio: 2019, detalle: "Condenado a 7 años de prisión por malversación y prevaricación." }] },

    { id: "julian_munoz", nombre: "Julián Muñoz", cargo: "Exalcalde de Marbella", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "GIL" }],
      casos: [{ caso: "malaya", partido: "GIL", estado: "condenado", firme: true, anio: 2015, detalle: "Condenado en Malaya y en otras causas derivadas de su etapa como alcalde." }] },

    { id: "yague", nombre: "Marisol Yagüe", cargo: "Exalcaldesa de Marbella", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "GIL" }],
      casos: [{ caso: "malaya", partido: "GIL", estado: "condenado", firme: true, anio: 2015, detalle: "Condenada en el juicio de Malaya." }] },

    { id: "munar", nombre: "Maria Antònia Munar", cargo: "Expresidenta del Consell de Mallorca y del Parlament balear", ccaa: "Baleares", partidoActual: "NINGUNO",
      historial: [{ partido: "UM" }],
      casos: [{ caso: "can_domenge", partido: "UM", estado: "condenado", firme: true, anio: 2014, detalle: "Condenada a prisión; acumula varias condenas por corrupción." }] },

    { id: "moral_santin", nombre: "José Antonio Moral Santín", cargo: "Exconsejero de Caja Madrid a propuesta de IU", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "IU" }],
      casos: [{ caso: "tarjetas_black", partido: "IU", estado: "condenado", firme: true, anio: 2018, detalle: "Uno de los mayores gastadores con las tarjetas; condenado. IU lo expulsó en 2014." }] },

    { id: "monedero", nombre: "Juan Carlos Monedero", cargo: "Cofundador de Podemos", ccaa: "Madrid", partidoActual: "PODEMOS",
      historial: [{ partido: "PODEMOS", desde: 2014 }],
      casos: [{ caso: "neurona", partido: "PODEMOS", estado: "archivado", firme: true, anio: 2023, detalle: "Investigado por un pago de una entidad vinculada; el juez archivó la causa para él." }] },

    { id: "david_sanchez", nombre: "David Sánchez Pérez-Castejón", cargo: "Excoordinador de conservatorios de la Diputación de Badajoz (no es cargo electo)", ccaa: "Extremadura", partidoActual: "NINGUNO",
      historial: [],
      casos: [{ caso: "hermano", partido: "NINGUNO", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado en julio de 2026 a 9 años de inhabilitación por prevaricación; su defensa recurre." }] },

    /* ===================== Ampliación (búsqueda nov. 2026) ===================== */
    /* ---- PP ---- */
    { id: "diaz_alperi", nombre: "Luis Díaz Alperi", cargo: "Exalcalde de Alicante", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "brugal_pgou", partido: "PP", estado: "absuelto", firme: true, anio: 2022, detalle: "Condenado a multa por cohecho impropio en 2021; el Supremo le absolvió por prescripción." }] },

    { id: "castedo", nombre: "Sonia Castedo", cargo: "Exalcaldesa de Alicante", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "brugal_pgou", partido: "PP", estado: "absuelto", firme: true, anio: 2021, detalle: "Absuelta: la Audiencia vio cohecho por un regalo, pero el delito había prescrito." }] },

    { id: "enrique_crespo", nombre: "Enrique Crespo", cargo: "Exalcalde de Manises y expresidente de Emarsa", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "emarsa", partido: "PP", estado: "condenado", firme: true, anio: 2019, detalle: "Condenado a 10 años de prisión, ratificados por el Supremo. Tiene otra condena por fraude de IVA." }] },

    { id: "ricardo_costa", nombre: "Ricardo Costa", cargo: "Ex secretario general del PP de la Comunitat Valenciana", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "ppcv_financiacion", partido: "PP", estado: "condenado", firme: true, anio: 2018, detalle: "Confesó la financiación ilegal y fue condenado a 4 años de prisión con atenuantes." }] },

    { id: "cotino", nombre: "Juan Cotino", cargo: "Ex presidente de Les Corts y ex director general de la Policía", ccaa: "C. Valenciana", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "gurtel_papa", partido: "PP", estado: "anulado", firme: null, anio: 2020, detalle: "Acusado en el juicio de la visita del Papa; murió de covid-19 en abril de 2020, durante el juicio, lo que extinguió su responsabilidad penal." }] },

    { id: "gonzalez_panero", nombre: "Arturo González Panero", cargo: "Exalcalde de Boadilla del Monte", ccaa: "Madrid", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "gurtel_boadilla", partido: "PP", estado: "condenado", firme: true, anio: 2022, detalle: "Condenado a 36 años y 11 meses por 18 delitos; el Supremo confirmó la condena. En prisión desde 2022." }] },

    { id: "grau", nombre: "Alfonso Grau", cargo: "Ex vicealcalde de Valencia", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [
        { caso: "azud", partido: "PP", estado: "juicio", firme: null, anio: 2026, detalle: "Procesado en 2026; según la jueza habría obtenido más de dos millones en comisiones. Estuvo seis meses en prisión provisional." },
        { caso: "taula", partido: "PP", estado: "condenado", firme: false, anio: 2024, detalle: "Condenado en primera instancia en una pieza del caso Taula." }
      ] },

    { id: "cerda", nombre: "Antonio Cerdá", cargo: "Exconsejero de Medio Ambiente de la Región de Murcia", ccaa: "Murcia", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "novo_carthago", partido: "PP", estado: "absuelto", firme: null, anio: 2025, detalle: "Absuelto junto al resto de acusados; recurrible en casación." }] },

    { id: "bascunana", nombre: "Joaquín Bascuñana", cargo: "Exconsejero de Obras Públicas de la Región de Murcia", ccaa: "Murcia", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "novo_carthago", partido: "PP", estado: "absuelto", firme: null, anio: 2025, detalle: "Absuelto junto al resto de acusados; recurrible en casación." }] },

    { id: "pedro_antonio", nombre: "Pedro Antonio Sánchez", cargo: "Expresidente de la Región de Murcia y exalcalde de Puerto Lumbreras", ccaa: "Murcia", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "auditorio_murcia", partido: "PP", estado: "condenado", firme: true, anio: 2024, detalle: "Condenado a 3 años de prisión y 17 de inhabilitación por prevaricación y falsedad; confirmado por el Supremo. Fue absuelto en otro proceso (caso Pasarelas)." }] },

    { id: "jm_rodriguez", nombre: "José María Rodríguez", cargo: "Ex secretario general del PP balear y exconseller de Interior", ccaa: "Baleares", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "over_baleares", partido: "PP", estado: "condenado", firme: true, anio: 2022, detalle: "Condenado a 3 años y medio por prevaricación, malversación y falsedad; el Supremo confirmó la condena. Obtuvo el tercer grado." }] },

    { id: "canellas", nombre: "Gabriel Cañellas", cargo: "Expresidente del Govern balear", ccaa: "Baleares", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "soller", partido: "PP", estado: "anulado", firme: true, anio: 1997, detalle: "El tribunal consideró probado el cohecho, pero absolvió por prescripción. Había dimitido en 1995." }] },

    { id: "monago", nombre: "José Antonio Monago", cargo: "Expresidente de la Junta de Extremadura y exsenador", ccaa: "Extremadura", partidoActual: "PP",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "monago", partido: "PP", estado: "archivado", firme: true, anio: 2015, detalle: "El Supremo archivó la querella por malversación." }] },

    { id: "luis_soria", nombre: "Luis Soria", cargo: "Exconsejero de Industria del Gobierno de Canarias", ccaa: "Canarias", partidoActual: "NINGUNO",
      historial: [{ partido: "PP" }],
      casos: [{ caso: "eolico_canarias", partido: "PP", estado: "archivado", firme: true, anio: 2010, detalle: "El TSJ de Canarias mantuvo el archivo de la querella al no ver «base indiciaria mínima»." }] },

    /* ---- PSOE / PSC ---- */
    { id: "zapatero", nombre: "José Luis Rodríguez Zapatero", cargo: "Expresidente del Gobierno (2004-2011)", ccaa: "Nacional", partidoActual: "PSOE",
      historial: [{ partido: "PSOE", desde: 1979 }],
      casos: [{ caso: "plus_ultra", partido: "PSOE", estado: "investigacion", firme: null, anio: 2026, detalle: "Imputado en mayo de 2026; declaró en junio negando haber influido en el rescate. En septiembre el juez rechazó anular la causa y en octubre la amplió." }] },

    { id: "rafa_rubio", nombre: "Rafael Rubio", cargo: "Ex subdelegado del Gobierno en Valencia", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "azud", partido: "PSOE", estado: "juicio", firme: null, anio: 2026, detalle: "Procesado en 2026; estuvo en prisión provisional. Fue cesado como subdelegado del Gobierno." }] },

    { id: "jorge_rodriguez", nombre: "Jorge Rodríguez", cargo: "Expresidente de la Diputación de Valencia y alcalde de Ontinyent", ccaa: "C. Valenciana", partidoActual: "ENSUNEIX",
      historial: [{ partido: "PSOE", hasta: 2018 }, { partido: "ENSUNEIX", desde: 2018 }],
      casos: [{ caso: "alqueria", partido: "PSOE", estado: "absuelto", firme: null, anio: 2023, detalle: "Detenido en 2018, lo que provocó su salida del PSPV-PSOE. Absuelto en 2023; el TSJ confirmó la absolución." }] },

    { id: "villen", nombre: "Fernando Villén", cargo: "Exdirector de la Faffe (Junta de Andalucía)", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "faffe", partido: "PSOE", estado: "condenado", firme: null, anio: 2024, detalle: "Condenado a 6 años, rebajados por el TSJA a 5 años y 3 meses. Tiene otra condena de 3 años y medio por una contratación irregular en la Faffe." }] },

    { id: "vallejo", nombre: "Francisco Vallejo", cargo: "Exconsejero de Innovación de la Junta de Andalucía", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [
        { caso: "invercaria", partido: "PSOE", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado en julio de 2026 a 3 años y medio de prisión junto al expresidente de Invercaria." },
        { caso: "ere", partido: "PSOE", estado: "anulado", firme: null, anio: 2024, detalle: "Condenado en la pieza política de los ERE; el Tribunal Constitucional estimó su amparo en 2024." }
      ] },

    { id: "barrientos", nombre: "Antonio Barrientos", cargo: "Exalcalde de Estepona", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "astapa", partido: "PSOE", estado: "condenado", firme: null, anio: 2024, detalle: "Condenado por cohecho a 5 meses y 7 días de suspensión de empleo y 40.000 euros de multa; la Fiscalía llegó a pedir casi 11 años." }] },

    { id: "juan_guerra", nombre: "Juan Guerra", cargo: "Hermano del vicepresidente Alfonso Guerra; usaba un despacho de la Delegación del Gobierno en Sevilla", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "juan_guerra", partido: "PSOE", estado: "condenado", firme: true, anio: 1995, detalle: "Procesado en varias causas; el Supremo lo dejó condenado únicamente por un delito fiscal. Se declara inocente." }] },

    { id: "toscano", nombre: "Francisco Toscano", cargo: "Exalcalde de Dos Hermanas", ccaa: "Andalucía", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "dos_hermanas", partido: "PSOE", estado: "archivado", firme: null, anio: 2026, detalle: "Querella archivada en junio de 2026: sin malversación ni tráfico de influencias y prevaricación prescrita." }] },

    { id: "paco_salazar", nombre: "Paco Salazar", cargo: "Exdirigente del PSOE y exasesor en Moncloa", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "dos_hermanas", partido: "PSOE", estado: "archivado", firme: null, anio: 2026, detalle: "La querella sostenía que cobró del Ayuntamiento entre 2012 y 2017 sin trabajar; archivada en junio de 2026 por prescripción y falta de delito." }] },

    { id: "urralburu", nombre: "Gabriel Urralburu", cargo: "Expresidente del Gobierno de Navarra", ccaa: "Navarra", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "urralburu", partido: "PSOE", estado: "condenado", firme: true, anio: 1999, detalle: "Condenado por cohecho y delito fiscal; la pena inicial se rebajó en apelación y empezó a cumplirla en 2001." }] },

    { id: "aragon", nombre: "Antonio Aragón", cargo: "Exconsejero de Obras Públicas de Navarra", ccaa: "Navarra", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "urralburu", partido: "PSOE", estado: "condenado", firme: true, anio: 1999, detalle: "Condenado junto a Urralburu." }] },

    { id: "otano", nombre: "Javier Otano", cargo: "Expresidente del Gobierno de Navarra", ccaa: "Navarra", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "urralburu", partido: "PSOE", estado: "anulado", firme: true, anio: 1999, detalle: "Dimitió en 1996 al conocerse una cuenta en Suiza; la causa contra él terminó por prescripción." }] },

    { id: "fco_rodriguez_ourense", nombre: "Francisco Rodríguez", cargo: "Exalcalde de Ourense", ccaa: "Galicia", partidoActual: "PSOE",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "pokemon", partido: "PSOE", estado: "archivado", firme: null, anio: 2023, detalle: "Detenido en 2012 y dimitido como alcalde; la pieza que le afectaba fue archivada once años después." }] },

    { id: "dionisio_munoz", nombre: "Dionisio Muñoz", cargo: "Ex secretario general del PSOE de Melilla", ccaa: "Melilla", partidoActual: "NINGUNO",
      historial: [{ partido: "PSOE" }],
      casos: [{ caso: "melilla_votos", partido: "PSOE", estado: "condenado", firme: true, anio: 2021, detalle: "Condenado a 2 años de prisión y 30 meses de inhabilitación por delito electoral y falsedad." }] },

    { id: "bustos", nombre: "Manuel Bustos", cargo: "Exalcalde de Sabadell", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "PSC" }],
      casos: [{ caso: "mercurio", partido: "PSC", estado: "condenado", firme: true, anio: 2021, detalle: "Varias condenas firmes; entre ellas, 3 años de prisión por ordenar retirar multas a familiares. En 2026 aceptó otra pena en una pieza separada." }] },

    /* ---- Cataluña: CDC, UDC, ERC ---- */
    { id: "gordo", nombre: "Germà Gordó", cargo: "Exconseller de Justicia y extesorero de CDC", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC" }],
      casos: [{ caso: "tres_por_ciento", partido: "CDC", estado: "juicio", firme: null, anio: 2022, detalle: "Enviado a juicio en 2022; la Fiscalía pide 18 años y 10 meses." }] },

    { id: "viloca", nombre: "Andreu Viloca", cargo: "Extesorero de CDC", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "CDC" }],
      casos: [{ caso: "tres_por_ciento", partido: "CDC", estado: "juicio", firme: null, anio: 2022, detalle: "Enviado a juicio en 2022; la Fiscalía pide 21 años y 4 meses." }] },

    { id: "vicenc_gavalda", nombre: "Vicenç Gavaldà", cargo: "Ex secretario de organización de Unió Democràtica", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "UDC" }],
      casos: [{ caso: "pallerols", partido: "UDC", estado: "condenado", firme: true, anio: 2013, detalle: "Condenado por conformidad a 7 meses de prisión." }] },

    { id: "lluis_gavalda", nombre: "Lluís Gavaldà", cargo: "Ex director general de Ocupació de la Generalitat", ccaa: "Cataluña", partidoActual: "NINGUNO",
      historial: [{ partido: "UDC" }],
      casos: [{ caso: "pallerols", partido: "UDC", estado: "condenado", firme: true, anio: 2013, detalle: "Condenado por conformidad a un año y medio de prisión." }] },

    { id: "carbonell", nombre: "Aurora Carbonell", cargo: "Alcaldesa de Sitges", ccaa: "Cataluña", partidoActual: "ERC",
      historial: [{ partido: "ERC" }],
      casos: [{ caso: "sitges", partido: "ERC", estado: "investigacion", firme: null, anio: 2026, detalle: "Detenida en 2023 y en libertad; investigada por prevaricación y malversación. En 2026 declaró por otra línea, que niega." }] },

    /* ---- Partidos regionales y locales ---- */
    { id: "pinilla", nombre: "María Victoria Pinilla", cargo: "Exalcaldesa de La Muela (Zaragoza)", ccaa: "Aragón", partidoActual: "NINGUNO",
      historial: [{ partido: "PAR" }],
      casos: [{ caso: "la_muela", partido: "PAR", estado: "condenado", firme: true, anio: 2020, detalle: "Condenada por el Supremo a 11 años y 4 meses por cohecho y malversación, tras un primer juicio anulado." }] },

    { id: "hormaechea", nombre: "Juan Hormaechea", cargo: "Expresidente de Cantabria", ccaa: "Cantabria", partidoActual: "NINGUNO",
      historial: [{ partido: "PP", desde: 1987, hasta: 1990 }, { partido: "UPCA", desde: 1991, hasta: 2003 }],
      casos: [{ caso: "hormaechea", partido: "UPCA", estado: "condenado", firme: true, anio: 1994, detalle: "Condenado por malversación y prevaricación; indultado de la pena de prisión en 1995. Llegó a la presidencia como independiente en las listas de AP-PP y fundó después la UPCA. Murió en 2020." }] },

    { id: "dimas_martin", nombre: "Dimas Martín", cargo: "Fundador del Partido de Independientes de Lanzarote y expresidente del Cabildo", ccaa: "Canarias", partidoActual: "PIL",
      historial: [{ partido: "PIL" }],
      casos: [{ caso: "union_lanzarote", partido: "PIL", estado: "condenado", firme: true, anio: 2022, detalle: "El Supremo confirmó 7 años y 5 meses de prisión en una de las piezas principales; acumula otras condenas por corrupción." }] },

    { id: "pacheco", nombre: "Pedro Pacheco", cargo: "Exalcalde de Jerez de la Frontera", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "PA", hasta: 2001 }, { partido: "PSA", desde: 2001, hasta: 2011 }],
      casos: [{ caso: "pacheco_asesores", partido: "PSA", estado: "condenado", firme: true, anio: 2014, detalle: "Condenado a 5 años y medio por el Supremo; tiene otras dos condenas. Fundó el Partido Socialista de Andalucía tras su etapa en el Partido Andalucista." }] },

    { id: "aberchan", nombre: "Mustafa Aberchán", cargo: "Líder de Coalición por Melilla y expresidente de la Ciudad Autónoma", ccaa: "Melilla", partidoActual: "CPM",
      historial: [{ partido: "CPM" }],
      casos: [{ caso: "melilla_votos", partido: "CPM", estado: "condenado", firme: true, anio: 2021, detalle: "Condenado a 2 años de prisión y 30 meses de inhabilitación por la compra de votos de 2008. En 2023 la policía le investigó por otra presunta compra de votos, sin que constara imputación." }] },

    { id: "jacome", nombre: "Gonzalo Pérez Jácome", cargo: "Alcalde de Ourense", ccaa: "Galicia", partidoActual: "DO",
      historial: [{ partido: "DO" }],
      casos: [{ caso: "jacome", partido: "DO", estado: "investigacion", firme: null, anio: 2026, detalle: "Imputado en abril de 2026 por prevaricación continuada; ha recurrido." }] },

    { id: "sanz_upn", nombre: "Miguel Sanz", cargo: "Expresidente del Gobierno de Navarra", ccaa: "Navarra", partidoActual: "UPN",
      historial: [{ partido: "UPN" }],
      casos: [{ caso: "can_dietas", partido: "UPN", estado: "archivado", firme: true, anio: 2013, detalle: "Investigado en 2013; devolvió las dietas y la causa se archivó." }] },

    { id: "barcina", nombre: "Yolanda Barcina", cargo: "Expresidenta del Gobierno de Navarra", ccaa: "Navarra", partidoActual: "UPN",
      historial: [{ partido: "UPN" }],
      casos: [{ caso: "can_dietas", partido: "UPN", estado: "archivado", firme: true, anio: 2013, detalle: "El Supremo rechazó imputarla al no ver delito; archivo definitivo en diciembre de 2013." }] },

    { id: "torrijos", nombre: "Antonio Rodrigo Torrijos", cargo: "Ex teniente de alcalde de Sevilla y exportavoz de IU", ccaa: "Andalucía", partidoActual: "IU",
      historial: [{ partido: "IU" }],
      casos: [{ caso: "mercasevilla", partido: "IU", estado: "absuelto", firme: true, anio: 2016, detalle: "Absuelto; la Fiscalía, que pedía dos años de prisión, no recurrió." }] },

    { id: "brines", nombre: "Agustina Brines", cargo: "Excogerente de Divalterra a propuesta de Compromís", ccaa: "C. Valenciana", partidoActual: "NINGUNO",
      historial: [{ partido: "COMPROMIS" }],
      casos: [{ caso: "alqueria", partido: "COMPROMIS", estado: "absuelto", firme: null, anio: 2023, detalle: "Investigada en 2018 y destituida por Compromís; absuelta con el resto de acusados." }] },

    { id: "jesus_gil", nombre: "Jesús Gil", cargo: "Exalcalde de Marbella y expresidente del Atlético de Madrid", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "GIL", desde: 1991 }],
      casos: [{ caso: "gil_camisetas", partido: "GIL", estado: "condenado", firme: true, anio: 2002, detalle: "Condenado a inhabilitación por prevaricación; el Supremo la ratificó en 2002 y tuvo que dejar la alcaldía. Murió en 2004." }] },

    /* ---- Sin partido o afiliación no confirmada ---- */
    { id: "rafael_delgado", nombre: "Rafael Delgado", cargo: "Exviceconsejero de Economía de la Junta de Castilla y León (Gobierno del PP)", ccaa: "Castilla y León", partidoActual: "NINGUNO",
      historial: [],
      casos: [
        { caso: "perla_negra", partido: "NINGUNO", estado: "condenado", firme: false, anio: 2025, detalle: "Condenado a 2 años y medio por prevaricación y malversación; recurrible." },
        { caso: "trama_eolica", partido: "NINGUNO", estado: "juicio", firme: null, anio: 2026, detalle: "Juzgado entre 2025 y enero de 2026; la Fiscalía pide 42 años. Visto para sentencia." }
      ] },

    { id: "celso_perdomo", nombre: "Celso Perdomo", cargo: "Exdirector general de Industria del Gobierno de Canarias", ccaa: "Canarias", partidoActual: "NINGUNO",
      historial: [],
      casos: [{ caso: "eolico_canarias", partido: "NINGUNO", estado: "condenado", firme: null, anio: 2014, detalle: "Condenado a 2 años y 4 meses por revelación de información, cohecho y malversación. Alto cargo del Gobierno CC-PP; no consta su militancia." }] },

    { id: "fco_serrano", nombre: "Francisco Serrano", cargo: "Exportavoz de Vox en el Parlamento de Andalucía", ccaa: "Andalucía", partidoActual: "NINGUNO",
      historial: [{ partido: "VOX", hasta: 2020 }],
      casos: [{ caso: "serrano_prestamo", partido: "NINGUNO", estado: "juicio", firme: null, anio: 2027, detalle: "Hechos de 2016, como empresario y antes de entrar en Vox. Juicio fijado para marzo de 2027; niega los hechos." }] }
  ]
};
