import { Simulation } from './simulation.js';
import { Car } from './car.js';
import { Bus } from './bus.js';
import { Truck } from './truck.js';
import { StartButton } from './StartButton.js';
import { StopButton } from './StopButton.js';
import { UpButton } from './UpButton.js';
import { DownButton } from './DownButton.js';

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('canvas').getContext('2d');

    const simulation = new Simulation(ctx, canvas.width, canvas.height);
    const controlPanel = document.getElementById('control-panel');

    const startBtn = new StartButton(simulation);
    startBtn.appendTo(controlPanel);

    const stopBtn = new StopButton(simulation);
    stopBtn.appendTo(controlPanel);

    const UpBtn = new UpButton(simulation);
    UpBtn.appendTo(controlPanel);

    const DownBtn = new DownButton(simulation);
    DownBtn.appendTo(controlPanel);

    simulation.start(); //start simulation
});
