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
            default:
                return 0;
        }
    }
    return 0;
}

export function getPlayerOptions() {
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