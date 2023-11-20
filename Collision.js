/*
 *               Rennie Kipchirchir
 *                 Collision.js
 *                  11/19/23
 *
 *  The file contains the implementation of collision logic when drawings
 *  collide
 *
 */

export class Collision {
    //function to check if two vehicles are colliding
    // params: two vehicles to check if they are colliding
    //returns true if they are colliding and false otherwise
    static isColliding(vehicle_1, vehicle_2) {
        //get bounds
        const v1 = vehicle_1.getBounds();
        const v2 = vehicle_2.getBounds();

        //check if the two drawings are being drawn at the same point
        return (
            v1.right >= v2.left &&
            v1.left <= v2.right &&
            v1.bottom >= v2.top &&
            v1.top <= v2.bottom
        );
    }

    //function that updates that vehicle has exploded
    //params: two vehicle that has collided
    static handle_collision(vehicle) {
        //draw the collission
        vehicle.isExploded = true;
        vehicle.explosionStartTime = Date.now();
    }

    //function that draws the collision
    //params: takes a colliding vehicle and a 2d canvas
    static draw_collision(vehicle, ctx) {
        if (!vehicle.isExploded) return; //nothing to do

        const explosionDuration = 2000;

        const elapsedTime = Date.now() - vehicle.explosionStartTime;
        if (elapsedTime > explosionDuration) {
            vehicle.isExploded = false; //reset the explosion state
            return;
        }

        ctx.save();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(vehicle.x, vehicle.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}
