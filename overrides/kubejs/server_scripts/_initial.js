// priority: 9999
//! This script loads first before the other startup scripts
// put your util or patches here so that you can access them at other scripts

// see quest_scripts.js
const cake_reset_time = 60; // in seconds

/**
 * helper for compressing/decompress crafting
 * @param {Internal.RecipesEventJS_} ev
 * @param {OutputItem_} output output
 * @param {InputItem_} input input
 * @param {boolean} make_uncompacting make uncompacting recipie (default true)
 * @returns {Internal.RecipeTypeFunction}
 */
const comapcting = (ev, output, input, make_uncompacting) => {
	// kubejs doesnt support nullish coalescing :(
	if (make_uncompacting === undefined || make_uncompacting === null) {
		make_uncompacting = true;
	}

	if (make_uncompacting) ev.shapeless(`9x ${input}`, [output]);

	return ev.shaped(output, [
		'aaa',
		'aaa',
		'aaa'
	], { a: input });
}

/**
 * shrimple helper for alloy smelter recipies
 * @param {Internal.RecipesEventJS_} ev
 * @param {InputItem_} inputA
 * @param {InputItem_} inputB
 * @param {OutputItem_} output
 * @param {number} time in seconds
 * @param {number} voltage
 */
const alloySmelter = (ev, inputA, inputB, output, time, voltage) => {
	ev.recipes.gtceu.alloy_smelter(`nomi:generated_${Item.of(output).idLocation.path}_${Item.of(inputA).idLocation.path}_${Item.of(inputB).idLocation.path}`)
		.itemInputs(inputA, inputB)
		.itemOutputs(output)
		.duration(time * 20)
		.EUt(voltage)
}

//Java Classes
//used to create FluidIngredientJS objects
const JSONObject = Java.loadClass('com.google.gson.JsonObject')
//Required to use fluid tags in gregtech recipes
const FluidIngredientJS = Java.loadClass('com.gregtechceu.gtceu.integration.kjs.recipe.components.GTRecipeComponents$FluidIngredientJS')

// Tier enums for easier data handling
const TIER_ULV = 0; // ulv
const TIER_LV = 1;
const TIER_MV = 2;
const TIER_HV = 3;
const TIER_EV = 4;
const TIER_IV = 5;
const TIER_LUV = 6;
const TIER_ZPM = 7;
const TIER_UV = 8;
const TIER_UHV = 9;
const TIER_ID_MAPPING = [
	'ULV', 'LV', 'MV', 'HV', 'EV', 'IV', 'LuV', 'ZPM', 'UV', 'UHV'
]