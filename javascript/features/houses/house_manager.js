// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

const HouseDatabase = require('features/houses/house_database.js');
const HouseEntranceController = require('features/houses/house_entrance_controller.js');
const HouseInterior = require('features/houses/house_interior.js');
const HouseLocation = require('features/houses/house_location.js');
const HouseParkingLot = require('features/houses/house_parking_lot.js');
const HouseSettings = require('features/houses/house_settings.js');
const HouseVehicleController = require('features/houses/house_vehicle_controller.js');

// The house manager orchestrates all details associated with housing, manages data and responds to
// player connection and disconnection events.
class HouseManager {
    constructor(economy, friends, gangs, location) {
        this.database_ = new HouseDatabase();
        this.dataLoadedPromise_ = new Promise(resolver =>
            this.dataLoadedResolver_ = resolver);

        this.locations_ = new Set();

        // Responsible for all entrances and exits associated with the locations.
        this.entranceController_ =
            new HouseEntranceController(this, economy, friends, gangs, location);

        // Responsible for all vehicles associated with the houses.
        this.vehicleController_ = new HouseVehicleController();
    }

    // Gets an iterator that can be used to iterate over the house locations.
    get locations() { return this.locations_.values(); }

    // Gets the number of house locations that have been made available.
    get locationCount() { return this.locations_.size; }

    // Loads all defined houses from the database to the house manager, creating the House instances
    // and associated objects where required.
    async loadHousesFromDatabase() {
        const locationMap = new Map();

        const locations = await this.database_.loadLocations();
        locations.forEach(([id, locationInfo]) => {
            const location = new HouseLocation(id, locationInfo);
            this.locations_.add(location);

            locationMap.set(location.id, location);
        });

        const houses = await this.database_.loadHouses();
        houses.forEach((house, locationId) => {
            const location = locationMap.get(locationId);
            if (!location) {
                console.log(
                    'Warning: Unassociated house (' + house.id + ') for location #' + locationId);
                return;
            }

            if (!location.isAvailable()) {
                console.log(
                    'Warning: Duplicated houses (' + house.id + ') for location #' + locationId);
                return;
            }

            const houseSettings = new HouseSettings(house, location.parkingLotsMap);
            const houseInterior = new HouseInterior(house);  // TODO: Is this the right thing to do?

            // Associate the house's settings and interior with the |location|.
            location.setHouse(houseSettings, houseInterior);

            // Create the vehicles associated with the |location| in the vehicle controller.
            for (const vehicle of houseSettings.vehicles.values())
                this.vehicleController_.createVehicle(location, vehicle);
        });

        // Create entrances and exits for each of the known |locations_|.
        this.locations_.forEach(location =>
            this.entranceController_.addLocation(location));

        this.dataLoadedResolver_();
    }

    // Creates a new house location at |locationInfo| as issued by |player|. The |locationInfo| must
    // be an object having a {position, facingAngle, interiorId}.
    async createLocation(player, locationInfo) {
        if (!player.isRegistered())
            throw new Error('The |player| must be registered in order to create a location.');

        const id = await this.database_.createLocation(player, locationInfo);
        const location = new HouseLocation(id, locationInfo);

        this.locations_.add(location);
        this.entranceController_.addLocation(location);
    }

    // Creates a new parking lot for |location| at |parkingLot|. The |player| will be written to
    // the database to attribute creation of the parking lot.
    async createLocationParkingLot(player, location, parkingLot) {
        if (!player.isRegistered())
            throw new Error('The |player| must be registered in order to create a parking lot.');

        if (!this.locations_.has(location))
            throw new Error('The given |location| does not exist in this HouseManager.');

        const houseParkingLot = new HouseParkingLot({
            id: await this.database_.createLocationParkingLot(player, location, parkingLot),
            position: parkingLot.position,
            rotation: parkingLot.rotation,
            interiorId: parkingLot.interiorId
        });

        location.addParkingLot(houseParkingLot);
    }

    // Creates a new house in |location| owned by the |player|. The house interior of the house is
    // identified by |interiorId|, which must be included in the InteriorList.
    async createHouse(player, location, interiorId) {
        if (!player.isRegistered())
            throw new Error('The |player| must be registered in order to own a house.');

        if (!this.locations_.has(location))
            throw new Error('The given |location| does not exist in this HouseManager.');

        if (!location.isAvailable())
            throw new Error('The given |location| already is occupied by another player.');

        const house = await this.database_.createHouse(player, location, interiorId);

        const houseSettings = new HouseSettings(house);
        const houseInterior = new HouseInterior(house);  // TODO: Is this the right thing to do?

        location.setHouse(houseSettings, houseInterior);

        this.entranceController_.updateLocation(location);
    }

