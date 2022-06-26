Arena = function (game) {
    // Appel des variables nécéssaires
    this.game = game;
    var scene = game.scene;

    // Création de notre lumière principale
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
    light2.intensity = 0.8;
  
    //Material pour le sol
    var materialGround = new BABYLON.StandardMaterial("wallTexture", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("assets/images/brick.jpg", scene);
    materialGround.diffuseTexture.uScale = 8.0;
    materialGround.diffuseTexture.vScale = 8.0;

    // Material pour les objets
    var materialWall = new BABYLON.StandardMaterial("groundTexture", scene);
    materialWall.diffuseTexture = new BABYLON.Texture("assets/images/marbresable.jpg", scene);

    var materialPlace = new BABYLON.StandardMaterial("boxtexture", scene);
    materialPlace.diffuseTexture = new BABYLON.Texture("assets/images/marbrerose.jpg", scene);

    //Matériel pour le ciel
    var materialSky = new BABYLON.StandardMaterial("skyTexture", scene);
    materialSky.diffuseTexture = new BABYLON.Texture("assets/images/ciel.jpg", scene);

    //Matériel pour l'arbre
    var materialWood = new BABYLON.StandardMaterial("woodTexture", scene);
    materialWood.diffuseTexture = new BABYLON.Texture("assets/images/bois.jpg", scene);
    materialWood.ampScale = 50;

    var materialLeaf = new BABYLON.StandardMaterial("feuilleTexture", scene);
    materialLeaf.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);

    //Générateur d'abres
    QuickTreeGenerator = function (sizeBranch, sizeTrunk, radius, trunkMaterial, materialLeaf, scene) {

        var tree = new BABYLON.Mesh("tree", scene);
        tree.isVisible = false;

        var leaves = new BABYLON.Mesh("leaves", scene);

        var vertexData = BABYLON.VertexData.CreateSphere({ segments: 2, diameter: sizeBranch });

        vertexData.applyToMesh(leaves, false);

        var positions = leaves.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        var indices = leaves.getIndices();
        var numberOfPoints = positions.length / 3;

        var map = [];

        //Le plus haut point de la sphere
        var v3 = BABYLON.Vector3;
        var max = [];

        for (var i = 0; i < numberOfPoints; i++) {
            var p = new v3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

            if (p.y >= sizeBranch / 2) {
                max.push(p);
            }

            var found = false;
            for (var index = 0; index < map.length && !found; index++) {
                var array = map[index];
                var p0 = array[0];
                if (p0.equals(p) || (p0.subtract(p)).lengthSquared() < 0.01) {
                    array.push(i * 3);
                    found = true;
                }
            }
            if (!found) {
                var array = [];
                array.push(p, i * 3);
                map.push(array);
            }

        }
        var randomNumber = function (min, max) {
            if (min == max) {
                return (min);
            }
            var random = Math.random();
            return ((random * (max - min)) + min);
        };

        map.forEach(function (array) {
            var index, min = -sizeBranch / 10, max = sizeBranch / 10;
            var rx = randomNumber(min, max);
            var ry = randomNumber(min, max);
            var rz = randomNumber(min, max);

            for (index = 1; index < array.length; index++) {
                var i = array[index];
                positions[i] += rx;
                positions[i + 1] += ry;
                positions[i + 2] += rz;
            }
        });

        leaves.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        var normals = [];
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        leaves.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
        leaves.convertToFlatShadedMesh();

        leaves.material = materialLeaf;
        leaves.position.y = sizeTrunk + sizeBranch / 2 - 2;

        leaves.parent = tree;
        return tree;

    };

    //Matériel pour le palais
    var materialMur = new BABYLON.StandardMaterial("murTexture", scene);
    materialMur.diffuseTexture = new BABYLON.Texture("assets/images/mur.jpg", scene);

    var materialBoule = new BABYLON.StandardMaterial("bouleTexture", scene);
    materialBoule.diffuseTexture = new BABYLON.Texture("assets/images/boule.jpg", scene);

    materialClock = new BABYLON.StandardMaterial("clockTexture", scene);
    materialClock.diffuseTexture = new BABYLON.Texture("assets/images/horloge.jpg", scene);

    const optionsGround = {
        width: 10000,
        height: 10000,
        updatable: true,
        subdivisions: 24
    }

    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "assets/images/groundpng.png",optionsGround, scene);
    ground.material = materialGround;
    ground.checkCollisions = true;

    const optionsCiel = {
        slice: 0.4,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        diameter: 10000
    }

    var sky = BABYLON.MeshBuilder.CreateSphere("ciel", optionsCiel, scene);
    sky.position.y = -1750;
    sky.material = materialSky;
    sky.checkCollisions = true;

    //Palais

    optionsPalais = {
        depth: 300,
        height: 350,
        width: 1000,
        updatable: true,
        tileSize: 40,
    }

    var palais = BABYLON.MeshBuilder.CreateTiledBox("palais", optionsPalais, scene);
    palais.position.x = -1100;
    palais.position.z = 650;
    palais.position.y = 300;
    palais.material = materialMur;
    palais.rotation.y = 62;
    palais.checkCollisions = false;

    optionsBasePalais = {
        depth: 300,
        height: 250,
        width: 380,
        updatable: true,
        tileSize: 40,
    }

    var basePalais = BABYLON.MeshBuilder.CreateTiledBox("basePalais", optionsBasePalais, scene);
    basePalais.position.x = -1310;
    basePalais.position.y = 110;
    basePalais.position.z = 420;
    basePalais.rotation.y = 62;
    basePalais.material = materialMur;
    basePalais.checkCollisions = true;

    var basePalais2 = basePalais.clone("basePalais2");
    basePalais2.position.x = -890;
    basePalais2.position.z = 880;

    optionsRoof = {
        diameter: 300,
        slice: 0.4,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }

    var roof = BABYLON.MeshBuilder.CreateSphere("sphere", optionsRoof, scene);
    roof.position.y = 430;
    roof.position.x = -1100;
    roof.position.z = 655;
    roof.material = materialMur;

    optionsBoule = {
        segments: 60,
        diameter: 40,
    }

    var bouleallé = BABYLON.MeshBuilder.CreateSphere("boule1", optionsBoule, scene);
    bouleallé.position.y = 20;
    bouleallé.position.x = -1000;
    bouleallé.position.z = 380;
    bouleallé.material = materialBoule;
    bouleallé.checkCollisions = true;

    var bouleallé2 = bouleallé.clone("bouleallé2");
    bouleallé2.position.x = -785;
    bouleallé2.position.z = 600;

    optionsClock = {
        radius: 75,
        tessellation: 80

    }

    var clock = BABYLON.MeshBuilder.CreateDisc("clock", optionsClock, scene);
    clock.position.y = 300;
    clock.position.x = -990;
    clock.position.z = 545;
    clock.rotation.y = 62;
    clock.material = materialClock;
    

    //MUSIQUE
    const music = new BABYLON.Sound("la comté", "https://soundcloud.com/user-433351325/theme-vark-dador-musique-de-film-orchestral?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", scene, null, {loop: true, autoplay: true});

    //Arbres avec le générateur

    optionsTrunk = {
    height: 180,
    diameterTop: 21,
    diameterBottom: 28
    }

    var trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", optionsTrunk, scene);
    trunk.position.x = 300;
    trunk.position.y = 34;
    trunk.material = materialWood;
    trunk.checkCollisions = true;

    var leaves = QuickTreeGenerator(100, 110, 20, materialWood, materialLeaf, scene);
    leaves.position.x = 300;
    leaves.checkCollisions = true;
        
    // DEFINITION DES PROPS ------------------------------------------------

    // Liste des objets stocké dans le jeu
    this.bonusBox = [];
    this.weaponBox = [];
    this.ammosBox = [];

    // Les props envoyé par le serveur
    //this.bonusServer = props[0];
    //this.weaponServer = props[1];
    //this.ammosServer = props[2];

    for (var i = 0; i < this.bonusServer; i++) {
        // Si l'objet n'a pas été pris par un joueur
        if (this.bonusServer[i].v === 1) {
            var newBonusBox = this.newBonuses(new BABYLON.Vector3(
                this.bonusServer[i].x,
                this.bonusServer[i].y,
                this.bonusServer[i].z),
                this.bonusServer[i].t);

            newBonusBox.idServer = i;
            this.bonusBox.push(newBonusBox);
        }
    }

    for (var i = 0; i < this.weaponServer; i++) {
        if (this.weaponServer[i].v === 1) {
            var newWeaponBox = this.newWeaponSet(new BABYLON.Vector3(
                this.weaponServer[i].x,
                this.weaponServer[i].y,
                this.weaponServer[i].z),
                this.weaponServer[i].t);

            newWeaponBox.idServer = i;
            this.weaponBox.push(newWeaponBox);
        }
    }

    for (var i = 0; i < this.ammosServer; i++) {
        if (this.ammosServer[i].v === 1) {
            var newAmmoBox = this.newAmmo(new BABYLON.Vector3(
                this.ammosServer[i].x,
                this.ammosServer[i].y,
                this.ammosServer[i].z),
                this.ammosServer[i].t);

            newAmmoBox.idServer = i;
            this.ammosBox.push(newAmmoBox);
        }
    }
};

