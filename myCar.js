//Car class

import { Vehicle } from './Vehicle.js';

export class MyCar extends Vehicle {
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

        const carWidth = 30;
        const carHeight = 18;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(-carWidth / 2 + 8, -carHeight / 2, carWidth, carHeight);

        //cabin
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -carWidth / 2 - 5,
            carHeight / 2 - 9,
            carWidth / 2,
            carHeight / 2
        ); // Front cabin
        ctx.fillRect(
            carWidth / 2 + 5,
            carHeight / 2 - 9,
            carWidth / 2,
            carHeight / 2
        ); // Back cabin

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-carWidth / 4 + 2, carHeight / 2, 4, 0, 2 * Math.PI); // Rear wheel
        ctx.arc(carWidth / 4 + 15, carHeight / 2, 4, 0, 2 * Math.PI); // Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }
}