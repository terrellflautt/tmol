const { chromium } = require('playwright');

async function testEasterEggSystem() {
    console.log('🥚 Starting Comprehensive Easter Egg Discovery System Test');
    console.log('========================================================');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 800
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    try {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');

        console.log('✅ Page loaded - Beginning Easter Egg Discovery Tests');

        // LEVEL 1: FIRST GLIMPSE (Easy to Find)
        console.log('\n🎯 LEVEL 1: FIRST GLIMPSE TEST');
        console.log('-------------------------------');

        // Test 1.1: The Foundation - Click on "Terrell"
        console.log('🏔️ Testing "The Foundation" - Clicking on "Terrell"');
        try {
            // Look for the hero title with "Terrell"
            const terrellElement = await page.locator('h1:has-text("Terrell"), .hero-title:has-text("Terrell"), .title-line:has-text("Terrell")');
            if (await terrellElement.count() > 0) {
                await terrellElement.click();
                console.log('   ✅ Clicked on "Terrell" text');
                await page.waitForTimeout(2000);

                // Check for easter egg message
                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message, [data-easter-egg]');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ❌ "Terrell" text element not found');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "The Foundation": ${error.message}`);
        }

        // Test 1.2: Future Vision - Click on "2025"
        console.log('\n⏰ Testing "Future Vision" - Clicking on "2025"');
        try {
            const year2025 = await page.locator('text=2025, :has-text("2025")');
            if (await year2025.count() > 0) {
                await year2025.click();
                console.log('   ✅ Clicked on "2025" text');
                await page.waitForTimeout(2000);

                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ❌ "2025" text element not found');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "Future Vision": ${error.message}`);
        }

        // Test 1.3: Tech King Revealed - Click logo 3 times
        console.log('\n👑 Testing "Tech King Revealed" - Triple-clicking logo');
        try {
            const logo = await page.locator('.nav-logo, .logo-text, [class*="logo"]');
            if (await logo.count() > 0) {
                for (let i = 0; i < 3; i++) {
                    await logo.click();
                    console.log(`   ✅ Logo click ${i + 1}/3`);
                    await page.waitForTimeout(500);
                }

                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ❌ Logo element not found');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "Tech King Revealed": ${error.message}`);
        }

        // LEVEL 2: DEEPER SIGHT
        console.log('\n🎯 LEVEL 2: DEEPER SIGHT TEST');
        console.log('------------------------------');

        // Test 2.1: The Completion - Click on periods
        console.log('⚪ Testing "The Completion" - Clicking on periods');
        try {
            const periods = await page.locator('text=/\\./');
            const periodCount = await periods.count();
            if (periodCount > 0) {
                await periods.first().click();
                console.log('   ✅ Clicked on a period');
                await page.waitForTimeout(2000);

                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ❌ No periods found');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "The Completion": ${error.message}`);
        }

        // Test 2.2: Inner Strength - Click letter "I"
        console.log('\n💪 Testing "Inner Strength" - Clicking letter "I"');
        try {
            // This is tricky - need to find standalone "I" letters
            await page.evaluate(() => {
                // Find text nodes containing "I" and make them clickable
                const walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );

                let textNode;
                while (textNode = walker.nextNode()) {
                    if (textNode.textContent.includes(' I ')) {
                        const span = document.createElement('span');
                        span.setAttribute('data-easter-egg', 'inner-strength');
                        span.style.cursor = 'pointer';
                        const parts = textNode.textContent.split(' I ');
                        textNode.textContent = parts[0] + ' ';
                        textNode.parentNode.insertBefore(span, textNode.nextSibling);
                        span.textContent = 'I';
                        const after = document.createTextNode(' ' + parts[1]);
                        textNode.parentNode.insertBefore(after, span.nextSibling);
                        break;
                    }
                }
            });

            const iElement = await page.locator('[data-easter-egg="inner-strength"]');
            if (await iElement.count() > 0) {
                await iElement.click();
                console.log('   ✅ Clicked on letter "I"');
                await page.waitForTimeout(2000);

                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ⚠️  Could not create clickable "I" element');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "Inner Strength": ${error.message}`);
        }

        // Test 2.3: The Bridge Builder - Hover contact link
        console.log('\n🌉 Testing "The Bridge Builder" - Hovering contact link');
        try {
            const contactLink = await page.locator('a[href="#contact"], .nav-link:has-text("Contact")');
            if (await contactLink.count() > 0) {
                await contactLink.hover();
                console.log('   ✅ Hovered over contact link');
                await page.waitForTimeout(4000); // Wait 3+ seconds as required

                const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message');
                if (await easterEggMessage.count() > 0) {
                    const message = await easterEggMessage.textContent();
                    console.log(`   ✅ Easter egg triggered: "${message.substring(0, 50)}..."`);
                } else {
                    console.log('   ⚠️  No easter egg message appeared');
                }
            } else {
                console.log('   ❌ Contact link not found');
            }
        } catch (error) {
            console.log(`   ❌ Error testing "The Bridge Builder": ${error.message}`);
        }

        // LEVEL 5: MASTER DISCOVERY
        console.log('\n🎯 LEVEL 5: MASTER DISCOVERY TEST');
        console.log('----------------------------------');

        // Test 5.1: The Code Master - Konami Code
        console.log('🎮 Testing "The Code Master" - Konami Code');
        try {
            // Execute Konami Code: ↑↑↓↓←→←→BA
            const konamiSequence = [
                'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                'KeyB', 'KeyA'
            ];

            for (const key of konamiSequence) {
                await page.keyboard.press(key);
                await page.waitForTimeout(200);
            }

            console.log('   ✅ Konami Code sequence executed');
            await page.waitForTimeout(2000);

            const easterEggMessage = await page.locator('.easter-egg-message, .discovery-message, .konami-message');
            if (await easterEggMessage.count() > 0) {
                const message = await easterEggMessage.textContent();
                console.log(`   ✅ Konami Code easter egg triggered: "${message.substring(0, 50)}..."`);
            } else {
                console.log('   ⚠️  No Konami Code easter egg message appeared');
            }
        } catch (error) {
            console.log(`   ❌ Error testing Konami Code: ${error.message}`);
        }

        // Test Logo Evolution System
        console.log('\n🔄 Testing Logo Evolution System');
        try {
            const logo = await page.locator('.nav-logo, .logo-text');
            if (await logo.count() > 0) {
                // Click logo multiple times to test evolution
                for (let i = 0; i < 10; i++) {
                    await logo.click();
                    await page.waitForTimeout(300);
                    console.log(`   Logo click ${i + 1}/10`);
                }

                // Check for visual changes
                const logoElement = await logo.first();
                const logoClasses = await logoElement.getAttribute('class');
                console.log(`   Logo classes after evolution: ${logoClasses}`);

                const logoStyles = await logoElement.evaluate((el) => {
                    const styles = window.getComputedStyle(el);
                    return {
                        transform: styles.transform,
                        color: styles.color,
                        fontSize: styles.fontSize
                    };
                });
                console.log('   Logo computed styles:', logoStyles);
            }
        } catch (error) {
            console.log(`   ❌ Error testing logo evolution: ${error.message}`);
        }

        console.log('\n✨ EASTER EGG DISCOVERY SYSTEM TEST COMPLETE');
        console.log('=============================================');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }

    await page.waitForTimeout(5000);
    await browser.close();
}

if (require.main === module) {
    testEasterEggSystem();
}

module.exports = { testEasterEggSystem };