import { bd, bigdec_max, isZero, toNum } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { GameMode } from "./mode";
import Resource, { ResourceContainer, prop } from "./resource";
import { Stat } from "./stat";



export class Wish  extends Resource {
    baseSpeedDivider: bigDecimal
    maxLevel : number
    constructor (
        id: number, key: string, name: string, mode : number, maxLevel: number, props: prop,
        baseSpeedDivider: bigDecimal,
    ) {
        // level always 0
        super(id, key, name, mode, 0, props)
        this.baseSpeedDivider = baseSpeedDivider
        this.maxLevel = maxLevel
    }
    updateStats() {
        for (var prop of Object.keys(this.base)) {
            this[prop] = (this.level > 0) ?  this.base[prop] * this.level : 0
        }
    }
    completed() : boolean{
        return this.level == this.maxLevel
    }

    speed(epower : bigDecimal, ecap : bigDecimal, mpower : bigDecimal, mcap: bigDecimal, rpower : bigDecimal, rcap : bigDecimal, wishSpeed : bigDecimal, level : number | undefined = undefined) : bigDecimal {
        if (_.isUndefined(level)) {
            level = this.level
        }
        if (level == this.maxLevel) {
            return bd(1)
        }
        
        return bd(
            Math.pow(
                toNum(epower.multiply(ecap)
                    .multiply(mpower).multiply(mcap)
                    .multiply(rpower).multiply(rcap))
                , 0.17)
        )
        .multiply(wishSpeed).divide(bd(100))
        .multiply(bd(50)) // 50 per tick
        .divide(
            this.baseSpeedDivider.multiply(bd(level + 1)), 100
        )
    }
    timeToFinish(epower : bigDecimal, ecap : bigDecimal, mpower : bigDecimal, mcap: bigDecimal, rpower : bigDecimal, rcap : bigDecimal, wishSpeed : bigDecimal, level : number | undefined = undefined) : bigDecimal{
        if (_.isUndefined(level)) {
            level = this.level
        }
        if (level == this.maxLevel) {
            return bd(0)
        }
        
        var speed = this.speed(epower, ecap, mpower, mcap, rpower, rcap, wishSpeed, level)
        var timeTaken = bd(0)
        if (!isZero(speed)) {
            let prog = (this.level == level) ? this.progress : 0
            timeTaken = bigdec_max(bd(1 - prog).divide(speed, 100), bd(4 * 60 * 60).subtract(bd(4 * 60 * 60 * prog)))
        }
        if (level > this.level) {
            timeTaken = timeTaken.add(this.timeToFinish(epower, ecap, mpower, mcap, rpower, rcap, wishSpeed, level - 1))
        }
        return timeTaken
    }
    capToMaxLevel(epower : bigDecimal, ecap : bigDecimal, mpower : bigDecimal, mcap: bigDecimal, rpower : bigDecimal, rcap : bigDecimal, wishSpeed : bigDecimal, level : number | undefined = undefined)
        : {[key:string]: bigDecimal}
        {
            let capsNeeded = {'energy' : bd(0), 'magic' : bd(0), 'res3' : bd(0)}
            if (_.isUndefined(level)) {
                level = this.level
            }
            if (level == this.maxLevel || isZero(wishSpeed)) {
                return capsNeeded
            }

            // Make sure we have something:
            if(isZero(epower) || isZero(ecap) || isZero(mpower) || isZero(mcap) || isZero(rpower) || isZero(rcap) ) {
                return capsNeeded
            }
        
            let speedNeeded = bd(1).divide(bd(4*60*60), 100)
            let rootNeeded = speedNeeded.multiply(
                this.baseSpeedDivider.multiply(bd(level + 1))
            )
            .divide(wishSpeed).multiply(bd(100))
            .divide(bd(50)) // 50 per tick
            let allCapsNeeded = bd(Math.pow(toNum(rootNeeded), 1/0.17)).divide(epower).divide(mpower).divide(rpower)
            

            let ecapNeeded = bd(
                Math.pow(
                    toNum(
                        allCapsNeeded.multiply(ecap).multiply(ecap).divide(mcap).divide(rcap)
                    )
                    , 1/3
                )
            ).ceil()

            let mcapNeeded = bd(
                Math.pow(
                    toNum(
                        allCapsNeeded.multiply(mcap).multiply(mcap).divide(ecap).divide(rcap)
                    )
                    , 1/3
                )
            ).ceil()

            let rcapNeeded = bd(
                Math.pow(
                    toNum(
                        allCapsNeeded.multiply(rcap).multiply(rcap).divide(mcap).divide(ecap)
                    )
                    , 1/3
                )
            ).ceil()

            return {'energy' : ecapNeeded, 'magic' : mcapNeeded, 'res3' : rcapNeeded}
    }
}

