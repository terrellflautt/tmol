// EMERGENCY FIX: Remove all yellow overlays immediately
(function() {
    'use strict';

    console.log('🚨 Emergency yellow overlay fix active');

    function removeYellowOverlays() {
        // Remove any element with yellow/gold background that covers the screen
        const allElements = document.querySelectorAll('*');

        allElements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const bg = styles.backgroundColor;
            const position = styles.position;
            const width = parseFloat(styles.width);
            const height = parseFloat(styles.height);

            // Check if element is:
            // 1. Fixed or absolute positioned
            // 2. Full screen (or close to it)
            // 3. Has yellow/gold background
            const isFullScreen = (position === 'fixed' || position === 'absolute') &&
                                  width > window.innerWidth * 0.8 &&
                                  height > window.innerHeight * 0.8;

            const isYellow = bg.includes('255, 255, 0') ||
                            bg.includes('255,255,0') ||
                            bg.includes('#ff0') ||
                            bg.includes('#ffd700') ||
                            bg.includes('gold') ||
                            bg.includes('yellow');

            if (isFullScreen && isYellow) {
                console.warn('🗑️ Removing yellow overlay:', el);
                el.remove();
            }
        });

        // Also remove specific problem classes
        const problemClasses = [
            '.social-trace',
            '.yellow-overlay',
            '.gold-overlay',
            '[style*="background: yellow"]',
            '[style*="background:yellow"]',
            '[style*="background: rgba(255, 255, 0"]',
            '[style*="background: rgb(255, 255, 0"]'
        ];

        problemClasses.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                console.warn('🗑️ Removing problem element:', selector, el);
                el.remove();
            });
        });
    }

    // Run immediately
    removeYellowOverlays();

    // Run after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeYellowOverlays);
    }

    // Run after everything loads
    window.addEventListener('load', removeYellowOverlays);

    // Keep checking for 10 seconds
    const interval = setInterval(removeYellowOverlays, 100);
    setTimeout(() => {
        clearInterval(interval);
        console.log('✅ Emergency yellow overlay fix completed');
    }, 10000);

})();
