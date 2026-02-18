const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// path to project data
const dataPath = path.join(process.cwd(), 'data','projects.json');

// a blocking call just for learning
function  loadProjects(){
    const raw = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(raw);
    return data.projects;
}

// ── GET /api/projects ──────────────────────────────────────
// Returns only active projects. Supports optional ?q= filter.
router.get('/projects', (req, res) => {
    try {
        let projects = loadProjects();

        // Only return active projects
        projects = projects.filter(p => p.active === true);

        // search filter
        const query = req.query.q;
        if (query) {
            const q = query.toLowerCase();
            projects = projects.filter(p => {
                const inTitle = p.title.toLowerCase().includes(q);
                const inTagline = p.tagline.toLowerCase().includes(q);
                const inDescription = p.description.toLowerCase().includes(q);
                const inStack = p.stack.some(s => s.toLowerCase().includes(q));
                const inTags = p.tags.some(t => t.toLowerCase().includes(q));
                return inTitle || inTagline || inDescription || inStack || inTags;
            });
        }

        res.status(200).json(projects);
    } catch (err) {
        console.error('Error loading projects:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ── GET /api/projects/:id ──────────────────────────────────
// Returns a single project by ID (even if inactive).
router.get('/projects/:id', (req, res) => {
    try {
        const projects = loadProjects();
        const project = projects.find(p => p.id === req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (err) {
        console.error('Error loading project:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
