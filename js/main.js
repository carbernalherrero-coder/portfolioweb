const yearElement = document.querySelector("#current-year");

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

const universe = document.querySelector(".career-universe");
const track = document.querySelector("#career-track");
const calendarRuler = document.querySelector(".calendar-ruler");
const currentYearElement = document.querySelector(".timeline-current-year");
const stations = Array.from(document.querySelectorAll(".timeline-station"));
const timelineStations = stations.filter(
  (station) =>
    !station.classList.contains("timeline-station--intro") &&
    !station.classList.contains("timeline-station--map") &&
    !station.classList.contains("timeline-station--archive"),
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const horizontalMedia = window.matchMedia("(min-width: 761px)");

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

// Editable map content: update these fields to change the hover panels.
const countryExperiences = {
  PER: {
    country: "Peru",
    date: "March-May 2026",
    role: "Digital Content Specialist / Volunteer",
    organization: "ONG Hilo Rojo, Trujillo",
    experience: [
      "Volunteering and community-based projects",
      "Digital content creation",
      "Educational and social-impact storytelling",
    ],
  },
  ECU: {
    country: "Ecuador",
    date: "January-March 2026",
    role: "Digital Content Specialist / Volunteer",
    organization: "Achuar community-based project",
    experience: [
      "Community-based volunteering",
      "Work with Achuar communities",
      "Ecotourism and territorial storytelling",
      "Digital content and visual documentation",
    ],
  },
  ESP: {
    country: "Spain",
    date: "2021-2026",
    role: "Journalist / Corporate Communication Consultant",
    organizationLabel: "Organizations",
    organization: "El Comercio, La Voz del Trubia, Weber Shandwick",
    experience: [
      "Newsroom and local reporting experience",
      "Corporate communication and public affairs",
      "Strategic content, media relations, and stakeholder work",
      "Editorial, audiovisual, and visual storytelling",
    ],
  },
  PRT: {
    country: "Portugal",
    date: "June-September 2015",
    role: "Sociocultural Project Volunteer",
    organization: "Retirement home project supported by the French Ministry of National Education",
    experience: [
      "Sociocultural projects in a retirement home",
      "Community engagement",
      "European volunteering and social-impact work",
    ],
  },
  FRA: {
    country: "France",
    date: "2015-2018",
    role: "Digital Content Manager / Sociocultural Project Coordinator",
    organizationLabel: "Organizations",
    organization: "Cultur'All Studio and Centre Social La Busette, Lille",
    experience: [
      "Audiovisual production",
      "Sociocultural projects",
      "Institutional communication",
      "French-language communication",
      "Project supported by the French Ministry of National Education",
    ],
  },
  IRL: {
    country: "Ireland",
    date: "2015-2016",
    role: "Linguistic Exchange Coordinator",
    organization: "Open World Education",
    experience: [
      "Coordination of language exchanges between Madrid and Dublin",
      "International education experience",
      "Youth mobility and intercultural communication",
    ],
  },
  BEL: {
    country: "Belgium",
    date: "November 2024",
    role: "Master's Programme Participant",
    organization: "University of Navarra - MCPC",
    experience: [
      "Engaging Europe Program",
      "European political and corporate communication",
      "EU institutions and Brussels public affairs context",
    ],
  },
  USA: {
    country: "United States · Washington State",
    date: "March 2025",
    role: "Postgraduate Student",
    organization: "George Washington University - Graduate School of Political Management",
    experience: [
      "GSPM Four-Week Program",
      "Political communication and public affairs",
      "Washington D.C. institutional and strategic communication environment",
    ],
  },
};

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setActiveMapCountry(countryCode) {
  document.querySelectorAll(".map-country").forEach((country) => {
    country.classList.remove("is-active");
    country.setAttribute("aria-pressed", "false");
  });
  document.querySelectorAll(`.map-country[data-country="${countryCode}"]`).forEach((country) => {
    country.classList.add("is-active");
    country.setAttribute("aria-pressed", "true");
  });
}

function updateMapTooltip(countryCode, pointerEvent) {
  const mapCard = document.querySelector(".world-map-card");
  const tooltip = document.querySelector(".map-tooltip");
  const data = countryExperiences[countryCode];

  if (!mapCard || !tooltip || !data) {
    return;
  }

  const organizationLabel = data.organizationLabel || "Organization";
  tooltip.innerHTML = `
    <p class="map-tooltip__eyebrow">${escapeHTML(countryCode)}</p>
    <h3>${escapeHTML(data.country)}</h3>
    <dl>
      <dt>Date</dt>
      <dd>${escapeHTML(data.date)}</dd>
      <dt>Role</dt>
      <dd>${escapeHTML(data.role)}</dd>
      <dt>${escapeHTML(organizationLabel)}</dt>
      <dd>${escapeHTML(data.organization)}</dd>
    </dl>
    <p class="map-tooltip__label">Experience</p>
    <ul>${data.experience.map((line) => `<li>${escapeHTML(line)}</li>`).join("")}</ul>
  `;

  if (pointerEvent && window.matchMedia("(min-width: 761px)").matches) {
    const rect = mapCard.getBoundingClientRect();
    const left = Math.min(rect.width - tooltip.offsetWidth - 16, Math.max(16, pointerEvent.clientX - rect.left + 18));
    const top = Math.min(rect.height - tooltip.offsetHeight - 16, Math.max(16, pointerEvent.clientY - rect.top + 18));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.right = "auto";
    tooltip.style.bottom = "auto";
  } else {
    tooltip.style.removeProperty("left");
    tooltip.style.removeProperty("top");
    tooltip.style.removeProperty("right");
    tooltip.style.removeProperty("bottom");
  }
}

function getMapCountryTarget(event) {
  const target = event.target.closest?.(".map-country, .map-country-hit");
  const map = document.querySelector(".portfolio-world-map");
  return target && map?.contains(target) ? target : null;
}

function activateMapCountry(countryElement, event) {
  const countryCode = countryElement.dataset.country;

  if (!countryExperiences[countryCode]) {
    return;
  }

  setActiveMapCountry(countryCode);
  updateMapTooltip(countryCode, event);
}

function initializeMapInteractions() {
  const map = document.querySelector(".portfolio-world-map");

  if (!map) {
    return;
  }

  map.addEventListener("mouseover", (event) => {
    const country = getMapCountryTarget(event);
    if (country) {
      activateMapCountry(country, event);
    }
  });

  map.addEventListener("mousemove", (event) => {
    const country = getMapCountryTarget(event);
    if (country?.classList.contains("is-active")) {
      updateMapTooltip(country.dataset.country, event);
    }
  });

  map.addEventListener("focusin", (event) => {
    const country = getMapCountryTarget(event);
    if (country) {
      activateMapCountry(country);
    }
  });

  map.addEventListener("click", (event) => {
    const country = getMapCountryTarget(event);
    if (country) {
      activateMapCountry(country, event);
    }
  });

  map.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const country = getMapCountryTarget(event);
    if (country) {
      event.preventDefault();
      activateMapCountry(country);
    }
  });
}

