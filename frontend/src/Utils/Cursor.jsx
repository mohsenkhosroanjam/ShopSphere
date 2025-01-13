import React from "react";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifetime = 0;
    }
}

class Canvas extends React.Component {
    state = {
        cHeight: 0,
        cWidth: 0,
        isHovered: false,
        currentOuterRadius: 30,
        currentMiddleRadius: 15,
        currentInnerRadius: 6,
        transitionSpeed: 0.15
    };

    canvas = React.createRef();

    componentDidMount = () => {
        // Set height and width on load because if set in state body isn't defined yet.
        this.setState({
            cHeight: window.innerHeight,
            cWidth: window.innerWidth
        });

        window.addEventListener(
            "resize",
            () => {
                this.setState({
                    cHeight: window.innerHeight,
                    cWidth: window.innerWidth
                });
            },
            false
        );

        // If the device supports cursors, start animation.
        if (matchMedia("(pointer:fine)").matches) {
            this.startAnimation();
            document.body.style.cursor = 'none';

            // Add hover detection
            this.setupHoverListeners();
        }
    };

    setupHoverListeners = () => {
        // List of selectable elements
        const selectables = 'a, button, input, select, textarea, [role="button"], [role="link"], .clickable';

        // Add hover listeners to document
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(selectables)) {
                this.setState({ isHovered: true });
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(selectables)) {
                this.setState({ isHovered: false });
            }
        });
    };

    startAnimation = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");

        const points = [];
        let mouseX = 0;
        let mouseY = 0;

        const addPoint = (x, y) => {
            const point = new Point(x, y);
            points.push(point);
        };

        document.addEventListener(
            "mousemove",
            ({ clientX, clientY }) => {
                mouseX = clientX - canvas.offsetLeft;
                mouseY = clientY - canvas.offsetTop;
                addPoint(mouseX, mouseY);
            },
            false
        );

        const animatePoints = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const duration = (0.7 * (1 * 1000)) / 60;

            // Draw the trail
            for (let i = 0; i < points.length; ++i) {
                const point = points[i];
                let lastPoint;

                if (points[i - 1] !== undefined) {
                    lastPoint = points[i - 1];
                } else lastPoint = point;

                point.lifetime += 1;

                if (point.lifetime > duration) {
                    points.shift();
                } else {
                    const lifePercent = point.lifetime / duration;
                    const spreadRate = 7 * (1 - lifePercent);

                    ctx.lineJoin = "round";
                    ctx.lineWidth = spreadRate;

                    // Updated trail colors to a more vibrant scheme
                    const red = Math.floor(255 - 255 * lifePercent);
                    const green = Math.floor(215 * lifePercent);
                    const blue = Math.floor(255);
                    ctx.strokeStyle = `rgb(${red},${green},${blue}`;

                    ctx.beginPath();
                    ctx.moveTo(lastPoint.x, lastPoint.y);
                    ctx.lineTo(point.x, point.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }

            // Target sizes based on hover state
            const targetMiddleRadius = this.state.isHovered ? 30 : 20;
            const targetInnerRadius = this.state.isHovered ? 5 : 5;

            // Smooth transition for radius changes
            this.setState(prevState => ({
                currentMiddleRadius: prevState.currentMiddleRadius + (targetMiddleRadius - prevState.currentMiddleRadius) * this.state.transitionSpeed,
                currentInnerRadius: prevState.currentInnerRadius + (targetInnerRadius - prevState.currentInnerRadius) * this.state.transitionSpeed
            }));
            // Draw medium circle
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, this.state.currentMiddleRadius, 0, Math.PI * 2, false);
            ctx.lineWidth = this.state.isHovered ? 4 : 3;
            ctx.strokeStyle = this.state.isHovered
                ? 'rgba(100, 0, 255, 0.8)'
                : 'rgba(100, 0, 255, 0.6)';
            ctx.stroke();
            ctx.closePath();

            // Draw inner filled circle
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, this.state.currentInnerRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.state.isHovered 
                ? 'rgba(80, 0, 200, 1)' 
                : 'rgba(80, 0, 200, 0.9)';
            ctx.fill();
            ctx.closePath();

            requestAnimationFrame(animatePoints);
        };

        animatePoints();
    };

    render = () => {
        const { cHeight, cWidth } = this.state;
        return (
            <canvas
                ref={this.canvas}
                width={cWidth}
                height={cHeight}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9998
                }}
            />
        );
    };
}

export default Canvas;
