const {Board, Motor} = require("johnny-five");
const board = new Board();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;

http.listen(PORT, function () {
    console.log('http://localhost:8080');
});

//max speed 100
app.get('/', (req, res) => {
    const motor = new Motor({
        pins: {
            pwm: 3,
            dir: 12
        }
    });
    motor.forward();

    setTimeout(function () {
        motor.reverse(250);
        motor.stop();
        setTimeout(function () {
            motorFoward();
        },3000);
    }, 3000);
    return res.status(200).send({
        message: 'The motor is running'
    });
});

function motorFoward() {
    const motor = new Motor({
        pins: {
            pwm: 3,
            dir: 12
        }
    });
    motor.reverse(250);
    setTimeout(function () {
        motor.stop();
    }, 1000);
}
