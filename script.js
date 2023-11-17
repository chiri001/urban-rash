import { Simulation } from './simulation.js';
import { Car } from './car.js';
import { Bus } from './bus.js';
import { Truck } from './truck.js';

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('canvas').getContext('2d');

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const simulation = new Simulation(ctx, canvasWidth, canvasHeight);

    simulation.start(); //start simulation
});
