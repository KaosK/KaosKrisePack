let metals = ['iron', 'gold', 'copper', 'aluminum', 'osmium', 'zinc', 'uranium', 'tin', 'lead', 'silver', 'nickel', 'iridium', 'cobalt']

onEvent('recipes', event => {
    let rawOverride = {
        iron: 'minecraft',
        gold: 'minecraft',
        copper: 'minecraft',
        zinc: 'create',
        aluminum: 'immersiveengineering',
        uranium: 'immersiveengineering',
        cobalt: 'tconstruct',
    }
    metals.forEach(metal => {
        event.custom({
            'type': 'exmachinis:compacting',
            'input': {
                'ingredient': {
                    'tag': `forge:raw_materials/${metal}`
                },
                'count': 9
            },
            'output': { 'item': `${rawOverride[metal] ?? 'thermal'}:raw_${metal}_block` }
        }).id(`kubejs:exmachinis/compacting/storage/raw_${metal}`)
    })
})