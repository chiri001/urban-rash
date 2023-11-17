export class Highway {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.laneCount = 3; //number of lanes for the road
    }

    draw(ctx) {
        const laneHeight = this.canvasHeight / this.laneCount;
        const highwayWidth = this.canvasWidth;

        //draw the highway
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, highwayWidth, this.canvasHeight);

        //lane markings
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);

        for (let i = 1; i < this.laneCount; i++) {
            ctx.beginPath();
            ctx.moveTo(0, laneHeight * i);
            ctx.lineTo(highwayWidth, laneHeight * i);
            ctx.stroke();
        }
    }
}
