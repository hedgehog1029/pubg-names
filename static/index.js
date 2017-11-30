(function() {
    var ele = document.querySelector("#generated");

    function randomFrom(list) {
        return list[Math.floor(Math.random() * list.length)]
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
        pairs: [
            ["Brendan Greene's", ["Magic Machine", "Fight Ravine", "Sideways Lean", "Shine n' Gleam", "Coming Clean", "Magical Bean", "Bug Screen", "Gaming Scene", "Have You Seen?", "Party Bean", "Subteen Houseclean", "Spilled Gasoline", "Unseen Evergreen", "Peregrine Wolverine", "Porno Magazine", "Sweet Sixteen", "Unclean Submarine"]],
            ["Brenden Grenden's", ["Battle Grenden", "British Referendum", "Increased Momentum", "Physics Intervention", "Stretched Tendon", "Opposite Intention", "Anti-Cheat Circumvention", "Nonintervention", "Cooking Inattention", "Score Correction", "Genius Invention", "Tax Exemption", "Seeking Attention", "School Detention", "Furious Contention", "Anime Collection", "Coupon Redemption", "Lawyer Objection", "Reading Comprehension", "Traffic Congestion", "Delicious Confection", "Explosive Decompression", "Geneva Convention", "Contraception Imperfection", "Variable Indentation", "Specific Affection", "Hessian Reception", "Fair Complexion", "Engine Dimension", "Facial Expression", "Faulty Recollection"]],
            ["Playerunknown's", ["Daily Moan", "Cordless Phone", "Gunplay Zone", "Payday Loan", "Traffic Cone", "Bone Zone", "Dial Tone", "Loud Trombone", "Public Telephone", "Blue Cheese Cologne", "Low Groan", "Leave Me Alone", "Jesus Atone", "Brutal Disown", "Incoming Cyclone", "Broken Collarbone", "Xylophone", "Foreknown Pheromone", "Dreary Monotone", "Broken Hipbone", "Biaural Microphone", "Saw Your Sister In The Cornerstone", "Release Postponed"]],
            ["Bluehole's", ["Bridge Troll", "Remote Control"], ["Pigeonhole", "Beanpole", "Cubbyhole", "Screwhole", "Loo Roll", "Soul Hole", "Collection of Foals", "Bowl", "Casserole", "Glycerol", "Bedroll", "Profiterole", "Buttonhole", "Morning Stroll"]],
            ["Plunder Under's", ["Battle Grunder", "Wonder Lumber", "Battle Wonder", "Bumper Plunger", "Hunter Thunder", "Enourmous Thunder", "Number Blunder", "Car Sunder", "Udder Blunder", "Sulphur Slumber", "Asunder Plumber", "Midsummer Thunder", "Runner Gunner", "Rubber Drummer"]],
            ["Brendan Booty's", ["Shooty Looty", "Jury Duty", "Tutti Fruity", "Cutie Beauty", "Droopy Cootie", "Snooty Ruby"]]
        ],
        player_alternatives: [
            "Player", "Comrade", "Participant", "Contestant", "Thespian", "Popular", "Performer"
        ],
        unknown_alternatives: [
            ["Unknown", p(false)], ["Nameless", p(true)], ["Unidentified", p(true)], ["Obscure", r()], ["Unsung", p(true)], ["Inglorious", p(true)], ["Unfamiliar", r()]
        ],
        battle_alternatives: [
            "Battle", "Ideology", "Cookware", "Punchfight", "Conflict", "Fight", "Engagement", "Struggle", "Combat", "Beetle", "Bottle"
        ],
        grounds_alternatives: [
            "Grounds", "Dustup", "Island", "Yard", "Field", "Parcel", "Sediment", "Quarry"
        ],
        full_names: [
            "Secret Player", "Unnamed Person", "Mystery Guy", "Brendan Greene"
        ],
        full_suffixes: [
            "Frank Exchange of Bullets", "All-Caps Gunplay"
        ]
    }

    // Generators take no arguments, they simply produce a result for a pattern.
    var generators = {
        rhymepair: function() {
            var pair = randomFrom(pools.pairs)

            return pair.map(function(item) {
                if (Array.isArray(item)) {
                    return randomFrom(item)
                } else {
                    return item
                }
            }).join(" ")
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
