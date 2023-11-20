//Truck class

import { Vehicle } from './Vehicle.js';

export class Truck extends Vehicle {
    //constructor
    constructor(x, speed, direction, lane, canvasHeight) {
        //coordinates of vehicle
        super(x, speed, direction, lane, canvasHeight, 82, 25);
    }

    //method to draw a vehicle
    draw(ctx) {
        ctx.save(); //save current state
        ctx.translate(this.x, this.y); //move to vehicle location
        ctx.rotate(this.direction); //align to vehicle direction

        //draw a truck
        const truckWidth = 200;
        const truckHeight = 60;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -truckWidth / 2,
            -truckHeight / 2,
            truckWidth / 2 + 60,
            truckHeight
        );

        //cabin
        ctx.fillStyle = this.color;
        const cabinWidth = 48;
        const cabinHeight = 35;
        ctx.fillRect(
            cabinWidth,
            -cabinHeight / 2 + 13,
            cabinWidth,
            cabinHeight
        );

        //windows
        ctx.fillStyle = 'white';
        ctx.fillRect(-truckWidth / 2 + 125, -truckHeight + 35, 30, 20);

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-truckWidth / 4, truckHeight / 2, 13, 0, 2 * Math.PI); // Rear wheel
        ctx.arc(truckWidth / 4, truckHeight / 2, 13, 0, 2 * Math.PI); // Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }
}
