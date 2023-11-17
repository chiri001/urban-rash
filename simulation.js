import { Vehicle } from './vehicle.js';
import { Highway } from './Highway.js';
import { MyCar } from './myCar.js';
import { Car } from './Car.js';
import { Bus } from './Bus.js';
import { Truck } from './Truck.js';

export class Simulation {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.vehicles = []; //array to hold all vehicles
        this.running = false; //track if simulation is running

        this.animationFrameId = null;
        this.ctx = ctx;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.highway = new Highway(canvasWidth, canvasHeight);

        //array to hold names of vehicles
        this.vehicle_names = ['Car', 'Truck', 'Bus'];

        //create the central car
        this.my_car = new MyCar(20, 2, 0, 1, canvasHeight);
    }

    add_vehicles(vehicle) {
        this.vehicles.push(vehicle); //adds a vehicle to the array
    }

    update() {
        this.vehicles.forEach((vehicle) => {
            vehicle.move(); //move the vehicles
        });

        //move the highway marking to simulate mvt
        this.highway.move_markings(2);

        //collision logic
    }

    draw() {
        //clear the canvas
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        //draw highway
        this.highway.draw(this.ctx);

        //draw central car
        this.my_car.draw(this.ctx);

        // draw the vehicles
        this.vehicles.forEach((vehicle) => {
            vehicle.draw(this.ctx); //draws all vehicles
        });
    }

    move(mvt_direction) {
        this.my_car.move(mvt_direction);
    }

    start() {
        if (!this.running) {
            this.running = true;

            //spawn new vehicles every three seconds
            this.spawnInterval = setInterval(() => this.spawn_vehicle(), 3000);

            this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.spawnInterval); //clear the spawn interval
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    loop() {
        this.update();
        this.draw(this.ctx);

        if (this.running) {
            this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
        }
    }

    spawn_vehicle() {
        //random vehicle generation
        const vehicle = this.getRandomVehicle();
        this.add_vehicles(vehicle);
    }

    getRandomVehicle() {
        const index = Math.floor(Math.random() * 3); //random index btwn 0 - 2

        const motor = this.vehicle_names[index];

        //create a random lane
        const randomLane = Math.floor(Math.random() * 3); //random lane 1, 2 or 3

        if (motor === 'Car') {
            return new Car(
                this.canvasWidth,
                2,
                0,
                randomLane,
                this.canvasHeight
            );
        } else if (motor === 'Bus') {
            return new Bus(
                this.canvasWidth,
                1.5,
                0,
                randomLane,
                this.canvasHeight
            );
        } else if (motor === 'Truck') {
            return new Truck(
                this.canvasWidth,
                1.5,
                0,
                randomLane,
                this.canvasHeight
            );
        }
    }
}
