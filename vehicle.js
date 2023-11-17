//vehicle class

export class Vehicle {
    //constructor
    constructor(x, speed, direction, lane, canvasHeight) {
        //coordinates of vehicle
        this.x = x;
        this.lane = lane;

        const laneHeight = canvasHeight / 3; //three equal lanes
        this.y = lane * laneHeight + laneHeight / 2; //middle of given lane

        this.speed = speed; //speed of vehicle
        this.direction = direction; //direction of vehicle
        this.color = this.getRandomColor(); //color of vehicle
    }

    //method to update the vehicle position
    move() {
        //adjust positions in direction of movement scaled by speed of vehicle
        this.x -= this.speed;
    }

    //method to draw a vehicle
    draw(ctx) {}

    //function to generate a random color code
    getRandomColor() {
        const r = Math.floor(Math.random() * 256); //get a random number btn 0 - 255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
}
