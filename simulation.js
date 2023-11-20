import { Vehicle } from './vehicle.js';
import { Highway } from './Highway.js';
import { MyCar } from './myCar.js';
import { Car } from './Car.js';
import { Bus } from './Bus.js';
import { Truck } from './Truck.js';
import { Collision } from './Collision.js';
import { SimulationListener } from './simulationListener.js';

export class Simulation {
    constructor(ctx, canvasWidth, canvasHeight, canvas) {
        this.vehicles = []; //array to hold all vehicles
        this.collisions = []; //holds collissions
        this.running = false; //track if simulation is running
        this.zoomLevel = 1; //normal
        this.total_score = 0;

        this.animationFrameId = null;
        this.ctx = ctx;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.highway = new Highway(canvasWidth, canvasHeight);

        //array to hold names of vehicles
        this.vehicle_names = ['Car', 'Truck', 'Bus'];

        //create the central car
        this.my_car = new MyCar(canvasWidth / 2, 2, 0, 1, canvasHeight);

        //add mouse listener
        this.canvas = canvas;
        new SimulationListener(this);
    }

    add_vehicles(vehicle) {
        this.vehicles.push(vehicle); //adds a vehicle to the array
    }

    update() {
        this.vehicles.forEach((vehicle) => {
            vehicle.move(); //move the vehicles
        });

        //move the highway marking to simulate mvt
        this.highway.move_markings(4);

        //collision logic
        this.check_for_collision();
    }

    check_for_collision() {
        for (let i = 0; i < this.vehicles.length; i++) {
            if (Collision.isColliding(this.my_car, this.vehicles[i])) {
                Collision.handle_collision(this.my_car);
                Collision.handle_collision(this.vehicles[i]);

                const collisionPoint = {
                    x: (this.vehicles[i].x + this.my_car.x) / 2,
                    y: (this.vehicles[i].y + this.my_car.y) / 2,
                    vehicle: this.my_car,
                    timestamp: Date.now(),
                };

                this.collisions.push(collisionPoint);

                // Remove collided vehicles
                this.vehicles.splice(i, 1); //Remove the first vehicle

                // Adjust loop counters since array length has changed
                i--;
            }
        }
    }

    check_vehicle_click(x, y) {
        this.vehicles.forEach((vehicle) => {
            if (vehicle.is_clicked(x, y)) {
                vehicle.change_color();
            }
        });

        if (this.my_car.is_clicked(x, y)) {
            this.my_car.change_color();
        }
    }

    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.highway.draw(this.ctx); //Draw highway

        this.ctx.save(); // Save the current state of the canvas

        //center on my car
        this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);

        //Apply the zoom scale
        this.ctx.scale(this.zoomLevel, this.zoomLevel);

        //Translate back
        this.ctx.translate(-this.canvasWidth / 2, -this.canvasHeight / 2);

        //Draw all vehicles
        this.vehicles.forEach((vehicle) => vehicle.draw(this.ctx));

        //Draw my_car
        if (!this.my_car.isExploded) {
            this.my_car.draw(this.ctx);
            //add point one to score everytime draw is called without mycar colliding
            this.calculate_score(1);
            document.getElementById(
                'score-panel'
            ).innerText = `Score: ${this.total_score}`;
        }

        //draw collission
        this.collisions.forEach((collision) => {
            if (Date.now() - collision.timestamp < 2000) {
                //draws collission for 2 seconds
                Collision.draw_collision(collision.vehicle, this.ctx);
            } else {
                //game over logic
                this.game_over();
            }
        });

        //Remove old collisions
        this.collisions = this.collisions.filter(
            (collision) => Date.now() - collision.timestamp < 2000
        );

        this.ctx.restore(); //Restore the canvas state after drawing
    }

    game_over() {
        this.running = false;
        clearInterval(this.spawnInterval); //clear the spawn interval
        cancelAnimationFrame(this.animationFrameId);

        document.getElementById('game-over-popup').style.display = 'block';
        document.getElementById(
            'final_score'
        ).innerText = `Score: ${this.total_score}`;
    }

    calculate_score(val) {
        this.total_score += val;
    }

    restart_game() {
        //reset game state
        this.my_car = new MyCar(
            this.canvasWidth / 2,
            2,
            0,
            1,
            this.canvasHeight
        );
        this.vehicles = [];
        this.collisions = [];
        this.total_score = 0;

        document.getElementById('game-over-popup').style.display = 'none';
        this.start();
    }

    move(mvt_direction) {
        if (this.running) {
            this.my_car.move(mvt_direction);
        }
    }

    start() {
        if (!this.running) {
            this.running = true;

            //spawn new vehicles every three seconds
            this.spawnInterval = setInterval(() => this.spawn_vehicle(), 4000);

            this.animationFrameId = requestAnimationFrame(
                this.game_loop.bind(this)
            );
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.spawnInterval); //clear the spawn interval
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    zoomIn() {
        if (this.running) {
            this.zoomLevel *= 1.1; //zoom in factor
        }
    }

    zoomOut() {
        if (this.running) {
            this.zoomLevel /= 1.1; //zoom out divisor
        }
    }

    game_loop() {
        this.update();
        this.draw(this.ctx);

        if (this.running) {
            this.animationFrameId = requestAnimationFrame(
                this.game_loop.bind(this)
            );
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
                2,
                0,
                randomLane,
                this.canvasHeight
            );
        } else if (motor === 'Truck') {
            return new Truck(
                this.canvasWidth,
                2,
                0,
                randomLane,
                this.canvasHeight
            );
        }
    }
}
