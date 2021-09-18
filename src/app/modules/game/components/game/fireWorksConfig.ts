import { FireworksOptions } from "fireworks-js";

export const fireWorksConfig =
{
    hue: {
        min: 0,
        max: 345
    },
    delay: {
        min: 15,
        max: 15
    },
    rocketsPoint: 50,
    speed: 2,
    acceleration: 1,
    friction: 0.96,
    gravity: 1.2000000000000002,
    particles: 329,
    trace: 3,
    explosion: 10,
    autoresize: true,
    brightness: {
        min: 50,
        max: 80,
        decay: {
            min: 0.015,
            max: 0.03
        }
    },
    boundaries: {
        x: 50,
        y: 50,
        width: 900,
        height: 600,
        visible: false
    },
    sound: {
        enable: true,
        files: [
            "https://crashmax-dev.github.io/fireworks-js/sounds/explosion0.mp3",
            "https://crashmax-dev.github.io/fireworks-js/sounds/explosion1.mp3",
            "https://crashmax-dev.github.io/fireworks-js/sounds/explosion2.mp3"
        ],
        volume: {
            min: 4,
            max: 8
        }
    },
    mouse: {
        click: true,
        move: false,
        max: 3
    }
} as FireworksOptions