    // Updates the |setting| of the |location| to |value|. The actual application of the setting
    // update is unique to the setting that is being changed. The following settings are available:
    //
    //     'access' - Updates the access settings for the house.
    //     'name'   - Updates the name of the house.
    //     'spawn'  - Updates whether to spawn at the |location|.
    //
    // Updating an invalid setting will yield an exception.
    async updateHouseSetting(location, setting, value) {
        if (!this.locations_.has(location))
            throw new Error('The given |location| does not exist in this HouseManager.');

        if (location.isAvailable())
            throw new Error('The given |location| does not have an house associated with it.');

        switch (setting) {
            case 'access':
                if (typeof value !== 'number' || value < HouseSettings.ACCESS_EVERYBODY ||
                        value > HouseSettings.ACCESS_PERSONAL) {
                    throw new Error('A house access level must be one of HouseSettings.ACCESS_*.');
                }

                await this.database_.updateHouseAccess(location, value);

                location.settings.access = value;
                break;

            case 'name':
                if (typeof value !== 'string' || value.length < 3 || value.length > 32)
                    throw new Error('A house name must be between 3 and 32 characters in length.');

                await this.database_.updateHouseName(location, value);
                await this.entranceController_.updateLocationLabel(location, value);

                location.settings.name = value;
                break;

            case 'spawn':
                if (typeof value !== 'boolean')
                    throw new Error('The value of updating the spawn setting must be a boolean.');

                await this.database_.updateHouseSpawn(location, value);

                // Remove the spawn setting from all existing houses owned by the player.
                this.getHousesForUser(location.settings.ownerId).forEach(ownedLocation =>
                    ownedLocation.settings.setSpawn(false));

                // Now update the |location| setting to whatever |value| happens to be.
                location.settings.setSpawn(value);
                break;

            default:
                throw new Error('Invalid setting: ' + setting);
        }
    }

    // Returns the location closest to the position of |player|. The |maximumDistance| argument can
    // be provided when it must be within a certain range of the player. Players inside of a house
    // are deliberately not considered to be close to it.
    async findClosestLocation(player, maximumDistance = null) {
        await this.dataLoadedPromise_;

        const position = player.position;

        let closestLocation = null;
        let closestDistance = Number.MAX_SAFE_INTEGER;

        this.locations_.forEach(location => {
            const distance = position.squaredDistanceTo(location.position);
            if (distance > closestDistance)
                return;

            closestLocation = location;
            closestDistance = distance;
        });

        if (maximumDistance !== null && closestDistance > (maximumDistance * maximumDistance))
            return null;  // the location is too far away

        return closestLocation;
    }

    // Attempts to force-enter the |player| into |location|. They do not have to presently be there.
    forceEnterHouse(player, location) {
        this.entranceController_.enterHouse(player, location);
    }

    // Forces the |player| to exit the |location|. They do not have to presently be in there.
    forceExitHouse(player, location) {
        this.entranceController_.exitHouse(player, location);
    }

    // Returns the house location the |player| is currently standing in. May return NULL.
    getCurrentLocationForPlayer(player) {
        return this.entranceController_.getCurrentLocationForPlayer(player);
    }

    // Returns the house that the |player| is currently standing in. May return NULL.
    getCurrentHouseForPlayer(player) {
        return this.entranceController_.getCurrentHouseForPlayer(player);
    }

    // Returns the maximum number of houses the |player| is allowed to own.
    getMaximumHouseCountForPlayer(player) {
        return player.isManagement() ? 100
                                     : 1;
    }

    // Returns the houses owned by |player|. Assumes that the data has been loaded already.
    getHousesForPlayer(player) {
        return this.getHousesForUser(player.userId);
    }

    // Returns the houses owned by |userId|. Assumes that the data has been loaded already.
    getHousesForUser(userId) {
        const houses = [];

        this.locations_.forEach(location => {
            if (location.isAvailable() || location.settings.ownerId !== userId)
                return;

            houses.push(location);
        });

        return houses;
    }

    // Removes the given house |location|, including the house tied to it, if any. This action can
    // only be reversed by someone with database access.
    async removeLocation(location) {
        if (!this.locations_.has(location))
            throw new Error('The |location| must be known to the HouseManager.');

        if (!location.isAvailable())
            await this.removeHouse(location);

        await this.database_.removeLocation(location);

        this.locations_.delete(location);
        this.entranceController_.removeLocation(location);
    }

    // Removes the |parkingLot| from the |location|. If the location is currently occupied and a
    // vehicle exists in the slot, it will be removed without warning to the owner.
    async removeLocationParkingLot(location, parkingLot) {
        if (!this.locations_.has(location))
            throw new Error('The given |location| does not exist in this HouseManager.');

        if (!location.hasParkingLot(parkingLot))
            throw new Error('The given |parkingLot| does not belong to the |location|.');

        await this.database_.removeLocationParkingLot(parkingLot);

        // Remove the associated vehicle if both the location and the parking lot are occupied.
        if (!location.isAvailable()) {
            for (const [associatedParkingLot, vehicle] of location.settings.vehicles) {
                if (associatedParkingLot != parkingLot)
                    continue;

                // Remove the vehicle from the database.
                await this.database_.removeVehicle(vehicle);

                // Remove the vehicle from the vehicle controller.
                this.vehicleController_.removeVehicle(location, vehicle);

                // Remove the vehicle from the house's svehicle settings.
                location.settings.vehicles.delete(associatedParkingLot);
                break;
            }
        }

        location.removeParkingLot(parkingLot);
    }

    // Removes the house from |location|. Any players currently in the house will be forcefully
    // respawned into the main world.
    async removeHouse(location) {
        if (!this.locations_.has(location))
            throw new Error('The given |location| does not exist in this HouseManager.');

        if (location.isAvailable())
            throw new Error('The given |location| is not currently occupied.');

        // Forcefully remove all players that are currently in the locations to go outside.
        server.playerManager.forEach(player => {
            if (this.entranceController_.getCurrentHouseForPlayer(player) === location)
                this.entranceController_.exitHouse(player);
        });

        await this.database_.removeHouse(location);

        location.removeHouse();

        this.entranceController_.updateLocation(location);
        this.vehicleController_.removeVehiclesForLocation(location);
    }

    dispose() {
        this.entranceController_.dispose();
        this.vehicleController_.dispose();

        for (const location of this.locations_)
            location.dispose();

        this.locations_.clear();
    }
}

exports = HouseManager;
