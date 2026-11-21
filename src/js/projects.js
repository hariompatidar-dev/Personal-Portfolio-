
const projects = [
  {
    title: "Spotify Clone",
    image: "./assets/images/spotify-clone.png",
    imageAlt: "Spotify Clone frontend website",

    description:
      "A frontend recreation of Spotify's web player, focusing on its dark interface, layout and visual styling.",

    about:
      "A recreation of Spotify's web player interface, exploring how a familiar music streaming experience can be recreated using frontend technologies.",

    focus:
      "Dark-themed interface, sidebar layout, music cards, content organization and responsive styling.",

    technologies: ["HTML", "CSS"],
  },

  {
    title: "Timeless Frames",
    image: "./assets/images/timeless-frames.png",
    imageAlt: "Timeless Frames camera photography website",

    description:
      "A photography-focused website with a cinematic visual direction, dark interface and elegant navigation.",

    about:
      "A camera and photography website designed around visual storytelling, using photography, typography and thoughtful page composition.",

    focus:
      "Cinematic visual design, background imagery, navigation structure and typography.",

    technologies: ["HTML", "CSS"],
  },

  {
    title: "Simon Says Game",
    image: "./assets/images/simon-says.png",
    imageAlt: "Simon Says Game with four colored buttons",

    description:
      "An interactive memory game where players repeat an increasingly challenging sequence of colors.",

    about:
      "A browser-based memory game inspired by the classic Simon Says game. Players follow a sequence and repeat it correctly to progress through levels.",

    focus:
      "DOM manipulation, event handling, game sequences, user interaction and JavaScript logic.",

    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

// DOM ELEMENTS
const projectImage = document.getElementById("projectImage");
const projectNumber = document.getElementById("projectNumber");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");

const projectTechnologies = document.getElementById(
  "projectTechnologies"
);

const projectAbout = document.getElementById("projectAbout");
const projectFocus = document.getElementById("projectFocus");

const detailProjectTitle = document.getElementById(
  "detailProjectTitle"
);

const detailProjectNumber = document.getElementById(
  "detailProjectNumber"
);

const projectIndicators = document.getElementById(
  "projectIndicators"
);

const prevButton = document.getElementById("prevProject");
const nextButton = document.getElementById("nextProject");

// CURRENT PROJECT INDEX
let currentProject = 0;


// RENDER PROJECT INDICATORS
function renderIndicators() {
  projectIndicators.innerHTML = projects
    .map(
      (project, index) => `
        <button
          type="button"
          data-index="${index}"
          aria-label="Go to ${project.title}"
          aria-current="${index === currentProject ? "true" : "false"}"
          class="size-3 rounded-full transition-all duration-300 ${
            index === currentProject
              ? "scale-125 bg-portfolio-ink"
              : "bg-portfolio-border hover:bg-portfolio-muted"
          }"
        ></button>
      `
    )
    .join("");
}


// UPDATE PROJECT CONTENT
function updateProject(index) {
  const project = projects[index];

  // PROJECT IMAGE
  projectImage.src = project.image;
  projectImage.alt = project.imageAlt;

  // PROJECT NUMBER
  const formattedNumber = String(index + 1).padStart(2, "0");
  const totalProjects = String(projects.length).padStart(2, "0");

  projectNumber.textContent = `${formattedNumber} / ${totalProjects}`;

  // PROJECT INFORMATION
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;

  // TECHNOLOGY TAGS
  projectTechnologies.innerHTML = project.technologies
    .map(
      (technology) => `
        <span class="rounded-lg bg-portfolio-border/40 px-4 py-2 text-sm font-medium">
          ${technology}
        </span>
      `
    )
    .join("");

  // PROJECT DETAILS
  projectAbout.textContent = project.about;
  projectFocus.textContent = project.focus;

  // DETAILS SECTION TITLE AND NUMBER
  detailProjectTitle.textContent = project.title;
  detailProjectNumber.textContent = formattedNumber;

  // UPDATE PAGINATION
  renderIndicators();
}


// PROJECT NAVIGATION
function goToProject(index) {
  // Continuous slider navigation
  currentProject = (index + projects.length) % projects.length;

  updateProject(currentProject);
}


// PREVIOUS PROJECT
prevButton.addEventListener("click", () => {
  goToProject(currentProject - 1);
});


// NEXT PROJECT
nextButton.addEventListener("click", () => {
  goToProject(currentProject + 1);
});


// CLICK ON PAGINATION DOTS
projectIndicators.addEventListener("click", (event) => {
  const indicator = event.target.closest("[data-index]");

  if (!indicator) return;

  goToProject(Number(indicator.dataset.index));
});


// KEYBOARD NAVIGATION
document.addEventListener("keydown", (event) => {
  // Avoid interfering with text inputs
  if (
    event.target.matches("input, textarea, select") ||
    event.target.isContentEditable
  ) {
    return;
  }

  if (event.key === "ArrowLeft") {
    goToProject(currentProject - 1);
  }

  if (event.key === "ArrowRight") {
    goToProject(currentProject + 1);
  }
});


// INITIALIZE PROJECT SLIDER
updateProject(currentProject);
