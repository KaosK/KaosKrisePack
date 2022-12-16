onEvent("recipes", (event) => {
  event.smithing(
    "ae2:calculation_processor_press",
    "kubejs:blank_press",
    "ae2:certus_quartz_crystal"
  );
  event.smithing(
    "ae2:engineering_processor_press",
    "kubejs:blank_press",
    "minecraft:diamond"
  );
  event.smithing(
    "ae2:logic_processor_press",
    "kubejs:blank_press",
    "minecraft:gold_ingot"
  );
  event.smithing("ae2:silicon_press", "kubejs:blank_press", "ae2:silicon");

  event.recipes.createPressing("kubejs:blank_press", "minecraft:iron_block");
  event.recipes.createHaunting(
    "minecraft:rotten_flesh",
    "#forge:foods/meat/raw"
  );

  event.stonecutting(
    "2x buildersaddition:smooth_stone_vertical_slab",
    "minecraft:smooth_stone"
  );
  event.shaped(
    "2x buildersaddition:smooth_stone_vertical_slab",
    ["S", "S", "S"],
    {
      S: "minecraft:smooth_stone",
    }
  );

  event.shaped("minecraft:saddle", [" L ", "LOL", "T T"], {
    L: "minecraft:leather",
    O: "minecraft:lead",
    T: "minecraft:tripwire_hook",
  });

  event.shaped("minecraft:name_tag", [" SI", " PS", "P  "], {
    I: "create:iron_sheet",
    S: "minecraft:string",
    P: "minecraft:paper",
  });

  const thermalMetals = [
    "tin",
    "lead",
    "silver",
    "nickel",
    "bronze",
    "electrum",
    "invar",
    "constantan",
    "signalum",
    "lumium",
    "enderium",
    "steel",
    "rose_gold",
  ];
  const ieMetals = ["aluminum", "uranium"];

  thermalMetals.forEach((metal) => {
    event.recipes.createPressing(
      `thermal:${metal}_plate`,
      `thermal:${metal}_ingot`
    );
  });
  ieMetals.forEach((metal) => {
    event.recipes.createPressing(
      `immersiveengineering:plate_${metal}`,
      `immersiveengineering:ingot_${metal}`
    );
  });
  event.recipes.immersiveengineeringMetalPress(
    "createdeco:cast_iron_sheet",
    "createdeco:cast_iron_ingot",
    "immersiveengineering:mold_plate"
  );
});
