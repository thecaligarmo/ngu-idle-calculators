/*eslint-disable*/
import { boostRecyclying, getHighestKilledTitanId, getIdleAttackModifier, totalAPBonus, totalCardSpeed, totalDropChance, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalExpBonus, totalHackSpeed, totalHealth, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalMayoSpeed, totalPower, totalPPBonus, totalQuestDropBonus, totalQuestRewardBonus, totalRegen, totalRes3Cap, totalRes3Power, totalRespawnRate, totalSeedGainBonus, totalTagEffect, totalToughness, totalWishSpeed, totalYggdrasilYieldBonus } from "@/helpers/calculators"
import { useLocalStorage, useLocalStorageObject } from "@/helpers/localStorage"
import { bd } from "@/helpers/numbers"
import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { AdvTraining, ADVTRAININGS } from "./advTraining"
import { APItem, APITEMLIST, APITEMS } from "./apItems"
import { Beard, BEARDS } from "./beards"
import { Card, CARDLIST, CARDS } from "./cards"
import { Challenge, CHALLENGES } from "./challenges"
import { Dish, DISHES } from "./cooking"
import { Digger, DIGGERS } from "./diggers"
import { Titan, Titans } from "./enemy"
import { Hack, HACKS } from "./hacks"
import { Item, ITEMS } from "./items"
import { MacGuffin, MACGUFFINS } from "./macguffins"
import { GameMode } from "./mode"
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "./ngus"
import { Perk, PERKS } from "./perks"
import { playerDataInfo } from "./playerData"
import { Quirk, QUIRKS } from "./quirks"
import { ItemSet, ItemSets } from "./sets"
import { Wandoos, WANDOOSLIST } from "./wandoos"
import { Wish, WISHES } from "./wish"
import { FRUITS, Yggdrasil } from "./yggdrasil"
import { Zones } from "./zones"

export default class Player {
    // playerData has the state data whereas the updated data has the current data
    // We do it this way because state data is asynchronous and so we can't set and get
    // at the same time
    playerData : {[k:string] : any}
    playerUpdatedData : {[k:string] : any}
    withoutSave : boolean
    constructor(withoutSetup : boolean = false, withoutSave : boolean = false) {
        this.playerData = {}
        this.playerUpdatedData = {}
        this.withoutSave = withoutSave
        if(!withoutSetup) {
            for(const key in playerDataInfo){
                const defVal = this.typeSet(key, playerDataInfo[key]['default'])
                if(!this.withoutSave){
                    if(playerDataInfo[key]['type'] == 'object') {
                        // handled differently for speed purposes
                        this.playerData[key] = useLocalStorageObject(key, defVal)
                    } else {
                        this.playerData[key] = useLocalStorage(key, defVal)
                    }
                    this.playerUpdatedData[key] = this.playerData[key][0]
                } else {
                    this.playerUpdatedData[key] = defVal
                }
            }
        }
    }
    
