import { Simulation } from './simulation.js';
import { Car } from './car.js';
import { Bus } from './bus.js';
import { Truck } from './truck.js';
import { StartButton } from './StartButton.js';
import { StopButton } from './StopButton.js';
import { UpButton } from './UpButton.js';
import { DownButton } from './DownButton.js';
import { ZoomInButton } from './ZoomIn.js';
import { ZoomOutButton } from './ZoomOut.js';
import { RestartButton } from './RestartBtn.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const simulation = new Simulation(ctx, canvas.width, canvas.height, canvas);
    const controlPanel = document.getElementById('control-panel');

    const startBtn = new StartButton(simulation);
    startBtn.appendTo(controlPanel);

    const stopBtn = new StopButton(simulation);
    stopBtn.appendTo(controlPanel);

    const UpBtn = new UpButton(simulation);
    UpBtn.appendTo(controlPanel);

    const DownBtn = new DownButton(simulation);
    DownBtn.appendTo(controlPanel);

    const ZoomInBtn = new ZoomInButton(simulation);
    ZoomInBtn.appendTo(controlPanel);

    const ZoomOutBtn = new ZoomOutButton(simulation);
    ZoomOutBtn.appendTo(controlPanel);

    const RestartBtn = new RestartButton(simulation);
    RestartBtn.appendTo(restartButton);

    simulation.start(); //start simulation
});
