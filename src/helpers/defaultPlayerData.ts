import { ADVTRAININGS, AdvTraining } from "@/assets/advTraining";
import { APITEMLIST, APITEMS, APItem } from "@/assets/apItems";
import { BEARDS, Beard } from "@/assets/beards";
import { CHALLENGES, Challenge } from "@/assets/challenges";
import { DIGGERS, Digger } from "@/assets/diggers";
import { HACKS, Hack } from "@/assets/hacks";
import { MACGUFFINS, MacGuffin } from "@/assets/macguffins";
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { ItemSet, ItemSets } from "@/assets/sets";
import { WISHES, Wish } from "@/assets/wish";
import { FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import _ from "lodash";
import { ITEMS, Item } from "../assets/items";
import { GameMode } from "../assets/mode";
import { PERKS, Perk } from "../assets/perks";
import { QUIRKS, Quirk } from "../assets/quirks";
import { boostRecyclying, getIdleAttackModifier, totalAPBonus, totalCardSpeed, totalDropChance, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalExpBonus, totalHackSpeed, totalHealth, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalMayoSpeed, totalPPBonus, totalPower, totalQuestDropBonus, totalQuestRewardBonus, totalRegen, totalRes3Cap, totalRes3Power, totalRespawnRate, totalSeedGainBonus, totalTagEffect, totalToughness, totalWishSpeed, totalYggdrasilYieldBonus } from "./calculators";
import { bd, isOne } from "./numbers";
import { Wandoos, WANDOOSLIST } from "@/assets/wandoos";
import { Zones } from "@/assets/zones";
import { parseNum } from "./parsers";
import { Card, CARDLIST, CARDS } from "@/assets/cards";
import { Titan, Titans } from "@/assets/enemy";
import { Dish, DISHES } from "@/assets/cooking";

export function defaultPlayerData(playerData : any, info : string | [string, number]) : any {
    // If we're given an array, the second object is the default value from the "extraRequired", stuff, so use that.
    if(_.isArray(info)) {
        return info[1]
    }
    const playerExists = (playerData && Object.keys(playerData).length > 0)
    if (playerExists) {
        let taggedCards : number[]= []
        if(!_.isUndefined(playerData.cards.taggedBonuses) && playerData.cards.taggedBonuses.length > 0) {
            taggedCards = [
                playerData.cards.taggedBonuses[0][1].value__,
                playerData.cards.taggedBonuses[1][1].value__,
                playerData.cards.taggedBonuses[2][1].value__,
                playerData.cards.taggedBonuses[3][1].value__,
            ]
        }
        
        switch(info) {
            case 'activeQuestWishI-2':
                return playerData.wishes.wishes[19].level
            case 'activeQuestWishII-2':
                return playerData.wishes.wishes[62].level
            case 'baseAdventurePower':
                return playerData.adventure.attack
            case 'baseAdventureToughness':
                return playerData.adventure.defense
            case 'baseAdventureHealth':
                return playerData.adventure.maxHP
            case 'baseAdventureRegen':
                return playerData.adventure.regen
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
            case 'baseRes3Bar':
                return playerData.res3.res3PerBar;
            case 'baseRes3Cap':
                return playerData.res3.capRes3;
            case 'baseRes3Power':
                return playerData.res3.res3Power;

            case 'beastMode':
                return playerData.adventure.beastModeOn
            case 'beefyWish-1':
                return playerData.wishes.wishes[162].level
                        + playerData.wishes.wishes[220].level
                        + playerData.wishes.wishes[227].level
            case 'bloodMagicDropChance':
                if (playerData.bloodMagic.lootSpellBlood == '0') {
                    return 0
                }
                return Math.ceil(Math.log2(playerData.bloodMagic.lootSpellBlood / 10000))
            case 'bloodMagicTimeMachine':
                return Math.ceil(Math.log2(playerData.bloodMagic.goldSpellBlood / 1000000) ** 2)
            case 'blueHeart^':
                return playerData.inventory.itemList.blueHeartComplete
            case 'bonusPP-4':
                return playerData.beastQuest.quirkLevel[70] * 10
                    + playerData.wishes.wishes[79].level * 50
            case 'bonusTitanEXPPerk-2':
                return playerData.adventure.itopod.perkLevel[34]
            case 'boostRecyclyingPurchase':
                return playerData.purchases.boost

            case 'cardRecyclingCard^':
                return playerData.adventure.itopod.perkLevel[216]
            case 'cardRecyclingMayo^':
                return playerData.beastQuest.quirkLevel[156]
            case 'cardChonkers^':
                return playerData.beastQuest.quirkLevel[149]
            case 'cardTaggedEnergyNGU^':
                return taggedCards.includes(1) ? 1 : 0
            case 'cardTaggedMagicNGU^':
                return taggedCards.includes(2) ? 1 : 0
            case 'cardTaggedWandoos^':
                return taggedCards.includes(3) ? 1 : 0
            case 'cardTaggedAugments^':
                return taggedCards.includes(4) ? 1 : 0
            case 'cardTaggedTimeMachine^':
                return taggedCards.includes(5) ? 1 : 0
            case 'cardTaggedHack^':
                return taggedCards.includes(6) ? 1 : 0
            case 'cardTaggedWish^':
                return taggedCards.includes(7) ? 1 : 0
            case 'cardTaggedStat^':
                return taggedCards.includes(8) ? 1 : 0
            case 'cardTaggedAdventure^':
                return taggedCards.includes(9) ? 1 : 0
            case 'cardTaggedDropChance^':
                return taggedCards.includes(10) ? 1 : 0
            case 'cardTaggedGoldDrop^':
                return taggedCards.includes(11) ? 1 : 0
            case 'cardTaggedDaycare^':
                return taggedCards.includes(12) ? 1 : 0
            case 'cardTaggedPP^':
                return taggedCards.includes(13) ? 1 : 0
            case 'cardTaggedQP^':
                return taggedCards.includes(14) ? 1 : 0
            case 'cardTierAdventure-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierAugments-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierDaycare-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierDropChance-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierEnergyNGU-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierGoldDrop-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierHack-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierMagicNGU-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierPP-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
                        + playerData.beastQuest.quirkLevel[110]
                        + playerData.beastQuest.quirkLevel[123]
                        + playerData.beastQuest.quirkLevel[136]
                        + playerData.beastQuest.quirkLevel[168]
                        + playerData.wishes.wishes[122].level
                        + playerData.wishes.wishes[135].level
                        + playerData.wishes.wishes[148].level
                        + playerData.wishes.wishes[181].level
                        + playerData.wishes.wishes[212].level
            case 'cardTierQP-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
                        + playerData.adventure.itopod.perkLevel[167]
                        + playerData.adventure.itopod.perkLevel[180]
                        + playerData.adventure.itopod.perkLevel[193]
                        + playerData.wishes.wishes[126].level
                        + playerData.wishes.wishes[139].level
                        + playerData.wishes.wishes[152].level
                        + playerData.wishes.wishes[185].level
                        + playerData.wishes.wishes[216].level
            case 'cardTierStat-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierTimeMachine-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierWandoos-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
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
            case 'cardTierWish-2':
                return 1 + playerData.inventory.itemList.rockLobsterComplete
                        + playerData.adventure.itopod.perkLevel[163]
                        + playerData.adventure.itopod.perkLevel[176]
                        + playerData.adventure.itopod.perkLevel[189]
                        + playerData.beastQuest.quirkLevel[101]
                        + playerData.beastQuest.quirkLevel[114]
                        + playerData.beastQuest.quirkLevel[127]
                        + playerData.beastQuest.quirkLevel[159]
            
            
            
            
                        
            





            case 'chonkChonkier-1':
                return playerData.wishes.wishes[229].level
            case 'chonkLessNotChonkier-1':
                return playerData.wishes.wishes[230].level
            case 'cookingExp':
                return playerData.cooking.expBonus
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

            case 'eatFruitOfGold^':
                return playerData.yggdrasil.fruits[0].eatFruit;
            case 'eatFruitOfPowerA^':
                return playerData.yggdrasil.fruits[1].eatFruit;
            case 'eatFruitOfAdventure^':
                return playerData.yggdrasil.fruits[2].eatFruit;
            case 'eatFruitOfKnowledge^':
                return playerData.yggdrasil.fruits[3].eatFruit;
            case 'eatFruitOfPomegranate^':
                return playerData.yggdrasil.fruits[4].eatFruit;
            case 'eatFruitOfLuck^':
                return playerData.yggdrasil.fruits[5].eatFruit;
            case 'eatFruitOfPowerB^':
                return playerData.yggdrasil.fruits[6].eatFruit;
            case 'eatFruitOfArbitrariness^':
                return playerData.yggdrasil.fruits[7].eatFruit;
            case 'eatFruitOfNumbers^':
                return playerData.yggdrasil.fruits[8].eatFruit;
            case 'eatFruitOfRage^':
                return playerData.yggdrasil.fruits[9].eatFruit;
            case 'eatFruitOfMacguffinA^':
                return playerData.yggdrasil.fruits[10].eatFruit;
            case 'eatFruitOfPowerD^':
                return playerData.yggdrasil.fruits[11].eatFruit;
            case 'eatFruitOfWatermelon^':
                return playerData.yggdrasil.fruits[12].eatFruit;
            case 'eatFruitOfMacguffinB^':
                return playerData.yggdrasil.fruits[13].eatFruit;
            case 'eatFruitOfQuirks^':
                return playerData.yggdrasil.fruits[14].eatFruit;
            case 'eatFruitOfAngryMayo^':
                return playerData.yggdrasil.fruits[15].eatFruit;
            case 'eatFruitOfSadMayo^':
                return playerData.yggdrasil.fruits[16].eatFruit;
            case 'eatFruitOfMoldyMayo^':
                return playerData.yggdrasil.fruits[17].eatFruit;
            case 'eatFruitOfAyyMayo^':
                return playerData.yggdrasil.fruits[18].eatFruit;
            case 'eatFruitOfCincoDeMayo^':
                return playerData.yggdrasil.fruits[19].eatFruit;
            case 'eatFruitOfPrettyMayo^':
                return playerData.yggdrasil.fruits[20].eatFruit;
            case 'poopFruitOfGold^':
                return playerData.yggdrasil.fruits[0].usePoop;
            case 'poopFruitOfPowerA^':
                return playerData.yggdrasil.fruits[1].usePoop;
            case 'poopFruitOfAdventure^':
                return playerData.yggdrasil.fruits[2].usePoop;
            case 'poopFruitOfKnowledge^':
                return playerData.yggdrasil.fruits[3].usePoop;
            case 'poopFruitOfPomegranate^':
                return playerData.yggdrasil.fruits[4].usePoop;
            case 'poopFruitOfLuck^':
                return playerData.yggdrasil.fruits[5].usePoop;
            case 'poopFruitOfPowerB^':
                return playerData.yggdrasil.fruits[6].usePoop;
            case 'poopFruitOfArbitrariness^':
                return playerData.yggdrasil.fruits[7].usePoop;
            case 'poopFruitOfNumbers^':
                return playerData.yggdrasil.fruits[8].usePoop;
            case 'poopFruitOfRage^':
                return playerData.yggdrasil.fruits[9].usePoop;
            case 'poopFruitOfMacguffinA^':
                return playerData.yggdrasil.fruits[10].usePoop;
            case 'poopFruitOfPowerD^':
                return playerData.yggdrasil.fruits[11].usePoop;
            case 'poopFruitOfWatermelon^':
                return playerData.yggdrasil.fruits[12].usePoop;
            case 'poopFruitOfMacguffinB^':
                return playerData.yggdrasil.fruits[13].usePoop;
            case 'poopFruitOfQuirks^':
                return playerData.yggdrasil.fruits[14].usePoop;
            case 'poopFruitOfAngryMayo^':
                return playerData.yggdrasil.fruits[15].usePoop;
            case 'poopFruitOfSadMayo^':
                return playerData.yggdrasil.fruits[16].usePoop;
            case 'poopFruitOfMoldyMayo^':
                return playerData.yggdrasil.fruits[17].usePoop;
            case 'poopFruitOfAyyMayo^':
                return playerData.yggdrasil.fruits[18].usePoop;
            case 'poopFruitOfCincoDeMayo^':
                return playerData.yggdrasil.fruits[19].usePoop;
            case 'poopFruitOfPrettyMayo^':
                return playerData.yggdrasil.fruits[20].usePoop;
            case 'tierFruitOfGold-2':
                return playerData.yggdrasil.fruits[0].maxTier;
            case 'tierFruitOfPowerA-2':
                return playerData.yggdrasil.fruits[1].maxTier;
            case 'tierFruitOfAdventure-2':
                return playerData.yggdrasil.fruits[2].maxTier;
            case 'tierFruitOfKnowledge-2':
                return playerData.yggdrasil.fruits[3].maxTier;
            case 'tierFruitOfPomegranate-2':
                return playerData.yggdrasil.fruits[4].maxTier;
            case 'tierFruitOfLuck-2':
                return playerData.yggdrasil.fruits[5].maxTier;
            case 'tierFruitOfPowerB-2':
                return playerData.yggdrasil.fruits[6].maxTier;
            case 'tierFruitOfArbitrariness-2':
                return playerData.yggdrasil.fruits[7].maxTier;
            case 'tierFruitOfNumbers-2':
                return playerData.yggdrasil.fruits[8].maxTier;
            case 'tierFruitOfRage-2':
                return playerData.yggdrasil.fruits[9].maxTier;
            case 'tierFruitOfMacguffinA-2':
                return playerData.yggdrasil.fruits[10].maxTier;
            case 'tierFruitOfPowerD-2':
                return playerData.yggdrasil.fruits[11].maxTier;
            case 'tierFruitOfWatermelon-2':
                return playerData.yggdrasil.fruits[12].maxTier;
            case 'tierFruitOfMacguffinB-2':
                return playerData.yggdrasil.fruits[13].maxTier;
            case 'tierFruitOfQuirks-2':
                return playerData.yggdrasil.fruits[14].maxTier;
            case 'tierFruitOfAngryMayo-2':
                return playerData.yggdrasil.fruits[15].maxTier;
            case 'tierFruitOfSadMayo-2':
                return playerData.yggdrasil.fruits[16].maxTier;
            case 'tierFruitOfMoldyMayo-2':
                return playerData.yggdrasil.fruits[17].maxTier;
            case 'tierFruitOfAyyMayo-2':
                return playerData.yggdrasil.fruits[18].maxTier;
            case 'tierFruitOfCincoDeMayo-2':
                return playerData.yggdrasil.fruits[19].maxTier;
            case 'tierFruitOfPrettyMayo-2':
                return playerData.yggdrasil.fruits[20].maxTier;

            case 'fadLandsSetBonus^':
                return playerData.inventory.itemList.fadComplete
            case 'fasterQuesting^':
                return playerData.arbitrary.hasFasterQuests
            case 'fibQuestRNG^':
                return (playerData.adventure.itopod.perkLevel[94] >= 610) ? 1 : 0;
            case 'firstHarvestPerk':
                return playerData.adventure.itopod.perkLevel[51]
            case 'fruitOfKnowledgeSucks^':
                return playerData.adventure.itopod.perkLevel[19]
            case 'fruitOfKnowledgeSTILLSucks^':
                return playerData.adventure.itopod.perkLevel[20]
            case 'gameMode':
                return playerData.settings.rebirthDifficulty.value__;

            case 'hackMilestoneStat':
                return playerData.beastQuest.quirkLevel[57]
            case 'hackMilestoneAdventure':
                return playerData.adventure.itopod.perkLevel[113]
            case 'hackMilestoneTimeMachine':
                return playerData.beastQuest.quirkLevel[175]
            case 'hackMilestoneDropChance':
                return playerData.adventure.itopod.perkLevel[217]
            case 'hackMilestoneAugment':
                return playerData.adventure.itopod.perkLevel[218]
            case 'hackMilestoneENGU':
                return playerData.beastQuest.quirkLevel[174]
            case 'hackMilestoneMNGU':
                return playerData.adventure.itopod.perkLevel[219]
            case 'hackMilestoneBlood':
                return playerData.adventure.itopod.perkLevel[114]
            case 'hackMilestoneQP':
                return playerData.wishes.wishes[76].level
            case 'hackMilestoneDaycare':
                return playerData.adventure.itopod.perkLevel[115]
            case 'hackMilestoneExp':
                return playerData.beastQuest.quirkLevel[59]
            case 'hackMilestoneNumber':
                return playerData.wishes.wishes[77].level
            case 'hackMilestonePP':
                return playerData.beastQuest.quirkLevel[58]
            case 'hackMilestoneHack':
                return playerData.wishes.wishes[78].level
            case 'hackMilestoneWish':
                return playerData.beastQuest.quirkLevel[60]

            case 'hackStatTarget':
                return playerData.hacks.hacks[0].target
            case 'hackAdventureTarget':
                return playerData.hacks.hacks[1].target
            case 'hackTimeMachineTarget':
                return playerData.hacks.hacks[2].target
            case 'hackDropChanceTarget':
                return playerData.hacks.hacks[3].target
            case 'hackAugmentTarget':
                return playerData.hacks.hacks[4].target
            case 'hackENGUTarget':
                return playerData.hacks.hacks[5].target
            case 'hackMNGUTarget':
                return playerData.hacks.hacks[6].target
            case 'hackBloodTarget':
                return playerData.hacks.hacks[7].target
            case 'hackQPTarget':
                return playerData.hacks.hacks[8].target
            case 'hackDaycareTarget':
                return playerData.hacks.hacks[9].target
            case 'hackExpTarget':
                return playerData.hacks.hacks[10].target
            case 'hackNumberTarget':
                return playerData.hacks.hacks[11].target
            case 'hackPPTarget':
                return playerData.hacks.hacks[12].target
            case 'hackHackTarget':
                return playerData.hacks.hacks[13].target
            case 'hackWishTarget':
                return playerData.hacks.hacks[14].target


            case 'numRebirthChallenges-2':
                return playerData.challenges.noRebirthChallenge.curCompletions
                    + playerData.challenges.noRebirthChallenge.curEvilCompletions
                    + playerData.challenges.noRebirthChallenge.curSadisticCompletions
            case 'questIdleDivider-1':
                return 8
                        - playerData.adventure.itopod.perkLevel[91] // Advanced
                        - playerData.adventure.itopod.perkLevel[92] // Even More Adv
                        - (2 * playerData.adventure.itopod.perkLevel[105]) // Gooder
                        - playerData.adventure.itopod.perkLevel[106] // Another Gooder
            case 'questMinorQP-2' :
                return 10
                        + (2 * playerData.adventure.itopod.perkLevel[87]) // Not So Minor Anymore
                        + playerData.adventure.itopod.perkLevel[148] // Improved Minor Quest QP Rewards
                        + playerData.wishes.wishes[102].level // I wish Minor Quests had better Base QP Rewards
            case 'questMajorQP-2' :
                return 50
                        + playerData.adventure.itopod.perkLevel[147] // Improved Major Quest QP Rewards
                        + playerData.wishes.wishes[101].level // I wish Major Quests had better Base QP Rewards
            case 'redLiquidBonus^':
                return playerData.inventory.itemList.redLiquidComplete
            case 'res3Active':
                return playerData.res3.res3On;
            case 'sadisticNoEquipmentChallenges-2':
                return playerData.challenges.noEquipmentChallenge.curSadisticCompletions
            case 'spoopySetBonus^':
                return playerData.inventory.itemList.ghostComplete
            case 'twentyFourHourChallenge-2':
                return playerData.challenges.hour24Challenge.curCompletions
            case 'twentyFourHourEvilChallenge-2':
                return playerData.challenges.hour24Challenge.curEvilCompletions
            case 'twentyFourHourSadisticChallenge-2':
                return playerData.challenges.hour24Challenge.curSadisticCompletions
            case 'wandoosEnergyAllocated' :
                return playerData.wandoos98.wandoosEnergy;
            case 'wandoosMagicAllocated' : 
                return playerData.wandoos98.wandoosMagic;
            case 'wimpyWish-1':
                return playerData.wishes.wishes[163].level
                        + playerData.wishes.wishes[221].level
                        + playerData.wishes.wishes[228].level
            case 'wishSlots-1':
                return 1
                        + playerData.beastQuest.quirkLevel[56]
                        + (playerData.challenges.trollChallenge.curEvilCompletions >= 7 ? 1 : 0)
                        + playerData.inventory.itemList.pinkHeartComplete
            case 'wishTitansHadBetterRewards-2':
                return playerData.wishes.wishes[3].level;
            case 'wishBeastDropQP^':
                return playerData.wishes.wishes[73].level;
            case 'wishNerdDropQP^':
                return playerData.wishes.wishes[74].level;
            case 'wishGodmotherDropQP^':
                return playerData.wishes.wishes[40].level;
            case 'wishExileDropQP^':
                return playerData.wishes.wishes[41].level;
            case 'wishTitan10DropQP^':
                return playerData.wishes.wishes[100].level;
            case 'wishTitan11DropQP^':
                return playerData.wishes.wishes[187].level;
            case 'wishTitan12DropQP^':
                return playerData.wishes.wishes[204].level;
            case 'yggdrasilDropChance':
                return playerData.yggdrasil.totalLuck / 20 + 100
            case '70sSet^':
                return playerData.inventory.itemList.that70sComplete



            case 'achievements':
                return playerData.achievements.achievementComplete
            case 'advTrainings':
                let advTrainings: AdvTraining[] = []
                for (let c = 0; c < 5; c++) {
                    advTrainings.push(_.cloneDeep(ADVTRAININGS[c]))
                }
                for (let c = 0; c < 5; c++) {
                    advTrainings[c].setLevel(playerData.advancedTraining.level[c])
                }
                return advTrainings
            case 'apItems':
                let apItems : APItem[] = []
                let apToAdd : {[key:string]: number} = {};
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
                

                for(let apItem of APITEMLIST) {
                    if(Object.keys(apToAdd).includes(apItem.key)){
                        let ap = _.cloneDeep(APITEMS[apItem.id]);
                        ap.setLevel(apToAdd[apItem.key])
                        apItems.push(ap)
                    }
                }
                return apItems;
            case 'beards':
                let beards : Beard[] = []
                playerData.beards.beards.forEach((beard : any, index : number) => {
                    if (!_.isUndefined(BEARDS[index])) {
                        let b = _.cloneDeep(BEARDS[index])
                        b.setLevel(beard.beardLevel)
                        b.setPermLevel(beard.permLevel)
                        b.setActive(beard.active)
                        beards.push(b)
                    }
                })
                return beards
            case 'cards':
                let cards : Card[] = []
                for (let card of CARDLIST) {
                    let c = _.cloneDeep(CARDS[card.id]);
                    c.importStats(playerData.cards.bonuses)
                    cards.push(c)
                }
                return cards;
            case 'challenges':
                let challenges : Challenge[] = []
                let evilChallenges : Challenge[] = []
                let sadChallenges : Challenge[] = []
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

                let cc : {[key:number] : Challenge[]} = {}
                cc[GameMode.NORMAL] = challenges
                cc[GameMode.EVIL] = evilChallenges;
                cc[GameMode.SADISTIC] = sadChallenges;

                // return challenges.concat(evilChallenges, sadChallenges)
                return cc
            case 'diggers':
                let diggers : Digger[] = []
                playerData.diggers.diggers.forEach((digger : any, id : number) => {
                    let d = _.cloneDeep(DIGGERS[id])
                    if (!_.isUndefined(d)) {
                        d.active = digger.active == 1 ? true : false;
                        d.setLevel(digger.curLevel)
                        d.setMaxLevel(digger.maxLevel)
                        diggers.push(d)
                    }
                })
                return diggers;
            case 'dish':
                var dish : Dish = DISHES[playerData.cooking.curDishIndex]
                dish.importStats(playerData.cooking)
                return dish;

            case 'equipmentWeapon':
                let weapon : any = playerData.inventory.weapon;
                let weaponItem : Item = _.cloneDeep(ITEMS[weapon.id])
                weaponItem.importStats(weapon)
                return weaponItem
            case 'equipmentWeaponTwo':
                let weaponTwo : any = playerData.inventory.weapon2;
                if (weaponTwo.id != 0 ) {
                    let weaponTwoItem : Item = _.cloneDeep(ITEMS[weaponTwo.id])
                    // weapon 2 doesn't necessarily have a full ratio
                    weaponTwoItem.ratio = playerData.wishes.wishes[28].level * 0.05
                                        + playerData.wishes.wishes[45].level * 0.05
                    weaponTwoItem.importStats(weaponTwo)
                    return weaponTwoItem
                }
                return null
                
            case 'equipmentHead':
                let head : any = playerData.inventory.head;
                let headItem : Item = _.cloneDeep(ITEMS[head.id])
                headItem.importStats(head)
                return headItem
            case 'equipmentChest':
                let chest : any = playerData.inventory.chest;
                let chestItem : Item= _.cloneDeep(ITEMS[chest.id])
                chestItem.importStats(chest)
                return chestItem
            case 'equipmentLegs':
                let legs : any = playerData.inventory.legs;
                let legsItem : Item = _.cloneDeep(ITEMS[legs.id])
                legsItem.importStats(legs)
                return legsItem
            case 'equipmentBoots':
                let boots : any = playerData.inventory.boots;
                let bootsItem : Item = _.cloneDeep(ITEMS[boots.id])
                bootsItem.importStats(boots)
                return bootsItem
            case 'equipmentAccesories':
                let accesories : any = playerData.inventory.accs.filter((acc : any) => !_.isUndefined(acc.id) && !_.isNaN(acc.id))
                
                return accesories.map((acc : any) => {
                    let accItem : Item = _.cloneDeep(ITEMS[acc.id])
                    accItem.importStats(acc)
                    return accItem
                })
            case 'equipmentTest':
                let items : any = playerData.inventory.inventory.filter((it : any) => !_.isUndefined(it.id) && !_.isNaN(it.id) && it.id > 0)
                
                return items.map((it : any) => {
                    if(!_.isUndefined(ITEMS[it.id])) {
                        let item : Item = _.cloneDeep(ITEMS[it.id])
                        return item
                    } else {
                        console.log(it, " is missing from item list.")
                    }
                })
            case 'energyNGUs':
                let energyNGUs : NGU[] = []
                playerData.NGU.skills.forEach((engu : any, index : number) => {
                    if (!_.isUndefined(engu.level) && index < 10) {
                        for (let i = 0; i < 3; i++) {
                            let ngu : NGU = _.cloneDeep(ENERGY_NGUS[index + (i * 10)])
                            if (!_.isUndefined(ngu)) {
                                ngu.importStats(engu)
                                energyNGUs.push(ngu)
                            }
                        }
                    }
                })
                return energyNGUs
            case 'magicNGUs':
                let magicNGUs : NGU[] = []
                playerData.NGU.magicSkills.forEach((mngu : any, index : number) => {
                    if (!_.isUndefined(mngu.level) && index < 10) {
                        for (let i = 0; i < 3; i++) {
                            let ngu : NGU = _.cloneDeep(MAGIC_NGUS[index + (i * 10)])
                            if (!_.isUndefined(ngu)) {
                                ngu.importStats(mngu)
                                magicNGUs.push(ngu)
                            }
                        }
                    }
                })
                return magicNGUs

            case 'hacks':
                let hacks: Hack[] = []
                playerData.hacks.hacks.forEach((hackData : any, index : number) => {
                    if(index < 15) {
                        let hack : Hack = _.cloneDeep(HACKS[index])
                        if(!_.isUndefined(hack)) {
                            hack.importStats(hackData, playerData)
                            hacks.push(hack)
                        }
                    }
                })
                return hacks
                
            case 'macguffins':
                let macguffins : MacGuffin[] = []

                for (let c = 0; c < 25; c++) {
                    if(!_.isUndefined(MACGUFFINS[c])) {
                        macguffins.push(_.cloneDeep(MACGUFFINS[c]))
                    }
                }
                playerData.inventory.macguffins.forEach((macguffin : any, index : number) => {
                    if(macguffin.id > 0) {
                        let macID = 0;
                        switch(macguffin.id) {
                            case 228:
                                macID = 14
                                break;
                            case 250:
                                macID = 15
                                break;
                            case 289:
                                macID = 16
                                break;
                            case 290:
                                macID = 17
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
                
                return macguffins
            case 'perks':
                let perks : Perk[] = []
                playerData.adventure.itopod.perkLevel.forEach((perk : any, index : number) => {
                    if (!_.isUndefined(perk) && perk > 0) {
                        if (!_.isUndefined(PERKS[index])) {
                            let p = _.cloneDeep(PERKS[index])
                            p.setLevel(perk)
                            perks.push(p)
                        }
                    }
                })
                
                return perks
            case 'quirks':
                let quirks : Quirk[]= []
                playerData.beastQuest.quirkLevel.forEach((quirk : any, index : number) => {
                    if (!_.isUndefined(quirk) && quirk > 0) {
                        if (!_.isUndefined(QUIRKS[index])) {
                            let q = _.cloneDeep(QUIRKS[index])
                            q.setLevel(quirk)
                            quirks.push(q)
                        }
                    }
                })
                return quirks;
            case 'titans':
                let titans : Titan[] = [];
                Object.values(Titans).forEach((titan) => {
                    if (!_.isUndefined(titan) && titan.id < 13) {
                        let t = _.cloneDeep(titan)
                        t.importKills(playerData.bestiary.enemies)
                        titans.push(t)
                    }
                })
                return titans

            case 'wandoos' :
                let wandoos : Wandoos[] = _.cloneDeep(Object.values(WANDOOSLIST))
                wandoos.forEach((wandoo) => {
                    wandoo.importStats(playerData)
                })
                return wandoos
            case 'wishes':
                let wishes : Wish[]= []
                playerData.wishes.wishes.forEach((wish : any, index : number) => {
                    if (!_.isUndefined(wish)) {
                        if (!_.isUndefined(WISHES[index])) {
                            let w = _.cloneDeep(WISHES[index])
                            w.setLevel(wish.level)
                            w.setProgress(wish.progress)
                            wishes.push(w)
                        }
                    }
                })
                
                return wishes;
            case 'yggdrasil':
                let yggdrasil: Yggdrasil[] = _.cloneDeep(Object.values(FRUITS))
                yggdrasil.forEach((fruit) => {
                    let f = playerData.yggdrasil.fruits[fruit.id]
                    f['totalPermStatBonus'] = playerData.yggdrasil.totalPermStatBonus
                    f['totalPermStatBonus2'] = playerData.yggdrasil.totalPermStatBonus2
                    f['totalPermNumberBonus'] = playerData.yggdrasil.totalPermNumberBonus
                    fruit.importStats(f)
                })
                return yggdrasil
            case 'itemSets':
                let itemSets : {[key: string]: ItemSet} = {}
                for (let set of Object.values(ItemSets)) {
                    set.updateStats(playerData)
                    itemSets[set.key] = _.cloneDeep(set)
                }
                return itemSets
            case 'maxxedItems':
                let maxxedItemIds : number[] = []
                playerData.inventory.itemList.itemMaxxed.forEach((maxxed: number, item: number) => {
                    if (maxxed == 1) {
                        maxxedItemIds.push(item)
                    }
                })
                return maxxedItemIds

            // Calculations
            case 'boostRecyclying%':
                return boostRecyclying(playerData);
            case 'totalEnergyPower':
                return totalEnergyPower(playerData);
            case 'totalEnergyCap':
                return totalEnergyCap(playerData);
            case 'totalMagicPower':
                return totalMagicPower(playerData);
            case 'totalMagicCap':
                return totalMagicCap(playerData);
            case 'totalRes3Power':
                return totalRes3Power(playerData);
            case 'totalRes3Cap':
                return totalRes3Cap(playerData);
            case 'totalAPBonus%':
                return totalAPBonus(playerData);
            case 'totalCardSpeed%':
                return totalCardSpeed(playerData);
            case 'totalDropChance%':
                return totalDropChance(playerData);
            case 'totalEnergyNGUSpeedFactor%':
                return totalEnergyNGUSpeedFactor(playerData);
            case 'totalExpBonus%':
                return totalExpBonus(playerData);
            case 'totalHackSpeed%':
                return totalHackSpeed(playerData)
            case 'totalHealth':
                return totalHealth(playerData);
            case 'totalMagicNGUSpeedFactor%':
                return totalMagicNGUSpeedFactor(playerData);
            case 'totalMayoSpeed%':
                return totalMayoSpeed(playerData);
            case 'totalPPBonus%':
                return totalPPBonus(playerData)
            case 'totalPower':
                return totalPower(playerData);
            case 'totalRegen':
                return totalRegen(playerData);
            case 'totalToughness':
                return totalToughness(playerData);
            case 'totalQuestRewardBonus%':
                return totalQuestRewardBonus(playerData);
            case 'totalQuestDropBonus%':
                return totalQuestDropBonus(playerData)
            case 'totalRespawnTime':
                return totalRespawnRate(playerData).divide(bd(25));
            case 'totalSeedGainBonus%':
                return totalSeedGainBonus(playerData)
            case 'totalTagEffect%':
                return totalTagEffect(playerData);
            case 'totalWishSpeed%':
                return totalWishSpeed(playerData);
            case 'totalYggdrasilYieldBonus%':
                return totalYggdrasilYieldBonus(playerData)
            case 'itopodFloor-5':
                var itopodZone = Zones.ITOPOD;
                var spoopySetBonus = isOne(parseNum(playerData, 'spoopySetBonus^'))
                var sadisticNoEquipmentChallenges = parseNum(playerData, 'sadisticNoEquipmentChallenges-2')
                var idleAttackModifier = getIdleAttackModifier(spoopySetBonus, sadisticNoEquipmentChallenges);
                return bd(itopodZone.getOptimalFloor(totalPower(playerData), idleAttackModifier))
            
            
            
            default:
                return 0;
        }
    }
    if (info in getPlayerOptions()) {
        return {};
    }
    if (info in getGOOptions()) {
        return bd(0);
    }
    return 0;
}

export function getPlayerNumberOptions() : string[]{
    return [
        'activeQuestWishI-2',
        'activeQuestWishII-2',
        'baseAdventurePower',
        'baseAdventureToughness',
        'baseAdventureHealth',
        'baseAdventureRegen',
        'baseEnergyPower',
        'baseEnergyBar',
        'baseEnergyCap',
        'baseMagicBar',
        'baseMagicCap',
        'baseMagicPower',
        'baseRes3Bar',
        'baseRes3Cap',
        'baseRes3Power',
        'beastMode',
        'beefyWish-1',
        'bloodMagicDropChance',
        'bloodMagicTimeMachine',
        'blueHeart^',
        'bonusPP-4',
        'bonusTitanEXPPerk-2',
        'boostRecyclyingPurchase',
        'cardRecyclingCard^',
        'cardRecyclingMayo^',
        'cardChonkers^',
        'cardTaggedEnergyNGU^',
        'cardTaggedMagicNGU^',
        'cardTaggedWandoos^',
        'cardTaggedAugments^',
        'cardTaggedTimeMachine^',
        'cardTaggedHack^',
        'cardTaggedWish^',
        'cardTaggedStat^',
        'cardTaggedAdventure^',
        'cardTaggedDropChance^',
        'cardTaggedGoldDrop^',
        'cardTaggedDaycare^',
        'cardTaggedPP^',
        'cardTaggedQP^',
        'cardTierEnergyNGU-2',
        'cardTierMagicNGU-2',
        'cardTierWandoos-2',
        'cardTierAugments-2',
        'cardTierTimeMachine-2',
        'cardTierHack-2',
        'cardTierWish-2',
        'cardTierStat-2',
        'cardTierAdventure-2',
        'cardTierDropChance-2',
        'cardTierGoldDrop-2',
        'cardTierDaycare-2',
        'cardTierPP-2',
        'cardTierQP-2',
        'chonkChonkier-1',
        'chonkLessNotChonkier-1',
        'cookingExp',
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
        'eatFruitOfGold^',
        'eatFruitOfPowerA^',
        'eatFruitOfAdventure^',
        'eatFruitOfKnowledge^',
        'eatFruitOfPomegranate^',
        'eatFruitOfLuck^',
        'eatFruitOfPowerB^',
        'eatFruitOfArbitrariness^',
        'eatFruitOfNumbers^',
        'eatFruitOfRage^',
        'eatFruitOfMacguffinA^',
        'eatFruitOfPowerD^',
        'eatFruitOfWatermelon^',
        'eatFruitOfMacguffinB^',
        'eatFruitOfQuirks^',
        'eatFruitOfAngryMayo^',
        'eatFruitOfSadMayo^',
        'eatFruitOfMoldyMayo^',
        'eatFruitOfAyyMayo^',
        'eatFruitOfCincoDeMayo^',
        'eatFruitOfPrettyMayo^',
        'poopFruitOfGold^',
        'poopFruitOfPowerA^',
        'poopFruitOfAdventure^',
        'poopFruitOfKnowledge^',
        'poopFruitOfPomegranate^',
        'poopFruitOfLuck^',
        'poopFruitOfPowerB^',
        'poopFruitOfArbitrariness^',
        'poopFruitOfNumbers^',
        'poopFruitOfRage^',
        'poopFruitOfMacguffinA^',
        'poopFruitOfPowerD^',
        'poopFruitOfWatermelon^',
        'poopFruitOfMacguffinB^',
        'poopFruitOfQuirks^',
        'poopFruitOfAngryMayo^',
        'poopFruitOfSadMayo^',
        'poopFruitOfMoldyMayo^',
        'poopFruitOfAyyMayo^',
        'poopFruitOfCincoDeMayo^',
        'poopFruitOfPrettyMayo^',
        'tierFruitOfGold-2',
        'tierFruitOfPowerA-2',
        'tierFruitOfAdventure-2',
        'tierFruitOfKnowledge-2',
        'tierFruitOfPomegranate-2',
        'tierFruitOfLuck-2',
        'tierFruitOfPowerB-2',
        'tierFruitOfArbitrariness-2',
        'tierFruitOfNumbers-2',
        'tierFruitOfRage-2',
        'tierFruitOfMacguffinA-2',
        'tierFruitOfPowerD-2',
        'tierFruitOfWatermelon-2',
        'tierFruitOfMacguffinB-2',
        'tierFruitOfQuirks-2',
        'tierFruitOfAngryMayo-2',
        'tierFruitOfSadMayo-2',
        'tierFruitOfMoldyMayo-2',
        'tierFruitOfAyyMayo-2',
        'tierFruitOfCincoDeMayo-2',
        'tierFruitOfPrettyMayo-2',
        'fadLandsSetBonus^',
        'fasterQuesting^',
        'fibQuestRNG^',
        'firstHarvestPerk',
        'fruitOfKnowledgeSucks^',
        'fruitOfKnowledgeSTILLSucks^',
        'gameMode',
        'hackMilestoneStat',
        'hackMilestoneAdventure',
        'hackMilestoneTimeMachine',
        'hackMilestoneDropChance',
        'hackMilestoneAugment',
        'hackMilestoneENGU',
        'hackMilestoneMNGU',
        'hackMilestoneBlood',
        'hackMilestoneQP',
        'hackMilestoneDaycare',
        'hackMilestoneExp',
        'hackMilestoneNumber',
        'hackMilestonePP',
        'hackMilestoneHack',
        'hackMilestoneWish',
        'hackStatTarget',
        'hackAdventureTarget',
        'hackTimeMachineTarget',
        'hackDropChanceTarget',
        'hackAugmentTarget',
        'hackENGUTarget',
        'hackMNGUTarget',
        'hackBloodTarget',
        'hackQPTarget',
        'hackDaycareTarget',
        'hackExpTarget',
        'hackNumberTarget',
        'hackPPTarget',
        'hackHackTarget',
        'hackWishTarget',
        'redLiquidBonus^',
        'numRebirthChallenges-2',
        'questIdleDivider-1',
        'questMinorQP-2',
        'questMajorQP-2',
        'res3Active',
        'sadisticNoEquipmentChallenges-2',
        'spoopySetBonus^',
        'twentyFourHourChallenge-2',
        'twentyFourHourEvilChallenge-2',
        'twentyFourHourSadisticChallenge-2',
        'wandoosEnergyAllocated',
        'wandoosMagicAllocated',
        'wimpyWish-1',
        'wishSlots-1',
        'wishTitansHadBetterRewards-2',
        'wishBeastDropQP^',
        'wishNerdDropQP^',
        'wishGodmotherDropQP^',
        'wishExileDropQP^',
        'wishTitan10DropQP^',
        'wishTitan11DropQP^',
        'wishTitan12DropQP^',
        'yggdrasilDropChance',
        '70sSet^',
    ]
}


export function getPlayerOptions() : string[] {
    return [
        'achievements',
        'advTrainings',
        'apItems',
        'beards',
        'cards',
        'challenges',
        'diggers',
        'dish',
        'equipmentHead',
        'equipmentLegs',
        'equipmentChest',
        'equipmentBoots',
        'equipmentWeapon',
        'equipmentWeaponTwo',
        'equipmentAccesories',
        'equipmentTest',
        'energyNGUs',
        'magicNGUs',
        'hacks',
        'macguffins',
        'perks',
        'quirks',
        'titans',
        'wandoos',
        'wishes',
        'yggdrasil',
        'maxxedItems',
        'itemSets',
    ]
}

export function getCalculatedOptions() : string[] {
    return [        
        'boostRecyclying%',
        'totalEnergyPower',
        'totalEnergyCap',
        'totalMagicPower',
        'totalMagicCap',
        'totalRes3Power',
        'totalRes3Cap',
        'totalAPBonus%',
        'totalCardSpeed%',
        'totalDropChance%',
        'totalEnergyNGUSpeedFactor%',
        'totalExpBonus%',
        'totalHackSpeed%',
        'totalHealth',
        'totalMagicNGUSpeedFactor%',
        'totalMayoSpeed%',
        'totalPPBonus%',
        'totalPower',
        'totalRegen',
        'totalToughness',
        'totalQuestRewardBonus%',
        'totalQuestDropBonus%',
        'totalRespawnTime',
        'totalSeedGainBonus%',
        'totalTagEffect%',
        'totalWishSpeed%',
        'totalYggdrasilYieldBonus%',
        'itopodFloor-5',
    ]
}
export function getGOOptions() : string[] {
    return [
        'goAdvancedTraining%',
        'goAP%',
        'goAugmentation%',
        'goBeards%',
        'goBloodRituals%',
        'goCooking%',
        'goDaycare%',
        'goDropChance%',
        'goEMPC%',
        'goEnergyBars%',
        'goEnergyBeards%',
        'goEnergyCap%',
        'goEnergyCapSpeed%',
        'goEnergyNGU%',
        'goEnergyPower%',
        'goEnergySpeed%',
        'goEnergyTimeMachine%',
        'goEnergyWandoos%',
        'goExperience%',
        'goGoldDrops%',
        'goHacks%',
        'goMagicBars%',
        'goMagicBeards%',
        'goMagicCap%',
        'goMagicCapSpeed%',
        'goMagicNGU%',
        'goMagicPower%',
        'goMagicSpeed%',
        'goMagicTimeMachine%',
        'goMagicWandoos%',
        'goMoveCooldown%',
        'goNGUs%',
        'goNGUsAndHacks%',
        'goNGUsAndWishes%',
        'goPower%',
        'goQuestDrop%',
        'goRawATSpeed%',
        'goRawAugmentSpeed%',
        'goRawBeardSpeed%',
        'goRawHackSpeed%',
        'goRawNGUSpeed%',
        'goRawWandoosSpeed%',
        'goRawWishSpeed%',
        'goResource3Bars%',
        'goResource3Cap%',
        'goResource3CapSpeed%',
        'goResource3Power%',
        'goRespawn%',
        'goSeedGain%',
        'goTimeMachine%',
        'goToughness%',
        'goWandoos%',
        'goWishes%',
        'goWishesAndHacks%',
        'goYggdrasilYield%',
    ]
}