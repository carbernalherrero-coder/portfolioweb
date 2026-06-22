const yearElement = document.querySelector("#current-year");
const languageButtons = Array.from(document.querySelectorAll("[data-lang]"));

const textTranslations = {
  es: {
    "Back to the beginning": "Volver al inicio",
    "Carlos Bernal | Career Universe": "Carlos Bernal | Universo profesional",
    "Horizontal scrollytelling portfolio for Carlos Bernal, journalist and strategic communication specialist.":
      "Portfolio horizontal de scrollytelling de Carlos Bernal, periodista y especialista en comunicación estratégica.",
    "Main navigation": "Navegación principal",
    "Language selector": "Selector de idioma",
    "View English version": "Ver versión en inglés",
    "World map": "Mapamundi",
    "Timeline": "Trayectoria",
    "Archive": "Archivo",
    "Contact": "Contacto",
    "Journalist": "Periodista",
    "working at the crossroads where": "trabajando en el cruce donde",
    "field reporting, strategic communication, and public-impact work meet.":
      "convergen el reporterismo de campo, la comunicación estratégica y el trabajo de impacto público.",
    "working": "trabajando",
    "at": "en",
    "the crossroads": "el cruce",
    "where": "donde",
    "field reporting,": "el reporterismo de campo,",
    "strategic communication": "la comunicación estratégica",
    "and public impact": "y el impacto público",
    "work meet.": "se encuentran.",
    "+5 years in field reporting": "+5 años en reporterismo de campo",
    "+2 years in the third sector": "+2 años en el tercer sector",
    "+2 years in strategic communication": "+2 años en comunicación estratégica",
    "+1 year in the publishing industry": "+1 año en el sector editorial",
    "Trilingual in Spanish, English and French": "Trilingüe en español, inglés y francés",
    "Graphic design and web development": "Diseño gráfico y desarrollo web",
    "Master in corporate communication and public affairs": "Máster en comunicación corporativa y asuntos públicos",
    "Master in political management": "Máster en gestión política",
    "Portfolio archive categories": "Categorías del archivo del portfolio",
    "French Ministry": "Ministerio francés",
    "of Education": "de Educación",
    "NGO": "ONG",
    "Static world map": "Mapa mundial estático",
    "A clean grey world map with selected countries highlighted as an editorial transition section.":
      "Un mapa mundial gris y limpio con países destacados como sección editorial de transición.",
    "TAP USA": "TOCA EE. UU.",
    "TAP PORTUGAL": "TOCA PORTUGAL",
    "TAP SPAIN": "TOCA ESPAÑA",
    "TAP FRANCE": "TOCA FRANCIA",
    "TAP IRELAND": "TOCA IRLANDA",
    "TAP BELGIUM": "TOCA BÉLGICA",
    "TAP DENMARK": "TOCA DINAMARCA",
    "TAP ECUADOR": "TOCA ECUADOR",
    "TAP PERU": "TOCA PERÚ",
    "Date:": "Fecha:",
    "Role:": "Rol:",
    "Organization:": "Organización:",
    "Master's Programme Student": "Estudiante de máster",
    "International Academic Year": "Curso académico internacional",
    "Sociocultural Project Coordinator": "Coordinador de proyectos socioculturales",
    "2026 (in progress)": "2026 (en curso)",
    "Journalist": "Periodista",
    "Corporate Communication Consultant": "Consultor de comunicación corporativa",
    "Corporate Comm & Public Affairs - Master": "Máster en comunicación corporativa y asuntos públicos",
    "Graphic Design & Web Development": "Diseño gráfico y desarrollo web",
    "Editorial Assistant": "Asistente editorial",
    "Film and TV Screenwriting Programme": "Programa de guion de cine y televisión",
    "Assistant Content Manager": "Asistente de gestión de contenidos",
    "Production, Lille": "Producción, Lille",
    "Project Manager": "Gestor de proyectos",
    "BPJEPS Loisirs Tous Publics": "BPJEPS Loisirs Tous Publics",
    "Scholarship": "Beca",
    "Linguistic Exchange Coordinator": "Coordinador de intercambios lingüísticos",
    "Engaging Europe Programme Participant": "Participante en el programa Engaging Europe",
    "Erasmus Exchange Student": "Estudiante Erasmus",
    "Digital Content Specialist / Volunteer": "Especialista en contenido digital / voluntario",
    "Achuar community-based project": "Proyecto comunitario achuar",
    "An international path shaped across": "Una trayectoria internacional construida en",
    "Spanish, French, and English-speaking environments.": "entornos de habla española, francesa e inglesa.",
    "Madrid correspondent: local journalism, interviews and field reporting.":
      "Corresponsal en Madrid: periodismo local, entrevistas y reporterismo de campo.",
    "01-06-2026 / present": "01-06-2026 / actualidad",
    "Journalism archive": "Archivo periodístico",
    "Education volunteer and digital content assistant in Trujillo, Peru.":
      "Voluntario educativo y asistente de contenido digital en Trujillo, Perú.",
    "Third sector / Peru": "Tercer sector / Perú",
    "School of Political Management": "School of Political Management",
    "The George Washington University. Political management and public affairs learning.":
      "The George Washington University. Formación en gestión política y asuntos públicos.",
    "International training": "Formación internacional",
    "Corporate communication consulting in Madrid: monitoring, plans, content and public affairs support.":
      "Consultoría de comunicación corporativa en Madrid: monitorización, planes, contenidos y apoyo en asuntos públicos.",
    "Agency / corporate PR": "Agencia / comunicación corporativa",
    "Corporate Communication": "Comunicación corporativa",
    "Universidad de Navarra master: political communication, public affairs, institutional and crisis communication.":
      "Máster de la Universidad de Navarra: comunicación política, asuntos públicos, comunicación institucional y de crisis.",
    "Master": "Máster",
    "Reporter and editor in Asturias across field reporting, interviews, local beats and video.":
      "Redactor y editor en Asturias, con reporterismo de campo, entrevistas, información local y vídeo.",
    "Graphic Design and Motion Graphics": "Diseño gráfico y Motion Graphics",
    "Trazos. Web development, digital design, web structure and visual production.":
      "Trazos. Desarrollo web, diseño digital, estructura web y producción visual.",
    "Digital skills": "Competencias digitales",
    "Editorial project support in Madrid, bridging art publishing, production and cultural context.":
      "Apoyo a proyectos editoriales en Madrid, conectando edición artística, producción y contexto cultural.",
    "Publishing industry": "Sector editorial",
    "Content, publishing and cultural communication in Lille, France.":
      "Contenido, edición y comunicación cultural en Lille, Francia.",
    "Culture / editorial content": "Cultura / contenido editorial",
    "Project management and community work in Lille.": "Gestión de proyectos y trabajo comunitario en Lille.",
    "Operational base for a gender-equality and inclusion project in Lille.":
      "Base operativa de un proyecto de inclusión e igualdad de género en Lille.",
    "French Ministry scholarship and BPJEPS socio-cultural coordination at CEMEA.":
      "Beca del Ministerio francés y coordinación sociocultural BPJEPS en CEMEA.",
    "Third sector": "Tercer sector",
    "BPJEPS / socio-cultural coordination": "BPJEPS / coordinación sociocultural",
    "French Ministry of Education and CEMEA. Training in youth work and cultural projects.":
      "Ministerio francés de Educación y CEMEA. Formación en intervención juvenil y proyectos culturales.",
    "Education / France": "Educación / Francia",
    "Film and TV Screenwriting": "Guion de cine y televisión",
    "La Factoría del Guion. Structure, scenes, dialogue and narrative rhythm.":
      "La Factoría del Guion. Estructura, escenas, diálogo y ritmo narrativo.",
    "Creative writing": "Escritura creativa",
    "Coordination of language exchanges across Dublin and Madrid.":
      "Coordinación de intercambios lingüísticos entre Dublín y Madrid.",
    "Education / languages": "Educación / idiomas",
    "Journalism and": "Periodismo y",
    "Communication": "Comunicación",
    "Double degree at Universidad Rey Juan Carlos: journalism, audiovisual communication and public opinion.":
      "Doble grado en la Universidad Rey Juan Carlos: periodismo, comunicación audiovisual y opinión pública.",
    "Academic foundation": "Base académica",
    "Horizontal scrollytelling portfolio.": "Portfolio horizontal de scrollytelling.",
    "Interested in working together?": "¿Te interesa que trabajemos juntos?",
    "Let’s tell purposeful stories that build trust.":
      "Contemos historias con propósito que construyan confianza.",
    "Contact details": "Datos de contacto",
    "LinkedIn — Carlos Bernal": "LinkedIn — Carlos Bernal",
    "Name": "Nombre",
    "Email": "Email",
    "Phone": "Teléfono",
    "Message": "Mensaje",
    "Send message": "Enviar mensaje",
    "Message sent. Thank you.": "El mensaje ha sido enviado. Muchas gracias.",
    "Secure Formspree delivery with email fallback.":
      "Envío seguro con Formspree y respaldo por email.",
    "Carlos Bernal portrait": "Retrato de Carlos Bernal",
    "Close detail panel": "Cerrar panel de detalle",
    "Close": "Cerrar",
    "Portfolio chapter": "Capítulo del portfolio",
    "Archive navigation": "Navegación del archivo",
    "View previous section": "Ver sección anterior",
    "View next section": "Ver siguiente sección",
    "Academic titles list": "Lista de títulos académicos",
    "Journalism and Audiovisual Communication": "Periodismo y Comunicación Audiovisual",
    "Academic starting point for the timeline: reporting, audiovisual language, scripts and public storytelling.":
      "Punto de partida académico de la trayectoria: reporterismo, lenguaje audiovisual, guion y narración pública.",
    "This academic stage built the reporting discipline, audiovisual language and critical framework behind my subsequent work in journalism, communication and public storytelling.":
      "Esta etapa académica construyó la disciplina reporteril, el lenguaje audiovisual y el marco crítico que sostiene mi trabajo posterior en periodismo, comunicación y narración pública.",
    "Film and TV screenwriting training.": "Formación en guion de cine y televisión.",
    "The programme strengthened my command of dramatic structure, character development, dialogue and audiovisual storytelling for fiction and factual narratives.":
      "El programa reforzó mi dominio de la estructura dramática, la construcción de personajes, el diálogo y la narración audiovisual para relatos de ficción y no ficción.",
    "Editorial Brumaria visual archive": "Archivo visual de Editorial Brumaria",
    "Publishing / Cultural production": "Edición / producción cultural",
    "Fieldwork / Human connection": "Trabajo de campo / conexión humana",
    "During 16 months at Editorial Brumaria, I supported the publisher's digital transition, helping launch its website and e-commerce platform while assisting communications, editorial production and cultural programming. I worked across the full publishing cycle: author relations in English and French, copy-editing, layout support, print coordination, magazine content and book launches across several collections.":
      "Durante 16 meses en Editorial Brumaria, apoyé la transición digital de la editorial, ayudando al lanzamiento de su web y plataforma de comercio electrónico, además de colaborar en comunicación, producción editorial y programación cultural. Trabajé en todo el ciclo editorial: relación con autores en inglés y francés, corrección, apoyo a maquetación, coordinación de imprenta, contenidos de revista y lanzamientos de libros en varias colecciones.",
    "Digital Content Producer": "Productor de contenido digital",
    "I also contributed to digital content creation, combining graphic design skills, editorial editing and sharp social media copywriting to strengthen Brumaria's online voice, visual identity and audience engagement.":
      "También contribuí a la creación de contenido digital, combinando diseño gráfico, edición editorial y copywriting preciso para redes sociales con el fin de reforzar la voz online, la identidad visual y la conexión con la audiencia de Brumaria.",
    "French Ministry of Education / CEMEA": "Ministerio francés de Educación / CEMEA",
    "BPJEPS / socio-cultural project coordination training in France.":
      "Formación BPJEPS en coordinación de proyectos socioculturales en Francia.",
    "A curated selection of audiovisual work produced during my time with Cultur'all Studio in Lille, spanning festivals, music videos, and campaign spots for cultural and institutional clients across Northern France.":
      "Una selección curada de trabajos audiovisuales producidos durante mi etapa en Cultur'all Studio en Lille, con festivales, videoclips y piezas de campaña para clientes culturales e institucionales del norte de Francia.",
    "Graphic Design and Web Development": "Diseño gráfico y desarrollo web",
    "Digital design and web-development training at Trazos.":
      "Formación en diseño digital y desarrollo web en Trazos.",
    "This training gave me a practical visual toolkit for building digital narratives: interface structure, graphic composition, motion graphics and web-oriented production.":
      "Esta formación me dio una caja de herramientas visual para construir narrativas digitales: estructura de interfaz, composición gráfica, motion graphics y producción orientada a web.",
    "I received a French Ministry of Education scholarship to complete a 12-month BPJEPS programme at CEMEA. The training combined full-time theoretical classes with the design and implementation of a socio-cultural project across Lille's municipal social-centre network: an inclusion and gender-equality programme built around 14 workshops and public events, subsequently documented in a formal report for the Ministry.":
      "Recibí una beca del Ministerio francés de Educación para realizar una formación BPJEPS de 12 meses en CEMEA. El programa combinó clases teóricas a jornada completa con el diseño e implantación de un proyecto sociocultural en la red municipal de centros sociales de Lille: una iniciativa de inclusión e igualdad de género articulada en 14 talleres y eventos públicos, documentada posteriormente en una memoria formal para el Ministerio.",
    "Designed the inclusion and gender-equality project from concept to implementation.":
      "Diseñé el proyecto de inclusión e igualdad de género desde la idea inicial hasta su implantación.",
    "Coordinated institutional communication with the French Ministry of Education and Lille City Council.":
      "Coordiné la comunicación institucional con el Ministerio francés de Educación y el Ayuntamiento de Lille.",
    "Planned and managed 14 workshops and public events across Lille's social-centre network.":
      "Planifiqué y gestioné 14 talleres y eventos públicos en la red de centros sociales de Lille.",
    "Worked with centre directors, local teams and municipal stakeholders to deliver the programme.":
      "Trabajé con direcciones de centros, equipos locales y actores municipales para ejecutar el programa.",
    "Presented the project and final report, successfully completing the BPJEPS assessment.":
      "Presenté el proyecto y la memoria final, completando con éxito la evaluación del BPJEPS.",
    "Centre Social La Busette was the operational base for my BPJEPS project in Lille. From there, and with the support of its management team, I designed, tested and coordinated the first workshops of an inclusion and gender-equality programme before expanding it to other municipal social centres. The centre director acted as my project tutor throughout the process.":
      "Centre Social La Busette fue la base operativa de mi proyecto BPJEPS en Lille. Desde allí, y con el apoyo de su equipo directivo, diseñé, probé y coordiné los primeros talleres de un programa de inclusión e igualdad de género antes de extenderlo a otros centros sociales municipales. La directora del centro fue mi tutora de proyecto durante todo el proceso.",
    "Used La Busette as the headquarters for project planning, coordination and follow-up.":
      "Utilicé La Busette como sede de planificación, coordinación y seguimiento del proyecto.",
    "Designed the first workshop formats with the centre's management and community teams.":
      "Diseñé los primeros formatos de taller con el equipo directivo y comunitario del centro.",
    "Coordinated schedules, spaces, participants and support teams for local activities.":
      "Coordiné calendarios, espacios, participantes y equipos de apoyo para las actividades locales.",
    "Adapted the project model before transferring workshops to other social centres in Lille.":
      "Adapté el modelo del proyecto antes de trasladar los talleres a otros centros sociales de Lille.",
    "Worked under the supervision of the centre director, who served as project tutor.":
      "Trabajé bajo la supervisión de la directora del centro, que ejerció como tutora del proyecto.",
    "After two years producing audiovisual content in Lille for cultural centres, Lille City Council and music festivals, plus one year at Editorial Brumaria supporting editorial projects in Madrid, I joined Trazos to professionalise that practical background. The programme strengthened my command of graphic design, motion graphics and digital production through Adobe workflows, visual identity, editorial design, advertising, animation and front-end foundations.":
      "Después de dos años produciendo contenido audiovisual en Lille para centros culturales, el Ayuntamiento y festivales de música, además de un año en Editorial Brumaria apoyando proyectos editoriales en Madrid, cursé Trazos para profesionalizar esa experiencia práctica. El programa reforzó mi dominio del diseño gráfico, el motion graphics y la producción digital mediante Adobe, identidad visual, diseño editorial, publicidad, animación y bases de front-end.",
    "Professionalised my audiovisual background through graphic design, branding, editorial design and advertising practice.":
      "Profesionalicé mi experiencia audiovisual previa mediante diseño gráfico, branding, diseño editorial y práctica publicitaria.",
    "Worked with Adobe Illustrator, Photoshop, InDesign, After Effects and Premiere for visual and motion production.":
      "Trabajé con Adobe Illustrator, Photoshop, InDesign, After Effects y Premiere para producción visual y motion.",
    "Built motion-graphics skills around rhythm, composition, keyframes, effects, video editing and animated storytelling.":
      "Desarrollé competencias de motion graphics en ritmo, composición, keyframes, efectos, edición de vídeo y narrativa animada.",
    "Connected design training with web-oriented production, strengthening HTML, CSS, JavaScript and digital storytelling foundations.":
      "Conecté la formación en diseño con producción orientada a web, reforzando bases de HTML, CSS, JavaScript y narrativa digital.",
    "El Comercio / Front pages": "El Comercio / Portadas",
    "Wildfires": "Incendios",
    "Politics": "Política",
    "Culture": "Cultura",
    "Crime and incidents": "Sucesos",
    "Multimedia features in special sections": "Reportajes multimedia en secciones especiales",
    "Craftsmanship, wood and rural tourism": "Artesanía, madera y turismo rural",
    "Active tourism and rural hospitality": "Turismo activo y hostelería rural",
    "Agri-food industry and craft beer": "Industria agroalimentaria y cerveza artesanal",
    "Mobile gastronomy and local zero-kilometre products": "Gastronomía ambulante y productos locales de kilómetro cero",
    "Agricultural innovation, biotechnology and luxury cosmetics": "Innovación agrícola, biotecnología y cosmética de lujo",
    "Pedigree livestock, fairs and national auctions": "Ganadería de pureza, ferias y subastas nacionales",
    "Family livestock farming and sector challenges": "Explotación ganadera familiar y desafíos sectoriales",
    "Agricultural research, cooperativism and rural abandonment": "Investigación agrícola, cooperativismo y abandono rural",
    "Mountain fair and traditional livestock farming": "Feria de montaña y ganadería tradicional",
    "Others": "Otros",
    "Economy and protest": "Economía y manifestación",
    "El Comercio / Interviews": "El Comercio / Entrevistas",
    "Elections": "Elecciones",
    "CSIC researcher": "Investigadora del CSIC",
    "El Comercio / Politics": "El Comercio / Política",
    "Just transition programme": "Programa de transición justa",
    "European Next Generation funds": "Fondos europeos Next Generation",
    "Municipal elections": "Elecciones municipales",
    "Rural depopulation": "Despoblación rural",
    "IU incident": "Incidente IU",
    "El Comercio / Society": "El Comercio / Sociedad",
    "Society": "Sociedad",
    "Health": "Salud",
    "Digital divide": "Brecha digital",
    "Entrepreneurship": "Emprendimiento",
    "El Comercio / Economy": "El Comercio / Economía",
    "Rural tourism": "Turismo rural",
    "Mining": "Minería",
    "Job insecurity": "Precariedad",
    "Livestock farming": "Ganadería",
    "El Comercio / Culture": "El Comercio / Cultura",
    "Heritage": "Patrimonio",
    "Rural popular culture": "Cultura popular rural",
    "Black ceramics": "Cerámica",
    "Literature": "Literatura",
    "El Comercio / Crime and incidents": "El Comercio / Sucesos",
    "Suicide": "Suicidio",
    "Police raid": "Redada",
    "Academic work": "Títulos, trabajos y",
    "and collaborations": "colaboraciones académicas",
    "Academic degrees": "Títulos académicos",
    "Digital Transformation - Change Agent - 2026": "Transformación Digital - Agente del Cambio - 2026",
    "Digital Transformation": "Transformación Digital",
    "Master in Political, Corporate and Public Affairs Communication": "Máster en Comunicación Política, Corporativa y Asuntos Públicos",
    "TFM - Communication strategy and analysis Auditorio Sony - 8.87": "TFM - Estrategia y análisis de comunicación Auditorio Sony - 8,87",
    "Master's newsletter collaboration": "Colaboración en la newsletter del máster",
    "Listen, reframe, lead: Nike's formula for dominating the agenda":
      "Escuchar, reencuadrar, liderar: la fórmula Nike para dominar la agenda",
    "Universidad Rey Juan Carlos - Audiovisual Communication": "Universidad Rey Juan Carlos - Comunicación Audiovisual",
    "Audiovisual Communication": "Comunicación Audiovisual",
    "Universidad Rey Juan Carlos - Journalism": "Universidad Rey Juan Carlos - Periodismo",
    "Journalism": "Periodismo",
    "subscribers": "suscriptores",
    "1.587 subscribers": "1.587 suscriptores",
    "Master in Web Development and Motion Graphics": "Máster en Desarrollo Web y Motion Graphics",
    "Degree in Audiovisual Communication - 2015": "Grado en Comunicación Audiovisual - 2015",
    "Final degree project: distinction (9.3/10)": "Trabajo TFG: Sobresaliente (9.3/10)",
    "Comparative analysis between a comic and its film adaptation. Case study: Persepolis.":
      "Análisis comparativo entre un cómic y su adaptación cinematográfica. Estudio de caso: Persepolis.",
    "Degree in Journalism - 2015": "Grado en Periodismo - 2015",
    "Film and TV Screenwriting course - 2013": "Curso en guion de Cine y TV - 2013",
    "El Comercio / Portadas": "El Comercio / Portadas",
    "Reportajes multimedia en secciones especiales": "Reportajes multimedia en secciones especiales",
    "El Comercio / Entrevistas": "El Comercio / Entrevistas",
    "El Comercio / Política": "El Comercio / Política",
    "El Comercio / Sucesos": "El Comercio / Sucesos",
    "Títulos académicos": "Títulos académicos",
    "Universidad Politécnica de Madrid": "Universidad Politécnica de Madrid",
    "The Graduate School of Political Management": "The Graduate School of Political Management",
    "Cambridge C1 Advanced": "Cambridge C1 Advanced",
    "Coordination of language exchanges between Dublin and Madrid.":
      "Coordinación de intercambios lingüísticos entre Dublín y Madrid.",
    "Early international education work connected to languages, mobility and cross-cultural communication.":
      "Primer trabajo internacional en educación, vinculado a idiomas, movilidad y comunicación intercultural.",
    "Corporate Communications Team Member — 2025": "Miembro del equipo de Corporate Communications — 2025",
    "Part of the Corporate Communications team during 2025, contributing to the planning, development, and execution of strategic communication plans. Supported corporate positioning, content coordination, stakeholder messaging, and campaign delivery.":
      "Parte del equipo de Corporate Communications durante 2025, contribuyendo a la planificación, desarrollo y ejecución de planes estratégicos de comunicación. Apoyo en posicionamiento corporativo, coordinación de contenidos, mensajes para stakeholders y ejecución de campañas.",
    "Weber Shandwick clients": "Clientes de Weber Shandwick",
    "Nespresso, Turkish Airlines, Synergym and Universidad Europea.":
      "Nespresso, Turkish Airlines, Synergym y Universidad Europea.",
    "Press Releases": "Notas de prensa",
    "Tier-1 content (CincoDías, La Vanguardia, La Razón, Europa Press).":
      "Contenido en medios tier-1 (CincoDías, La Vanguardia, La Razón, Europa Press).",
    "Op-eds": "Tribunas",
    "Opinion piece for El Economista on behalf of Nespresso's CEO.":
      "Tribuna para El Economista en nombre de la CEO de Nespresso.",
    "Co-organizations of events": "Coorganización de eventos",
    "for Turkish Airlines and Synergym.": "para Turkish Airlines y Synergym.",
    "School of Political Management experience.": "Experiencia en la School of Political Management.",
    "A specialised political-management programme that connected campaign strategy, public leadership, institutional communication and the practical logic of decision-making in Washington, D.C.":
      "Un programa especializado en gestión política que conectó estrategia de campaña, liderazgo público, comunicación institucional y la lógica práctica de la toma de decisiones en Washington, D.C.",
    "ONG Hilo Rojo | Trujillo, Peru": "ONG Hilo Rojo | Trujillo, Perú",
    "At HiloRojo, I shared my passion for communication as a bridge between people, cultures, and stories. Working in a diverse environment taught me to listen with care and communicate with purpose. It was a lesson in empathy, creativity, and human connection.":
      "En HiloRojo compartí mi pasión por la comunicación como puente entre personas, culturas e historias. Trabajar en un entorno diverso me enseñó a escuchar con cuidado y comunicar con propósito. Fue una lección de empatía, creatividad y conexión humana.",
    "For four months, I managed HiloRojo Perú’s Instagram and Facebook presence, engaging communities of 3,625 and 6.5K followers through original video content that I planned, filmed, edited, and post-produced.":
      "Durante cuatro meses gestioné la presencia de HiloRojo Perú en Instagram y Facebook, conectando con comunidades de 3.625 y 6,5K seguidores mediante contenido de vídeo original que planifiqué, grabé, edité y postproduje.",
    "La Voz del Trubia / Madrid-based correspondent for La Voz del Trubia":
      "La Voz del Trubia / Corresponsal en Madrid para La Voz del Trubia",
    "Madrid-based correspondent": "Corresponsal en Madrid",
    "Madrid-based correspondent for La Voz del Trubia, covering institutional affairs, public policy and regional development stories from the capital with a local-journalism lens.":
      "Corresponsal en Madrid para La Voz del Trubia, cubriendo asuntos institucionales, políticas públicas e historias de desarrollo regional desde la capital con mirada de periodismo local.",
    "Value": "Valor",
    "Selected field reporting, social-impact projects and pieces that explain the professional value behind the portfolio.":
      "Selección de reporterismo de campo, proyectos de impacto social y piezas que explican el valor profesional detrás del portfolio.",
    "A selection of field reporting, social-impact projects and editorial work where listening, context and human detail create professional value.":
      "Una selección de reporterismo de campo, proyectos de impacto social y trabajo editorial donde la escucha, el contexto y el detalle humano generan valor profesional.",
    "Growth": "Crecimiento",
    "Academic progression, master's degrees, international programmes and design/web development training.":
      "Progresión académica, másteres, programas internacionales y formación en diseño/desarrollo web.",
    "A learning path shaped by journalism, audiovisual storytelling, public affairs, design, web development and international training.":
      "Una trayectoria de aprendizaje marcada por el periodismo, la narración audiovisual, los asuntos públicos, el diseño, el desarrollo web y la formación internacional.",
    "Reputation": "Reputación",
    "Corporate communication, public affairs, media relations and strategic content work.":
      "Comunicación corporativa, asuntos públicos, relaciones con medios y contenido estratégico.",
    "Work focused on reputation, media relations, message discipline and strategic content for brands, institutions and public-facing organisations.":
      "Trabajo centrado en reputación, relación con medios, disciplina de mensaje y contenido estratégico para marcas, instituciones y organizaciones con exposición pública.",
    "Diversity": "Diversidad",
    "International experience across Spanish, French and English-speaking environments.":
      "Experiencia internacional en entornos de habla española, francesa e inglesa.",
    "Experience built across Spain, France, Ireland, Peru, Ecuador, Portugal and the United States, moving between languages, cultures and professional contexts.":
      "Experiencia construida en España, Francia, Irlanda, Perú, Ecuador, Portugal y Estados Unidos, moviéndome entre idiomas, culturas y contextos profesionales.",
    "Share": "Compartir",
    "Published journalism, audiovisual pieces, interviews and public-facing storytelling.":
      "Periodismo publicado, piezas audiovisuales, entrevistas y narrativas orientadas al público.",
    "Public-facing work across local journalism, multimedia reporting, interviews, audiovisual pieces and editorial projects designed to reach real audiences.":
      "Trabajo orientado al público en periodismo local, reportajes multimedia, entrevistas, piezas audiovisuales y proyectos editoriales pensados para llegar a audiencias reales.",
    "Ambition": "Ambición",
    "Projects that connect journalism, strategic communication, public affairs and visual storytelling.":
      "Proyectos que conectan periodismo, comunicación estratégica, asuntos públicos y storytelling visual.",
    "Projects where journalism, strategic communication, public affairs, design and visual storytelling meet in a single professional profile.":
      "Proyectos donde periodismo, comunicación estratégica, asuntos públicos, diseño y storytelling visual se encuentran en un mismo perfil profesional.",
    "Dispute": "Debate",
    "Work around public debate, political communication, institutional environments and social listening.":
      "Trabajo en torno al debate público, la comunicación política, entornos institucionales y escucha social.",
    "Experience reading public debate, mapping stakeholders, following political contexts and translating complex issues into clear communication.":
      "Experiencia leyendo el debate público, mapeando stakeholders, siguiendo contextos políticos y traduciendo asuntos complejos en comunicación clara.",
    "Critical": "Crítico",
    "Research, essays, screenwriting, editorial thinking and reflective academic work.":
      "Investigación, ensayos, guion, pensamiento editorial y trabajo académico reflexivo.",
    "Research, essays, scripts and editorial thinking that connect analytical rigour with narrative craft and cultural interpretation.":
      "Investigación, ensayos, guiones y pensamiento editorial que conectan rigor analítico, oficio narrativo e interpretación cultural.",
    "Journalism work": "Trabajo periodístico",
    "El Comercio, La Voz del Trubia and cultural media work.":
      "El Comercio, La Voz del Trubia y trabajo en medios culturales.",
    "Interviews, field reporting, video, opinion, culture, local politics and feature writing across regional and cultural media.":
      "Entrevistas, reporterismo de campo, vídeo, opinión, cultura, política local y reportajes en medios regionales y culturales.",
    "Third sector and education": "Tercer sector y educación",
    "Hilo Rojo, Cultur'All Studio, Centre Social La Busette, UFCV and education projects.":
      "Hilo Rojo, Cultur'All Studio, Centre Social La Busette, UFCV y proyectos educativos.",
    "Community work, youth projects, educational coordination and audiovisual storytelling developed in France and Latin America.":
      "Trabajo comunitario, proyectos juveniles, coordinación educativa y storytelling audiovisual desarrollados en Francia y América Latina.",
    "Corporate communication and public affairs": "Comunicación corporativa y asuntos públicos",
    "Weber Shandwick, Universidad de Navarra and George Washington University.":
      "Weber Shandwick, Universidad de Navarra y George Washington University.",
    "Strategic communication experience spanning media angles, reputation work, research, institutional narratives and public-affairs thinking.":
      "Experiencia en comunicación estratégica: enfoques para medios, reputación, investigación, narrativas institucionales y pensamiento de asuntos públicos.",
    "Academic titles": "Títulos académicos",
    "Journalism and Audiovisual Communication, screenwriting, BPJEPS, design/web development and two master's tracks.":
      "Periodismo y Comunicación Audiovisual, guion, BPJEPS, diseño/desarrollo web y dos itinerarios de máster.",
    "A structured view of my formal academic path, from journalism and audiovisual communication to screenwriting, BPJEPS, design, web development and public affairs.":
      "Una vista estructurada de mi recorrido académico formal, desde periodismo y comunicación audiovisual hasta guion, BPJEPS, diseño, desarrollo web y asuntos públicos.",
    "Academic works": "Trabajos académicos",
    "A curated library of research, papers, presentations, essays and selected projects connected to journalism, strategy, design and public affairs.":
      "Una biblioteca curada de investigación, trabajos, presentaciones, ensayos y proyectos seleccionados vinculados con periodismo, estrategia, diseño y asuntos públicos.",
    "Recommended filters: Public Affairs, Journalism, Strategy, Design, Screenwriting and AI tools.":
      "Filtros recomendados: asuntos públicos, periodismo, estrategia, diseño, guion y herramientas de IA.",
    "Skills and tools": "Competencias y herramientas",
    "Digital, analytics, content, design, video and AI tools can be linked to real evidence inside the portfolio.":
      "Herramientas digitales, analíticas, de contenido, diseño, vídeo e IA pueden vincularse a evidencias reales dentro del portfolio.",
  },
};