    get(key : string) : any {

        const calcToGo : {[k:string] : string} = {
            'totalAPBonus' : 'goAP',
            'totalDropChance' : 'goDropChance',
            'totalEnergyCap' : 'goEnergyCap',
            'totalEnergyNGUSpeedFactor' : 'goEnergyNGU',
            'totalEnergyPower' : 'goEnergyPower',
            'totalExpBonus' : 'goExperience',
            'totalHackSpeed' : 'goRawHackSpeed',
            'totalMagicCap' : 'goMagicCap',
            'totalMagicNGUSpeedFactor' : 'goMagicNGU',
            'totalMagicPower' : 'goMagicPower',
            'totalPower' : 'goPower',
            'totalQuestDropBonus' : 'goQuestDrop',
            'totalRes3Cap' : 'goResource3Cap',
            'totalRes3Power' : 'goResource3Power',
            'totalRespawnTime' : 'goRespawn',
            'totalSeedGainBonus' : 'goSeedGain',
            'totalWishSpeed' : 'goRawWishSpeed',
            'totalYggdrasilYieldBonus' : 'goYggdrasilYield',
        }
        

        if(_.isUndefined(this.playerUpdatedData[key])) {
            console.log("Can't get key: ", key, " as it doesn't exist.")
            return bd(0)
        }
        
        let val = this.playerUpdatedData[key]
        if(playerDataInfo[key]['type'] == 'number') {
            if(_.isNaN(val) || val == 'NaN'){
                console.log("Getting NaN", key)
            }
            if(typeof val == 'string'){
                val = val.replace(/"/g, '').replace(/'/g, '')
            }

            // Handle gear optimizer stuff
            val = bd(val)
            if(key in calcToGo) {
                val = val.multiply(
                    this.get(calcToGo[key]).divide(bd(100)).add(bd(1))
                )
            }
            return val
        } else if(playerDataInfo[key]['type'] == 'boolean') {
            return JSON.parse(val)
        } else if(playerDataInfo[key]['type'] == 'object') {
            return val
        }
        return val
    }
    set(key : string, value : any) : void {
        if(_.isUndefined(this.playerUpdatedData[key])) {
            console.log("Can't set key: ", key, " as it doesn't exist.")
        } else {
            value = this.typeSet(key, value)
            if(!this.withoutSave) {
                this.playerData[key][1](value)
            }
            this.playerUpdatedData[key] = value
        }
    }


    typeSet(key: string, value: any) : string {
        if(playerDataInfo[key]['type'] == 'object') {
            // handled differently for speed purposes
            return value
        } else if(value instanceof bigDecimal) {
            return value.getValue()
        } else if(typeof value == 'number') {
            return value.toString()
        } else if(typeof value == 'boolean') {
            return JSON.stringify(value)
        } else if (typeof value == 'string') {
            return value
        } 
        console.log('Found a problem with type setting', key, value, typeof value)
        return ""
    }

    importPlayerData(playerData : any) : void {
        let taggedCards : number[]= []
        if(!_.isUndefined(playerData.cards.taggedBonuses) && playerData.cards.taggedBonuses.length > 0) {
            taggedCards = [
                playerData.cards.taggedBonuses[0].value__,
                playerData.cards.taggedBonuses[1].value__,
                playerData.cards.taggedBonuses[2].value__,
                playerData.cards.taggedBonuses[3].value__,
            ]
        }
        

        // Single things
        this.set('70sSet', playerData.inventory.itemList.that70sComplete);
        this.set('activeQuestWishI', playerData.wishes.wishes[19].level);
        this.set('activeQuestWishII', playerData.wishes.wishes[62].level);
        this.set('baseAdventurePower', playerData.adventure.attack);
        this.set('baseAdventureToughness', playerData.adventure.defense);
        this.set('baseAdventureHealth', playerData.adventure.maxHP);
        this.set('baseAdventureRegen', playerData.adventure.regen);
        this.set('baseEnergyPower', playerData.energyPower);
        this.set('baseEnergyBar', playerData.energyBars);
        this.set('baseEnergyCap', playerData.capEnergy);
        this.set('baseMagicBar', playerData.magic.magicPerBar);
        this.set('baseMagicCap', playerData.magic.capMagic);
        this.set('baseMagicPower', playerData.magic.magicPower);
        this.set('baseRes3Bar', playerData.res3.res3PerBar);
        this.set('baseRes3Cap', playerData.res3.capRes3);
        this.set('baseRes3Power', playerData.res3.res3Power);
        this.set('beastMode', playerData.adventure.beastModeOn);
        this.set('beefyWish', playerData.wishes.wishes[162].level
                                + playerData.wishes.wishes[220].level
                                + playerData.wishes.wishes[227].level
                );
        this.set('bloodMagicDropChance',
                        playerData.bloodMagic.lootSpellBlood == '0'
                            ? 0
                            : Math.ceil(Math.log2(playerData.bloodMagic.lootSpellBlood / 10000))
            );
        this.set('bloodMagicTimeMachine', Math.ceil(Math.log2(playerData.bloodMagic.goldSpellBlood / 1000000) ** 2));
        this.set('blueHeart', playerData.inventory.itemList.blueHeartComplete);
        this.set('bonusPP', playerData.beastQuest.quirkLevel[70] * 10
                            + playerData.wishes.wishes[79].level * 50
                );
        this.set('bonusTitanEXPPerk', playerData.adventure.itopod.perkLevel[34]);
        this.set('boostRecyclyingPurchase', playerData.purchases.boost);
        this.set('cardRecyclingCard', playerData.adventure.itopod.perkLevel[216] == 1);
        this.set('cardRecyclingMayo', playerData.beastQuest.quirkLevel[156] == 1);
        this.set('cardChonkers', playerData.beastQuest.quirkLevel[149] == 1);
        this.set('cardTaggedAdventure', taggedCards.includes(9));
        this.set('cardTaggedAugments', taggedCards.includes(4));
        this.set('cardTaggedDaycare', taggedCards.includes(12));
        this.set('cardTaggedDropChance', taggedCards.includes(10));
        this.set('cardTaggedEnergyNGU', taggedCards.includes(1));
        this.set('cardTaggedGoldDrop', taggedCards.includes(11));
        this.set('cardTaggedHack', taggedCards.includes(6));
        this.set('cardTaggedMagicNGU', taggedCards.includes(2));
        this.set('cardTaggedPP', taggedCards.includes(13));
        this.set('cardTaggedQP', taggedCards.includes(14));
        this.set('cardTaggedStat', taggedCards.includes(8));
        this.set('cardTaggedTimeMachine', taggedCards.includes(5));
        this.set('cardTaggedWandoos', taggedCards.includes(3));
        this.set('cardTaggedWish', taggedCards.includes(7));
        this.set('cardTierAdventure', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[172]
                    + playerData.adventure.itopod.perkLevel[185]
                    + playerData.adventure.itopod.perkLevel[198]
                    + playerData.beastQuest.quirkLevel[106]
                    + playerData.beastQuest.quirkLevel[119]
                    + playerData.beastQuest.quirkLevel[132]
                    + playerData.beastQuest.quirkLevel[164]
                    + playerData.wishes.wishes[118].level
                    + playerData.wishes.wishes[131].level
                    + playerData.wishes.wishes[144].level
                    + playerData.wishes.wishes[177].level
                    + playerData.wishes.wishes[208].level
                    );
        this.set('cardTierAugments', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[161]
                    + playerData.adventure.itopod.perkLevel[174]
                    + playerData.adventure.itopod.perkLevel[187]
                    + playerData.beastQuest.quirkLevel[108]
                    + playerData.beastQuest.quirkLevel[121]
                    + playerData.beastQuest.quirkLevel[134]
                    + playerData.beastQuest.quirkLevel[166]
                    + playerData.wishes.wishes[120].level
                    + playerData.wishes.wishes[133].level
                    + playerData.wishes.wishes[146].level
                    + playerData.wishes.wishes[179].level
                    + playerData.wishes.wishes[210].level
                    );
        this.set('cardTierDaycare', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[168]
                    + playerData.adventure.itopod.perkLevel[181]
                    + playerData.adventure.itopod.perkLevel[194]
                    + playerData.beastQuest.quirkLevel[102]
                    + playerData.beastQuest.quirkLevel[115]
                    + playerData.beastQuest.quirkLevel[128]
                    + playerData.beastQuest.quirkLevel[160]
                    + playerData.wishes.wishes[127].level
                    + playerData.wishes.wishes[140].level
                    + playerData.wishes.wishes[153].level
                    + playerData.wishes.wishes[186].level
                    + playerData.wishes.wishes[217].level
                    );
        this.set('cardTierDropChance', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[170]
                    + playerData.adventure.itopod.perkLevel[183]
                    + playerData.adventure.itopod.perkLevel[196]
                    + playerData.beastQuest.quirkLevel[104]
                    + playerData.beastQuest.quirkLevel[117]
                    + playerData.beastQuest.quirkLevel[130]
                    + playerData.beastQuest.quirkLevel[162]
                    + playerData.wishes.wishes[116].level
                    + playerData.wishes.wishes[129].level
                    + playerData.wishes.wishes[142].level
                    + playerData.wishes.wishes[175].level
                    + playerData.wishes.wishes[206].level
                    );
        this.set('cardTierEnergyNGU', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[169]
                    + playerData.adventure.itopod.perkLevel[182]
                    + playerData.adventure.itopod.perkLevel[195]
                    + playerData.beastQuest.quirkLevel[103]
                    + playerData.beastQuest.quirkLevel[116]
                    + playerData.beastQuest.quirkLevel[129]
                    + playerData.beastQuest.quirkLevel[161]
                    + playerData.wishes.wishes[115].level
                    + playerData.wishes.wishes[128].level
                    + playerData.wishes.wishes[141].level
                    + playerData.wishes.wishes[174].level
                    + playerData.wishes.wishes[205].level
                    );
        this.set('cardTierGoldDrop', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[162]
                    + playerData.adventure.itopod.perkLevel[175]
                    + playerData.adventure.itopod.perkLevel[188]
                    + playerData.beastQuest.quirkLevel[109]
                    + playerData.beastQuest.quirkLevel[122]
                    + playerData.beastQuest.quirkLevel[135]
                    + playerData.beastQuest.quirkLevel[167]
                    + playerData.wishes.wishes[121].level
                    + playerData.wishes.wishes[134].level
                    + playerData.wishes.wishes[147].level
                    + playerData.wishes.wishes[180].level
                    + playerData.wishes.wishes[211].level
                    );
        this.set('cardTierHack', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[173]
                    + playerData.adventure.itopod.perkLevel[186]
                    + playerData.adventure.itopod.perkLevel[199]
                    + playerData.beastQuest.quirkLevel[107]
                    + playerData.beastQuest.quirkLevel[120]
                    + playerData.beastQuest.quirkLevel[133]
                    + playerData.beastQuest.quirkLevel[165]
                    + playerData.wishes.wishes[119].level
                    + playerData.wishes.wishes[132].level
                    + playerData.wishes.wishes[145].level
                    + playerData.wishes.wishes[178].level
                    + playerData.wishes.wishes[209].level
                    );
        this.set('cardTierMagicNGU', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[165]
                    + playerData.adventure.itopod.perkLevel[178]
                    + playerData.adventure.itopod.perkLevel[191]
                    + playerData.beastQuest.quirkLevel[99]
                    + playerData.beastQuest.quirkLevel[112]
                    + playerData.beastQuest.quirkLevel[125]
                    + playerData.beastQuest.quirkLevel[157]
                    + playerData.wishes.wishes[124].level
                    + playerData.wishes.wishes[137].level
                    + playerData.wishes.wishes[150].level
                    + playerData.wishes.wishes[183].level
                    + playerData.wishes.wishes[214].level
                    );
        this.set('cardTierPP', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.beastQuest.quirkLevel[110]
                    + playerData.beastQuest.quirkLevel[123]
                    + playerData.beastQuest.quirkLevel[136]
                    + playerData.beastQuest.quirkLevel[168]
                    + playerData.wishes.wishes[122].level
                    + playerData.wishes.wishes[135].level
                    + playerData.wishes.wishes[148].level
                    + playerData.wishes.wishes[181].level
                    + playerData.wishes.wishes[212].level
                    );
        this.set('cardTierQP', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[167]
                    + playerData.adventure.itopod.perkLevel[180]
                    + playerData.adventure.itopod.perkLevel[193]
                    + playerData.wishes.wishes[126].level
                    + playerData.wishes.wishes[139].level
                    + playerData.wishes.wishes[152].level
                    + playerData.wishes.wishes[185].level
                    + playerData.wishes.wishes[216].level
                    );
        this.set('cardTierStat', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[164]
                    + playerData.adventure.itopod.perkLevel[177]
                    + playerData.adventure.itopod.perkLevel[190]
                    + playerData.beastQuest.quirkLevel[111]
                    + playerData.beastQuest.quirkLevel[124]
                    + playerData.beastQuest.quirkLevel[137]
                    + playerData.beastQuest.quirkLevel[169]
                    + playerData.wishes.wishes[123].level
                    + playerData.wishes.wishes[136].level
                    + playerData.wishes.wishes[149].level
                    + playerData.wishes.wishes[182].level
                    + playerData.wishes.wishes[213].level
                    );
        this.set('cardTierTimeMachine', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[166]
                    + playerData.adventure.itopod.perkLevel[179]
                    + playerData.adventure.itopod.perkLevel[192]
                    + playerData.beastQuest.quirkLevel[100]
                    + playerData.beastQuest.quirkLevel[113]
                    + playerData.beastQuest.quirkLevel[126]
                    + playerData.beastQuest.quirkLevel[158]
                    + playerData.wishes.wishes[125].level
                    + playerData.wishes.wishes[138].level
                    + playerData.wishes.wishes[151].level
                    + playerData.wishes.wishes[184].level
                    + playerData.wishes.wishes[215].level
                    );
        this.set('cardTierWandoos', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[171]
                    + playerData.adventure.itopod.perkLevel[184]
                    + playerData.adventure.itopod.perkLevel[197]
                    + playerData.beastQuest.quirkLevel[105]
                    + playerData.beastQuest.quirkLevel[118]
                    + playerData.beastQuest.quirkLevel[131]
                    + playerData.beastQuest.quirkLevel[163]
                    + playerData.wishes.wishes[117].level
                    + playerData.wishes.wishes[130].level
                    + playerData.wishes.wishes[143].level
                    + playerData.wishes.wishes[176].level
                    + playerData.wishes.wishes[207].level
                    );
        this.set('cardTierWish', 1 + playerData.inventory.itemList.rockLobsterComplete
                    + playerData.adventure.itopod.perkLevel[163]
                    + playerData.adventure.itopod.perkLevel[176]
                    + playerData.adventure.itopod.perkLevel[189]
                    + playerData.beastQuest.quirkLevel[101]
                    + playerData.beastQuest.quirkLevel[114]
                    + playerData.beastQuest.quirkLevel[127]
                    + playerData.beastQuest.quirkLevel[159]
                    );
        
        this.set('chonkChonkier', playerData.wishes.wishes[229].level);
        this.set('chonkLessNotChonkier', playerData.wishes.wishes[230].level);
        this.set('cookingExp', playerData.cooking.expBonus);
        this.set('cubePower', playerData.inventory.cubePower);
        this.set('cubeToughness', playerData.inventory.cubeToughness);
        this.set('eatFruitOfAdventure', playerData.yggdrasil.fruits[2].eatFruit);
        this.set('eatFruitOfAngryMayo', playerData.yggdrasil.fruits[15].eatFruit);
        this.set('eatFruitOfArbitrariness', playerData.yggdrasil.fruits[7].eatFruit);
        this.set('eatFruitOfAyyMayo', playerData.yggdrasil.fruits[18].eatFruit);
        this.set('eatFruitOfCincoDeMayo', playerData.yggdrasil.fruits[19].eatFruit);
        this.set('eatFruitOfGold', playerData.yggdrasil.fruits[0].eatFruit);
        this.set('eatFruitOfKnowledge', playerData.yggdrasil.fruits[3].eatFruit);
        this.set('eatFruitOfLuck', playerData.yggdrasil.fruits[5].eatFruit);
        this.set('eatFruitOfMacguffinA', playerData.yggdrasil.fruits[10].eatFruit);
        this.set('eatFruitOfMacguffinB', playerData.yggdrasil.fruits[13].eatFruit);
        this.set('eatFruitOfMoldyMayo', playerData.yggdrasil.fruits[17].eatFruit);
        this.set('eatFruitOfNumbers', playerData.yggdrasil.fruits[8].eatFruit);
        this.set('eatFruitOfPomegranate', playerData.yggdrasil.fruits[4].eatFruit);
        this.set('eatFruitOfPowerA', playerData.yggdrasil.fruits[1].eatFruit);
        this.set('eatFruitOfPowerB', playerData.yggdrasil.fruits[6].eatFruit);
        this.set('eatFruitOfPowerD', playerData.yggdrasil.fruits[11].eatFruit);
        this.set('eatFruitOfPrettyMayo', playerData.yggdrasil.fruits[20].eatFruit);
        this.set('eatFruitOfQuirks', playerData.yggdrasil.fruits[14].eatFruit);
        this.set('eatFruitOfRage', playerData.yggdrasil.fruits[9].eatFruit);
        this.set('eatFruitOfSadMayo', playerData.yggdrasil.fruits[16].eatFruit);
        this.set('eatFruitOfWatermelon', playerData.yggdrasil.fruits[12].eatFruit);
        this.set('energyNGUAdventureAEvilLevel', playerData.NGU.skills[4].evilLevel);
        this.set('energyNGUAdventureAEvilTarget', playerData.NGU.skills[4].evilTarget);
        this.set('energyNGUAdventureALevel', playerData.NGU.skills[4].level);
        this.set('energyNGUAdventureASadisticLevel', playerData.NGU.skills[4].sadisticLevel);
        this.set('energyNGUAdventureASadisticTarget', playerData.NGU.skills[4].sadisticTarget);
        this.set('energyNGUAdventureATarget', playerData.NGU.skills[4].target);
        this.set('energyNGUAugmentsEvilLevel', playerData.NGU.skills[0].evilLevel);
        this.set('energyNGUAugmentsEvilTarget', playerData.NGU.skills[0].evilTarget);
        this.set('energyNGUAugmentsLevel', playerData.NGU.skills[0].level);
        this.set('energyNGUAugmentsSadisticLevel', playerData.NGU.skills[0].sadisticLevel);
        this.set('energyNGUAugmentsSadisticTarget', playerData.NGU.skills[0].sadisticTarget);
        this.set('energyNGUAugmentsTarget', playerData.NGU.skills[0].target);
        this.set('energyNGUDropChanceEvilLevel', playerData.NGU.skills[6].evilLevel);
        this.set('energyNGUDropChanceEvilTarget', playerData.NGU.skills[6].evilTarget);
        this.set('energyNGUDropChanceLevel', playerData.NGU.skills[6].level);
        this.set('energyNGUDropChanceSadisticLevel', playerData.NGU.skills[6].sadisticLevel);
        this.set('energyNGUDropChanceSadisticTarget', playerData.NGU.skills[6].sadisticTarget);
        this.set('energyNGUDropChanceTarget', playerData.NGU.skills[6].target);
        this.set('energyNGUGoldEvilLevel', playerData.NGU.skills[3].evilLevel);
        this.set('energyNGUGoldEvilTarget', playerData.NGU.skills[3].evilTarget);
        this.set('energyNGUGoldLevel', playerData.NGU.skills[3].level);
        this.set('energyNGUGoldSadisticLevel', playerData.NGU.skills[3].sadisticLevel);
        this.set('energyNGUGoldSadisticTarget', playerData.NGU.skills[3].sadisticTarget);
        this.set('energyNGUGoldTarget', playerData.NGU.skills[3].target);
        this.set('energyNGUMagicNGUEvilLevel', playerData.NGU.skills[7].evilLevel);
        this.set('energyNGUMagicNGUEvilTarget', playerData.NGU.skills[7].evilTarget);
        this.set('energyNGUMagicNGULevel', playerData.NGU.skills[7].level);
        this.set('energyNGUMagicNGUSadisticLevel', playerData.NGU.skills[7].sadisticLevel);
        this.set('energyNGUMagicNGUSadisticTarget', playerData.NGU.skills[7].sadisticTarget);
        this.set('energyNGUMagicNGUTarget', playerData.NGU.skills[7].target);
        this.set('energyNGUPowerAEvilLevel', playerData.NGU.skills[5].evilLevel);
        this.set('energyNGUPowerAEvilTarget', playerData.NGU.skills[5].evilTarget);
        this.set('energyNGUPowerALevel', playerData.NGU.skills[5].level);
        this.set('energyNGUPowerASadisticLevel', playerData.NGU.skills[5].sadisticLevel);
        this.set('energyNGUPowerASadisticTarget', playerData.NGU.skills[5].sadisticTarget);
        this.set('energyNGUPowerATarget', playerData.NGU.skills[5].target);
        this.set('energyNGUPPEvilLevel', playerData.NGU.skills[8].evilLevel);
        this.set('energyNGUPPEvilTarget', playerData.NGU.skills[8].evilTarget);
        this.set('energyNGUPPLevel', playerData.NGU.skills[8].level);
        this.set('energyNGUPPSadisticLevel', playerData.NGU.skills[8].sadisticLevel);
        this.set('energyNGUPPSadisticTarget', playerData.NGU.skills[8].sadisticTarget);
        this.set('energyNGUPPTarget', playerData.NGU.skills[8].target);
        this.set('energyNGURespawnEvilLevel', playerData.NGU.skills[2].evilLevel);
        this.set('energyNGURespawnEvilTarget', playerData.NGU.skills[2].evilTarget);
        this.set('energyNGURespawnLevel', playerData.NGU.skills[2].level);
        this.set('energyNGURespawnSadisticLevel', playerData.NGU.skills[2].sadisticLevel);
        this.set('energyNGURespawnSadisticTarget', playerData.NGU.skills[2].sadisticTarget);
        this.set('energyNGURespawnTarget', playerData.NGU.skills[2].target);
        this.set('energyNGUWandoosEvilLevel', playerData.NGU.skills[1].evilLevel);
        this.set('energyNGUWandoosEvilTarget', playerData.NGU.skills[1].evilTarget);
        this.set('energyNGUWandoosLevel', playerData.NGU.skills[1].level);
        this.set('energyNGUWandoosSadisticLevel', playerData.NGU.skills[1].sadisticLevel);
        this.set('energyNGUWandoosSadisticTarget', playerData.NGU.skills[1].sadisticTarget);
        this.set('energyNGUWandoosTarget', playerData.NGU.skills[1].target);
        this.set('fadLandsSetBonus', playerData.inventory.itemList.fadComplete);
        this.set('fasterQuesting', playerData.arbitrary.hasFasterQuests);
        this.set('fibQuestRNG', (playerData.adventure.itopod.perkLevel[94] >= 610));
        this.set('firstHarvestPerk', playerData.adventure.itopod.perkLevel[51]);
        this.set('fruitOfKnowledgeSTILLSucks', playerData.adventure.itopod.perkLevel[20]);
        this.set('fruitOfKnowledgeSucks', playerData.adventure.itopod.perkLevel[19]);
        this.set('gameMode', playerData.settings.rebirthDifficulty.value__);
        this.set('hackAdventureTarget', playerData.hacks.hacks[1].target);
        this.set('hackAugmentTarget', playerData.hacks.hacks[4].target);
        this.set('hackBloodTarget', playerData.hacks.hacks[7].target);
        this.set('hackDaycareTarget', playerData.hacks.hacks[9].target);
        this.set('hackDropChanceTarget', playerData.hacks.hacks[3].target);
        this.set('hackENGUTarget', playerData.hacks.hacks[5].target);
        this.set('hackExpTarget', playerData.hacks.hacks[10].target);
        this.set('hackHackTarget', playerData.hacks.hacks[13].target);
        this.set('hackMilestoneReductionAdventure', playerData.adventure.itopod.perkLevel[113]);
        this.set('hackMilestoneReductionAugment', playerData.adventure.itopod.perkLevel[218]);
        this.set('hackMilestoneReductionBlood', playerData.adventure.itopod.perkLevel[114]);
        this.set('hackMilestoneReductionDaycare', playerData.adventure.itopod.perkLevel[115]);
        this.set('hackMilestoneReductionDropChance', playerData.adventure.itopod.perkLevel[217]);
        this.set('hackMilestoneReductionENGU', playerData.beastQuest.quirkLevel[174]);
        this.set('hackMilestoneReductionExp', playerData.beastQuest.quirkLevel[59]);
        this.set('hackMilestoneReductionHack', playerData.wishes.wishes[78].level);
        this.set('hackMilestoneReductionMNGU', playerData.adventure.itopod.perkLevel[219]);
        this.set('hackMilestoneReductionNumber', playerData.wishes.wishes[77].level);
        this.set('hackMilestoneReductionPP', playerData.beastQuest.quirkLevel[58]);
        this.set('hackMilestoneReductionQP', playerData.wishes.wishes[76].level);
        this.set('hackMilestoneReductionStat', playerData.beastQuest.quirkLevel[57]);
        this.set('hackMilestoneReductionTimeMachine', playerData.beastQuest.quirkLevel[175]);
        this.set('hackMilestoneReductionWish', playerData.beastQuest.quirkLevel[60]);
        this.set('hackMNGUTarget', playerData.hacks.hacks[6].target);
        this.set('hackNumberTarget', playerData.hacks.hacks[11].target);
        this.set('hackPPTarget', playerData.hacks.hacks[12].target);
        this.set('hackQPTarget', playerData.hacks.hacks[8].target);
        this.set('hackStatTarget', playerData.hacks.hacks[0].target);
        this.set('hackTimeMachineTarget', playerData.hacks.hacks[2].target);
        this.set('hackWishTarget', playerData.hacks.hacks[14].target);

        const titansList : Titan[] = [];
        Object.values(Titans).forEach((titan) => {
            if (!_.isUndefined(titan)) {
                const t = _.cloneDeep(titan)
                t.importKills(playerData.bestiary.enemies)
                titansList.push(t)
            }
        })
        this.set('highestTitanKilledId', getHighestKilledTitanId(titansList))
        this.set('magicNGUAdventureBEvilLevel', playerData.NGU.magicSkills[6].evilLevel);
        this.set('magicNGUAdventureBEvilTarget', playerData.NGU.magicSkills[6].evilTarget);
        this.set('magicNGUAdventureBLevel', playerData.NGU.magicSkills[6].level);
        this.set('magicNGUAdventureBSadisticLevel', playerData.NGU.magicSkills[6].sadisticLevel);
        this.set('magicNGUAdventureBSadisticTarget', playerData.NGU.magicSkills[6].sadisticTarget);
        this.set('magicNGUAdventureBTarget', playerData.NGU.magicSkills[6].target);
        this.set('magicNGUEnergyNGUEvilLevel', playerData.NGU.magicSkills[5].evilLevel);
        this.set('magicNGUEnergyNGUEvilTarget', playerData.NGU.magicSkills[5].evilTarget);
        this.set('magicNGUEnergyNGULevel', playerData.NGU.magicSkills[5].level);
        this.set('magicNGUEnergyNGUSadisticLevel', playerData.NGU.magicSkills[5].sadisticLevel);
        this.set('magicNGUEnergyNGUSadisticTarget', playerData.NGU.magicSkills[5].sadisticTarget);
        this.set('magicNGUEnergyNGUTarget', playerData.NGU.magicSkills[5].target);
        this.set('magicNGUExpEvilLevel', playerData.NGU.magicSkills[1].evilLevel);
        this.set('magicNGUExpEvilTarget', playerData.NGU.magicSkills[1].evilTarget);
        this.set('magicNGUExpLevel', playerData.NGU.magicSkills[1].level);
        this.set('magicNGUExpSadisticLevel', playerData.NGU.magicSkills[1].sadisticLevel);
        this.set('magicNGUExpSadisticTarget', playerData.NGU.magicSkills[1].sadisticTarget);
        this.set('magicNGUExpTarget', playerData.NGU.magicSkills[1].target);
        this.set('magicNGUNumberEvilLevel', playerData.NGU.magicSkills[3].evilLevel);
        this.set('magicNGUNumberEvilTarget', playerData.NGU.magicSkills[3].evilTarget);
        this.set('magicNGUNumberLevel', playerData.NGU.magicSkills[3].level);
        this.set('magicNGUNumberSadisticLevel', playerData.NGU.magicSkills[3].sadisticLevel);
        this.set('magicNGUNumberSadisticTarget', playerData.NGU.magicSkills[3].sadisticTarget);
        this.set('magicNGUNumberTarget', playerData.NGU.magicSkills[3].target);
        this.set('magicNGUPowerBEvilLevel', playerData.NGU.magicSkills[2].evilLevel);
        this.set('magicNGUPowerBEvilTarget', playerData.NGU.magicSkills[2].evilTarget);
        this.set('magicNGUPowerBLevel', playerData.NGU.magicSkills[2].level);
        this.set('magicNGUPowerBSadisticLevel', playerData.NGU.magicSkills[2].sadisticLevel);
        this.set('magicNGUPowerBSadisticTarget', playerData.NGU.magicSkills[2].sadisticTarget);
        this.set('magicNGUPowerBTarget', playerData.NGU.magicSkills[2].target);
        this.set('magicNGUTimeMachineEvilLevel', playerData.NGU.magicSkills[4].evilLevel);
        this.set('magicNGUTimeMachineEvilTarget', playerData.NGU.magicSkills[4].evilTarget);
        this.set('magicNGUTimeMachineLevel', playerData.NGU.magicSkills[4].level);
        this.set('magicNGUTimeMachineSadisticLevel', playerData.NGU.magicSkills[4].sadisticLevel);
        this.set('magicNGUTimeMachineSadisticTarget', playerData.NGU.magicSkills[4].sadisticTarget);
        this.set('magicNGUTimeMachineTarget', playerData.NGU.magicSkills[4].target);
        this.set('magicNGUYggdrasilEvilLevel', playerData.NGU.magicSkills[0].evilLevel);
        this.set('magicNGUYggdrasilEvilTarget', playerData.NGU.magicSkills[0].evilTarget);
        this.set('magicNGUYggdrasilLevel', playerData.NGU.magicSkills[0].level);
        this.set('magicNGUYggdrasilSadisticLevel', playerData.NGU.magicSkills[0].sadisticLevel);
        this.set('magicNGUYggdrasilSadisticTarget', playerData.NGU.magicSkills[0].sadisticTarget);
        this.set('magicNGUYggdrasilTarget', playerData.NGU.magicSkills[0].target);
        this.set('numRebirthChallenges', playerData.challenges.noRebirthChallenge.curCompletions
                                        + playerData.challenges.noRebirthChallenge.curEvilCompletions
                                        + playerData.challenges.noRebirthChallenge.curSadisticCompletions
                                    )
        this.set('poopFruitOfAdventure', playerData.yggdrasil.fruits[2].usePoop);
        this.set('poopFruitOfAngryMayo', playerData.yggdrasil.fruits[15].usePoop);
        this.set('poopFruitOfArbitrariness', playerData.yggdrasil.fruits[7].usePoop);
        this.set('poopFruitOfAyyMayo', playerData.yggdrasil.fruits[18].usePoop);
        this.set('poopFruitOfCincoDeMayo', playerData.yggdrasil.fruits[19].usePoop);
        this.set('poopFruitOfGold', playerData.yggdrasil.fruits[0].usePoop);
        this.set('poopFruitOfKnowledge', playerData.yggdrasil.fruits[3].usePoop);
        this.set('poopFruitOfLuck', playerData.yggdrasil.fruits[5].usePoop);
        this.set('poopFruitOfMacguffinA', playerData.yggdrasil.fruits[10].usePoop);
        this.set('poopFruitOfMacguffinB', playerData.yggdrasil.fruits[13].usePoop);
        this.set('poopFruitOfMoldyMayo', playerData.yggdrasil.fruits[17].usePoop);
        this.set('poopFruitOfNumbers', playerData.yggdrasil.fruits[8].usePoop);
        this.set('poopFruitOfPomegranate', playerData.yggdrasil.fruits[4].usePoop);
        this.set('poopFruitOfPowerA', playerData.yggdrasil.fruits[1].usePoop);
        this.set('poopFruitOfPowerB', playerData.yggdrasil.fruits[6].usePoop);
        this.set('poopFruitOfPowerD', playerData.yggdrasil.fruits[11].usePoop);
        this.set('poopFruitOfPrettyMayo', playerData.yggdrasil.fruits[20].usePoop);
        this.set('poopFruitOfQuirks', playerData.yggdrasil.fruits[14].usePoop);
        this.set('poopFruitOfRage', playerData.yggdrasil.fruits[9].usePoop);
        this.set('poopFruitOfSadMayo', playerData.yggdrasil.fruits[16].usePoop);
        this.set('poopFruitOfWatermelon', playerData.yggdrasil.fruits[12].usePoop);
        this.set('questIdleDivider', 8
                                    - playerData.adventure.itopod.perkLevel[91] // Advanced
                                    - playerData.adventure.itopod.perkLevel[92] // Even More Adv
                                    - (2 * playerData.adventure.itopod.perkLevel[105]) // Gooder
                                    - playerData.adventure.itopod.perkLevel[106] // Another Gooder
                                    )
        this.set('questMinorQP', 10
                                + (2 * playerData.adventure.itopod.perkLevel[87]) // Not So Minor Anymore
                                + playerData.adventure.itopod.perkLevel[148] // Improved Minor Quest QP Rewards
                                + playerData.wishes.wishes[102].level // I wish Minor Quests had better Base QP Rewards
                                )
        this.set('questMajorQP', 50
                                + playerData.adventure.itopod.perkLevel[147] // Improved Major Quest QP Rewards
                                + playerData.wishes.wishes[101].level // I wish Major Quests had better Base QP Rewards
                                )
        this.set('redLiquidBonus', playerData.inventory.itemList.redLiquidComplete)
        this.set('res3Active', playerData.res3.res3On);
        this.set('sadisticNoEquipmentChallenges', playerData.challenges.noEquipmentChallenge.curSadisticCompletions);
        this.set('spoopySetBonus', playerData.inventory.itemList.ghostComplete)
        this.set('tierFruitOfAdventure', playerData.yggdrasil.fruits[2].maxTier);
        this.set('tierFruitOfAngryMayo', playerData.yggdrasil.fruits[15].maxTier);
        this.set('tierFruitOfArbitrariness', playerData.yggdrasil.fruits[7].maxTier);
        this.set('tierFruitOfAyyMayo', playerData.yggdrasil.fruits[18].maxTier);
        this.set('tierFruitOfCincoDeMayo', playerData.yggdrasil.fruits[19].maxTier);
        this.set('tierFruitOfGold', playerData.yggdrasil.fruits[0].maxTier);
        this.set('tierFruitOfKnowledge', playerData.yggdrasil.fruits[3].maxTier);
        this.set('tierFruitOfLuck', playerData.yggdrasil.fruits[5].maxTier);
        this.set('tierFruitOfMacguffinA', playerData.yggdrasil.fruits[10].maxTier);
        this.set('tierFruitOfMacguffinB', playerData.yggdrasil.fruits[13].maxTier);
        this.set('tierFruitOfMoldyMayo', playerData.yggdrasil.fruits[17].maxTier);
        this.set('tierFruitOfNumbers', playerData.yggdrasil.fruits[8].maxTier);
        this.set('tierFruitOfPomegranate', playerData.yggdrasil.fruits[4].maxTier);
        this.set('tierFruitOfPowerA', playerData.yggdrasil.fruits[1].maxTier);
        this.set('tierFruitOfPowerB', playerData.yggdrasil.fruits[6].maxTier);
        this.set('tierFruitOfPowerD', playerData.yggdrasil.fruits[11].maxTier);
        this.set('tierFruitOfPrettyMayo', playerData.yggdrasil.fruits[20].maxTier);
        this.set('tierFruitOfQuirks', playerData.yggdrasil.fruits[14].maxTier);
        this.set('tierFruitOfRage', playerData.yggdrasil.fruits[9].maxTier);
        this.set('tierFruitOfSadMayo', playerData.yggdrasil.fruits[16].maxTier);
        this.set('tierFruitOfWatermelon', playerData.yggdrasil.fruits[12].maxTier);
        this.set('twentyFourHourChallenge', playerData.challenges.hour24Challenge.curCompletions);
        this.set('twentyFourHourEvilChallenge', playerData.challenges.hour24Challenge.curEvilCompletions);
        this.set('twentyFourHourSadisticChallenge', playerData.challenges.hour24Challenge.curSadisticCompletions);
        this.set('wandoosEnergyAllocated', playerData.wandoos98.wandoosEnergy);
        this.set('wandoosMagicAllocated', playerData.wandoos98.wandoosMagic);

        this.set('wimpyWish', playerData.wishes.wishes[163].level
                            + playerData.wishes.wishes[221].level
                            + playerData.wishes.wishes[228].level
                        )
        this.set('wishSlots', 1
                            + playerData.beastQuest.quirkLevel[56]
                            + (playerData.challenges.trollChallenge.curEvilCompletions >= 7 ? 1 : 0)
                            + playerData.inventory.itemList.pinkHeartComplete
                        )
        this.set('wishBeastDropQP', playerData.wishes.wishes[73].level);
        this.set('wishExileDropQP', playerData.wishes.wishes[41].level);
        this.set('wishGodmotherDropQP', playerData.wishes.wishes[40].level);
        this.set('wishNerdDropQP', playerData.wishes.wishes[74].level);
        this.set('wishTitan10DropQP', playerData.wishes.wishes[100].level);
        this.set('wishTitan11DropQP', playerData.wishes.wishes[187].level);
        this.set('wishTitan12DropQP', playerData.wishes.wishes[204].level);
        this.set('wishTitansHadBetterRewards', playerData.wishes.wishes[3].level);
        
        this.set('yggdrasilDropChance', playerData.yggdrasil.totalLuck / 20 + 100);

        // Objects (done individually)
        this.set('achievements', playerData.achievements.achievementComplete)
        this.setAdvTrainings(playerData);
        this.setApItems(playerData);
        this.setBeards(playerData);
        this.setCards(playerData);
        this.setChallenges(playerData);
        this.setDiggers(playerData);
        this.setDish(playerData);
        this.setEquipmentWeapon(playerData);
        this.setEquipmentWeaponTwo(playerData);
        this.setEquipmentHead(playerData);
        this.setEquipmentChest(playerData);
        this.setEquipmentLegs(playerData);
        this.setEquipmentBoots(playerData);
        this.setEquipmentAccesories(playerData);
        this.setEquipmentTest(playerData);
        this.setEnergyNGUs(playerData);
        this.setMagicNGUs(playerData);
        this.setHacks(playerData);
        this.setMacguffins(playerData);
        this.setPerks(playerData);
        this.setQuirks(playerData);
        this.setTitans(playerData);
        this.setWandoos(playerData);
        this.setWishes(playerData);
        this.setYggdrasil(playerData);
        this.setItemSets(playerData);
        this.setMaxxedItems(playerData);

        // Updating of totals (separate in case the above contents change and we want to re-run these)
        this.updateTotals()
    }

    // To save space for contexts, these functions are in `calculators`
    updateTotals() : void {
        this.set('boostRecyclying', boostRecyclying(this))
        this.set('totalAPBonus', totalAPBonus(this));
        this.set('totalCardSpeed', totalCardSpeed(this));       
        this.set('totalDropChance', totalDropChance(this));
        this.set('totalEnergyCap', totalEnergyCap(this));
        this.set('totalEnergyNGUSpeedFactor', totalEnergyNGUSpeedFactor(this));
        this.set('totalEnergyPower', totalEnergyPower(this));
        this.set('totalExpBonus', totalExpBonus(this));
        this.set('totalHackSpeed', totalHackSpeed(this));
        this.set('totalHealth', totalHealth(this));
        this.set('totalMagicCap', totalMagicCap(this));
        this.set('totalMagicNGUSpeedFactor', totalMagicNGUSpeedFactor(this));
        this.set('totalMagicPower', totalMagicPower(this));
        this.set('totalMayoSpeed', totalMayoSpeed(this));
        this.set('totalPower', totalPower(this));
        this.set('totalPPBonus', totalPPBonus(this));
        this.set('totalQuestDropBonus', totalQuestDropBonus(this));
        this.set('totalQuestRewardBonus', totalQuestRewardBonus(this));
        this.set('totalRegen', totalRegen(this));
        this.set('totalRes3Cap', totalRes3Cap(this));
        this.set('totalRes3Power', totalRes3Power(this));
        this.set('totalRespawnTime', totalRespawnRate(this).divide(bd(25)));
        this.set('totalToughness', totalToughness(this));
        this.set('totalSeedGainBonus', totalSeedGainBonus(this));
        this.set('totalTagEffect', totalTagEffect(this));
        this.set('totalWishSpeed', totalWishSpeed(this));
        this.set('totalYggdrasilYieldBonus', totalYggdrasilYieldBonus(this));

        const itopodZone = Zones.ITOPOD;
        const spoopySetBonus : boolean = this.get('spoopySetBonus')
        const sadisticNoEquipmentChallenges : bigDecimal = this.get('sadisticNoEquipmentChallenges')
        const idleAttackModifier = getIdleAttackModifier(spoopySetBonus, sadisticNoEquipmentChallenges);
        this.set('itopodFloor', 
            itopodZone.getOptimalFloor(totalPower(this), idleAttackModifier)
        )
    }
    

            
    setAdvTrainings(playerData : any) : void {
        const advTrainings: AdvTraining[] = []
        for (let c = 0; c < 5; c++) {
            advTrainings.push(_.cloneDeep(ADVTRAININGS[c]))
        }
        for (let c = 0; c < 5; c++) {
            advTrainings[c].setLevel(playerData.advancedTraining.level[c])
        }
        this.set('advTrainings', advTrainings)
    }
    setApItems(playerData : any) : void {
        const apItems : APItem[] = []
        const apToAdd : {[key:string]: number} = {};
        if (playerData.arbitrary.energyPotion1Time.totalseconds > 0) apToAdd['energyPotionA'] = 1;
        if (playerData.arbitrary.magicPotion1Time.totalseconds > 0) apToAdd['magicPotionA'] = 1;
        if (playerData.arbitrary.res3Potion1Time.totalseconds > 0) apToAdd['resource3PotionA'] = 1;
        if (playerData.arbitrary.energyPotion2InUse == 1) apToAdd['energyPotionB'] = 1;
        if (playerData.arbitrary.magicPotion2InUse == 1)  apToAdd['magicPotionB'] = 1;
        if (playerData.arbitrary.res3Potion2InUse == 1)  apToAdd['resource3PotionB'] = 1;
        if (playerData.arbitrary.lootcharm1Time.totalseconds > 0) apToAdd['luckyCharm'] = 1;
        if (playerData.arbitrary.energyBarBar1Time.totalseconds > 0)  apToAdd['energyBarBar'] = 1;
        if (playerData.arbitrary.magicBarBar1Time.totalseconds > 0) apToAdd['magicBarBar'] = 1;
        if (playerData.arbitrary.macGuffinBooster1Time.totalseconds > 0) apToAdd['macGuffinMuffin'] = 1;
        if (playerData.arbitrary.boughtAutoNuke == 1) apToAdd['autoNuker'] = 1;
        if (playerData.arbitrary.lootFilter == 1) apToAdd['improvedLootFilter'] = 1;
        if (playerData.arbitrary.improvedAutoBoostMerge == 1) apToAdd['autoMergeandBoostTimers'] = 1;
        if (playerData.arbitrary.instaTrain == 1) apToAdd['instaTrainingCap'] = 1;
        if (playerData.arbitrary.inventorySpaces > 0) apToAdd['extraInventorySpace'] = playerData.arbitrary.inventorySpaces;
        if (playerData.arbitrary.hasAcc4 == 1) apToAdd['extraAccessorySlot'] = 1;
        if (playerData.arbitrary.hasAcc5 == 1) apToAdd['anotherExtraAccessorySlot'] = 1;
        if (playerData.arbitrary.hasAcc6 == 1) apToAdd['anotherExtraAccessorySlot2'] = 1;
        if (playerData.arbitrary.hasAcc7 == 1) apToAdd['yetAnotherExtraAccessorySlot'] = 1;
        if (playerData.arbitrary.hasAcc8 == 1) apToAdd['anEvilAccessorySlot'] = 1;
        if (playerData.arbitrary.hasAcc9 == 1) apToAdd['extraAccessorySlot2'] = 1;
        if (playerData.arbitrary.hasYggdrasilReminder == 1) apToAdd['yggdrasilHarvestLight'] = 1;
        if (playerData.arbitrary.hasExtendedSpinBank == 1) apToAdd['7DayTimeBankforDailySpin'] = 1;
        if (playerData.arbitrary.curLoadoutSlots > 0) apToAdd['loadoutSlot'] = playerData.arbitrary.curLoadoutSlots;
        if (playerData.arbitrary.beardSlots > 0) apToAdd['anExtraBeardSlot'] = playerData.arbitrary.beardSlots;
        if (playerData.arbitrary.hasCubeFilter == 1) apToAdd['filterBoostsintoInfinityCube'] = 1;
        if (playerData.arbitrary.hasDaycareSpeed == 1) apToAdd['daycareSpeedBoost'] = 1;
        if (playerData.arbitrary.boughtLazyITOPOD == 1) apToAdd['lazyITOPODFloorShifter'] = 1;
        if (playerData.arbitrary.diggerSlots > 0) apToAdd['diggerSlots'] = playerData.arbitrary.diggerSlots;
        if (playerData.arbitrary.macguffinSlots > 0) apToAdd['aMacGuffinSlot'] = playerData.arbitrary.macguffinSlots;
        if (playerData.arbitrary.hasQuestLight == 1) apToAdd['questReminder'] = 1;
        if (playerData.arbitrary.hasFasterQuests == 1) apToAdd['fasterQuesting'] = 1;
        if (playerData.arbitrary.hasExtendedQuestBank == 1) apToAdd['extendedQuestBank'] = 1;
        if (playerData.arbitrary.wishSpeedBoster == 1) apToAdd['fasterWishes'] = 1;
        if (playerData.arbitrary.gotTagslot1 == 1) apToAdd['extraTagSlot'] = 1;
        if (playerData.arbitrary.mayoGenSlots > 0) apToAdd['mayoGenerator'] = playerData.arbitrary.mayoGenSlots;
        if (playerData.arbitrary.deckSpaceBought == 1) apToAdd['extraDeckSize'] = 1;
        if (playerData.arbitrary.mayoSpeedPotTime.totalSeconds > 0) apToAdd['mayoInfuser'] = 1;
        if (playerData.arbitrary.invMergeSlots > 0) apToAdd['inventoryMergeSlots'] = playerData.arbitrary.invMergeSlots;
        if (playerData.arbitrary.advLightBought == 1) apToAdd['adventureLight'] = 1;
        if (playerData.arbitrary.advAdvancerBought == 1) apToAdd['adventureAdvancer'] = 1;
        if (playerData.arbitrary.goToQuestZoneBought == 1) apToAdd['goToQuestZoneButton'] = 1;
        if (playerData.arbitrary.hasCubeFilter == 1) apToAdd['filterBoostsintoInfinityCube'] = 1;
        

        for(const apItem of APITEMLIST) {
            if(Object.keys(apToAdd).includes(apItem.key)){
                const ap = _.cloneDeep(APITEMS[apItem.id]);
                ap.setLevel(apToAdd[apItem.key])
                apItems.push(ap)
            }
        }
        this.set('apItems', apItems);
    }
    setBeards(playerData : any) : void {
        const beards : Beard[] = []
        playerData.beards.beards.forEach((beard : any, index : number) => {
            if (!_.isUndefined(BEARDS[index])) {
                const b = _.cloneDeep(BEARDS[index])
                b.setLevel(beard.beardLevel)
                b.setPermLevel(beard.permLevel)
                b.setActive(beard.active)
                beards.push(b)
            }
        })
        this.set('beards', beards);
    }
    setCards(playerData : any) : void {
        const cards : Card[] = []
        for (const card of CARDLIST) {
            const c = _.cloneDeep(CARDS[card.id]);
            c.importStats(playerData.cards.bonuses)
            cards.push(c)
        }
        this.set('cards', cards);
    }
    setChallenges(playerData : any) : void {
        const challenges : Challenge[] = []
        const evilChallenges : Challenge[] = []
        const sadChallenges : Challenge[] = []
        for (let c = 0; c < 11; c++) {
            challenges.push(_.cloneDeep(CHALLENGES[c]))
            evilChallenges.push(_.cloneDeep(CHALLENGES[c + 100]))
            sadChallenges.push(_.cloneDeep(CHALLENGES[c + 200]))
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

        const cc : {[key:number] : Challenge[]} = {}
        cc[GameMode.NORMAL] = challenges
        cc[GameMode.EVIL] = evilChallenges;
        cc[GameMode.SADISTIC] = sadChallenges;

        //    this.set(challenges.concat(evilChallenges, sadChallenges)
        this.set('challenges', cc);
    }
    setDiggers(playerData : any) : void {
        const diggers : Digger[] = []
        playerData.diggers.diggers.forEach((digger : any, id : number) => {
            const d = _.cloneDeep(DIGGERS[id])
            if (!_.isUndefined(d)) {
                d.active = digger.active == 1 ? true : false;
                d.setLevel(digger.curLevel)
                d.setMaxLevel(digger.maxLevel)
                diggers.push(d)
            }
        })
        this.set('diggers', diggers);
    }
    setDish(playerData : any) : void {
        const dish : Dish = DISHES[playerData.cooking.curDishIndex]
        dish.importStats(playerData.cooking)
        this.set('dish', dish);
    }

    setEquipmentWeapon(playerData : any) : void {
        const weapon : any = playerData.inventory.weapon;
        const weaponItem : Item = _.cloneDeep(ITEMS[weapon.id])
        weaponItem.importStats(weapon)
        this.set('equipmentWeapon', weaponItem)
    }
    setEquipmentWeaponTwo(playerData : any) : void {
        const weaponTwo : any = playerData.inventory.weapon2;
        if (weaponTwo.id != 0 ) {
            const weaponTwoItem : Item = _.cloneDeep(ITEMS[weaponTwo.id])
            // weapon 2 doesn't necessarily have a full ratio
            weaponTwoItem.ratio = playerData.wishes.wishes[28].level * 0.05
                                + playerData.wishes.wishes[45].level * 0.05
            weaponTwoItem.importStats(weaponTwo)
            this.set('equipmentWeaponTwo', weaponTwoItem);
        } else {
            this.set('equipmentWeaponTwo', _.cloneDeep(ITEMS[0]))
        }
    }
                    
    setEquipmentHead(playerData : any) : void {
        const head : any = playerData.inventory.head;
        const headItem : Item = _.cloneDeep(ITEMS[head.id])
        headItem.importStats(head)
        this.set('equipmentHead', headItem);
    }
    setEquipmentChest(playerData : any) : void {
        const chest : any = playerData.inventory.chest;
        const chestItem : Item= _.cloneDeep(ITEMS[chest.id])
        chestItem.importStats(chest)
        this.set('equipmentChest', chestItem);
    }
    setEquipmentLegs(playerData : any) : void {
        const legs : any = playerData.inventory.legs;
        const legsItem : Item = _.cloneDeep(ITEMS[legs.id])
        legsItem.importStats(legs)
        this.set('equipmentLegs', legsItem);
    }
    setEquipmentBoots(playerData : any) : void {
        const boots : any = playerData.inventory.boots;
        const bootsItem : Item = _.cloneDeep(ITEMS[boots.id])
        bootsItem.importStats(boots)
        this.set('equipmentBoots', bootsItem);
    }
    setEquipmentAccesories(playerData : any) : void {
        const accesories : any = playerData.inventory.accs.filter((acc : any) => !_.isNull(acc) && !_.isUndefined(acc.id) && !_.isNaN(acc.id))
        const acc = accesories.map((acc : any) => {
            const accItem : Item = _.cloneDeep(ITEMS[acc.id])
            accItem.importStats(acc)
            return accItem
        })
        this.set('equipmentAccesories', acc);
    }
    setEquipmentTest(playerData : any) : void {
        const items : any = playerData.inventory.inventory.filter((it : any) => !_.isUndefined(it.id) && !_.isNaN(it.id) && it.id > 0)
                    
        items.map((it : any) => {
            if(!_.isUndefined(ITEMS[it.id])) {
                const item : Item = _.cloneDeep(ITEMS[it.id])
                return item
            } else {
                console.log(it, " is missing from item list.")
            }
        })
    }
    setEnergyNGUs(playerData : any) : void {
        const energyNGUs : NGU[] = []
        playerData.NGU.skills.forEach((engu : any, index : number) => {
            if (!_.isUndefined(engu.level) && index < 10) {
                for (let i = 0; i < 3; i++) {
                    const ngu : NGU = _.cloneDeep(ENERGY_NGUS[index + (i * 10)])
                    if (!_.isUndefined(ngu)) {
                        ngu.importStats(engu)
                        energyNGUs.push(ngu)
                    }
                }
            }
        })
        this.set('energyNGUs', energyNGUs);
    }
    setMagicNGUs(playerData : any) : void {
        const magicNGUs : NGU[] = []
        playerData.NGU.magicSkills.forEach((mngu : any, index : number) => {
            if (!_.isUndefined(mngu.level) && index < 10) {
                for (let i = 0; i < 3; i++) {
                    const ngu : NGU = _.cloneDeep(MAGIC_NGUS[index + (i * 10)])
                    if (!_.isUndefined(ngu)) {
                        ngu.importStats(mngu)
                        magicNGUs.push(ngu)
                    }
                }
            }
        })
        this.set('magicNGUs', magicNGUs);
    }

    setHacks(playerData : any) : void {
                    const hacks: Hack[] = []
                    playerData.hacks.hacks.forEach((hackData : any, index : number) => {
                        if(index < 15) {
                            const hack : Hack = _.cloneDeep(HACKS[index])
                            if(!_.isUndefined(hack)) {
                                hack.importStats(hackData, playerData)
                                hacks.push(hack)
                            }
                        }
                    })
        this.set('hacks', hacks);
    }
                    
    setMacguffins(playerData : any) : void {
        const macguffins : MacGuffin[] = []

        for (let c = 0; c < 25; c++) {
            if(!_.isUndefined(MACGUFFINS[c])) {
                macguffins.push(_.cloneDeep(MACGUFFINS[c]))
            }
        }
        playerData.inventory.macguffins.forEach((macguffin : any) => {
            if(macguffin.id > 0) {
                let macID = 0;
                switch(macguffin.id) {
                    case 228:
                        macID = 13
                        break;
                    case 211:
                        macID = 15
                        break;
                    case 250:
                        macID = 16
                        break;
                    case 289:
                        macID = 17
                        break;
                    case 290:
                        macID = 18
                        break;
                    case 291:
                        macID = 19
                        break;
                    case 298:
                        macID = 20
                        break;
                    case 299:
                        macID = 21
                        break;
                    case 300:
                        macID = 22
                        break;
                    default:
                        macID = macguffin.id - 198
                }
                macguffins[macID].setLevel(macguffin.level)
            }
        })

        macguffins.forEach((macguffin) => {
            macguffin.importStats(playerData.inventory.macguffinBonuses)
        })
                    
        this.set('macguffins', macguffins);
    }
    setPerks(playerData : any) : void {
        const perks : Perk[] = []
        playerData.adventure.itopod.perkLevel.forEach((perk : any, index : number) => {
            if (!_.isUndefined(perk) && perk > 0) {
                if (!_.isUndefined(PERKS[index])) {
                    const p = _.cloneDeep(PERKS[index])
                    p.setLevel(perk)
                    perks.push(p)
                }
            }
        })
    
        this.set('perks', perks);
    }
    setQuirks(playerData : any) : void {
        const quirks : Quirk[]= []
        playerData.beastQuest.quirkLevel.forEach((quirk : any, index : number) => {
            if (!_.isUndefined(quirk) && quirk > 0) {
                if (!_.isUndefined(QUIRKS[index])) {
                    const q = _.cloneDeep(QUIRKS[index])
                    q.setLevel(quirk)
                    quirks.push(q)
                }
            }
        })
        this.set('quirks', quirks);
    }
    setTitans(playerData : any) : void {
        const titans : Titan[] = [];
        Object.values(Titans).forEach((titan) => {
            if (!_.isUndefined(titan) && titan.id < 13) {
                const t = _.cloneDeep(titan)
                t.importKills(playerData.bestiary.enemies)
                titans.push(t)
            }
        })
        this.set('titans', titans);
    }

    setWandoos(playerData : any) : void {
        const wandoos : Wandoos[] = _.cloneDeep(Object.values(WANDOOSLIST))
        wandoos.forEach((wandoo) => {
            wandoo.importStats(playerData)
        })
        this.set('wandoos', wandoos);
    }
    setWishes(playerData : any) : void {
        const wishes : Wish[]= []
        playerData.wishes.wishes.forEach((wish : any, index : number) => {
            if (!_.isUndefined(wish)) {
                if (!_.isUndefined(WISHES[index])) {
                    const w = _.cloneDeep(WISHES[index])
                    w.setLevel(wish.level)
                    w.setProgress(wish.progress)
                    wishes.push(w)
                }
            }
        })
                    
        this.set('wishes', wishes);
    }
    setYggdrasil(playerData : any) : void {
        const yggdrasil: Yggdrasil[] = _.cloneDeep(Object.values(FRUITS))
        yggdrasil.forEach((fruit) => {
            const f = playerData.yggdrasil.fruits[fruit.id]
            f['totalPermStatBonus'] = playerData.yggdrasil.totalPermStatBonus
            f['totalPermStatBonus2'] = playerData.yggdrasil.totalPermStatBonus2
            f['totalPermNumberBonus'] = playerData.yggdrasil.totalPermNumberBonus
            fruit.importStats(f)
        })
        this.set('yggdrasil', yggdrasil);
    }
    setItemSets(playerData : any) : void {
        const itemSets : {[key: string]: ItemSet} = {}
        for (const set of Object.values(ItemSets)) {
            set.updateStats(playerData)
            itemSets[set.key] = _.cloneDeep(set)
        }
        this.set('itemSets', itemSets);
    }
    setMaxxedItems(playerData : any) : void {
        const maxxedItemIds : number[] = []
        playerData.inventory.itemList.itemMaxxed.forEach((maxxed: number, item: number) => {
            if (maxxed == 1) {
                maxxedItemIds.push(item)
            }
        })
        this.set('maxxedItems', maxxedItemIds);
    }
}
