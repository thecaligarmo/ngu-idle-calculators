import earlySad from "@/__data__/earlySad1";
import { Dish } from "@/assets/cooking";
import Player from "@/assets/player";
const earlySadPlayer = new Player(false, true);
earlySadPlayer.importPlayerData(earlySad);

describe("Cooking Asset", () => {
    // const cases: [Player][] = [
    //     [earlySadPlayer]
    // ];
    test("Early Sad", () => {
        const dish: Dish = earlySadPlayer.get("dish");
        const ordIng = dish.orderedIngredients();
        const order = ordIng.map((ing) => {
            return ing.id;
        });
        expect(order).toEqual([7, 10, 12, 2, 3, 9, 11, 15]);
        expect(ordIng[1].amount()).toBe("50 ml");
        expect(ordIng[4].altAmount()).toBe("34 Cups");
    });
});
