var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    assetVersion: '20260327-3',
    title: 'Nguy\u1ec5n Quang D\u0169ng',
    role: 'Front-end Developer (Intern/Fresher)',
    location: 'Thu Duc, Ho Chi Minh City',
    summary: 'Information Technology student passionate about building user interfaces (UI/UX). Seeking a Front-end Developer internship to apply knowledge of HTML, CSS, JavaScript, and frameworks such as React or Vue in real projects.',
    focusTitle: 'Build polished web interfaces that are practical for real deployment.',
    focusText: 'Ready to join a front-end internship, contribute responsive UI work, and keep improving through hands-on product delivery.',
    objective: 'Looking for an internship where I can strengthen front-end engineering skills, collaborate with a real team, and build products that solve practical problems.',
    highlights: [
      'Responsive UI with React',
      'Clean HTML, CSS, JavaScript foundation',
      'Fast learner with product mindset'
    ],
    objectiveCards: [
      'Build responsive interfaces that are easy to use and easy to maintain.',
      'Contribute React-based features and improve UI quality in real products.',
      'Grow through teamwork, shipping, and real deployment workflows.'
    ],
    contacts: [
      { label: 'Phone', value: '0786121131', href: 'tel:0786121131' },
      { label: 'Date of Birth', value: '14/12/2004' },
      { label: 'Email', value: 'dungquangnguyen118@gmail.com', href: 'mailto:dungquangnguyen118@gmail.com' },
      { label: 'GitHub', value: 'github.com/MIDAS1412', href: 'https://github.com/MIDAS1412' },
      { label: 'Location', value: 'Thu Duc, Ho Chi Minh City' }
    ],
    profileFacts: [
      { label: 'Ngay sinh', value: '14/12/2004' },
      { label: 'Vi tri', value: 'Front-end Developer Intern/Fresher' },
      { label: 'Dinh huong', value: 'UI implementation and product-facing frontend work' }
    ],
    education: {
      major: 'Software Engineering',
      school: 'University of Technology',
      period: '2022 - 2026'
    },
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Vue.js (Basic)',
      'Flutter (Basic)',
      'Responsive Design',
      'Problem Solving',
      'Self Learning',
      'Communication'
    ],
    tools: ['Git', 'GitHub', 'Figma', 'Postman'],
    projects: [
      {
        role: 'Frontend Developer',
        period: '03/2025 - 05/2025',
        name: 'Medical Appointment Scheduling System',
        description: 'Developed a web-based system that allows patients to search doctors and schedule medical appointments online.',
        bullets: [
          'Built responsive user interfaces using React.',
          'Implemented login/register flows plus user and doctor dashboards.',
          'Handled doctor listing, appointment scheduling, and time slot management.'
        ],
        tech: 'HTML, CSS, JavaScript, React',
        repo: 'https://github.com/soncoderz/DACS-hospitalweb.git'
      },
      {
        role: 'Frontend Developer',
        period: '09/2025 - 12/2025',
        name: 'Movie Ticket Booking System',
        description: 'Developed a movie ticket booking web application where users can browse movies, view showtimes, select seats, and book tickets online.',
        bullets: [
          'Built the complete user-facing booking experience.',
          'Created an admin dashboard for movie, showtime, and booking management.',
          'Integrated APIs for managing movie data, showtimes, and user bookings.'
        ],
        tech: 'React, JavaScript, Tailwind CSS',
        repo: 'https://github.com/billtai26/movies-app.git'
      }
    ],
    certificates: [
      {
        year: '2024',
        name: 'Machine Learning with Python',
        href: 'https://www.credly.com/badges/c0530081-e435-480b-b26b-9f2df4701fde/public_url'
      },
      {
        year: '2024',
        name: 'Python for Data Science',
        href: 'https://www.credly.com/badges/a35472c1-fe85-429f-add0-5133a751edac/public_url'
      },
      {
        year: '2025',
        name: 'Communication and Teamwork Skills'
      }
    ]
  });
});

module.exports = router;
