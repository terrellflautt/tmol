const { chromium } = require('playwright');

async function testTranscendentalSystem() {
    console.log('🚀 Starting Comprehensive Transcendental Journey System Test');
    console.log('==================================================');

    const browser = await chromium.launch({
        headless: false, // Show browser for visual verification
        slowMo: 1000    // Slow down for better observation
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    try {
        // 1. NAVIGATION TEST
        console.log('\n📍 PHASE 1: Navigation & Initial Load Test');
        console.log('-------------------------------------------');

        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');

        console.log('✅ Page loaded successfully');

        // Check if Begin Your Journey button exists
        const journeyButton = await page.locator('#transcendental-trigger');
        const buttonExists = await journeyButton.count() > 0;

        if (buttonExists) {
            console.log('✅ "Begin Your Journey" button found');

            // Test button click
            await journeyButton.click();
            console.log('✅ Journey button clicked');

            await page.waitForTimeout(2000);

            // Check if transcendental modal/content appears
            const transcendentalContent = await page.locator('#transcendental-content, .transcendental-overlay, .transcendental-modal');
            const modalAppears = await transcendentalContent.count() > 0;

            if (modalAppears) {
                console.log('✅ Transcendental interface appeared');

                // 2. PSYCHOLOGICAL QUESTIONS TEST
                console.log('\n🧠 PHASE 2: Psychological Questions Test');
                console.log('------------------------------------------');

                // Look for question container
                const questionContainer = await page.locator('.question-container, .transcendental-question, [data-question]');
                const hasQuestions = await questionContainer.count() > 0;

                if (hasQuestions) {
                    console.log('✅ Question interface found');

                    // Try to answer questions
                    for (let i = 0; i < 6; i++) {
                        console.log(`📝 Attempting to answer question ${i + 1}/6`);

                        // Look for answer options
                        const answerOptions = await page.locator('.answer-option, .option-button, button[data-option]');
                        const optionCount = await answerOptions.count();

                        if (optionCount > 0) {
                            console.log(`   Found ${optionCount} answer options`);

                            // Click first option
                            await answerOptions.first().click();
                            console.log('   ✅ Answer selected');

                            await page.waitForTimeout(1000);

                            // Look for next button or automatic progression
                            const nextButton = await page.locator('.next-button, .continue-button, button:has-text("Next")');
                            if (await nextButton.count() > 0) {
                                await nextButton.click();
                                console.log('   ✅ Proceeded to next question');
                            }
                        } else {
                            console.log(`   ⚠️  No answer options found for question ${i + 1}`);
                            break;
                        }

                        await page.waitForTimeout(1500);
                    }

                    // 3. PERSONALIZED CONTENT TEST
                    console.log('\n🎨 PHASE 3: Personalized Content Test');
                    console.log('--------------------------------------');

                    await page.waitForTimeout(3000);

                    // Check for poem/song content
                    const poemContent = await page.locator('.wisdom-poem, .poem-text, .transcendental-poem');
                    const songContent = await page.locator('.song-lyrics, .transcendental-song, .lyrics-container');

                    if (await poemContent.count() > 0) {
                        console.log('✅ Personalized poem content found');
                        const poemText = await poemContent.textContent();
                        console.log(`   Poem preview: "${poemText.substring(0, 100)}..."`);
                    }

                    if (await songContent.count() > 0) {
                        console.log('✅ Personalized song content found');
                        const songText = await songContent.textContent();
                        console.log(`   Song preview: "${songText.substring(0, 100)}..."`);
                    }

                    // 4. AUDIO SYSTEM TEST
                    console.log('\n🔊 PHASE 4: Audio System Test');
                    console.log('------------------------------');

                    // Check for audio controls
                    const audioControls = await page.locator('.audio-controls, .music-interface, button:has-text("Play"), .volume-control');
                    if (await audioControls.count() > 0) {
                        console.log('✅ Audio controls found');

                        // Test play functionality
                        const playButton = await page.locator('button:has-text("Play"), .play-button, [data-action="play"]');
                        if (await playButton.count() > 0) {
                            await playButton.click();
                            console.log('✅ Audio play button clicked');
                            await page.waitForTimeout(2000);
                        }
                    } else {
                        console.log('⚠️  No audio controls found');
                    }

                    // 5. MUSIC PLATFORM INTEGRATION TEST
                    console.log('\n🎵 PHASE 5: Music Platform Integration Test');
                    console.log('-------------------------------------------');

                    const platformButtons = await page.locator('.platform-btn, button[data-platform]');
                    const platformCount = await platformButtons.count();

                    if (platformCount > 0) {
                        console.log(`✅ Found ${platformCount} music platform options`);

                        // Test each platform
                        for (let i = 0; i < Math.min(platformCount, 4); i++) {
                            const platform = await platformButtons.nth(i);
                            const platformName = await platform.textContent();
                            console.log(`   Testing platform: ${platformName.trim()}`);

                            await platform.click();
                            await page.waitForTimeout(2000);

                            // Check if platform interface appears
                            const platformInterface = await page.locator('.youtube-player, .soundcloud-player, .apple-music-player, .silent-mode');
                            if (await platformInterface.count() > 0) {
                                console.log(`   ✅ ${platformName.trim()} interface loaded`);
                            }

                            await page.waitForTimeout(1000);
                        }
                    } else {
                        console.log('⚠️  No music platform options found');
                    }

                } else {
                    console.log('❌ No question interface found');
                }

            } else {
                console.log('❌ Transcendental interface did not appear');
            }

        } else {
            console.log('❌ "Begin Your Journey" button not found');
        }

        console.log('\n✨ TRANSCENDENTAL JOURNEY SYSTEM TEST COMPLETE');
        console.log('================================================');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }

    await page.waitForTimeout(5000); // Keep browser open for manual inspection
    await browser.close();
}

if (require.main === module) {
    testTranscendentalSystem();
}

module.exports = { testTranscendentalSystem };