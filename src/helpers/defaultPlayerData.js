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
        default:
            return 0;
    }
}