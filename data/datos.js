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
 *           estado   = investigacion | juicio | condenado | absuelto | archivado | anulado
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
    MIXTO:   { nombre: "Grupo Mixto / no adscrito", color: "#8A8F98" },
    NINGUNO: { nombre: "Sin partido",          color: "#5F646C" }
  },

  estados: {
    investigacion: { nombre: "En investigación",        grupo: "abierto" },
    juicio:        { nombre: "Pendiente / en juicio",   grupo: "abierto" },
    condenado:     { nombre: "Condenado",               grupo: "condena" },
    absuelto:      { nombre: "Absuelto",                grupo: "cerrado" },
    archivado:     { nombre: "Archivado / sobreseído",  grupo: "cerrado" },
    anulado:       { nombre: "Anulado / extinguido",    grupo: "cerrado" }
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
      casos: [{ caso: "palau", partido: "CDC", estado: "condenado", firme: true, anio: 2020, detalle: "Condenado a prisión por la financiación ilegal de CDC a través del Palau." }] },

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
      casos: [{ caso: "hermano", partido: "NINGUNO", estado: "condenado", firme: false, anio: 2026, detalle: "Condenado en julio de 2026 a 9 años de inhabilitación por prevaricación; su defensa recurre." }] }
  ]
};
