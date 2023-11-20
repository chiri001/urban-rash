//Car class

import { Vehicle } from './Vehicle.js';

export class MyCar extends Vehicle {
    //constructor
    constructor(x, speed, direction, lane, canvasHeight) {
        //coordinates of vehicle
        super(x, speed, direction, lane, canvasHeight, 110, 48);
    }

    //method to draw a vehicle
    draw(ctx) {
        ctx.save(); //save current state
        ctx.translate(this.x, this.y); //move to vehicle location
        ctx.rotate(this.direction); //align to vehicle direction

        const carWidth = 60;
        const carHeight = 48;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(-carWidth / 2, -carHeight / 2, carWidth, carHeight);

        //cabin
        ctx.fillStyle = this.color;
        ctx.fillRect(
            carWidth / 2,
            carHeight / 2 - 24,
            carWidth / 2,
            carHeight / 2
        ); // front cabin

        ctx.fillRect(
            -carWidth / 2 - 20,
            carHeight / 2 - 24,
            carWidth / 3,
            carHeight / 2
        ); // back cabin

        //windows
        ctx.fillStyle = 'white';
        for (let i = 0; i < 2; i++) {
            ctx.fillRect(-carWidth / 2 + 7 + i * 25, -carHeight + 28, 20, 20);
        }

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-carWidth / 4 - 8, carHeight / 2, 9, 0, 2 * Math.PI); //Rear wheel
        ctx.arc(carWidth / 4 + 15, carHeight / 2, 9, 0, 2 * Math.PI); //Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }

    move(mvt_direction) {
        if (mvt_direction === 'Up' && this.lane > 0) {
            this.lane--; //move up a lane
        } else if (mvt_direction === 'Down' && this.lane < 2) {
            this.lane++; //move down a lane
        }

        //recalculate the y coordinate:
        const laneHeight = this.canvasHeight / 3;
        this.y = this.lane * laneHeight + laneHeight / 2; //center on lane
    }
}
