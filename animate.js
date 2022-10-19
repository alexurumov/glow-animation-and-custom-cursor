function animate() {

    const glowingShade = document.querySelector('.glowing-shade');
    const cursor = document.querySelector('.cursor');
    const initialBG = window.getComputedStyle(glowingShade)['background-color'];

    /*
    * Animate the glowing shade
    */
    const glow = function (e) {
        /*
         * If the image has other elements on top!  
        */
        if (e.target.className !== 'glowing-shade') {
            return;
        }
        /*
         * Get the size of the element
        */
        const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
        /*
         * Get the current position of the cursor
        */
        const { clientX, clientY } = e;
        
        const currentPoint = {
            x: clientX, y: clientY
        }
        const angle = (anchor, point) => Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI;
        /*
         * Fix the anchor to be the center of the target element
        */
        const centerPoint = { 
            x: width / 2, 
            y: height / 2 
        }
        const degrees = angle(centerPoint, currentPoint);
        /*
         * Format the degrees from the function to correspond to the degrees accepted in the linear-gradient function
        */
        const intDegrees = degrees < 0 ? parseInt(360 + degrees) : parseInt(degrees);

        e.target.style.background = `linear-gradient(${intDegrees + 90}deg, transparent 0.01%, ${initialBG} 100%)`;
    };

    glowingShade.addEventListener('mousemove', glow);

    /*
    * Remove style when mouse 
    */
    const removeStyle = e => {
        e.target.style.background = initialBG;
    }

    glowingShade.addEventListener('mouseleave', removeStyle);

    /*
    * Make custom cursor 
    */
    const editCursor = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    };
    window.addEventListener('mousemove', editCursor);
};

animate();