const dateLabelTranslations = {
  es: {
    "Jun 2026 / present": "Jun 2026 / actualidad",
    "Jan - May 2026": "Ene - May 2026",
    "Jan - Mar 2025": "Ene - Mar 2025",
    "Apr - Nov 2025": "Abr - Nov 2025",
    "Sep 2024 - Jun 2025": "Sep 2024 - Jun 2025",
    "Sep 2021 - Dec 2023": "Sep 2021 - Dic 2023",
    "Sep 2020 - Jun 2021": "Sep 2020 - Jun 2021",
    "Sep 2018 - Dec 2019": "Sep 2018 - Dic 2019",
    "Sep 2016 - Aug 2018": "Sep 2016 - Ago 2018",
    "Sep 2015 - Aug 2016": "Sep 2015 - Ago 2016",
    "Sep 2015 - Jun 2016": "Sep 2015 - Jun 2016",
    "Sep 2013 - Jun 2014": "Sep 2013 - Jun 2014",
    "Jul 2011 - Jul 2012": "Jul 2011 - Jul 2012",
    "Sep 2010 - Jun 2015": "Sep 2010 - Jun 2015",
  },
};

let currentLanguage = localStorage.getItem("portfolio-language") === "es" ? "es" : "en";
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
let activePanelKey = null;

