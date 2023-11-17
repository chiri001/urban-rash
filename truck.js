//Truck class

import { Vehicle } from './Vehicle.js';

export class Truck extends Vehicle {
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

        //draw a truck
        const truckWidth = 80;
        const truckHeight = 25;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -truckWidth / 2,
            -truckHeight / 2,
            truckWidth / 2 + 22,
            truckHeight
        );

        //cabin
        ctx.fillStyle = this.color;
        const cabinWidth = 20;
        const cabinHeight = 15;
        ctx.fillRect(
            truckWidth / 2 - cabinWidth,
            -cabinHeight / 2 + 5,
            cabinWidth,
            cabinHeight
        );

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-truckWidth / 4, truckHeight / 2, 5, 0, 2 * Math.PI); // Rear wheel
        ctx.arc(truckWidth / 4, truckHeight / 2, 5, 0, 2 * Math.PI); // Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }
}
