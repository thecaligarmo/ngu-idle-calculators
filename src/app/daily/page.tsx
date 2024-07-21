'use client'

import { Titans } from "@/assets/enemy";
import { GameMode } from "@/assets/mode";
import { ENERGY_NGUS, MAGIC_NGUS, NGU } from "@/assets/ngus";
import { ItemSets } from "@/assets/sets";
import { Stat } from "@/assets/stat";
import { FruitOfRage, FRUITS, Yggdrasil } from "@/assets/yggdrasil";
import { Zones } from "@/assets/zones";
import { ChoiceButton } from "@/components/buttons";
import Content from "@/components/content";
import ContentSubsection from "@/components/contentSubsection";
import { getNumberFormat } from "@/components/context";
import { disableItem } from "@/components/dataListColumns";
import { bd, dn, pn} from "@/helpers/numbers";
import { parseNum, parseObj } from "@/helpers/parsers";
import { isMaxxedItem, isMaxxedItemSet, nguInfo } from "@/helpers/resourceInfo";
import { createStatesForData, getRequiredStates } from "@/helpers/stateForData";
import bigDecimal from "js-big-decimal";
import { useState } from "react";




export default function Page() {
    var fmt = getNumberFormat();

    // Set data required (from playerData)
    var infoRequired = [
        ['gameMode'], [],
        ['totalRespawnTime', 'totalPPBonus%', 'totalPower'], [ 'blueHeart^', 'redLiquidBonus^','spoopySetBonus^']
    ]

    // Set extra required (not from playerData)
    var extraRequired = [['itopodFloor', 'bluePill^', 'hoursPerDay']]
    const playerStates = createStatesForData(extraRequired);

    // Get required data
    var infoReq = getRequiredStates(infoRequired, playerStates)
    var extraReq = getRequiredStates(extraRequired, playerStates)

    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }

    function c(key : string) : boolean {
        return v(key).compareTo(bd(1)) == 0
    }

    function j(key : string) : any{
        return parseObj(playerStates, key)
    }
    

    var hoursPerDay = v('hoursPerDay').compareTo(bd(0)) == 0 ? bd(24) : v('hoursPerDay')
    


    /* ITOPOD */
    var itopodFloor = 0
    if (v('itopodFloor').compareTo(bd(0)) == 0) {
        var sadisticNEC = bd(0)
        var idleAttackModifier = (v('spoopySetBonus^').multiply(bd(0.3)).add(bd(1.2))).multiply(
            bd(1).add(sadisticNEC)
        )
        
        // optimal
        itopodFloor = Math.max(0, Math.floor(Math.log(Number(v('totalPower').divide(bd(765)).multiply(idleAttackModifier).getValue())) / Math.log(1.05)))
    } else {
        itopodFloor = Number(v('itopodFloor').getValue())
    }
    var itopodZone = Zones.ITOPOD;
    itopodZone.setLevel(itopodFloor)

    var bluePillMultiplier = c('bluePill^')
                                ? (c('blueHeart^') ? bd(2.2) : bd(2))
                                : bd(1)

    var floorAdd = 200
    if(v('gameMode').compareTo(bd(GameMode.EVIL)) == 0) {
        floorAdd = 700
    } else if(v('gameMode').compareTo(bd(GameMode.SADISTIC)) == 0) {
        floorAdd = 2000
    }

    var pppPerKill = v('totalPPBonus%')
                        .divide(bd(100))
                        .multiply(bluePillMultiplier)
                        .multiply(bd(itopodFloor + floorAdd))
                        .floor()

    // PPP Per Day
    // TODO - Still need to add Sadistic "bonus pp"
    // PP Bonus -> stats
    // * 
    // little Blue Pills = 2 (with blue heart = 2.2) else 1
    // *
    // ITOPOD floor
    //     + if evil 700; if sadistic 2000 + sadistic bonus pp else (normal) 200

    // Kills Per Day
    var idleAttackCooldown = v('redLiquidBonus^').compareTo(bd(1)) == 0 ? bd(0.8) : bd(1)
    var respawnTime = v('totalRespawnTime').round(2, bigDecimal.RoundingModes.CEILING)
    var killsPerDay = bd(60 * 60).multiply(hoursPerDay).divide( respawnTime.add(idleAttackCooldown))

    /* Titan Info */
    // average PPP per hour from Titans * hoursPerDay / 1000000
    var tt = Object.values(Titans).map((titan, index) => {
        var titanPP = titan.getPP(v('totalPPBonus%'))
        var titanRespawn = titan.getRespawnTime(bd(0))
        // console.log(titan.name, titanPP, titanRespawn)
    })

    /* Ygg Info */
    var nguYgg = nguInfo(playerStates, Stat.YGGDRASIL_YIELD)
    var firstHarvest = Number(v('firstHarvestPerk').getValue())
    var blueHeart = c('blueHeart^')
    var fruitYieldData = {
        firstHarvest: firstHarvest,
        blueHeart: blueHeart,
        yieldModifier: v('totalYggdrasilYieldBonus%'),
        noNGUYieldModifier: v('totalYggdrasilYieldBonus%').divide(nguYgg).multiply(bd(100)),
        ppBonus: v('totalPPBonus%'),
    }

    
    var f : Yggdrasil = new FruitOfRage();
    var fruits : Yggdrasil[] = Object.values(j('yggdrasil'));
    for (var fruit of fruits) {
        if(fruit.key == FRUITS.RAGE.key) {
            f = fruit
        }
    }
    // @ts-ignore
    var fruitYield = f.fruitYield(fruitYieldData)

    return (
        <Content title="Daily Gains" infoRequired={infoReq} extraRequired={extraReq}>
            <ContentSubsection title={"How many PP do I get in " + pn(hoursPerDay, fmt) + " hours?"}>
                <strong className="text-green-500">Yggdrasil:</strong> <span className="text-red-500">{pn(fruitYield.divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong>
                <br />
                <strong className="text-green-500">Tower:</strong>
                <ul>
                    <li key="pppPerKill">{pn(pppPerKill, fmt)} ppp / kill on floor {pn(bd(itopodFloor), fmt)}</li>
                    <li key="killsPerDay">{pn(killsPerDay, fmt)} kills /  {pn(hoursPerDay, fmt)} hours (assuming 1-hit per kill)</li>
                    <li key="total" className="mt-2 border-white border-t-2 border-solid"><span className="text-red-500">{pn(killsPerDay.multiply(pppPerKill).divide(bd(1000000)), fmt, 2)}</span> <strong>PP per {pn(hoursPerDay, fmt)} hours</strong></li>
                </ul>
                
            </ContentSubsection>
        </Content>
    )
}

