/*
*               Rennie Kipchirchir
*                   bus.js
*                  11/19/23
*
*  The file creates a bus vehicle.
*
*/

import { Vehicle } from './Vehicle.js';

export class Bus extends Vehicle {
    //constructor
    //params: starting x-coordinate, speed of vehicle, direction of movement,
    //        lane position, heihgt of the the canvas
    constructor(x, speed, direction, lane, canvasHeight) {
        super(x, speed, direction, lane, canvasHeight, 150, 60);
    }

    //method to draw a bus
    //param: 2d canvas
    draw(ctx) {
        ctx.save(); //save current state
        ctx.translate(this.x, this.y); //move to vehicle location
        ctx.rotate(this.direction); //align to vehicle direction

        const busWidth = 150;
        const busHeight = 60;

        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(-busWidth / 2, -busHeight / 2, busWidth, busHeight);

        //windows
        ctx.fillStyle = 'white';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(
                -busWidth / 2 + 18 + i * 25,
                -busHeight / 2 + 10,
                20,
                20
            );
        }

        //wheel
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(-busWidth / 4, busHeight / 2, 11, 0, 2 * Math.PI); // Rear wheel
        ctx.arc(busWidth / 4, busHeight / 2, 11, 0, 2 * Math.PI); // Front wheel

        ctx.fill();

        ctx.restore(); //restore vancas state
    }
}
