// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import ActorManager from 'entities/actor_manager.js';
import CommandManager from 'components/command_manager/command_manager.js';
import FeatureManager from 'components/feature_manager/feature_manager.js';
import ObjectManager from 'entities/object_manager.js';
import PlayerManager from 'entities/player_manager.js';
import TextLabelManager from 'entities/text_label_manager.js';
import VehicleManager from 'entities/vehicle_manager.js';
import VirtualWorldManager from 'entities/virtual_world_manager.js';

import MockActor from 'entities/test/mock_actor.js';
import MockClock from 'base/test/mock_clock.js';
import MockObject from 'entities/test/mock_object.js';
import MockPawnInvoke from 'base/test/mock_pawn_invoke.js';
import MockPickup from 'entities/test/mock_pickup.js';
import MockPickupManager from 'entities/test/mock_pickup_manager.js';
import MockPlayer from 'entities/test/mock_player.js';
import MockTextLabel from 'entities/test/mock_text_label.js';
import MockVehicle from 'entities/test/mock_vehicle.js';

import Abuse from 'features/abuse/abuse.js';
import Communication from 'features/communication/communication.js';
import Gangs from 'features/gangs/gangs.js';
import MockAnnounce from 'features/announce/test/mock_announce.js';
import Radio from 'features/radio/radio.js';
import Settings from 'features/settings/settings.js';
import Streamer from 'features/streamer/streamer.js';

// The MockServer is a mocked implementation of the Server class that creates a mocked environment
// having mocked connected players. It will automatically be created before running a test, and
// will be disposed afterwards. There should not be any need to instantiate this class manually.
class MockServer {
    // Constructs the MockServer instance, and creates a mocked scenario on the server.
    constructor() {
        this.clock_ = new MockClock();
        this.pawnInvoke_ = new MockPawnInvoke();

        this.commandManager_ = new CommandManager();
        this.featureManager_ = new FeatureManager();

        this.actorManager_ = new ActorManager(MockActor /* actorConstructor */);
        this.objectManager_ = new ObjectManager(MockObject /* objectConstructor */);
        this.pickupManager_ = new MockPickupManager(MockPickup /* pickupConstructor */);
        this.playerManager_ = new PlayerManager(MockPlayer /* playerConstructor */);
        this.textLabelManager_ = new TextLabelManager(MockTextLabel /* textLabelConstructor */);
        this.vehicleManager_ = new VehicleManager(MockVehicle /* vehicleConstructor */);
        this.virtualWorldManager_ = new VirtualWorldManager();

        // Register features whose production versions are suitable for testing.
        this.featureManager_.registerFeaturesForTests({
            abuse: Abuse,
            announce: MockAnnounce,  // TODO: Move functionality to |communication|. See #309.
            communication: Communication,
            gangs: Gangs,
            radio: Radio,
            settings: Settings,
            streamer: Streamer
        });

        // Connect a series of fake players to the server.
        [
            { playerid: 0, name: 'Gunther' },
            { playerid: 1, name: 'Russell' },
            { playerid: 2, name: 'Lucy' }

        ].forEach(event => this.playerManager_.onPlayerConnect(event));
    }

    // ---------------------------------------------------------------------------------------------

    // Gets the database. Will throw an exception because it's not available in tests.
    get database() { throw new Error('The database is not available in tests.'); }

    // Gets the clock. Returns real values, but has additional methods available for testing.
    get clock() { return this.clock_; }

    // ---------------------------------------------------------------------------------------------

    // Gets the command manager. This is a real instance.
    get commandManager() { return this.commandManager_; }

    // Gets the feature manager. This is a real instance.
    get featureManager() { return this.featureManager_; }

    // ---------------------------------------------------------------------------------------------

    // Gets the real actor manager that maintains mocked actors.
    get actorManager() { return this.actorManager_; }

    // Gets the real object manager that maintains mocked objects.
    get objectManager() { return this.objectManager_; }

    // Gets the real pickup manager that maintains mocked pickups, but also has a number of utility
    // methods useful for testing purposes.
    get pickupManager() { return this.pickupManager_; }

    // Gets the real player manager that maintains mocked players.
    get playerManager() { return this.playerManager_; }

    // Gets the real text label manager that maintains mocked text labels.
    get textLabelManager() { return this.textLabelManager_; }

    // Gets the real vehicle manager that maintains mocked vehicles.
    get vehicleManager() { return this.vehicleManager_; }

    // Gets the Virtual World manager, responsible for allocating virtual worlds.
    get virtualWorldManager() { return this.virtualWorldManager_; }

    // ---------------------------------------------------------------------------------------------

    // Returns whether the Server instance is used to drive tests.
    isTest() { return true; }

    // ---------------------------------------------------------------------------------------------

    // Disposes the MockServer and uninitializes all owned objects.
    dispose() {
        this.featureManager_.dispose();
        this.commandManager_.dispose();

        this.virtualWorldManager_.dispose();
        this.vehicleManager_.dispose();
        this.textLabelManager_.dispose();
        this.playerManager_.dispose();
        this.pickupManager_.dispose();
        this.objectManager_.dispose();
        this.actorManager_.dispose();

        this.pawnInvoke_.dispose();
        this.clock_.dispose();
    }
}

export default MockServer;
