//bus class

import { Vehicle } from './Vehicle.js';

export class Bus extends Vehicle {
    //constructor
    constructor(x, speed, direction, lane, canvasHeight) {
        //coordinates of vehicle
        super(x, speed, direction, lane, canvasHeight);
    }

    //method to draw a vehicle
    draw(ctx) {
        ctx.save(); //save current state
        ctx.translate(this.x, this.y); //move to vehicle location
        ctx.rotate(this.direction); //align to vehicle direction

        const busWidth = 100;
        const busHeight = 25;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(-busWidth / 2, -busHeight / 2, busWidth, busHeight);

        //windows
        ctx.fillStyle = 'white';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(-busWidth / 2 + 10 + i * 18, -busHeight / 2 + 5, 8, 8);
        }

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-busWidth / 4, busHeight / 2, 5, 0, 2 * Math.PI); // Rear wheel
        ctx.arc(busWidth / 4, busHeight / 2, 5, 0, 2 * Math.PI); // Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }
}