function preserveSpacingTranslation(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function getOriginalAttribute(element, attribute) {
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = {};
    originalAttributes.set(element, attributes);
  }

  if (!(attribute in attributes)) {
    attributes[attribute] = element.getAttribute(attribute);
  }

  return attributes[attribute];
}

function translateTextValue(value, language = currentLanguage) {
  if (language === "en") {
    return value;
  }

  const translations = textTranslations[language] || {};
  if (translations[value]) {
    return translations[value];
  }

  const numberedLabel = value.match(/^(\d+\s*\/\s*)(.+)$/);
  if (numberedLabel && translations[numberedLabel[2]]) {
    return `${numberedLabel[1]}${translations[numberedLabel[2]]}`;
  }

  const datedLabel = value.match(/^(\d{4}\s*\/\s*)(.+)$/);
  if (datedLabel && translations[datedLabel[2]]) {
    return `${datedLabel[1]}${translations[datedLabel[2]]}`;
  }

  return value;
}

function localizeText(value) {
  return translateTextValue(String(value ?? ""), currentLanguage);
}

function escapeLocalized(value) {
  return escapeHtml(localizeText(value));
}

function applyLanguage(language = currentLanguage, root = document.body) {
  currentLanguage = language === "es" ? "es" : "en";
  document.documentElement.lang = currentLanguage;
  localStorage.setItem("portfolio-language", currentLanguage);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalTextNodes.has(node)) {
        originalTextNodes.set(node, node.nodeValue);
      }
      const original = originalTextNodes.get(node);
      const translated = translateTextValue(original.trim(), currentLanguage);
      node.nodeValue = preserveSpacingTranslation(original, translated);
    }

    root.querySelectorAll?.("[aria-label]").forEach((element) => {
      if (element.hasAttribute("aria-label")) {
        const original = getOriginalAttribute(element, "aria-label");
        element.setAttribute("aria-label", translateTextValue(original, currentLanguage));
      }
    });
  }

  const pageTitle = document.querySelector("title");
  if (pageTitle) {
    const original = pageTitle.dataset.originalTitle || pageTitle.textContent;
    pageTitle.dataset.originalTitle = original;
    pageTitle.textContent = translateTextValue(original, currentLanguage);
  }

  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription) {
    const original = getOriginalAttribute(metaDescription, "content");
    metaDescription.setAttribute("content", translateTextValue(original, currentLanguage));
  }

  document.querySelectorAll("[data-date-label]").forEach((station) => {
    if (!station.dataset.originalDateLabel) {
      station.dataset.originalDateLabel = station.dataset.dateLabel;
    }
    const original = station.dataset.originalDateLabel;
    station.dataset.dateLabel = currentLanguage === "es" ? dateLabelTranslations.es[original] || original : original;
  });

  if (typeof updateActiveStation === "function") {
    updateActiveStation();
  }
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const heroTicker = document.querySelector(".hero-ticker");
const tickerTrack = document.querySelector(".ticker-track");
const tickerGroup = document.querySelector(".ticker-group");

let tickerStartX = 0;
let tickerOffset = 0;
let tickerStartOffset = 0;
let tickerIsDragging = false;

function getTickerLoopWidth() {
  return tickerGroup?.getBoundingClientRect().width || 0;
}

function normalizeTickerOffset(offset) {
  const loopWidth = getTickerLoopWidth();

  if (!loopWidth) {
    return offset;
  }

  return ((offset % loopWidth) + loopWidth) % loopWidth - loopWidth;
}

function applyTickerOffset(offset) {
  tickerOffset = normalizeTickerOffset(offset);
  tickerTrack.style.transform = `translate3d(${tickerOffset}px, 0, 0)`;
}

function syncTickerOffsetFromAnimation() {
  if (!tickerTrack) {
    return;
  }

  const computedTransform = window.getComputedStyle(tickerTrack).transform;
  const matrix = computedTransform === "none" ? new DOMMatrixReadOnly() : new DOMMatrixReadOnly(computedTransform);
  tickerOffset = matrix.m41 || 0;
  applyTickerOffset(tickerOffset);
}

function isPointerInsideTicker(event) {
  if (!heroTicker) {
    return false;
  }

  const bounds = heroTicker.getBoundingClientRect();

  return (
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right &&
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom
  );
}

function releaseTickerControl() {
  if (tickerIsDragging || !heroTicker || !tickerTrack) {
    return;
  }

  heroTicker.classList.remove("is-paused", "is-manual");
  tickerTrack.style.removeProperty("transform");
}

function pauseTickerControl() {
  if (!heroTicker || !tickerTrack || heroTicker.classList.contains("is-paused")) {
    return;
  }

  syncTickerOffsetFromAnimation();
  heroTicker.classList.add("is-paused");
}

function startTickerDrag(event) {
  event.preventDefault();
  tickerIsDragging = true;
  tickerStartX = event.clientX;
  syncTickerOffsetFromAnimation();
  tickerStartOffset = tickerOffset;
  heroTicker.classList.add("is-dragging", "is-manual", "is-paused");
}

if (heroTicker && tickerTrack) {
  heroTicker.addEventListener("pointerenter", () => {
    pauseTickerControl();
  });

  heroTicker.addEventListener("pointerleave", () => {
    releaseTickerControl();
  });

  heroTicker.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      if (!heroTicker.classList.contains("is-manual")) {
        syncTickerOffsetFromAnimation();
      }

      const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      heroTicker.classList.add("is-manual");
      applyTickerOffset(tickerOffset - wheelDelta * 0.55);
    },
    { passive: false },
  );

  document.addEventListener("pointerdown", (event) => {
    if (isPointerInsideTicker(event)) {
      startTickerDrag(event);
    }
  });

  document.addEventListener("pointermove", (event) => {
    if (!tickerIsDragging && isPointerInsideTicker(event)) {
      pauseTickerControl();
      return;
    }

    if (!tickerIsDragging && heroTicker.classList.contains("is-paused") && !isPointerInsideTicker(event)) {
      releaseTickerControl();
      return;
    }

    if (!tickerIsDragging) {
      return;
    }

    event.preventDefault();
    applyTickerOffset(tickerStartOffset + (event.clientX - tickerStartX) * 0.82);
  });

  document.addEventListener("pointerup", (event) => {
    if (!tickerIsDragging) {
      return;
    }

    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");

    if (!isPointerInsideTicker(event)) {
      releaseTickerControl();
    }
  });

  document.addEventListener("pointercancel", () => {
    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");
    releaseTickerControl();
  });

  heroTicker.addEventListener("mouseleave", () => {
    releaseTickerControl();
  });
}

const universe = document.querySelector(".career-universe");
const track = document.querySelector("#career-track");
const calendarRuler = document.querySelector(".calendar-ruler");
const currentYearElement = document.querySelector(".timeline-current-year");
const timelineVideoBackground = document.querySelector(".timeline-video-background");
const stations = Array.from(document.querySelectorAll(".timeline-station"));
const heroCopy = document.querySelector(".timeline-station--hero .intro-station-copy");
const timelineStations = stations.filter(
  (station) =>
    !station.classList.contains("timeline-station--hero") &&
    !station.classList.contains("timeline-station--map") &&
    !station.classList.contains("timeline-station--archive"),
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const horizontalMedia = window.matchMedia("(min-width: 761px)");
const mobileMapMedia = window.matchMedia("(max-width: 760px)");

if (timelineVideoBackground) {
  timelineVideoBackground.play().catch(() => {});
}

document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash || hash === "#") {
      return;
    }

    event.preventDefault();
    history.pushState(null, "", hash);
    scrollToPortfolioSection(hash);
  });
});