// Uses open-source TopoJSON when available; the inline SVG remains as a fallback.
async function renderPortfolioGeoMap() {
  const svgElement = document.querySelector(".portfolio-world-map");

  if (!svgElement || !window.d3 || !window.topojson) {
    return;
  }

  try {
    const world = await window.d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    const svg = window.d3.select(svgElement);
    const width = 960;
    const height = 520;
    const projection = window.d3.geoNaturalEarth1().fitExtent(
      [
        [18, 28],
        [942, 500],
      ],
      { type: "Sphere" },
    );
    const path = window.d3.geoPath(projection);
    const countries = window.topojson.feature(world, world.objects.countries).features;
    const countryIds = new Map([
      ["604", "PER"],
      ["218", "ECU"],
      ["724", "ESP"],
      ["620", "PRT"],
      ["250", "FRA"],
      ["372", "IRL"],
      ["056", "BEL"],
    ]);
    const washingtonState = {
      type: "Feature",
      id: "USA",
      properties: { name: "Washington State" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-124.8, 45.55],
            [-116.9, 45.55],
            [-116.9, 49.02],
            [-124.8, 49.02],
            [-124.8, 45.55],
          ],
        ],
      },
    };

    svg.select(".map-fallback").style("display", "none");
    svg.select(".map-countries").style("display", "none");
    svg.selectAll(".map-dynamic").remove();

    const landLayer = svg.insert("g", ".map-detail").attr("class", "map-dynamic map-dynamic--land");
    landLayer
      .selectAll("path")
      .data(countries)
      .join("path")
      .attr("class", "map-country-shape")
      .attr("d", path);

    landLayer
      .append("path")
      .datum(window.topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      .attr("class", "map-border-line")
      .attr("d", path);

    const highlightedCountries = countries.filter((country) => countryIds.has(String(country.id).padStart(3, "0")));
    const highlightLayer = svg.append("g").attr("class", "map-dynamic map-dynamic--highlight");
    highlightLayer
      .selectAll("path")
      .data(highlightedCountries)
      .join("path")
      .attr("class", "map-country")
      .attr("data-country", (country) => countryIds.get(String(country.id).padStart(3, "0")))
      .attr("role", "button")
      .attr("tabindex", "0")
      .attr("aria-pressed", "false")
      .attr("aria-label", (country) => countryExperiences[countryIds.get(String(country.id).padStart(3, "0"))].country)
      .attr("d", path);

    highlightLayer
      .append("path")
      .datum(washingtonState)
      .attr("class", "map-country")
      .attr("data-country", "USA")
      .attr("role", "button")
      .attr("tabindex", "0")
      .attr("aria-pressed", "false")
      .attr("aria-label", countryExperiences.USA.country)
      .attr("d", path);

    const hitFeatures = [
      ...highlightedCountries.map((feature) => ({
        feature,
        code: countryIds.get(String(feature.id).padStart(3, "0")),
      })),
      { feature: washingtonState, code: "USA" },
    ];

    highlightLayer
      .selectAll("circle")
      .data(hitFeatures)
      .join("circle")
      .attr("class", "map-country-hit")
      .attr("data-country", (item) => item.code)
      .attr("aria-hidden", "true")
      .attr("cx", (item) => path.centroid(item.feature)[0])
      .attr("cy", (item) => path.centroid(item.feature)[1])
      .attr("r", (item) => (["BEL", "IRL", "PRT", "USA"].includes(item.code) ? 15 : 12));

    svg.attr("viewBox", `0 0 ${width} ${height}`);
  } catch {
    document.querySelector(".map-fallback")?.removeAttribute("style");
    document.querySelector(".map-countries")?.removeAttribute("style");
  }
}

initializeMapInteractions();
renderPortfolioGeoMap();

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
