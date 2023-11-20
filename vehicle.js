//vehicle class

export class Vehicle {
    //constructor
    constructor(
        x,
        speed,
        direction,
        lane,
        canvasHeight,
        vehicleWidth,
        vehicleHeight
    ) {
        //coordinates of vehicle
        this.x = x;
        this.lane = lane;

        const laneHeight = canvasHeight / 3; //three equal lanes
        this.y = lane * laneHeight + laneHeight / 2; //middle of given lane

        this.canvasHeight = canvasHeight;

        this.speed = speed; //speed of vehicle
        this.direction = direction; //direction of vehicle
        this.color = this.getRandomColor(); //color of vehicle
        this.width = vehicleWidth;
        this.height = vehicleHeight;

        this.isExploded = false;
        this.explosionStartTime = null;
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

    //function to get dimensions of vehicls
    getBounds() {
        return {
            left: this.x - this.width / 2,
            right: this.x + this.width / 2,
            top: this.y - this.height / 2,
            bottom: this.y + this.height / 2,
        };
    }

    is_clicked(x, y) {
        const bounds = this.getBounds();

        console.log('x:', x);
        console.log('bounds.left:', bounds.left);
        console.log('bounds.right:', bounds.right);
        console.log('y:', y);
        console.log('bounds.top:', bounds.top);
        console.log('bounds.bottom:', bounds.bottom);

        return (
            x >= bounds.left &&
            x <= bounds.right &&
            y >= bounds.top &&
            y <= bounds.bottom
        );
    }

    change_color() {
        console.log('changing color');
        this.color = this.getRandomColor();
    }
}
