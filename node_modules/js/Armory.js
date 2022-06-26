Armory = function (game, player) {
    this.weapons = [
        {
            'name': 'Crook',
            'model': {
                // 'meshUrl': '',
                'meshName': 'Crook'
            },
            'type': 'closeCombat',
            'timeAnimation': 400,
            'setup': {
                // Distance de frappe de l'arme de CaC
                'range': 2,
                'damage': 20,
                'cadency': 500,
                'colorMesh': new BABYLON.Color3((59 / 255), (195 / 255), (203 / 255))
            }
        },
        {
            'name': 'Timmy',
            'model': {
                // 'meshUrl': '',
                'meshName': 'Timmy'
            },
            'type': 'ranged',
            'timeAnimation': 35,
            'setup': {
                'damage': 2,
                'cadency': 50,
                'ammos': {
                    'type': 'bullet',
                    'baseAmmos': 200,
                    'maximum': 400,
                    'refuel': 50
                },
                'colorMesh': new BABYLON.Color3((27 / 255), (235 / 255), (37 / 255))
            }
        },
        {
            'name': 'Ezekiel',
            'model': {
                // 'meshUrl': '',
                'meshName': 'Ezekiel'
            },
            'type': 'ranged',
            'timeAnimation': 400,
            'setup': {
                'damage': 30,
                'cadency': 500,
                'ammos': {
                    'type': 'rocket',
                    'baseAmmos': 15,
                    'refuel': 10,
                    'maximum': 40,
                    // 'meshAmmosUrl' : '',
                    'meshAmmosName': 'Rockets',
                    // Rapidité de déplacement de la roquette
                    'rocketSpeed': 6,
                    // Taille de la roquette
                    'rocketSize': 1.5,
                    // Rayon de l'explosion
                    'explosionRadius': 800
                },
                // Couleur du mesh par défault
                'colorMesh': new BABYLON.Color3(1, 0.6, 0.7)
            }
        },
        {
            'name': 'Armageddon',
            'model': {
                // 'meshUrl': '',
                'meshName': 'Armageddon'
            },
            'type': 'ranged',
            'timeAnimation': 1400,
            'setup': {
                'damage': 1000,
                'cadency': 2000,
                'ammos': {
                    'type': 'laser',
                    'spread': 1,
                    'baseAmmos': 5,
                    'maximum': 15,
                    'refuel': 5
                },
                'colorMesh': new BABYLON.Color3((133 / 255), (39 / 255), (139 / 255))
            }
        }
    ];

    this.bonuses = [
        {
            'name': 'mHealth',
            'message': 'Gros pack de santé',
            'type': 'health',
            'value': 75,
        },

        {
            'name': 'lHealth',
            'message': 'Petit pack de santé',
            'type': 'health',
            'value': 20,
        },

        {
            'name': 'mArmor',
            'message': 'Gros pack d\'armure',
            'type': 'armor',
            'value': 20,
        }
    ];

    return 1
};