class SpotIntervalFee {

    constructor(startTime, endTime, price, vehicle) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.vehicle = vehicle;
    }
}

const prices = {
    MALL: {
        twoWheelers: [new SpotIntervalFee(0, 1, 10, "MOTORCYCLE")],
        fourWheelers: [new SpotIntervalFee(0, 1, 20, "FOURWHEELER")],
        heavyVehicles: [new SpotIntervalFee(0, 1, 50, "HEAVYVEHICLE")]
    },
    STADIUM: {
        twoWheelers: [
            new SpotIntervalFee(0, 4, 30, "MOTORCYCLE"),
            new SpotIntervalFee(4, 12, 60, "MOTORCYCLE"),
            new SpotIntervalFee(12, Infinity, 100, "MOTORCYCLE")
        ],
        fourWheelers: [
            new SpotIntervalFee(0, 4, 60, "FOURWHEELER"),
            new SpotIntervalFee(4, 12, 120, "FOURWHEELER"),
            new SpotIntervalFee(12, Infinity, 200, "FOURWHEELER")
        ]
    },
    AIRPORT: {
        twoWheelers: [
            new SpotIntervalFee(0, 1, 0, "MOTORCYCLE"),
            new SpotIntervalFee(1, 8, 40, "MOTORCYCLE"),
            new SpotIntervalFee(8, 24, 60, "MOTORCYCLE"),
            new SpotIntervalFee(24, Infinity, 80, "MOTORCYCLE")
        ],
        fourWheelers: [
            new SpotIntervalFee(0, 12, 60, "FOURWHEELER"),
            new SpotIntervalFee(12, 24, 80, "FOURWHEELER"),
            new SpotIntervalFee(12, Infinity, 100, "FOURWHEELER")
        ]
    }
}

module.exports = prices