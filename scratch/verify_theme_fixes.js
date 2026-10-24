const fs = require('fs');

const stateCode = fs.readFileSync('js/state.js', 'utf8');
const appCode = fs.readFileSync('js/app.js', 'utf8');
const landingCode = fs.readFileSync('js/screens/landing-auth.js', 'utf8');
const layoutCss = fs.readFileSync('css/layout.css', 'utf8');
const tokensCss = fs.readFileSync('css/design-tokens.css', 'utf8');

console.log('Verification results:');
console.log('1. Sidebar theme toggle removed:', !appCode.includes('theme-toggle-sidebar-btn'));
console.log('2. Header navbar theme toggle present:', appCode.includes('theme-toggle-btn'));
console.log('3. Landing footer theme toggle removed:', !landingCode.includes('padding: 4px 10px; font-size: 11.5px;'));
console.log('4. Light theme tokens defined in design-tokens.css:', tokensCss.includes('[data-theme="light"]'));
console.log('5. Light theme card overrides defined in layout.css:', layoutCss.includes('[data-theme="light"] .glass-card'));
console.log('6. Light theme table overrides defined in layout.css:', layoutCss.includes('[data-theme="light"] .arise-table th'));
console.log('7. Light theme IDE overrides defined in layout.css:', layoutCss.includes('[data-theme="light"] .workspace-container'));
console.log('8. Global light safety net defined in layout.css:', layoutCss.includes('[data-theme="light"] *:not(.btn-primary)'));
console.log('9. updateToggles helper present in state.js:', stateCode.includes('updateToggles()'));
