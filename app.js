const spotPrices = require('./SpotIntervalFee')

class ParkingLot {

    constructor(twoWheelerSpots, fourWheelsSpots, heavyVehiclesSpots, spotType) {
        this.twoWheelerSpots = twoWheelerSpots;
        this.fourWheelsSpots = fourWheelsSpots;
        this.heavyVehiclesSpots = heavyVehiclesSpots;
        this.spotType = spotType;
    }

    getMallFeesByInterval(vehicleType, entryDate, exitDate) {

        const hours = Math.ceil(Math.abs(new Date(entryDate) - new Date(exitDate)) / 36e5);

        if(vehicleType === "MOTORCYCLE") {
            return hours * spotPrices[this.spotType].twoWheelers[0].price;
        }else if(vehicleType === "FOURWHEELER") {
            return hours * spotPrices[this.spotType].fourWheelers[0].price
        }else {
            return hours * spotPrices[this.spotType].heavyVehicles[0].price
        }
    }

    getStadiumFeesByInterval(vehicleType, entryDate, exitDate) {

        let hours = Math.ceil(Math.abs(new Date(entryDate) - new Date(exitDate)) / 36e5);
        let cost = 0;
        let prices = this.getSpotPrices(vehicleType);

        for(let i=0; i<prices.length; i++) {
            const interval = prices[i].endTime - prices[i].startTime;
            cost += prices[i].price;

            if(interval === Infinity) {
                cost -= prices[i].price;
                cost += prices[i].price * hours;
                break;
            }else if(hours > interval) {
                hours -= interval;
            }else if(hours <= interval && hours > 0){
                break;
            }
        }  
        
        return cost;
    }

    getAirportFeesByInterval(vehicleType, entryDate, exitDate) {
        let hours = Math.ceil(Math.abs(new Date(entryDate) - new Date(exitDate)) / 36e5);
        let cost = 0;
        let prices = this.getSpotPrices(vehicleType);

        for(let i=0; i<prices.length; i++) {
            const interval = prices[i].endTime - prices[i].startTime;
            cost = prices[i].price;

            if(interval === Infinity) {
                const remTime = Math.ceil(hours/24)
                cost += remTime*prices[i].price;
                break;
            }else if(hours > interval) {
                hours -= interval;
            }else if(hours <= interval && hours > 0){
                break;
            }
        }  
        
        return cost;
    }

    parkVehicle(vehicleType) {

        const totalSpots = this.getSpotCount(vehicleType);

        if(totalSpots <= 0) {
            return {
                msg: "No spaces available"
            }
        }

        const ticketNumber = totalSpots;
        const spotNumber = totalSpots;       
        const entryDate = new Date("29-May-2022 14:44:07");
        this.decreaseSpots(vehicleType);
        
        const ticket = {
            ticketNumber,
            spotNumber,
            entryDate,
            vehicleType
        }

        return ticket
    }

    unparkVehicle(ticket) {

        const recieptNumber = ticket.ticketNumber;
        const entryDate = ticket.entryDate;
        const vehicleType = ticket.vehicleType;
        const exitDate = new Date("29-May-2022 15:40:07");
        const fees = this.getParkingFees(vehicleType, entryDate, exitDate);
        this.increaseSpots(vehicleType);

        const reciept = {
            recieptNumber,
            entryDate,
            exitDate,
            fees
        }

        return reciept;
    }

    getParkingFees(vehicleType, entryDate, exitDate) {
        let fees;
        if(this.spotType === "MALL") {
            fees = this.getMallFeesByInterval(vehicleType, entryDate, exitDate)
        }else if(this.spotType === "STADIUM") {
            fees = this.getStadiumFeesByInterval(vehicleType, entryDate, exitDate)
        }else {
            fees = this.getAirportFeesByInterval(vehicleType, entryDate, exitDate)
        }
        return fees;
    }

    decreaseSpots(vehicleType) {
        switch(vehicleType) {
            case "MOTORCYCLE":
                this.twoWheelerSpots--;
                break;
            case "FOURWHEELER":
                this.fourWheelsSpots--;
                break;
            case "HEAVYVEHICLE":
                this.heavyVehiclesSpots--;
                break;
        }
    }

    increaseSpots(vehicleType) {
        switch(vehicleType) {
            case "MOTORCYCLE":
                this.twoWheelerSpots++;
                break;
            case "FOURWHEELER":
                this.fourWheelsSpots++;
                break;
            case "HEAVYVEHICLE":
                this.heavyVehiclesSpots++;
                break;
        }
    }

    getSpotCount(vehicleType) {
        switch(vehicleType) {
            case "MOTORCYCLE":
                return this.twoWheelerSpots;
            case "FOURWHEELER":
                return this.fourWheelsSpots
            case "HEAVYVEHICLE":
                return this.heavyVehiclesSpots;
        }
    }

    getSpotPrices(vehicleType) {
        let prices;
        if(vehicleType === "MOTORCYCLE") {
            prices = spotPrices[this.spotType].twoWheelers;
        }else if(vehicleType === "FOURWHEELER") {
            prices = spotPrices[this.spotType].fourWheelers;
        }else {
            prices = spotPrices[this.spotType].heavyVehicles;
        }
        return prices;
    }
}

const parking = new ParkingLot(200, 500, 100, "AIRPORT")
const ticket1 = parking.parkVehicle("FOURWHEELER")
const ticket2 = parking.parkVehicle("MOTORCYCLE")
const ticket3 = parking.parkVehicle("MOTORCYCLE")
console.log(ticket1)
const reciept = parking.unparkVehicle(ticket1)
console.log(reciept)

