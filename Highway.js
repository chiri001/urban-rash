export class Highway {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.laneCount = 3; //number of lanes for the road

        this.markings = [];
        this.init_markings();
    }

    init_markings() {
        const laneHeight = this.canvasHeight / this.laneCount; //height of 1 lane
        const markingWidth = 10; //width of dotted markings
        const spacing = 20; //spaces btwn markings
        const totalMarkingWidth = markingWidth + spacing;

        //starting position of each dotted line
        for (let i = 0; i < this.canvasWidth; i += totalMarkingWidth) {
            this.markings.push(i);
        }
    }

    move_markings(speed) {
        // Move each marking to the left
        this.markings = this.markings.map((mark) => mark - speed);

        const markingWidth = 10;
        const spacing = 20;
        const totalMarkingWidth = markingWidth + spacing;

        // Add new markings at the right and remove old ones at the left
        const lastMarking = this.markings[this.markings.length - 1];

        //if there is enough spac on the right add new marking
        if (this.canvasWidth - lastMarking > totalMarkingWidth) {
            this.markings.push(lastMarking + totalMarkingWidth);
        }

        //remove old markings that have gone beyond the left edge
        this.markings = this.markings.filter(
            (mark) => mark > -totalMarkingWidth
        );
    }

    draw(ctx) {
        const laneHeight = this.canvasHeight / this.laneCount;

        // Draw the highway
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw lane markings
        ctx.fillStyle = 'white';
        this.markings.forEach((mark) => {
            for (let i = 1; i < this.laneCount; i++) {
                ctx.fillRect(mark, laneHeight * i - 2, 20, 4);
            }
        });
    }
}
