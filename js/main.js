const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains("timeline-station--intro")) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        return;
      }

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
let tickerLastPointerX = null;

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

if (heroTicker && tickerTrack) {
  heroTicker.addEventListener("pointerenter", (event) => {
    syncTickerOffsetFromAnimation();
    tickerLastPointerX = event.clientX;
    heroTicker.classList.add("is-paused");
  });

  heroTicker.addEventListener("pointerleave", () => {
    tickerLastPointerX = null;
    releaseTickerControl();
  });

  document.addEventListener("pointermove", (event) => {
    if (isPointerInsideTicker(event)) {
      heroTicker.classList.add("is-paused");

      if (!tickerIsDragging && tickerLastPointerX !== null) {
        const pointerDelta = event.clientX - tickerLastPointerX;

        if (Math.abs(pointerDelta) > 0.2) {
          heroTicker.classList.add("is-manual");
          applyTickerOffset(tickerOffset + pointerDelta * 1.8);
        }
      }

      tickerLastPointerX = event.clientX;
      return;
    }

    tickerLastPointerX = null;
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
      applyTickerOffset(tickerOffset - wheelDelta * 1.25);
    },
    { passive: false },
  );

  heroTicker.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    tickerIsDragging = true;
    tickerStartX = event.clientX;
    syncTickerOffsetFromAnimation();
    tickerStartOffset = tickerOffset;
    heroTicker.classList.add("is-dragging", "is-manual");
    heroTicker.setPointerCapture?.(event.pointerId);
  });

  document.addEventListener("pointermove", (event) => {
    if (!tickerIsDragging) {
      return;
    }

    event.preventDefault();
    applyTickerOffset(tickerStartOffset + event.clientX - tickerStartX);
  });

  document.addEventListener("pointerup", (event) => {
    if (!tickerIsDragging) {
      return;
    }

    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");
    heroTicker.releasePointerCapture?.(event.pointerId);

    if (!isPointerInsideTicker(event)) {
      releaseTickerControl();
    }
  });

  document.addEventListener("pointercancel", () => {
    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");
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
const timelineStations = stations.filter(
  (station) =>
    !station.classList.contains("timeline-station--hero") &&
    !station.classList.contains("timeline-station--intro") &&
    !station.classList.contains("timeline-station--map") &&
    !station.classList.contains("timeline-station--archive"),
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const horizontalMedia = window.matchMedia("(min-width: 761px)");

if (timelineVideoBackground) {
  timelineVideoBackground.play().catch(() => {});
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

  const firstTimelineStation = timelineStations.at(0);
  const lastTimelineStation = timelineStations.at(-1);
  timelineStartX = firstTimelineStation
    ? Math.min(
        maxTranslate,
        Math.max(0, firstTimelineStation.offsetLeft + firstTimelineStation.offsetWidth / 2 - window.innerWidth / 2),
      )
    : 0;
  timelineEndX = lastTimelineStation
    ? Math.min(
        maxTranslate,
        Math.max(timelineStartX + 1, lastTimelineStation.offsetLeft + lastTimelineStation.offsetWidth / 2 - window.innerWidth / 2),
      )
    : maxTranslate;

  const firstYearBlock = calendarRuler?.querySelector(".year-block");
  maxRulerTranslate = firstYearBlock ? firstYearBlock.offsetWidth * 16 : 0;
  universe.style.height = `${maxTranslate + window.innerHeight}px`;
}

function updateActiveStation() {
  const center = window.innerWidth / 2;
  let closest = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  stations.forEach((station) => {
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
  const timelineProgress = Math.min(
    1,
    Math.max(0, (scrollX - timelineStartX) / Math.max(1, timelineEndX - timelineStartX)),
  );
  universe.classList.toggle("is-ruler-active", scrollX >= timelineStartX - 1);

  if (calendarRuler) {
    calendarRuler.style.transform = `translate3d(${-maxRulerTranslate * timelineProgress}px, 0, 0)`;
  }

  if (currentYearElement) {
    const activeYear = 2026 - Math.round(timelineProgress * 16);
    currentYearElement.textContent = String(Math.max(2010, Math.min(2026, activeYear)));
  }

  updateActiveStation();

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
      function bindMapCalloutTargets() {
        if (!mapSection) {
          return;
        }

        svg.selectAll("[data-map-callout]")
          .attr("tabindex", "0")
          .on("mouseenter focus", (event) => {
            const name = event.currentTarget.dataset.mapCallout;
            mapSection.classList.add(`is-${name}-callout-open`);
          })
          .on("mouseleave blur", (event) => {
            const name = event.currentTarget.dataset.mapCallout;
            mapSection.classList.remove(`is-${name}-callout-open`);
          })
          .on("click touchstart", (event) => {
            event.preventDefault();
            const name = event.currentTarget.dataset.mapCallout;
            mapSection.classList.toggle(`is-${name}-callout-open`);
          });
      }

      if (mapSection && !usCountry.empty()) {
        usCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-us-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-us-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-us-callout-open");
          });
      }

      if (mapSection && !ecuadorCountry.empty()) {
        ecuadorCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-ecuador-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-ecuador-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-ecuador-callout-open");
          });
      }

      if (mapSection && !peruCountry.empty()) {
        peruCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-peru-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-peru-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-peru-callout-open");
          });
      }

      if (mapSection && !portugalCountry.empty()) {
        portugalCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-portugal-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-portugal-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-portugal-callout-open");
          });
      }

      if (mapSection && !spainCountry.empty()) {
        spainCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-spain-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-spain-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-spain-callout-open");
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
            .on("mouseenter focus", () => mapSection.classList.add("is-france-callout-open"))
            .on("mouseleave blur", () => mapSection.classList.remove("is-france-callout-open"))
            .on("click touchstart", (event) => {
              event.preventDefault();
              mapSection.classList.toggle("is-france-callout-open");
            });
        }
      }

      layer.append("path").datum(borders).attr("class", "static-world-border").attr("d", path);
    })
    .catch(() => {});
}

