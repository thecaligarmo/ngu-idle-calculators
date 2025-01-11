import { ItemSets } from "@/assets/sets"
import { Stat } from "@/assets/stat"
import _ from "lodash"
import { totalEnergyPower, totalEnergyNGUSpeedFactor, totalExpBonus, totalAPBonus, totalPPBonus, totalDaycareSpeed, totalHackSpeed, totalWishSpeed, totalPower, totalToughness, totalHealth, totalGoldDrop, totalRespawnRate, totalDropChance, totalAugmentSpeed, totalEnergyBar, totalEnergyBeardSpeed, totalEnergyWandoosSpeed, totalQuestRewardBonus, totalEnergyCap, totalRegen, totalMayoGeneration, totalMayoSpeed, totalCardSpeed, totalTagEffect } from "../calculators"
import { bd, bigdec_equals, bigdec_max, isOne, pn, toNum } from "../numbers"
import { equipmentWithCubeInfo, macguffinInfo, perkInfo, quirkInfo, wishInfo, apItemInfo, isMaxxedItemSet, nguInfo, beardInfoPerm, beardInfoTemp, diggerInfo, challengeInfo, hackInfo, achievementAPBonus, advTrainingInfo, activeBeards, wandoosOSLevel, cardInfo, isCompletedChallenge, maxxedItemSetNum, cookingInfo } from "../resourceInfo"
import bigDecimal from "js-big-decimal"
import { parseNum, parseObj } from "../parsers"
import { ChallengeKeys } from "@/assets/challenges"
import { GameMode } from "@/assets/mode"


export function describeStat(data : any, fmt : string, isRespawn : boolean = false) {
    var rows = Object.keys(data).map((k) => {
        if(k != 'base' && k != 'total' && bigdec_equals(data[k].val, bd(100))) {
            return null
        }
        var sigFigs = (!_.isUndefined(data[k].sigFig)) ? data[k].sigFig : 0
        var percent = (!_.isUndefined(data[k].noPer) && data[k].noPer) ? '': '%'

        if(k == 'total') {
            let extra = ''
            if (isRespawn) {
                extra =  ' (' + pn(data[k].val.divide(bd(25)), fmt, 2) + ' seconds)';
            }
            return (
                <li key={k} className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className='text-red-500'>{pn(data[k].val, fmt, sigFigs)}{percent}</span>{extra}</li>
            )
        } else if (k == 'subtotal') {
            return (
                <li key={k} className="border-white border-t-2 border-solid">Subtotal: {pn(data[k].val, fmt, sigFigs)}</li>
            )
        }
        if (isRespawn) {
            if (k == 'base') {
                percent += ' - 4 seconds';
            }
        }
        
        
        return (
            <li key={k}>{data[k].name} ({pn(data[k].val, fmt, sigFigs)}{percent})</li>
        )
    })

    return (
        <ul className='ml-5'>
            {rows}
        </ul>
    )
}

