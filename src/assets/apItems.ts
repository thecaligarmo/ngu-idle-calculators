import { Stat } from "./stat"
import Resource, { ResourceContainer } from "./resource"
import { GameMode } from "./mode";

export class APItem extends Resource {}


// TODO - Add AP Items
export const APITEMLIST = [
    new APItem(0, 'energyPotionA', 'Energy Potion α', GameMode.ALL, 0, [[Stat.ENERGY_POWER, 200]]),
    new APItem(1, 'energyPotionB', 'Energy Potion β', GameMode.ALL, 0, [[Stat.ENERGY_POWER, 200]]),
    new APItem(2, 'energyPotionD', 'Energy Potion δ', GameMode.ALL, 0, [[Stat.ENERGY_POWER, 200]]),
    new APItem(3, 'magicPotionA', 'Magic Potion α', GameMode.ALL, 0, [[Stat.MAGIC_POWER, 200]]),
    new APItem(4, 'magicPotionB', 'Magic Potion β', GameMode.ALL, 0, [[Stat.MAGIC_POWER, 200]]),
    new APItem(5, 'magicPotionD', 'Magic Potion δ', GameMode.ALL, 0, [[Stat.MAGIC_POWER, 200]]),
    // new APItem(6, 'Resource 3 Potion α', Triples your [[Resource 3]] power for 60 minutes, even if you rebirth multiple times. Stacks with Resource 3 Potion β.);
    // new APItem(7, 'Resource 3 Potion β', Doubles your Resource 3 power forever, but is lost upon rebirth. Stacks with Resource 3 Potion α.);
    // new APItem(8, 'Resource 3 Potion δ', Triples your Resource 3 power for 1 day, even if you rebirth multiple times. Adds to the Resource Potion α timer.);
    // new APItem(9, 'Energy Bar Bar', Doubles your Energy bars for 60 minutes, even if you rebirth multiple times.);
    // new APItem(10, 'Magic Bar Bar', Doubles your Magic bars for 60 minutes, even if you rebirth multiple times.);
    // new APItem(11 'MacGuffin Muffin', Doubles the bonus you get from [[MacGuffin Fragments|MacGuffins]] when you rebirth for 24 hours. Applies for at least one rebirth, even if it's past 24 hours.);
    // new APItem(12, ' Icarus Proudbottom's Homemade Fertilizer', 50% bonus when harvesting or eating a fruit from [[Yggdrasil]]. Each pile lasts for 1 fruit.);
    // new APItem(13, 'Little Blue Pill', Doubles your [[PP]] gain from [[ITOPOD]]. Each pill last for one kill.);
    // new APItem(14, 'Beast Butter', Doubles your [[QP]] reward on your next [[Questing|quest]].);
    // new APItem(15, 'Lucky Charm', Doubles your Adventure [[Drop Chance]] for 30 minutes, even if you rebirth multiple times. Stacks with other Looting effects.);
    // new APItem(16, 'Super Lucky Charm', Doubles your Adventure Drop Chance for 12 hours, even if you rebirth multiple times. Stacks with other Looting effects.);
    // new APItem(17, 'Mayo Infuser', Doubles Mayo generation speed for 24 hours. Affects Fruit reward.);
    // new APItem(18, 'Regular Black Pens', Adds 2 tiers to the next card spawned. Cannot be turned off.);
    // new APItem(19, 'Improved Loot Filter', Buy this to use the [[Item List]] as a customized loot filter! You'll be able to click items in the list to filter them individually!);
    // new APItem(20, 'Extra Inventory Space', Adds a new inventory slot. Can be purchased multiple times, for a maximum of 166 extra slots.);
    // new APItem(21, '1/2 Auto Merge and Boost Timers!', Buy this for a 50% time reduction on Auto Boost and Auto Merge!);
    // new APItem(22, 'Insta Training Cap', This upgrade will assign 6 energy, 1 for each [[training]], almost immediately into each rebirth.);
    // new APItem(23, 'Custom Energy/Magic % Buttons', Unlocks one set of custom % buttons for Energy and Magic inputs! These work like the other custom buttons, but they output a % of your total cap.);
    // new APItem(24, 'More Custom Energy/Magic % Buttons', Unlocks another set of custom % buttons for Energy and Magic inputs! These work like the other custom buttons, but they output a % of your total cap.);
    // new APItem(25, ' Yggdrasil Harvest Light', Buy this to have the [[Yggdrasil]] menu light up when fruit is fully grown and ready to be eaten of harvested.);
    // new APItem(26, '7-Day Time Bank for Daily Spin!', Buy this to extend the maximum time banked by the [[Daily Spin|daily spin]] system from 36 hours to 7 days.);
    // new APItem(27, '[[Inventory#Loadouts|Loadout]] Slot!', Max Purchases: 7);
    // new APItem(28, 'An Extra Beard Slot!', );
    // new APItem(29, 'Filter Boosts into Infinity Cube!', Buy this to have filtered boosts get merged into your [[Infinity Cube]] ! However boosts applied this way will not be recycled.);
    // new APItem(30, 'Lazy ITOPOD Floor Shifter', This will check your optimal floor in the [[ITOPOD|I.T.O.P.O.D]]  after each kill, and adjust the floor you're on automatically. <ref>Enables the "Lazy ITOPOD Floor Shifter" option in the settings (page two, "Spaghettings" section).<br />Note that the floor adjustments are limited to your "max floor", and your "max floor" will still need to be leveled-up manually.</ref>);
    // new APItem(31, 'Extra Accessory Slot!', Adds 1 [[Adventure Mode Equipment|accessory]] slot);
    // new APItem(0, 'Daycare Speed Boost!', Items in the [[Item Daycare|Daycare]] will gain levels 10% faster.);
    // new APItem(0, 'Another Extra Accessory Slot!', Adds 1 accessory slot (again) (again?));
    // new APItem(0, 'Digger Slots!', );
    // new APItem(0, 'A MacGuffin Slot!', );
    // new APItem(0, 'Quest Reminder!', This will make the Questing Menu button light up when you have a Quest ready to hand in.);
    // new APItem(0, 'Faster Questing!', Gain Major [[Questing|Quests]] 20% faster.);
    // new APItem(0, 'Extended Quest Bank', Increase your Major Quests cap from 10 to 50.);
    // new APItem(0, 'Another Extra Accessory Slot!', Adds  another 1 accessory slot (again));
    // new APItem(0, 'Custom Idle Energy/Magic % Buttons!', Unlocks a set of custom % buttons for idle Energy and Magic inputs! These work like the other custom buttons, but they output a % of your total idle Energy or Magic.);
    // new APItem(0, 'Auto Nuker', This will automatically nuke [[Boss Fights|bosses]] 10 seconds into each rebirth, and then every minute afterwards.);
    // new APItem(0, 'Yet Another Extra Accessory Slot!', Adds 1 accessory slot (Trust me, you need them all));
    // new APItem(0, 'NGU Cap Modifier', Unlocks a setting to modify the % of cap gets input when you click the NGU cap button.);
    // new APItem(0, 'Daycare Kitty Art!', Unlocks several new designs of the [[Daycare Kitty]]! You can click the Kitty to cycle through all of your unlocked Art. <ref name=":1">Only affects the appearance.</ref>);
    // new APItem(0, 'Custom Resource 3 % Button!', Unlock a custom Cap % button for [[Resource 3]] !);
    // new APItem(0, 'Another Custom Resource 3 % Button!', Unlock another custom Cap % button for Resource 3!);
    // new APItem(0, 'Custom Idle Resource 3 % Button!', Unlock a custom Idle % button for Resource 3!);
    // new APItem(0, '[[Resource 3 Name Randomizer]]', Unlocks a setting which will randomize the name of your Resource 3 every time you rebirth. It'll pick from a pool of over [[Resource 3 Name Randomizer|200 names]]! <ref name=":1" />);
    // new APItem(0, 'Faster Wishes', Gain 25% faster Wishes!);
    // new APItem(0, 'Inventory Merge Slots', Unlocks an extra inventory [[Adventure Mode Equipment#Automerge slots|merge slot]]!);
    // new APItem(0, 'Adventure Light', The Adventure button will light up when in a safe zone);
    // new APItem(0, 'Adventure Advancer', Advances you to the furthest normal zone you can reach at the 20s mark of a rebirth.);
    // new APItem(0, ''Go To Quest Zone' Button', Unlocks a 'Go To Quest Zone' button which will send you to whatever Adventure Zone your Quest is on.);
    // new APItem(0, ' An Evil Accessory Slot', It's like a regular Accessory slot, but I arbitrarily locked buying this until you're in Evil difficulty.);
    // new APItem(0, 'Extra Deck Size!', Unlock extra Deck size with this, to hold more lovely [[Cards]]! Max purchases: 50);
    // new APItem(0, 'Mayo Generator', Allows you to run another Mayo generator simultaneously! Also buffs your Mayo Generation speed by 2% per slot. Max purchases: 2);
    // new APItem(0, 'Extra Tag Slot!', Unlock an extra tag Slot for Cards - ensuring you get more of the Cards that you like!);
    // new APItem(0, 'Extra Accessory Slot', This is it - the last and most sellout-y Accessory slot. There's no more for AP after this, I'm out, I'm DONE.);
    // new APItem(0, '[[My Red Heart|My Red Heart &lt;3]]', When this heart reaches 100, you will gain the full [[Experience|EXP]] bonus (10%) this heart provides without needing it equipped.);
    // new APItem(0, '[[My Yellow Heart|My Yellow Heart &lt;3]]', When this heart reaches 100, you will gain the full [[AP]] bonus (20%) this heart provides without needing it equipped.);
    // new APItem(0, '[[My Brown Heart|My Brown Heart &lt;3]]', When this heart reaches 100, every 10th [[Yggdrasil#Icarus_Proudbottom.27s.C2.A0Homemade_Fertilizer_.28AKA_Poop.29|poop]] applied to a fruit doesn't consume poop!);
    // new APItem(0, '[[My Green Heart|My Green Heart &lt;3]]', When this heart reaches 100, you will earn [[Perk Points]] 20% faster in the ITOPOD.);
    // new APItem(0, '[[My Blue Heart|My Blue Heart &lt;3]]', When this heart reaches 100, all [[4G's Sellout Shop#Boosts|consumables]] will have their effects improved by 10%.);
    // new APItem(0, '[[My Purple Heart|My Purple Heart &lt;3]]', When this heart reaches 100, [[MacGuffin Fragments|MacGuffins]] will drop 20% more often.);
    // new APItem(0, '[[My Orange Heart|My Orange Heart &lt;3]]', When this heart reaches 100, [[Questing|Quests]] will earn 20% more QP.);
    // new APItem(0, '[[My Grey Heart|My Grey Heart &lt;3]]', When this heart reaches 100, [[Hacks]] will be 25% faster.);
    // new APItem(0, '[[My Pink Heart|My Pink Heart &lt;3]]', When this heart reaches 100, you will gain a [[Wishes|Wish]] Slot.);
    // new APItem(0, '[[My Rainbow Heart|My Rainbow Heart &lt;3]]', When this heart reaches 100, you will gain +10% [[Cards|Card]] and Mayo generation speed.);
    // new APItem(0, '200 EXP!', Gives you 200 [[EXP]] to use in the EXP menu);
    // new APItem(0, '500 EXP!', Gives you 500 EXP to use in the EXP menu);
    // new APItem(0, '2000 EXP!', Gives you 2000 EXP to use in the EXP menu);
    // new APItem(0, ' 25 PP!', Gives you 25 [[PP]] to use in the I.T.O.P.O.D Perks menu);
    // new APItem(0, '100 PP!', Gives you 100 PP to use in the I.T.O.P.O.D Perks menu);
    // new APItem(0, '500 PP!', Gives you 500 PP to use in the I.T.O.P.O.D Perks menu);
];

export var APITEMS = new ResourceContainer(APITEMLIST);