function updateWorldMapViewport() {
  const svgElement = document.querySelector(".portfolio-world-map");

  if (!svgElement) {
    return;
  }

  svgElement.setAttribute("viewBox", mobileMapMedia.matches ? "138 82 410 236" : "0 0 960 520");
  svgElement.setAttribute("preserveAspectRatio", mobileMapMedia.matches ? "xMidYMid meet" : "xMidYMid meet");
}

let targetX = 0;
let currentX = 0;
let ticking = false;
let maxTranslate = 0;
let maxRulerTranslate = 0;
let timelineStartX = 0;
let timelineEndX = 0;

function isHorizontalEnabled() {
  return Boolean(universe && track && horizontalMedia.matches && !reducedMotion.matches);
}

function setUniverseHeight() {
  if (!universe || !track) {
    return;
  }

  if (!isHorizontalEnabled()) {
    universe.style.removeProperty("height");
    universe.style.removeProperty("min-height");
    track.style.transform = "none";
    heroCopy?.style.removeProperty("--hero-copy-scan");
    if (calendarRuler) {
      calendarRuler.style.transform = "none";
    }
    universe.classList.remove("is-ruler-active");
    if (currentYearElement) {
      currentYearElement.textContent = "2026";
    }
    return;
  }

  maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);

  const firstTimelineStation = timelineStations.find((station) => station.dataset.dateLabel) ?? timelineStations.at(0);
  const lastTimelineStation =
    timelineStations.find((station) => station.dataset.panel === "urjc") ??
    [...timelineStations].reverse().find((station) => station.dataset.dateLabel) ??
    timelineStations.at(-1);
  timelineStartX = firstTimelineStation
    ? Math.min(
        maxTranslate,
        Math.max(0, firstTimelineStation.offsetLeft - window.innerWidth * 0.55),
      )
    : 0;
  timelineEndX = lastTimelineStation
    ? Math.min(
        maxTranslate,
        Math.max(timelineStartX + 1, lastTimelineStation.offsetLeft + lastTimelineStation.offsetWidth - window.innerWidth * 0.35),
      )
    : maxTranslate;

  const firstYearBlock = calendarRuler?.querySelector(".year-block");
  maxRulerTranslate = firstYearBlock ? firstYearBlock.offsetWidth * 16 : 0;
  universe.style.height = `${maxTranslate + window.innerHeight}px`;
}

function getHorizontalTargetScroll(element) {
  if (!element || !universe || !track) {
    return window.scrollY;
  }

  if (element.id === "work-timeline") {
    return universe.offsetTop + timelineStartX;
  }

  const targetOffset = Math.min(
    maxTranslate,
    Math.max(0, element.offsetLeft - window.innerWidth * 0.08),
  );
  return universe.offsetTop + targetOffset;
}

function scrollToPortfolioSection(hash) {
  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  if (!isHorizontalEnabled() || !target.closest(".career-universe")) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  setUniverseHeight();
  const top = getHorizontalTargetScroll(target);
  window.scrollTo({ top, behavior: "smooth" });
}

function updateActiveStation() {
  const center = window.innerWidth * 0.34;
  let closest = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  const dateStations = timelineStations.filter((station) => station.dataset.dateLabel);

  dateStations.forEach((station) => {
    const rect = station.getBoundingClientRect();
    const stationCenter = rect.left + rect.width / 2;
    const distance = Math.abs(center - stationCenter);

    if (distance < closestDistance) {
      closest = station;
      closestDistance = distance;
    }
  });

  stations.forEach((station) => {
    station.classList.toggle("is-active", station === closest);
  });

  if (currentYearElement && closest?.dataset.dateLabel) {
    currentYearElement.textContent = closest.dataset.dateLabel;
  }
}

function updateHorizontalScroll() {
  if (!isHorizontalEnabled()) {
    ticking = false;
    return;
  }

  const rect = universe.getBoundingClientRect();
  const scrollable = Math.max(1, universe.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

  targetX = -maxTranslate * progress;
  currentX += (targetX - currentX) * 0.16;
  track.style.transform = `translate3d(${currentX}px, 0, 0)`;

  const scrollX = maxTranslate * progress;
  const heroCopyScan = Math.min(1, Math.max(0, scrollX / Math.max(1, window.innerWidth * 0.42)));
  heroCopy?.style.setProperty("--hero-copy-scan", heroCopyScan.toFixed(4));
  const timelineProgress = Math.min(
    1,
    Math.max(0, (scrollX - timelineStartX) / Math.max(1, timelineEndX - timelineStartX)),
  );
  universe.classList.toggle("is-ruler-active", scrollX >= timelineStartX - 1);

  if (calendarRuler) {
    calendarRuler.style.transform = `translate3d(${-maxRulerTranslate * timelineProgress}px, 0, 0)`;
  }

  updateActiveStation();

  if (timelineProgress > 0.9) {
    const finalStation = timelineStations.find((station) => station.dataset.panel === "urjc");
    if (finalStation) {
      stations.forEach((station) => {
        station.classList.toggle("is-active", station === finalStation);
      });
      if (currentYearElement) {
        currentYearElement.textContent = finalStation.dataset.dateLabel || "Sep 2010 - Jun 2015";
      }
    }
  }

  if (Math.abs(targetX - currentX) > 0.5) {
    window.requestAnimationFrame(updateHorizontalScroll);
  } else {
    ticking = false;
  }
}

function requestScrollUpdate() {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(updateHorizontalScroll);
  }
}

setUniverseHeight();
requestScrollUpdate();

if (window.location.hash && document.querySelector(window.location.hash)) {
  window.requestAnimationFrame(() => {
    scrollToPortfolioSection(window.location.hash);
  });
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  currentX = 0;
  targetX = 0;
  setUniverseHeight();
  requestScrollUpdate();
});

horizontalMedia.addEventListener("change", () => {
  setUniverseHeight();
  requestScrollUpdate();
});

reducedMotion.addEventListener("change", () => {
  setUniverseHeight();
  requestScrollUpdate();
});

function renderStaticWorldMap() {
  const svgElement = document.querySelector(".portfolio-world-map");
  const mapSection = document.querySelector(".timeline-station--map");

  if (!svgElement || !window.d3 || !window.topojson) {
    return;
  }

  updateWorldMapViewport();

  window.d3
    .json("assets/data/countries-110m.json")
    .then((world) => {
      const svg = window.d3.select(svgElement);
      const highlightedCountryColors = new Map([
        ["840", "#227C9D"], // United States
        ["218", "#E3C0D3"], // Ecuador
        ["604", "#731963"], // Peru
        ["724", "#C7EFCF"], // Spain
        ["620", "#FFF7AE"], // Portugal
        ["372", "#FF9B42"], // Ireland
        ["208", "#FFC600"], // Denmark
        ["056", "#904C77"], // Belgium
      ]);
      const projection = window.d3.geoNaturalEarth1().fitExtent(
        [
          [4, 30],
          [956, 534],
        ],
        { type: "Sphere" },
      );
      const path = window.d3.geoPath(projection);
      const countries = window.topojson.feature(world, world.objects.countries).features;
      const borders = window.topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
      const france = countries.find((country) => String(country.id).padStart(3, "0") === "250");
      const mainlandFrance = france
        ? {
            ...france,
            geometry: {
              type: "MultiPolygon",
              coordinates: france.geometry.coordinates.filter((polygon) => {
                const [longitude, latitude] = window.d3.geoCentroid({ type: "Polygon", coordinates: polygon });
                return longitude > -6 && longitude < 10 && latitude > 41 && latitude < 52;
              }),
            },
          }
        : null;

      svg.select(".static-world-layer").selectAll("*").remove();
      const layer = svg.select(".static-world-layer");

      layer
        .selectAll("path.static-world-country")
        .data(countries)
        .join("path")
        .attr("class", (country) => {
          const id = String(country.id).padStart(3, "0");
          if (id === "840") {
            return "static-world-country is-us-country";
          }

          if (id === "218") {
            return "static-world-country is-ecuador-country";
          }

          if (id === "604") {
            return "static-world-country is-peru-country";
          }

          if (id === "620") {
            return "static-world-country is-portugal-country";
          }

          if (id === "724") {
            return "static-world-country is-spain-country";
          }

          if (id === "372") {
            return "static-world-country is-ireland-country";
          }

          if (id === "056") {
            return "static-world-country is-belgium-country";
          }

          if (id === "208") {
            return "static-world-country is-denmark-country";
          }

          return "static-world-country";
        })
        .attr("tabindex", (country) => {
          const id = String(country.id).padStart(3, "0");
          return id === "840" || id === "218" || id === "604" || id === "620" || id === "724" || id === "372" || id === "056" || id === "208" ? "0" : null;
        })
        .attr("aria-label", (country) => {
          const id = String(country.id).padStart(3, "0");

          if (id === "840") {
            return "United States education callout";
          }

          if (id === "218") {
            return "Ecuador community volunteering callout";
          }

          if (id === "604") {
            return "Peru Hilo Rojo volunteer callout";
          }

          if (id === "620") {
            return "Portugal sociocultural project callout";
          }

          if (id === "724") {
            return "Spain professional and academic callout";
          }

          if (id === "372") {
            return "Ireland linguistic exchange callout";
          }

          if (id === "056") {
            return "Belgium Engaging Europe callout";
          }

          if (id === "208") {
            return "Denmark Erasmus exchange callout";
          }

          return null;
        })
        .attr("d", path)
        .style("fill", (country) => highlightedCountryColors.get(String(country.id).padStart(3, "0")) || null);

      const usCountry = svg.select(".is-us-country");
      const ecuadorCountry = svg.select(".is-ecuador-country");
      const peruCountry = svg.select(".is-peru-country");
      const portugalCountry = svg.select(".is-portugal-country");
      const spainCountry = svg.select(".is-spain-country");
      const mapCalloutNames = ["us", "ecuador", "peru", "portugal", "spain", "france", "ireland", "belgium", "denmark"];
      const getMapCalloutClass = (name) => `is-${name}-callout-open`;
      const closeMapCallouts = () => {
        mapCalloutNames.forEach((name) => mapSection?.classList.remove(getMapCalloutClass(name)));
      };
      const openMapCallout = (name, { toggle = false } = {}) => {
        if (!mapSection) {
          return;
        }

        const className = getMapCalloutClass(name);
        const wasOpen = mapSection.classList.contains(className);
        closeMapCallouts();
        if (!toggle || !wasOpen) {
          mapSection.classList.add(className);
        }
      };

      function bindMapCalloutTargets() {
        if (!mapSection) {
          return;
        }

        svg.selectAll("[data-map-callout]")
          .attr("tabindex", "0")
          .on("mouseenter focus", (event) => {
            const name = event.currentTarget.dataset.mapCallout;
            openMapCallout(name);
          })
          .on("mouseleave blur", (event) => {
            const name = event.currentTarget.dataset.mapCallout;
            mapSection.classList.remove(`is-${name}-callout-open`);
          })
          .on("click touchstart", (event) => {
            event.preventDefault();
            const name = event.currentTarget.dataset.mapCallout;
            openMapCallout(name, { toggle: true });
          });
      }

      if (mapSection && !usCountry.empty()) {
        usCountry
          .on("mouseenter focus", () => openMapCallout("us"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-us-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            openMapCallout("us", { toggle: true });
          });
      }

      if (mapSection && !ecuadorCountry.empty()) {
        ecuadorCountry
          .on("mouseenter focus", () => openMapCallout("ecuador"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-ecuador-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            openMapCallout("ecuador", { toggle: true });
          });
      }

      if (mapSection && !peruCountry.empty()) {
        peruCountry
          .on("mouseenter focus", () => openMapCallout("peru"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-peru-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            openMapCallout("peru", { toggle: true });
          });
      }

      if (mapSection && !portugalCountry.empty()) {
        portugalCountry
          .on("mouseenter focus", () => openMapCallout("portugal"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-portugal-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            openMapCallout("portugal", { toggle: true });
          });
      }

      if (mapSection && !spainCountry.empty()) {
        spainCountry
          .on("mouseenter focus", () => openMapCallout("spain"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-spain-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            openMapCallout("spain", { toggle: true });
          });
      }

      bindMapCalloutTargets();

      if (mainlandFrance?.geometry.coordinates.length) {
        const franceCountry = layer
          .append("path")
          .datum(mainlandFrance)
          .attr("class", "static-world-country is-france-country")
          .attr("tabindex", "0")
          .attr("aria-label", "France professional experience callout")
          .attr("d", path)
          .style("fill", "#BA1200");

        if (mapSection) {
          franceCountry
            .on("mouseenter focus", () => openMapCallout("france"))
            .on("mouseleave blur", () => mapSection.classList.remove("is-france-callout-open"))
            .on("click touchstart", (event) => {
              event.preventDefault();
              openMapCallout("france", { toggle: true });
            });
        }
      }

      layer.append("path").datum(borders).attr("class", "static-world-border").attr("d", path);
    })
    .catch(() => {});
}