export function getStatInfo(playerStates : any) {
    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }
    function j(key : string) : any{
        return parseObj(playerStates, key)
    }
    return {
        'energyPower' : {
            'base' : {
                'name' : "Base Energy Power",
                'val' : v('baseEnergyPower'),
                'sigFig' : 2,
                'noPer' : true,
            },
            'equip' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.ENERGY_POWER),
                'sigFig' : 2,
            },
            'macguffin' : {
                'name': 'x Macguffin ',
                'val' : macguffinInfo(playerStates, Stat.ENERGY_POWER),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(playerStates, Stat.ENERGY_POWER),
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(playerStates, Stat.ENERGY_POWER),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(playerStates, Stat.ENERGY_POWER),
            },
            'apitems' : {
                'name': 'x Potions ',
                'val' : apItemInfo(playerStates, Stat.ENERGY_POWER),
            },
            'total' : {
                'name': 'Total',
                'val' : totalEnergyPower(playerStates),
                'sigFig': 4,
                'noPer' : true,
            }
        },
        'energyBar' : {
            'base' : {
                'name' : "Base Energy Bars",
                'val' : v('baseEnergyBar'),
                'sigFig' : 2,
                'noPer' : true,
            },
            'equip' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.ENERGY_BARS),
                'sigFig' : 2,
            },
            'macguffin' : {
                'name': 'x Macguffin ',
                'val' : macguffinInfo(playerStates, Stat.ENERGY_BARS),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(playerStates, Stat.ENERGY_BARS),
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(playerStates, Stat.ENERGY_BARS),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(playerStates, Stat.ENERGY_BARS),
            },
            'apitems' : {
                'name': 'x Potions ',
                'val' : apItemInfo(playerStates, Stat.ENERGY_BARS),
            },
            'total' : {
                'name': 'Total',
                'val' : totalEnergyBar(playerStates),
                'sigFig': 4,
                'noPer' : true,
            }
        },
        'augments' : {
            'base' : {
                'name' : 'Base Augment Speed',
                'val' : bd(100),
            },
            'energyPower' : {
                'name' : 'x Energy Power',
                'val' : totalEnergyPower(playerStates).multiply(bd(100)),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.AUGMENT_SPEED),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.AUGMENT_SPEED),
                'sigFig' : 2,
            },
            'challenges' : {
                'name': 'x Challenges',
                'val' : challengeInfo(playerStates, Stat.AUGMENT_SPEED),
                'sigFig' : 2,
            },
            'hacks' : {
                'name': 'x Hacks',
                'val' : hackInfo(playerStates, Stat.AUGMENT_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.AUGMENT_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name' : 'x Perks (is not shown in game, but is applied)',
                'val' : perkInfo(playerStates, Stat.AUGMENT_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalAugmentSpeed(playerStates),
            }
        },
        'enguSpeed' : {
            'base' : {
                'name' : 'Base Energy NGU Speed',
                'val' : bd(100),
            },
            'energyPower' : {
                'name' : 'x Energy Power',
                'val' : totalEnergyPower(playerStates).multiply(bd(100)),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.ENERGY_NGU_SPEED),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.ENERGY_NGU_SPEED),
                'sigFig' : 2,
            },
            'Number' : {
                'name': 'x \'A Number\' Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.NUMBER) ? bd(110) : bd(100),
            },
            'NumbMetaer' : {
                'name': 'x Meta Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.META) ? bd(120) : bd(100),
            },
            'schoolSet' : {
                'name': 'x School Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.BACKTOSCHOOL) ? bd(115) : bd(100),
            },
            'magicNGU' : {
                'name': 'x Magic NGU',
                'val' : nguInfo(playerStates, Stat.ENERGY_NGU_SPEED),
            },
            'beard' : {
                'name': 'x Beard',
                'val' : beardInfoPerm(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100)).multiply(beardInfoTemp(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100))).multiply(bd(100)).round(),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.ENERGY_NGU_SPEED),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(),
            },
            'challenge' : {
                'name': 'x Challenge ',
                'val' : challengeInfo(playerStates, Stat.ENERGY_NGU_SPEED),
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(playerStates, ChallengeKeys.TROLL, GameMode.SADISTIC, 1) ? bd(300) : bd(100),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.ENERGY_NGU_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalEnergyNGUSpeedFactor(playerStates),
            },
        },
        'exp' : {
            'base' : {
                'name' : "Base Exp Gain",
                'val' : bd(100),
            },
            'heart' : {
                'name' : 'x Red Heart Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.RED_HEART) ? bd(110) : bd(100),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(playerStates, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.EXPERIENCE),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.EXPERIENCE),
            },
            'cooking' : {
                'name': 'x Cooking',
                'val' : cookingInfo(playerStates, Stat.EXPERIENCE).multiply(bd(100)),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalExpBonus(playerStates),
                'sigFig': 2,
            },
        },
        'ap' : {
            'base' : {
                'name': 'Base AP Gain ',
                'val' : bd(100),
            },
            'heart' : {
                'name': 'x Yellow Heart Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.YELLOW_HEART) ? bd(120) : bd(100),
            },
            'ngu' : {
                'name': 'x Achievements',
                'val' : achievementAPBonus(playerStates),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.AP),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalAPBonus(playerStates),
                'sigFig': 2,
            },
    
        },
        'pp' : {
            
            'base' : {
                'name': 'Base PP Gain ',
                'val' : bd(100),
            },
            'heart' : {
                'name': 'x Green Heart Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.GREEN_HEART) ? bd(120) : bd(100),
            },
            'podKey' : {
                'name': 'x Pissed Off Key Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.PISSED_OFF_KEY) ? bd(110) : bd(100),
            },
            'PPPL' : {
                'name': 'x PPP Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.PRETTY) ? bd(110) : bd(100),
            },
            'halloweenKey' : {
                'name': 'x Halloweenies Set Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.HALLOWEEN) ? bd(145) : bd(100),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(playerStates, Stat.PP),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.PP),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.PP),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.PP),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.PP),
                'sigFig': 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalPPBonus(playerStates),
                'sigFig': 2,
            },
                    
        },
        'daycare' : {
            'base' : {
                'name': 'Base Kitty Happiness ',
                'val' : bd(100),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.DAYCARE_SPEED),
                'sigFig' : 2,
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.DAYCARE_SPEED),
            },
            'challenges' : {
                'name': 'x Challenges',
                'val' : challengeInfo(playerStates, Stat.DAYCARE_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.DAYCARE_SPEED),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.DAYCARE_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.DAYCARE_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name': 'x Fibonnacci',
                'val' : perkInfo(playerStates, Stat.DAYCARE_SPEED),
            },
            'total' : {
                'name': 'Total',
                'val' : totalDaycareSpeed(playerStates),
                'sigFig': 2,
            },
        },
        'hack' : {
            'base' : {
                'name': 'Base Hack Speed ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.HACK_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.HACK_SPEED),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.HACK_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.HACK_SPEED),
                'sigFig': 2,
            },
            'heart' : {
                'name': 'x Grey Heart Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.GREY_HEART) ? bd(125) : bd(100),
            },
            'challenges' : {
                'name': 'x Evil No NGU Challenge',
                'val' : challengeInfo(playerStates, Stat.HACK_SPEED),
            },
            'trollChallenge' : {
                'name' : 'x Evil Troll Challenge',
                'val' : isCompletedChallenge(playerStates, ChallengeKeys.TROLL, GameMode.EVIL, 5) ? bd(125) : bd(100),
            },
            'total' : {
                'name': 'Total',
                'val' : totalHackSpeed(playerStates),
                'sigFig': 2,
            },
        },
        'wish' : {
            'base' : {
                'name': 'Base Wish Speed ',
                'val' : bd(100),
            },
            'wish' : {
                'name': 'x Wish Modifier',
                'val' : wishInfo(playerStates, Stat.WISH_SPEED),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.WISH_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.WISH_SPEED).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.WISH_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.WISH_SPEED).round(),
            },
            'head' : {
                'name': 'x Severed Head Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.SEVERED_HEAD) ? bd(113.37) : bd(100),
            },
            'fasterWish' : {
                'name' : 'x Faster Wish (AP item)',
                'val' : apItemInfo(playerStates, Stat.WISH_SPEED)
            },
            'typo' : {
                'name': 'x Typo Set Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.SEVERED_HEAD) ? bd(120) : bd(100),
            },
            'total' : {
                'name': 'Total',
                'val' : totalWishSpeed(playerStates),
                'sigFig': 2,
            },
        },
        'advPower' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Power ',
                'val' : v('baseAdventurePower'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Power + Infinity Cube',
                'val' : equipmentWithCubeInfo(playerStates, Stat.POWER),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : v('baseAdventurePower').add(equipmentWithCubeInfo(playerStates, Stat.POWER)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(playerStates, Stat.POWER),
            },
            'engu' : {
                'name': 'x (Energy x Magic) NGU',
                'val' : nguInfo(playerStates, Stat.POWER),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.POWER),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(playerStates, Stat.POWER),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.POWER)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.POWER)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.POWER).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(playerStates, Stat.POWER).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.POWER).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.POWER),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.POWER).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.POWER),
                'sigFig': 2,
            },
            'beastMode' : {
                'name': 'x Beast Mode',
                'val' :  (isOne(v('beastMode')) ? ( (isMaxxedItemSet(playerStates, ItemSets.MYSTERIOUS_PURPLE_LIQUID)) ? bd(150) : bd(140)) : bd(100)),
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(playerStates, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalPower(playerStates),
            },
        },
        'advToughness' : { // Will need altering    
            'base' : {
                'name': 'Base Adventure Toughness ',
                'val' : v('baseAdventureToughness'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Toughness + Infinity Cube',
                'val' : equipmentWithCubeInfo(playerStates, Stat.TOUGHNESS),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : v('baseAdventureToughness').add(equipmentWithCubeInfo(playerStates, Stat.TOUGHNESS)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(playerStates, Stat.TOUGHNESS),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(playerStates, Stat.TOUGHNESS),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.TOUGHNESS),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(playerStates, Stat.TOUGHNESS),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.TOUGHNESS)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.TOUGHNESS)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.TOUGHNESS).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(playerStates, Stat.TOUGHNESS).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.TOUGHNESS).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.TOUGHNESS),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.TOUGHNESS).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.TOUGHNESS),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(playerStates, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalToughness(playerStates),
            },
        },
        'advHealth' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Health ',
                'val' : v('baseAdventureHealth'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Health + Infinity Cube',
                'val' : equipmentWithCubeInfo(playerStates, Stat.HEALTH),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : v('baseAdventureHealth').add(equipmentWithCubeInfo(playerStates, Stat.HEALTH)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(playerStates, Stat.HEALTH),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(playerStates, Stat.HEALTH),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.HEALTH),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(playerStates, Stat.HEALTH),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.HEALTH)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.HEALTH)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.HEALTH).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(playerStates, Stat.HEALTH).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.HEALTH).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.HEALTH),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.HEALTH).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.HEALTH),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(playerStates, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalHealth(playerStates),
            },
        },
        'advRegen' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Regen ',
                'val' : v('baseAdventureRegen'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Regen + Infinity Cube',
                'val' : equipmentWithCubeInfo(playerStates, Stat.REGEN),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : v('baseAdventureRegen').add(equipmentWithCubeInfo(playerStates, Stat.REGEN)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(playerStates, Stat.REGEN),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(playerStates, Stat.REGEN),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.REGEN),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(playerStates, Stat.REGEN),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.REGEN)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.REGEN)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.REGEN).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(playerStates, Stat.REGEN).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.REGEN).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(playerStates, Stat.REGEN),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.REGEN).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.REGEN),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(playerStates, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalRegen(playerStates),
            },
        },
        'gold' : {
            'base' : {
                'name': 'Base Gold Drop ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.GOLD_DROP),
                'sigFig' : 3,
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(playerStates, Stat.GOLD_DROP),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.GOLD_DROP),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(playerStates, Stat.GOLD_DROP),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.GOLD_DROP),
                'sigFig': 2,
            },
            'challenge' : {
                'name' : 'x No TM Challenge',
                'val' : challengeInfo(playerStates, Stat.GOLD_DROP),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalGoldDrop(playerStates),
            },
        },
        'respawn' : { // Will need altering
            'base' : {
                'name': 'Base Respawn Rate ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : bd(200).subtract(equipmentWithCubeInfo(playerStates, Stat.RESPAWN)).round(),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(playerStates, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'Number' : {
                'name': 'x Clock Set Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.CLOCK) ? bd(95) : bd(100),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(playerStates, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalRespawnRate(playerStates),
                'sigFig': 2,
            },
        },
        'dropChance' : {
            'base' : {
                'name': 'Base Drop Chance Rate ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.DROP_CHANCE),
            },
            'macguffin' : {
                'name': 'x MacGuffin',
                'val' : macguffinInfo(playerStates, Stat.DROP_CHANCE),
                'sigFig' : 2,
            },
            '2d' : {
                'name' : 'x 2D Set Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.TWO_D) ? bd(107.43) : bd(100),
                'sigFigs' : 2,
            },
            'blood' : {
                'name': 'x Blood Magic',
                'val' : v('bloodMagicDropChance').add(bd(100)),
            },
            'Yggdrasil' : {
                'name': 'x Yggdrasil Fruit',
                'val' : v('yggdrasilDropChance'),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(playerStates, Stat.DROP_CHANCE),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(playerStates, Stat.DROP_CHANCE),
                'sigFig' : 2,
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.DROP_CHANCE)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.DROP_CHANCE)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.DROP_CHANCE),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.DROP_CHANCE),
            },
            'acc' : {
                'name': 'x Normal Bonus Acc Set Bonus',
                'val' : isMaxxedItemSet(playerStates, ItemSets.NORMAL_ACC) ? bd(125) : bd(100),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.DROP_CHANCE),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalDropChance(playerStates),
            },
        },
        'eBeards' : {
            'base' : {
                'name' : 'Base Energy Beard Speed',
                'val' : bd(100),
            },
            'eBar' : {
                'name' : 'x Energy Bar',
                'val' : totalEnergyBar(playerStates).floor().multiply(bd(100)),
            },
            'ePower' : {
                'name' : 'x Energy Power',
                'val' : bd(Math.sqrt(toNum(totalEnergyPower(playerStates)))).multiply(bd(100)),
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.ENERGY_BEARD_SPEED),
            },
            'setBonus' : {
                'name' : 'x (UUG) Armpit Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.UUG) ? bd(110) : bd(100),
            },
            'countDiv' : {
                'name' : '/ Count Divider',
                'val' : bigdec_max(activeBeards(playerStates, 'energy').multiply(isMaxxedItemSet(playerStates, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1)), bd(1)),
                'sigFig' : 1,
                'noPer' : true,
            },
            'total' : {
                'val' : totalEnergyBeardSpeed(playerStates),
            }
        },
        'eWandoos' : {
            'base' : {
                'name' : 'Base Wandoos Energy Speed',
                'val' : bd(100),
            },
            'macguffin' : {
                'name': 'x MacGuffin',
                'val' : macguffinInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
                'sigFig' : 2,
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
            },
            'osLevel' : {
                'name' : 'x OS Level',
                'val' : (wandoosOSLevel(playerStates).add(bd(1))).multiply(bd(4)),
            },
            'bootup' : {
                'name' : 'x Bootup',
                'val' : isMaxxedItemSet(playerStates, ItemSets.WANDOOS) ? bd(110) : bd(100)
            },
            'at' : {
                'name' : 'x Advanced Training',
                'val' : advTrainingInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
            },
            'ngu' : {
                'name' : 'x NGU',
                'val' : nguInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
            },
            'challenges': {
                'name' : 'x Challenges',
                'val' : challengeInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(playerStates, Stat.ENERGY_WANDOOS_SPEED)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(playerStates, Stat.ENERGY_WANDOOS_SPEED)
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.ENERGY_WANDOOS_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalEnergyWandoosSpeed(playerStates),
            }
        },
        'questRewards': {
            'base' : {
                'name' : "Base Quest Rewards",
                'val' : bd(100),
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(playerStates, Stat.QUEST_REWARD),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(playerStates, Stat.QUEST_REWARD),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(playerStates, Stat.QUEST_REWARD),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(playerStates, Stat.QUEST_REWARD),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(playerStates, Stat.QUEST_REWARD),
                'sigFig': 2,
            },
            'questSet' : {
                'name': 'x Quest Sets',
                'val' : bd(1.02 ** maxxedItemSetNum(playerStates, ItemSets.QUESTS) * 100),
            },
            'mobster' : {
                'name': 'x Mobster Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.MOBSTER) ? bd(115) : bd(100),
            },
            'orangeHeart' : {
                'name': 'x Orange Heart',
                'val' : isMaxxedItemSet(playerStates, ItemSets.ORANGE_HEART) ? bd(120) : bd(100)
            },
            'total' : {
                'val' : totalQuestRewardBonus(playerStates),
            }
        },
        'mayoSpeed' : {
            'base' : {
                'name' : "Base Mayo Speed",
                'val' : bd(100),
            },
            'generators': {
                'name' : 'x Generators',
                'val' : ((totalMayoGeneration(playerStates).subtract(bd(1))).multiply(bd(2))).add(bd(100)),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(playerStates, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(playerStates, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(playerStates, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(playerStates, ChallengeKeys.TROLL, GameMode.SADISTIC, 6) ? bd(110) : bd(100),
            },
            'rainbowHeart' : {
                'name': 'x Rainbow Heart',
                'val' : isMaxxedItemSet(playerStates, ItemSets.RAINBOW_HEART) ? bd(110) : bd(100)
            },
            'duck' : {
                'name': 'x Duck Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.DUCK) ? bd(106) : bd(100),
            },
            'total' : {
                'val' : totalMayoSpeed(playerStates),
                'sigFig': 2,
            }
        },
        'cardSpeed' : {
            'base' : {
                'name' : "Base Card Speed",
                'val' : bd(100),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(playerStates, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(playerStates, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(playerStates, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(playerStates, ChallengeKeys.TROLL, GameMode.SADISTIC, 5) ? bd(110) : bd(100),
            },
            'rainbowHeart' : {
                'name': 'x Rainbow Heart',
                'val' : isMaxxedItemSet(playerStates, ItemSets.RAINBOW_HEART) ? bd(110) : bd(100)
            },
            'duck' : {
                'name': 'x Duck Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.DUCK) ? bd(106) : bd(100),
            },
            'total' : {
                'val' : totalCardSpeed(playerStates),
                'sigFig': 2,
            }
        },
        'tagEffect' : {
            'base' : {
                'name' : "Base Tag Effect",
                'val' : bd(10),
            },
            'perk' : {
                'name': '+ Perk ',
                'val' : perkInfo(playerStates, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'quirk' : {
                'name': '+ Quirk ',
                'val' : quirkInfo(playerStates, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'wish' : {
                'name': '+ Wish ',
                'val' : wishInfo(playerStates, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'beatingHeart' : {
                'name': '+ Beating Heart Set',
                'val' : isMaxxedItemSet(playerStates, ItemSets.BEATING_HEART) ? bd(1) : bd(0),
            },
            'total' : {
                'val' : totalTagEffect(playerStates),
                'sigFig': 3,
            }
        },
    }
}