export const WISHLIST = [
    new Wish(0, 'iwishthatwisheskickedass', 'I wish that wishes kicked ass', GameMode.EVIL, 1, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100], [Stat.POWER, 20], [Stat.TOUGHNESS, 20], [Stat.HEALTH, 20], [Stat.REGEN, 20], [Stat.ENERGY_BARS, 5], [Stat.ENERGY_CAP, 5], [Stat.ENERGY_POWER, 5], [Stat.MAGIC_BARS, 5], [Stat.MAGIC_CAP, 5], [Stat.MAGIC_POWER, 5], [Stat.RES3_BARS, 5], [Stat.RES3_CAP, 5], [Stat.RES3_POWER, 5]], bd('1e15')),
    new Wish(1, 'iWishthatwisheswerentsoslow:c', 'I Wish that wishes weren\'t so slow :c', GameMode.EVIL, 10, [[Stat.WISH_SPEED, 5]], bd('1e15')),
    new Wish(2, 'iwishMacGuffindropsmattered', 'I wish MacGuffin drops mattered', GameMode.EVIL, 5, [], bd('2e15')),
    new Wish(3, 'iwishV234Titanshadbetterrewards', 'I wish V2/3/4 Titans had better rewards', GameMode.EVIL, 3, [], bd('8e15')),
    new Wish(4, 'iwishmoneyPitdidntsuck', 'I wish money Pit didn\'t suck', GameMode.EVIL, 1, [], bd('6e15')),
    new Wish(5, 'iwishIcouldbeatupmorebossesI', 'I wish I could beat up more bosses I', GameMode.EVIL, 10, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('3e15')),
    new Wish(6, 'iwishIwasstrongerinAdventuremodeI', 'I wish I was stronger in Adventure mode I', GameMode.EVIL,  10,  [[Stat.POWER, 3], [Stat.TOUGHNESS, 3], [Stat.HEALTH, 3], [Stat.REGEN, 3]], bd('3e15')),
    new Wish(7, 'iwishIhadmoreInventoryspaceI', 'I wish I had more Inventory space I', GameMode.EVIL, 12, [], bd('4e15')),
    new Wish(8, 'iwishIhadacoolnewmoveforAdventureI', 'I wish I had a cool new move for Adventure I', GameMode.EVIL, 1, [], bd('6e15')),
    new Wish(9, 'iwishIhadmoreEnergyPowerI', 'I wish I had more Energy Power I', GameMode.EVIL, 10, [[Stat.ENERGY_POWER, 5]], bd('5e15')),
    new Wish(10, 'iwishIhadmoreEnergyCapI', 'I wish I had more Energy Cap I', GameMode.EVIL, 10, [[Stat.ENERGY_CAP, 3]], bd('5e15')),
    new Wish(11, 'iwishIhadmoreEnergyBarsI', 'I wish I had more Energy Bars I', GameMode.EVIL, 10, [[Stat.ENERGY_BARS, 3]], bd('5e15')),
    new Wish(12, 'iwishIhadmoreMagicPowerI', 'I wish I had more Magic Power I', GameMode.EVIL, 10, [[Stat.MAGIC_POWER, 5]], bd('5e15')),
    new Wish(13, 'iwishIhadmoreMagicCapI', 'I wish I had more Magic Cap I', GameMode.EVIL, 10, [[Stat.MAGIC_CAP, 3]], bd('5e15')),
    new Wish(14, 'iwishIhadmoreMagicBarsI', 'I wish I had more Magic Bars I', GameMode.EVIL, 10, [[Stat.MAGIC_BARS, 3]], bd('5e15')),
    new Wish(15, 'iwishIhadmoreResource3PowerI', 'I wish I had more Resource 3 Power I', GameMode.EVIL, 10, [[Stat.RES3_POWER, 5]], bd('5e15')),
    new Wish(16, 'iwishIhadmoreResource3CapI', 'I wish I had more Resource 3 Cap I', GameMode.EVIL, 10, [[Stat.RES3_CAP, 3]], bd('5e15')),
    new Wish(17, 'iwishIhadmoreResource3BarsI', 'I wish I had more Resource 3 Bars I', GameMode.EVIL, 10, [[Stat.RES3_BARS, 3]], bd('5e15')),    
    new Wish(18, 'iwishtheGreasyNerdtookashower', 'I wish the Greasy Nerd took a shower', GameMode.EVIL, 10, [[Stat.HACK_SPEED, 4]], bd('1e16')),
    new Wish(19, 'iwishActiveQuestsweremoreRewardingI', 'I wish Active Quests were more Rewarding I', GameMode.EVIL, 10, [[Stat.QUEST_REWARD_ACTIVE, 2]], bd('2e16')),
    new Wish(20, 'iwishIdidnthavetowait3minutesperrebirth', 'I wish I didn\'t have to wait 3 minutes per rebirth', GameMode.EVIL, 6, [], bd('3e16')),
    new Wish(21, 'iwishWisheswerentsoslow:cII', 'I wish Wishes weren\'t so slow :c II', GameMode.EVIL, 10, [[Stat.WISH_SPEED, 2]], bd('5e16')),
    new Wish(22, 'iwishIhadmoreInventoryspaceII', 'I wish I had more Inventory space II', GameMode.EVIL, 12, [], bd('8e16')),
    new Wish(23, 'iwishBasicTrainingwasEVENFASTER>:)', 'I wish Basic Training was EVEN FASTER >:)', GameMode.EVIL, 1, [], bd('1e17')),
    new Wish(24, 'iwishBloodMacGuffinαwasntsorandom', 'I wish Blood MacGuffin α wasn\'t so random', GameMode.EVIL, 1, [], bd('6e16')),
    new Wish(25, 'iwishFruitofMacGuffinαwasntsorandom', 'I wish Fruit of MacGuffin αwasn\'t so random', GameMode.EVIL, 1, [], bd('6e16')),
    new Wish(26, 'iwishIwereanOscarMeyerWeiner', 'I wish I were an Oscar Meyer Weiner', GameMode.EVIL, 1, [], bd('1e18')),
    new Wish(27, 'iwishtheDaycareKittywasevenhappier', 'I wish the Daycare Kitty was even happier', GameMode.EVIL, 10, [[Stat.DAYCARE_SPEED, 1]], bd('5e16')),
    new Wish(28, 'iwishIcoulddualwieldweapons', 'I wish I could dual wield weapons', GameMode.EVIL, 10, [], bd('3e17')),
    new Wish(29, 'iwishIwasstrongerinAdventuremodeII', 'I wish I was stronger in Adventure mode II', GameMode.EVIL, 10, [[Stat.POWER, 2], [Stat.TOUGHNESS, 2], [Stat.HEALTH, 2], [Stat.REGEN, 2]], bd('2e17')),
    new Wish(30, 'iwishIcouldbeatupmorebossesII', 'I wish I could beat up more bosses II', GameMode.EVIL, 10, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('2e17')),
    new Wish(31, 'iwishIhadmoreEnergyPowerII', 'I wish I had more Energy Power II', GameMode.EVIL, 10, [[Stat.ENERGY_POWER, 5]], bd('1e17')),
    new Wish(32, 'iwishIhadmoreEnergyCapII', 'I wish I had more Energy Cap II', GameMode.EVIL, 10, [[Stat.ENERGY_CAP, 3]], bd('1e17')),
    new Wish(33, 'iwishIhadmoreEnergyBarsII', 'I wish I had more Energy Bars II', GameMode.EVIL, 10, [[Stat.ENERGY_BARS, 3]], bd('1e17')),
    new Wish(34, 'iwishIhadmoreMagicPowerII', 'I wish I had more Magic Power II', GameMode.EVIL, 10, [[Stat.MAGIC_POWER, 5]], bd('1e17')),
    new Wish(35, 'iwishIhadmoreMagicCapII', 'I wish I had more Magic Cap II', GameMode.EVIL, 10, [[Stat.MAGIC_CAP, 3]], bd('1e17')),
    new Wish(36, 'iwishIhadmoreMagicBarsII', 'I wish I had more Magic Bars II', GameMode.EVIL, 10, [[Stat.MAGIC_BARS, 3]], bd('1e17')),
    new Wish(37, 'iwishIhadmoreResource3PowerII', 'I wish I had more Resource 3 Power II', GameMode.EVIL, 10, [[Stat.RES3_POWER, 5]], bd('1e17')),
    new Wish(38, 'iwishIhadmoreResource3CapII', 'I wish I had more Resource 3 Cap II', GameMode.EVIL, 10, [[Stat.RES3_CAP, 3]], bd('1e17')),
    new Wish(39, 'iwishIhadmoreResource3BarsII', 'I wish I had more Resource 3 Bars II', GameMode.EVIL, 10, [[Stat.RES3_BARS, 3]], bd('1e17')),
    new Wish(40, 'iwishtheGodmotherwoulddropQP', 'I wish the Godmother would drop QP', GameMode.EVIL, 1, [], bd('1e19')),
    new Wish(41, 'iwishtheTitanafterGodmotherwouldalsodropQP', 'I wish the Titan after Godmother would also drop QP', GameMode.EVIL, 1, [], bd('3e20')),
    new Wish(42, 'iwishtheGreasyNerdtookashowerII', 'I wish the Greasy Nerd took a shower II', GameMode.EVIL, 10, [[Stat.HACK_SPEED, 4]], bd('7e17')),
    new Wish(43, 'iwishWisheswerentsoslow:cIII', 'I wish Wishes weren\'t so slow :c III', GameMode.EVIL, 10, [[Stat.WISH_SPEED, 2]], bd('2e18')),
    new Wish(44, 'iwishtherewasmorecuteDaycareKittyArt', 'I wish there was more cute Daycare Kitty Art', GameMode.EVIL, 1, [], bd('3e19')),
    new Wish(45, 'iwishIcoulddualwieldweaponsII', 'I wish I could dual wield weapons II', GameMode.EVIL, 10, [], bd('1e19')),
    new Wish(46, 'iwishenemiesspawnedfaster', 'I wish enemies spawned faster', GameMode.EVIL, 10, [[Stat.RESPAWN, -1]], bd('6e18')),
    new Wish(47, 'iwishQuestsgavemoreQP', 'I wish Quests gave more QP', GameMode.EVIL, 10, [[Stat.QUEST_REWARD, 2]], bd('3e18')),
    new Wish(48, 'iwishIhadmoreEnergyPowerIII', 'I wish I had more Energy Power III', GameMode.EVIL, 10, [[Stat.ENERGY_POWER, 5]], bd('5e18')),
    new Wish(49, 'iwishIhadmoreEnergyCapIII', 'I wish I had more Energy Cap III', GameMode.EVIL, 10, [[Stat.ENERGY_CAP, 3]], bd('5e18')),
    new Wish(50, 'iwishIhadmoreEnergyBarsIII', 'I wish I had more Energy Bars III', GameMode.EVIL, 10, [[Stat.ENERGY_BARS, 3]], bd('5e18')),
    new Wish(51, 'iwishIhadmoreMagicPowerIII', 'I wish I had more Magic Power III', GameMode.EVIL, 10, [[Stat.MAGIC_POWER, 5]], bd('5e18')),
    new Wish(52, 'iwishIhadmoreMagicCapIII', 'I wish I had more Magic Cap III', GameMode.EVIL, 10, [[Stat.MAGIC_CAP, 3]], bd('5e18')),
    new Wish(53, 'iwishIhadmoreMagicBarsIII', 'I wish I had more Magic Bars III', GameMode.EVIL, 10, [[Stat.MAGIC_BARS, 3]], bd('5e18')),
    new Wish(54, 'iwishIhadmoreResource3PowerIII', 'I wish I had more Resource 3 Power III', GameMode.EVIL, 10, [[Stat.RES3_POWER, 5]], bd('5e18')),
    new Wish(55, 'iwishIhadmoreResource3CapIII', 'I wish I had more Resource 3 Cap III', GameMode.EVIL, 10, [[Stat.RES3_CAP, 3]], bd('5e18')),
    new Wish(56, 'iwishIhadmoreResource3BarsIII', 'I wish I had more Resource 3 Bars III', GameMode.EVIL, 10, [[Stat.RES3_BARS, 3]], bd('5e18')),    
    new Wish(57, 'iwishIhadmoreInventoryspaceIII', 'I wish I had more Inventory space III', GameMode.EVIL, 12, [], bd('8e19')),
    new Wish(58, 'iwishIhadanothercoolnewmoveforadventure', 'I wish I had another cool new move for adventure', GameMode.EVIL, 1, [], bd('3e21')),
    new Wish(59, 'iwishBloodMacGuffinαalsodidntsuck', 'I wish Blood MacGuffin α also didn\'t suck', GameMode.EVIL, 10, [], bd('4e20')),
    new Wish(60, 'iwishFruitofMacGuffinαalsodidntsuck', 'I wish Fruit of MacGuffin α also didn\'t suck', GameMode.EVIL, 10, [], bd('4e20')),
    new Wish(61, 'iwishIwasmoreOP', 'I wish I was more OP', GameMode.EVIL, 10, [[Stat.EXPERIENCE, 0.5]], bd('8e19')),
    new Wish(62, 'iwishActiveQuestsweremoreRewardingII', 'I wish Active Quests were more Rewarding II', GameMode.EVIL, 10, [[Stat.QUEST_REWARD_ACTIVE, 1]], bd('8e20')),
    new Wish(63, 'iwishtheGreasyNerdcouldatleastwearsomebodyspray', 'I wish the Greasy Nerd could at least wear some body spray', GameMode.EVIL, 10, [[Stat.HACK_SPEED, 2]], bd('5e20')),
    new Wish(64, 'iwishIhadmoreEnergyPowerIV', 'I wish I had more Energy Power IV', GameMode.EVIL, 10, [[Stat.ENERGY_POWER, 5]], bd('3e20')),
    new Wish(65, 'iwishIhadmoreEnergyCapIV', 'I wish I had more Energy Cap IV', GameMode.EVIL, 10, [[Stat.ENERGY_CAP, 3]], bd('3e20')),
    new Wish(66, 'iwishIhadmoreEnergyBarsIV', 'I wish I had more Energy Bars IV', GameMode.EVIL, 10, [[Stat.ENERGY_BARS, 3]], bd('3e20')),
    new Wish(67, 'iwishIhadmoreMagicPowerIV', 'I wish I had more Magic Power IV', GameMode.EVIL, 10, [[Stat.MAGIC_POWER, 5]], bd('3e20')),
    new Wish(68, 'iwishIhadmoreMagicCapIV', 'I wish I had more Magic Cap IV', GameMode.EVIL, 10, [[Stat.MAGIC_CAP, 3]], bd('3e20')),
    new Wish(69, 'iwishIhadmoreMagicBarsIV', 'I wish I had more Magic Bars IV', GameMode.EVIL, 10, [[Stat.MAGIC_BARS, 3]], bd('3e20')),
    new Wish(70, 'iwishIhadmoreResource3PowerIV', 'I wish I had more Resource 3 Power IV', GameMode.EVIL, 10, [[Stat.RES3_POWER, 5]], bd('3e20')),
    new Wish(71, 'iwishIhadmoreResource3CapIV', 'I wish I had more Resource 3 Cap IV', GameMode.EVIL, 10, [[Stat.RES3_CAP, 3]], bd('3e20')),
    new Wish(72, 'iwishIhadmoreResource3BarsIV', 'I wish I had more Resource 3 Bars IV', GameMode.EVIL, 10, [[Stat.RES3_BARS, 3]], bd('3e20')),
    new Wish(73, 'iwishtheBeastwoulddropsomeQP', 'I wish the Beast would drop some QP', GameMode.EVIL, 1, [], bd('2e16')),
    new Wish(74, 'iwishtheGreasyNerdwoulddropsomeQP', 'I wish the Greasy Nerd would drop some QP', GameMode.EVIL, 1, [], bd('5e17')),
    new Wish(75, 'iwishIwasagiantjarofMayo.', 'I wish I was a giant jar of Mayo.', GameMode.EVIL, 1, [], bd('5e21')),
    new Wish(76, 'iwishtheQPHackhadmoremilestonesI', 'I wish the QP Hack had more milestones I', GameMode.EVIL, 5, [], bd('2e17')),
    new Wish(77, 'iwishtheNumberHackhadmoremilestonesI', 'I wish the Number Hack had more milestones I', GameMode.EVIL, 5, [], bd('1e19')),
    new Wish(78, 'iwishtheHACKHACKhadmoremilestonesI', 'I wish the HACK HACK had more milestones I', GameMode.EVIL, 10, [], bd('6e20')),
    new Wish(79, 'iwishtheITOPODawardedmoreBasePP', 'I wish the ITOPOD awarded more Base PP', GameMode.SADISTIC, 10, [], bd('2e21')),
    new Wish(80, 'iwishhigherlevelquestdropscountedforevenmoreQuestprogressI', 'I wish higher level quest drops counted for even more Quest progress I', GameMode.EVIL, 2, [], bd('5e17')),
    new Wish(81, 'iwishhigherlevelquestdropscountedforevenmoreQuestprogressII', 'I wish higher level quest drops counted for even more Quest progress II', GameMode.SADISTIC, 2, [], bd('1e22')),
    new Wish(82, 'iwishIhadmoreEnergyPowerV', 'I wish I had more Energy Power V', GameMode.SADISTIC, 10, [[Stat.ENERGY_POWER, 2]], bd('5e21')),
    new Wish(83, 'iwishIhadmoreEnergyBarsV', 'I wish I had more Energy Bars V', GameMode.SADISTIC, 10, [[Stat.ENERGY_BARS, 1]], bd('5e21')),
    new Wish(84, 'iwishIhadmoreEnergyCapV', 'I wish I had more Energy Cap V', GameMode.SADISTIC, 10, [[Stat.ENERGY_CAP, 1]], bd('5e21')),
    new Wish(85, 'iwishIhadmoreMagicPowerV', 'I wish I had more Magic Power V', GameMode.SADISTIC, 10, [[Stat.MAGIC_POWER, 2]], bd('5e21')),
    new Wish(86, 'iwishIhadmoreMagicBarsV', 'I wish I had more Magic Bars V', GameMode.SADISTIC, 10, [[Stat.MAGIC_BARS, 1]], bd('5e21')),
    new Wish(87, 'iwishIhadmoreMagicCapV', 'I wish I had more Magic Cap V', GameMode.SADISTIC, 10, [[Stat.MAGIC_CAP, 1]], bd('5e21')),
    new Wish(88, 'iwishIhadmoreResource3PowerV', 'I wish I had more Resource 3 Power V', GameMode.SADISTIC, 10, [[Stat.RES3_POWER, 3]], bd('5e21')),
    new Wish(89, 'iwishIhadmoreResource3BarfsV', 'I wish I had more Resource 3 Barfs V', GameMode.SADISTIC, 10, [[Stat.RES3_BARS, 1.5]], bd('5e21')),
    new Wish(90, 'iwishIhadmoreResource3CapV', 'I wish I had more Resource 3 Cap V', GameMode.SADISTIC, 10, [[Stat.RES3_CAP, 1.5]], bd('5e21')),
    new Wish(91, 'iwishIhadmoreEnergyPowerVI', 'I wish I had more Energy Power VI', GameMode.SADISTIC, 10, [[Stat.ENERGY_POWER, 2]], bd('1e23')),
    new Wish(92, 'iwishIhadmoreEnergyBarsVI', 'I wish I had more Energy Bars VI', GameMode.SADISTIC, 10, [[Stat.ENERGY_BARS, 1]], bd('1e23')),
    new Wish(93, 'iwishIhadmoreEnergyCapVI', 'I wish I had more Energy Cap VI', GameMode.SADISTIC, 10, [[Stat.ENERGY_CAP, 1]], bd('1e23')),
    new Wish(94, 'iwishIhadmoreMagicPowerVI', 'I wish I had more Magic Power VI', GameMode.SADISTIC, 10, [[Stat.MAGIC_POWER, 2]], bd('1e23')),
    new Wish(95, 'iwishIhadmoreMagicBarsVI', 'I wish I had more Magic Bars VI', GameMode.SADISTIC, 10, [[Stat.MAGIC_BARS, 1]], bd('1e23')),
    new Wish(96, 'iwishIhadmoreMagicCapVI', 'I wish I had more Magic Cap VI', GameMode.SADISTIC, 10, [[Stat.MAGIC_CAP, 1]], bd('1e23')),
    new Wish(97, 'iwishIhadmoreResource3PowerVI', 'I wish I had more Resource 3 Power VI', GameMode.SADISTIC, 10, [[Stat.RES3_POWER, 3]], bd('1e23')),
    new Wish(98, 'iwishIhadmoreResource3BarsVI', 'I wish I had more Resource 3 Bars VI', GameMode.SADISTIC, 10, [[Stat.RES3_BARS, 1.5]], bd('1e23')),
    new Wish(99, 'iwishIhadmoreResource3CapVI', 'I wish I had more Resource 3 Cap VI', GameMode.SADISTIC, 10, [[Stat.RES3_CAP, 1.5]], bd('1e23')),
    new Wish(100, 'iwishTitan10droppedQP', 'I wish Titan 10 dropped QP', GameMode.SADISTIC, 1, [], bd('5e22')),
    new Wish(101, 'iwishMajorQuestshadbetterBaseQPRewards.', 'I wish Major Quests had better Base QP Rewards.', GameMode.SADISTIC, 10, [], bd('1e22')),
    new Wish(102, 'iwishMinorQuestshadbetterBaseQPRewards.', 'I wish Minor Quests had better Base QP Rewards.', GameMode.SADISTIC, 2, [], bd('1.8e23')),
    new Wish(103, 'iwishIwasstrongerinAdventureModeIII', 'I wish I was stronger in Adventure Mode III', GameMode.EVIL,  10,[[Stat.POWER, 2], [Stat.TOUGHNESS, 2], [Stat.HEALTH, 2], [Stat.REGEN, 2]], bd('1e19')),
    new Wish(104, 'iwishIwasstrongerinAdventureModeIV', 'I wish I was stronger in Adventure Mode IV', GameMode.SADISTIC, 10, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]], bd('3e21')),
    new Wish(105, 'iwishIcouldbeatupmorebossesIII', 'I wish I could beat up more bosses III', GameMode.EVIL, 10, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('2e19')),
    new Wish(106, 'iwishIcouldbeatupmorebossesIV', 'I wish I could beat up more bosses IV', GameMode.SADISTIC, 10, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('1e21')),
    new Wish(107, 'iwishtheSadisticBossMultiplierdidntsucksobadI', 'I wish the Sadistic Boss Multiplier didn\'t suck so bad I', GameMode.SADISTIC, 10, [], bd('2e22')),
    new Wish(108, 'iwishtheSadisticBossMultiplierdidntsucksobadII', 'I wish the Sadistic Boss Multiplier didn\'t suck so bad II', GameMode.SADISTIC, 10, [], bd('5e23')),
    new Wish(109, 'iwishIhadyetanotherAccessorySlot!', 'I wish I had yet another Accessory Slot!', GameMode.SADISTIC, 1, [], bd('5e24')),
    new Wish(110, 'iwishInfinityCubeBoostingwasntsoawfulI', 'I wish Infinity Cube Boostingwasn\'t so awful I', GameMode.EVIL, 20, [], bd('4e19')),
    new Wish(111, 'iwishEnergyNGUswereFasterI', 'I wish Energy NGU\'s were Faster I', GameMode.SADISTIC, 10, [[Stat.ENERGY_NGU_SPEED, 2]], bd('7e20')),
    new Wish(112, 'iwishEnergyNGUswereFasterII', 'I wish Energy NGU\'s were Faster II', GameMode.SADISTIC, 10, [[Stat.ENERGY_NGU_SPEED, 2]], bd('2e22')),
    new Wish(113, 'iwishMagicNGUswereFasterI', 'I wish Magic NGU\'s were Faster I', GameMode.SADISTIC, 10, [[Stat.MAGIC_NGU_SPEED, 2]], bd('7e20')),
    new Wish(114, 'iwishMagicNGUswereFasterII', 'I wish Magic NGU\'s were Faster II', GameMode.SADISTIC, 10, [[Stat.MAGIC_NGU_SPEED, 2]], bd('2e22')),
    new Wish(115, 'iwishmyEnergyNGUCardTierwashigherI', 'I wish my Energy NGU Card Tier higher I', GameMode.EVIL, 1, [], bd('4e19')),
    new Wish(116, 'iwishmyDropChanceCardTierwashigherI', 'I wish my Drop Chance Card Tier higher I', GameMode.EVIL, 1, [], bd('4e19')),
    new Wish(117, 'iwishmyWandoosCardTierwashigherI', 'I wish my Wandoos Card Tier higher I', GameMode.EVIL, 1, [], bd('2e19')),
    new Wish(118, 'iwishmyAdventureStatsCardTierwashigherI', 'I wish my Adventure Stats Card Tier higher I', GameMode.EVIL, 1, [], bd('8e19')),
    new Wish(119, 'iwishmyHacksCardTierwashigherI', 'I wish my Hacks Card Tier higher I', GameMode.EVIL, 1, [], bd('5e19')),
    new Wish(120, 'iwishmyAugmentCardTierwashigherI', 'I wish my Augment Card Tier higher I', GameMode.EVIL, 1, [], bd('6e19')),
    new Wish(121, 'iwishmyGoldDropCardTierwashigherI', 'I wish my Gold Drop Card Tier higher I', GameMode.SADISTIC, 1, [], bd('8e19')),
    new Wish(122, 'iwishmyPPCardTierwashigherI', 'I wish my PP Card Tier higher I', GameMode.SADISTIC, 1, [], bd('1e20')),
    new Wish(123, 'iwishmyA/DCardTierwashigherI', 'I wish my A/D Card Tier higher I', GameMode.SADISTIC, 1, [], bd('9e19')),
    new Wish(124, 'iwishmyMagicNGUCardTierwashigherI', 'I wish my Magic NGU Card Tier higher I', GameMode.SADISTIC, 1, [], bd('1.9e20')),
    new Wish(125, 'iwishmyTMSpeedCardTierwashigherI', 'I wish my TM Speed Card Tier higher I', GameMode.SADISTIC, 1, [], bd('1.7e20')),
    new Wish(126, 'iwishmyQPCardTierwashigherI', 'I wish my QP Card Tier higher I', GameMode.SADISTIC, 1, [], bd('2.2e20')),
    new Wish(127, 'iwishmyDaycareCardTierwashigherI', 'I wish my Daycare Card Tier higher I', GameMode.SADISTIC, 1, [], bd('2.5e20')),
    new Wish(128, 'iwishmyEnergyNGUCardTierwashigherII', 'I wish my Energy NGU Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1.2e21')),
    new Wish(129, 'iwishmyDropChanceCardTierwashigherII', 'I wish my Drop Chance Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1.2e21')),
    new Wish(130, 'iwishmyWandoosCardTierwashigherII', 'I wish my Wandoos Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1e21')),
    new Wish(131, 'iwishmyAdventureStatsCardTierwashigherII', 'I wish my Adventure Stats Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1.5e21')),
    new Wish(132, 'iwishmyHacksCardTierwashigherII', 'I wish my Hacks Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1.8e21')),
    new Wish(133, 'iwishmyAugmentCardTierwashigherII', 'I wish my Augment Card Tier higher II', GameMode.SADISTIC, 1, [], bd('1.8e21')),
    new Wish(134, 'iwishmyGoldDropCardTierwashigherII', 'I wish my Gold Drop Card Tier higher II', GameMode.SADISTIC, 1, [], bd('2e21')),
    new Wish(135, 'iwishmyPPCardTierwashigherII', 'I wish my PP Card Tier higher II', GameMode.SADISTIC, 1, [], bd('2.5e21')),
    new Wish(136, 'iwishmyA/DCardTierwashigherII', 'I wish my A/D Card Tier higher II', GameMode.SADISTIC, 1, [], bd('2e21')),
    new Wish(137, 'iwishmyMagicNGUCardTierwashigherII', 'I wish my Magic NGU Card Tier higher II', GameMode.SADISTIC, 1, [], bd('3e21')),
    new Wish(138, 'iwishmyTMSpeedCardTierwashigherII', 'I wish my TM Speed Card Tier higher II', GameMode.SADISTIC, 1, [], bd('2.5e21')),
    new Wish(139, 'iwishmyQPCardTierwashigherII', 'I wish my QP Card Tier higher II', GameMode.SADISTIC, 1, [], bd('4e21')),
    new Wish(140, 'iwishmyDaycareCardTierwashigherII', 'I wish my Daycare Card Tier higher II', GameMode.SADISTIC, 1, [], bd('5e21')),
    new Wish(141, 'iwishmyEnergyNGUCardTierwashigherIII', 'I wish my Energy NGU Card Tier higher III', GameMode.SADISTIC, 1, [], bd('2e22')),
    new Wish(142, 'iwishmyDropChanceCardTierwashigherIII', 'I wish my Drop Chance Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.8e22')),
    new Wish(143, 'iwishmyWandoosCardTierwashigherIII', 'I wish my Wandoos Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.5e22')),
    new Wish(144, 'iwishmyAdventureStatsCardTierwashigherIII', 'I wish my Adventure Stats Card Tier higher III', GameMode.SADISTIC, 1, [], bd('5e22')),
    new Wish(145, 'iwishmyHacksCardTierwashigherIII', 'I wish my Hacks Card Tier higher III', GameMode.SADISTIC, 1, [], bd('4e22')),
    new Wish(146, 'iwishmyAugmentCardTierwashigherIII', 'I wish my Augment Card Tier higher III', GameMode.SADISTIC, 1, [], bd('6e22')),
    new Wish(147, 'iwishmyGoldDropCardTierwashigherIII', 'I wish my Gold Drop Card Tier higher III', GameMode.SADISTIC, 1, [], bd('7.5e22')),
    new Wish(148, 'iwishmyPPCardTierwashigherIII', 'I wish my PP Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1e23')),
    new Wish(149, 'iwishmyA/DCardTierwashigherIII', 'I wish my A/D Card Tier higher III', GameMode.SADISTIC, 1, [], bd('8e22')),
    new Wish(150, 'iwishmyMagicNGUCardTierwashigherIII', 'I wish my Magic NGU Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.3e23')),
    new Wish(151, 'iwishmyTMSpeedCardTierwashigherIII', 'I wish my TM Speed Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.2e23')),
    new Wish(152, 'iwishmyQPCardTierwashigherIII', 'I wish my QP Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.5e23')),
    new Wish(153, 'iwishmyDaycareCardTierwashigherIII', 'I wish my Daycare Card Tier higher III', GameMode.SADISTIC, 1, [], bd('1.6e23')),
    new Wish(154, 'iwishImadeMayoFasterI', 'I wish I made Mayo Faster I', GameMode.EVIL, 10, [[Stat.MAYO_SPEED, 0.5]], bd('5e20')),
    new Wish(155, 'iwishmyCardsSpawnedFasterI', 'I wish my Cards Spawned Faster I', GameMode.EVIL, 10, [[Stat.CARD_SPEED, 0.5]], bd('5e20')),
    new Wish(156, 'iwishImadeMayoFasterII', 'I wish I made Mayo Faster II', GameMode.SADISTIC, 10, [[Stat.MAYO_SPEED, 0.4]], bd('1e22')),
    new Wish(157, 'iwishmyCardsSpawnedFasterII', 'I wish my Cards Spawned Faster II', GameMode.SADISTIC, 10, [[Stat.CARD_SPEED, 0.4]], bd('1e22')),
    new Wish(158, 'iwishImadeMayoFasterIII', 'I wish I made Mayo Faster III', GameMode.SADISTIC, 10, [[Stat.MAYO_SPEED, 0.3]], bd('2e23')),
    new Wish(159, 'iwishmyCardsSpawnedFasterIII', 'I wish my Cards Spawned Faster III', GameMode.SADISTIC, 10, [[Stat.CARD_SPEED, 0.3]], bd('2e23')),
    new Wish(160, 'iwishImadeMayoFasterIV', 'I wish I made Mayo Faster IV', GameMode.SADISTIC, 10, [[Stat.MAYO_SPEED, 0.3]], bd('4e24')),
    new Wish(161, 'iwishmyCardsSpawnedFasterIV', 'I wish my Cards Spawned Faster IV', GameMode.SADISTIC, 10, [[Stat.CARD_SPEED, 0.3]], bd('4e24')),
    new Wish(162, 'iwishIhadBEEFYCardsI', 'I wish I had BEEFY Cards I', GameMode.SADISTIC, 1, [], bd('4e24')),
    new Wish(163, 'iwishIdidnthaveWIMPYCardsI', 'I wish I didn\'t have WIMPY Cards I', GameMode.SADISTIC, 1, [], bd('4e24')),
    new Wish(164, 'iwishIhadabiggerDeckI', 'I wish I had a bigger Deck I', GameMode.EVIL, 5, [], bd('1e20')),
    new Wish(165, 'iwishIhadabiggerDeckII', 'I wish I had a bigger Deck II', GameMode.SADISTIC, 5, [], bd('5e21')),
    new Wish(166, 'iwishIhadabiggerDeckIII', 'I wish I had a bigger Deck III', GameMode.SADISTIC, 5, [], bd('2.5e23')),
    new Wish(167, 'iwishIhadanotherMayoGenerator', 'I wish I had another Mayo Generator', GameMode.SADISTIC, 1, [[Stat.MAYO_GENERATOR, 2]], bd('5e21')),
    new Wish(168, 'iwishIhadanotherBonusTag', 'I wish I had another Bonus Tag', GameMode.SADISTIC, 1, [], bd('3e22')),
    new Wish(169, 'iwishTagsworkedbetterI', 'I wish Tags worked better I', GameMode.EVIL, 10, [[Stat.TAG_EFFECT, 0.05]], bd('2e19')),
    new Wish(170, 'iwishTagsworkedbetterII', 'I wish Tags worked better II', GameMode.EVIL, 10, [[Stat.TAG_EFFECT, 0.04]], bd('6e20')),
    new Wish(171, 'iwishTagsworkedbetterIII', 'I wish Tags worked better III', GameMode.SADISTIC, 10, [[Stat.TAG_EFFECT, 0.04]], bd('1.8e22')),
    new Wish(172, 'iwishTagsworkedbetterIV', 'I wish Tags worked better IV', GameMode.SADISTIC, 10, [[Stat.TAG_EFFECT, 0.04]], bd('5e23')),
    new Wish(173, 'iwishTagsworkedbetterV', 'I wish Tags worked better V', GameMode.SADISTIC, 10, [[Stat.TAG_EFFECT, 0.04]], bd('1.5e25')),
    new Wish(174, 'iwishmyEnergyNGUCardTierwashigherIV', 'I wish my Energy NGU Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('2.5e23')),
    new Wish(175, 'iwishmyDropChanceCardTierwashigherIV', 'I wish my Drop Chance Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('2.2e23')),
    new Wish(176, 'iwishmyWandoosCardTierwashigherIV', 'I wish my Wandoos Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('2e23')),
    new Wish(177, 'iwishmyAdventureStatsCardTierwashigherIV', 'I wish my Adventure Stats Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('5e23')),
    new Wish(178, 'iwishmyHacksCardTierwashigherIV', 'I wish my Hacks Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('4e23')),
    new Wish(179, 'iwishmyAugmentCardTierwashigherIV', 'I wish my Augment Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('6e23')),
    new Wish(180, 'iwishmyGoldDropCardTierwashigherIV', 'I wish my Gold Drop Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('7.5e23')),
    new Wish(181, 'iwishmyPPCardTierwashigherIV', 'I wish my PP Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('1e24')),
    new Wish(182, 'iwishmyA/DCardTierwashigherIV', 'I wish my A/D Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('8e23')),
    new Wish(183, 'iwishmyMagicNGUCardTierwashigherIV', 'I wish my Magic NGU Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('1.3e24')),
    new Wish(184, 'iwishmyTMSpeedCardTierwashigherIV', 'I wish my TM Speed Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('1.2e24')),
    new Wish(185, 'iwishmyQPCardTierwashigherIV', 'I wish my QP Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('1.5e24')),
    new Wish(186, 'iwishmyDaycareCardTierwashigherIV', 'I wish my Daycare Card Tier higher IV', GameMode.SADISTIC, 2, [], bd('1.6e24')),
    new Wish(187, 'iwishTitan11DroppedQP', 'I wish Titan 11 Dropped QP', GameMode.SADISTIC, 1, [], bd('2e25')),
    new Wish(188, 'iwishIwasstrongerinAdventureModeV', 'I wish I was stronger in Adventure Mode V', GameMode.SADISTIC, 10, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]], bd('1e24')),
    new Wish(189, 'iwishIcouldbeatupmorebossesV', 'I wish I could beat up more bosses V', GameMode.SADISTIC, 20, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('1e24')),
    new Wish(190, 'iwishIwasf**kingdonewithAdvancedTrainingforever!', 'I wish I was f**king done with Advanced Training forever!', GameMode.EVIL, 1, [], bd('1e18')),
    new Wish(191, 'iwishIcouldbeatupmoreBossesVI', 'I wish I could beat up more Bosses VI', GameMode.SADISTIC, 20, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('2e25')),
    new Wish(192, 'iwishIcouldbeatupmoreBossesVII', 'I wish I could beat up more Bosses VII', GameMode.SADISTIC, 20, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('4e26')),
    new Wish(193, 'iwishIhadmoreEnergyPowerVII', 'I wish I had more Energy Power VII', GameMode.SADISTIC, 10, [[Stat.ENERGY_POWER, 2]], bd('2e24')),
    new Wish(194, 'iwishIhadmoreEnergyBarsVII', 'I wish I had more Energy Bars VII', GameMode.SADISTIC, 10, [[Stat.ENERGY_BARS, 1]], bd('2e24')),
    new Wish(195, 'iwishIhadmoreEnergyCapVII', 'I wish I had more Energy Cap VII', GameMode.SADISTIC, 10, [[Stat.ENERGY_CAP, 1]], bd('2e24')),
    new Wish(196, 'iwishIhadmoreMagicPowerVII', 'I wish I had more Magic Power VII', GameMode.SADISTIC, 10, [[Stat.MAGIC_POWER, 2]], bd('2e24')),
    new Wish(197, 'iwishIhadmoreMagicBarsVII', 'I wish I had more Magic Bars VII', GameMode.SADISTIC, 10, [[Stat.MAGIC_BARS, 1]], bd('2e24')),
    new Wish(198, 'iwishIhadmoreMagicCapVII', 'I wish I had more Magic Cap VII', GameMode.SADISTIC, 10, [[Stat.MAGIC_CAP, 1]], bd('2e24')),
    new Wish(199, 'iwishIhadmoreResource3PowerVII', 'I wish I had more Resource 3 Power VII', GameMode.SADISTIC, 10, [[Stat.RES3_POWER, 3]], bd('2e24')),
    new Wish(200, 'iwishIhadmoreResource3BarsVII', 'I wish I had more Resource 3 Bars VII', GameMode.SADISTIC, 10, [[Stat.RES3_BARS, 1.5]], bd('2e24')),
    new Wish(201, 'iwishIhadmoreResource3CapVII', 'I wish I had more Resource 3 Cap VII', GameMode.SADISTIC, 10, [[Stat.RES3_CAP, 1.5]], bd('2e24')),
    new Wish(202, 'iwishIwasasneakpreviewof4GsnextIdlegame', 'I wish I was a sneak preview of 4G\'s next Idle game', GameMode.SADISTIC, 1, [], bd('1e24')),
    new Wish(203, 'aREYOUSUREYOUWISHTOSHUTDOWN?', 'ARE YOU SURE YOU WISH TO SHUT DOWN?', GameMode.SADISTIC, 1, [], bd('1e27')),
    new Wish(204, 'iwishTitan12gavemesomeQP', 'I wish Titan 12 gave me some QP', GameMode.SADISTIC, 1, [], bd('1e27')),
    new Wish(205, 'iwishmyEnergyNGUCardTierwasHigherV', 'I wish my Energy NGU Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('4e25')),
    new Wish(206, 'iwishmyDropChanceCardTierwasHigherV', 'I wish my Drop Chance Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('5e25')),
    new Wish(207, 'iwishmyWandoosCardTierwasHigherV', 'I wish my Wandoos Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('4e25')),
    new Wish(208, 'iwishmyAdventureStatsCardTierwasHigherV', 'I wish my Adventure Stats Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('1e26')),
    new Wish(209, 'iwishmyHacksCardTierwasHigherV', 'I wish my Hacks Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('8e25')),
    new Wish(210, 'iwishmyAugmentCardTierwasHigherV', 'I wish my Augment Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('1e26')),
    new Wish(211, 'iwishmyGoldDropCardTierwasHigherV', 'I wish my Gold Drop Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('1.3e26')),
    new Wish(212, 'iwishmyPPCardTierwasHigherV', 'I wish my PP Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('2e26')),
    new Wish(213, 'iwishmyA/DCardTierwasHigherV', 'I wish my A/D Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('2.5e26')),
    new Wish(214, 'iwishmyMagicNGUCardTierwasHigherV', 'I wish my Magic NGU Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('2e26')),
    new Wish(215, 'iwishmyTMSpeedTierwasHigherV', 'I wish my TM Speed Tier was Higher V', GameMode.SADISTIC, 2, [], bd('3e26')),
    new Wish(216, 'iwishmyQPCardTierwasHigherV', 'I wish my QP Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('5e26')),
    new Wish(217, 'iwishmyDaycareCardTierwasHigherV', 'I wish my Daycare Card Tier Higher V', GameMode.SADISTIC, 2, [], bd('4e26')),
    new Wish(218, 'iwishIwasstrongerinAdventuremodeVI', 'I wish I was stronger in Adventure mode VI', GameMode.SADISTIC, 10, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]], bd('5e25')),
    new Wish(219, 'iwishIcouldbeatupmoreBossesVIII', 'I wish I could beat up more Bosses VIII', GameMode.SADISTIC, 20, [[Stat.ATTACK, 100], [Stat.DEFENSE, 100]], bd('1.8e26')),
    new Wish(220, 'iwishIhadBEEFYcardsII', 'I wish I had BEEFY cards II', GameMode.SADISTIC, 1, [], bd('1e26')),
    new Wish(221, 'iwishIdidnthaveWIMPYcardsII', 'I wish I didn\'t have WIMPY cards II', GameMode.SADISTIC, 1, [], bd('1e26')),
    new Wish(222, 'iwishImadeMayofasterV', 'I wish I made Mayo Faster V', GameMode.SADISTIC, 10, [[Stat.MAYO_SPEED, 0.3]], bd('8e25')),
    new Wish(223, 'iwishCardsSpawnedFasterV', 'I wish Cards Spawned Faster V', GameMode.SADISTIC, 10, [[Stat.CARD_SPEED, 0.3]], bd('8e25')),
    new Wish(224, 'iwishImadeMayofasterVI', 'I wish I made Mayo Faster VI', GameMode.SADISTIC, 10, [[Stat.MAYO_SPEED, 0.3]], bd('1e27')),
    new Wish(225, 'iwishCardsSpawnedFasterVI', 'I wish Cards Spawned Faster VI', GameMode.SADISTIC, 10, [[Stat.CARD_SPEED, 0.3]], bd('1e27')),
    new Wish(226, 'iwishIwasstrongerinAdventuremodeVI(part2)', 'I wish I was stronger in Adventure mode VI (part 2)', GameMode.SADISTIC, 10, [[Stat.POWER, 1], [Stat.TOUGHNESS, 1], [Stat.HEALTH, 1], [Stat.REGEN, 1]], bd('330e24')),
    new Wish(227, 'iwishIhadBEEFYCardsIII', 'I wish I had BEEFY Cards III', GameMode.SADISTIC, 2, [], bd('3.8e26')),
    new Wish(228, 'iwishIdidnthaveWIMPYcardsIII', 'I wish I didn\'t have WIMPY cards III', GameMode.SADISTIC, 2, [], bd('350e24')),
    new Wish(229, 'iwishmychonkerswereCHONKIER', 'I wish my chonkers were CHONKIER', GameMode.SADISTIC, 5, [], bd('3.4e26')),
    new Wish(230, 'iwishmychonkerswereLESSNOTCHONKIER', 'I wish my chonkers were LESS NOT CHONKIER', GameMode.SADISTIC, 5, [], bd('370e24')),
]

export var WISHES = new ResourceContainer(WISHLIST);