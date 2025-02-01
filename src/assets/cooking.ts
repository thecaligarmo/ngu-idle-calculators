import { bd, greaterThan } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";

export class Dish extends Resource {
    pairs : Ingredient[][]
    pairTargets : number[]
    ingredientsOrder : number[]
    ingToPairMap : {[key : number] : number[]}
    constructor(id: number, key: string, name: string) {
        super(id, key, name, GameMode.ALL, 0, [])
        this.pairs = []
        this.pairTargets = []
        this.ingredientsOrder = []
        this.ingToPairMap = {}
    }

    //eslint-disable-next-line
    importStats(data : any) {
        const ing1Data = data.ingredients[data.pair1[0]]
        const ing2Data = data.ingredients[data.pair1[1]]
        const ing3Data = data.ingredients[data.pair2[0]]
        const ing4Data = data.ingredients[data.pair2[1]]
        const ing5Data = data.ingredients[data.pair3[0]]
        const ing6Data = data.ingredients[data.pair3[1]]
        const ing7Data = data.ingredients[data.pair4[0]]
        const ing8Data = data.ingredients[data.pair4[1]]

        const ing1 = INGREDIENTS[ing1Data.propertyIndex]
        const ing2 = INGREDIENTS[ing2Data.propertyIndex]
        const ing3 = INGREDIENTS[ing3Data.propertyIndex]
        const ing4 = INGREDIENTS[ing4Data.propertyIndex]
        const ing5 = INGREDIENTS[ing5Data.propertyIndex]
        const ing6 = INGREDIENTS[ing6Data.propertyIndex]
        const ing7 = INGREDIENTS[ing7Data.propertyIndex]
        const ing8 = INGREDIENTS[ing8Data.propertyIndex]

        ing1.importStats(ing1Data)
        ing2.importStats(ing2Data)
        ing3.importStats(ing3Data)
        ing4.importStats(ing4Data)
        ing5.importStats(ing5Data)
        ing6.importStats(ing6Data)
        ing7.importStats(ing7Data)
        ing8.importStats(ing8Data)

        
        this.ingredientsOrder = [
            data.ingredients[0].propertyIndex,
            data.ingredients[1].propertyIndex,
            data.ingredients[2].propertyIndex,
            data.ingredients[3].propertyIndex,
            data.ingredients[4].propertyIndex,
            data.ingredients[5].propertyIndex,
            data.ingredients[6].propertyIndex,
            data.ingredients[7].propertyIndex,
        ]

        this.ingToPairMap = {
            [ing1Data.propertyIndex] : [0,0],
            [ing2Data.propertyIndex] : [0,1],
            [ing3Data.propertyIndex] : [1,0],
            [ing4Data.propertyIndex] : [1,1],
            [ing5Data.propertyIndex] : [2,0],
            [ing6Data.propertyIndex] : [2,1],
            [ing7Data.propertyIndex] : [3,0],
            [ing8Data.propertyIndex] : [3,1],
        }

        this.pairs = [
            [ing1, ing2],
            [ing3, ing4],
            [ing5, ing6],
            [ing7, ing8],
        ]
        this.pairTargets = [
            data.pair1Target,
            data.pair2Target,
            data.pair3Target,
            data.pair4Target
        ]

        this.makeOptimal()
    }

    orderedIngredients() : Ingredient[]{
        const ings : Ingredient[] = []
        for(const i of this.ingredientsOrder) {
            ings.push(this.pairs[this.ingToPairMap[i][0]][this.ingToPairMap[i][1]])
        }
        return ings
    }

    makeOptimal() {
        const optimalScores : number[][] = this.getOptimalScore()
        for(const i in optimalScores) {
            this.pairs[i][0].level = optimalScores[i][0]
            this.pairs[i][1].level = optimalScores[i][1]
            this.pairs[i][0].altLevel = this.pairs[i][1].isUnlocked ? optimalScores[i][1] : optimalScores[i][0]
            this.pairs[i][1].altLevel = this.pairs[i][0].isUnlocked ? optimalScores[i][0] : optimalScores[i][1]
            this.pairs[i][0].altUnlocked = this.pairs[i][1].isUnlocked
            this.pairs[i][1].altUnlocked = this.pairs[i][0].isUnlocked
        }
    }

    getOptimalScore() : number[][]{
        const maxPairs : number[][] = []
        for(const i in this.pairs) {
            let maxScore = bd(0)
            let maxPair = [0,0]
            const ing1 = this.pairs[i][0]
            const ing2 = this.pairs[i][1]
            for(let k = 0; k < 21; k++) {
                ing1.level = k
                ing2.altLevel = k
                for(let j = 0; j < 21; j++) {
                    ing2.level = j
                    ing1.altLevel = j
                    const score = this.getScore(ing1, ing2, this.pairTargets[i])
                    if(greaterThan(score, maxScore)) {
                        maxScore = score
                        maxPair = [k, j]
                    }
                }
            }
            maxPairs.push(maxPair)
        }
        return maxPairs
    }

