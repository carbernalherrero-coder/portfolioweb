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
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const panelContent = {
  journalism: {
    kicker: "Journalism chapter",
    title: "Newsrooms, interviews and editorial judgement",
    body: [
      "This chapter will gather reporting, editing and video work from El Comercio, La Voz del Trubia and cultural publications.",
      "Key evidence to add: article links, scans, interview excerpts, newsroom photos, video embeds and thematic collections.",
      "CV signals: +80 print, digital and video stories, +50 regional public-opinion interviews, and more than five years in journalism.",
    ],
  },
  interviews: {
    kicker: "Fieldwork",
    title: "Public-opinion interviews as narrative infrastructure",
    body: [
      "A future interactive map can connect sources, regions, themes and story outcomes.",
      "This is where the portfolio can show how listening, context and reporting become public-facing stories.",
    ],
  },
  corporate: {
    kicker: "Corporate PR",
    title: "Strategy, media angles and public affairs",
    body: [
      "Weber Shandwick becomes the corporate communications case: plans, reports, press materials, social copy, op-eds and events.",
      "The page should describe the type of work and skills without exposing confidential client information.",
      "CV signals: +4 clients tracked and 100+ press releases, op-eds, Tier-1 content, social copy and events.",
    ],
  },
  lavoz: {
    kicker: "Journalism folder",
    title: "La Voz del Trubia",
    body: [
      "Folder reserved for local journalism work, clips, articles, interviews and editorial materials.",
      "Future assets: article screenshots, publication links, photos, documents and short context notes for each piece.",
    ],
  },
  social: {
    kicker: "Social projects",
    title: "Education, culture and community work",
    body: [
      "Hilo Rojo, Cultur'All Studio, Centre Social La Busette and Centro Agora form the human chapter of the story.",
      "Future assets: workshop photos, program logos, camp material, short videos, project posters and participant-safe documentation.",
      "CV signals: +10 socio-cultural events, +6 summer camps, +4 writing/video courses and +14 workshops.",
    ],
  },
  academic: {
    kicker: "Academic background",
    title: "Degrees and training as a research archive",
    body: [
      "The George Washington University, School of Political Management - Master - 2025.",
      "Universidad de Navarra - Corporate Communication & Public Affairs - Master - 2024/2025.",
      "Trazos, Escuela de Arte Digital - Graphic Design & Web Development - 600 hours - 2020.",
      "French Ministry of Education / CEMEA - BPJEPS Loisirs Tous Publics scholarship - 2015.",
      "La Factoria del Guion - Film and TV Screenwriting - 600 hours - 2013.",
      "Universidad Rey Juan Carlos - Journalism and Communication Double Degree - 2010/2015.",
    ],
  },
  navarra: {
    kicker: "Academic folder",
    title: "Universidad de Navarra / UNAV",
    body: [
      "Folder reserved for Corporate Communication & Public Affairs work from 2024/2025.",
      "Future assets: academic papers, presentations, certificates, project summaries, class work and selected research.",
    ],
  },
  george: {
    kicker: "Academic folder",
    title: "The George Washington University",
    body: [
      "Folder reserved for the School of Political Management master work from 2025.",
      "Future assets: public affairs projects, strategy documents, academic work, certificates and presentation materials.",
    ],
  },
  ministry: {
    kicker: "Education folder",
    title: "French Ministry of Education / CEMEA",
    body: [
      "Folder reserved for the BPJEPS Loisirs Tous Publics scholarship and education-related training from 2015.",
      "Future assets: certificates, program documents, workshop material and evidence from educational/cultural projects.",
    ],
  },
  busette: {
    kicker: "Social projects folder",
    title: "Centre Social La Busette",
    body: [
      "Folder reserved for project management and socio-cultural work in Lille, France.",
      "Future assets: project notes, workshop material, photographs, program documents and impact summaries.",
    ],
  },
  openworld: {
    kicker: "Education folder",
    title: "Open World Education",
    body: [
      "Folder reserved for language exchange coordination between Dublin and Madrid.",
      "Future assets: program descriptions, coordination material, photos, documents and testimonials if available.",
    ],
  },
  ufcv: {
    kicker: "Education folder",
    title: "UFCV",
    body: [
      "Folder reserved for summer camp coordination experience in France.",
      "Future assets: camp programs, education materials, role descriptions and selected visual documentation.",
    ],
  },
  hilo: {
    kicker: "2026 case",
    title: "NGO Hilo Rojo | Trujillo, Peru",
    body: [
      "Role: Education Volunteer & Digital Content Assistant.",
      "Future detail page: field diary, workshop documentation, digital content, photos, videos and project outcomes.",
    ],
  },
  weber: {
    kicker: "2025 case",
    title: "Weber Shandwick | Madrid, Spain",
    body: [
      "Role: Corporate Communications Consultant.",
      "Future detail page: methodology, campaign structure, public affairs learning, media monitoring and non-confidential examples.",
    ],
  },
  comercio: {
    kicker: "2021-2024 case",
    title: "El Comercio | Asturias, Spain",
    body: [
      "Role: Reporter & Editor.",
      "Future detail page: articles, interviews, videos, topics, beats and editorial highlights.",
    ],
  },
  culturall: {
    kicker: "2016-2018 case",
    title: "Cultur'All Studio | Lille, France",
    body: [
      "Role: Assistant Content Manager.",
      "Future detail page: publishing, social media, design/layout learning and multilingual editorial bridge work.",
    ],
  },
  brumaria: {
    kicker: "2014 case",
    title: "Brumaria Publisher | Madrid, Spain",
    body: [
      "Role: Assistant Editorial Project Executive.",
      "Future detail page: editorial production, art publishing, references and project documentation.",
    ],
  },
  works: {
    kicker: "Academic works",
    title: "A future library for research, papers and projects",
    body: [
      "This section can store academic papers, presentations, certificates, final projects and selected essays.",
      "Recommended filters: Public Affairs, Journalism, Strategy, Design, Screenwriting and AI tools.",
    ],
  },
  skills: {
    kicker: "Skills",
    title: "Tools connected to evidence",
    body: [
      "Languages: Spanish native, English C1 Advanced, French B2.",
      "Digital & Analytics: GA4, Google Search Console, SEO, Semrush, Excel, Brandwatch.",
      "Content, Social & CRM: HubSpot, Mailchimp, Hootsuite, WordPress, Notion, Trello.",
      "Design & Video Production: Adobe Creative Cloud, Canva, Microsoft Office, Filmora.",
      "AI & Creative Tools: ChatGPT, Gemini, Claude, Perplexity, Midjourney, Sora2, Kling AI and VEO3.",
    ],
  },
  references: {
    kicker: "References",
    title: "Testimonials as proof of working style",
    body: [
      "References from Jose Antonio Ortega and Dario Corbeira can become a dedicated credibility section.",
      "Recommendation: publish short excerpts and keep personal contact details private unless you explicitly want them visible.",
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Availability and next step",
    body: [
      "This panel can become a contact page with email, LinkedIn, downloadable CV and a short professional availability note.",
      "For production, contact data should be presented intentionally rather than copied automatically from the CV.",
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
