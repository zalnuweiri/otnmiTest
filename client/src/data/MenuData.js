// src/data/menuData.js
export const menuData = {
    food: [
        {
            category: "Entradas",
            items: [
                {
                    id: 0,
                    name: "Betabeles quemados y ponche",
                    description: "charred beet, honey marinated queso fresco, arugula salad, shallot, pistachio, breadcrumbs and ponche vinaigrette",
                    price: 19,
                    image: "/menu/BETABALES.webp",
                    vegan: true
                },
                {
                    id: 1,
                    name: "Guacamole quemado",
                    description: "avocado, charred serrano, garlic, cilantro, pico de gallo, corn tostadas",
                    price: 24,
                    image: "/menu/GQ.webp"
                },
                {
                    id: 2,
                    name: "Tamales",
                    description: "pan seared tamales filled with ancho pepper adobo pork, cilantro salad, salsa aguacatosa\n",
                    price: 24,
                    image: "/menu/TAMALES.webp"
                },
                {
                    id: 3,
                    name: "AAA carne seca y papas",
                    description: "house made potato crisp and AAA dried steak, served with traditional tangy and hot salsa\n",
                    price: 22,
                    image: "/menu/AAACARNE.webp"
                },
                {
                    id: 4,
                    name: "Queso flameado y longaniza\n",
                    description: "provolone and monterey jack cheese flamed, lacto fermented tomato sauce, house made " +
                        "longaniza sausage, confit pepper chimichurri, house-made flour tortillas\n",
                    price: 26,
                    image: "menu/QFY.webp"
                },
                {
                    id: 5,
                    name: "Empanadas de barbacoa",
                    description: "AAA rib eye barbacoa empanadas, salsa verde, salsa roja, onion and cilantro\n",
                    price: 24,
                    image: "/menu/EMPBARB.webp"
                },
                {
                    id: 6,
                    name: "Tostadas de atún",
                    description: "fire charred corn tostadas, guacamole, chipotle dressed tuna, fried red onions, tajin mayo",
                    price: 21,
                    image: "menu/TOSTADAS.webp"
                },
                {
                    id: 7,
                    name: "Tacos olvidados",
                    description: "black tiger shrimp, bacon, mozzarella cheese, shrimp consome\n",
                    price: 19,
                    image: "menu/TACOLIV.webp"
                },
                {
                    id: 8,
                    name: "Flautas carnitas",
                    description: "rolled tacos filled with pork carnitas, Siberia style guacamole, serrano sauce, queso fresco, sour cream\n",
                    price: 21,
                    image: "/menu/FLAUTAS.webp"
                },

                // more Entradas...
            ]
        },
        {
            category: "Principales",
            items: [
                {
                    id: 0,
                    name: "Cachetadas de rib eye",
                    description: "cheese crusted rib eye slices, avocado, grilled onions, chives, served on corn tortillas",
                    price: 47,
                    image: "menu/CACHETADA.webp"
                },
                {
                    id: 1,
                    name: "Pollo al pastor",
                    description: "pastor grilled chicken thigh skewer, grilled pineapple, fried fingerling potatoes, " +
                        "guacamole, fermented habanero and pineapple pico de gallo\n",
                    price: 36,
                    image: "menu/POLLOPASTOR.webp"
                },
                {
                    id: 2,
                    name: "Espadas de rib eye asadas",
                    description: "mezquite grilled rib eye skewers (10 oz) , serrano ashes oil, salsa verde, grilled " +
                        "pearl onion, avocado mousse, green onion curls, tortillas.",
                    price: 64,
                    image: "menu/ESPADA.webp"
                },
                {
                    id: 3,
                    name: "44 oz tomahawk",
                    description: "44 oz serrano and tortilla ashes covered mezquite grilled AAA tomahawk, 72 hour " +
                        "morita au jus, papatinas, grilled lemon ",
                    price: 256,
                    image: "menu/44oz.webp"
                },
                {
                    id: 4,
                    name: "Pescado En Crema De Chile ",
                    description: "butterflied robalo fillet, piquin cream, serrano ashes oil, avocado and chicharron salad",
                    price: 54,
                    image: "menu/pescado.webp"
                },
                // more Principales...
            ]
        },
        {
            category: "Complementos",
            items: [
                {
                    id: 0,
                    name: "Papas bravas",
                    description: "tangy baby potatoes cooked in arbol pepper and butter, parsley, fried garlic and mayo",
                    price: 12,
                    image: "menu/BRAVAS.webp"
                },
                {
                    id: 1,
                    name: "Esquite",
                    description: "baby corn, piquin cream, butter sautéed asparagus, cotija cheese, parsley mayo",
                    price: 12,
                    image: "menu/ESQUITE.webp"
                },
                {
                    id: 2,
                    name: "Zanahorias al carbón",
                    description: "mezquite grilled heirloom carrots, morita sesame and chipotle agave salsa macha vinaigrette",
                    price: 12,
                    image: "menu/ZANAHORIA.webp"
                },
                {
                    id: 3,
                    name: "Papatinas",
                    description: "golden, crunchy potato thin sticks, tajin mayo ",
                    price: 12,
                    /* below is temporary image until papatinas image is given*/
                    image: "menu/PAPATINAS.webp"
                },
                // more Complementos...
            ]
        },
        {
            category: "Postres",
            items: [
                {
                    id: 0,
                    name: "Buñuelos de coco y maracuya",
                    description: "buñuelo, coconut cream gelato, passion fruit cream, passion fruit reduction, flowers\n",
                    price: 24,
                    image: "menu/BUNUELOS.webp"
                },
                {
                    id: 1,
                    name: "Delicias de mango",
                    description: "sable tart filled with 3 leches, delicias frosting, mango mousse, fresh mango slices",
                    price: 28,
                    image: "menu/DEMANGO.webp"
                },
                {
                    id: 2,
                    name: "El favorito de papá",
                    description: "sticky pear bread, walnut crumble, salted caramel sauce, vanilla gelato",
                    price: 26,
                    image: "menu/DEPAPA.webp"
                },

                // more
            ]
        }
    ],

    drinks: [
        {
            category: "Cocteles Regionales",
            items: [
                {
                    id: 0,
                    name: "Ensenada Dreams",
                    region: "BAJA PENINSULA",
                    description: "patrón reposado, cointreau, mango, yuzu, petit sirah, habanero tajín dream",
                    price: 36,
                    image: "/dmenu/edreamsnew.webp",
                    regionImage: "CR-BP.png"
                },
                {
                    id: 1,
                    name: "Piña Polanco",
                    region: "CENTRAL MEXICO",
                    description: "patrón reposado, clarified coconut, pineapple, lime, prosecco, sorbet, gold",
                    price: 36,
                    image: "polanco.webp",
                    regionImage: "cent-mex2.png"
                },
                {
                    id: 2,
                    name: "Coatepec Martini",
                    region: "SOUTHERN GULF",
                    description: "patrón añejo, kahlúa, licor del 43, cacao, lucano, orgeat, aztec chocolate mist, " +
                        "espresso, sea salt, soma chilli chocolate",
                    price: 36,
                    image: "coatepec.webp",
                    regionImage: "CR-SG.png"
                },
                {
                    id: 3,
                    name: "Oxaca’s Order",
                    region: "PACIFIC COAST",
                    description: "coconut washed patrón añejo, mezcal, agave, mole bitters, fire cloud",
                    price: 36,
                    image: "oaxaca.jpg",
                    regionImage: "CR-PC.png"
                },
                {
                    id: 4,
                    name: "Jungle Juice Cleanse",
                    region: "YUCATAN PENINSULA",
                    description: "patrón silver, green chartreuse, jungle juice, lime, ginger, pomegranate, ocean air",
                    price: 36,
                    image: "jj.webp",
                    regionImage: "CR-YP.png"
                },
                {
                    id: 5,
                    name: "Deserted in Durango",
                    region: "NORTHERN MÉXICO",
                    description: "patrón reposado, mezcal, ancho reyes, tepache, cinnamon, Scorpion",
                    price: 36,
                    image: "dd.webp",
                    regionImage: "CR-NM.png"
                },
                // add more drinks...
            ]
        },
        {
            category: "H Clásicos",
            items: [
                {
                    id: 10,
                    name: "Violeta",
                    description: "grey goose, lavender, violette, lemon, butterfly pea, flowers, bitters",
                    price: 25,
                    image: "/dmenu/violeta.webp"
                },
                {
                    id: 11,
                    name: "Paloma Picante",
                    description: "don julio blanco, ancho reyes, grapefruit, lime, tajín rim",
                    price: 27,
                    image: "/dmenu/plmapcnt.webp"
                },
                {
                    id: 12,
                    name: "Poblano and Peach",
                    description: "d’ussé, mezcal, smoked poblano, peach, lime, bitters\n",
                    price: 29,
                    image: "/dmenu/pabpech.webp"
                },
                {
                    /*dont have the image file for this*/
                    id: 13,
                    name: "Chai Thai",
                    description: "bacardi coconut, bacardi black, cointreau, lime, orgeat, chai, mint",
                    price: 23,
                    image: "/dmenu/chaithainew.webp"
                },
                {
                    id: 14,
                    name: "Cucumber Tajín Fizz",
                    description: "tanqueray, st-germain, lemon, cucumber, tajín",
                    price: 25,
                    image: "/dmenu/fizz-crop.webp"
                },
                {
                    id: 15,
                    name: "Silent Spritz",
                    description: "ciroc peach, cynar, cava, grapefruit, soda, rosemary",
                    price: 24,
                    image: "/dmenu/slntsprtzcrop.webp"
                },
                {
                    id: 16,
                    name: "Lil’ Picantes",
                    description: "cazadores, cointreau, lime, agave, jalapeño slice, cilantro, tajín, red thai chili",
                    info: "(4 shots)",
                    price: 24,
                    image: "/dmenu/lilps2.jpg"
                },

                // add more...
            ]
        },
        {
            category: "Margarita Tree",
            items: [
                {
                    id: 21,
                    name: "Coconut & Thai Chili Margarita",
                    description: "patrón silver, cointreau, coconut milk, thai chili",
                    info: "four margaritas served in a cocktail tree",
                    price: 120,
                    image: "margtree.webp"
                },
                {
                    id: 22,
                    name: "Strawberry & Basil Margarita",
                    description: "patrón silver, cointreau, strawberry, basil",
                    price: 120,

                },
                {
                    id: 23,
                    name: "Cucumber & Cilantro Margarita",
                    description: "patrón silver, cointreau, agave, jalapeño, cucumber, cilantro\n",
                    price: 120,
                },
                {
                    id: 24,
                    name: "Blueberry & Lemon Margarita",
                    description: "patrón silver, blue çuracao, blueberry, lemon\n",
                    price: 120,
                },
                // add more...
            ]
        },
        {
            category: "Cervezas",
            items: [
                { id: 30, name: "Bottles", description: "peroni / modelo / negra modelo / corona / stella / michelob ultra / mill st. organic", price: 12 },
                { id: 31, name: "Draft Beer", description: "stella / michelob ultra / mill st. organic / peroni", price: 14 },
                { id: 32, name: "Michelada", description: "beer, clamato, black sauces, citrus, valentina, chamarindo, chili salt\n", price: 19 },
            ]
        },
        {
            category: "Cocteles con Amigos",
            items: [
                {
                    id: 40,
                    name: "Mango Colado Grande",
                    description: "d’ussé, st. remy, mango, coconut, lime, tajin",
                    price: 120,
                    image: "/dmenu/mangoocolado2.jpg"
                },
                {
                    id: 41,
                    name: "México East",
                    description: "don julio blanco, mezcal, guava, hibiscus, cointreau, lemon, pineapple",
                    price: 120,
                    image: "/dmenu/mexeast2.jpg"
                },
                {
                    id: 42,
                    name: "Paloma Fresa Grande",
                    description: "don julio blanco, strawberry, grapefruit, lime soda ",
                    price: 120,
                    image: "/dmenu/grndplma.webp"
                },
                // add more...
            ]
        },
        {
            category: "Electric Daisy",
            items: [
                {
                    id: 50,
                    name: "Electric Daisy",
                    description: "signature cocktail — served with buzzing flower",
                    price: 70,
                    image: "edaisysmall.png"
                }
            ]
        },
        {
            category: "Vinos Rojos",
            items: [
                { id: 60, name: "Punti Ferrer", description: "Malbec", price: 19, price8oz: 31, btl: 85},
                { id: 61, name: "Carlos Basso", description: "Cabernet Sauvignon", price: 19, price8oz: 28, btl: 85 },
                { id: 62, name: "Puntí Ferrer", description: "Pinot Noir", price: 19, price8oz: 28, btl: 85 },
                { id: 63, name: "Sancho Garcés", description: "Tempranillo Rioja", price: 22, price8oz: 31, btl: 130 },
                { id: 64, name: "Conforme", description: "Cabernet Sauvignon", btl: 130},
                { id: 64, name: "Carlos Basso", description: "Malbec Gran Reserva", btl: 150},
            ]
        },
        {
            category: "Vinos Blancos",
            items: [
                { id: 70, name: "Catarratto", description: "Piniot Grigio", price: 19, price8oz: 28, btl: 95},
                { id: 71, name: "Punti Ferrer", description: "Sauvignon Blanc", price: 19, price8oz: 28, btl: 95},
                { id: 72, name: "Epílogo", description: "Chardonnay", price: 22, price8oz: 31, btl: 110},
                { id: 73, name: "Bodegas Aquitania", description: "Albariño", btl: 100},
                { id: 74, name: "Séguinot-bordet", description: "Chablis", btl: 130},
            ]
        },
        {
            category: "Vinos Rosé",
            items: [
                { id: 80, name: "Zinio", description: "Rosado", price: 22, price8oz: 29, btl: 100},
            ]
        },
        {
            category: "Espumosos",
            items: [
                { id: 90, name: "Santomé", description: "Prosecco", price: 20, btl: 100},
                { id: 92, name: "Santomé", description: "Prosecco Rose", price: 20, btl: 100},
                { id: 93, name: "Collard Picard", description: "Sèlection", btl: 320 },
                { id: 94, name: "Dom Pérignon", description: "Brut", btl: 970 },
                { id: 95, name: "Armand de Brignacn", description: "(Ace of Spades)", btl: 1200 },
                { id: 96, name: "Veuve Clicquot", description: "Ace of Spades", btl: 320 },
            ]
        },
        {
            category: "Cafe/Energizantes/Sin alcohol",
            items: [
                { id: 100, name: "Café Espresso", description: "", price: 5 },
                { id: 101, name: "Carajillo", description: "", price: 18 },
                { id: 103, name: "Coapetec Martini", description: "", price: 36 },
                { id: 104, name: "Red Bull", description: "", price: 9 },
                { id: 105, name: "Red Bull", description: "Sugar free", price: 9 },
                { id: 106, name: "Red Bull", description: "Tropical Mango Papaya ", price: 9 },
                { id: 107, name: "Corona Cero", description: "", price: 9 },
                { id: 108, name: "Aguas Frescas", description: "agua de tamarindo / guayaba jamaica", price: 9 },
            ]
        }
    ],
    carousel: [
        // drink → food → drink → repeat

        { id: "c1", type: "drink", name: "Electric Daisy",          image: "/menu/ElectricDaisy.webp" },
        { id: "c2", type: "food",  name: "44 oz tomahawk",          image: "menu/44oz.webp" },
        {
            id: "c35",
            type: "drink",
            name: "Ensenada Dreams",
            image: "/dmenu/edreamsnew.webp"
        },

        {
            id: "c4",
            type: "drink",
            name: "Coatepec Martini",
            image: "coatepec.webp "
        },
        {
            id: "c5",
            type: "food",
            name: "Tamales",
            image: "/menu/TAMALES.webp"
        },
        {
            id: "c6",
            type: "drink",
            name: "Oxaca's Order",
            image: "oaxaca.jpg "
        },
        // alternating
        {
            id: "c7",
            type: "drink",
            name: "Jungle Juice Cleanse",
            image: "jj.webp" },
        { id: "c8", type: "food",  name: "Espadas de rib eye asadas", image: "menu/ESPADA.webp" },


        /* double check file paths if intending to use more of the tree.*/
        { id: "c9",  type: "drink",  name: "Deserted in Durango", image: "dd.webp" },
        { id: "c10", type: "drink", name: "Cucumber Tajín Fizz",     image: "/dmenu/fizz-crop.webp" },
        { id: "c13", type: "food",  name: "Empanadas de barbacoa",  image: "/menu/EMPBARB.webp" },
        { id: "c14", type: "drink", name: "Silent Spritz",           image: "/dmenu/slntsprtzcrop.webp" },
        { id: "c15", type: "drink", name: "Violeta",                 image: "/dmenu/violeta.webp" },
        { id: "c16", type: "food",  name: "Buñuelos de coco y maracuya",       image: "menu/BUNUELOScrsl.webp" },
        { id: "c17", type: "drink", name: "Poblano and Peach",       image: "/dmenu/pabpech.webp" }, // double drink
        { id: "c18", type: "drink", name: "Chai Thai",               image: "/menu/clasico1.jpg" },
        { id: "c19", type: "food",  name: "Tacos olvidados",         image: "menu/TACOLIV.webp" },
        { id: "c21", type: "drink", name: "Blueberry & Lemon Margarita", image: "drinkH.png" },
        { id: "c22", type: "food",  name: "Flautas carnitas",        image: "/menu/FLAUTAS.webp" },
        { id: "c23", type: "drink", name: "Lil’ Picantes",           image: "/dmenu/lilpcnts.webp" },
        {
            id: "c24",
            type: "drink",
            name: "Piña Polanco",
            image: "polanco.webp"
        },
        { id: "c25", type: "food",  name: "Cachetadas de rib eye",   image: "menu/CACHETADA.webp" },
        { id: "c26", type: "drink", name: "Strawberry & Basil Margarita", image: "/dmenu/margs.webp" },
        { id: "c27", type: "drink", name: "Cucumber & Cilantro Margarita", image: "/dmenu/margs.webp" },
        { id: "c28", type: "food",  name: "Pollo al pastor",         image: "menu/POLLOPASTOR.webp" },
        { id: "c29", type: "drink", name: "Paloma Picante",          image: "/dmenu/plmapcnt.webp" },
        { id: "c30", type: "drink", name: "Mango Colado Grande",     image: "/menu/amigos1.jpg" },
        {
            id: "c31",
            type: "food",
            name: "AAA carne seca y papas",
            image: "/menu/AAACARNE.webp" },
        { id: "c32", type: "drink", name: "México East",             image: "/menu/amigos1.jpg" },
        { id: "c33", type: "drink", name: "Paloma Fresa Grande",     image: "/menu/amigos1.jpg" },
        {
            id: "c34",
            type: "food",
            name: "Guacamole quemado",
            image: "/menu/GQ.webp"
        },
        { id: "c35", type: "drink", name: "Coconut & Thai Chili Margarita", image: "/dmenu/margtree.webp" },
        { id: "c36", type: "drink", name: "Queso flameado y longaniza",    image: "menu/QFY.webp" },

        /*
        Re-add below if/when more drink images are available, to expand carousel size. Follow aboe format
        drink > food > drink (repeat, if successful, should create drink > drink effect in list
        (ie drink1 > food1 > drink2 - next page drink3 > food2 > drink4)
        { id: "c44", type: "food",  name: "Papas bravas",            image: "menu/BRAVAS.webp" },
        { id: "c45", type: "food",  name: "Esquite",                 image: "menu/ESQUITE.webg" },
        { id: "c46", type: "food",  name: "Zanahorias al carbón",    image: "menu/ZANAHORIA.webp" },
        { id: "c47", type: "food",  name: "Papatinas",               image: "menu/PAPATINAS.webp" },
        { id: "c48", type: "food",  name: "Buñuelos de coco y maracuya", image: "menu/BUNUELOS.webp" },
        { id: "c49", type: "food",  name: "Delicias de mango",       image: "menu/DEMANGO.webp" },
        { id: "c50", type: "food",  name: "El favorito de papá",     image: "menu/DEPAPA.webp" },*/
        // …continue alternating as far as you want
    ]
};

// menudata.js
export const eventSpaces = {
    silentH: [
        "/SHevents1.webp",
        "/SHevents2.webp",
        "/SHevents3.webp",
        "/SHevents4.webp"
    ],
    aitch: [
        "/Hevents1.webp",
        "/Hevents2.webp",
        "/Hevents3.webp",
        "/Hevents4.webp"
    ]
};

