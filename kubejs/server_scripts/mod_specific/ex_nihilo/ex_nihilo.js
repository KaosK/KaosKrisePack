// priority: 5
onEvent(`recipes`, e => {
  const exDust = `exnihilosequentia:dust`
  const exRack = `exnihilosequentia:crushed_netherrack`
  const exEnd = `exnihilosequentia:crushed_end_stone`

  function sieve(mesh, chance, input, result, wlog) {
    e.custom({
      type: `exnihilosequentia:sieve`,
      rolls: [{
        chance: chance,
        mesh: mesh
      }],
      input: Ingredient.of(input).toJson(),
      result: Item.of(result).toResultJson(),
      waterlogged: wlog
    })
  }

  function hammer(input, result) {
    e.custom({
      type: `exnihilosequentia:hammer`,
      input: Ingredient.of(input).toJson(),
      results: [Item.of(result).toResultJson()]
    })
  }

  function fluidItem(fluid, input, result) {
    e.custom({
      type: `exnihilosequentia:fluid_item`,
      fluid: Fluid.of(fluid).toJson(),
      input: Ingredient.of(input).toJson(),
      result: Item.of(result).toResultJson()
    })
  }

  function heat(block, heat) {
    e.custom({
      type: `exnihilosequentia:heat`,
      block: block,
      amount: heat
    })
  }

  function hhammer(input, output, count) {
    e.custom({
      type: `exnihilosequentia:hammer`,
      input: Ingredient.of(input).toJson(),
      results: [Item.of(output).withCount(count).toResultJson()]
    })
  }

  function crushEm(result, crush) {
    e.recipes.mekanism.crushing(Item.of(result), crush)
    e.recipes.thermal.pulverizer(Item.of(result), crush)
    e.recipes.immersiveengineering.crusher(Item.of(result), crush)
    e.recipes.create.milling(Item.of(result), Item.of(crush))
  }

  //Crucible heating blocks
  // heat(`botania:blaze_block`, 8)
  heat('immersiveengineering:storage_uranium', 20)
  heat('mekanism:superheating_element', 60)
  // heat('projecte:dark_matter_block', 100)

  //Params: Mesh, Drop chance, Input item, Output item, Waterlogged.
  //Overworld sieve
  sieve(`diamond`, 0.2, `#minecraft:sand`, 'powah:uraninite_raw', null) 
  sieve(`iron`, 0.25, `minecraft:sand`, `minecraft:ink_sac`, true)

  //Basalt
  sieve(`netherite`, 0.2, 'minecraft:basalt', 'ae2:sky_dust', null)
  sieve(`netherite`, 0.2, 'minecraft:basalt', 'minecraft:amethyst_shard', null)
  sieve(`netherite`, 0.35, 'minecraft:basalt', 'fluxnetworks:flux_dust', null)

  //Oak Leaves
  sieve(`flint`, 0.3, '#minecraft:leaves', 'myrtrees:rubberwood_sapling', null)

  //Nether sieve
  sieve(`diamond`, 0.15, exRack, `create:rose_quartz`, null)
  // sieve(`diamond`, 0.2, exRack, `kubejs:cobalt_pieces`, null)
  sieve(`netherite`, 0.15, exRack, `ae2:certus_quartz_crystal`, null)
  sieve(`iron`, 0.2, exRack, `minecraft:quartz`, null)

  //End sieve
  sieve(`diamond`, 0.1, exEnd, `minecraft:chorus_flower`, null)

  //Hammer recipes
  hammer(`#minecraft:logs`, `thermal:sawdust`)

  //Heavy hammer
  // hammer(`allthecompressed:cobblestone_block_1x`, `allthecompressed:gravel_block_1x`)
  // hammer(`allthecompressed:gravel_block_1x`, `allthecompressed:sand_block_1x`)
  // hhammer(`allthecompressed:sand_block_1x`, exDust, 9)
  // hhammer(`allthecompressed:netherrack_block_1x`, exRack, 9)
  // hhammer(`allthecompressed:end_stone_block_1x`, exEnd, 9)

  crushEm(exDust, `#minecraft:sand`)
  crushEm(exRack, `#forge:netherrack`)
  crushEm(exEnd, `#forge:end_stones`)

  // Fluid Item Transformation
  // fluidItem(`exnihilosequentia:witch_water`,`mysticalagriculture:soulium_dust`,`mysticalagriculture:soulstone`)

  e.remove({id:`minecraft:ens_ancient_debris`})
  e.remove({id:`/exnihilosequentia:ens_raw/`})
  // e.remove({id:`exnihilomekanism:ens_raw_osmium`})
  e.remove({id:`exnihiloae:sieve/ens_certus_seed`})

  e.replaceInput({id:'exnihilothermal:ens_basalz_doll'},'#forge:dust/obsidian','#forge:dusts/obsidian')

  const pieces = {
    'iron': {'raw':'minecraft','piece':'exnihilosequentia'},
    'gold': {'raw':'minecraft','piece':'exnihilosequentia'},
    'copper': {'raw':'minecraft','piece':'exnihilosequentia'},
    'lead': {'raw':'thermal','piece':'exnihilosequentia'},
    'nickel': {'raw':'thermal','piece':'exnihilosequentia'},
    'silver': {'raw':'thermal','piece':'exnihilosequentia'},
    'tin': {'raw':'thermal','piece':'exnihilosequentia'},
    'aluminum': {'raw':'immersiveengineering','piece':'exnihilosequentia'},
    // 'platinum': {'raw':'alltheores','piece':'exnihilosequentia'},
    'uranium': {'raw':'immersiveengineering','piece':'exnihilosequentia'},
    'zinc': {'raw':'create','piece':'exnihilosequentia'},
    // 'osmium': {'raw':'alltheores','piece':'exnihilomekanism'},
    // 'cobalt': {'raw':'tconstruct','piece':'kubejs'}
  }

  Object.entries(pieces).forEach(([name, mods]) => {
    // 2x2 Table Crafting
    e.shaped(`${mods.raw}:raw_${name}`, [
      `aa`,
      `aa`
    ], {
      a: `${mods.piece}:${name}_pieces`
    }).id(`kubejs:raw_${name}_from_piece`)

    // Thermal Press
    if (Platform.isLoaded('thermal_expansion')) {
      e.custom({
        'type':'thermal:press',
        'ingredients':[
          {'item':`${mods.piece}:${name}_pieces`, 'count':4},
          {'item':'thermal:press_packing_2x2_die'}
        ],
        'result':[{'item':`${mods.raw}:raw_${name}`}],
        'energy':400
      }).id(`kubejs:thermal/press/raw_${name}_from_piece`)
    }

    // IE Press
    if (Platform.isLoaded('immersiveengineering')) {
      e.custom({
        'type':'immersiveengineering:metal_press',
        'mold':'immersiveengineering:mold_packing_4',
        'result':{'item':`${mods.raw}:raw_${name}`},
        'input':{'count':4,'base_ingredient':{'item':`${mods.piece}:${name}_pieces`}},
        'energy':2400
      }).id(`kubejs:immersiveengineering/press/raw_${name}_from_piece`)
    }
  })
})