renderStaticWorldMap();
mobileMapMedia.addEventListener("change", updateWorldMapViewport);
const panelContent = {
  urjc: {
    kicker: "01-09-2010 / 30-06-2015",
    title: "Journalism and Audiovisual Communication",
    body: [
      "Academic starting point for the timeline: reporting, audiovisual language, scripts and public storytelling.",
      "This academic stage built the reporting discipline, audiovisual language and critical framework behind my subsequent work in journalism, communication and public storytelling.",
    ],
  },
  screenwriting: {
    kicker: "15-09-2013 / 15-06-2014",
    title: "La Factoría del Guion",
    body: [
      "Film and TV screenwriting training.",
      "The programme strengthened my command of dramatic structure, character development, dialogue and audiovisual storytelling for fiction and factual narratives.",
    ],
  },
  brumaria: {
    kicker: "30-09-2018 / 21-12-2019",
    title: "Editorial Brumaria",
    type: "photoMosaic",
    mosaicTheme: "brumaria",
    mosaicLabel: "Editorial Brumaria visual archive",
    mainLabel: "Publishing / Cultural production",
    intro:
      "During 16 months at Editorial Brumaria, I supported the publisher's digital transition, helping launch its website and e-commerce platform while assisting communications, editorial production and cultural programming. I worked across the full publishing cycle: author relations in English and French, copy-editing, layout support, print coordination, magazine content and book launches across several collections.",
    socialTitle: "Digital Content Producer",
    socialIntro:
      "I also contributed to digital content creation, combining graphic design skills, editorial editing and sharp social media copywriting to strengthen Brumaria's online voice, visual identity and audience engagement.",
    images: [
      {
        src: "assets/images/brumaria/brumaria-books-large.png",
        alt: "Brumaria books from visual and critical collections",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/ficciones-patogenas.png",
        alt: "Ficciones patógenas book cover by Duen Sacchi",
        variant: "tall",
      },
      {
        src: "assets/images/brumaria/otras-protagonistas-poster.png",
        alt: "Poster for Las otras protagonistas de la transición",
        variant: "tall",
      },
      {
        src: "assets/images/brumaria/arte-transicion-open-book.png",
        alt: "Open book render for Arte y transición",
        variant: "wide",
      },
      {
        src: "assets/images/brumaria/poeticas-oposicion.png",
        alt: "Poéticas de la oposición event poster",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/laura-kait.png",
        alt: "Brumaria and Laura Kait author graphic",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/duchamp-badiou.png",
        alt: "Alain Badiou book cover about Marcel Duchamp",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/speakers-corner.png",
        alt: "Speakers Corner event graphic with Nino de Elche and Dario Corbeira",
        variant: "feature wide",
      },
      {
        src: "assets/images/brumaria/joelle-mesnil.png",
        alt: "Brumaria and Joelle Mesnil author graphic",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/brumaria-ecommerce.png",
        alt: "Brumaria e-commerce platform preview on a tablet",
        variant: "wide",
      },
      {
        src: "assets/images/brumaria/transparente-opacidad.png",
        alt: "Transparente opacidad book render by Jaime Vindel",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/dario-corbeira.png",
        alt: "Brumaria and Dario Corbeira editorial graphic",
        variant: "feature",
      },
      {
        src: "assets/images/brumaria/facebook-profile.png",
        alt: "Brumaria Facebook profile screenshot",
        variant: "wide social",
      },
      {
        src: "assets/images/brumaria/instagram-profile.png",
        alt: "Brumaria Instagram profile screenshot",
        variant: "wide social",
      },
    ],
  },
  ministry: {
    kicker: "01-09-2015 / 30-06-2016",
    title: "French Ministry of Education / CEMEA",
    intro:
      "I received a French Ministry of Education scholarship to complete a 12-month BPJEPS programme at CEMEA. The training combined full-time theoretical classes with the design and implementation of a socio-cultural project across Lille's municipal social-centre network: an inclusion and gender-equality programme built around 14 workshops and public events, subsequently documented in a formal report for the Ministry.",
    bullets: [
      "Designed the inclusion and gender-equality project from concept to implementation.",
      "Coordinated institutional communication with the French Ministry of Education and Lille City Council.",
      "Planned and managed 14 workshops and public events across Lille's social-centre network.",
      "Worked with centre directors, local teams and municipal stakeholders to deliver the programme.",
      "Presented the project and final report, successfully completing the BPJEPS assessment.",
    ],
  },
  culturall: {
    kicker: "01-09-2016 / 30-08-2018",
    title: "CULTUR'ALL Studio",
    type: "videoCarousel",
    intro: "A curated selection of audiovisual work produced during my time with Cultur'all Studio in Lille, spanning festivals, music videos, and campaign spots for cultural and institutional clients across Northern France.",
    projects: [
      {
        heading: "Projet audiovisuel - Festival au Flow - Hip-Hop Dance",
        videos: [
          { label: "01 / Au Flow", title: "Festival au Flow", videoId: "hzGSc3bGglA" },
          { label: "02 / Au Flow", title: "Scene hip-hop", url: "https://www.youtube.com/watch?v=ZwNynPC0uak" },
          { label: "03 / Au Flow", title: "Performance danse", url: "https://www.youtube.com/watch?v=ipLX0uPDGlk&feature=youtu.be" },
          { label: "04 / Au Flow", title: "Culture urbaine", url: "https://www.youtube.com/watch?v=APUnUTpMarU" },
          { label: "05 / Au Flow", title: "Battle hip-hop", videoId: "3c_8DHsp6rY" },
          { label: "06 / Au Flow", title: "Danse au Flow", url: "https://www.youtube.com/watch?v=Lg5R3KBOKX8" },
          { label: "07 / Au Flow", title: "Backstage festival", url: "https://youtube.com/watch?v=b703NU2cmbQ&feature=youtu.be" },
          { label: "08 / Au Flow", title: "Lille dancefloor", url: "https://www.youtube.com/watch?v=LMixjkyF2zY" },
        ],
      },
      {
        heading: "Projet audiovisuel - Festival MFW / Culture Ray",
        videos: [
          { label: "01 / Culture Ray", title: "MFW Culture Ray", videoId: "DnRP51uEQQg" },
          {
            label: "02 / Interview",
            title: "Esraa Warda Dance at CULTUR'RAI Lille France",
            url: "https://www.youtube.com/watch?v=LjqwkHKgmzo&feature=youtu.be",
          },
        ],
      },
      {
        heading: "Projet audiovisuel - Campagne municipale a Villeneuve-d'Ascq",
        videos: [{ label: "01 / Villeneuve", title: "Campagne municipale", videoId: "rk-WD544VvU" }],
      },
      {
        heading: "Projet audiovisuel - Groupes metal des Hauts-de-France",
        videos: [
          { label: "01 / Metal", title: "Metal Hauts-de-France", videoId: "cm-nNhQwZM4" },
          { label: "02 / Metal", title: "Scene rock locale", videoId: "05i6xgsMzkU" },
          { label: "03 / Metal", title: "Live metal", videoId: "QbFe6fum5Xk" },
          { label: "04 / Metal", title: "Guitares en Scène", videoId: "bygewmemA7A" },
          { label: "05 / Metal", title: "Portrait rock", videoId: "nNC5wHX-X5o" },
        ],
      },
      {
        heading: "Projet audiovisuel - Manu Le Coq, rappeur lillois",
        videos: [
          { label: "01 / Manu Le Coq", title: "Portrait Manu Le Coq", videoId: "6SxTMYKzgmo" },
          { label: "02 / Manu Le Coq", title: "Session rap lilloise", videoId: "kY6Es4Nq9FY" },
          { label: "03 / Manu Le Coq", title: "Studio avec Manu", videoId: "hSKRHM0nhbU" },
          { label: "04 / Manu Le Coq", title: "Clip rap", videoId: "22PmUYxJc-0" },
          { label: "05 / Manu Le Coq", title: "Voix de Lille", videoId: "hquPNy9uMOI" },
        ],
      },
    ],
  },
  busette: {
    kicker: "01-09-2015 / 30-08-2016",
    title: "Centre Social La Busette",
    intro:
      "Centre Social La Busette was the operational base for my BPJEPS project in Lille. From there, and with the support of its management team, I designed, tested and coordinated the first workshops of an inclusion and gender-equality programme before expanding it to other municipal social centres. The centre director acted as my project tutor throughout the process.",
    bullets: [
      "Used La Busette as the headquarters for project planning, coordination and follow-up.",
      "Designed the first workshop formats with the centre's management and community teams.",
      "Coordinated schedules, spaces, participants and support teams for local activities.",
      "Adapted the project model before transferring workshops to other social centres in Lille.",
      "Worked under the supervision of the centre director, who served as project tutor.",
    ],
  },
  trazos: {
    kicker: "01-09-2020 / 30-06-2021",
    title: "Graphic Design and Web Development",
    intro:
      "After two years producing audiovisual content in Lille for cultural centres, Lille City Council and music festivals, plus one year at Editorial Brumaria supporting editorial projects in Madrid, I joined Trazos to professionalise that practical background. The programme strengthened my command of graphic design, motion graphics and digital production through Adobe workflows, visual identity, editorial design, advertising, animation and front-end foundations.",
    bullets: [
      "Professionalised my audiovisual background through graphic design, branding, editorial design and advertising practice.",
      "Worked with Adobe Illustrator, Photoshop, InDesign, After Effects and Premiere for visual and motion production.",
      "Built motion-graphics skills around rhythm, composition, keyframes, effects, video editing and animated storytelling.",
      "Connected design training with web-oriented production, strengthening HTML, CSS, JavaScript and digital storytelling foundations.",
    ],
  },
  comercio: {
    kicker: "01-09-2021 / 15-12-2023",
    title: "El Comercio / Front pages",
    type: "reader",
    chapters: [
      {
        title: "El Comercio / Front pages",
        items: [
          {
            label: "01 / Wildfires",
            src: "assets/images/el-comercio/portadas/01-portada-incendios.jpg",
            alt: "El Comercio front page about wildfires in Asturias",
          },
          {
            label: "01 / Wildfires",
            src: "assets/images/el-comercio/portadas/02-articulo-incendios.jpg",
            alt: "El Comercio article about beekeepers affected by wildfires",
          },
          {
            label: "02 / Politics",
            src: "assets/images/el-comercio/portadas/03-portada-autovia.png",
            alt: "El Comercio front page about the southwestern highway extension",
          },
          {
            label: "02 / Politics",
            src: "assets/images/el-comercio/portadas/04-articulo-autovia.png",
            alt: "El Comercio article about the southwestern highway toward Ponferrada",
          },
          {
            label: "03 / Culture",
            src: "assets/images/el-comercio/portadas/05-portada-cangas.png",
            alt: "El Comercio front page about Cangas celebration",
          },
          {
            label: "03 / Culture",
            src: "assets/images/el-comercio/portadas/06-articulo-descarga.png",
            alt: "El Comercio feature about La Descarga celebration",
          },
          {
            label: "04 / Crime and incidents",
            src: "assets/images/el-comercio/portadas/07-portada-sucesos-incendio.png",
            alt: "El Comercio front page about a fatal house fire in Cangas del Narcea",
          },
          {
            label: "04 / Crime and incidents",
            src: "assets/images/el-comercio/portadas/08-articulo-sucesos-incendio-cangas.png",
            alt: "El Comercio article about a fatal house fire in Cangas del Narcea",
          },
        ],
      },
      {
        title: "Multimedia features in special sections",
        items: [
          {
            label: "Pegados a la Tierra",
            title: "Si no te adaptas a los tiempos, trabajar en un oficio ancestral es imposible",
            theme: "Craftsmanship, wood and rural tourism",
            href: "https://pegadosalatierra.elcomercio.es/victor-garcia-la-guarida-del-cunqueiro-degana-asturias/",
          },
          {
            label: "Pegados a la Tierra",
            title: "¿Por qué no juntarnos todos y sacar provecho de nuestra biodiversidad?",
            theme: "Active tourism and rural hospitality",
            href: "https://pegadosalatierra.elcomercio.es/albergue-gato-gordo-san-pedro-pinera-cudillero/",
          },
          {
            label: "Pegados a la Tierra",
            title: "Lo artesano demanda naturaleza, por eso apostamos por Somiedo",
            theme: "Agri-food industry and craft beer",
            href: "https://pegadosalatierra.elcomercio.es/lo-artesano-demanda-naturaleza-por-eso-apostamos-por-somiedo/",
          },
          {
            label: "Pegados a la Tierra",
            title: "En mi cocina defiendo la cultura campesina, que está muy viva",
            theme: "Mobile gastronomy and local zero-kilometre products",
            href: "https://pegadosalatierra.elcomercio.es/cesar-otero-pizzas-do-pais-manores-tineo/",
          },
          {
            label: "Nuestro Campo",
            title: "La rosa del Narcea se abre paso",
            theme: "Agricultural innovation, biotechnology and luxury cosmetics",
            href: "https://nuestrocampo.elcomercio.es/la-rosa-del-narcea-se-abre-paso/",
          },
          {
            label: "Nuestro Campo",
            title: "La asturiana de los valles es la más bella y noble",
            theme: "Pedigree livestock, fairs and national auctions",
            href: "https://nuestrocampo.elcomercio.es/la-asturiana-de-los-valles-es-la-mas-bella-y-noble/",
          },
          {
            label: "Nuestro Campo",
            title: "Si estuviéramos tan unidos como los ganaderos franceses, no estaríamos pasándolo tan mal",
            theme: "Family livestock farming and sector challenges",
            href: "https://nuestrocampo.elcomercio.es/oscar-barrera-lucia-rey-mieldes-explotacion-ganadera/?ref=https%3A%2F%2Fwww.google.com%2F",
          },
          {
            label: "Nuestro Campo",
            title: "Ocho hectáreas de arándanos sin aprovechar",
            theme: "Agricultural research, cooperativism and rural abandonment",
            href: "https://nuestrocampo.elcomercio.es/ocho-hectareas-de-arandanos-sin-aprovechar/",
          },
          {
            label: "Nuestro Campo",
            title: "Los rebaños de Asturiana de los Valles",
            theme: "Mountain fair and traditional livestock farming",
            href: "https://nuestrocampo.elcomercio.es/los-rebanos-de-asturiana-de-los-valles-la-imagen-de-asturias/",
          },
          {
            label: "Others",
            title: "Hay que buscar una solución para los puestos de trabajo de Danone y para Salas",
            theme: "Economy and protest",
            href: "https://www.elcomercio.es/asturias/danone-salas-trabajos-protesta-oviedo-solucion-20220627203436-nt.html",
          },
          {
            label: "Others",
            title: "Aparece un desconocido soneto de Miguel Eugenio del Riego en memoria de su hermano",
            theme: "Culture",
            href: "https://www.elcomercio.es/culturas/aparece-desconocido-soneto-miguel-eugenio-riego-memoria-20231025223424-nt.html",
          },
        ],
      },
      {
        title: "El Comercio / Interviews",
        items: [
          {
            label: "01 / Elections",
            src: "assets/images/el-comercio/entrevistas/01-elecciones-belarmino.png",
            alt: "El Comercio interview with Belarmino Fernández",
          },
          {
            label: "02 / Elections",
            src: "assets/images/el-comercio/entrevistas/02-elecciones-fontaniella.png",
            alt: "El Comercio interview with José Luis Fontaniella",
          },
          {
            label: "03 / CSIC researcher",
            src: "assets/images/el-comercio/entrevistas/03-investigadora-csic-rosa-narcea.png",
            alt: "El Comercio interview with Carmen Martínez about the Rosa del Narcea project",
          },
          {
            label: "04 / Elections",
            src: "assets/images/el-comercio/entrevistas/02-elecciones-oscar-ancares.png",
            alt: "El Comercio interview with Óscar Ancares",
          },
          {
            label: "05 / Elections",
            src: "assets/images/el-comercio/entrevistas/03-elecciones-hidalgo.png",
            alt: "El Comercio interview with Sergio Hidalgo",
          },
          {
            label: "06 / Elections",
            src: "assets/images/el-comercio/entrevistas/04-elecciones-feito.png",
            alt: "El Comercio interview with José Ramón Feito Lorences",
          },
          {
            label: "07 / Cruz Roja",
            src: "assets/images/el-comercio/entrevistas/05-cruz-roja-andres.png",
            alt: "El Comercio interview with Andrés Rodríguez from Cruz Roja",
          },
          {
            label: "08 / Elections",
            src: "assets/images/el-comercio/entrevistas/06-elecciones-carmen.png",
            alt: "El Comercio interview with Carmen López",
          },
        ],
      },
      {
        title: "El Comercio / Politics",
        items: [
          {
            label: "01 / Just transition programme",
            src: "assets/images/el-comercio/politica/01-programa-transicion-justa-barbon.png",
            alt: "El Comercio article about Adrián Barbón and just transition works in Ibias",
          },
          {
            label: "02 / European Next Generation funds",
            src: "assets/images/el-comercio/politica/02-fondos-europeos-next-generation.png",
            alt: "El Comercio article about European Next Generation funds and economic reactivation",
          },
          {
            label: "03 / Just transition programme",
            src: "assets/images/el-comercio/politica/02-programa-transicion-justa-mina-miura.png",
            alt: "El Comercio article about Mina Miura and the coal market in southwestern Asturias",
          },
          {
            label: "04 / Municipal elections",
            src: "assets/images/el-comercio/politica/04-elecciones-municipales.png",
            alt: "El Comercio article about municipal election proposals for rural economy",
          },
          {
            label: "05 / Just transition programme",
            src: "assets/images/el-comercio/politica/03-programa-transicion-justa-restauracion-minas.png",
            alt: "El Comercio article about environmental restoration of mines and employment",
          },
          {
            label: "06 / Rural depopulation",
            src: "assets/images/el-comercio/politica/04-despoblacion-rural.png",
            alt: "El Comercio article about rural depopulation and Caja Rural in Somiedo",
          },
          {
            label: "07 / IU incident",
            src: "assets/images/el-comercio/politica/05-incidente-iu.png",
            alt: "El Comercio article about a political incident involving IU in Cangas del Narcea",
          },
        ],
      },
      {
        title: "El Comercio / Society",
        items: [
          {
            label: "01 / Health",
            src: "assets/images/el-comercio/sociedad/03-salud.png",
            alt: "El Comercio article about access to healthcare on the Asturias and Galicia border",
          },
          {
            label: "02 / Digital divide",
            src: "assets/images/el-comercio/sociedad/02-brecha-digital-valle-cibea.png",
            alt: "El Comercio article about the Valle del Cibea and the lack of mobile and internet coverage",
          },
          {
            label: "03 / Cruz Roja",
            src: "assets/images/el-comercio/sociedad/01-cruz-roja.png",
            alt: "El Comercio article about Cruz Roja volunteers and immigration support",
          },
          {
            label: "04 / Rural depopulation",
            src: "assets/images/el-comercio/sociedad/02-historia.png",
            alt: "El Comercio article about El Fuejo and rural depopulation",
          },
          {
            label: "05 / Entrepreneurship",
            src: "assets/images/el-comercio/sociedad/04-emprendimiento.png",
            alt: "El Comercio article about rural entrepreneurship in southwestern Asturias",
          },
        ],
      },
      {
        title: "El Comercio / Economy",
        items: [
          {
            label: "01 / Rural tourism",
            src: "assets/images/el-comercio/economia/01-turismo-rural.png",
            alt: "El Comercio article about rural tourism and a new generation of entrepreneurs",
          },
          {
            label: "02 / Mining",
            src: "assets/images/el-comercio/economia/02-mineria.png",
            alt: "El Comercio article about Orovalle Minerals workers and mining rights",
          },
          {
            label: "03 / Job insecurity",
            src: "assets/images/el-comercio/economia/03-precariedad.png",
            alt: "El Comercio article about precarious job offers and young workers",
          },
          {
            label: "04 / Livestock farming",
            src: "assets/images/el-comercio/economia/04-ganaderia.png",
            alt: "El Comercio article about livestock prices and cattle farming",
          },
        ],
      },
      {
        title: "El Comercio / Culture",
        items: [
          {
            label: "01 / Heritage",
            src: "assets/images/el-comercio/cultura/01-patrimonio-basilica-cangas.png",
            alt: "El Comercio article about the basilica of Cangas del Narcea and its heritage",
          },
          {
            label: "02 / Rural popular culture",
            src: "assets/images/el-comercio/cultura/02-cultura-popular-rural.png",
            alt: "El Comercio article about Os Reises and rural popular culture",
          },
          {
            label: "03 / Black ceramics",
            src: "assets/images/el-comercio/cultura/02-ceramica-negra.png",
            alt: "El Comercio article about black ceramics from Cangas del Narcea",
          },
          {
            label: "04 / Heritage",
            src: "assets/images/el-comercio/cultura/02-patrimonio-cornellana.png",
            alt: "El Comercio article about the monastery of Cornellana and heritage restoration",
          },
          {
            label: "05 / Literature",
            src: "assets/images/el-comercio/cultura/03-literatura-casona.png",
            alt: "El Comercio article about Cangas writers and Alejandro Casona",
          },
        ],
      },
      {
        title: "El Comercio / Crime and incidents",
        items: [
          {
            label: "01 / Rally Tineo",
            src: "assets/images/el-comercio/sucesos/01-rally-tineo.png",
            alt: "El Comercio article about a fatal accident in the Rally Tineo",
          },
          {
            label: "02 / Suicide",
            src: "assets/images/el-comercio/sucesos/02-suicidio.png",
            alt: "El Comercio article about the death of Diego Ruiz in Valdés",
          },
          {
            label: "03 / Police raid",
            src: "assets/images/el-comercio/sucesos/03-redada.png",
            alt: "El Comercio article about a cocaine raid in Cangas del Narcea",
          },
        ],
      },
    ],
  },
  navarra: {
    kicker: "Archive",
    title: "Academic degrees",
    type: "reader",
    chapters: [
      {
        title: "Academic degrees",
        items: [
          {
            type: "academicList",
            entries: [
              {
                institution: "Universidad Politécnica de Madrid",
                credential: "Digital Transformation - Change Agent - 2026",
              },
              {
                institution: "The Graduate School of Political Management",
                credential: "The George Washington University - 2025",
              },
              {
                institution: "Universidad de Navarra",
                credentialLines: [
                  "Master in Political, Corporate and Public Affairs Communication",
                  "2024/25",
                ],
                credentialDocument: {
                  label: "TFM - Communication strategy and analysis Auditorio Sony - 8.87",
                  href: "assets/documents/academic/tfm-mcpc-auditorio-sony-2025.pdf",
                },
                project: {
                  title: "Master's newsletter collaboration",
                  publication: "PRECISA/MENTE",
                  meta: "1.587 subscribers",
                  description: "Listen, reframe, lead: Nike's formula for dominating the agenda",
                  links: {
                    article:
                      "https://www.linkedin.com/pulse/escuchar-reencuadrar-liderar-la-formula-nike-para-dominar-agenda-r0mwf/",
                  },
                },
              },
              {
                institution: "Master in Web Development and Motion Graphics",
                credential: "Escuela Trazos - 2021",
              },
              {
                institution: "The Cambridge C1 Advanced (CAE)",
                credential: "High-level English certification - 2020",
              },
              {
                institution: "Universidad Rey Juan Carlos",
                credential: "Degree in Audiovisual Communication - 2015",
                project: {
                  title: "Final degree project: distinction (9.3/10)",
                  description:
                    "Comparative analysis between a comic and its film adaptation. Case study: Persepolis.",
                  href: "assets/documents/academic/tfg-audiovisual-persepolis.pdf",
                },
              },
              {
                institution: "Universidad Rey Juan Carlos",
                credential: "Degree in Journalism - 2015",
              },
              {
                institution: "La Factoría del Guión",
                credential: "Film and TV Screenwriting course - 2013",
              },
            ],
          },
        ],
      },
      {
        title: "Universidad Politécnica de Madrid",
        items: [
          {
            label: "2026 / Digital Transformation",
            src: "assets/images/academic/politecnica-transformacion-digital.jpg",
            alt: "Digital Transformation Change Agents diploma from Universidad Politécnica de Madrid",
          },
        ],
      },
      {
        title: "The Graduate School of Political Management",
        items: [
          {
            label: "2025 / GSPM",
            src: "assets/images/academic/gspm-political-management.jpg",
            alt: "Certificate from The Graduate School of Political Management at The George Washington University",
          },
        ],
      },
      {
        title: "Universidad de Navarra",
        items: [
          {
            label: "2024-25 / MCPC",
            src: "assets/images/academic/mcpc-universidad-navarra.jpg",
            alt: "Master in Political and Corporate Communication diploma from Universidad de Navarra",
          },
        ],
      },
      {
        title: "Cambridge C1 Advanced",
        items: [
          {
            label: "2020 / CAE",
            src: "assets/images/academic/cambridge-c1-advanced.jpg",
            alt: "Cambridge Assessment English C1 Advanced certificate",
          },
        ],
      },
      {
        title: "Universidad Rey Juan Carlos - Audiovisual Communication",
        items: [
          {
            label: "2015 / Audiovisual Communication",
            src: "assets/images/academic/urjc-comunicacion-audiovisual.jpg",
            alt: "Audiovisual Communication degree diploma from Universidad Rey Juan Carlos",
          },
        ],
      },
      {
        title: "Universidad Rey Juan Carlos - Journalism",
        items: [
          {
            label: "2015 / Journalism",
            src: "assets/images/academic/urjc-periodismo.jpg",
            alt: "Journalism degree diploma from Universidad Rey Juan Carlos",
          },
        ],
      },
    ],
  },
  openworld: {
    kicker: "06-07-2011 / 06-07-2012",
    title: "Open World Education",
    body: [
      "Coordination of language exchanges between Dublin and Madrid.",
      "Early international education work connected to languages, mobility and cross-cultural communication.",
    ],
  },
  weber: {
    kicker: "01-04-2025 / 30-11-2025",
    title: "Weber Shandwick",
    type: "stats",
    subtitle: "Corporate Communications Team Member — 2025",
    description:
      "Part of the Corporate Communications team during 2025, contributing to the planning, development, and execution of strategic communication plans. Supported corporate positioning, content coordination, stakeholder messaging, and campaign delivery.",
    logos: [
      {
        src: "assets/images/weber-shandwick/nespresso.svg",
        alt: "Nespresso logo",
      },
      {
        src: "assets/images/weber-shandwick/turkish-airlines-clean.png",
        alt: "Turkish Airlines logo",
      },
      {
        src: "assets/images/weber-shandwick/synergym-clean.png",
        alt: "Synergym logo",
      },
      {
        src: "assets/images/weber-shandwick/universidad-europea-clean.png",
        alt: "Universidad Europea logo",
      },
    ],
    stats: [
      {
        prefix: "+",
        value: 4,
        title: "Weber Shandwick clients",
        subtitle: "Nespresso, Turkish Airlines, Synergym and Universidad Europea.",
      },
      {
        value: 100,
        suffix: "+",
        title: "Press Releases",
        subtitle: "Tier-1 content (CincoDías, La Vanguardia, La Razón, Europa Press).",
      },
      {
        prefix: "+",
        value: 1,
        title: "Op-eds",
        subtitle: "Opinion piece for El Economista on behalf of Nespresso's CEO.",
        href: "https://www.eleconomista.es/retail-consumo/noticias/13395485/06/25/la-innovacion-va-mas-alla-del-lanzamiento-de-nuevos-productos.html#:~:text=Brigitte%20Felber,flexibilidad%20para%20alcanzar%20el%20%C3%A9xito",
      },
      {
        prefix: "+",
        value: 2,
        title: "Co-organizations of events",
        subtitle: "for Turkish Airlines and Synergym.",
      },
    ],
  },
  george: {
    kicker: "15-01-2025 / 15-03-2025",
    title: "The George Washington University",
    body: [
      "School of Political Management experience.",
      "A specialised political-management programme that connected campaign strategy, public leadership, institutional communication and the practical logic of decision-making in Washington, D.C.",
    ],
  },
  hilo: {
    kicker: "15-01-2026 / 15-05-2026",
    title: "ONG Hilo Rojo | Trujillo, Peru",
    type: "photoMosaic",
    intro:
      "At HiloRojo, I shared my passion for communication as a bridge between people, cultures, and stories. Working in a diverse environment taught me to listen with care and communicate with purpose. It was a lesson in empathy, creativity, and human connection.",
    socialTitle: "Digital Content Producer",
    socialIntro:
      "For four months, I managed HiloRojo Perú’s Instagram and Facebook presence, engaging communities of 3,625 and 6.5K followers through original video content that I planned, filmed, edited, and post-produced.",
    images: [
      {
        src: "assets/images/hilo-rojo/hilo-rojo-group-wave.jpg",
        alt: "Hilo Rojo volunteers and children waving at a community activity",
        variant: "feature wide",
      },
      {
        src: "assets/images/hilo-rojo/beach-selfie.jpg",
        alt: "Beach selfie with young people from the project",
        variant: "wide",
      },
      {
        src: "assets/images/hilo-rojo/child-selfie-pink.jpg",
        alt: "Smiling selfie with a child in the Hilo Rojo classroom",
        variant: "feature",
      },
      {
        src: "assets/images/hilo-rojo/puppy-conversation.gif",
        alt: "Animated moment with volunteers and puppies in Peru",
        variant: "centerpiece feature",
      },
      {
        src: "assets/images/hilo-rojo/street-puppies.jpg",
        alt: "Carlos holding puppies near the Hilo Rojo mural",
        variant: "tall",
      },
      {
        src: "assets/images/hilo-rojo/director-selfie.jpg",
        alt: "Portrait with the Hilo Rojo director",
        variant: "tall",
      },
      {
        src: "assets/images/hilo-rojo/happy-workshop-board.jpg",
        alt: "Hilo Rojo workshop group holding balloons and a happiness board",
        variant: "feature wide",
      },
      {
        src: "assets/images/hilo-rojo/volunteer-team-room.jpg",
        alt: "Hilo Rojo volunteer team sitting in a community room",
        variant: "feature",
      },
      {
        src: "assets/images/hilo-rojo/facebook-profile.png",
        alt: "Facebook profile screenshot from ONG Hilo Rojo Trujillo",
        variant: "wide social",
        href: "https://www.facebook.com/ONG.HiloRojo.TRUJILLO",
      },
      {
        src: "assets/images/hilo-rojo/traditional-group.jpg",
        alt: "Children in traditional clothing with Carlos in Peru",
        variant: "wide",
      },
      {
        src: "assets/images/hilo-rojo/instagram-management.png",
        alt: "Instagram profile screenshot from ONG Hilo Rojo Peru",
        variant: "wide social",
        href: "https://www.instagram.com/onghilorojoperu/",
      },
      {
        src: "assets/images/hilo-rojo/beach-group.jpg",
        alt: "Group portrait on the beach with Hilo Rojo children and volunteers",
        variant: "feature wide",
      },
      {
        src: "assets/images/hilo-rojo/volunteer-portrait-red.jpg",
        alt: "Volunteer portrait wearing the Hilo Rojo vest",
        variant: "tall",
      },
    ],
  },
  lavoz: {
    kicker: "01-06-2026 / present",
    title: "La Voz del Trubia / Madrid-based correspondent for La Voz del Trubia",
    type: "reader",
    chapters: [
      {
        title: "La Voz del Trubia / Madrid-based correspondent for La Voz del Trubia",
        items: [
          {
            type: "copyBlock",
            label: "Madrid-based correspondent",
            title: "La Voz del Trubia",
            body:
              "Madrid-based correspondent for La Voz del Trubia, covering institutional affairs, public policy and regional development stories from the capital with a local-journalism lens.",
          },
          {
            label: "01 / Fondos europeos Next Generation",
            title: "Fondos europeos Next Generation",
            theme: "La Voz del Trubia / Junio 2026 / PDF",
            href: "assets/documents/lavoz/junio-trubia-2026.pdf",
          },
        ],
      },
    ],
  },
  "archive-value": {
    kicker: "Archive",
    title: "Value",
    body: [
      "Selected field reporting, social-impact projects and pieces that explain the professional value behind the portfolio.",
      "A selection of field reporting, social-impact projects and editorial work where listening, context and human detail create professional value.",
    ],
  },
  "archive-growth": {
    kicker: "Archive",
    title: "Growth",
    body: [
      "Academic progression, master's degrees, international programmes and design/web development training.",
      "A learning path shaped by journalism, audiovisual storytelling, public affairs, design, web development and international training.",
    ],
  },
  "archive-reputation": {
    kicker: "Archive",
    title: "Reputation",
    body: [
      "Corporate communication, public affairs, media relations and strategic content work.",
      "Work focused on reputation, media relations, message discipline and strategic content for brands, institutions and public-facing organisations.",
    ],
  },
  "archive-diversity": {
    kicker: "Archive",
    title: "Diversity",
    body: [
      "International experience across Spanish, French and English-speaking environments.",
      "Experience built across Spain, France, Ireland, Peru, Ecuador, Portugal and the United States, moving between languages, cultures and professional contexts.",
    ],
  },
  "archive-share": {
    kicker: "Archive",
    title: "Share",
    body: [
      "Published journalism, audiovisual pieces, interviews and public-facing storytelling.",
      "Public-facing work across local journalism, multimedia reporting, interviews, audiovisual pieces and editorial projects designed to reach real audiences.",
    ],
  },
  "archive-ambition": {
    kicker: "Archive",
    title: "Ambition",
    body: [
      "Projects that connect journalism, strategic communication, public affairs and visual storytelling.",
      "Projects where journalism, strategic communication, public affairs, design and visual storytelling meet in a single professional profile.",
    ],
  },
  "archive-dispute": {
    kicker: "Archive",
    title: "Dispute",
    body: [
      "Work around public debate, political communication, institutional environments and social listening.",
      "Experience reading public debate, mapping stakeholders, following political contexts and translating complex issues into clear communication.",
    ],
  },
  "archive-critical": {
    kicker: "Archive",
    title: "Critical",
    body: [
      "Research, essays, screenwriting, editorial thinking and reflective academic work.",
      "Research, essays, scripts and editorial thinking that connect analytical rigour with narrative craft and cultural interpretation.",
    ],
  },
  journalism: {
    kicker: "Archive",
    title: "Journalism work",
    body: [
      "El Comercio, La Voz del Trubia and cultural media work.",
      "Interviews, field reporting, video, opinion, culture, local politics and feature writing across regional and cultural media.",
    ],
  },
  social: {
    kicker: "Archive",
    title: "Third sector and education",
    body: [
      "Hilo Rojo, Cultur'All Studio, Centre Social La Busette, UFCV and education projects.",
      "Community work, youth projects, educational coordination and audiovisual storytelling developed in France and Latin America.",
    ],
  },
  corporate: {
    kicker: "Archive",
    title: "Corporate communication and public affairs",
    body: [
      "Weber Shandwick, Universidad de Navarra and George Washington University.",
      "Strategic communication experience spanning media angles, reputation work, research, institutional narratives and public-affairs thinking.",
    ],
  },
  academic: {
    kicker: "Archive",
    title: "Academic titles",
    body: [
      "Journalism and Audiovisual Communication, screenwriting, BPJEPS, design/web development and two master's tracks.",
      "A structured view of my formal academic path, from journalism and audiovisual communication to screenwriting, BPJEPS, design, web development and public affairs.",
    ],
  },
  works: {
    kicker: "Archive",
    title: "Academic works",
    body: [
      "A curated library of research, papers, presentations, essays and selected projects connected to journalism, strategy, design and public affairs.",
      "Recommended filters: Public Affairs, Journalism, Strategy, Design, Screenwriting and AI tools.",
    ],
  },
  skills: {
    kicker: "Archive",
    title: "Skills and tools",
    body: [
      "Languages: Spanish, English and French.",
      "Digital, analytics, content, design, video and AI tools can be linked to real evidence inside the portfolio.",
    ],
  },
};

