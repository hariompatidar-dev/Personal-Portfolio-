async function loadNavbar() {
  const navbarPlaceholder = document.querySelector("#site-header");

  if (!navbarPlaceholder) return;

  try {
    const response = await fetch("./components/navbar.html");

    if (!response.ok) {
      throw new Error(`Navbar loading failed: ${response.status}`);
    }

    const navbarHTML = await response.text();

    // Replace the placeholder with the actual navbar element
    navbarPlaceholder.outerHTML = navbarHTML;

    // Identify the current page
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Highlight the active navigation link
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const linkPage = new URL(
        link.getAttribute("href"),
        window.location.href,
      ).pathname
        .split("/")
        .pop();

      if (linkPage === currentPage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  } catch (error) {
    console.error("Navbar error:", error);
  }
}

loadNavbar();

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-nav-link]").forEach((link) => {
  const linkPage = new URL(link.href).pathname.split("/").pop();
  const active = linkPage === currentPage;

  link.classList.toggle("border-b-2", active);
  link.classList.toggle("border-portfolio-coral", active);
  link.classList.toggle("font-semibold", active);
  link.classList.toggle("font-medium", !active);

  if (active) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});
