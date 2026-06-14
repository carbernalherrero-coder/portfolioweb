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
          { label: "04 / Metal", title: "Guitares en scene", videoId: "bygewmemA7A" },
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
          {
            label: "04 / Sucesos",
            src: "assets/images/el-comercio/portadas/07-portada-sucesos-incendio.png",
            alt: "El Comercio front page about a fatal house fire in Cangas del Narcea",
          },
          {
            label: "04 / Sucesos",
            src: "assets/images/el-comercio/portadas/08-articulo-sucesos-incendio-cangas.png",
            alt: "El Comercio article about a fatal house fire in Cangas del Narcea",
          },
        ],
      },
      {
        title: "Reportajes multimedia en secciones especiales",
        items: [
          {
            label: "Pegados a la Tierra",
            title: "Si no te adaptas a los tiempos, trabajar en un oficio ancestral es imposible",
            theme: "Artesania, madera y turismo rural",
            href: "https://pegadosalatierra.elcomercio.es/victor-garcia-la-guarida-del-cunqueiro-degana-asturias/",
          },
          {
            label: "Pegados a la Tierra",
            title: "Por que no juntarnos todos y sacar provecho de nuestra biodiversidad?",
            theme: "Turismo activo y hosteleria rural",
            href: "https://pegadosalatierra.elcomercio.es/albergue-gato-gordo-san-pedro-pinera-cudillero/",
          },
          {
            label: "Pegados a la Tierra",
            title: "Lo artesano demanda naturaleza, por eso apostamos por Somiedo",
            theme: "Industria agroalimentaria y cerveza artesanal",
            href: "https://pegadosalatierra.elcomercio.es/lo-artesano-demanda-naturaleza-por-eso-apostamos-por-somiedo/",
          },
          {
            label: "Pegados a la Tierra",
            title: "En mi cocina defiendo la cultura campesina, que esta muy viva",
            theme: "Gastronomia ambulante y productos locales de km 0",
            href: "https://pegadosalatierra.elcomercio.es/cesar-otero-pizzas-do-pais-manores-tineo/",
          },
          {
            label: "Nuestro Campo",
            title: "La rosa del Narcea se abre paso",
            theme: "Innovacion agricola, biotecnologia y cosmetica de lujo",
            href: "https://nuestrocampo.elcomercio.es/la-rosa-del-narcea-se-abre-paso/",
          },
          {
            label: "Nuestro Campo",
            title: "La asturiana de los valles es la mas bella y noble",
            theme: "Ganaderia de pureza, ferias y subastas nacionales",
            href: "https://nuestrocampo.elcomercio.es/la-asturiana-de-los-valles-es-la-mas-bella-y-noble/",
          },
          {
            label: "Nuestro Campo",
            title: "Si estuvieramos tan unidos como los ganaderos franceses, no estariamos pasandolo tan mal",
            theme: "Explotacion ganadera familiar y desafios sectoriales",
            href: "https://nuestrocampo.elcomercio.es/oscar-barrera-lucia-rey-mieldes-explotacion-ganadera/?ref=https%3A%2F%2Fwww.google.com%2F",
          },
          {
            label: "Nuestro Campo",
            title: "Ocho hectareas de arandanos sin aprovechar",
            theme: "Investigacion agricola, cooperativismo y abandono rural",
            href: "https://nuestrocampo.elcomercio.es/ocho-hectareas-de-arandanos-sin-aprovechar/",
          },
          {
            label: "Nuestro Campo",
            title: "Los rebanos de Asturiana de los Valles",
            theme: "Feria de montana y ganaderia tradicional",
            href: "https://nuestrocampo.elcomercio.es/los-rebanos-de-asturiana-de-los-valles-la-imagen-de-asturias/",
          },
          {
            label: "Otros",
            title: "Hay que buscar una solucion para los puestos de trabajo de Danone y para Salas",
            theme: "Economia y manifestacion",
            href: "https://www.elcomercio.es/asturias/danone-salas-trabajos-protesta-oviedo-solucion-20220627203436-nt.html",
          },
          {
            label: "Otros",
            title: "Aparece un desconocido soneto de Miguel Eugenio del Riego en memoria de su hermano",
            theme: "Cultura",
            href: "https://www.elcomercio.es/culturas/aparece-desconocido-soneto-miguel-eugenio-riego-memoria-20231025223424-nt.html",
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
            src: "assets/images/el-comercio/entrevistas/02-elecciones-fontaniella.png",
            alt: "El Comercio interview with Jose Luis Fontaniella",
          },
          {
            label: "03 / Investigadora CSIC",
            src: "assets/images/el-comercio/entrevistas/03-investigadora-csic-rosa-narcea.png",
            alt: "El Comercio interview with Carmen Martinez about the Rosa del Narcea project",
          },
          {
            label: "04 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/02-elecciones-oscar-ancares.png",
            alt: "El Comercio interview with Oscar Ancares",
          },
          {
            label: "05 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/03-elecciones-hidalgo.png",
            alt: "El Comercio interview with Sergio Hidalgo",
          },
          {
            label: "06 / Elecciones",
            src: "assets/images/el-comercio/entrevistas/04-elecciones-feito.png",
            alt: "El Comercio interview with Jose Ramon Feito Lorences",
          },
          {
            label: "07 / Cruz Roja",
            src: "assets/images/el-comercio/entrevistas/05-cruz-roja-andres.png",
            alt: "El Comercio interview with Andres Rodriguez from Cruz Roja",
          },
          {
            label: "08 / Elecciones",
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
            label: "02 / fondos europeos Next Generation",
            src: "assets/images/el-comercio/politica/02-fondos-europeos-next-generation.png",
            alt: "El Comercio article about European Next Generation funds and economic reactivation",
          },
          {
            label: "03 / Programa transicion justa",
            src: "assets/images/el-comercio/politica/02-programa-transicion-justa-mina-miura.png",
            alt: "El Comercio article about Mina Miura and the coal market in southwestern Asturias",
          },
          {
            label: "04 / elecciones municipales",
            src: "assets/images/el-comercio/politica/04-elecciones-municipales.png",
            alt: "El Comercio article about municipal election proposals for rural economy",
          },
          {
            label: "05 / Programa transicion justa",
            src: "assets/images/el-comercio/politica/03-programa-transicion-justa-restauracion-minas.png",
            alt: "El Comercio article about environmental restoration of mines and employment",
          },
          {
            label: "06 / Despoblacion rural",
            src: "assets/images/el-comercio/politica/04-despoblacion-rural.png",
            alt: "El Comercio article about rural depopulation and Caja Rural in Somiedo",
          },
          {
            label: "07 / Incidente IU",
            src: "assets/images/el-comercio/politica/05-incidente-iu.png",
            alt: "El Comercio article about a political incident involving IU in Cangas del Narcea",
          },
        ],
      },
      {
        title: "El Comercio / Sociedad",
        items: [
          {
            label: "01 / Salud",
            src: "assets/images/el-comercio/sociedad/03-salud.png",
            alt: "El Comercio article about access to healthcare on the Asturias and Galicia border",
          },
          {
            label: "02 / Brecha digital",
            src: "assets/images/el-comercio/sociedad/02-brecha-digital-valle-cibea.png",
            alt: "El Comercio article about the Valle del Cibea and the lack of mobile and internet coverage",
          },
          {
            label: "03 / Cruz Roja",
            src: "assets/images/el-comercio/sociedad/01-cruz-roja.png",
            alt: "El Comercio article about Cruz Roja volunteers and immigration support",
          },
          {
            label: "04 / Despoblacion rural",
            src: "assets/images/el-comercio/sociedad/02-historia.png",
            alt: "El Comercio article about El Fuejo and rural depopulation",
          },
          {
            label: "05 / Emprendimiento",
            src: "assets/images/el-comercio/sociedad/04-emprendimiento.png",
            alt: "El Comercio article about rural entrepreneurship in southwestern Asturias",
          },
        ],
      },
      {
        title: "El Comercio / Economia",
        items: [
          {
            label: "01 / Turismo rural",
            src: "assets/images/el-comercio/economia/01-turismo-rural.png",
            alt: "El Comercio article about rural tourism and a new generation of entrepreneurs",
          },
          {
            label: "02 / Mineria",
            src: "assets/images/el-comercio/economia/02-mineria.png",
            alt: "El Comercio article about Orovalle Minerals workers and mining rights",
          },
          {
            label: "03 / Precariedad",
            src: "assets/images/el-comercio/economia/03-precariedad.png",
            alt: "El Comercio article about precarious job offers and young workers",
          },
          {
            label: "04 / ganaderia",
            src: "assets/images/el-comercio/economia/04-ganaderia.png",
            alt: "El Comercio article about livestock prices and cattle farming",
          },
        ],
      },
      {
        title: "El Comercio / Cultura",
        items: [
          {
            label: "01 / Patrimonio",
            src: "assets/images/el-comercio/cultura/01-patrimonio-basilica-cangas.png",
            alt: "El Comercio article about the basilica of Cangas del Narcea and its heritage",
          },
          {
            label: "02 / Cultura popular rural",
            src: "assets/images/el-comercio/cultura/02-cultura-popular-rural.png",
            alt: "El Comercio article about Os Reises and rural popular culture",
          },
          {
            label: "03 / Ceramica",
            src: "assets/images/el-comercio/cultura/02-ceramica-negra.png",
            alt: "El Comercio article about black ceramics from Cangas del Narcea",
          },
          {
            label: "04 / Patrimonio",
            src: "assets/images/el-comercio/cultura/02-patrimonio-cornellana.png",
            alt: "El Comercio article about the monastery of Cornellana and heritage restoration",
          },
          {
            label: "05 / Literatura",
            src: "assets/images/el-comercio/cultura/03-literatura-casona.png",
            alt: "El Comercio article about Cangas writers and Alejandro Casona",
          },
        ],
      },
      {
        title: "El Comercio / Sucesos",
        items: [
          {
            label: "01 / Rally Tineo",
            src: "assets/images/el-comercio/sucesos/01-rally-tineo.png",
            alt: "El Comercio article about a fatal accident in the Rally Tineo",
          },
          {
            label: "02 / Suicidio",
            src: "assets/images/el-comercio/sucesos/02-suicidio.png",
            alt: "El Comercio article about the death of Diego Ruiz in Valdes",
          },
          {
            label: "03 / Redada",
            src: "assets/images/el-comercio/sucesos/03-redada.png",
            alt: "El Comercio article about a cocaine raid in Cangas del Narcea",
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
    kicker: "Corporate communications",
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
        subtitle: "El Economista.",
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
      if (item.href) {
        return `
          <article class="archive-reader-link-card">
            <span class="archive-reader-link-card__section">${escapeHtml(item.label)}</span>
            <a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.title)}
            </a>
            <p>${escapeHtml(item.theme)}</p>
          </article>
        `;
      }

      return `
        <figure class="archive-reader-page">
          <figcaption>${item.label}</figcaption>
          <img src="${item.src}" alt="${item.alt}" loading="lazy">
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
      const title = escapeHtml(video.title);
      const label = escapeHtml(video.label);

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
            <h3>${project.heading}</h3>
          </div>
          <div class="video-carousel__track" data-video-track aria-label="${project.heading}">
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
        <img src="${escapeHtml(logo.src)}" alt="${escapeHtml(logo.alt)}" loading="lazy">
      `,
    )
    .join("");
  const stats = (content.stats || [])
    .map(
      (stat) => `
        <article class="weber-stat-card">
          <span
            class="weber-stat-card__number"
            data-counter-value="${Number(stat.value) || 0}"
            data-counter-prefix="${escapeHtml(stat.prefix || "")}"
            data-counter-suffix="${escapeHtml(stat.suffix || "")}"
          >${escapeHtml(stat.prefix || "")}0${escapeHtml(stat.suffix || "")}</span>
          <h3>${escapeHtml(stat.title)}</h3>
          <p>${escapeHtml(stat.subtitle)}</p>
        </article>
      `,
    )
    .join("");

  return `
    <div class="weber-logo-cloud" aria-hidden="true">${logos}</div>
    <section class="weber-stats-panel">
      <div class="weber-stats-panel__intro">
        <p class="weber-stats-panel__subtitle">${escapeHtml(content.subtitle)}</p>
        <p>${escapeHtml(content.description)}</p>
      </div>
      <div class="weber-stats-grid">
        ${stats}
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
      <div class="video-carousel">
        <p class="video-carousel__intro">${content.intro}</p>
        ${renderVideoProjects(content.projects || [])}
      </div>
    `;
    activeReaderCleanup = initializeVideoCarousel();
  } else if (content.type === "stats") {
    panelBody.innerHTML = renderStatsPanel(content);
    activeReaderCleanup = initializeStatCounters();
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

dialog?.addEventListener("close", () => {
  activeReaderCleanup?.();
  activeReaderCleanup = null;
});

dialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
});