const dialog = document.querySelector("#detail-panel");
const panelKicker = document.querySelector("#panel-kicker");
const panelTitle = document.querySelector("#panel-title");
const panelBody = document.querySelector("#panel-body");
const closeButton = document.querySelector(".panel-close");
let activeReaderCleanup = null;
let lockedScrollY = 0;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getYouTubeVideoId(value) {
  const source = String(value || "").trim();

  if (!source) {
    return "";
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(source)) {
    return source;
  }

  try {
    const url = new URL(source.startsWith("http") ? source : `https://${source}`);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host.endsWith("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v") || "";
      }

      const [, route, id] = url.pathname.split("/");
      if (route === "embed" || route === "shorts") {
        return id || "";
      }
    }
  } catch {
    return source;
  }

  return source;
}

function renderReaderPages(items) {
  return items
    .map((item) => {
      if (item.type === "copyBlock") {
        return `
          <article class="archive-reader-copy-card">
            <span class="archive-reader-link-card__section">${escapeLocalized(item.label)}</span>
            <h3>${escapeLocalized(item.title)}</h3>
            <p>${escapeLocalized(item.body)}</p>
          </article>
        `;
      }

      if (item.type === "academicList") {
        return `
          <section class="academic-title-list" aria-label="Academic titles list">
            ${(item.entries || [])
              .map(
                (entry) => `
                  <article class="academic-title-item">
                    <div class="academic-title-item__main">
                      <strong>${escapeLocalized(entry.institution)}</strong>
                      <span>
                        ${(entry.credentialLines || [entry.credential])
                          .filter(Boolean)
                          .map((line) => `<em>${escapeLocalized(line)}</em>`)
                          .join("")}
                      </span>
                      ${
                        entry.credentialDocument
                          ? `
                            <a
                              class="academic-title-document"
                              href="${escapeHtml(entry.credentialDocument.href)}"
                              target="_blank"
                              rel="noopener noreferrer"
                            >${escapeLocalized(entry.credentialDocument.label)}</a>
                          `
                          : ""
                      }
                    </div>
                    ${
                      entry.project
                        ? entry.project.links
                          ? `
                            <div class="academic-title-project">
                              <a
                                class="academic-title-project__heading"
                                href="${escapeHtml(entry.project.links.article)}"
                                target="_blank"
                                rel="noopener noreferrer"
                              >${escapeLocalized(entry.project.title)}</a>
                              <span>
                                ${escapeLocalized(entry.project.publication)}
                                ${escapeLocalized(`(${entry.project.meta})`)}
                              </span>
                              <a
                                class="academic-title-project__article"
                                href="${escapeHtml(entry.project.links.article)}"
                                target="_blank"
                                rel="noopener noreferrer"
                              >${escapeLocalized(entry.project.description)}</a>
                            </div>
                          `
                          : `
                            <a
                              class="academic-title-project"
                              href="${escapeHtml(entry.project.href)}"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <strong>${escapeLocalized(entry.project.title)}</strong>
                              <span>${escapeLocalized(entry.project.description)}</span>
                            </a>
                          `
                        : ""
                    }
                  </article>
                `,
              )
              .join("")}
          </section>
        `;
      }

      if (item.href) {
        return `
          <article class="archive-reader-link-card">
            <span class="archive-reader-link-card__section">${escapeLocalized(item.label)}</span>
            <a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">
              ${escapeLocalized(item.title)}
            </a>
            <p>${escapeLocalized(item.theme)}</p>
          </article>
        `;
      }

      return `
        <figure class="archive-reader-page">
          <figcaption>${escapeLocalized(item.label)}</figcaption>
          <img src="${escapeHtml(item.src)}" alt="${escapeLocalized(item.alt)}" loading="lazy">
        </figure>
      `;
    })
    .join("");
}

