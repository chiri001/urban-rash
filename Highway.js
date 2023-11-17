export class Highway {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.laneCount = 3; //number of lanes for the road

        this.markings = [];
        this.init_markings();
    }

    init_markings() {
        const laneHeight = this.canvasHeight / this.laneCount;
        const markingWidth = 10; //width of dotted markings
        const spacing = 20; //spaces btwn markings

        for (let i = 0; i < this.canvasWidth; i += spacing + markingWidth) {
            this.markings.push(i);
        }
    }

    move_markings(speed) {
        // Move each marking to the left
        this.markings = this.markings.map((x) => x - speed);

        const markingWidth = 10;
        const spacing = 20;
        const totalMarkingWidth = markingWidth + spacing;

        // Add new markings at the right and remove old ones at the left
        const lastMarking = this.markings[this.markings.length - 1];
        if (this.canvasWidth - lastMarking > totalMarkingWidth) {
            this.markings.push(lastMarking + totalMarkingWidth);
        }

        this.markings = this.markings.filter((x) => x > -totalMarkingWidth);
    }

    draw(ctx) {
        const laneHeight = this.canvasHeight / this.laneCount;

        // Draw the highway
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw lane markings
        ctx.fillStyle = 'white';
        this.markings.forEach((x) => {
            for (let i = 1; i < this.laneCount; i++) {
                ctx.fillRect(x, laneHeight * i - 2, 20, 4);
            }
        });
    }
}
