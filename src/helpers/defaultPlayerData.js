import { ITEMS } from "../assets/items";
import _ from "lodash";
import { PERKS } from "../assets/perks";
import { QUIRKS } from "../assets/quirks";
import { ENERGY_NGUS, MAGIC_NGUS } from "@/assets/ngus";
import { BEARDS } from "@/assets/beards";
import { DIGGERS } from "@/assets/diggers";
import { CHALLENGES } from "@/assets/challenges";

export function defaultPlayerData(playerData, info) {
    const playerExists = (playerData && Object.keys(playerData).length > 0)
    if (playerExists) {
        switch(info) {
            case 'baseEnergyPower':
                return playerData.energyPower;
            case 'baseEnergyBar':
                return playerData.energyBars.low;
            case 'baseEnergyCap':
                return playerData.capEnergy.low;
            case 'baseMagicBar':
                return playerData.magic.magicPerBar.low;
            case 'baseMagicCap':
                return playerData.magic.capMagic.low;
            case 'baseMagicPower':
                return playerData.magic.magicPower;
            case 'baseResource3Bar':
                return playerData.res3.res3PerBar.low;
            case 'baseResource3Cap':
                return playerData.res3.capRes3.low;
            case 'baseResource3Power':
                return playerData.res3.res3Power;

            case 'currentEnergyCap':
                return playerData.curEnergy.low;
            case 'currentMagicCap':
                return playerData.magic.curMagic.low;

            case 'energyNGUAugmentsLevel':
                return playerData.NGU.skills[0].level.low;
            case 'energyNGUWandoosLevel':
                return playerData.NGU.skills[1].level.low;
            case 'energyNGURespawnLevel':
                return playerData.NGU.skills[2].level.low;
            case 'energyNGUGoldLevel':
                return playerData.NGU.skills[3].level.low;
            case 'energyNGUAdventureALevel':
                return playerData.NGU.skills[4].level.low;
            case 'energyNGUPowerALevel':
                return playerData.NGU.skills[5].level.low;
            case 'energyNGUDropChanceLevel':
                return playerData.NGU.skills[6].level.low;
            case 'energyNGUMagicNGULevel':
                return playerData.NGU.skills[7].level.low;
            case 'energyNGUPPLevel':
                return playerData.NGU.skills[8].level.low;
            case 'energyNGUAugmentsTarget':
                return playerData.NGU.skills[0].target.low;
            case 'energyNGUWandoosTarget':
                return playerData.NGU.skills[1].target.low;
            case 'energyNGURespawnTarget':
                return playerData.NGU.skills[2].target.low;
            case 'energyNGUGoldTarget':
                return playerData.NGU.skills[3].target.low;
            case 'energyNGUAdventureATarget':
                return playerData.NGU.skills[4].target.low;
            case 'energyNGUPowerATarget':
                return playerData.NGU.skills[5].target.low;
            case 'energyNGUDropChanceTarget':
                return playerData.NGU.skills[6].target.low;
            case 'energyNGUMagicNGUTarget':
                return playerData.NGU.skills[7].target.low;
            case 'energyNGUPPTarget':
                return playerData.NGU.skills[8].target.low;
                
            case 'magicNGUYggdrasilLevel':
                return playerData.NGU.magicSkills[0].level.low;
            case 'magicNGUExpLevel':
                return playerData.NGU.magicSkills[1].level.low;
            case 'magicNGUPowerBLevel':
                return playerData.NGU.magicSkills[2].level.low;
            case 'magicNGUNumberLevel':
                return playerData.NGU.magicSkills[3].level.low;
            case 'magicNGUTimeMachineLevel':
                return playerData.NGU.magicSkills[4].level.low;
            case 'magicNGUEnergyNGULevel':
                return playerData.NGU.magicSkills[5].level.low;
            case 'magicNGUAdventureBLevel':
                return playerData.NGU.magicSkills[6].level.low;
            case 'magicNGUYggdrasilTarget':
                return playerData.NGU.magicSkills[0].target.low;
            case 'magicNGUExpTarget':
                return playerData.NGU.magicSkills[1].target.low;
            case 'magicNGUPowerBTarget':
                return playerData.NGU.magicSkills[2].target.low;
            case 'magicNGUNumberTarget':
                return playerData.NGU.magicSkills[3].target.low;
            case 'magicNGUTimeMachineTarget':
                return playerData.NGU.magicSkills[4].target.low;
            case 'magicNGUEnergyNGUTarget':
                return playerData.NGU.magicSkills[5].target.low;
            case 'magicNGUAdventureBTarget':
                return playerData.NGU.magicSkills[6].target.low;
            case 'resource3Active':
                return playerData.res3.res3On;


            case 'beards':
                var beards = []
                playerData.beards.beards.forEach((beard, index) => {
                    if (!_.isUndefined(BEARDS[index])) {
                        var b = BEARDS[index]
                        b.setLevel(beard.beardLevel.low, beard.permLevel.low)
                        beards.push(b)
                    }
                })
                
                return beards
            case 'challenges':
                var challenges = []
                for (var c = 0; c < 11; c++) {
                    challenges.push(CHALLENGES[c])
                }
                challenges[0].importStats(playerData.challenges.basicChallenge)
                challenges[1].importStats(playerData.challenges.noAugsChallenge)
                challenges[2].importStats(playerData.challenges.hour24Challenge)
                challenges[3].importStats(playerData.challenges.levelChallenge10k)
                challenges[4].importStats(playerData.challenges.noEquipmentChallenge)
                challenges[5].importStats(playerData.challenges.trollChallenge)
                challenges[6].importStats(playerData.challenges.noRebirthChallenge)
                challenges[7].importStats(playerData.challenges.laserSwordChallenge)
                challenges[8].importStats(playerData.challenges.blindChallenge)
                challenges[9].importStats(playerData.challenges.nguChallenge)
                challenges[10].importStats(playerData.challenges.timeMachineChallenge)

                return challenges
            case 'diggers':
                var diggers = []
                playerData.diggers.diggers.forEach((digger, id) => {
                    var d = DIGGERS[id]
                    if (!_.isUndefined(d)) {
                        d.active = digger.active == 1 ? true : false;
                        d.setLevel(digger.curLevel.low, digger.maxLevel.low)
                        diggers.push(d)
                    }
                })
                return diggers;

            case 'equipmentWeapon':
                var weapon = playerData.inventory.weapon;
                var item = ITEMS[weapon.id]
                item.importStats(weapon)
                return item
            case 'equipmentHead':
                var head = playerData.inventory.head;
                var item = ITEMS[head.id]
                item.importStats(head)
                return item
            case 'equipmentChest':
                var chest = playerData.inventory.chest;
                var item = ITEMS[chest.id]
                item.importStats(chest)
                return item
            case 'equipmentLegs':
                var legs = playerData.inventory.legs;
                var item = ITEMS[legs.id]
                item.importStats(legs)
                return item
            case 'equipmentBoots':
                var boots = playerData.inventory.boots;
                var item = ITEMS[boots.id]
                item.importStats(boots)
                return item
            case 'equipmentAccesories':
                var accesories = playerData.inventory.accs.filter(acc => !_.isUndefined(acc.id) && !_.isNaN(acc.id))
                
                return accesories.map((acc) => {
                    var item = ITEMS[acc.id]
                    item.importStats(acc)
                    return item
                })
            case 'energyNGUs':
                var energyNGUs = []
                playerData.NGU.skills.forEach((engu, index) => {
                    var ngu = ENERGY_NGUS[index]
                    if (!_.isUndefined(ngu)) {
                        ngu.importStats(engu)
                        energyNGUs.push(ngu)
                    }
                })
                return energyNGUs
            case 'magicNGUs':
                var magicNGUs = []
                playerData.NGU.magicSkills.forEach((mngu, index) => {
                    var ngu = MAGIC_NGUS[index]
                    if (!_.isUndefined(ngu)) {
                        ngu.importStats(mngu)
                        magicNGUs.push(ngu)
                    }
                })
                return magicNGUs
            case 'perks':
                var perks = []
                playerData.adventure.itopod.perkLevel.forEach((perk, index) => {
                    if (!_.isUndefined(perk.low) && perk.low > 0) {
                        if (!_.isUndefined(PERKS[index])) {
                            var p = PERKS[index]
                            p.setLevel(perk.low)
                            perks.push(p)
                        }
                    }
                })
                
                return perks
            case 'quirks':
                var quirks = []
                playerData.beastQuest.quirkLevel.forEach((quirk, index) => {
                    if (!_.isUndefined(quirk.low) && quirk.low > 0) {
                        if (!_.isUndefined(QUIRKS[index])) {
                            var q = QUIRKS[index]
                            q.setLevel(quirk.low)
                            quirks.push(q)
                        }
                    }
                })
                return quirks;
            case 'maxxedItems':
                var maxxedItemIds = []
                playerData.inventory.itemList.itemMaxxed.forEach((maxxed, item) => {
                    if (maxxed == 1) {
                        maxxedItemIds.push(item)
                    }
                })
                return maxxedItemIds
            default:
                return 0;
        }
    }
    if (info in getPlayerOptions()) {
        return {};   
    }
    return 0;
}