function renderVideoCards(videos) {
  return videos
    .map((video) => {
      const rawVideoId = getYouTubeVideoId(video.videoId || video.url);
      const videoId = escapeHtml(rawVideoId);
      const title = escapeLocalized(video.title);
      const label = escapeLocalized(video.label);

      if (!rawVideoId) {
        return "";
      }

      return `
        <article class="video-card">
          <button class="video-card__poster" type="button" data-video-id="${videoId}" data-video-title="${title}" aria-label="Play ${title}">
            <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="${title}" loading="lazy">
            <span class="video-card__play" aria-hidden="true">Play</span>
          </button>
          <div class="video-card__meta">
            <span>${label}</span>
            <h3>${title}</h3>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderVideoProjects(projects) {
  return projects
    .map(
      (project) => `
        <section class="video-project" data-video-carousel>
          <div class="video-project__header">
            <h3>${escapeLocalized(project.heading)}</h3>
          </div>
          <div class="video-carousel__track" data-video-track aria-label="${escapeLocalized(project.heading)}">
            ${renderVideoCards(project.videos)}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderStatsPanel(content) {
  const logos = (content.logos || [])
    .map(
      (logo) => `
        <img src="${escapeHtml(logo.src)}" alt="${escapeLocalized(logo.alt)}" loading="lazy">
      `,
    )
    .join("");
  const stats = (content.stats || [])
    .map((stat) => {
      const isLinked = Boolean(stat.href);
      const cardTag = isLinked ? "a" : "article";
      const cardClass = `weber-stat-card${isLinked ? " weber-stat-card--link" : ""}`;
      const linkAttributes = isLinked
        ? ` href="${escapeHtml(stat.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeLocalized(`Open ${stat.title} article`)}"`
        : "";

      return `
        <${cardTag} class="${cardClass}"${linkAttributes}>
          <span
            class="weber-stat-card__number"
            data-counter-value="${Number(stat.value) || 0}"
            data-counter-prefix="${escapeHtml(stat.prefix || "")}"
            data-counter-suffix="${escapeHtml(stat.suffix || "")}"
          >${escapeHtml(stat.prefix || "")}0${escapeHtml(stat.suffix || "")}</span>
          <h3>${escapeLocalized(stat.title)}</h3>
          <p>${escapeLocalized(stat.subtitle)}</p>
        </${cardTag}>
      `;
    })
    .join("");

  return `
    <div class="weber-logo-cloud" aria-hidden="true">${logos}</div>
    <section class="weber-stats-panel">
      <div class="weber-stats-panel__intro">
        <p class="weber-stats-panel__subtitle">${escapeLocalized(content.subtitle)}</p>
        <p>${escapeLocalized(content.description)}</p>
      </div>
      <div class="weber-stats-grid">
        ${stats}
      </div>
    </section>
  `;
}

function lockPageScroll() {
  if (!mobileMapMedia.matches) {
    return;
  }

  if (document.body.classList.contains("panel-scroll-locked")) {
    return;
  }

  lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.setProperty("--locked-scroll-y", `${lockedScrollY}px`);
  document.body.classList.add("panel-scroll-locked");
}

function unlockPageScroll() {
  if (!document.body.classList.contains("panel-scroll-locked")) {
    return;
  }

  const originalScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.body.classList.remove("panel-scroll-locked");
  document.body.style.removeProperty("--locked-scroll-y");
  window.scrollTo(0, lockedScrollY);
  requestScrollUpdate();
  window.setTimeout(() => {
    document.documentElement.style.scrollBehavior = originalScrollBehavior;
  }, 0);
}

function resetPanelScroll() {
  if (dialog) {
    dialog.scrollTop = 0;
  }
  if (panelBody) {
    panelBody.scrollTop = 0;
  }
}

function renderPhotoMosaic(content) {
  const mosaicTheme = content.mosaicTheme || "hilo";
  const mainLabel = content.mainLabel || "Fieldwork / Human connection";
  const mosaicLabel = content.mosaicLabel || `${content.title} photo mosaic`;
  const tiles = (content.images || [])
    .map((image) => {
      const variantClasses = (image.variant || "")
        .split(" ")
        .filter(Boolean)
        .map((variant) => ` photo-mosaic__tile--${variant}`)
        .join("");
      const imageMarkup = `<img src="${escapeHtml(image.src)}" alt="${escapeLocalized(image.alt)}" loading="lazy" decoding="async">`;

      if (image.href) {
        return `
          <a
            class="photo-mosaic__tile photo-mosaic__tile--link${variantClasses}"
            href="${escapeHtml(image.href)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${escapeLocalized(`Open ${image.alt}`)}"
          >
            ${imageMarkup}
          </a>
        `;
      }

      return `
        <figure class="photo-mosaic__tile${variantClasses}">
          ${imageMarkup}
        </figure>
      `;
    })
    .join("");

  return `
    <section class="hilo-mosaic-panel photo-mosaic-panel photo-mosaic-panel--${escapeHtml(mosaicTheme)}">
      <div class="hilo-mosaic-copy">
        <div class="hilo-mosaic-copy__fieldwork">
          <span>${escapeLocalized(mainLabel)}</span>
          <p class="hilo-mosaic-copy__intro">${escapeLocalized(content.intro)}</p>
        </div>
        <div class="hilo-social-copy" tabindex="0">
          <span>${escapeLocalized(content.socialTitle)}</span>
          <p>${escapeLocalized(content.socialIntro)}</p>
        </div>
      </div>
      <div class="hilo-photo-mosaic photo-mosaic-grid photo-mosaic-grid--${escapeHtml(mosaicTheme)}" aria-label="${escapeLocalized(mosaicLabel)}">
        ${tiles}
      </div>
    </section>
  `;
}

function initializeStatCounters() {
  const counters = [...(panelBody?.querySelectorAll("[data-counter-value]") || [])];

  if (!counters.length) {
    return () => {};
  }

  const duration = 1700;
  const startedAt = performance.now();
  let frameId = 0;
  const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const easedProgress = easeOut(progress);

    counters.forEach((counter) => {
      const target = Number(counter.dataset.counterValue) || 0;
      const prefix = counter.dataset.counterPrefix || "";
      const suffix = counter.dataset.counterSuffix || "";
      const currentValue = Math.round(target * easedProgress);

      counter.textContent = `${prefix}${currentValue}${suffix}`;
    });

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
    }
  };

  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
}

function initializeReaderChapters(content) {
  const readerShell = panelBody?.querySelector("[data-reader-shell]");
  const track = readerShell?.querySelector("[data-reader-track]");
  const previousButton = readerShell?.querySelector("[data-reader-previous]");
  const nextButton = readerShell?.querySelector("[data-reader-next]");
  const counter = readerShell?.querySelector("[data-reader-counter]");
  const chapters = content.chapters || [];
  let activeIndex = 0;

  if (!readerShell || !track || chapters.length < 2) {
    return () => {};
  }

  const updateReader = () => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    panelTitle.textContent = localizeText(chapters[activeIndex].title);
    counter.textContent = `${activeIndex + 1} / ${chapters.length}`;
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === chapters.length - 1;
    dialog.scrollTop = 0;
  };

  const showPrevious = () => {
    activeIndex = Math.max(0, activeIndex - 1);
    updateReader();
  };

  const showNext = () => {
    activeIndex = Math.min(chapters.length - 1, activeIndex + 1);
    updateReader();
  };

  previousButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  updateReader();

  return () => {
    previousButton.removeEventListener("click", showPrevious);
    nextButton.removeEventListener("click", showNext);
  };
}

