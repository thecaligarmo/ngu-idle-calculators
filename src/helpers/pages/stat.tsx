import _ from "lodash"
import { ChallengeKeys } from "@/assets/challenges"
import { GameMode } from "@/assets/mode"
import Player from "@/assets/player"
import { ItemSets } from "@/assets/sets"
import { Stat } from "@/assets/stat"
import { totalAPBonus, totalAugmentSpeed, totalCardSpeed, totalDaycareSpeed, totalDropChance, totalEnergyBar, totalEnergyBeardSpeed, totalEnergyNGUSpeedFactor, totalEnergyPower, totalEnergyWandoosSpeed, totalExpBonus, totalGoldDrop, totalHackSpeed, totalHealth, totalMayoGeneration, totalMayoSpeed, totalPower, totalPPBonus, totalQuestRewardBonus, totalRegen, totalRespawnRate, totalTagEffect, totalToughness, totalWishSpeed } from "../calculators"
import { bd, bigdec_equals, bigdec_max, pn, toNum } from "../numbers"
import { achievementAPBonus, activeBeards, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, cardInfo, challengeInfo, cookingInfo, diggerInfo, equipmentWithCubeInfo, hackInfo, isCompletedChallenge, isMaxxedItemSet, macguffinInfo, maxxedItemSetNum, nguInfo, perkInfo, quirkInfo, wandoosOSLevel, wishInfo } from "../resourceInfo"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function describeStat(data : any, fmt : string, isRespawn : boolean = false) {
    const rows = Object.keys(data).map((k) => {
        if(k != 'base' && k != 'total' && bigdec_equals(data[k].val, bd(100))) {
            return null
        }
        const sigFigs = (!_.isUndefined(data[k].sigFig)) ? data[k].sigFig : 0
        let percent = (!_.isUndefined(data[k].noPer) && data[k].noPer) ? '': '%'

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

export function getStatInfo(player : Player) {

    return {
        'energyPower' : {
            'base' : {
                'name' : "Base Energy Power",
                'val' : player.get('baseEnergyPower'),
                'sigFig' : 2,
                'noPer' : true,
            },
            'equip' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.ENERGY_POWER),
                'sigFig' : 2,
            },
            'macguffin' : {
                'name': 'x Macguffin ',
                'val' : macguffinInfo(player, Stat.ENERGY_POWER),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(player, Stat.ENERGY_POWER),
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(player, Stat.ENERGY_POWER),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(player, Stat.ENERGY_POWER),
            },
            'apitems' : {
                'name': 'x Potions ',
                'val' : apItemInfo(player, Stat.ENERGY_POWER),
            },
            'total' : {
                'name': 'Total',
                'val' : totalEnergyPower(player),
                'sigFig': 4,
                'noPer' : true,
            }
        },
        'energyBar' : {
            'base' : {
                'name' : "Base Energy Bars",
                'val' : player.get('baseEnergyBar'),
                'sigFig' : 2,
                'noPer' : true,
            },
            'equip' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.ENERGY_BARS),
                'sigFig' : 2,
            },
            'macguffin' : {
                'name': 'x Macguffin ',
                'val' : macguffinInfo(player, Stat.ENERGY_BARS),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(player, Stat.ENERGY_BARS),
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(player, Stat.ENERGY_BARS),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(player, Stat.ENERGY_BARS),
            },
            'apitems' : {
                'name': 'x Potions ',
                'val' : apItemInfo(player, Stat.ENERGY_BARS),
            },
            'total' : {
                'name': 'Total',
                'val' : totalEnergyBar(player),
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
                'val' : totalEnergyPower(player).multiply(bd(100)),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.AUGMENT_SPEED),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.AUGMENT_SPEED),
                'sigFig' : 2,
            },
            'challenges' : {
                'name': 'x Challenges',
                'val' : challengeInfo(player, Stat.AUGMENT_SPEED),
                'sigFig' : 2,
            },
            'hacks' : {
                'name': 'x Hacks',
                'val' : hackInfo(player, Stat.AUGMENT_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.AUGMENT_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name' : 'x Perks (is not shown in game, but is applied)',
                'val' : perkInfo(player, Stat.AUGMENT_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalAugmentSpeed(player),
            }
        },
        'enguSpeed' : {
            'base' : {
                'name' : 'Base Energy NGU Speed',
                'val' : bd(100),
            },
            'energyPower' : {
                'name' : 'x Energy Power',
                'val' : totalEnergyPower(player).multiply(bd(100)),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.ENERGY_NGU_SPEED),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.ENERGY_NGU_SPEED),
                'sigFig' : 2,
            },
            'Number' : {
                'name': 'x \'A Number\' Set',
                'val' : isMaxxedItemSet(player, ItemSets.NUMBER) ? bd(110) : bd(100),
            },
            'NumbMetaer' : {
                'name': 'x Meta Set',
                'val' : isMaxxedItemSet(player, ItemSets.META) ? bd(120) : bd(100),
            },
            'schoolSet' : {
                'name': 'x School Set',
                'val' : isMaxxedItemSet(player, ItemSets.BACKTOSCHOOL) ? bd(115) : bd(100),
            },
            'magicNGU' : {
                'name': 'x Magic NGU',
                'val' : nguInfo(player, Stat.ENERGY_NGU_SPEED),
            },
            'beard' : {
                'name': 'x Beard',
                'val' : beardInfoPerm(player, Stat.ENERGY_NGU_SPEED).divide(bd(100)).multiply(beardInfoTemp(player, Stat.ENERGY_NGU_SPEED).divide(bd(100))).multiply(bd(100)).round(),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.ENERGY_NGU_SPEED),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.ENERGY_NGU_SPEED).round(),
            },
            'challenge' : {
                'name': 'x Challenge ',
                'val' : challengeInfo(player, Stat.ENERGY_NGU_SPEED),
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 1) ? bd(300) : bd(100),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.ENERGY_NGU_SPEED).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.ENERGY_NGU_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalEnergyNGUSpeedFactor(player),
            },
        },
        'exp' : {
            'base' : {
                'name' : "Base Exp Gain",
                'val' : bd(100),
            },
            'heart' : {
                'name' : 'x Red Heart Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.RED_HEART) ? bd(110) : bd(100),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(player, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.EXPERIENCE),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.EXPERIENCE),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.EXPERIENCE),
            },
            'cooking' : {
                'name': 'x Cooking',
                'val' : cookingInfo(player, Stat.EXPERIENCE).multiply(bd(100)),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalExpBonus(player),
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
                'val' : isMaxxedItemSet(player, ItemSets.YELLOW_HEART) ? bd(120) : bd(100),
            },
            'ngu' : {
                'name': 'x Achievements',
                'val' : achievementAPBonus(player),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.AP),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalAPBonus(player),
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
                'val' : isMaxxedItemSet(player, ItemSets.GREEN_HEART) ? bd(120) : bd(100),
            },
            'podKey' : {
                'name': 'x Pissed Off Key Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.PISSED_OFF_KEY) ? bd(110) : bd(100),
            },
            'PPPL' : {
                'name': 'x PPP Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.PRETTY) ? bd(110) : bd(100),
            },
            'halloweenKey' : {
                'name': 'x Halloweenies Set Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.HALLOWEEN) ? bd(145) : bd(100),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(player, Stat.PP),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.PP),
                'sigFig' : 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.PP),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.PP),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.PP),
                'sigFig': 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalPPBonus(player),
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
                'val' : diggerInfo(player, Stat.DAYCARE_SPEED),
                'sigFig' : 2,
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.DAYCARE_SPEED),
            },
            'challenges' : {
                'name': 'x Challenges',
                'val' : challengeInfo(player, Stat.DAYCARE_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.DAYCARE_SPEED),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.DAYCARE_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.DAYCARE_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name': 'x Fibonnacci',
                'val' : perkInfo(player, Stat.DAYCARE_SPEED),
            },
            'total' : {
                'name': 'Total',
                'val' : totalDaycareSpeed(player),
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
                'val' : equipmentWithCubeInfo(player, Stat.HACK_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.HACK_SPEED),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.HACK_SPEED),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.HACK_SPEED),
                'sigFig': 2,
            },
            'heart' : {
                'name': 'x Grey Heart Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.GREY_HEART) ? bd(125) : bd(100),
            },
            'challenges' : {
                'name': 'x Evil No NGU Challenge',
                'val' : challengeInfo(player, Stat.HACK_SPEED),
            },
            'trollChallenge' : {
                'name' : 'x Evil Troll Challenge',
                'val' : isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.EVIL, 5) ? bd(125) : bd(100),
            },
            'total' : {
                'name': 'Total',
                'val' : totalHackSpeed(player),
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
                'val' : wishInfo(player, Stat.WISH_SPEED),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.WISH_SPEED),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.WISH_SPEED).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.WISH_SPEED),
                'sigFig': 2,
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.WISH_SPEED).round(),
            },
            'head' : {
                'name': 'x Severed Head Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.SEVERED_HEAD) ? bd(113.37) : bd(100),
            },
            'fasterWish' : {
                'name' : 'x Faster Wish (AP item)',
                'val' : apItemInfo(player, Stat.WISH_SPEED)
            },
            'typo' : {
                'name': 'x Typo Set Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.SEVERED_HEAD) ? bd(120) : bd(100),
            },
            'total' : {
                'name': 'Total',
                'val' : totalWishSpeed(player),
                'sigFig': 2,
            },
        },
        'advPower' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Power ',
                'val' : player.get('baseAdventurePower'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Power + Infinity Cube',
                'val' : equipmentWithCubeInfo(player, Stat.POWER),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : player.get('baseAdventurePower').add(equipmentWithCubeInfo(player, Stat.POWER)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(player, Stat.POWER),
            },
            'engu' : {
                'name': 'x (Energy x Magic) NGU',
                'val' : nguInfo(player, Stat.POWER),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.POWER),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(player, Stat.POWER),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.POWER)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.POWER)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.POWER).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(player, Stat.POWER).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.POWER).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.POWER),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.POWER).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.POWER),
                'sigFig': 2,
            },
            'beastMode' : {
                'name': 'x Beast Mode',
                'val' :  (player.get('beastMode') ? ( (isMaxxedItemSet(player, ItemSets.MYSTERIOUS_PURPLE_LIQUID)) ? bd(150) : bd(140)) : bd(100)),
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(player, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalPower(player),
            },
        },
        'advToughness' : { // Will need altering    
            'base' : {
                'name': 'Base Adventure Toughness ',
                'val' : player.get('baseAdventureToughness'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Toughness + Infinity Cube',
                'val' : equipmentWithCubeInfo(player, Stat.TOUGHNESS),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : player.get('baseAdventureToughness').add(equipmentWithCubeInfo(player, Stat.TOUGHNESS)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(player, Stat.TOUGHNESS),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(player, Stat.TOUGHNESS),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.TOUGHNESS),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(player, Stat.TOUGHNESS),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.TOUGHNESS)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.TOUGHNESS)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.TOUGHNESS).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(player, Stat.TOUGHNESS).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.TOUGHNESS).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.TOUGHNESS),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.TOUGHNESS).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.TOUGHNESS),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(player, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalToughness(player),
            },
        },
        'advHealth' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Health ',
                'val' : player.get('baseAdventureHealth'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Health + Infinity Cube',
                'val' : equipmentWithCubeInfo(player, Stat.HEALTH),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : player.get('baseAdventureHealth').add(equipmentWithCubeInfo(player, Stat.HEALTH)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(player, Stat.HEALTH),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(player, Stat.HEALTH),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.HEALTH),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(player, Stat.HEALTH),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.HEALTH)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.HEALTH)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.HEALTH).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(player, Stat.HEALTH).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.HEALTH).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.HEALTH),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.HEALTH).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.HEALTH),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(player, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalHealth(player),
            },
        },
        'advRegen' : { // Will need altering
            'base' : {
                'name': 'Base Adventure Regen ',
                'val' : player.get('baseAdventureRegen'),
                'noPer' : true,
            },
            'equipment' : {
                'name': '+ Equipment Regen + Infinity Cube',
                'val' : equipmentWithCubeInfo(player, Stat.REGEN),
                'noPer' : true,
            },
            'subtotal' : {
                'val' : player.get('baseAdventureRegen').add(equipmentWithCubeInfo(player, Stat.REGEN)),
            },
            'at' : {
                'name': 'x Advanced Training',
                'val' : advTrainingInfo(player, Stat.REGEN),
            },
            'engu' : {
                'name' : 'x (Energy x Magic) NGU',
                'val' : nguInfo(player, Stat.REGEN),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.REGEN),
            },
            'basicChallenge' : {
                'name': 'x Basic Challenge',
                'val' : challengeInfo(player, Stat.REGEN),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.REGEN)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.REGEN)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.REGEN).round(),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(player, Stat.REGEN).round(),
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.REGEN).round(),
            },
            'macguffin' : {
                'name': 'x Macguffin',
                'val' : macguffinInfo(player, Stat.REGEN),
                'sigFig' : 2,
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.REGEN).round(),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.REGEN),
                'sigFig': 2,
            },
            'acc' : {
                'name': 'x Evil Accs Set Bonus',
                'val' :  (isMaxxedItemSet(player, ItemSets.EVIL_ACC)) ? bd(120) : bd(100),
            },
            'total' : {
                'val' : totalRegen(player),
            },
        },
        'gold' : {
            'base' : {
                'name': 'Base Gold Drop ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.GOLD_DROP),
                'sigFig' : 3,
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(player, Stat.GOLD_DROP),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.GOLD_DROP),
            },
            'quirk' : {
                'name': 'x Quirk',
                'val' : quirkInfo(player, Stat.GOLD_DROP),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.GOLD_DROP),
                'sigFig': 2,
            },
            'challenge' : {
                'name' : 'x No TM Challenge',
                'val' : challengeInfo(player, Stat.GOLD_DROP),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalGoldDrop(player),
            },
        },
        'respawn' : { // Will need altering
            'base' : {
                'name': 'Base Respawn Rate ',
                'val' : bd(100),
            },
            'equipment' : {
                'name': 'x Equipment',
                'val' : bd(200).subtract(equipmentWithCubeInfo(player, Stat.RESPAWN)).round(),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(player, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'Number' : {
                'name': 'x Clock Set Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.CLOCK) ? bd(95) : bd(100),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'wish' : {
                'name': 'x Wish',
                'val' : wishInfo(player, Stat.RESPAWN),
                'sigFig' : 2,
            },
            'total' : {
                'name': 'Total',
                'val' : totalRespawnRate(player),
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
                'val' : equipmentWithCubeInfo(player, Stat.DROP_CHANCE),
            },
            'macguffin' : {
                'name': 'x MacGuffin',
                'val' : macguffinInfo(player, Stat.DROP_CHANCE),
                'sigFig' : 2,
            },
            '2d' : {
                'name' : 'x 2D Set Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.TWO_D) ? bd(107.43) : bd(100),
                'sigFigs' : 2,
            },
            'blood' : {
                'name': 'x Blood Magic',
                'val' : player.get('bloodMagicDropChance').add(bd(100)),
            },
            'Yggdrasil' : {
                'name': 'x Yggdrasil Fruit',
                'val' : player.get('yggdrasilDropChance'),
            },
            'ngu' : {
                'name': 'x NGU',
                'val' : nguInfo(player, Stat.DROP_CHANCE),
            },
            'digger' : {
                'name': 'x Digger',
                'val' : diggerInfo(player, Stat.DROP_CHANCE),
                'sigFig' : 2,
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.DROP_CHANCE)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.DROP_CHANCE)
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.DROP_CHANCE),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.DROP_CHANCE),
            },
            'acc' : {
                'name': 'x Normal Bonus Acc Set Bonus',
                'val' : isMaxxedItemSet(player, ItemSets.NORMAL_ACC) ? bd(125) : bd(100),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.DROP_CHANCE),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalDropChance(player),
            },
        },
        'eBeards' : {
            'base' : {
                'name' : 'Base Energy Beard Speed',
                'val' : bd(100),
            },
            'eBar' : {
                'name' : 'x Energy Bar',
                'val' : totalEnergyBar(player).floor().multiply(bd(100)),
            },
            'ePower' : {
                'name' : 'x Energy Power',
                'val' : bd(Math.sqrt(toNum(totalEnergyPower(player)))).multiply(bd(100)),
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.ENERGY_BEARD_SPEED),
            },
            'setBonus' : {
                'name' : 'x (UUG) Armpit Set',
                'val' : isMaxxedItemSet(player, ItemSets.UUG) ? bd(110) : bd(100),
            },
            'countDiv' : {
                'name' : '/ Count Divider',
                'val' : bigdec_max(activeBeards(player, 'energy').multiply(isMaxxedItemSet(player, ItemSets.BEARDVERSE) ? bd(0.9) : bd(1)), bd(1)),
                'sigFig' : 1,
                'noPer' : true,
            },
            'total' : {
                'val' : totalEnergyBeardSpeed(player),
            }
        },
        'eWandoos' : {
            'base' : {
                'name' : 'Base Wandoos Energy Speed',
                'val' : bd(100),
            },
            'macguffin' : {
                'name': 'x MacGuffin',
                'val' : macguffinInfo(player, Stat.ENERGY_WANDOOS_SPEED),
                'sigFig' : 2,
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.ENERGY_WANDOOS_SPEED),
            },
            'osLevel' : {
                'name' : 'x OS Level',
                'val' : (wandoosOSLevel(player).add(bd(1))).multiply(bd(4)),
            },
            'bootup' : {
                'name' : 'x Bootup',
                'val' : isMaxxedItemSet(player, ItemSets.WANDOOS) ? bd(110) : bd(100)
            },
            'at' : {
                'name' : 'x Advanced Training',
                'val' : advTrainingInfo(player, Stat.ENERGY_WANDOOS_SPEED),
            },
            'ngu' : {
                'name' : 'x NGU',
                'val' : nguInfo(player, Stat.ENERGY_WANDOOS_SPEED),
            },
            'challenges': {
                'name' : 'x Challenges',
                'val' : challengeInfo(player, Stat.ENERGY_WANDOOS_SPEED),
            },
            'beardTemp' : {
                'name' : 'x Beard (this run)',
                'val' : beardInfoTemp(player, Stat.ENERGY_WANDOOS_SPEED)
            },
            'beardPerm' : {
                'name' : 'x Beard (permanent)',
                'val' : beardInfoPerm(player, Stat.ENERGY_WANDOOS_SPEED)
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.ENERGY_WANDOOS_SPEED),
                'sigFig': 2,
            },
            'total' : {
                'val' : totalEnergyWandoosSpeed(player),
            }
        },
        'questRewards': {
            'base' : {
                'name' : "Base Quest Rewards",
                'val' : bd(100),
            },
            'equipment' : {
                'name' : 'x Equipment',
                'val' : equipmentWithCubeInfo(player, Stat.QUEST_REWARD),
            },
            'perk' : {
                'name': 'x Perk',
                'val' : perkInfo(player, Stat.QUEST_REWARD),
            },
            'hack' : {
                'name': 'x Hack',
                'val' : hackInfo(player, Stat.QUEST_REWARD),
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(player, Stat.QUEST_REWARD),
            },
            'card' : {
                'name' : 'x Cards',
                'val' : cardInfo(player, Stat.QUEST_REWARD),
                'sigFig': 2,
            },
            'questSet' : {
                'name': 'x Quest Sets',
                'val' : bd(1.02 ** maxxedItemSetNum(player, ItemSets.QUESTS) * 100),
            },
            'mobster' : {
                'name': 'x Mobster Set',
                'val' : isMaxxedItemSet(player, ItemSets.MOBSTER) ? bd(115) : bd(100),
            },
            'orangeHeart' : {
                'name': 'x Orange Heart',
                'val' : isMaxxedItemSet(player, ItemSets.ORANGE_HEART) ? bd(120) : bd(100)
            },
            'total' : {
                'val' : totalQuestRewardBonus(player),
            }
        },
        'mayoSpeed' : {
            'base' : {
                'name' : "Base Mayo Speed",
                'val' : bd(100),
            },
            'generators': {
                'name' : 'x Generators',
                'val' : ((totalMayoGeneration(player).subtract(bd(1))).multiply(bd(2))).add(bd(100)),
            },
            'perk' : {
                'name': 'x Perk ',
                'val' : perkInfo(player, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(player, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(player, Stat.MAYO_SPEED),
                'sigFig': 2,
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 6) ? bd(110) : bd(100),
            },
            'rainbowHeart' : {
                'name': 'x Rainbow Heart',
                'val' : isMaxxedItemSet(player, ItemSets.RAINBOW_HEART) ? bd(110) : bd(100)
            },
            'duck' : {
                'name': 'x Duck Set',
                'val' : isMaxxedItemSet(player, ItemSets.DUCK) ? bd(106) : bd(100),
            },
            'total' : {
                'val' : totalMayoSpeed(player),
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
                'val' : perkInfo(player, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'quirk' : {
                'name': 'x Quirk ',
                'val' : quirkInfo(player, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'wish' : {
                'name': 'x Wish ',
                'val' : wishInfo(player, Stat.CARD_SPEED),
                'sigFig': 2,
            },
            'trollChallenge' : {
                'name' : 'x Sad Troll Challenge',
                'val' : isCompletedChallenge(player, ChallengeKeys.TROLL, GameMode.SADISTIC, 5) ? bd(110) : bd(100),
            },
            'rainbowHeart' : {
                'name': 'x Rainbow Heart',
                'val' : isMaxxedItemSet(player, ItemSets.RAINBOW_HEART) ? bd(110) : bd(100)
            },
            'duck' : {
                'name': 'x Duck Set',
                'val' : isMaxxedItemSet(player, ItemSets.DUCK) ? bd(106) : bd(100),
            },
            'total' : {
                'val' : totalCardSpeed(player),
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
                'val' : perkInfo(player, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'quirk' : {
                'name': '+ Quirk ',
                'val' : quirkInfo(player, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'wish' : {
                'name': '+ Wish ',
                'val' : wishInfo(player, Stat.TAG_EFFECT).subtract(bd(100)),
                'sigFig': 3,
            },
            'beatingHeart' : {
                'name': '+ Beating Heart Set',
                'val' : isMaxxedItemSet(player, ItemSets.BEATING_HEART) ? bd(1) : bd(0),
            },
            'total' : {
                'val' : totalTagEffect(player),
                'sigFig': 3,
            }
        },
    }
}