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

if (heroTicker && tickerTrack) {
  heroTicker.addEventListener("pointerenter", () => {
    heroTicker.classList.add("is-paused");
  });

  heroTicker.addEventListener("pointerleave", () => {
    if (!tickerIsDragging) {
      heroTicker.classList.remove("is-paused", "is-manual");
      tickerTrack.style.removeProperty("transform");
    }
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
    tickerIsDragging = true;
    tickerStartX = event.clientX;
    syncTickerOffsetFromAnimation();
    tickerStartOffset = tickerOffset;
    heroTicker.classList.add("is-dragging", "is-manual");
    heroTicker.setPointerCapture(event.pointerId);
  });

  heroTicker.addEventListener("pointermove", (event) => {
    if (!tickerIsDragging) {
      return;
    }

    applyTickerOffset(tickerStartOffset + event.clientX - tickerStartX);
  });

  heroTicker.addEventListener("pointerup", (event) => {
    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");
    heroTicker.releasePointerCapture(event.pointerId);
  });

  heroTicker.addEventListener("pointercancel", () => {
    tickerIsDragging = false;
    heroTicker.classList.remove("is-dragging");
  });

  heroTicker.addEventListener("mouseleave", () => {
    if (!tickerIsDragging) {
      heroTicker.classList.remove("is-paused", "is-manual");
      tickerTrack.style.removeProperty("transform");
    }
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
      const irelandCountry = svg.select(".is-ireland-country");
      const belgiumCountry = svg.select(".is-belgium-country");
      const denmarkCountry = svg.select(".is-denmark-country");

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

      if (mapSection && !irelandCountry.empty()) {
        irelandCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-ireland-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-ireland-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-ireland-callout-open");
          });
      }

      if (mapSection && !belgiumCountry.empty()) {
        belgiumCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-belgium-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-belgium-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-belgium-callout-open");
          });
      }

      if (mapSection && !denmarkCountry.empty()) {
        denmarkCountry
          .on("mouseenter focus", () => mapSection.classList.add("is-denmark-callout-open"))
          .on("mouseleave blur", () => mapSection.classList.remove("is-denmark-callout-open"))
          .on("click touchstart", (event) => {
            event.preventDefault();
            mapSection.classList.toggle("is-denmark-callout-open");
          });
      }

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
    body: [
      "Content and cultural communication work in Lille, France.",
      "Future assets: publishing samples, social content, layout work and multilingual editorial materials.",
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
    title: "El Comercio",
    body: [
      "Reporter and editor in Asturias.",
      "Future detail page: articles, interviews, video pieces, beats, regional stories and editorial highlights.",
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

function openPanel(panelKey) {
  const content = panelContent[panelKey];

  if (!content || !dialog || !panelKicker || !panelTitle || !panelBody) {
    return;
  }

  panelKicker.textContent = content.kicker;
  panelTitle.textContent = content.title;
  panelBody.innerHTML = `
    <ul>
      ${content.body.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
  dialog.showModal();
}

document.querySelectorAll("[data-panel]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openPanel(trigger.dataset.panel);
  });
});

closeButton?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