function initializeVideoCarousel() {
  const tracks = [...(panelBody?.querySelectorAll("[data-video-track]") || [])];
  const playButtons = [...(panelBody?.querySelectorAll("[data-video-id]") || [])];

  if (!tracks.length || !playButtons.length) {
    return () => {};
  }

  let activeVideoModal = null;
  const trackCleanups = [];

  const closeVideoModal = () => {
    const modal = activeVideoModal;

    if (!modal) {
      return;
    }

    if (typeof modal.close === "function" && modal.open) {
      modal.close();
      return;
    }

    modal.remove();
    activeVideoModal = null;
    document.body.classList.remove("video-modal-open");
  };

  const openVideoModal = (videoId, title) => {
    closeVideoModal();
    const safeTitle = escapeHtml(title);
    const modal = document.createElement("dialog");
    modal.className = "video-modal is-open";
    modal.innerHTML = `
      <div class="video-modal__backdrop" data-video-modal-close></div>
      <div class="video-modal__dialog" role="dialog" aria-modal="true" aria-label="${safeTitle}">
        <button class="video-modal__close" type="button" data-video-modal-close aria-label="Close video">×</button>
        <div class="video-modal__frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
            title="${safeTitle}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;

    modal.querySelectorAll("[data-video-modal-close]").forEach((closeTrigger) => {
      closeTrigger.addEventListener("click", closeVideoModal);
    });

    modal.addEventListener(
      "close",
      () => {
        modal.remove();
        if (activeVideoModal === modal) {
          activeVideoModal = null;
        }
        document.body.classList.remove("video-modal-open");
      },
      { once: true },
    );

    document.body.append(modal);
    if (typeof modal.showModal === "function") {
      modal.showModal();
    }
    document.body.classList.add("video-modal-open");
    activeVideoModal = modal;
    modal.querySelector(".video-modal__close")?.focus();
  };

  tracks.forEach((track) => {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handlePointerDown = (event) => {
      if (event.target.closest("[data-video-id]")) {
        return;
      }

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = track.scrollLeft;
      track.classList.add("is-dragging");
      track.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!isDragging) {
        return;
      }

      const delta = event.clientX - startX;
      track.scrollLeft = startScrollLeft - delta;
    };

    const stopDragging = (event) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      track.classList.remove("is-dragging");
      track.releasePointerCapture?.(event.pointerId);
    };

    track.addEventListener("pointerdown", handlePointerDown);
    track.addEventListener("pointermove", handlePointerMove);
    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    track.addEventListener("pointerleave", stopDragging);
    trackCleanups.push(() => {
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("pointermove", handlePointerMove);
      track.removeEventListener("pointerup", stopDragging);
      track.removeEventListener("pointercancel", stopDragging);
      track.removeEventListener("pointerleave", stopDragging);
    });
  });

  const handlePlayClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget;
    const videoId = button.dataset.videoId;
    const title = button.dataset.videoTitle || "CULTUR'ALL YouTube video";
    if (!videoId) {
      return;
    }

    openVideoModal(videoId, title);
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape" && activeVideoModal) {
      event.preventDefault();
      event.stopPropagation();
      closeVideoModal();
    }
  };

  document.addEventListener("keydown", handleKeydown, true);
  playButtons.forEach((button) => button.addEventListener("click", handlePlayClick));

  return () => {
    closeVideoModal();
    document.removeEventListener("keydown", handleKeydown, true);
    trackCleanups.forEach((cleanup) => cleanup());
    playButtons.forEach((button) => button.removeEventListener("click", handlePlayClick));
  };
}

function openPanel(panelKey) {
  const contentKey = panelKey === "urjc" ? "navarra" : panelKey;
  const content = panelContent[contentKey];

  if (!content || !dialog || !panelKicker || !panelTitle || !panelBody) {
    return;
  }

  activePanelKey = panelKey;
  activeReaderCleanup?.();
  activeReaderCleanup = null;
  panelKicker.textContent = localizeText(content.kicker);
  panelTitle.textContent = localizeText(content.title);

  if (content.type === "reader") {
    const chapters = content.chapters || [{ title: content.title, items: content.items || [] }];
    panelBody.innerHTML = `
      <div class="archive-reader-shell" data-reader-shell>
        ${
          chapters.length > 1
            ? `
              <div class="archive-reader-nav" aria-label="${escapeLocalized("Archive navigation")}">
                <button class="archive-reader-arrow" type="button" data-reader-previous aria-label="${escapeLocalized("View previous section")}">←</button>
                <span class="archive-reader-counter" data-reader-counter>1 / ${chapters.length}</span>
                <button class="archive-reader-arrow" type="button" data-reader-next aria-label="${escapeLocalized("View next section")}">→</button>
              </div>
            `
            : ""
        }
        <div class="archive-reader-viewport">
          <div class="archive-reader-track" data-reader-track>
            ${chapters
              .map(
                (chapter) => `
                  <section class="archive-reader-chapter" aria-label="${escapeLocalized(chapter.title)}">
                    <div class="archive-reader">
                      ${renderReaderPages(chapter.items)}
                    </div>
                  </section>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
    activeReaderCleanup = initializeReaderChapters(content);
  } else if (content.type === "videoCarousel") {
    panelBody.innerHTML = `
      <div class="video-carousel">
        <p class="video-carousel__intro">${escapeLocalized(content.intro)}</p>
        ${renderVideoProjects(content.projects || [])}
      </div>
    `;
    activeReaderCleanup = initializeVideoCarousel();
  } else if (content.type === "stats") {
    panelBody.innerHTML = renderStatsPanel(content);
    activeReaderCleanup = initializeStatCounters();
  } else if (content.type === "photoMosaic") {
    panelBody.innerHTML = renderPhotoMosaic(content);
  } else if (content.intro && content.bullets) {
    panelBody.innerHTML = `
      <p>${escapeLocalized(content.intro)}</p>
      <ul>
        ${content.bullets.map((item) => `<li>${escapeLocalized(item)}</li>`).join("")}
      </ul>
    `;
  } else {
    panelBody.innerHTML = `
      <ul>
        ${content.body.map((item) => `<li>${escapeLocalized(item)}</li>`).join("")}
      </ul>
    `;
  }

  if (!dialog.open) {
    lockPageScroll();
    dialog.showModal();
  } else {
    resetPanelScroll();
  }
  applyLanguage(currentLanguage, dialog);
}

document.querySelectorAll("[data-panel]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openPanel(trigger.dataset.panel);
  });
});

closeButton?.addEventListener("click", () => {
  activeReaderCleanup?.();
  activeReaderCleanup = null;
  dialog?.close();
});

dialog?.addEventListener("close", () => {
  activeReaderCleanup?.();
  activeReaderCleanup = null;
  activePanelKey = null;
  unlockPageScroll();
});

dialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
    if (dialog?.open && activePanelKey) {
      openPanel(activePanelKey);
    }
  });
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    const action = form.getAttribute("action") || "";

    if (action.startsWith("http")) {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const statusMessage = form.querySelector("[data-contact-status]");
      const originalButtonText = submitButton?.textContent;
      submitButton?.setAttribute("disabled", "true");
      if (statusMessage) {
        statusMessage.hidden = true;
        statusMessage.textContent = "";
      }
      if (submitButton) {
        submitButton.textContent = currentLanguage === "es" ? "Enviando..." : "Sending...";
      }

      try {
        const response = await fetch(action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        form.reset();
        if (statusMessage) {
          statusMessage.textContent = localizeText("Message sent. Thank you.");
          statusMessage.hidden = false;
        }
        if (submitButton) {
          submitButton.textContent = currentLanguage === "es" ? "Mensaje enviado" : "Message sent";
        }
      } catch {
        if (statusMessage) {
          statusMessage.textContent = currentLanguage === "es" ? "No se ha podido enviar. Inténtalo de nuevo o escríbeme por WhatsApp." : "The message could not be sent. Please try again or contact me on WhatsApp.";
          statusMessage.hidden = false;
        }
        if (submitButton) {
          submitButton.textContent = currentLanguage === "es" ? "Error al enviar" : "Send failed";
        }
      } finally {
        window.setTimeout(() => {
          submitButton?.removeAttribute("disabled");
          if (submitButton && originalButtonText) {
            submitButton.textContent = translateTextValue(originalButtonText, currentLanguage);
          }
        }, 2400);
      }

      return;
    }

    event.preventDefault();
    const formData = new FormData(form);
    const recipient = form.dataset.contactEmail || "cbernalhcom@gmail.com";
    const subject = encodeURIComponent(`Portfolio contact - ${formData.get("name") || "New message"}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.get("name") || ""}`,
        `Email: ${formData.get("email") || ""}`,
        `Phone: ${formData.get("phone") || ""}`,
        "",
        "Message:",
        formData.get("message") || "",
      ].join("\n"),
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});

applyLanguage(currentLanguage);