export function getPlayerNumberOptions() {
    return [
        'baseEnergyPower',
        'baseEnergyBar',
        'baseEnergyCap',
        'baseMagicBar',
        'baseMagicCap',
        'baseMagicPower',
        'baseResource3Bar',
        'baseResource3Cap',
        'baseResource3Power',
        'currentEnergyCap',
        'currentMagicCap',
        'energyNGUAugmentsLevel',
        'energyNGUWandoosLevel',
        'energyNGURespawnLevel',
        'energyNGUGoldLevel',
        'energyNGUAdventureALevel',
        'energyNGUPowerALevel',
        'energyNGUDropChanceLevel',
        'energyNGUMagicNGULevel',
        'energyNGUPPLevel',
        'energyNGUAugmentsTarget',
        'energyNGUWandoosTarget',
        'energyNGURespawnTarget',
        'energyNGUGoldTarget',
        'energyNGUAdventureATarget',
        'energyNGUPowerATarget',
        'energyNGUDropChanceTarget',
        'energyNGUMagicNGUTarget',
        'energyNGUPPTarget',
        'magicNGUYggdrasilLevel',
        'magicNGUExpLevel',
        'magicNGUPowerBLevel',
        'magicNGUNumberLevel',
        'magicNGUTimeMachineLevel',
        'magicNGUEnergyNGULevel',
        'magicNGUAdventureBLevel',
        'magicNGUYggdrasilTarget',
        'magicNGUExpTarget',
        'magicNGUPowerBTarget',
        'magicNGUNumberTarget',
        'magicNGUTimeMachineTarget',
        'magicNGUEnergyNGUTarget',
        'magicNGUAdventureBTarget',
        'resource3Active',
    ]
}


export function getPlayerOptions() {
    return [
        'beards',
        'challenges',
        'diggers',
        'equipmentHead',
        'equipmentLegs',
        'equipmentChest',
        'equipmentBoots',
        'equipmentWeapon',
        'equipmentAccesories',
        'energyNGUs',
        'magicNGUs',
        'perks',
        'quirks',
        'maxxedItems',
    ]
}