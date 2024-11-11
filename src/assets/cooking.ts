import { bd, greaterThan } from "@/helpers/numbers";
import bigDecimal from "js-big-decimal";
import { GameMode } from "./mode";
import Resource, { ResourceContainer } from "./resource";


export class Dish extends Resource {
    pairs : Ingredient[][]
    pairTargets : number[]
    constructor(id: number, key: string, name: string) {
        super(id, key, name, GameMode.ALL, 0, [])
        this.pairs = []
        this.pairTargets = []
    }

    importStats(data : any) {
        var ing1Data = data.ingredients[data.pair1[0]]
        var ing2Data = data.ingredients[data.pair1[1]]
        var ing3Data = data.ingredients[data.pair2[0]]
        var ing4Data = data.ingredients[data.pair2[1]]
        var ing5Data = data.ingredients[data.pair3[0]]
        var ing6Data = data.ingredients[data.pair3[1]]
        var ing7Data = data.ingredients[data.pair4[0]]
        var ing8Data = data.ingredients[data.pair4[1]]

        var ing1 = INGREDIENTS[ing1Data.propertyIndex]
        var ing2 = INGREDIENTS[ing2Data.propertyIndex]
        var ing3 = INGREDIENTS[ing3Data.propertyIndex]
        var ing4 = INGREDIENTS[ing4Data.propertyIndex]
        var ing5 = INGREDIENTS[ing5Data.propertyIndex]
        var ing6 = INGREDIENTS[ing6Data.propertyIndex]
        var ing7 = INGREDIENTS[ing7Data.propertyIndex]
        var ing8 = INGREDIENTS[ing8Data.propertyIndex]

        ing1.importStats(ing1Data)
        ing2.importStats(ing2Data)
        ing3.importStats(ing3Data)
        ing4.importStats(ing4Data)
        ing5.importStats(ing5Data)
        ing6.importStats(ing6Data)
        ing7.importStats(ing7Data)
        ing8.importStats(ing8Data)


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
    }

    makeOptimal() {
        var optimalScores : number[][] = this.getOptimalScore()
        for(var i in optimalScores) {
            for(var j in optimalScores[i]) {
                this.pairs[i][j].level = optimalScores[i][j]
            }
        }
    }

    getOptimalScore() : number[][]{
        var maxPairs : number[][] = []
        for(var i in this.pairs) {
            var maxScore = bd(0)
            var maxPair = [0,0]
            var ing1 = this.pairs[i][0]
            var ing2 = this.pairs[i][1]
            for(var k = 0; k < 21; k++) {
                ing1.level = k
                for(var j = 0; j < 21; j++) {
                    ing2.level = j
                    var score = this.getScore(ing1, ing2, this.pairTargets[i])
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
        var sum = bd(0)
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
            (1 - 0.03 * Math.abs(pairTarget - (ing1.level + ing2.level))) ** 30
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
    constructor(id: number, key: string, name: string, suffix: string = '', increment : number = 1) {
        super(id, key, name, GameMode.ALL, 0, [])
        this.weight = 0
        this.pairedWeight = 0
        this.isUnlocked = false
        this.targetLvl = 0
        this.increment = increment
        this.suffix = suffix
    }
    importStats(data : any) {
        this.targetLvl = data.targetLevel
        this.weight = data.weight
        this.pairedWeight = data.pairedWeight
        this.isUnlocked = (data.unlocked == 1)
    }
}


export const DISHLIST = [
    new Dish(1, 'unknown', 'Unknown'),
    new Dish(2, 'beansOnToast', 'Beans On Toast'),
    new Dish(3, 'unknown', 'Unknown'),
    new Dish(4, 'unknown', 'Unknown'),
    new Dish(5, 'unknown', 'Unknown'),
    new Dish(6, 'unknown', 'Unknown'),
    new Dish(7, 'unknown', 'Unknown'),
    new Dish(8, 'gogt', 'Gogt'),
    new Dish(9, 'unknown', 'Unknown'),
    new Dish(10, 'unknown', 'Unknown'),
    new Dish(11, 'unknown', 'Unknown'),
    new Dish(12, 'unknown', 'Unknown'),
    new Dish(13, 'anEntireMerryGoRound', 'An Entire Merry-Go-Round'),
    new Dish(14, 'unknown', 'Unknown'),
    new Dish(15, 'unknown', 'Unknown'),
    new Dish(16, 'unknown', 'Unknown'),
    new Dish(17, 'unknown', 'Unknown'),
    new Dish(18, 'unknown', 'Unknown'),
    new Dish(19, 'unknown', 'Unknown'),
    new Dish(20, 'unknown', 'Unknown'),
]


export const INGREDIENTLIST = [
    new Ingredient(0, 'unknown0', 'Unknown'),
    new Ingredient(1, 'lobster', 'Lobster', 'Kg'),
    new Ingredient(2, 'toothpaste', 'Toothpaste'),
    new Ingredient(3, 'unknown3', 'Unknown'),
    new Ingredient(4, 'unknown4', 'Unknown'),
    new Ingredient(5, 'snakeOil', 'Snake Oil', 'Bottle'),
    new Ingredient(6, 'unknown6', 'Unknown'),
    new Ingredient(7, 'unknown7', 'Unknown'),
    new Ingredient(8, 'tomato', 'Tomato'),
    new Ingredient(9, 'carrot', 'Carrot', 'Carats'),
    new Ingredient(10, 'unknown10', 'Unknown'),
    new Ingredient(11, 'unknown11', 'Unknown'),
    new Ingredient(12, 'unknown12', 'Unknown'),
    new Ingredient(13, 'unknown13', 'Unknown'),
    new Ingredient(14, 'unknown14', 'Unknown'),
    new Ingredient(15, 'unknown15', 'Unknown'),
    new Ingredient(16, 'unknown16', 'Unknown'),
    new Ingredient(17, 'candyCanes', 'Candy Canes'),
    new Ingredient(18, 'unknown18', 'Unknown'),
    new Ingredient(19, 'coffeeGrounds', 'Coffee Grounds', 'Tbsp'),
]

export var DISHES = new ResourceContainer(DISHLIST);
export var INGREDIENTS = new ResourceContainer(INGREDIENTLIST);
