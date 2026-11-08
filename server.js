const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ============================================
// PLACEHOLDER API ROUTES (for future database)
// ============================================

// Example: Get all achievements
app.get('/api/achievements', (req, res) => {
  // TODO: Replace this with real database query
  // Example with SQLite / PostgreSQL / MongoDB later
  const achievements = [
    { id: 1, title: "1st Place - Regional Science Fair", year: 2025, description: "Built an AI-powered study assistant app." },
    { id: 2, title: "Captain - School Soccer Team", year: "2024-Present", description: "Led team to district finals." },
    { id: 3, title: "Dean's List", year: "2024 & 2025", description: "Maintained 3.9+ GPA." },
    { id: 4, title: "Volunteer of the Year", year: 2025, description: "120+ hours teaching coding." }
  ];
  res.json(achievements);
});

// Example: Get skills
app.get('/api/skills', (req, res) => {
  // TODO: Connect to database
  const skills = ["HTML & CSS", "JavaScript", "Python", "React (Learning)", "Git & GitHub"];
  res.json(skills);
});

// Example: Contact form endpoint (future)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // TODO: Save to database or send email
  console.log('New contact message:', { name, email, message });
  res.json({ success: true, message: "Message received! (This is a placeholder)" });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resume website running at http://localhost:${PORT}`);
  console.log(`API endpoints available at /api/achievements and /api/skills`);
});