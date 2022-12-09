onEvent('recipes', event => {
    event.smithing('ae2:calculation_processor_press', 'kubejs:blank_press', 'ae2:certus_quartz_crystal');
    event.smithing('ae2:engineering_processor_press', 'kubejs:blank_press', 'minecraft:diamond');
    event.smithing('ae2:logic_processor_press', 'kubejs:blank_press', 'minecraft:gold_ingot');
    event.smithing('ae2:silicon_press', 'kubejs:blank_press', 'ae2:silicon');

    event.recipes.createPressing('kubejs:blank_press', 'minecraft:iron_block');
    event.recipes.createHaunting('minecraft:rotten_flesh', '#forge:foods/meat/raw');

})