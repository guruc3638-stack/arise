const puppeteer = require('puppeteer');

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 900 });

        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('BROWSER ERR:', msg.text());
            }
        });

        console.log('Navigating to http://localhost:3000 ...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

        // Login as xyz@gmail.com / xyz12345
        await page.evaluate(async () => {
            const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'xyz@gmail.com', password: 'xyz12345' })
            });
            const data = await res.json();
            localStorage.setItem('arise_token', data.access_token);
            localStorage.setItem('arise_user', JSON.stringify(data.user));
            if (window.AppState) {
                window.AppState.token = data.access_token;
                window.AppState.user = data.user;
                if (window.AppState.loadUserData) {
                    await window.AppState.loadUserData();
                }
            }
        });

        await page.reload({ waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 1500));

        // Navigate to self-study screen
        console.log('Navigating to self-study screen...');
        await page.evaluate(() => {
            window.navigateTo('self-study');
        });
        await new Promise(r => setTimeout(r, 1500));

        // Inspect document cards rendered
        const cardData = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.document-card, .file-card, [data-doc-id], .study-doc-card, .doc-item'));
            // If cards not found by those classes, look inside the document library container
            const docContainer = document.querySelector('#study-library-list, .documents-grid, .doc-grid, #study-files-container, #study-docs-list') || document.body;
            const allText = docContainer.innerText;
            
            // Let's also check elements with text containing 'Course_'
            const matches = [];
            const docElements = document.querySelectorAll('*');
            docElements.forEach(el => {
                if (el.innerText && el.innerText.includes('Course_') && el.innerText.includes('.pdf') && el.children.length > 0 && el.children.length < 8) {
                    matches.push(el.innerText.replace(/\s+/g, ' ').trim());
                }
            });
            return {
                cardsFound: cards.length,
                matchesFound: matches.slice(0, 10),
                bodySnippet: allText.slice(0, 2000)
            };
        });

        console.log('Card data snippet:', cardData.matchesFound);
        console.log('Body snippet containing study docs:', cardData.bodySnippet.includes('Course_101'));

        // Check if "0.0 MB" appears anywhere in the Self Study page
        const zeroMbCheck = await page.evaluate(() => {
            return document.body.innerText.includes('0.0 MB');
        });
        console.log('Does "0.0 MB" appear anywhere on the page?:', zeroMbCheck);
        if (zeroMbCheck) {
            console.error('FAIL: "0.0 MB" was found in document display!');
        } else {
            console.log('PASS: No "0.0 MB" found!');
        }

        // Test opening a document
        console.log('\nOpening Course_101_Data_Structures_Assessment.pdf reader...');
        const opened = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, .doc-card, [data-doc-id], div'));
            const targetBtn = buttons.find(b => b.innerText && b.innerText.includes('Course_101_Data_Structures_Assessment.pdf'));
            if (targetBtn) {
                targetBtn.click();
                return true;
            }
            // fallback: call openDocument directly if exposed
            if (window.openStudyDocument) {
                window.openStudyDocument('Course_101_Data_Structures_Assessment.pdf');
                return true;
            }
            return false;
        });
        console.log('Document click initiated:', opened);
        await new Promise(r => setTimeout(r, 2000));

        // Verify reader open and page navigation
        const readerCheck = await page.evaluate(async () => {
            const pageResults = [];
            // Check current page content
            for (let targetPage = 1; targetPage <= 16; targetPage++) {
                // If there's a page select or next button
                if (targetPage > 1) {
                    const nextBtn = document.querySelector('#study-reader-next, .btn-next-page, [data-action="next-page"], button#next-page-btn');
                    const pageInput = document.querySelector('#study-page-num, #current-page-input');
                    if (nextBtn) {
                        nextBtn.click();
                    } else if (pageInput) {
                        pageInput.value = targetPage;
                        pageInput.dispatchEvent(new Event('change'));
                    } else if (window.goToStudyPage) {
                        window.goToStudyPage(targetPage);
                    }
                    await new Promise(r => setTimeout(r, 300));
                }

                const readerBody = document.querySelector('#pdf-canvas-container, .reader-content, #document-viewer, .pdf-page-container, #study-reader-body') || document.body;
                const text = readerBody.innerText || '';
                pageResults.push({
                    page: targetPage,
                    textLen: text.length,
                    hasTheory: text.includes('Theoretical Framework') || text.includes('Framework') || text.includes('Array') || text.includes('Section'),
                    hasCode: text.includes('class') || text.includes('def') || text.includes('struct') || text.includes('Algorithm') || text.includes('function') || text.includes('Code'),
                    snippet: text.slice(0, 100).replace(/\s+/g, ' ')
                });
            }
            return pageResults;
        });

        console.log('Reader check across 16 pages:');
        let allPagesValid = true;
        for (const res of readerCheck) {
            console.log(`Page ${res.page}: len=${res.textLen}, snippet="${res.snippet}"`);
            if (res.textLen < 150) {
                console.error(`  FAIL: Page ${res.page} text length is too low (${res.textLen})`);
                allPagesValid = false;
            }
        }

        if (allPagesValid && !zeroMbCheck) {
            console.log('\n>>> FRONTEND SELF STUDY READER & DOCUMENT CARDS VERIFIED 100% SUCCESS! <<<');
        } else {
            console.log('\nSome frontend checks did not meet expectations. Review logs.');
        }

    } catch (e) {
        console.error('Test execution error:', e);
    } finally {
        if (browser) await browser.close();
    }
})();