Arena.prototype = {
    newBonuses: function (position, type) {
        var typeBonus = type;
        var positionBonus = position;

        // On crée un cube
        var newBonus = BABYLON.Mesh.CreateBox("bonusItem", 2, this.game.scene);
        newBonus.scaling = new BABYLON.Vector3(1, 1, 1);

        // On lui donne la couleur orange
        newBonus.material = new BABYLON.StandardMaterial("textureItem", this.game.scene);
        newBonus.material.diffuseColor = new BABYLON.Color3((255 / 255), (138 / 255), (51 / 255));

        // On positionne l'objet selon la position envoyé
        newBonus.position = positionBonus;

        // On le rend impossible a être séléctionné par les raycast
        newBonus.isPickable = false;

        // On affecte à l'objet son type
        newBonus.typeBonus = typeBonus;

        return newBonus;
    },
    newWeaponSet: function (position, type) {
        var typeWeapons = type;
        var positionWeapon = position;

        var newSetWeapon = BABYLON.Mesh.CreateBox(this.Armory.weapons[typeWeapons].name, 1, this.game.scene);
        newSetWeapon.scaling = new BABYLON.Vector3(1, 0.7, 2);


        newSetWeapon.material = new BABYLON.StandardMaterial("weaponMat", this.game.scene);
        newSetWeapon.material.diffuseColor = this.Armory.weapons[typeWeapons].setup.colorMesh;
        newSetWeapon.position = positionWeapon;
        newSetWeapon.isPickable = false;
        newSetWeapon.typeWeapon = type;

        return newSetWeapon;
    },
    newAmmo: function (position, type) {
        var typeAmmos = type;
        var positionAmmo = position;
        var newAmmo = BABYLON.Mesh.CreateBox(this.game.armory.weapons[typeAmmos].name, 1.0, this.game.scene);
        newAmmo.position = positionAmmo;
        newAmmo.isPickable = false;
        newAmmo.material = new BABYLON.StandardMaterial("ammoMat", this.game.scene);
        newAmmo.material.diffuseColor = this.game.armory.weapons[typeAmmos].setup.colorMesh;
        newAmmo.typeAmmo = type;

        return newAmmo;
    },
    _checkProps: function () {
        // Pour les bonus
        for (var i = 0; i < this.bonusBox; i++) {
            // On vérifie si la distance est inférieure à 6
            if (BABYLON.Vector3.Distance(
                this.game._PlayerData.camera.playerBox.position,
                this.bonusBox[i].position) < 6) {
                var paramsBonus = this.Armory.bonuses[this.bonusBox[i].typeBonus];

                this.game._PlayerData.givePlayerBonus(paramsBonus.type, paramsBonus.value);

                // Pour bonusBox
                this.pickableDestroyed(this.bonusBox[i].idServer, 'bonus');

                // On supprime l'objet
                this.bonusBox[i].dispose();
                this.bonusBox.splice(i, 1)
            }

        }
        for (var i = 0; i < this.weaponBox; i++) {
            // Pour les armes
            if (BABYLON.Vector3.Distance(
                this.game._PlayerData.camera.playerBox.position,
                this.weaponBox[i].position) < 6) {
                var Weapons = this.game._PlayerData.camera.weapons;
                var paramsWeapon = this.Armory.weapons[this.weaponBox[i].typeWeapon];
                var notPiked = true;
                for (var y = 0; y < Weapons.inventory.length; y++) {
                    if (Weapons.inventory[y].typeWeapon == this.weaponBox[i].typeWeapon) {
                        notPiked = false;
                        break;
                    }
                }
                if (notPiked) {

                    var actualInventoryWeapon = Weapons.inventory[Weapons.actualWeapon];

                    var newWeapon = Weapons.newWeapon(paramsWeapon.name);
                    Weapons.inventory.push(newWeapon);

                    // On réinitialise la position de l'arme précédente animé
                    actualInventoryWeapon.position = actualInventoryWeapon.basePosition.clone();
                    actualInventoryWeapon.rotation = actualInventoryWeapon.baseRotation.clone();
                    Weapons._animationDelta = 0;

                    actualInventoryWeapon.isActive = false;

                    Weapons.actualWeapon = Weapons.inventory - 1;
                    actualInventoryWeapon = Weapons.inventory[Weapons.actualWeapon];

                    actualInventoryWeapon.isActive = true;

                    Weapons.fireRate = Weapons.Armory.weapons[actualInventoryWeapon.typeWeapon].setup.cadency;
                    Weapons._deltaFireRate = Weapons.fireRate;

                    // Pour weaponBox
                    this.pickableDestroyed(this.weaponBox[i].idServer, 'weapon');

                    this.weaponBox[i].dispose();
                    this.weaponBox.splice(i, 1);
                }
            }
        }
        for (var i = 0; i < this.ammosBox; i++) {
            // Pour les munitions
            if (BABYLON.Vector3.Distance(
                this.game._PlayerData.camera.playerBox.position,
                this.ammosBox[i].position) < 6) {

                var paramsAmmos = this.Armory.weapons[this.ammosBox[i].typeAmmo].setup.ammos;
                var Weapons = this.game._PlayerData.camera.weapons;

                Weapons.reloadWeapon(this.ammosBox[i].typeAmmo, paramsAmmos.refuel);

                // Pour ammosBox
                this.pickableDestroyed(this.ammosBox[i].idServer, 'ammos');

                this.ammosBox[i].dispose();
                this.ammosBox.splice(i, 1)
            }

        }
    },
};