renderStaticWorldMap();
const panelContent = {
  urjc: {
    kicker: "2010 - 2015",
    title: "Journalism and Audiovisual Communication",
    body: [
      "Academic starting point for the timeline: reporting, audiovisual language, scripts and public storytelling.",
      "This station can later open degree projects, certificates, selected papers and university work.",
    ],
  },
  screenwriting: {
    kicker: "2013",
    title: "La Factoria del Guion",
    body: [
      "Film and TV screenwriting training.",
      "A future detail page can connect this training to narrative structure, audiovisual storytelling and script work.",
    ],
  },
  brumaria: {
    kicker: "2014",
    title: "Editorial Brumaria",
    body: [
      "Assistant editorial project experience in Madrid.",
      "Future assets: editorial documents, art-publishing context, production notes and selected references.",
    ],
  },
  ministry: {
    kicker: "2015",
    title: "French Ministry of Education / CEMEA",
    body: [
      "BPJEPS / socio-cultural project coordination training in France.",
      "Future assets: certificates, program documents, workshop material and education-related evidence.",
    ],
  },
  culturall: {
    kicker: "2016 - 2018",
    title: "Cultur'All Studio",
    type: "videoCarousel",
    intro: "Selected audiovisual production and cultural communication work published on YouTube.",
    videos: [
      {
        label: "01 / Cultur'All",
        title: "Audiovisual production sample",
        videoId: "hzGSc3bGglA",
      },
      {
        label: "02 / Cultur'All",
        title: "Cultural communication sample",
        videoId: "rk-WD544VvU",
      },
      {
        label: "03 / Cultur'All",
        title: "Editorial video sample",
        videoId: "iN00tx9GprA",
      },
      {
        label: "04 / Cultur'All",
        title: "Creative production sample",
        videoId: "ipLX0uPDGlk",
      },
      {
        label: "05 / Cultur'All",
        title: "Visual storytelling sample",
        videoId: "DnRP51uEQQg",
      },
    ],
  },
  busette: {
    kicker: "2018",
    title: "Centre Social La Busette",
    body: [
      "Project management and community work in Lille.",
      "Future assets: workshop documentation, project notes, photographs and impact summaries.",
    ],
  },
  trazos: {
    kicker: "2020",
    title: "Graphic Design and Web Development",
    body: [
      "Digital design and web-development training at Trazos.",
      "This station can later hold design exercises, web prototypes and visual production work.",
    ],
  },
  comercio: {
    kicker: "2021 - 2024",
    title: "El Comercio / Portadas",
    type: "reader",
    chapters: [
      {
        title: "El Comercio / Portadas",
        items: [
          {
            label: "01 / Incendios",
            src: "assets/images/el-comercio/portadas/01-portada-incendios.jpg",
            alt: "El Comercio front page about wildfires in Asturias",
          },
          {
            label: "01 / Incendios",
            src: "assets/images/el-comercio/portadas/02-articulo-incendios.jpg",
            alt: "El Comercio article about beekeepers affected by wildfires",
          },
          {
            label: "02 / Politica",
            src: "assets/images/el-comercio/portadas/03-portada-autovia.png",
            alt: "El Comercio front page about the southwestern highway extension",
          },
          {
            label: "02 / Politica",
            src: "assets/images/el-comercio/portadas/04-articulo-autovia.png",
            alt: "El Comercio article about the southwestern highway toward Ponferrada",
          },
          {
            label: "03 / Cultura",
            src: "assets/images/el-comercio/portadas/05-portada-cangas.png",
            alt: "El Comercio front page about Cangas celebration",
          },
          {
            label: "03 / Cultura",
            src: "assets/images/el-comercio/portadas/06-articulo-descarga.png",
            alt: "El Comercio feature about La Descarga celebration",
          },
        ],
      },
      {
        title: "El Comercio / Entrevistas",
        items: [
          {
            label: "01 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/01-elecciones-belarmino.png",
            alt: "El Comercio interview with Belarmino Fernandez",
          },
          {
            label: "02 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/02-elecciones-oscar-ancares.png",
            alt: "El Comercio interview with Oscar Ancares",
          },
          {
            label: "03 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/03-elecciones-hidalgo.png",
            alt: "El Comercio interview with Sergio Hidalgo",
          },
          {
            label: "04 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/04-elecciones-feito.png",
            alt: "El Comercio interview with Jose Ramon Feito Lorences",
          },
          {
            label: "05 / Cruz Roja",
            src: "assets/images/el-comercio/entrevistas/05-cruz-roja-andres.png",
            alt: "El Comercio interview with Andres Rodriguez from Cruz Roja",
          },
          {
            label: "06 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/06-elecciones-carmen.png",
            alt: "El Comercio interview with Carmen Lopez",
          },
        ],
      },
      {
        title: "El Comercio / Politica",
        items: [
          {
            label: "01 / Programa transicion justa",
            src: "assets/images/el-comercio/politica/01-programa-transicion-justa-barbon.png",
            alt: "El Comercio article about Adrian Barbon and just transition works in Ibias",
          },
          {
            label: "02 / Programa transicion justa",
            src: "assets/images/el-comercio/politica/02-programa-transicion-justa-mina-miura.png",
            alt: "El Comercio article about Mina Miura and the coal market in southwestern Asturias",
          },
          {
            label: "03 / Programa transicion justa",
            src: "assets/images/el-comercio/politica/03-programa-transicion-justa-restauracion-minas.png",
            alt: "El Comercio article about environmental restoration of mines and employment",
          },
        ],
      },
      {
        title: "El Comercio / Sociedad",
        items: [
          {
            label: "01 / Cruz Roja",
            src: "assets/images/el-comercio/sociedad/01-cruz-roja.png",
            alt: "El Comercio article about Cruz Roja volunteers and immigration support",
          },
          {
            label: "02 / Historia",
            src: "assets/images/el-comercio/sociedad/02-historia.png",
            alt: "El Comercio article about El Fuejo and local history",
          },
          {
            label: "03 / Salud",
            src: "assets/images/el-comercio/sociedad/03-salud.png",
            alt: "El Comercio article about access to healthcare on the Asturias and Galicia border",
          },
          {
            label: "04 / Emprendimiento",
            src: "assets/images/el-comercio/sociedad/04-emprendimiento.png",
            alt: "El Comercio article about rural entrepreneurship in southwestern Asturias",
          },
        ],
      },
    ],
  },
  navarra: {
    kicker: "2024 - 2025",
    title: "Universidad de Navarra",
    body: [
      "Master in Corporate Communication and Public Affairs.",
      "Future assets: papers, presentations, certificates, public affairs projects and selected research.",
    ],
  },
  weber: {
    kicker: "2025",
    title: "Weber Shandwick",
    body: [
      "Corporate communication consulting experience in Madrid.",
      "Future detail page: non-confidential methodology, media monitoring, content systems, plans and public affairs learning.",
    ],
  },
  george: {
    kicker: "2025",
    title: "The George Washington University",
    body: [
      "School of Political Management experience.",
      "Future assets: academic work, presentations, certificates and public affairs materials.",
    ],
  },
  hilo: {
    kicker: "2026",
    title: "ONG Hilo Rojo | Trujillo, Peru",
    body: [
      "Education volunteer and digital content assistant.",
      "Future detail page: field diary, workshop documentation, digital content, photos, videos and project outcomes.",
    ],
  },
  lavoz: {
    kicker: "2026",
    title: "La Voz del Trubia",
    body: [
      "Madrid correspondent for local journalism, interviews and field reporting.",
      "Future assets: article links, interviews, screenshots, publication pages and notes.",
    ],
  },
  "archive-value": {
    kicker: "Archive",
    title: "Value",
    body: [
      "Selected field reporting, social-impact projects and pieces that explain the professional value behind the portfolio.",
      "Future assets: articles, case studies, visual notes and editorial outcomes.",
    ],
  },
  "archive-growth": {
    kicker: "Archive",
    title: "Growth",
    body: [
      "Academic progression, master's degrees, international programmes and design/web development training.",
      "Future assets: certificates, coursework, presentations and learning evidence.",
    ],
  },
  "archive-reputation": {
    kicker: "Archive",
    title: "Reputation",
    body: [
      "Corporate communication, public affairs, media relations and strategic content work.",
      "Future assets: non-confidential briefs, monitoring samples, planning notes and reputation frameworks.",
    ],
  },
  "archive-diversity": {
    kicker: "Archive",
    title: "Diversity",
    body: [
      "International experience across Spanish, French and English-speaking environments.",
      "Future assets: maps, project diaries, language evidence and cross-cultural work.",
    ],
  },
  "archive-share": {
    kicker: "Archive",
    title: "Share",
    body: [
      "Published journalism, audiovisual pieces, interviews and public-facing storytelling.",
      "Future assets: links, clips, screenshots, embeds and publication pages.",
    ],
  },
  "archive-ambition": {
    kicker: "Archive",
    title: "Ambition",
    body: [
      "Projects that connect journalism, strategic communication, public affairs and visual storytelling.",
      "Future assets: portfolio experiments, prototypes, design systems and narrative formats.",
    ],
  },
  "archive-dispute": {
    kicker: "Archive",
    title: "Dispute",
    body: [
      "Work around public debate, political communication, institutional environments and social listening.",
      "Future assets: analysis, issue maps, stakeholder contexts and communication strategy notes.",
    ],
  },
  "archive-critical": {
    kicker: "Archive",
    title: "Critical",
    body: [
      "Research, essays, screenwriting, editorial thinking and reflective academic work.",
      "Future assets: papers, scripts, reading notes, research projects and visual essays.",
    ],
  },
  journalism: {
    kicker: "Archive",
    title: "Journalism work",
    body: [
      "El Comercio, La Voz del Trubia and cultural media work.",
      "Future filters: interviews, field reporting, video, opinion, culture, local politics and features.",
    ],
  },
  social: {
    kicker: "Archive",
    title: "Third sector and education",
    body: [
      "Hilo Rojo, Cultur'All Studio, Centre Social La Busette, UFCV and education projects.",
      "Future assets: workshops, camps, videos, project documents and photo stories.",
    ],
  },
  corporate: {
    kicker: "Archive",
    title: "Corporate communication and public affairs",
    body: [
      "Weber Shandwick, Universidad de Navarra and George Washington University.",
      "Future assets: non-confidential strategy work, media angles, presentations and research.",
    ],
  },
  academic: {
    kicker: "Archive",
    title: "Academic titles",
    body: [
      "Journalism and Audiovisual Communication, screenwriting, BPJEPS, design/web development and two master's tracks.",
      "This archive will gather certificates, coursework and formal academic material.",
    ],
  },
  works: {
    kicker: "Archive",
    title: "Academic works",
    body: [
      "Future library for research, papers, presentations, essays and selected projects.",
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

function renderReaderPages(items) {
  return items
    .map(
      (item) => `
        <figure class="archive-reader-page">
          <figcaption>${item.label}</figcaption>
          <img src="${item.src}" alt="${item.alt}" loading="lazy">
        </figure>
      `,
    )
    .join("");
}

function renderVideoCards(videos) {
  return videos
    .map(
      (video) => `
        <article class="video-card">
          <button class="video-card__poster" type="button" data-video-id="${video.videoId}" aria-label="Play ${video.title}">
            <img src="https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg" alt="${video.title}" loading="lazy">
            <span class="video-card__play" aria-hidden="true">Play</span>
          </button>
          <div class="video-card__meta">
            <span>${video.label}</span>
            <h3>${video.title}</h3>
          </div>
        </article>
      `,
    )
    .join("");
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
    panelTitle.textContent = chapters[activeIndex].title;
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
  const carousel = panelBody?.querySelector("[data-video-carousel]");
  const track = carousel?.querySelector("[data-video-track]");
  const playButtons = carousel?.querySelectorAll("[data-video-id]");

  if (!carousel || !track || !playButtons?.length) {
    return () => {};
  }

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let moved = false;

  const handlePointerDown = (event) => {
    isDragging = true;
    moved = false;
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
    if (Math.abs(delta) > 6) {
      moved = true;
    }
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

  const handlePlayClick = (event) => {
    if (moved) {
      event.preventDefault();
      return;
    }

    const button = event.currentTarget;
    const videoId = button.dataset.videoId;
    button.outerHTML = `
      <iframe
        class="video-card__iframe"
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        title="Cultur'All YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  };

  track.addEventListener("pointerdown", handlePointerDown);
  track.addEventListener("pointermove", handlePointerMove);
  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("pointerleave", stopDragging);
  playButtons.forEach((button) => button.addEventListener("click", handlePlayClick));

  return () => {
    track.removeEventListener("pointerdown", handlePointerDown);
    track.removeEventListener("pointermove", handlePointerMove);
    track.removeEventListener("pointerup", stopDragging);
    track.removeEventListener("pointercancel", stopDragging);
    track.removeEventListener("pointerleave", stopDragging);
    playButtons.forEach((button) => button.removeEventListener("click", handlePlayClick));
  };
}

function openPanel(panelKey) {
  const content = panelContent[panelKey];

  if (!content || !dialog || !panelKicker || !panelTitle || !panelBody) {
    return;
  }

  activeReaderCleanup?.();
  activeReaderCleanup = null;
  panelKicker.textContent = content.kicker;
  panelTitle.textContent = content.title;

  if (content.type === "reader") {
    const chapters = content.chapters || [{ title: content.title, items: content.items || [] }];
    panelBody.innerHTML = `
      <div class="archive-reader-shell" data-reader-shell>
        ${
          chapters.length > 1
            ? `
              <div class="archive-reader-nav" aria-label="El Comercio archive navigation">
                <button class="archive-reader-arrow" type="button" data-reader-previous aria-label="Ver seccion anterior">←</button>
                <span class="archive-reader-counter" data-reader-counter>1 / ${chapters.length}</span>
                <button class="archive-reader-arrow" type="button" data-reader-next aria-label="Ver siguiente seccion">→</button>
              </div>
            `
            : ""
        }
        <div class="archive-reader-viewport">
          <div class="archive-reader-track" data-reader-track>
            ${chapters
              .map(
                (chapter) => `
                  <section class="archive-reader-chapter" aria-label="${chapter.title}">
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
      <div class="video-carousel" data-video-carousel>
        <p class="video-carousel__intro">${content.intro}</p>
        <div class="video-carousel__track" data-video-track aria-label="${content.title} video carousel">
          ${renderVideoCards(content.videos)}
        </div>
      </div>
    `;
    activeReaderCleanup = initializeVideoCarousel();
  } else {
    panelBody.innerHTML = `
      <ul>
        ${content.body.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  dialog.showModal();
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

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    activeReaderCleanup?.();
    activeReaderCleanup = null;
    dialog.close();
  }
});

dialog?.addEventListener("close", () => {
  activeReaderCleanup?.();
  activeReaderCleanup = null;
});
