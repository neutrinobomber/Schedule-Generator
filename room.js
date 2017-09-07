let roomId = 0;

class Room {
    constructor(name, isLab, numberOfSeats) {
        this.name = name;
        this.isLab = isLab;
        this.numberOfSeats = numberOfSeats;
        this.id = Room.getNextRoomId();
    }

    static getNextRoomId() {
        roomId = roomId + 1;
        return roomId;
    }

    static restartIDs() {
        roomId = 0;
    }
}

module.exports = { Room };