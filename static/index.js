(function() {
    var ele = document.querySelector("#generated");

    function randomFrom(list) {
        return list[Math.floor(Math.random() * list.length)]
    }

    function e(times, cb) {
        var results = [];
        for (var i = 0; i < times; i++) {
            results.push(cb(i));
        }

        return results
    }

    function p(val) {
        return function() {
            return val
        }
    }

    function r(chance) {
        if (!chance) chance = 0.5
        return function() {
            return Math.random() < chance
        }
    }

    var pools = {
        rhymes: [
            ["Brendan Greene", ["Machine", "Ravine", "Lean", "Gleam", "Clean", "Bean", "Sean", "Screen", "Scene", "Seen", "Bean", "Subteen", "Preteen", "Houseclean", "Gasoline", "Unseen", "Evergreen", "Peregrine", "Wolverine", "Magazine", "Sixteen", "Unclean", "Submarine", "Supreme", "Reigime", "Dream"]],
            ["Brenden Grenden", ["Grenden", "Referendum", "Momentum", "Intervention", "Tendon", "Intention", "Circumvention", "Nonintervention", "Inattention", "Correction", "Invention", "Exemption", "Attention", "Detention", "Contention", "Collection", "Redemption", "Objection", "Comprehension", "Confection", "Decompression", "Convention", "Contraception", "Imperfection", "Indentation", "Affection", "Reception", "Complexion", "Dimension", "Expression", "Recollection"]],
            ["PLAYERUNKNOWN", ["Moan", "Home", "Phone", "Zone", "Loan", "Cone", "Tone", "Trombone", "Telephone", "Cologne", "Groan", "Alone", "Atone", "Disown", "Cyclone", "Collarbone", "Xylophone", "Foreknown", "Pheromone", "Monotone", "Hipbone", "Microphone", "Cornerstone", "Postponed", "Red Zone"]],
            ["Bluehole", ["Bridge Troll", "Control", "Pigeonhole", "Beanpole", "Pole", "Screwball", "Screwhole", "Roll", "Foal", "Bowl", "Casserole", "Glycerol", "Bedroll", "Profiterole", "Stroll", "Mole", "Innersole"]],
            ["Plunder Under", ["Grunder", "Wonder", "Lumber", "Bumper", "Plunger", "Hunter", "Thunder", "Number", "Blunder", "Sunder", "Slumber", "Plumber", "Midsummer", "Runner", "Gunner", "Drummer"]],
            ["Brendan Booty", ["Shooty", "Looty", "Duty", "Tutti", "Fruity", "Cutie", "Beauty", "Droopy", "Ruby", "Snooty", "Loopy"]],
            ["Extremely Spiteful", ["Rifle", "Trifle", "Delightful", "Title", "Stifle", "Direful", "Vital", "Bible", "Cycle"]],
            ["Bluehole Group", ["Soup", "Poop", "Hoop", "Troop", "Loop", "Troupe", "Coop", "Coupe", "Regroup", "Scoop", "Swoop", "Paratroop"]],
            ["Shrinking Map", ["Scrap", "Nap", "App", "Cap", "Gap", "Chap", "Lap", "Tap", "Sap", "Snap", "Wrap", "Rap", "Trap", "Flap", "Bitmap", "Slap", "Clap", "Crap", "Overlap", "Thermostat", "Habitat"]]
        ],
        player_alternatives: [
            "Player", "Comrade", "Participant", "Contestant", "Thespian", "Popular", "Performer", "Chef", "Soldier", "Baker", "General", "Wanderer", "Loner", "Guy", "Person"
        ],
        unknown_alternatives: [
            ["Unknown", r(0.4)], ["Nameless", p(true)], ["Unidentified", p(true)], ["Obscure", r()], ["Unsung", p(true)], ["Inglorious", p(true)],
            ["Unfamiliar", r()], ["Infamous", p(true)], ["Anonymous", p(true)], ["Uncommon", r()], ["Secret", p(true)]
        ],
        battle_alternatives: [
            "Battle", "Ideology", "Cookware", "Punchfight", "Conflict", "Fight", "Engagement", "Struggle", "Combat", "Beetle", "Bottle", "Zombie", "Gunplay", "Death"
        ],
        grounds_alternatives: [
            "Grounds", "Dustup", "Island", "Yard", "Field", "Parcel", "Sediment", "Quarry", "Kitchen", "Laboratory", "School", "Office", "Plains", "Mountain"
        ],
        full_names: [
            "Unnamed Person", "Mystery Guy", "Brendan Greene", "Robson Green", "Jeff Goldblum"
        ],
        full_suffixes: [
            "Frank Exchange of Bullets", "All-Caps Gunplay", "Shooty Shooty Bang Bang", "Dying to Death Simulator", "Zombie Island", "Extreme Fishing"
        ],
        filler: [
            "Fight", "Magic", "British", "American", "Traffic", "Gunplay", "Cordless", "Daily", "Engine", "Faulty", "Specific", "Furious", "Increased", "Bridge", "Extremely", "Gameplay"
        ]
    }

    // Generators take no arguments, they simply produce a result for a pattern.
    var generators = {
        rhymepair: function() {
            var slots = randomFrom(pools.rhymes);
            var prefix = slots[0] + "'s";
            var slotPool = slots[1];
            var words = 2;

            if (slots.length == 3) {
                slotPool = slots[2];
                words = slots[1];
            }

            var suffix = e(words, function(i) {
                if (i == 0 && r(0.3)()) {
                    return randomFrom(pools.filler);
                }

                return randomFrom(slotPool)
            }).join(" ");

            return [prefix, suffix].join(" ");
        },
        name_twopart: function() {
            var prefix = randomFrom(pools.player_alternatives)
            var suffixData = randomFrom(pools.unknown_alternatives)
            var suffix = suffixData[0];

            if (suffixData[1]()) { // if true, swap the pairs
                suffix = prefix;
                prefix = suffixData[0];
            }

            return [prefix, suffix].join(" ");
        },
        name: function() {
            if (r()()) {
                return this.name_twopart()
            } else {
                return randomFrom(pools.full_names)
            }
        },
        place_twopart: function() {
            var prefix = randomFrom(pools.battle_alternatives)
            var suffix = randomFrom(pools.grounds_alternatives)

            return [prefix, suffix].join(" ")
        },
        place: function() {
            if (r(0.2)()) {
                return randomFrom(pools.full_suffixes)
            } else {
                return this.place_twopart()
            }
        }
    }

    var partsPattern = [
        { type: "GENERATOR", name: "name" },
        { type: "RAW", text: "'s " },
        { type: "GENERATOR", name: "place" }
    ]

    var rhymingPattern = [
        { type: "GENERATOR", name: "rhymepair" }
    ]

    function generate(pattern) {
        return pattern.map(function(item) {
            if (item.type == "GENERATOR") {
                return generators[item.name]()
            } else if (item.type == "RAW") {
                return item.text
            }
        }).join("")
    }

    function displayName(text) {
        ele.innerHTML = text;
    }

    window.generate = function() {
        if (r(0.6)()) {
            displayName(generate(rhymingPattern))
        } else {
            displayName(generate(partsPattern))
        }
    }

    window.generate();
})();
