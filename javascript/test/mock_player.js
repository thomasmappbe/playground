// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

// Mocked player. Has the same interface and abilities as a real Player object, except that it does
// not rely on the SA-MP server to be available, nor communicates with Pawn.
class MockPlayer {
    constructor(playerId, event) {
        this.id_ = playerId;

        this.name_ = event.name || 'Player' + playerId;
        this.level_ = event.level || Player.LEVEL_PLAYER;
        this.ipAddress_ = event.ipAddress || '127.0.0.1';

        this.connected_ = true;
    }

    get id() { return this.id_; }
    get connected() { return this.connected_; }

    get name() { return this.name_; }
    set name(value) { this.name_ = value; }

    get ipAddress() { return this.ipAddress_; }

    get level() { return this.level_; }
    set level(value) { this.level_ = value; }

    sendMessage() {}

    // TODO: Add new getters and setters as required.
}

exports = MockPlayer;