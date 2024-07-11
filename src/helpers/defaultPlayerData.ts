import { ITEMS, Item } from "../assets/items";
import _ from "lodash";
import { PERKS, Perk } from "../assets/perks";
import { QUIRKS, Quirk } from "../assets/quirks";
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { BEARDS, Beard } from "@/assets/beards";
import { DIGGERS, Digger } from "@/assets/diggers";
import { CHALLENGES, Challenge } from "@/assets/challenges";
import { boostRecyclying, totalDropChance, totalEnergyCap, totalEnergyNGUSpeedFactor, totalMagicCap, totalMagicNGUSpeedFactor, totalPPBonus, totalPower, totalRespawnRate } from "./calculators";
import { APITEMS, APItem } from "@/assets/apItems";
import { ItemSet, ItemSets } from "@/assets/sets";
import { ADVTRAININGS, AdvTraining } from "@/assets/advTraining";
import { MACGUFFINS, MacGuffin } from "@/assets/macguffins";
import { bd } from "./numbers";
import { isMaxxedItem, isMaxxedItemSet } from "./resourceInfo";
import { GameMode } from "../assets/mode";
import { HACKS, Hack } from "@/assets/hacks";

export function defaultPlayerData(playerData : any, info : string) : any {
    const playerExists = (playerData && Object.keys(playerData).length > 0)
    if (playerExists) {
        switch(info) {
            case 'baseAdventurePower':
                return playerData.adventure.attack
            case 'baseAdventureToughness':
                return playerData.adventure.defense
            case 'baseEnergyPower':
                return playerData.energyPower;
            case 'baseEnergyBar':
                return playerData.energyBars;
            case 'baseEnergyCap':
                return playerData.capEnergy;
            case 'baseMagicBar':
                return playerData.magic.magicPerBar;
            case 'baseMagicCap':
                return playerData.magic.capMagic;
            case 'baseMagicPower':
                return playerData.magic.magicPower;
            case 'baseResource3Bar':
                return playerData.res3.res3PerBar;
            case 'baseResource3Cap':
                return playerData.res3.capRes3;
            case 'baseResource3Power':
                return playerData.res3.res3Power;

            case 'beastMode':
                return playerData.adventure.beastModeOn
            case 'bloodMagicDropChance':
                if (playerData.bloodMagic.lootSpellBlood == '0') {
                    return 0
                }
                return Math.ceil(Math.log2(playerData.bloodMagic.lootSpellBlood / 10000))
            case 'bloodMagicTimeMachine':
                return Math.ceil(Math.log2(playerData.bloodMagic.goldSpellBlood / 1000000) ** 2)
            case 'boostRecyclyingPurchase':
                return playerData.purchases.boost

            case 'cubePower':
                return playerData.inventory.cubePower;
            case 'cubeToughness':
                return playerData.inventory.cubeToughness;

            case 'energyNGUAugmentsLevel':
                return playerData.NGU.skills[0].level;
            case 'energyNGUWandoosLevel':
                return playerData.NGU.skills[1].level;
            case 'energyNGURespawnLevel':
                return playerData.NGU.skills[2].level;
            case 'energyNGUGoldLevel':
                return playerData.NGU.skills[3].level;
            case 'energyNGUAdventureALevel':
                return playerData.NGU.skills[4].level;
            case 'energyNGUPowerALevel':
                return playerData.NGU.skills[5].level;
            case 'energyNGUDropChanceLevel':
                return playerData.NGU.skills[6].level;
            case 'energyNGUMagicNGULevel':
                return playerData.NGU.skills[7].level;
            case 'energyNGUPPLevel':
                return playerData.NGU.skills[8].level;
            case 'energyNGUAugmentsTarget':
                return playerData.NGU.skills[0].target;
            case 'energyNGUWandoosTarget':
                return playerData.NGU.skills[1].target;
            case 'energyNGURespawnTarget':
                return playerData.NGU.skills[2].target;
            case 'energyNGUGoldTarget':
                return playerData.NGU.skills[3].target;
            case 'energyNGUAdventureATarget':
                return playerData.NGU.skills[4].target;
            case 'energyNGUPowerATarget':
                return playerData.NGU.skills[5].target;
            case 'energyNGUDropChanceTarget':
                return playerData.NGU.skills[6].target;
            case 'energyNGUMagicNGUTarget':
                return playerData.NGU.skills[7].target;
            case 'energyNGUPPTarget':
                return playerData.NGU.skills[8].target;
            case 'energyNGUAugmentsEvilLevel':
                return playerData.NGU.skills[0].evilLevel;
            case 'energyNGUWandoosEvilLevel':
                return playerData.NGU.skills[1].evilLevel;
            case 'energyNGURespawnEvilLevel':
                return playerData.NGU.skills[2].evilLevel;
            case 'energyNGUGoldEvilLevel':
                return playerData.NGU.skills[3].evilLevel;
            case 'energyNGUAdventureAEvilLevel':
                return playerData.NGU.skills[4].evilLevel;
            case 'energyNGUPowerAEvilLevel':
                return playerData.NGU.skills[5].evilLevel;
            case 'energyNGUDropChanceEvilLevel':
                return playerData.NGU.skills[6].evilLevel;
            case 'energyNGUMagicNGUEvilLevel':
                return playerData.NGU.skills[7].evilLevel;
            case 'energyNGUPPEvilLevel':
                return playerData.NGU.skills[8].evilLevel;
            case 'energyNGUAugmentsEvilTarget':
                return playerData.NGU.skills[0].evilTarget;
            case 'energyNGUWandoosEvilTarget':
                return playerData.NGU.skills[1].evilTarget;
            case 'energyNGURespawnEvilTarget':
                return playerData.NGU.skills[2].evilTarget;
            case 'energyNGUGoldEvilTarget':
                return playerData.NGU.skills[3].evilTarget;
            case 'energyNGUAdventureAEvilTarget':
                return playerData.NGU.skills[4].evilTarget;
            case 'energyNGUPowerAEvilTarget':
                return playerData.NGU.skills[5].evilTarget;
            case 'energyNGUDropChanceEvilTarget':
                return playerData.NGU.skills[6].evilTarget;
            case 'energyNGUMagicNGUEvilTarget':
                return playerData.NGU.skills[7].evilTarget;
            case 'energyNGUPPEvilTarget':
                return playerData.NGU.skills[8].evilTarget;
            case 'energyNGUAugmentsSadisticLevel':
                return playerData.NGU.skills[0].sadisticLevel;
            case 'energyNGUWandoosSadisticLevel':
                return playerData.NGU.skills[1].sadisticLevel;
            case 'energyNGURespawnSadisticLevel':
                return playerData.NGU.skills[2].sadisticLevel;
            case 'energyNGUGoldSadisticLevel':
                return playerData.NGU.skills[3].sadisticLevel;
            case 'energyNGUAdventureASadisticLevel':
                return playerData.NGU.skills[4].sadisticLevel;
            case 'energyNGUPowerASadisticLevel':
                return playerData.NGU.skills[5].sadisticLevel;
            case 'energyNGUDropChanceSadisticLevel':
                return playerData.NGU.skills[6].sadisticLevel;
            case 'energyNGUMagicNGUSadisticLevel':
                return playerData.NGU.skills[7].sadisticLevel;
            case 'energyNGUPPSadisticLevel':
                return playerData.NGU.skills[8].sadisticLevel;
            case 'energyNGUAugmentsSadisticTarget':
                return playerData.NGU.skills[0].sadisticTarget;
            case 'energyNGUWandoosSadisticTarget':
                return playerData.NGU.skills[1].sadisticTarget;
            case 'energyNGURespawnSadisticTarget':
                return playerData.NGU.skills[2].sadisticTarget;
            case 'energyNGUGoldSadisticTarget':
                return playerData.NGU.skills[3].sadisticTarget;
            case 'energyNGUAdventureASadisticTarget':
                return playerData.NGU.skills[4].sadisticTarget;
            case 'energyNGUPowerASadisticTarget':
                return playerData.NGU.skills[5].sadisticTarget;
            case 'energyNGUDropChanceSadisticTarget':
                return playerData.NGU.skills[6].sadisticTarget;
            case 'energyNGUMagicNGUSadisticTarget':
                return playerData.NGU.skills[7].sadisticTarget;
            case 'energyNGUPPSadisticTarget':
                return playerData.NGU.skills[8].sadisticTarget;
                
            case 'magicNGUYggdrasilLevel':
                return playerData.NGU.magicSkills[0].level;
            case 'magicNGUExpLevel':
                return playerData.NGU.magicSkills[1].level;
            case 'magicNGUPowerBLevel':
                return playerData.NGU.magicSkills[2].level;
            case 'magicNGUNumberLevel':
                return playerData.NGU.magicSkills[3].level;
            case 'magicNGUTimeMachineLevel':
                return playerData.NGU.magicSkills[4].level;
            case 'magicNGUEnergyNGULevel':
                return playerData.NGU.magicSkills[5].level;
            case 'magicNGUAdventureBLevel':
                return playerData.NGU.magicSkills[6].level;
            case 'magicNGUYggdrasilTarget':
                return playerData.NGU.magicSkills[0].target;
            case 'magicNGUExpTarget':
                return playerData.NGU.magicSkills[1].target;
            case 'magicNGUPowerBTarget':
                return playerData.NGU.magicSkills[2].target;
            case 'magicNGUNumberTarget':
                return playerData.NGU.magicSkills[3].target;
            case 'magicNGUTimeMachineTarget':
                return playerData.NGU.magicSkills[4].target;
            case 'magicNGUEnergyNGUTarget':
                return playerData.NGU.magicSkills[5].target;
            case 'magicNGUAdventureBTarget':
                return playerData.NGU.magicSkills[6].target;
            case 'magicNGUYggdrasilEvilLevel':
                return playerData.NGU.magicSkills[0].evilLevel;
            case 'magicNGUExpEvilLevel':
                return playerData.NGU.magicSkills[1].evilLevel;
            case 'magicNGUPowerBEvilLevel':
                return playerData.NGU.magicSkills[2].evilLevel;
            case 'magicNGUNumberEvilLevel':
                return playerData.NGU.magicSkills[3].evilLevel;
            case 'magicNGUTimeMachineEvilLevel':
                return playerData.NGU.magicSkills[4].evilLevel;
            case 'magicNGUEnergyNGUEvilLevel':
                return playerData.NGU.magicSkills[5].evilLevel;
            case 'magicNGUAdventureBEvilLevel':
                return playerData.NGU.magicSkills[6].evilLevel;
            case 'magicNGUYggdrasilEvilTarget':
                return playerData.NGU.magicSkills[0].evilTarget;
            case 'magicNGUExpEvilTarget':
                return playerData.NGU.magicSkills[1].evilTarget;
            case 'magicNGUPowerBEvilTarget':
                return playerData.NGU.magicSkills[2].evilTarget;
            case 'magicNGUNumberEvilTarget':
                return playerData.NGU.magicSkills[3].evilTarget;
            case 'magicNGUTimeMachineEvilTarget':
                return playerData.NGU.magicSkills[4].evilTarget;
            case 'magicNGUEnergyNGUEvilTarget':
                return playerData.NGU.magicSkills[5].evilTarget;
            case 'magicNGUAdventureBEvilTarget':
                return playerData.NGU.magicSkills[6].evilTarget;
            case 'magicNGUYggdrasilSadisticLevel':
                return playerData.NGU.magicSkills[0].sadisticLevel;
            case 'magicNGUExpSadisticLevel':
                return playerData.NGU.magicSkills[1].sadisticLevel;
            case 'magicNGUPowerBSadisticLevel':
                return playerData.NGU.magicSkills[2].sadisticLevel;
            case 'magicNGUNumberSadisticLevel':
                return playerData.NGU.magicSkills[3].sadisticLevel;
            case 'magicNGUTimeMachineSadisticLevel':
                return playerData.NGU.magicSkills[4].sadisticLevel;
            case 'magicNGUEnergyNGUSadisticLevel':
                return playerData.NGU.magicSkills[5].sadisticLevel;
            case 'magicNGUAdventureBSadisticLevel':
                return playerData.NGU.magicSkills[6].sadisticLevel;
            case 'magicNGUYggdrasilSadisticTarget':
                return playerData.NGU.magicSkills[0].sadisticTarget;
            case 'magicNGUExpSadisticTarget':
                return playerData.NGU.magicSkills[1].sadisticTarget;
            case 'magicNGUPowerBSadisticTarget':
                return playerData.NGU.magicSkills[2].sadisticTarget;
            case 'magicNGUNumberSadisticTarget':
                return playerData.NGU.magicSkills[3].sadisticTarget;
            case 'magicNGUTimeMachineSadisticTarget':
                return playerData.NGU.magicSkills[4].sadisticTarget;
            case 'magicNGUEnergyNGUSadisticTarget':
                return playerData.NGU.magicSkills[5].sadisticTarget;
            case 'magicNGUAdventureBSadisticTarget':
                return playerData.NGU.magicSkills[6].sadisticTarget;


            case 'gameMode':
                return playerData.settings.rebirthDifficulty.value__;
            case 'resource3Active':
                return playerData.res3.res3On;
            case 'yggdrasilDropChance':
                return playerData.yggdrasil.totalLuck / 20 + 100



            case 'achievements':
                return playerData.achievements.achievementComplete
            case 'advTrainings':
                var advTrainings: AdvTraining[] = []
                for (var c = 0; c < 5; c++) {
                    advTrainings.push(ADVTRAININGS[c])
                }
                for (var c = 0; c < 5; c++) {
                    advTrainings[c].setLevel(playerData.advancedTraining.level[c])
                }
                return advTrainings
            case 'apItems':
                var apItems : APItem[] = []
                if (playerData.arbitrary.energyPotion1Time.totalseconds > 0) {
                    var apItem = APITEMS['energyPotionA'];
                    apItem.setLevel(1)
                    apItems.push(apItem)
                }
                if (playerData.arbitrary.magicPotion1Time.totalseconds > 0) {
                    var apItem = APITEMS['magicPotionA'];
                    apItem.setLevel(1)
                    apItems.push(apItem)
                }
                if (playerData.arbitrary.energyPotion2InUse == 1) {
                    var apItem = APITEMS['energyPotionB'];
                    apItem.setLevel(1)
                    apItems.push(apItem)
                }
                if (playerData.arbitrary.magicPotion2InUse == 1) {
                    var apItem = APITEMS['magicPotionB'];
                    apItem.setLevel(1)
                    apItems.push(apItem)
                }
                return apItems;
            case 'beards':
                var beards : Beard[] = []
                playerData.beards.beards.forEach((beard : any, index : number) => {
                    if (!_.isUndefined(BEARDS[index])) {
                        var b = BEARDS[index]
                        b.setLevel(beard.beardLevel)
                        b.setPermLevel(beard.permLevel)
                        b.setActive(beard.active)
                        beards.push(b)
                    }
                })
                
                return beards
            case 'challenges':
                var challenges : Challenge[] = []
                var evilChallenges : Challenge[] = []
                var sadChallenges : Challenge[] = []
                for (var c = 0; c < 11; c++) {
                    challenges.push(CHALLENGES[c])
                    evilChallenges.push(CHALLENGES[c + 100])
                    sadChallenges.push(CHALLENGES[c + 200])
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
                
                evilChallenges[0].importStats(playerData.challenges.basicChallenge)
                evilChallenges[1].importStats(playerData.challenges.noAugsChallenge)
                evilChallenges[2].importStats(playerData.challenges.hour24Challenge)
                evilChallenges[3].importStats(playerData.challenges.levelChallenge10k)
                evilChallenges[4].importStats(playerData.challenges.noEquipmentChallenge)
                evilChallenges[5].importStats(playerData.challenges.trollChallenge)
                evilChallenges[6].importStats(playerData.challenges.noRebirthChallenge)
                evilChallenges[7].importStats(playerData.challenges.laserSwordChallenge)
                evilChallenges[8].importStats(playerData.challenges.blindChallenge)
                evilChallenges[9].importStats(playerData.challenges.nguChallenge)
                evilChallenges[10].importStats(playerData.challenges.timeMachineChallenge)

                sadChallenges[0].importStats(playerData.challenges.basicChallenge)
                sadChallenges[1].importStats(playerData.challenges.noAugsChallenge)
                sadChallenges[2].importStats(playerData.challenges.hour24Challenge)
                sadChallenges[3].importStats(playerData.challenges.levelChallenge10k)
                sadChallenges[4].importStats(playerData.challenges.noEquipmentChallenge)
                sadChallenges[5].importStats(playerData.challenges.trollChallenge)
                sadChallenges[6].importStats(playerData.challenges.noRebirthChallenge)
                sadChallenges[7].importStats(playerData.challenges.laserSwordChallenge)
                sadChallenges[8].importStats(playerData.challenges.blindChallenge)
                sadChallenges[9].importStats(playerData.challenges.nguChallenge)
                sadChallenges[10].importStats(playerData.challenges.timeMachineChallenge);

                var cc : {[key:number] : Challenge[]} = {}
                cc[GameMode.NORMAL] = challenges
                cc[GameMode.EVIL] = evilChallenges;
                cc[GameMode.SADISTIC] = sadChallenges;

                // return challenges.concat(evilChallenges, sadChallenges)
                return cc
            case 'diggers':
                var diggers : Digger[] = []
                playerData.diggers.diggers.forEach((digger : any, id : number) => {
                    var d = DIGGERS[id]
                    if (!_.isUndefined(d)) {
                        d.active = digger.active == 1 ? true : false;
                        d.setLevel(digger.curLevel)
                        d.setMaxLevel(digger.maxLevel)
                        diggers.push(d)
                    }
                })
                return diggers;

            case 'equipmentWeapon':
                var weapon : any = playerData.inventory.weapon;
                var item : Item = ITEMS[weapon.id]
                item.importStats(weapon)
                return item
            case 'equipmentHead':
                var head : any = playerData.inventory.head;
                var item : Item = ITEMS[head.id]
                item.importStats(head)
                return item
            case 'equipmentChest':
                var chest : any = playerData.inventory.chest;
                var item : Item= ITEMS[chest.id]
                item.importStats(chest)
                return item
            case 'equipmentLegs':
                var legs : any = playerData.inventory.legs;
                var item : Item = ITEMS[legs.id]
                item.importStats(legs)
                return item
            case 'equipmentBoots':
                var boots : any = playerData.inventory.boots;
                var item : Item = ITEMS[boots.id]
                item.importStats(boots)
                return item
            case 'equipmentAccesories':
                var accesories : any = playerData.inventory.accs.filter((acc : any) => !_.isUndefined(acc.id) && !_.isNaN(acc.id))
                
                return accesories.map((acc : any) => {
                    var item : Item = ITEMS[acc.id]
                    item.importStats(acc)

                    return item
                })
            case 'equipmentTest':
                var items : any = playerData.inventory.inventory.filter((it : any) => !_.isUndefined(it.id) && !_.isNaN(it.id) && it.id > 0)
                
                return items.map((it : any) => {
                    if(!_.isUndefined(ITEMS[it.id])) {
                        var item : Item = ITEMS[it.id]
                        return item
                    } else {
                        console.log(it, " is missing from item list.")
                    }
                })
            case 'energyNGUs':
                var energyNGUs : NGU[] = []
                playerData.NGU.skills.forEach((engu : any, index : number) => {
                    if (!_.isUndefined(engu.level)) {
                        for (var i = 0; i < 3; i++) {
                            var ngu : NGU = ENERGY_NGUS[index + (i * 10)]
                            if (!_.isUndefined(ngu)) {
                                ngu.importStats(engu)
                                energyNGUs.push(ngu)
                            }
                        }
                    }
                })
                return energyNGUs
            case 'magicNGUs':
                var magicNGUs : NGU[] = []
                playerData.NGU.magicSkills.forEach((mngu : any, index : number) => {
                    if (!_.isUndefined(mngu.level)) {
                        for (var i = 0; i < 3; i++) {
                            var ngu : NGU = MAGIC_NGUS[index + (i * 10)]
                            if (!_.isUndefined(ngu)) {
                                ngu.importStats(mngu)
                                magicNGUs.push(ngu)
                            }
                        }
                    }
                })
                return magicNGUs

            case 'hacks':
                var hacks: Hack[] = []
                playerData.hacks.hacks.forEach((hackData : any, index : number) => {
                    if(index < 15) {
                        var hack : Hack = HACKS[index]
                        if(!_.isUndefined(hack)) {
                            hack.importStats(hackData)
                            hacks.push(hack)
                        }
                    }
                })
                console.log(hacks)
                return hacks

            case 'macguffins':
                var macguffins : MacGuffin[] = []

                for (var c = 0; c < 22; c++) {
                    macguffins.push(MACGUFFINS[c])
                }
                playerData.inventory.macguffins.forEach((macguffin : any, index : number) => {
                    if(macguffin.id > 0) {
                        var macID = 0;
                        switch(macguffin.id) {
                            case 250:
                                macID = 14
                                break;
                            case 289:
                                macID = 15
                                break;
                            case 290:
                                macID = 16
                                break;
                            case 291:
                                macID = 17
                                break;
                            case 228:
                                macID = 18
                                break;
                            case 298:
                                macID = 19
                                break;
                            case 299:
                                macID = 20
                                break;
                            case 300:
                                macID = 21
                                break;
                            default:
                                macID = macguffin.id - 198
                        }
                        macguffins[macID].setLevel(macguffin.level)
                    }
                })

                for (var c = 0; c < 22; c++) {
                    macguffins[c].importStats(playerData.inventory.macguffinBonuses);
                }
                
                return macguffins
            case 'perks':
                var perks : Perk[] = []
                playerData.adventure.itopod.perkLevel.forEach((perk : any, index : number) => {
                    if (!_.isUndefined(perk) && perk > 0) {
                        if (!_.isUndefined(PERKS[index])) {
                            var p = PERKS[index]
                            p.setLevel(perk)
                            perks.push(p)
                        }
                    }
                })
                
                return perks
            case 'quirks':
                var quirks : Quirk[]= []
                playerData.beastQuest.quirkLevel.forEach((quirk : any, index : number) => {
                    if (!_.isUndefined(quirk) && quirk > 0) {
                        if (!_.isUndefined(QUIRKS[index])) {
                            var q = QUIRKS[index]
                            q.setLevel(quirk)
                            quirks.push(q)
                        }
                    }
                })
                return quirks;
            case 'itemSets':
                var itemSets : {[key: string]: ItemSet} = {}
                for (var set of Object.values(ItemSets)) {
                    set.updateStats(playerData)
                    itemSets[set.key] = set
                }
                
                return itemSets
            case 'maxxedItems':
                var maxxedItemIds : number[] = []
                playerData.inventory.itemList.itemMaxxed.forEach((maxxed: number, item: number) => {
                    if (maxxed == 1) {
                        maxxedItemIds.push(item)
                    }
                })
                return maxxedItemIds

            // Calculations
            case 'blueHeart^':
                // Blue Heart // 196
                return isMaxxedItem(playerData, 196) ? bd(1) : bd(0)
            case 'boostRecyclying%':
                return boostRecyclying(playerData);
            case 'currentEnergyCap':
                return totalEnergyCap(playerData);
            case 'currentMagicCap':
                return totalMagicCap(playerData);
            case 'redLiquidBonus^':
                // - Mysterious Red Liquid // 93
                return isMaxxedItem(playerData, 93) ? bd(1) : bd(0)
            case 'spoopySetBonus^':
                return isMaxxedItemSet(playerData, ItemSets.SPOOPY) ? bd(1) : bd(0)
            case 'totalEnergyNGUSpeedFactor%':
                return totalEnergyNGUSpeedFactor(playerData);
            case 'totalMagicNGUSpeedFactor%':
                return totalMagicNGUSpeedFactor(playerData);
            case 'totalPPBonus%':
                return totalPPBonus(playerData)
            case 'totalPower':
                return totalPower(playerData);
            case 'totalRespawnTime':
                return totalRespawnRate(playerData).divide(bd(25));
            case 'totalDropChance%':
                return totalDropChance(playerData);
            
            
            default:
                return 0;
        }
    }
    if (info in getPlayerOptions()) {
        return {};   
    }
    return 0;
}

export function getPlayerNumberOptions() : string[]{
    return [
        'baseAdventurePower',
        'baseAdventureToughness',
        'baseEnergyPower',
        'baseEnergyBar',
        'baseEnergyCap',
        'baseMagicBar',
        'baseMagicCap',
        'baseMagicPower',
        'baseResource3Bar',
        'baseResource3Cap',
        'baseResource3Power',
        'beastMode',
        'bloodMagicDropChance',
        'bloodMagicTimeMachine',
        'boostRecyclyingPurchase',
        'cubePower',
        'cubeToughness',
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
        'energyNGUAugmentsEvilLevel',
        'energyNGUWandoosEvilLevel',
        'energyNGURespawnEvilLevel',
        'energyNGUGoldEvilLevel',
        'energyNGUAdventureAEvilLevel',
        'energyNGUPowerAEvilLevel',
        'energyNGUDropChanceEvilLevel',
        'energyNGUMagicNGUEvilLevel',
        'energyNGUPPEvilLevel',
        'energyNGUAugmentsEvilTarget',
        'energyNGUWandoosEvilTarget',
        'energyNGURespawnEvilTarget',
        'energyNGUGoldEvilTarget',
        'energyNGUAdventureAEvilTarget',
        'energyNGUPowerAEvilTarget',
        'energyNGUDropChanceEvilTarget',
        'energyNGUMagicNGUEvilTarget',
        'energyNGUPPEvilTarget',
        'energyNGUAugmentsSadisticLevel',
        'energyNGUWandoosSadisticLevel',
        'energyNGURespawnSadisticLevel',
        'energyNGUGoldSadisticLevel',
        'energyNGUAdventureASadisticLevel',
        'energyNGUPowerASadisticLevel',
        'energyNGUDropChanceSadisticLevel',
        'energyNGUMagicNGUSadisticLevel',
        'energyNGUPPSadisticLevel',
        'energyNGUAugmentsSadisticTarget',
        'energyNGUWandoosSadisticTarget',
        'energyNGURespawnSadisticTarget',
        'energyNGUGoldSadisticTarget',
        'energyNGUAdventureASadisticTarget',
        'energyNGUPowerASadisticTarget',
        'energyNGUDropChanceSadisticTarget',
        'energyNGUMagicNGUSadisticTarget',
        'energyNGUPPSadisticTarget',
        'gameMode',
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
        'magicNGUYggdrasilEvilLevel',
        'magicNGUExpEvilLevel',
        'magicNGUPowerBEvilLevel',
        'magicNGUNumberEvilLevel',
        'magicNGUTimeMachineEvilLevel',
        'magicNGUEnergyNGUEvilLevel',
        'magicNGUAdventureBEvilLevel',
        'magicNGUYggdrasilEvilTarget',
        'magicNGUExpEvilTarget',
        'magicNGUPowerBEvilTarget',
        'magicNGUNumberEvilTarget',
        'magicNGUTimeMachineEvilTarget',
        'magicNGUEnergyNGUEvilTarget',
        'magicNGUAdventureBEvilTarget',
        'magicNGUYggdrasilSadisticLevel',
        'magicNGUExpSadisticLevel',
        'magicNGUPowerBSadisticLevel',
        'magicNGUNumberSadisticLevel',
        'magicNGUTimeMachineSadisticLevel',
        'magicNGUEnergyNGUSadisticLevel',
        'magicNGUAdventureBSadisticLevel',
        'magicNGUYggdrasilSadisticTarget',
        'magicNGUExpSadisticTarget',
        'magicNGUPowerBSadisticTarget',
        'magicNGUNumberSadisticTarget',
        'magicNGUTimeMachineSadisticTarget',
        'magicNGUEnergyNGUSadisticTarget',
        'magicNGUAdventureBSadisticTarget',
        'resource3Active',
        'yggdrasilDropChance',
    ]
}


export function getPlayerOptions() : string[] {
    return [
        'achievements',
        'advTrainings',
        'apItems',
        'beards',
        'challenges',
        'diggers',
        'equipmentHead',
        'equipmentLegs',
        'equipmentChest',
        'equipmentBoots',
        'equipmentWeapon',
        'equipmentAccesories',
        'equipmentTest',
        'energyNGUs',
        'magicNGUs',
        'hacks',
        'macguffins',
        'perks',
        'quirks',
        'maxxedItems',
        'itemSets',
    ]
}

export function getCalculatedOptions() : string[] {
    return [
        'blueHeart^',
        'boostRecyclying%',
        'currentEnergyCap',
        'currentMagicCap',
        'redLiquidBonus^',
        'spoopySetBonus^',
        'totalEnergyNGUSpeedFactor%',
        'totalMagicNGUSpeedFactor%',
        'totalPPBonus%',
        'totalPower',
        'totalRespawnTime',
        'totalDropChance%',
    ]
}