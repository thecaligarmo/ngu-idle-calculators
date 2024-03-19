export function defaultPlayerData(playerData, info) {
    const playerExists = (playerData && Object.keys(playerData).length > 0)
    switch(info) {
        case 'baseEnergyPower':
            return playerExists ? playerData.energyPower : 0;
        case 'baseEnergyBar':
            return playerExists ? playerData.energyBars.low : 0;
        case 'baseEnergyCap':
            return playerExists ? playerData.capEnergy.low : 0;
        case 'baseMagicBar':
            return playerExists ? playerData.magic.magicPerBar.low : 0;
        case 'baseMagicCap':
            return playerExists ? playerData.magic.capMagic.low : 0;
        case 'baseMagicPower':
            return playerExists ? playerData.magic.magicPower : 0;
        case 'baseResource3Bar':
            return playerExists ? playerData.res3.res3PerBar.low : 0;
        case 'baseResource3Cap':
            return playerExists ? playerData.res3.capRes3.low : 0;
        case 'baseResource3Power':
            return playerExists ? playerData.res3.res3Power : 0;
        case 'resource3Active':
            return playerExists ? playerData.res3.res3On : 0;
        case 'currentEnergyCap':
            return playerExists ? playerData.curEnergy.low : 0;
        case 'currentMagicCap':
            return playerExists ? playerData.magic.curMagic.low : 0;
        case 'energyNGUAugmentsLevel':
            return playerExists ? playerData.NGU.skills[0].level.low : 0;
        case 'energyNGUWandoosLevel':
            return playerExists ? playerData.NGU.skills[1].level.low : 0;
        case 'energyNGURespawnLevel':
            return playerExists ? playerData.NGU.skills[2].level.low : 0;
        case 'energyNGUGoldLevel':
            return playerExists ? playerData.NGU.skills[3].level.low : 0;
        case 'energyNGUAdventureALevel':
            return playerExists ? playerData.NGU.skills[4].level.low : 0;
        case 'energyNGUPowerALevel':
            return playerExists ? playerData.NGU.skills[5].level.low : 0;
        case 'energyNGUDropChanceLevel':
            return playerExists ? playerData.NGU.skills[6].level.low : 0;
        case 'energyNGUMagicNGULevel':
            return playerExists ? playerData.NGU.skills[7].level.low : 0;
        case 'energyNGUPPLevel':
            return playerExists ? playerData.NGU.skills[8].level.low : 0;
        case 'magicNGUYggdrasilLevel':
            return playerExists ? playerData.NGU.magicSkills[0].level.low : 0;
        case 'magicNGUExpLevel':
            return playerExists ? playerData.NGU.magicSkills[1].level.low : 0;
        case 'magicNGUPowerBLevel':
            return playerExists ? playerData.NGU.magicSkills[2].level.low : 0;
        case 'magicNGUNumberLevel':
            return playerExists ? playerData.NGU.magicSkills[3].level.low : 0;
        case 'magicNGUTimeMachineLevel':
            return playerExists ? playerData.NGU.magicSkills[4].level.low : 0;
        case 'magicNGUEnergyNGULevel':
            return playerExists ? playerData.NGU.magicSkills[5].level.low : 0;
        case 'magicNGUAdventureBLevel':
            return playerExists ? playerData.NGU.magicSkills[6].level.low : 0;
        case 'energyNGUAugmentsTarget':
            return playerExists ? playerData.NGU.skills[0].target.low : 0;
        case 'energyNGUWandoosTarget':
            return playerExists ? playerData.NGU.skills[1].target.low : 0;
        case 'energyNGURespawnTarget':
            return playerExists ? playerData.NGU.skills[2].target.low : 0;
        case 'energyNGUGoldTarget':
            return playerExists ? playerData.NGU.skills[3].target.low : 0;
        case 'energyNGUAdventureATarget':
            return playerExists ? playerData.NGU.skills[4].target.low : 0;
        case 'energyNGUPowerATarget':
            return playerExists ? playerData.NGU.skills[5].target.low : 0;
        case 'energyNGUDropChanceTarget':
            return playerExists ? playerData.NGU.skills[6].target.low : 0;
        case 'energyNGUMagicNGUTarget':
            return playerExists ? playerData.NGU.skills[7].target.low : 0;
        case 'energyNGUPPTarget':
            return playerExists ? playerData.NGU.skills[8].target.low : 0;
        case 'magicNGUYggdrasilTarget':
            return playerExists ? playerData.NGU.magicSkills[0].target.low : 0;
        case 'magicNGUExpTarget':
            return playerExists ? playerData.NGU.magicSkills[1].target.low : 0;
        case 'magicNGUPowerBTarget':
            return playerExists ? playerData.NGU.magicSkills[2].target.low : 0;
        case 'magicNGUNumberTarget':
            return playerExists ? playerData.NGU.magicSkills[3].target.low : 0;
        case 'magicNGUTimeMachineTarget':
            return playerExists ? playerData.NGU.magicSkills[4].target.low : 0;
        case 'magicNGUEnergyNGUTarget':
            return playerExists ? playerData.NGU.magicSkills[5].target.low : 0;
        case 'magicNGUAdventureBTarget':
            return playerExists ? playerData.NGU.magicSkills[6].target.low : 0;
        default:
            return 0;
    }
}