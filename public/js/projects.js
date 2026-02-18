/**
 * projects.js — Fetches and renders project cards + details
 */

const projectsContainer = document.getElementById('projects-container');
const projectDetails = document.getElementById('project-details');
const detailsContent = document.getElementById('details-content');
const closeDetailsBtn = document.getElementById('close-details');

// ── Search (Stretch Goal) ──────────────────────────────────
const searchContainer = document.createElement('div');
searchContainer.classList.add('search-bar');
searchContainer.innerHTML = `
  <input type="text" id="search-input" placeholder="Search projects…" />
  <button id="search-btn">Search</button>
`;
projectsContainer.parentNode.insertBefore(searchContainer, projectsContainer);

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// ── Fetch & Render Project Cards ───────────────────────────
async function fetchProjects(query = '') {
  try {
    const url = query
      ? `/api/projects?q=${encodeURIComponent(query)}`
      : '/api/projects';

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const projects = await res.json();
    renderCards(projects);
  } catch (err) {
    projectsContainer.innerHTML = `
      <p class="error-message">Failed to load projects. Please try again later.</p>
    `;
    console.error('Error fetching projects:', err);
  }
}

function renderCards(projects) {
  if (projects.length === 0) {
    projectsContainer.innerHTML = `
      <p class="error-message">No projects found matching your search.</p>
    `;
    return;
  }

  projectsContainer.innerHTML = projects.map(project => {
    const cover = project.images.find(img => img.type === 'cover');
    return `
    <div class="project-card" data-id="${project.id}">
      ${cover ? `<img src="${cover.path}" alt="${cover.alt}" />` : ''}
      <h3>${project.title}</h3>
      <p>${project.tagline}</p>
      <div class="tags">
        ${project.stack.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
      <button class="details-btn" onclick="showDetails('${project.id}')">Details</button>
    </div>`;
  }).join('');
}

// ── Fetch & Render Project Details ─────────────────────────
async function showDetails(id) {
  try {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const project = await res.json();
    renderDetails(project);
  } catch (err) {
    detailsContent.innerHTML = `
      <p class="error-message">Failed to load project details. Please try again.</p>
    `;
    projectDetails.style.display = 'block';
    console.error('Error fetching project details:', err);
  }
}

function renderDetails(project) {
  const coverImage = project.images.find(img => img.type === 'cover');
  const screenshotImage = project.images.find(img => img.type === 'screenshot');

  detailsContent.innerHTML = `
    <h2>${project.title}</h2>
    <p><em>${project.tagline}</em></p>
    <p>${project.description}</p>

    <div class="tags" style="margin-bottom: 1.5rem;">
      ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <div class="detail-images">
      ${coverImage ? `<img src="${coverImage.path}" alt="${coverImage.alt}" />` : ''}
      ${screenshotImage ? `<img src="${screenshotImage.path}" alt="${screenshotImage.alt}" />` : ''}
    </div>
  `;

  // Hide the project list, show the details section
  projectsContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  projectDetails.style.display = 'block';
}

// ── Close Details ──────────────────────────────────────────
closeDetailsBtn.addEventListener('click', () => {
  projectDetails.style.display = 'none';
  projectsContainer.style.display = 'grid';
  searchContainer.style.display = 'flex';
});

// ── Search Handlers ────────────────────────────────────────
searchBtn.addEventListener('click', () => {
  fetchProjects(searchInput.value.trim());
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchProjects(searchInput.value.trim());
  }
});

// ── Initial Load ───────────────────────────────────────────
fetchProjects();