    getScore(ing1: Ingredient, ing2 : Ingredient, pairTarget : number) : bigDecimal {
        let sum = bd(0)
        if (ing1.isUnlocked) {
            sum = sum
                    .add(this.singleScore(ing1, ing1))
                    .add(this.singleScore(ing2, ing1))
        }
        if (ing2.isUnlocked) {
            sum = sum
                    .add(this.singleScore(ing1, ing2))
                    .add(this.singleScore(ing2, ing2))
            if (ing1.isUnlocked) {
                sum = sum.add(this.pairScore(ing1, ing2, pairTarget))
            }
        }
        return sum
    }

    singleScore(ing1 : Ingredient, ing2 : Ingredient) : bigDecimal {
        return bd(
            (1 - 0.03 * Math.abs(ing1.targetLvl - ing2.level)) ** 30
        ).multiply(bd(ing1.weight))
    }
    pairScore(ing1 : Ingredient, ing2 :  Ingredient, pairTarget : number) : bigDecimal {
        return bd(
            (1 - 0.02 * Math.abs(pairTarget - (ing1.level + ing2.level))) ** 40
        ).multiply(bd(ing1.pairedWeight))
    }
}



export class Ingredient extends Resource {
    weight : number
    pairedWeight : number
    isUnlocked : boolean
    targetLvl : number
    increment : number
    suffix: string
    altLevel : number
    altUnlocked : boolean
    constructor(id: number, key: string, name: string, suffix: string = '', increment : number = 1) {
        super(id, key, name, GameMode.ALL, 0, [])
        this.weight = 0
        this.pairedWeight = 0
        this.isUnlocked = false
        this.targetLvl = 0
        this.increment = increment
        this.suffix = suffix
        this.altLevel = 0
        this.altUnlocked = false
    }
    // eslint-disable-next-line
    importStats(data : any) {
        this.targetLvl = data.targetLevel
        this.weight = data.weight
        this.pairedWeight = data.pairedWeight
        this.isUnlocked = (data.unlocked == 1)
    }

    amount() {
        return (this.level * this.increment).toString() + " " + this.suffix
    }

    altAmount() {
        return this.altUnlocked ? (this.altLevel * this.increment).toString() + " " + this.suffix : ""
    }
}


export const DISHLIST = [
    new Dish(0, 'aRock', 'A Rock'),
    new Dish(1, 'applePie', 'Apple Pie'),
    new Dish(2, 'beansOnToast', 'Beans On Toast'),
    new Dish(3, 'chocolateFondue', 'Chocolate Fondue'),
    new Dish(4, 'eastDakota', 'East Dakota'),
    new Dish(5, 'filetMignon', 'Filet Mignon'),
    new Dish(6, 'friedCockroach', 'Fried Cockroach'),
    new Dish(7, 'fruitBowl', 'Fruit Bowl'),
    new Dish(8, 'gagh', 'Gagh'),
    new Dish(9, 'jello', 'Jello'),
    new Dish(10, 'kebabs', 'Kebabs'),
    new Dish(11, 'korftDenner', 'Korft Denner'),
    new Dish(12, 'macguffinStew', 'MacGuffin Stew'),
    new Dish(13, 'anEntireMerryGoRound', 'An Entire Merry-Go-Round'),
    new Dish(14, 'anMRE', 'An MRE'),
    new Dish(15, 'nutripaste', 'Nutri-paste'),
    new Dish(16, 'aPieishCakeishThing', 'A Pie-ish, Cake-ish Thing'),
    new Dish(17, 'ramenNoodles', 'Ramen Noodles'),
    new Dish(18, 'i', 'i'),
    new Dish(19, 'sushi', 'Sushi'),
]


export const INGREDIENTLIST = [
    new Ingredient(0, 'hotSauce', 'Hot Sauce', 'ml', 50),
    new Ingredient(1, 'lobster', 'Lobster', 'Kg'),
    new Ingredient(2, 'toothpaste', 'Toothpaste', 'Tubes'),
    new Ingredient(3, 'rice', 'Rice', 'Cups', 2),
    new Ingredient(4, 'malk', 'MALK', 'Cartons'),
    new Ingredient(5, 'snakeOil', 'Snake Oil', 'Bottle'),
    new Ingredient(6, 'mysteryMeat', 'Mystery Meat', 'Handfuls'),
    new Ingredient(7, 'aPretzel', 'A Pretzel', 'Pretzel'),
    new Ingredient(8, 'candyCanes', 'Candy Canes', 'Canes'),
    new Ingredient(9, 'carrot', 'Carrot', 'Carats'),
    new Ingredient(10, 'cocnutMilk', 'Coconut Milk', 'ml', 50),
    new Ingredient(11, 'drySpaghetti', 'Dry Spaghetti', 'Handfuls'),
    new Ingredient(12, 'eggs', 'Eggs', 'Egg'),
    new Ingredient(13, 'flour', 'Flour', 'Cups'),
    new Ingredient(14, 'garlic', 'Garlic', 'Cloves'),
    new Ingredient(15, 'lemonJuice', 'Lemon Juice', 'ml', 50),
    new Ingredient(16, 'onion', 'Onion', 'Onions'),
    new Ingredient(17, 'tomato', 'Tomato', 'Tomatoes'),
    new Ingredient(18, 'bread', 'Bread', 'Loaves'),
    new Ingredient(19, 'coffeeGrounds', 'Coffee Grounds', 'Tbsp'),
]

export const DISHES = new ResourceContainer(DISHLIST);
export const INGREDIENTS = new ResourceContainer(INGREDIENTLIST);
