


let locations = [
                    {
                        id : 1,
                        locationName : "Oulu, FI"
                    }
                ]
module.exports = {

getAllLocations: () => locations,
getAllLocationPosts: (locationId) => locations.filter(l => l.id == locationId)
};