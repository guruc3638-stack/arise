const fs = require('fs');

// Read backend courses
const backendPy = fs.readFileSync('d:/ARISE/backend/app/data/learning_bank.py', 'utf8');
const coursesRaw = JSON.parse(backendPy.replace('COURSES_SEED_DATA = ', '').trim());

// Transform for ARISE_DATA.courses
const frontendCourses = coursesRaw.map(c => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  description: c.description,
  category: c.category,
  duration: c.duration,
  lessonsCount: c.lessons.length,
  completedLessons: (c.id === 'course-dsa-101' ? c.lessons.length : 0),
  assessmentPassed: false,
  assessmentScore: null,
  skills: c.skills,
  curriculum: c.lessons.map(l => ({
    id: l.id,
    title: l.title,
    position: l.position,
    durationMinutes: l.duration_minutes,
    content_markdown: l.content_markdown,
    is_completed: (c.id === 'course-dsa-101'),
    status: (c.id === 'course-dsa-101' ? 'completed' : 'uncompleted')
  })),
  final_test: c.final_test
}));

const dataJsPath = 'd:/ARISE/js/data.js';
let dataJs = fs.readFileSync(dataJsPath, 'utf8');

// Find the start of courses: [ and end of courses: [ ... ]
const coursesStart = dataJs.indexOf('  courses: [');
if (coursesStart === -1) {
  console.error('Could not find courses: [ in data.js');
  process.exit(1);
}

// Find matching closing bracket for courses
let bracketCount = 0;
let coursesEnd = -1;
for (let i = coursesStart + '  courses: ['.length - 1; i < dataJs.length; i++) {
  if (dataJs[i] === '[') bracketCount++;
  else if (dataJs[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      coursesEnd = i + 1;
      break;
    }
  }
}

if (coursesEnd === -1) {
  console.error('Could not find closing bracket for courses in data.js');
  process.exit(1);
}

const replacement = '  courses: ' + JSON.stringify(frontendCourses, null, 2);
dataJs = dataJs.slice(0, coursesStart) + replacement + dataJs.slice(coursesEnd);

fs.writeFileSync(dataJsPath, dataJs, 'utf8');
console.log(`Successfully updated js/data.js with ${frontendCourses.length} structured courses!`);
