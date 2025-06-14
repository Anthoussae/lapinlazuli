"use strict";
//note to self: most functions that create a new gamestate (reducer actions) will require:

// 1) the function itself
// 2) adding to the action enum.
// 3) adding to the reducer switch statement
// 4) adding to the render function.
// 5) possibly adding to the phase transition handler.

//#region enums
const ENEMY_ABILITIES = Object.freeze({
  INK_DRINK: "inkDrink",
  INCREASE_HEALTH: "increaseHealth",
  HAND_SIZE_REDUCTION: "handSizeReduction",
  ADD_PEBBLES: "addOnePebble",
  ADD_MERCURY: "addTwoMercury",
  ADD_CLUTTER: "addThreeClutter",
  DOWNGRADE_CARDS: "downgradeCards",
});
const DAMAGE_TYPES = Object.freeze({
  BUNNY: "Bunny",
  FIRE: "Fire",
  LIGHTNING: "Lightning",
  POISON: "Poison",
});
const SPECIAL_CARD_SUBTYPES = Object.freeze({
  CURSE: "curse",
  UNIQUE: "unique",
  STATUS: "status",
});
const DIFFICULTIES = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});
const TRIGGER_EVENTS = Object.freeze({
  CARD_PICKUP: "CARD_PICKUP",
  RELIC_PICKUP: "RELIC_PICKUP",
  POTION_PICKUP: "POTION_PICKUP",
  DRINK_POTION: "DRINK_POTION",
  ASSIGN_SHOP_PRICES: "ASSIGN_SHOP_PRICES",
  REST: "REST",
  COMBAT_START: "COMBAT_START",
  POPULATE_PATHS: "POPULATE_PATHS",
  SHUFFLE_GRAVEYARD_INTO_DECK: "SHUFFLE_GRAVEYARD_INTO_DECK",
  PLAY_CARD: "PLAY_CARD",
  CAST_SPELLBOOK: "CAST_SPELLBOOK",
  COMBAT_END: "COMBAT_END",
  DEAL_DAMAGE: "DEAL_DAMAGE",
});
const PATHS = Object.freeze({
  EASY_FIGHT: "Easy Fight",
  MEDIUM_FIGHT: "Medium Fight",
  HARD_FIGHT: "Hard Fight",
  BOSS_FIGHT: "Boss Fight",
  REST: "Rest",
  SHOP: "Shop",
  RELIC_OFFERING: "Relic Offering",
  GEM_OFFERING: "Gem Offering",
  CARD_OFFERING: "Card Offering",
  ENCHANT: "Enchant",
  POTION_OFFERING: "Potion Offering",
  HOARD: "Hoard",
  PURGE: "Purge",
  TRANSMUTE: "Transmute",
});
const SCREENS = Object.freeze({
  MAIN: "main view",
  DECK: "inspect deck",
  SETTINGS: "settings",
  MOD: "modscreen",
  COMBAT_DECK: "combat deck",
  GRAVEYARD: "graveyard",
  EXILE: "exile",
});
const RARITIES = Object.freeze({
  BASIC_POLY: "basic-poly", // basic poly cards, several of which go in the starter deck.
  BASIC_MONO: "basic-mono", // basic mono cards, only one goes in the starter deck.
  COMMON: "common",
  UNCOMMON: "uncommon",
  RARE: "rare",
  MYTHIC: "mythic",
  LEGENDARY: "legendary",
});
const PHASES = Object.freeze({
  MAIN_MENU: "main menu",
  DIFFICULTY_SELECTION: "difficulty selection",
  MYTHIC_RELIC_OFFERING: "mythic relic offering",
  RELIC_OFFERING: "relic offering",
  CARD_OFFERING: "card offering",
  GEM_OFFERING: "gem offering",
  POTION_OFFERING: "potion offering",
  COMBAT_END: "combat end",
  SOCKET_GEM: "socket gem",
  SHOP: "shop",
  PATH_SELECTION: "path selection",
  REST: "rest",
  ENCHANT: "ENCHANT",
  TRANSMUTE: "transmute",
  COMBAT: "combat",
  GAME_OVER: "game over",
  PURGE: "purge",
  HOARD: "hoard",
});
const ACTIONS = Object.freeze({
  NEW_GAME: "NEW_GAME",
  SET_DIFFICULTY: "SET_DIFFICULTY",
  GENERATE_STARTER_DECK: "GENERATE_STARTER_DECK",
  APPLY_DIFFICULTY_MODIFIERS: "APPLY_DIFFICULTY_MODIFIERS",
  ADVANCE_PHASE: "ADVANCE_PHASE",
  LOG_MESSAGE: "LOG_MESSAGE",
  CREATE_CARD_INSTANCE: "CREATE_CARD_INSTANCE",
  POPULATE_RELIC_OFFERINGS: "POPULATE_RELIC_OFFERINGS",
  PICK_RELIC: "PICK_RELIC",
  POPULATE_PATH_OFFERINGS: "POPULATE_PATH_OFFERINGS",
  PICK_PATH: "PICK_PATH",
  POPULATE_CARD_OFFERINGS: "POPULATE_CARD_OFFERINGS",
  PICK_CARD: "PICK_CARD",
  POPULATE_POTION_OFFERINGS: "POPULATE_POTION_OFFERINGS",
  PICK_POTION: "PICK_POTION",
  DRINK_POTION: "DRINK_POTION",
  POPULATE_GEM_OFFERINGS: "POPULATE_GEM_OFFERINGS",
  OPEN_MOD_SCREEN: "OPEN_MOD_SCREEN",
  APPLY_CARD_MOD: "APPLY_CARD_MOD",
  SCREEN_CHANGE: "SCREEN_CHANGE",
  POPULATE_SHOPFRONT: "POPULATE_SHOPFRONT",
  INCREASE_BASE_BUNNIES: "INCREASE_BASE_BUNNIES",
  GAIN_GOLD: "GAIN_GOLD",
  PRACTICE_WANDWORK: "PRACTICE_WANDWORK",
  LOOT_HOARD: "LOOT_HOARD",
  REST: "REST",
  START_TURN: "START_TURN",
  DRAW_CARD: "DRAW_CARD", // triggered when a card is drawn
  PICK_CARD: "PICK_CARD", // triggered when a card is added to your deck
  CLOSE_COMBAT_REWARDS: "CLOSE_COMBAT_REWARDS",
  CLAIM_GOLD_REWARD: "CLAIM_GOLD_REWARD",
  PLAY_CARD: "PLAY_CARD", // triggered when a card is played
  CAST_SPELLBOOK: "CAST_SPELLBOOK", // triggered when the spellbook is cast
  EXIT_SHOP: "EXIT_SHOP",
});
const CARD_TYPES = Object.freeze({
  INSTANT: "instant", // resolves immediately when played, does not go to the spellbook.
  SPELL: "spell", // goes to the spellbook when played, resolves when the spellbook is cast.
  CURSE: "curse", // negative card that can be removed or purged.
  STATUS: "status", // temporary effect card, like a buff or debuff.
});
const REST_OPTIONS = Object.freeze({
  HEAL: "heal",
  PRACTICE: "practice",
  ENCHANT: "enchant",
});
//#endregion enums
//#region data maps
const difficultyModifiersMap = Object.freeze({
  [DIFFICULTIES.EASY]: {
    maxHealthModifier: 100,
    goldModifier: 20,
    basicCardCountModifier: 5,
    luckModifier: 2,
    shopPriceMultiplierModifier: -0.2, // 20% cheaper shop prices
    restHealthRestoreModifier: 30, // heal 30 health when resting
    enemyHealthMultiplierModifier: -0.2, // 20% less health for enemies
  },
  [DIFFICULTIES.MEDIUM]: {
    maxHealthModifier: 75,
    goldModifier: 10,
    basicCardCountModifier: 8,
    luckModifier: 1,
    shopPriceMultiplierModifier: 0, // normal shop prices
    restHealthRestoreModifier: 25, // heal 20 health when resting
    enemyHealthMultiplierModifier: 0,
  },
  [DIFFICULTIES.HARD]: {
    maxHealthModifier: 50,
    goldModifier: 0,
    basicCardCountModifier: 11,
    luckModifier: 0,
    shopPriceMultiplierModifier: 0.2, // 20% more expensive shop prices
    restHealthRestoreModifier: 20, // heal 20 health when resting
    enemyHealthMultiplierModifier: 0.2, // 20% more health for enemies
  },
});
const pathMap = Object.freeze({
  [PATHS.EASY_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
    difficulty: DIFFICULTIES.EASY,
  },
  [PATHS.MEDIUM_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
    difficulty: DIFFICULTIES.MEDIUM,
  },
  [PATHS.HARD_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
    difficulty: DIFFICULTIES.HARD,
  },
  [PATHS.BOSS_FIGHT]: {
    rarity: RARITIES.SPECIAL,
    isFight: true,
    leadsTo: PHASES.COMBAT,
    difficulty: "boss",
  },
  [PATHS.REST]: { rarity: RARITIES.RARE, leadsTo: PHASES.REST },
  [PATHS.SHOP]: { rarity: RARITIES.RARE, leadsTo: PHASES.SHOP },
  [PATHS.RELIC_OFFERING]: {
    rarity: RARITIES.MYTHIC,
    leadsTo: PHASES.RELIC_OFFERING,
  },
  [PATHS.GEM_OFFERING]: { rarity: RARITIES.RARE, leadsTo: PHASES.GEM_OFFERING },
  [PATHS.CARD_OFFERING]: {
    rarity: RARITIES.UNCOMMON,
    leadsTo: PHASES.CARD_OFFERING,
  },
  [PATHS.ENCHANT]: { rarity: RARITIES.RARE, leadsTo: PHASES.ENCHANT },
  [PATHS.POTION_OFFERING]: {
    rarity: RARITIES.RARE,
    leadsTo: PHASES.POTION_OFFERING,
  },
  [PATHS.HOARD]: {
    rarity: RARITIES.MYTHIC,
    leadsTo: PHASES.HOARD,
  },
  [PATHS.PURGE]: { rarity: RARITIES.UNCOMMON, leadsTo: PHASES.PURGE },
  [PATHS.TRANSMUTE]: { rarity: RARITIES.RARE, leadsTo: PHASES.TRANSMUTE },
});
const enemyAbilityDataMap = {
  [ENEMY_ABILITIES.INK_DRINK]: {
    baseValue: 1,
    description: "Reduces player's ink at combat start",
    prefix: "Inkdrinking",
  },
  [ENEMY_ABILITIES.INCREASE_HEALTH]: {
    baseValue: 1.5,
    description: "Increases enemy HP",
    prefix: "Tanky",
  },
  [ENEMY_ABILITIES.HAND_SIZE_REDUCTION]: {
    baseValue: 2,
    description: "Reduces player's hand size at combat start",
    prefix: "Maddening",
  },
  [ENEMY_ABILITIES.ADD_PEBBLES]: {
    baseValue: 1,
    description: "Adds Sisyphus' Pebble to your deck at combat start",
    prefix: "Sisyphean",
  },
  [ENEMY_ABILITIES.ADD_MERCURY]: {
    baseValue: 2,
    description: "Adds Mercury Droplets to your deck at combat start",
    prefix: "Mercurial",
  },
  [ENEMY_ABILITIES.ADD_CLUTTER]: {
    baseValue: 3,
    description: "Adds Clutter cards to your deck at combat start",
    prefix: "Messy",
  },
  [ENEMY_ABILITIES.DOWNGRADE_CARDS]: {
    baseValue: 3,
    description: "Downgrades random cards in your combat deck at combat start",
    prefix: "Withering",
  },
};

//#endregion data maps
//#region data arrays of game objects
const cardList = [
  {
    name: "Bunnymancy",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_POLY,
    inkCost: 1,
    bunnyAdd: 6,
  },
  {
    name: "Bunnyplication",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_POLY,
    inkCost: 1,
    bunnyMult: 2,
  },
  {
    name: "Fairy Gold",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    inkCost: 1,
    goldAdd: 5,
  },
  {
    name: "Enchant Bookshelf",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    inkCost: 1,
    permanentlyUpgradeRandomCardsInDeck: 1,
  },
  {
    name: "Ponder",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.COMMON,
    inkCost: 1,
    cardDraw: 3,
    exileOnCast: true,
  },
  {
    name: "Inkswell",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    inkCost: 1,
    inkAdd: 2,
    exileOnCast: true,
  },
  {
    name: "Cloudfluff Conjuration",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    inkCost: 0,
    bunnyAdd: 6,
  },
  {
    name: "Cloudfluff Boon",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.RARE,
    inkCost: 0,
    bunnyAdd: 3,
  },
  {
    name: "Midas Touch",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.RARE,
    inkCost: 2,
    goldAdd: 15,
  },
  {
    name: "Enchant Library",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.RARE,
    inkCost: 2,
    permanentlyUpgradeRandomCardsInDeck: 3,
  },
  {
    name: "Dusk Lotus",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.MYTHIC,
    inkCost: 0,
    inkAdd: 3,
    exileOnCast: true,
  },
  {
    name: "Weasel's Bargain",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    inkCost: 0,
    goldAdd: 4,
  },
  {
    name: "Carrot Festival",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    inkCost: 1,
    bunnyAdd: 12,
  },
  {
    name: "Mega Bunnyplication",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    inkCost: 2,
    bunnyMult: 4,
  },
  {
    name: "Enchant Fingertips",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    inkCost: 1,
    permanentlyUpgradeRandomCardsInHand: 1,
  },
  {
    name: "Enchant Hands",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.RARE,
    inkCost: 2,
    permanentlyUpgradeRandomCardsInHand: 7,
  },
  {
    name: "Wisdom of the Warrens",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.MYTHIC,
    inkCost: 0,
    cardDraw: 1,
    exileOnCast: true,
  },
  {
    name: "Magic Missile",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.COMMON,
    inkCost: 0,
    damage: 5,
    inkCostIncreasePerLevel: 1,
    damageMultiplierPerLevel: 2,
    damageTypes: [DAMAGE_TYPES.FIRE],
  },
  {
    name: "Fireball",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    inkCost: 3,
    damage: 25,
    inkCostIncreasePerLevel: 1,
    damageMultiplierPerLevel: 2,
    damageTypes: [DAMAGE_TYPES.FIRE],
  },
  {
    name: "Lightning Bolt 1d4",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.COMMON,
    inkCost: 1,
    upgradesOnCast: 1,
    damageTypes: [DAMAGE_TYPES.LIGHTNING],
    damageRoll: {
      dice: 1,
      sides: 4,
      flatBonus: 0,
    },
  },
  {
    name: "Thunderstrike 2d2",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    inkCost: 2,
    upgradesOnCast: 2,
    damageTypes: [DAMAGE_TYPES.LIGHTNING],
    damageRoll: {
      dice: 2,
      sides: 2,
      flatBonus: 0,
    },
  },
  // === Curses ===
  {
    name: "Sisyphus' Pebble",
    cardType: CARD_TYPES.CURSE,
    unupgradable: true,
    unsocketable: true,
    uncastable: true,
    specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE,
    // No effect; added to deck via events, not in loot pool
  },
  {
    name: "Clutter",
    cardType: CARD_TYPES.CURSE,
    unupgradable: true,
    unsocketable: true,
    uncastable: true,
    specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE,
    // Added to combat deck by enemies; no effect
  },
  {
    name: "Mirage",
    cardType: CARD_TYPES.CURSE,
    unupgradable: true,
    unsocketable: true,
    uncastable: true,
    specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE,
    triggers: {
      onDraw: {
        exile: true, // Exile when drawn
      },
    },
  },
  {
    name: "Mercury Droplet",
    cardType: CARD_TYPES.INSTANT,
    inkCost: 1,
    unupgradable: true,
    unsocketable: true,
    exileOnCast: true,
    specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE,
  },
];
const gemList = [
  {
    name: "Amethyst",
    rarity: RARITIES.COMMON,
    bunnyAdd: 2,
  },
  {
    name: "Lapis Lazuli",
    rarity: RARITIES.COMMON,
    bunnyMult: 1.5,
  },
  // {
  //   name: "Sapphire",
  //   rarity: RARITIES.UNCOMMON,
  //   cardDraw: 1,
  // },
  {
    name: "Topaz",
    rarity: RARITIES.RARE,
    goldAdd: 5,
  },
  {
    name: "Jet",
    rarity: RARITIES.MYTHIC,
    permanentlyUpgradeRandomCardsInDeck: 1,
  },
  {
    name: "Ruby",
    rarity: RARITIES.RARE,
    damage: 5,
    damageTypes: [DAMAGE_TYPES.FIRE],
    inkCostIncreasePerLevel: 1,
    damageMultiplierPerLevel: 2,
  },
  {
    name: "Amber",
    rarity: RARITIES.RARE,
    damageRoll: {
      dice: 1,
      sides: 4,
      flatBonus: 0,
    },
    upgradesOnCast: 1,
    damageTypes: [DAMAGE_TYPES.LIGHTNING],
  },
];
const relicList = [
  {
    name: "Magic Scroll",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusPages: 1,
      },
    },
  },
  {
    name: "Magic Wand",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusBaseBunnies: 3,
      },
    },
  },
  {
    name: "Fabergé Egg",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusGold: 100,
      },
    },
  },
  {
    name: "Heartstone",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusHealth: 25,
      },
    },
  },
  // {
  //   // fix to reduce damage taken on combat loss.
  //   name: "Protective Amulet",
  //   rarity: RARITIES.UNCOMMON,
  //   triggers: {
  //     [TRIGGER_EVENTS.RELIC_PICKUP]: {
  //       bonusHealth: 10,
  //     },
  //   },
  // },
  {
    name: "Magic Encyclopedia",
    rarity: RARITIES.MYTHIC,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusBooks: 1,
      },
    },
  },
  {
    name: "Magic Inkpot",
    rarity: RARITIES.MYTHIC,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusInk: 2,
      },
    },
  },
  {
    name: "Enchanted Cardsleeves",
    rarity: RARITIES.MYTHIC,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        permanentlyUpgradeRandomCardsInDeck: 5,
      },
    },
  },
  {
    name: "Magic Quill",
    rarity: RARITIES.LEGENDARY,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusInk: 3,
      },
    },
  },
  {
    name: "Gold Bag",
    rarity: RARITIES.BASIC_POLY,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusGold: 25,
      },
    },
  },
  {
    name: "Whetstone",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.CARD_PICKUP]: {
        upgradeCard: true,
      },
    },
  },
  {
    name: "Witch's Cauldron",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.POTION_PICKUP]: {
        upgradePotion: true,
      },
    },
  },
  {
    name: "Crystal Vial",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.DRINK_POTION]: {
        healPlayer: 5,
      },
    },
  },
  {
    name: "Discount Voucher",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.ASSIGN_SHOP_PRICES]: {
        shopPriceMultiplier: 0.8, // 20% cheaper shop prices
      },
    },
  },
  {
    name: "Sleeping Bag",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.REST]: {
        healPlayer: 50,
      },
    },
  },
  {
    name: "Toothfairy's Charm",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.REST]: {
        goldAdd: 50,
      },
    },
  },
  {
    name: "Planetarium Mobile",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.REST]: {
        permanentlyUpgradeRandomCardsInDeck: 2, // upgrade random cards in the deck when resting
      },
    },
  },
  {
    name: "Dousing Rod",
    rarity: RARITIES.RARE,
    triggers: {
      [TRIGGER_EVENTS.POPULATE_PATHS]: {
        revealAnonymousPaths: true,
      },
    },
  },
  {
    //fix the names of this
    name: "Gem of Weakness",
    rarity: RARITIES.RARE,
    triggers: {
      [TRIGGER_EVENTS.COMBAT_START]: {
        weakenEnemyHpPercent: 0.1, // 10% reduction
      },
    },
  },
  {
    name: "Phylactery",
    rarity: RARITIES.RARE,
    triggers: {
      [TRIGGER_EVENTS.SHUFFLE_GRAVEYARD_INTO_DECK]: {
        healPlayer: 5,
      },
    },
  },
  {
    name: "Crystal Ball",
    rarity: RARITIES.MYTHIC,
    triggers: {
      [TRIGGER_EVENTS.DRAW_CARD]: {
        bunnyAdd: 1,
      },
    },
  },
  {
    name: "Arcane Brush",
    rarity: RARITIES.RARE,
    triggers: {
      [TRIGGER_EVENTS.PLAY_CARD]: {
        bunnyAdd: 2,
      },
    },
  },
  {
    name: "Golden Carrot",
    rarity: RARITIES.LEGENDARY,
    bossOnly: true,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusBooks: 1,
        bonusPages: 1,
        bonusInk: 1,
      },
    },
  },
  {
    name: "Voynich Manuscript",
    rarity: RARITIES.RARE,
    triggers: {
      [TRIGGER_EVENTS.CAST_SPELLBOOK]: {
        healPlayer: 5,
      },
    },
  },
  {
    name: "Corsair's Coin",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.COMBAT_END]: {
        goldAdd: 25,
      },
    },
  },
  {
    name: "Carrot Staff",
    rarity: RARITIES.MYTHIC,
    description: "Doubles all Bunny damage you deal.",
    triggers: {
      [TRIGGER_EVENTS.DEAL_DAMAGE]: {
        damageTypeTrigger: DAMAGE_TYPES.BUNNY,
        multiplyDamage: 1.5,
      },
    },
  },
  {
    name: "Lightning Rod",
    rarity: RARITIES.MYTHIC,
    description: "Whenever you cast a Lightning spell, draw 2 cards.",
    triggers: {
      [TRIGGER_EVENTS.PLAY_CARD]: {
        ifLightningDrawCards: 2,
      },
    },
  },
  {
    name: "Firemage's Hat",
    rarity: RARITIES.MYTHIC,
    description: "All Fire cards cost 1 less ink.",
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        reduceInkCostOfFireCardsInDeck: 1,
      },
      [TRIGGER_EVENTS.CARD_PICKUP]: {
        reduceInkCostIfFire: 1,
      },
    },
  },
  {
    name: "Thinking Cap",
    rarity: RARITIES.MYTHIC,
    description: "Your hand size is permanently increased by 3.",
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusHandSize: 3,
      },
    },
  },
];
const potionList = [
  {
    name: "Lesser Healing Potion",
    rarity: RARITIES.COMMON,
    healthRestore: 10,
  },
  {
    name: "Healing Potion",
    rarity: RARITIES.UNCOMMON,
    healthRestore: 15,
  },
  {
    name: "Greater Healing Potion",
    rarity: RARITIES.RARE,
    healthRestore: 20,
  },
  {
    name: "Elixir of Life",
    rarity: RARITIES.MYTHIC,
    healthRestore: 50,
  },
  {
    name: "Squid Brew",
    rarity: RARITIES.UNCOMMON,
    bonusInk: 1,
    drinkableOutOfCombat: false,
  },
  {
    name: "Hearty Soup",
    rarity: RARITIES.RARE,
    increaseMaxHp: 5,
  },
  {
    name: "Liquid Enchantment",
    rarity: RARITIES.COMMON,
    upgradeCardsInHand: 1,
    drinkableOutOfCombat: false,
  },
  {
    name: "Ponderous Potion",
    rarity: RARITIES.UNCOMMON,
    cardDraw: 2,
    drinkableOutOfCombat: false,
  },
  {
    name: "Bunny Brew",
    rarity: RARITIES.COMMON,
    bunnyAdd: 5,
    drinkableOutOfCombat: false,
  },
  {
    name: "Warren Elixir",
    rarity: RARITIES.RARE,
    bunnyMult: 2,
    drinkableOutOfCombat: false,
  },
];
//#endregion
//#region utility functions
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function shuffleArray(originalArray) {
  const array = [...originalArray]; // copy to avoid mutation
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function weightedRandomChoice(weightedMap) {
  const entries = Object.entries(weightedMap);
  const totalWeight = entries.reduce((sum, [_, weight]) => sum + weight, 0);
  const r = Math.random() * totalWeight;
  let cumulative = 0;

  for (const [key, weight] of entries) {
    cumulative += weight;
    if (r <= cumulative) return key;
  }
}
function changeScreen(dispatch, screen) {
  dispatch({ type: ACTIONS.SCREEN_CHANGE, payload: screen });
}
function inspectDeck(dispatch) {
  changeScreen(dispatch, SCREENS.DECK);
}
function inspectCombatDeck(dispatch) {
  changeScreen(dispatch, SCREENS.COMBAT_DECK);
}
function inspectGraveyard(dispatch) {
  changeScreen(dispatch, SCREENS.GRAVEYARD);
}
function inspectExile(dispatch) {
  changeScreen(dispatch, SCREENS.EXILE);
}
function returnToMain(dispatch) {
  changeScreen(dispatch, SCREENS.MAIN);
}

function assignShopPrices(state) {
  const globalMultiplier = state.shopPriceMultiplier || 1;

  const basePrices = {
    card: 10,
    potion: 20,
    gem: 30,
    relic: 100,
  };

  const rarityMultipliers = {
    common: 1,
    uncommon: 1.2,
    rare: 1.4,
    mythic: 1.6,
    legendary: 2,
  };

  const updatedShopfront = state.offerings.shopfront.map((entry) => {
    const { type, item } = entry;

    if (!item || !item.name) {
      console.warn("Invalid shop item during price assignment:", entry);
      return entry;
    }

    const basePrice = basePrices[type] || 0;
    const upgrades = item.upgrades || 0;
    const upgradeCost = ["card", "potion"].includes(type) ? upgrades * 5 : 0;

    const rarity = item.rarity?.toLowerCase?.() || "common";
    const rarityMultiplier = rarityMultipliers[rarity] || 1;

    const price = Math.round(
      (basePrice + upgradeCost) * rarityMultiplier * globalMultiplier
    );

    return {
      ...entry,
      item: {
        ...item,
        price,
      },
    };
  });

  return {
    ...state,
    offerings: {
      ...state.offerings,
      shopfront: updatedShopfront,
    },
    log: [`Assigned prices to shop items.`, ...state.log],
  };
}
function anonymizeObject(obj) {
  return {
    ...obj,
    anonymousNameDisplay: true,
  };
}

//#endregion
//#region reducer-action handlers
function generateStarterDeck(state) {
  const difficulty = state.difficulty;

  if (!difficulty || !difficultyModifiersMap[difficulty]) {
    console.error(
      "Cannot generate starter deck: invalid difficulty:",
      difficulty
    );
    return state;
  }

  const modifiers = difficultyModifiersMap[difficulty];
  const deck = [];

  // 1. Add one of each basic mono card
  const basicMonoCards = cardList.filter(
    (card) => card.rarity === RARITIES.BASIC_MONO
  );
  for (const card of basicMonoCards) {
    deck.push(createCardInstance(card.name));
  }

  // 2. Add 3 of each basic poly card
  const basicPolyCards = cardList.filter(
    (card) => card.rarity === RARITIES.BASIC_POLY
  );
  for (const card of basicPolyCards) {
    for (let i = 0; i < 3; i++) {
      deck.push(createCardInstance(card.name));
    }
  }

  // 3. Add additional random basic poly cards based on difficulty
  for (let i = 0; i < modifiers.basicCardCountModifier; i++) {
    const card = generateRandomCard(state, { rarity: RARITIES.BASIC_POLY });
    if (card) deck.push(card);
  }

  // 4. Shuffle the deck (pure)
  const shuffledDeck = shuffleArray(deck);

  // 5. Return new state with updated campaign.deck
  return {
    ...state,
    campaign: {
      ...state.campaign,
      deck: shuffledDeck,
    },
    log: [...state.log],
  };
}

function applyDifficultyModifiers(state) {
  const difficulty = state.difficulty;

  if (!difficulty || !difficultyModifiersMap[difficulty]) {
    console.error("Invalid or missing difficulty:", difficulty);
    return state;
  }

  const modifiers = difficultyModifiersMap[difficulty];

  return {
    ...state,
    gold: state.gold + modifiers.goldModifier,
    basicCardCount: state.basicCardCount + modifiers.basicCardCountModifier,
    luck: (state.luck || 0) + (modifiers.luckModifier || 0),
    shopPriceMultiplier:
      (state.shopPriceMultiplier || 1) +
      (modifiers.shopPriceMultiplierModifier || 0),
    restHealthRestore:
      (state.restHealthRestore || 0) +
      (modifiers.restHealthRestoreModifier || 0),
    maxHealth: state.maxHealth + modifiers.maxHealthModifier,
    health: state.health + modifiers.maxHealthModifier,
    enemyHealthMultiplier:
      (state.enemyHealthMultiplier || 1) +
      (modifiers.enemyHealthMultiplierModifier || 0),
  };
}

function advancePhaseTo(state, phaseAdvancedTo) {
  console.log(">>> Advancing to phase:", phaseAdvancedTo);

  if (!Object.values(PHASES).includes(phaseAdvancedTo)) {
    console.error("Invalid phase passed to advancePhaseTo:", phaseAdvancedTo);
    return state;
  }

  return {
    ...state,
    currentPhase: phaseAdvancedTo,
  };
}
function handlePhaseTransitions(state) {
  const phase = state.currentPhase;

  switch (phase) {
    case PHASES.DIFFICULTY_SELECTION:
      return {
        ...state,
        log: ["Choose your difficulty.", ...state.log],
      };

    case PHASES.PATH_SELECTION:
      console.log(">> Entering PHASES.PATH_SELECTION");
      return populatePathOfferings(state);

    case PHASES.CARD_OFFERING:
      console.log(">> Entering PHASES.CARD_OFFERING");
      return populateCardOfferings(state);

    case PHASES.MYTHIC_RELIC_OFFERING:
      console.log(">> Entering PHASES.MYTHIC_RELIC_OFFERING .");
      return populateRelicOfferings(state, RARITIES.MYTHIC);

    case PHASES.RELIC_OFFERING:
      console.log(">> Entering PHASES.RELIC_OFFERING.");
      return populateRelicOfferings(state);

    case PHASES.POTION_OFFERING:
      console.log(">> Entering POTION_OFFERING phase.");
      return populatePotionOfferings(state);

    case PHASES.GEM_OFFERING:
      console.log(">> Entering GEM_OFFERING phase.");
      return populateGemOfferings(state);

    case PHASES.SHOP:
      return populateShopfront(state);

    case PHASES.COMBAT:
      return initializeCombatPhase(state, state.currentPath);

    default:
      return state;
  }
}
function pickPath(state, index) {
  const paths = state.offerings.paths;

  if (!paths || index < 0 || index >= paths.length) {
    console.error("Invalid path index:", index);
    return state;
  }

  const chosenPath = paths[index];
  const pathKey = chosenPath.path;
  const pathData = pathMap[pathKey];

  if (!pathData || !pathData.leadsTo) {
    console.error("Path has no destination phase:", pathKey);
    return state;
  }

  return handlePhaseTransitions({
    ...state,
    level: (state.level ?? 0) + 1,
    currentPath: chosenPath, // ✅ store the path here
    currentPhase: pathData.leadsTo,
    log: [`Chose path: ${pathKey}`, ...state.log],
    offerings: {
      ...state.offerings,
      paths: [],
    },
  });
}
function populateCardOfferings(state) {
  const newCards = [];

  while (newCards.length < 3) {
    const card = generateRandomCard(state);
    if (!card) continue;
    if (newCards.some((existing) => existing.name === card.name)) continue;
    newCards.push(card);
  }

  return {
    ...state,
    offerings: {
      ...state.offerings,
      cards: newCards,
    },
  };
}
function populatePotionOfferings(state) {
  const selectedPotions = [];
  const usedNames = new Set();
  let attempts = 0;

  while (selectedPotions.length < 3 && attempts < 50) {
    attempts++;

    const potion = generateRandomPotion(state);
    if (!potion) continue;

    if (usedNames.has(potion.name)) continue;

    selectedPotions.push(potion);
    usedNames.add(potion.name);
  }

  if (selectedPotions.length < 3) {
    console.warn("Not enough unique potions to populate full offering.");
  }

  return {
    ...state,
    offerings: {
      ...state.offerings,
      potions: selectedPotions,
    },
  };
}
function populateRelicOfferings(state, rarity = null) {
  const selected = [];
  const maxRelics = 3;

  while (selected.length < maxRelics) {
    const relic = generateRandomRelic(state, { rarity });

    // Ensure uniqueness by name
    if (selected.some((r) => r.name === relic.name)) continue;

    selected.push(relic);
  }

  console.log("Selected relic offerings:", selected);

  return {
    ...state,
    offerings: {
      ...state.offerings,
      relics: selected,
    },
  };
}
function populateGemOfferings(state) {
  const selectedGems = [];
  const usedNames = new Set();
  let attempts = 0;

  while (selectedGems.length < 3 && attempts < 50) {
    attempts++;

    const gem = generateRandomGem(state);
    if (!gem) continue;

    if (usedNames.has(gem.name)) continue;

    selectedGems.push(gem);
    usedNames.add(gem.name);
  }

  if (selectedGems.length < 3) {
    console.warn("Not enough unique gems to populate full offering.");
  }

  return {
    ...state,
    offerings: {
      ...state.offerings,
      gems: selectedGems,
    },
  };
}
function populatePathOfferings(state) {
  const luck = state.luck || 0;
  const misery = state.misery || 0;
  const level = state.level || 0;

  // === Step 0: Boss override ===
  if ([15, 30, 45].includes(level)) {
    const bossPath = {
      path: PATHS.BOSS_FIGHT,
      ...pathMap[PATHS.BOSS_FIGHT],
    };
    return {
      ...state,
      offerings: {
        ...state.offerings,
        paths: [bossPath, bossPath, bossPath],
      },
      log: [`Boss floor! All paths lead to a boss fight.`, ...state.log],
    };
  }

  // === Step 1: Always pick 1 fight path ===
  const fightWeights = {
    [PATHS.EASY_FIGHT]: 3,
    [PATHS.MEDIUM_FIGHT]: 2,
    [PATHS.HARD_FIGHT]: 1,
  };
  const fightPathKey = weightedRandomChoice(fightWeights);
  const fightPath = {
    path: fightPathKey,
    ...pathMap[fightPathKey],
  };

  // === Step 2: Create a pool of all valid paths (excluding duplicate of picked fight) ===
  const allPaths = Object.entries(pathMap)
    .filter(([key]) => key !== fightPathKey)
    .map(([path, data]) => ({ path, ...data }));

  // 🧱 Sanity check: filter out boss paths unless on proper boss level
  const bossLevels = [15, 30, 45];
  const isBossLevel = bossLevels.includes(level);

  // 🧱 Sanity check: filter out paths that don't match current difficulty and/or would bug the game with imppossible mods
  const allCardsSocketed =
    state.campaign.deck?.length > 0 &&
    state.campaign.deck.every((card) => card.gem != null || card.unsocketable);

  const allCardsUnupgradable =
    state.campaign.deck?.length > 0 &&
    state.campaign.deck.every((card) => card.unupgradable);

  const filteredPaths = allPaths.filter((pathObj) => {
    // Prevent rogue boss path unless it's a true boss level
    if (pathObj.path === PATHS.BOSS_FIGHT && !isBossLevel) return false;

    // Prevent GEM_OFFERING if all cards are socketed
    if (pathObj.path === PATHS.GEM_OFFERING && allCardsSocketed) return false;

    // Prevent ENCHANT_OFFERING if all cards are unupgradable
    if (pathObj.path === PATHS.ENCHANT_OFFERING && allCardsUnupgradable)
      return false;

    return true;
  });

  // === Step 3: Pick first two paths using rarity weights ===
  const rarityWeights = getLuckAdjustedRarityWeights(luck);
  const chosenRarities = [
    weightedRandomChoice(rarityWeights),
    weightedRandomChoice(rarityWeights),
  ];

  const chosenPaths = [];
  const usedPaths = new Set([fightPathKey]);

  for (const rarity of chosenRarities) {
    const candidates = filteredPaths.filter(
      (p) => p.rarity === rarity && !usedPaths.has(p.path)
    );
    if (candidates.length > 0) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      usedPaths.add(pick.path);
      chosenPaths.push(pick);
    }
  }

  // === Step 4: Fill in missing 2nd path if needed
  const remainingPool = filteredPaths.filter((p) => !usedPaths.has(p.path));
  while (chosenPaths.length < 2 && remainingPool.length > 0) {
    const idx = Math.floor(Math.random() * remainingPool.length);
    const pick = remainingPool.splice(idx, 1)[0];
    usedPaths.add(pick.path);
    chosenPaths.push(pick);
  }

  // === Step 5: Optional override for 3rd path using misery + luck if both are fights
  const firstTwoAreFights = chosenPaths.every((p) => p.isFight);
  let finalPaths = [fightPath, ...chosenPaths];
  let newMisery = misery;

  if (firstTwoAreFights && misery > 0 && remainingPool.length > 0) {
    const thirdOptions = remainingPool.filter((p) => !usedPaths.has(p.path));
    if (thirdOptions.length > 0) {
      const nonFights = thirdOptions.filter((p) => !p.isFight);
      const fights = thirdOptions.filter((p) => p.isFight);

      const weightedPool = [];
      nonFights.forEach((p) => {
        for (let i = 0; i < misery + luck; i++) weightedPool.push(p);
      });
      fights.forEach((p) => {
        weightedPool.push(p); // 1 weight each
      });

      if (weightedPool.length > 0) {
        const pick =
          weightedPool[Math.floor(Math.random() * weightedPool.length)];
        usedPaths.add(pick.path);
        finalPaths[2] = pick;
        if (!pick.isFight) newMisery = misery - 1;
      }
    }
  }

  // === Step 6: Check again if all 3 are fights and increment misery
  const allFights = finalPaths.every((p) => p.isFight);
  if (allFights) newMisery++;

  console.log("Populated path options:", finalPaths);

  // === Step 6.5: Randomly anonymize one path based on (50% - luck) chance
  const anonChance = Math.max(0, 0.5 - (state.luck || 0) * 0.01); // luck is per % point
  const anonIndex = Math.floor(Math.random() * finalPaths.length);

  if (Math.random() < anonChance) {
    finalPaths[anonIndex] = anonymizeObject(finalPaths[anonIndex]);
  }

  // === Step 7: Apply relic triggers for POPULATE_PATH
  const triggerResult = checkRelicTriggers(
    state,
    TRIGGER_EVENTS.POPULATE_PATH,
    {
      payload: finalPaths,
    }
  );
  const updatedPaths = triggerResult.result || finalPaths;
  const updatedState = { ...triggerResult };
  console.log("📍 Populating path offerings with:", finalPaths);
  return {
    ...updatedState,
    misery: newMisery,
    offerings: {
      ...updatedState.offerings,
      paths: updatedPaths,
    },
  };
}

function pickCard(state, index) {
  const phase = state.currentPhase;
  const offerings = { ...state.offerings };

  let sourceArrayName = null;

  if (offerings.cards && index < offerings.cards.length) {
    sourceArrayName = "cards";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else if (
    offerings.combatRewards &&
    index < offerings.combatRewards.length
  ) {
    sourceArrayName = "combatRewards";
  } else {
    console.error("Invalid card index:", index);
    return state;
  }

  const sourceArray = offerings[sourceArrayName];
  const entry = sourceArray[index];

  // 🛠️ Unwrap
  const pickedCard =
    sourceArrayName === "shopfront"
      ? entry.item
      : sourceArrayName === "combatRewards"
      ? entry.value
      : entry;

  if (!pickedCard || !pickedCard.name) {
    console.warn("⚠️ Picked card is invalid:", pickedCard);
  }

  if (!pickedCard) {
    console.error("No card found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const price = entry.item?.price !== undefined ? entry.item.price : 20;
    console.log(
      `Trying to purchase card: ${pickedCard.name}, price: ${price}, current gold: ${state.gold}`
    );
    const charged = chargeGoldPrice(state, price, "card");
    if (charged === state) {
      console.warn("Purchase failed: not enough gold");
      return state;
    }
    updatedState = charged;
  }

  // === 3. Add to campaign deck ===
  const updatedCampaign = {
    ...updatedState.campaign,
    deck: [...updatedState.campaign.deck, pickedCard],
  };

  // === 4. Remove from offerings ===
  const updatedOfferings = {
    ...updatedState.offerings,
    [sourceArrayName]: sourceArray.filter((_, i) => i !== index),
  };

  // === 5. Apply triggers ===
  let newState = {
    ...updatedState,
    campaign: updatedCampaign,
    offerings: updatedOfferings,
    log: [`Picked card: ${pickedCard.name}`, ...updatedState.log],
  };

  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.CARD_PICKUP, {
    payload: pickedCard,
  });

  // === 6. Trash unchosen cards if from offering ===
  if (phase === PHASES.CARD_OFFERING) {
    const trashed = sourceArray.filter((_, i) => i !== index);

    newState = {
      ...newState,
      trashPile: [...(newState.trashPile || []), ...trashed],
      offerings: {
        ...newState.offerings,
        [sourceArrayName]: [],
      },
    };

    //log the selected card:
    console.log(`📜 Picked card: ${pickedCard.name} (from ${sourceArrayName})`);

    newState = handlePhaseTransitions(
      advancePhaseTo(newState, PHASES.PATH_SELECTION)
    );
  }

  return newState;
}
function pickRelic(state, index) {
  const phase = state.currentPhase;
  const offerings = { ...state.offerings };

  // === 1. Determine the source array ===
  let sourceArrayName = null;
  if (offerings.relics && index < offerings.relics.length) {
    sourceArrayName = "relics";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else if (
    offerings.combatRewards &&
    index < offerings.combatRewards.length
  ) {
    sourceArrayName = "combatRewards";
  } else {
    console.error("Invalid relic index:", index);
    return state;
  }

  const sourceArray = offerings[sourceArrayName];
  const entry = sourceArray[index];

  // 🛠️ Unwrap relic from shopfront if needed
  const pickedRelic =
    sourceArrayName === "shopfront"
      ? entry.item
      : sourceArrayName === "combatRewards"
      ? entry.value
      : entry;
  if (!pickedRelic) {
    console.error("No relic found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const relicPrice = entry.price || 50;
    const chargedState = chargeGoldPrice(state, relicPrice, "relic");
    if (chargedState === state) return state; // not enough gold
    updatedState = chargedState;
  }

  // === 3. Add relic to belt ===
  updatedState = {
    ...updatedState,
    relicBelt: [...updatedState.relicBelt, pickedRelic],
  };

  // === 4. Remove the picked relic from offerings ===
  offerings[sourceArrayName] = sourceArray.filter((_, i) => i !== index);

  // === 5. Trash unchosen relics if from offering phase ===
  const isOfferingPhase = [
    PHASES.MYTHIC_RELIC_OFFERING,
    PHASES.RELIC_OFFERING,
  ].includes(phase);

  let updatedTrashPile = updatedState.trashPile;
  if (isOfferingPhase) {
    updatedTrashPile = [
      ...(updatedTrashPile || []),
      ...offerings.relics.filter((_, i) => i !== index),
    ];
    offerings.relics = [];
  }

  // === 6. Build the new state ===
  const newState = {
    ...updatedState,
    trashPile: updatedTrashPile, // ✅ Root-level trash pile
    offerings,
    log: [`Picked relic: ${pickedRelic.name}`, ...updatedState.log],
  };

  // === 7. Trigger relic effects
  const triggeredState = checkRelicTriggers(
    newState,
    TRIGGER_EVENTS.RELIC_PICKUP,
    { relic: pickedRelic }
  );

  // === 8. Advance phase if in offering
  if (isOfferingPhase) {
    return handlePhaseTransitions(
      advancePhaseTo(triggeredState, PHASES.PATH_SELECTION)
    );
  }

  return triggeredState;
}

function pickPotion(state, index) {
  const phase = state.currentPhase;
  const offerings = { ...state.offerings };

  // === 1. Determine the source array ===
  let sourceArrayName = null;
  let sourceArray = null;

  if (offerings.potions && index < offerings.potions.length) {
    sourceArrayName = "potions";
    sourceArray = offerings.potions;
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
    sourceArray = offerings.shopfront;
  } else if (
    phase === PHASES.COMBAT_END &&
    offerings.combatRewards &&
    offerings.combatRewards[index]?.type === "potion"
  ) {
    sourceArrayName = "combatRewards";
    sourceArray = offerings.combatRewards;
  } else {
    console.error("Invalid potion index:", index);
    return state;
  }

  const entry = sourceArray[index];

  // === 2. Unwrap the potion if needed ===
  let pickedPotion;
  if (sourceArrayName === "shopfront") {
    pickedPotion = entry.item;
  } else if (sourceArrayName === "combatRewards") {
    pickedPotion = entry.value;
  } else {
    pickedPotion = entry;
  }

  if (!pickedPotion) {
    console.error("No potion found at index:", index);
    return state;
  }

  // === 3. Charge cost if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const price = entry.item?.price ?? 30;
    const charged = chargeGoldPrice(state, price, "potion");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 4. Apply pickup relic triggers (may upgrade the potion) ===
  const triggerResult = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.POTION_PICKUP,
    { payload: pickedPotion }
  );
  const triggeredPotion = triggerResult.result;
  updatedState = { ...triggerResult }; // includes possible log/relic changes

  // === 5. Add to potion belt ===
  const updatedPotionBelt = [...updatedState.potionBelt, triggeredPotion];

  // === 6. Remove picked potion from source
  offerings[sourceArrayName] = sourceArray.filter((_, i) => i !== index);

  // === 7. Trash unchosen potions if from potion offering
  let updatedTrashPile = updatedState.trashPile;
  if (phase === PHASES.POTION_OFFERING && sourceArrayName === "potions") {
    updatedTrashPile = [
      ...(updatedTrashPile || []),
      ...offerings.potions.filter((_, i) => i !== index),
    ];
    offerings.potions = [];
  }

  // === 8. Build new state
  const newState = {
    ...updatedState,
    potionBelt: updatedPotionBelt,
    trashPile: updatedTrashPile,
    offerings,
    log: [`Picked potion: ${pickedPotion.name}`, ...updatedState.log],
  };

  // === 9. Advance phase if from potion offering
  if (phase === PHASES.POTION_OFFERING) {
    return handlePhaseTransitions(
      advancePhaseTo(newState, PHASES.PATH_SELECTION)
    );
  }

  return newState;
}

function drinkPotion(state, potion) {
  if (!potion) {
    console.error("No potion passed to drinkPotion");
    return state;
  }

  console.log("🧪 Drinking potion:", potion);

  let updatedState = { ...state };

  // === 1. Apply effects ===
  if (potion.healthRestore) {
    updatedState = heal(updatedState, potion.healthRestore);
  }

  if (potion.bonusInk && state.currentPhase === PHASES.COMBAT) {
    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        ink: updatedState.combat.ink + potion.bonusInk,
        maxInk: updatedState.combat.maxInk + potion.bonusInk,
      },
      log: [
        `Gained ${potion.bonusInk} bonus ink from ${potion.name}`,
        ...updatedState.log,
      ],
    };
  }

  if (potion.increaseMaxHp) {
    const amount = potion.increaseMaxHp;
    updatedState = {
      ...updatedState,
      maxHealth: updatedState.maxHealth + amount,
      health: updatedState.health + amount,
      log: [
        `Max and current HP increased by ${amount} from ${potion.name}`,
        ...updatedState.log,
      ],
    };
  }

  if (
    potion.upgradeCardsInHand &&
    state.currentPhase === PHASES.COMBAT &&
    updatedState.combat.hand
  ) {
    const hand = [...updatedState.combat.hand];
    const upgradable = hand.filter(
      (card) => !card.unupgradable && typeof card.upgrades === "number"
    );
    const numToUpgrade = Math.min(potion.upgradeCardsInHand, upgradable.length);

    // Shuffle and pick upgradable cards
    const shuffled = [...upgradable].sort(() => Math.random() - 0.5);
    const toUpgrade = shuffled.slice(0, numToUpgrade);

    const newHand = hand.map((card) => {
      if (toUpgrade.includes(card)) {
        return { ...card, upgrades: card.upgrades + 1 };
      }
      return card;
    });

    if (potion.cardDraw) {
      for (let i = 0; i < potion.cardDraw; i++) {
        updatedState = drawCard(updatedState);
      }
    }

    if (potion.bunnyAdd) {
      updatedState = addBunnies(updatedState, potion.bunnyAdd);
    }

    if (potion.bunnyMult) {
      updatedState = multiplyBunnies(updatedState, potion.bunnyMult);
    }

    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        hand: newHand,
      },
      log: [
        `Upgraded ${toUpgrade.length} card(s) in hand with ${potion.name}`,
        ...updatedState.log,
      ],
    };
  }

  // === 2. Remove potion from belt and add to trash ===
  const belt = updatedState.potionBelt || [];
  const index = belt.findIndex((p) => p.name === potion.name);
  const newPotionBelt =
    index >= 0 ? [...belt.slice(0, index), ...belt.slice(index + 1)] : belt;
  const newTrash = [...updatedState.trashPile, potion];

  updatedState = {
    ...updatedState,
    potionBelt: newPotionBelt,
    trashPile: newTrash,
  };

  // === 3. Trigger relic effects
  const triggered = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.DRINK_POTION,
    { potion }
  );

  return {
    ...triggered,
    log: triggered.log || updatedState.log,
  };
}

function openModScreen(state, mod, originPhase = null) {
  const validKeys = ["upgrade", "gem", "purge", "transmute"];
  const keys = Object.keys(mod || {});
  if (keys.length !== 1 || !validKeys.includes(keys[0])) {
    console.error("Invalid mod passed to openModScreen:", mod);
    return state;
  }

  // === GEM LOGIC: Discard unchosen gems only if from gem offering ===
  if (mod.gem && (state.offerings.gems?.length || 0) > 0) {
    const chosenGemName = mod.gem.name;

    const discardedGems = state.offerings.gems.filter(
      (g) => g.name !== chosenGemName
    );

    state = {
      ...state,
      campaign: {
        ...state.campaign,
        trashPile: [...state.trashPile, ...discardedGems],
      },
      offerings: {
        ...state.offerings,
        gems: [], // clear offering gems
      },
      log: [`Discarded ${discardedGems.length} unchosen gem(s).`, ...state.log],
    };
  }

  // === If the chosen gem came from combat rewards, remove it ===
  if (
    mod.gem &&
    state.currentPhase === PHASES.COMBAT_END &&
    Array.isArray(state.offerings.combatRewards)
  ) {
    const updatedRewards = state.offerings.combatRewards.filter(
      (reward) => reward.type !== "gem" || reward.value.name !== mod.gem.name
    );

    state = {
      ...state,
      offerings: {
        ...state.offerings,
        combatRewards: updatedRewards,
      },
      log: [`Picked gem: ${mod.gem.name}`, ...state.log],
    };
  }

  // === Charge gold if in shop ===
  if (state.currentPhase === PHASES.SHOP) {
    const price = mod?.gem?.price ?? 50;

    const charged = chargeGoldPrice(state, price, "card modification");
    if (charged === state) return state; // insufficient gold
    state = charged;
  }

  return {
    ...state,
    currentScreen: SCREENS.MOD,
    modData: {
      mod,
      origin: originPhase || state.currentPhase,
    },
    log: [`Opened mod screen (${keys[0]}).`, ...state.log],
  };
}

function increaseBaseBunnies(state, amount) {
  const newAmount = Math.max(0, (state.baseBunnies || 0) + amount);

  return {
    ...state,
    baseBunnies: newAmount,
    log: [`Base bunnies increased by ${amount}.`, ...state.log],
  };
}
function applyModToCard(state, card) {
  const mod = state.modData?.mod;
  const origin = state.modData?.origin;

  if (!mod || !card) {
    console.warn("applyModToCard called without a valid mod or card.");
    return state;
  }

  let updatedDeck = [...state.campaign.deck];
  const cardIndex = updatedDeck.findIndex((c) => c === card);

  if (cardIndex === -1) {
    console.warn("Card not found in campaign deck.");
    return state;
  }

  // Apply mod
  let modifiedCard = { ...card };
  if (mod.upgrade) {
    modifiedCard = upgradeCard(modifiedCard, mod.upgrade);
  } else if (mod.gem) {
    modifiedCard = socketCardWithGem(modifiedCard, mod.gem);
  } else if (mod.purge) {
    updatedDeck.splice(cardIndex, 1); // Remove the card
  } else if (mod.transmute) {
    modifiedCard = transmuteCard(modifiedCard);
  }

  // Replace modified card if not purged
  if (!mod.purge) {
    updatedDeck[cardIndex] = modifiedCard;
  }

  // Determine next phase
  const nextPhase =
    origin === PHASES.SHOP || origin === PHASES.COMBAT_END
      ? origin
      : PHASES.PATH_SELECTION;

  const updatedState = {
    ...state,
    campaign: {
      ...state.campaign,
      deck: updatedDeck,
    },
    modData: null,
    currentScreen: SCREENS.MAIN,
    currentPhase: nextPhase,
    log: [`Applied mod to ${card.name}.`, ...state.log],
  };

  // If transitioning to path selection, trigger path population
  return nextPhase === PHASES.PATH_SELECTION
    ? handlePhaseTransitions(updatedState)
    : updatedState;
}
function populateShopfront(state) {
  const shopfrontTypes = [];
  // === Clear existing shop items into trash ===
  const previousItems = state.offerings.shopfront || [];
  const discardedItems = previousItems.map((entry) => entry.item);
  const updatedTrash = [...(state.trashPile || []), ...discardedItems];
  // === Step 1: Populate exactly 3 of each item type ===
  const typeCounts = {
    card: 3,
    potion: 3,
    gem: 3,
    relic: 3,
  };

  for (const [type, count] of Object.entries(typeCounts)) {
    for (let i = 0; i < count; i++) {
      shopfrontTypes.push(type);
    }
  }
  // // === Step 1: Ensure 1 of each type ===
  // const guaranteedTypes = ["relic", "potion", "card", "gem"];
  // guaranteedTypes.forEach((type) => shopfrontTypes.push(type));

  // // === Step 2: Fill remaining 8 items using weighted choice ===
  // const weights = {
  //   card: 12,
  //   potion: 3,
  //   gem: 1,
  //   relic: 1,
  // };

  // const weightedPool = Object.entries(weights).flatMap(([type, weight]) =>
  //   Array(weight).fill(type)
  // );

  // let safetyCounter = 0;
  // while (shopfrontTypes.length < 12 && safetyCounter < 100) {
  //   safetyCounter++;
  //   const chosen =
  //     weightedPool[Math.floor(Math.random() * weightedPool.length)];
  //   shopfrontTypes.push(chosen);
  // }

  // === Step 3: Generate actual items, avoiding duplicates ===
  const generatedItems = [];
  const usedKeys = new Set();

  for (let type of shopfrontTypes) {
    let item = null;
    let attempt = 0;

    while (attempt < 20) {
      attempt++;
      try {
        switch (type) {
          case "card":
            item = generateRandomCard(state);
            break;
          case "potion":
            item = generateRandomPotion(state);
            break;
          case "gem":
            item = generateRandomGem(state);
            break;
          case "relic":
            item = generateRandomRelic(state);
            break;
          default:
            item = null;
        }

        if (!item) continue;

        const key = `${type}-${item.name}`;
        if (usedKeys.has(key)) continue;

        usedKeys.add(key);
        generatedItems.push({ type, item });
        break; // done
      } catch (e) {
        console.warn("Shop item generation failed:", type, e);
      }
    }
  }

  // === Step 4: Insert shopfront and assign prices ===
  let updatedState = {
    ...state,
    campaign: {
      ...state.campaign,
      trashPile: updatedTrash,
    },
    offerings: {
      ...state.offerings,
      shopfront: generatedItems,
    },
  };

  updatedState = assignShopPrices(updatedState);
  updatedState = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.ASSIGN_SHOP_PRICES
  );

  return {
    ...updatedState,
    log: [...updatedState.log],
  };
}
function gainGold(state, amount) {
  const newGold = (state.gold || 0) + amount;

  return {
    ...state,
    gold: newGold,
    log: [`Gained ${amount} gold.`, ...state.log],
  };
}
function practiceWandwork(state) {
  // Step 1: Increase base bunnies by 1
  let newState = increaseBaseBunnies(state, 1);

  // Step 2: Advance to path selection
  newState = advancePhaseTo(newState, PHASES.PATH_SELECTION);

  // Step 3: Handle the transition (populate offerings)
  newState = handlePhaseTransitions(newState);

  return newState;
}
function lootHoard(state) {
  const baseGold = 10;
  const levelBonus = state.level || 0;
  const enemiesDefeated = state.defeatedEnemies?.length || 0;
  const luck = state.luck || 0;

  const enemyBonus = enemiesDefeated * 5;
  const luckBonus = luck * 2;

  const totalGold = baseGold + levelBonus + enemyBonus + luckBonus;

  // Step 1: Gain gold
  let newState = gainGold(state, totalGold);

  // Step 2: Track hoards looted
  const hoardsLooted = (newState.hoardsLooted || 0) + 1;
  newState = {
    ...newState,
    hoardsLooted,
    log: [`Looted a hoard! (${totalGold}g)`, ...newState.log],
  };

  // Step 3: Advance phase
  newState = advancePhaseTo(newState, PHASES.PATH_SELECTION);
  newState = handlePhaseTransitions(newState);

  return newState;
}

function rest(state) {
  const amountToHeal = state.restHealthRestore || 0;
  const currentHealth = state.health || 0;

  // Step 1: Heal the player
  let newState = heal(state, amountToHeal);
  const healedAmount = newState.health - currentHealth;

  // Step 2: Check relic triggers for REST
  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.REST);

  // Step 3: Add one summary log line
  newState = {
    ...newState,
    log: [
      `Rested at the fire and recovered ${healedAmount} HP.`,
      ...newState.log.filter((msg) => !msg.startsWith("Healed")),
    ],
  };

  // Step 4: Advance phase
  newState = advancePhaseTo(newState, PHASES.PATH_SELECTION);

  //Step 5: Populate offerings for the new phase
  newState = handlePhaseTransitions(newState);

  return newState;
}

function toggleDeckInspect(state, dispatch) {
  const isInspectingDeck = state.currentScreen === SCREENS.DECK;
  const returnTo = state.previousScreen || SCREENS.MAIN;

  dispatch({
    type: ACTIONS.SCREEN_CHANGE,
    payload: isInspectingDeck ? returnTo : SCREENS.DECK,
  });
}

//#endregion
//#region state setup and game initialization
function createInitialState() {
  return {
    log: [],
    currentScreen: SCREENS.MAIN,
    previousScreen: null,
    currentPhase: PHASES.MAIN_MENU,
    currentPath: null,

    basicCardCount: 5,
    restHealthRestore: 10,
    shopPriceMultiplier: 1,
    enemyHealthMultiplier: 1,
    difficulty: null,

    maxHealth: 0,
    health: 0,
    baseBunnies: 0,

    gold: 100,

    luck: 0,
    level: 0,
    misery: 0,

    hoardsLooted: 0,
    defeatedEnemies: [],
    trashPile: [],

    relicBelt: [],
    potionBelt: [],

    campaign: {
      deck: [],
      ink: 4,
      books: 1,
      pages: 4,
      handSize: 6,
    },
    combat: {
      deck: [],
      hand: [],
      graveyard: [],
      exile: [],
      spellbook: [],

      combatEnded: null,

      baseBunnies: 0,
      ink: 0,
      maxInk: 0,
      books: 0,
      maxBooks: 0,
      pages: 0,
      bunnies: 0,
      maxPages: 0,
      handSize: 0,

      enemy: null,
    },
    offerings: {
      difficulties: [],
      shopfront: [],
      cards: [],
      potions: [],
      gems: [],
      relics: [],
      paths: [],
      combatRewards: [],
      restOptions: [],
    },
  };
}
function selectDifficultyAndBeginGame(dispatch, difficulty) {
  dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: difficulty });
  dispatch({ type: ACTIONS.GENERATE_STARTER_DECK });
  dispatch({ type: ACTIONS.APPLY_DIFFICULTY_MODIFIERS });
  dispatch({
    type: ACTIONS.ADVANCE_PHASE,
    payload: PHASES.MYTHIC_RELIC_OFFERING,
  });
}
function createGameApp(initialState, reducer, renderFn) {
  let state = initialState;
  function dispatch(action) {
    state = reducer(state, action);
    renderFn(state, dispatch); // pass dispatch so buttons etc. can use it
  }
  // Start the game
  dispatch({ type: ACTIONS.NEW_GAME });
  return { dispatch };
}

//#endregion
//#region game mechanics
function createCardInstance(
  cardName = null,
  rarity = null,
  upgrades = 0,
  gem = null
) {
  let card;
  if (rarity) {
    console.log("🔍 createCardInstance got rarity:", rarity);
  }
  if (cardName) {
    const found = cardList.find((c) => c.name === cardName);
    if (!found) {
      console.error(`Card not found: ${cardName}`);
      return null;
    }
    card = { ...found };
  } else if (rarity) {
    const candidates = cardList.filter(
      (c) =>
        c.rarity === rarity &&
        !["curse", "unique", "status"].includes(c.specialSubtype)
    );
    if (candidates.length === 0) {
      console.error(`No cards found with rarity: ${rarity}`);
      return null;
    }
    card = { ...candidates[Math.floor(Math.random() * candidates.length)] };
  } else {
    console.error("createCardInstance requires either a cardName or a rarity.");
    return null;
  }

  // Apply upgrades if needed
  if (upgrades > 0) {
    card = upgradeCard(card, upgrades); // this should set .upgrades itself
  }

  // Apply gem if needed
  if (gem) {
    card = socketCardWithGem(card, gem);
  }

  return card;
}

function createRelicInstance(relicName) {
  const found = relicList.find((r) => r.name === relicName);
  if (!found) {
    console.error(`Relic not found: ${relicName}`);
    return null;
  }
  return { ...found };
}
function createPotionInstance(potionName, upgrades = 0) {
  const found = potionList.find((p) => p.name === potionName);
  if (!found) {
    console.error(`Potion not found: ${potionName}`);
    return null;
  }

  let potion = { ...found };

  if (upgrades > 0) {
    potion = upgradePotion(potion, upgrades);
  }

  return potion;
}
function createGemInstance(gemName) {
  const found = gemList.find((g) => g.name === gemName);
  if (!found) {
    console.error(`Gem not found: ${gemName}`);
    return null;
  }
  return { ...found };
}
function getRandomBossRelic() {
  const bossRelics = relicList.filter((r) => r.bossOnly);
  if (bossRelics.length === 0) return null;
  const chosen = bossRelics[Math.floor(Math.random() * bossRelics.length)];
  return { ...chosen };
}

function generateRandomRelic(state, { rarity = null } = {}) {
  const luck = state.luck || 0;
  const ownedRelics = new Set([
    ...state.relicBelt.map((r) => r.name),
    ...state.trashPile.map((r) => r.name),
  ]);

  const GOLD_BAG = "Gold Bag";

  // Exclude Gold Bag and duplicate high-rarity relics
  let candidates = relicList.filter((r) => {
    if (r.name === GOLD_BAG) return false;
    if (r.bossOnly) return false; // ← new line to exclude boss-only relics from general pool
    if (
      (r.rarity === RARITIES.MYTHIC || r.rarity === RARITIES.LEGENDARY) &&
      ownedRelics.has(r.name)
    ) {
      return false;
    }
    return true;
  });

  if (!rarity) {
    const rarityWeights = getLuckAdjustedRarityWeights(luck);
    rarity = weightedRandomChoice(rarityWeights);
  }

  const filtered = candidates.filter((r) => r.rarity === rarity);
  if (filtered.length === 0) {
    console.warn(`No relics found for rarity: ${rarity}`);
    return createRelicInstance(GOLD_BAG);
  }

  const chosen = filtered[Math.floor(Math.random() * filtered.length)];
  return { ...chosen };
}
function generateRandomCard(
  state,
  { rarity = null, upgrades = undefined, gem = null } = {}
) {
  const luck = state.luck || 0;

  const finalRarity =
    rarity || weightedRandomChoice(getLuckAdjustedRarityWeights(luck));

  const level = state.level ?? 0;
  const totalFortune = (luck ?? 0) + level;

  const upgradeWeights = {
    0: Math.max(0, 60 - totalFortune),
    1: 5 + totalFortune,
    2: 3 + totalFortune,
    3: 2 + totalFortune,
    4: 0 + totalFortune,
  };

  const finalUpgrades =
    upgrades !== undefined
      ? upgrades
      : Number(weightedRandomChoice(upgradeWeights));

  const defeatedCount = state.defeatedEnemies?.length || 0;
  const maxUpgrades = Math.min(4, Math.floor(defeatedCount / 3));
  const cappedUpgrades = Math.min(finalUpgrades, maxUpgrades);

  return createCardInstance(undefined, finalRarity, cappedUpgrades, gem);
}
function generateRandomPotion(state, { rarity = null, upgrades = null } = {}) {
  const luck = state.luck || 0;
  const rarityWeights = getLuckAdjustedRarityWeights(luck);

  const level = state.level ?? 0;
  const totalFortune = (luck ?? 0) + level;

  const upgradeWeights = {
    0: Math.max(0, 70 - totalFortune),
    1: 5 + totalFortune,
    2: 3 + totalFortune,
    3: 2 + totalFortune,
    4: 0 + totalFortune,
  };

  // === Choose rarity if not provided ===
  if (!rarity) {
    rarity = weightedRandomChoice(rarityWeights);
  }

  // === Fallback in case rarity yields no results ===
  const candidates = potionList.filter((p) => p.rarity === rarity);
  let basePotion;
  if (candidates.length === 0) {
    console.warn(
      `No potions found for rarity: ${rarity}. Falling back to Lesser Healing Potion.`
    );
    basePotion = potionList.find((p) => p.name === "Lesser Healing Potion");
    if (!basePotion) {
      console.error(
        "Fallback potion 'Lesser Healing Potion' not found in potionList."
      );
      return null;
    }
    upgrades = 0; // ensure fallback is always unupgraded
  } else {
    basePotion = candidates[Math.floor(Math.random() * candidates.length)];

    // === Choose upgrade level if not provided ===
    if (upgrades === null) {
      upgrades = Number(weightedRandomChoice(upgradeWeights));
    }
    upgrades = Math.min(upgrades, 4);
  }

  return createPotionInstance(basePotion.name, upgrades);
}
function generateRandomGem(state, { rarity = null } = {}) {
  const luck = state.luck || 0;
  const fallbackGem = createGemInstance("Amethyst");

  // Choose rarity based on luck if not specified
  if (!rarity) {
    const rarityWeights = getLuckAdjustedRarityWeights(luck);
    rarity = weightedRandomChoice(rarityWeights);
  }

  // Filter by rarity
  const candidates = gemList.filter((gem) => gem.rarity === rarity);

  if (candidates.length === 0) {
    console.warn(
      `No gems found for rarity: ${rarity}, returning fallback gem.`
    );
    return fallbackGem;
  }

  const chosenGem = candidates[Math.floor(Math.random() * candidates.length)];
  return { ...chosenGem };
}
function upgradeCard(card, level = 1) {
  if (!card || typeof card !== "object") {
    console.error("Invalid card passed to upgradeCard:", card);
    return card;
  }

  if (card.unupgradable) {
    console.warn(`Card ${card.name} is marked unupgradable.`);
    return card;
  }

  const upgradedCard = { ...card };
  let upgradable = false;

  if ("bunnyAdd" in upgradedCard) {
    upgradedCard.bunnyAdd += 3 * level;
    upgradable = true;
  }

  if ("bunnyMult" in upgradedCard) {
    upgradedCard.bunnyMult += 0.5 * level;
    upgradable = true;
  }

  if ("goldAdd" in upgradedCard) {
    upgradedCard.goldAdd += 2 * level;
    upgradable = true;
  }

  if ("permanentlyUpgradeRandomCardsInDeck" in upgradedCard) {
    upgradedCard.permanentlyUpgradeRandomCardsInDeck += level;
    upgradable = true;
  }

  if ("permanentlyUpgradeRandomCardsInHand" in upgradedCard) {
    upgradedCard.permanentlyUpgradeRandomCardsInHand += level;
    upgradable = true;
  }

  if ("cardDraw" in upgradedCard) {
    upgradedCard.cardDraw += 1 * level;
    upgradable = true;
  }

  if ("inkAdd" in upgradedCard) {
    upgradedCard.inkAdd += 1 * level;
    upgradable = true;
  }

  if ("healthCost" in upgradedCard) {
    upgradedCard.healthCost -= 1 * level;
    upgradable = true;
  }

  // === Upgrade damageRoll (any type) ===
  if (upgradedCard.damageRoll) {
    upgradedCard.damageRoll = {
      ...upgradedCard.damageRoll,
      dice: upgradedCard.damageRoll.dice + level,
      sides: upgradedCard.damageRoll.sides + level,
      flatBonus: upgradedCard.damageRoll.flatBonus + level,
    };
    upgradable = true;
  }

  // === Increase inkCost by per-level amount ===
  if (
    "inkCostIncreasePerLevel" in upgradedCard &&
    typeof upgradedCard.inkCost === "number"
  ) {
    upgradedCard.inkCost += upgradedCard.inkCostIncreasePerLevel * level;
    upgradable = true;
  }

  // === Multiply base damage by per-level multiplier ===
  if (
    "damageMultiplierPerLevel" in upgradedCard &&
    typeof upgradedCard.damage === "number"
  ) {
    upgradedCard.damage *= Math.pow(
      upgradedCard.damageMultiplierPerLevel,
      level
    );
    upgradable = true;
  }

  // Add or increment the upgrade level
  upgradedCard.upgrades = (upgradedCard.upgrades || 0) + level;

  // === Smart renaming ===
  const baseName = card.name
    .replace(/\s\+\d+$/, "") // remove trailing "+3"
    .replace(/\s\d+d\d+(\s?\+\d+)?$/, ""); // remove "3d6" or "3d6 +3"

  if (upgradedCard.damageRoll) {
    const { dice = 1, sides, flatBonus = 0 } = upgradedCard.damageRoll;
    upgradedCard.name = `${baseName} ${dice}d${sides}${
      flatBonus > 0 ? `+${flatBonus}` : ""
    }`;
  } else {
    upgradedCard.name = `${baseName} +${upgradedCard.upgrades}`;
  }

  return upgradedCard;
}

function downgradeCard(card, level = 1) {
  if (!card || typeof card !== "object") {
    console.error("Invalid card passed to downgradeCard:", card);
    return card;
  }

  if (card.undowngradable) {
    console.warn(`Card ${card.name} is marked undowngradable.`);
    return card;
  }

  const downgradedCard = { ...card };
  const originalLevel = downgradedCard.upgrades || 0;
  const newLevel = Math.max(originalLevel - level, -1);
  const levelDiff = originalLevel - newLevel;

  // Restore to base values if we hit -1, then halve them
  const applyHalvedBase = () => {
    if ("bunnyAdd" in card)
      downgradedCard.bunnyAdd = Math.floor(card.bunnyAdd / 2);
    if ("bunnyMult" in card)
      downgradedCard.bunnyMult = Math.floor(card.bunnyMult / 2);
    if ("goldAdd" in card)
      downgradedCard.goldAdd = Math.floor(card.goldAdd / 2);
    if ("permanentlyUpgradeRandomCardsInDeck" in card)
      downgradedCard.permanentlyUpgradeRandomCardsInDeck = Math.floor(
        card.permanentlyUpgradeRandomCardsInDeck / 2
      );
    if ("permanentlyUpgradeRandomCardsInHand" in card)
      downgradedCard.permanentlyUpgradeRandomCardsInHand = Math.floor(
        card.permanentlyUpgradeRandomCardsInHand / 2
      );
    if ("cardDraw" in card)
      downgradedCard.cardDraw = Math.floor(card.cardDraw / 2);
    if ("inkAdd" in card) downgradedCard.inkAdd = Math.floor(card.inkAdd / 2);
    if ("healthCost" in card)
      downgradedCard.healthCost = Math.floor(card.healthCost * 1.5); // assume base is higher when downgraded
  };

  if (newLevel === -1) {
    applyHalvedBase();
  } else {
    // Reverse the upgrades
    if ("bunnyAdd" in downgradedCard) downgradedCard.bunnyAdd -= 3 * levelDiff;

    if ("bunnyMult" in downgradedCard)
      downgradedCard.bunnyMult -= 0.5 * levelDiff;

    if ("goldAdd" in downgradedCard) downgradedCard.goldAdd -= 2 * levelDiff;

    if ("permanentlyUpgradeRandomCardsInDeck" in downgradedCard)
      downgradedCard.permanentlyUpgradeRandomCardsInDeck -= 1 * levelDiff;

    if ("permanentlyUpgradeRandomCardsInHand" in downgradedCard)
      downgradedCard.permanentlyUpgradeRandomCardsInHand -= 1 * levelDiff;

    if ("cardDraw" in downgradedCard) downgradedCard.cardDraw -= 1 * levelDiff;

    if ("inkAdd" in downgradedCard) downgradedCard.inkAdd -= 1 * levelDiff;

    if ("healthCost" in downgradedCard)
      downgradedCard.healthCost += 1 * levelDiff;
  }

  // Cap upgrades at -1
  downgradedCard.upgrades = newLevel;

  // Rename
  const baseName = card.name.replace(/\s\+?-?\d+$/, "");
  if (newLevel > 0) {
    downgradedCard.name = `${baseName} +${newLevel}`;
  } else if (newLevel === -1) {
    downgradedCard.name = `${baseName} -1`;
  } else {
    downgradedCard.name = baseName;
  }

  return downgradedCard;
}

function upgradePotion(potion, level = 1) {
  if (!potion || typeof potion !== "object") {
    console.error("Invalid potion passed to upgradePotion:", potion);
    return potion;
  }

  // Clone the potion to avoid mutating the original
  const upgradedPotion = { ...potion };

  let upgradable = false;

  // === Upgradeable Effects ===
  if ("healthRestore" in upgradedPotion) {
    upgradedPotion.healthRestore += 2 * level;
    upgradable = true;
  }

  if ("bonusInk" in upgradedPotion) {
    upgradedPotion.bonusInk += level;
    upgradable = true;
  }

  if ("increaseMaxHp" in upgradedPotion) {
    upgradedPotion.increaseMaxHp += level * 2;
    upgradable = true;
  }

  if ("upgradeCardsInHand" in upgradedPotion) {
    upgradedPotion.upgradeCardsInHand += level;
    upgradable = true;
  }
  if ("cardDraw" in upgradedPotion) {
    upgradedPotion.cardDraw += level;
    upgradable = true;
  }

  if ("bunnyAdd" in upgradedPotion) {
    upgradedPotion.bunnyAdd += 3 * level;
    upgradable = true;
  }

  if ("bunnyMult" in upgradedPotion) {
    upgradedPotion.bunnyMult += 0.5 * level;
    upgradable = true;
  }

  if (!upgradable) {
    console.error(`Potion cannot be upgraded: ${potion.name}`);
    return potion;
  }

  // === Track upgrade level ===
  upgradedPotion.upgrades = (upgradedPotion.upgrades || 0) + level;

  // === Update potion name to reflect upgrades ===
  upgradedPotion.name =
    potion.name.replace(/\s\+\d+$/, "") + ` +${upgradedPotion.upgrades}`;

  return upgradedPotion;
}

function socketCardWithGem(card, gem) {
  if (!card || typeof card !== "object") {
    console.error("Invalid card passed to socketCardWithGem:", card);
    return card;
  }

  if (card.unsocketable) {
    console.warn(`Card ${card.name} is marked unsocketable.`);
    return card;
  }

  if (!gem || typeof gem !== "object" || !gem.name) {
    console.error("Invalid gem passed to socketCardWithGem:", gem);
    return card;
  }

  const socketedCard = { ...card };
  const upgradeLevel = socketedCard.upgrades || 0;

  const applyEffect = (key, baseAmount, perUpgrade) => {
    socketedCard[key] =
      (socketedCard[key] || 0) + baseAmount + perUpgrade * upgradeLevel;
  };

  // === Standard effects ===

  if ("bunnyAdd" in gem) applyEffect("bunnyAdd", gem.bunnyAdd, 3);
  if ("bunnyMult" in gem) applyEffect("bunnyMult", gem.bunnyMult, 0.5);
  if ("goldAdd" in gem) applyEffect("goldAdd", gem.goldAdd, 2);
  if ("permanentlyUpgradeRandomCardsInDeck" in gem)
    applyEffect(
      "permanentlyUpgradeRandomCardsInDeck",
      gem.permanentlyUpgradeRandomCardsInDeck,
      1
    );
  if ("permanentlyUpgradeRandomCardsInHand" in gem)
    applyEffect(
      "permanentlyUpgradeRandomCardsInHand",
      gem.permanentlyUpgradeRandomCardsInHand,
      1
    );
  if ("damage" in gem) applyEffect("damage", gem.damage, 5);
  if ("damageType" in gem) socketedCard.damageType = gem.damageType;
  if ("cardDraw" in gem) applyEffect("cardDraw", gem.cardDraw, 1);
  if ("inkAdd" in gem) applyEffect("inkAdd", gem.inkAdd, 1);
  if ("healthCost" in gem) applyEffect("healthCost", gem.healthCost, -1);

  // === Add upgradesOnCast property ===
  if ("upgradesOnCast" in gem) {
    socketedCard.upgradesOnCast =
      (socketedCard.upgradesOnCast || 0) + gem.upgradesOnCast;
  }
  // === Apply ink cost increase per level (fire effect)
  if ("inkCostIncreasePerLevel" in gem) {
    socketedCard.inkCostIncreasePerLevel = gem.inkCostIncreasePerLevel;
    // Apply retroactive increase if inkCost exists
    if (typeof socketedCard.inkCost === "number") {
      socketedCard.inkCost += gem.inkCostIncreasePerLevel * upgradeLevel;
    }
  }

  // === Apply damage multiplier per level (fire effect)
  if ("damageMultiplierPerLevel" in gem) {
    socketedCard.damageMultiplierPerLevel = gem.damageMultiplierPerLevel;
    // Apply retroactive multiplier if damage exists
    if (typeof socketedCard.damage === "number") {
      socketedCard.damage *= Math.pow(
        gem.damageMultiplierPerLevel,
        upgradeLevel
      );
    }
  }

  // === Merge damageTypes (if gem has them) ===
  if (Array.isArray(gem.damageTypes)) {
    socketedCard.damageTypes = Array.isArray(socketedCard.damageTypes)
      ? [...socketedCard.damageTypes]
      : [];

    for (const dmgType of gem.damageTypes) {
      if (!socketedCard.damageTypes.includes(dmgType)) {
        socketedCard.damageTypes.push(dmgType);
      }
    }
  }

  // === Add damageRoll support (e.g., Amber) ===

  if ("damageRoll" in gem && typeof gem.damageRoll === "object") {
    const gemRoll = gem.damageRoll;
    const baseDice = gemRoll.dice || 0;
    const baseSides = gemRoll.sides || 0;
    const baseBonus = gemRoll.flatBonus || 0;

    socketedCard.damageRoll = {
      dice: (socketedCard.damageRoll?.dice || 0) + baseDice + upgradeLevel,
      sides: (socketedCard.damageRoll?.sides || 0) + baseSides + upgradeLevel,
      flatBonus:
        (socketedCard.damageRoll?.flatBonus || 0) + baseBonus + upgradeLevel,
    };
  }

  // === Attach gem and rename card ===

  socketedCard.gem = gem;

  // Build name suffix if there's a damageRoll
  let nameSuffix = "";
  if (
    socketedCard.damageRoll &&
    typeof socketedCard.damageRoll.dice === "number" &&
    typeof socketedCard.damageRoll.sides === "number"
  ) {
    const { dice, sides, flatBonus } = socketedCard.damageRoll;
    nameSuffix = ` ${dice}d${sides}${flatBonus ? `+${flatBonus}` : ""}`;
  }

  // Final name: GemName OriginalName + dice suffix if present
  socketedCard.name = `${gem.name} ${card.name.replace(
    /\s\d+d\d+(\+\d+)?$/,
    ""
  )}${nameSuffix}`;

  return socketedCard;
}

function getLuckAdjustedRarityWeights(luck = 0) {
  return {
    [RARITIES.COMMON]: Math.max(20, 60 - luck * 2),
    [RARITIES.UNCOMMON]: Math.max(20, 40 - luck),
    [RARITIES.RARE]: Math.min(20, 5 + luck),
    [RARITIES.MYTHIC]: Math.min(10, 2 + Math.ceil(luck / 2)),
    [RARITIES.LEGENDARY]: Math.min(5, 1 + Math.ceil(luck / 3)),
  };
}
function chargeGoldPrice(state, price, context = "purchase") {
  if (state.gold < price) {
    console.warn(`Not enough gold for ${context}!`);
    return state; // return unmodified state
  }

  return {
    ...state,
    gold: state.gold - price, // ✅ correct location
    log: [`Spent ${price} gold on ${context}.`, ...state.log],
  };
}
function checkRelicTriggers(
  state,
  triggerEvent,
  context = { damageType: null }
) {
  let updatedState = { ...state };
  let result = context.payload || null;

  for (const relic of updatedState.relicBelt) {
    const effect = relic.triggers?.[triggerEvent];
    if (!effect) continue;

    if (triggerEvent === TRIGGER_EVENTS.DRINK_POTION && context.potion) {
      if (effect.healPlayer) {
        updatedState = heal(updatedState, effect.healPlayer);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} healed you for ${effect.healPlayer} HP when you drank a potion.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (
      triggerEvent === TRIGGER_EVENTS.DEAL_DAMAGE &&
      typeof context.amount === "number" &&
      typeof context.damageType === "string" &&
      effect.multiplyDamage &&
      effect.damageTypeTrigger === context.damageType
    ) {
      const bonusDamage = context.amount * (effect.multiplyDamage - 1);

      updatedState = dealDamage(
        updatedState,
        bonusDamage,
        [context.damageType],
        {
          isBonus: true,
        }
      );

      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} increased your ${context.damageType} damage by +${bonusDamage}.`,
          ...updatedState.log,
        ],
      };
    }

    if (
      triggerEvent === TRIGGER_EVENTS.POTION_PICKUP &&
      effect.upgradePotion &&
      result
    ) {
      result = upgradePotion(result, 1);
      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} upgraded a potion when you picked it up.`,
          ...updatedState.log,
        ],
      };
    }

    if (
      triggerEvent === TRIGGER_EVENTS.CARD_PICKUP &&
      effect.upgradeCard &&
      result
    ) {
      result = upgradeCard(result, 1);
      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} upgraded a card when you picked it up.`,
          ...updatedState.log,
        ],
      };
    }

    if (
      triggerEvent === TRIGGER_EVENTS.CARD_PICKUP &&
      effect.reduceInkCostIfFire &&
      result &&
      Array.isArray(result.damageTypes) &&
      result.damageTypes.includes(DAMAGE_TYPES.FIRE)
    ) {
      result = {
        ...result,
        inkCost: Math.max(0, result.inkCost - effect.reduceInkCostIfFire),
      };

      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} reduced the ink cost of your new fire card.`,
          ...updatedState.log,
        ],
      };
    }

    if (triggerEvent === TRIGGER_EVENTS.RELIC_PICKUP && context.relic) {
      const campaign = { ...updatedState.campaign };
      let newHealth = updatedState.health;
      let newMaxHealth = updatedState.maxHealth;

      if (effect.reduceInkCostOfFireCardsInDeck > 0) {
        let modifiedCount = 0;

        campaign.deck = campaign.deck.map((card) => {
          if (
            Array.isArray(card.damageTypes) &&
            card.damageTypes.includes(DAMAGE_TYPES.FIRE) &&
            typeof card.inkCost === "number"
          ) {
            modifiedCount++;
            return {
              ...card,
              inkCost: Math.max(
                0,
                card.inkCost - effect.reduceInkCostOfFireCardsInDeck
              ),
            };
          }
          return card;
        });

        if (modifiedCount > 0) {
          updatedState = {
            ...updatedState,
            log: [
              `${relic.name} reduced the ink cost of ${modifiedCount} fire card(s) in your deck.`,
              ...updatedState.log,
            ],
          };
        }
      }

      if (effect.bonusPages) {
        campaign.pages += effect.bonusPages;
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you +${effect.bonusPages} max pages.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusInk) {
        campaign.ink += effect.bonusInk;
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you +${effect.bonusInk} max ink.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusBooks) {
        campaign.books += effect.bonusBooks;
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you +${effect.bonusBooks} max books.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusHandSize) {
        campaign.handSize += effect.bonusHandSize;
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} increased your hand size by ${effect.bonusHandSize}.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusHealth) {
        newHealth += effect.bonusHealth;
        newMaxHealth += effect.bonusHealth;
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} increased your max health by ${effect.bonusHealth} HP.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusGold) {
        updatedState = gainGold(updatedState, effect.bonusGold);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you ${effect.bonusGold} gold.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.bonusBaseBunnies) {
        updatedState = increaseBaseBunnies(
          updatedState,
          effect.bonusBaseBunnies
        );
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} added ${effect.bonusBaseBunnies} base bunnies.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.permanentlyUpgradeRandomCardsInDeck > 0) {
        const { deck } = campaign;
        const numToUpgrade = Math.min(
          effect.permanentlyUpgradeRandomCardsInDeck,
          deck.length
        );

        const upgradedDeck = permanentlyUpgradeRandomCardsInDeck(
          deck,
          numToUpgrade
        );

        campaign.deck = upgradedDeck;

        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} permanently upgraded ${numToUpgrade} card(s) in your deck.`,
            ...updatedState.log,
          ],
        };
      }

      updatedState = {
        ...updatedState,
        campaign,
        health: newHealth,
        maxHealth: newMaxHealth,
      };
    }

    if (
      triggerEvent === TRIGGER_EVENTS.ASSIGN_SHOP_PRICES &&
      effect.shopPriceMultiplier
    ) {
      updatedState = {
        ...updatedState,
        offerings: {
          ...updatedState.offerings,
          shopfront: updatedState.offerings.shopfront.map((entry) => {
            const adjustedPrice = Math.round(
              entry.item.price * effect.shopPriceMultiplier
            );
            return {
              ...entry,
              item: {
                ...entry.item,
                price: adjustedPrice,
              },
            };
          }),
        },
        log: [
          `${relic.name} reduced shop prices by ${Math.round(
            (1 - effect.shopPriceMultiplier) * 100
          )}%.`,
          ...updatedState.log,
        ],
      };
    }

    if (triggerEvent === TRIGGER_EVENTS.REST) {
      if (effect.healPlayer) {
        updatedState = heal(updatedState, effect.healPlayer);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} healed you for ${effect.healPlayer} HP while resting.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.goldAdd) {
        updatedState = gainGold(updatedState, effect.goldAdd);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you ${effect.goldAdd} gold while resting.`,
            ...updatedState.log,
          ],
        };
      }

      if (effect.permanentlyUpgradeRandomCardsInDeck > 0) {
        const { deck } = updatedState.campaign;
        const numToUpgrade = Math.min(
          effect.permanentlyUpgradeRandomCardsInDeck,
          deck.length
        );

        const upgradedDeck = permanentlyUpgradeRandomCardsInDeck(
          deck,
          numToUpgrade
        );

        updatedState = {
          ...updatedState,
          campaign: {
            ...updatedState.campaign,
            deck: upgradedDeck,
          },
          log: [
            `${relic.name} permanently upgraded ${numToUpgrade} card(s) while resting.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (
      triggerEvent === TRIGGER_EVENTS.POPULATE_PATHS &&
      effect.revealAnonymousPaths
    ) {
      const updatedPaths = updatedState.offerings.paths.map((path) =>
        path.anonymousNameDisplay
          ? { ...path, anonymousNameDisplay: false }
          : path
      );

      updatedState = {
        ...updatedState,
        offerings: {
          ...updatedState.offerings,
          paths: updatedPaths,
        },
        log: [`${relic.name} revealed all hidden paths.`, ...updatedState.log],
      };
    }

    if (triggerEvent === TRIGGER_EVENTS.COMBAT_START) {
      if (effect.weakenEnemyHpPercent && updatedState.combat?.enemyHp) {
        const reduction = Math.floor(
          updatedState.combat.enemyHp * effect.weakenEnemyHpPercent
        );
        updatedState = {
          ...updatedState,
          combat: {
            ...updatedState.combat,
            enemyHp: updatedState.combat.enemyHp - reduction,
          },
          log: [
            `${relic.name} weakened the enemy by ${reduction} HP at the start of combat.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (
      triggerEvent === TRIGGER_EVENTS.PLAY_CARD &&
      effect.ifLightningDrawCards &&
      result && // the card being played
      Array.isArray(result.damageTypes) &&
      result.damageTypes.includes(DAMAGE_TYPES.LIGHTNING)
    ) {
      for (let i = 0; i < effect.ifLightningDrawCards; i++) {
        updatedState = drawCard(updatedState);
      }

      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} triggered and drew ${
            effect.ifLightningDrawCards
          } card${
            effect.ifLightningDrawCards > 1 ? "s" : ""
          } from casting a Lightning spell.`,
          ...updatedState.log,
        ],
      };
    }

    if (triggerEvent === TRIGGER_EVENTS.DRAW_CARD) {
      if (!updatedState.combat || updatedState.currentPhase !== PHASES.COMBAT)
        continue;

      if (effect.bunnyAdd) {
        updatedState = addBunnies(updatedState, effect.bunnyAdd);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} added ${effect.bunnyAdd} bunn${
              effect.bunnyAdd === 1 ? "y" : "ies"
            } when you drew a card.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (triggerEvent === TRIGGER_EVENTS.PLAY_CARD) {
      if (effect.bunnyAdd) {
        updatedState = addBunnies(updatedState, effect.bunnyAdd);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} added ${effect.bunnyAdd} bunn${
              effect.bunnyAdd === 1 ? "y" : "ies"
            } when you played a card.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (triggerEvent === TRIGGER_EVENTS.CAST_SPELLBOOK) {
      if (effect.healPlayer) {
        updatedState = heal(updatedState, effect.healPlayer);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} healed you for ${effect.healPlayer} HP when casting your spellbook.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (triggerEvent === TRIGGER_EVENTS.SHUFFLE_GRAVEYARD_INTO_DECK) {
      if (effect.healPlayer) {
        updatedState = heal(updatedState, effect.healPlayer);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} healed you for ${effect.healPlayer} HP after shuffling your graveyard.`,
            ...updatedState.log,
          ],
        };
      }
    }

    if (triggerEvent === TRIGGER_EVENTS.COMBAT_END) {
      if (effect.goldAdd) {
        updatedState = gainGold(updatedState, effect.goldAdd);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} gave you ${effect.goldAdd} gold after combat.`,
            ...updatedState.log,
          ],
        };
      }
    }
  }

  return {
    ...updatedState,
    result,
  };
}

function checkEnemyTriggers(state, triggerEvent, context = {}) {
  let updatedState = { ...state };
  const enemy = updatedState.combat?.enemy;
  if (!enemy) return updatedState;

  const abilities = enemy.abilities || {};
  const logMessages = [];

  if (triggerEvent === TRIGGER_EVENTS.COMBAT_START) {
    // Ink Drink effect
    if (abilities[ENEMY_ABILITIES.INK_DRINK]) {
      const amount = abilities[ENEMY_ABILITIES.INK_DRINK];

      const newMaxInk = Math.max(0, updatedState.combat.maxInk - amount);
      const newInk = Math.min(updatedState.combat.ink, newMaxInk); // Ensure current ink doesn't exceed new max

      updatedState = {
        ...updatedState,
        combat: {
          ...updatedState.combat,
          maxInk: newMaxInk,
          ink: newInk,
        },
      };

      logMessages.push(
        `${enemy.name} drained ${amount} max ink at the start of combat!`
      );
    }

    // Increase Health effect
    if (abilities[ENEMY_ABILITIES.INCREASE_HEALTH]) {
      const multiplier = abilities[ENEMY_ABILITIES.INCREASE_HEALTH]; // e.g., 1.5

      updatedState = {
        ...updatedState,
        combat: {
          ...updatedState.combat,
          enemyHp: Math.floor(updatedState.combat.enemyHp * multiplier),
          enemy: {
            ...updatedState.combat.enemy,
            hp: Math.floor(updatedState.combat.enemy.hp * multiplier),
          },
        },
      };

      logMessages.push(
        `${enemy.name} increased its health by ${Math.round(
          (multiplier - 1) * 100
        )}%!`
      );
    }

    // Downgrade Cards at Combat Start
    if (abilities[ENEMY_ABILITIES.DOWNGRADE_CARDS]) {
      const amount = abilities[ENEMY_ABILITIES.DOWNGRADE_CARDS];
      const deck = [...updatedState.combat.deck];
      const downgradable = deck.filter((card) => !card.undowngradable);

      const shuffled = [...downgradable].sort(() => Math.random() - 0.5);
      const toDowngrade = shuffled.slice(0, amount);

      const updatedDeck = deck.map((card) =>
        toDowngrade.includes(card) ? downgradeCard(card, 1) : card
      );

      updatedState = {
        ...updatedState,
        combat: {
          ...updatedState.combat,
          deck: updatedDeck,
        },
      };

      logMessages.push(
        `${enemy.name} downgraded ${toDowngrade.length} card(s) in your deck!`
      );
    }

    // Hand Size Reduction
    if (abilities[ENEMY_ABILITIES.HAND_SIZE_REDUCTION]) {
      const amount = abilities[ENEMY_ABILITIES.HAND_SIZE_REDUCTION];
      updatedState = {
        ...updatedState,
        combat: {
          ...updatedState.combat,
          handSize: Math.max(1, updatedState.combat.handSize - amount),
        },
      };
      logMessages.push(`${enemy.name} reduces your hand size by ${amount}!`);
    }

    // === Add curses at combat start ===
    if (triggerEvent === TRIGGER_EVENTS.COMBAT_START) {
      const abilities = enemy.abilities || {};

      if (abilities[ENEMY_ABILITIES.ADD_PEBBLES]) {
        const amount = abilities[ENEMY_ABILITIES.ADD_PEBBLES];
        for (let i = 0; i < amount; i++) {
          updatedState = addCardToCombatDeck(updatedState, "Sisyphus' Pebble");
        }
        logMessages.push(
          `${enemy.name} added ${amount} Sisyphus' Pebble to your deck!`
        );
      }

      if (abilities[ENEMY_ABILITIES.ADD_MERCURY]) {
        const amount = abilities[ENEMY_ABILITIES.ADD_MERCURY];
        for (let i = 0; i < amount; i++) {
          updatedState = addCardToCombatDeck(updatedState, "Mercury Droplet");
        }
        logMessages.push(
          `${enemy.name} added ${amount} Mercury Droplet(s) to your deck!`
        );
      }

      if (abilities[ENEMY_ABILITIES.ADD_CLUTTER]) {
        const amount = abilities[ENEMY_ABILITIES.ADD_CLUTTER];
        for (let i = 0; i < amount; i++) {
          updatedState = addCardToCombatDeck(updatedState, "Clutter");
        }
        logMessages.push(
          `${enemy.name} added ${amount} Clutter card(s) to your deck!`
        );
      }
    }
  }

  if (logMessages.length > 0) {
    updatedState = {
      ...updatedState,
      log: [`⚠️ Enemy ability activated!`, ...logMessages, ...updatedState.log],
    };
  }

  return updatedState;
}

function modifyCombatInk(state, amount) {
  const current = state.combat?.ink ?? 0;
  const max = state.combat?.maxInk ?? 0;

  const newInk = Math.max(0, Math.min(current + amount, max));
  const actualChange = newInk - current;

  // let changeMessage =
  //   actualChange === 0
  //     ? `Ink unchanged.`
  //     : actualChange > 0
  //     ? `Gained ${actualChange} ink.`
  //     : `Spent ${Math.abs(actualChange)} ink.`;

  return {
    ...state,
    combat: {
      ...state.combat,
      ink: newInk,
    },
    // log: [changeMessage, ...state.log],
  };
}

function heal(state, amount) {
  const current = state.health || 0;
  const max = state.maxHealth || 0;
  const newHealth = Math.min(current + amount, max);
  const healedAmount = newHealth - current;

  return {
    ...state,
    health: newHealth,
    log: [`Healed ${healedAmount} HP.`, ...state.log],
  };
}
function transmuteCard(card) {
  if (!card || !card.name) {
    console.error("Invalid card passed to transmuteCard:", card);
    return null;
  }

  // Define excluded subtypes (easily extendable)
  const excludedSubtypes = new Set([
    SPECIAL_CARD_SUBTYPES.CURSE,
    // Add more subtypes here in future
  ]);

  const alternatives = cardList.filter(
    (c) =>
      c.name !== card.name &&
      !c.unchoosableByTransmute &&
      (!c.specialSubtype || !excludedSubtypes.has(c.specialSubtype))
  );

  if (alternatives.length === 0) {
    console.warn(
      `No valid alternatives found to transmute ${card.name}. Returning original.`
    );
    return { ...card };
  }

  const newBase = alternatives[Math.floor(Math.random() * alternatives.length)];
  return createCardInstance(newBase.name, null, card.upgrades, card.gem);
}

function purgeCard(state, card) {
  if (!card || !card.name) {
    console.error("Invalid card passed to purgeCard:", card);
    return state;
  }

  const updatedDeck = state.campaign.deck.filter((c) => c !== card);
  const updatedTrash = [...(state.trashPile || []), card];

  return {
    ...state,
    campaign: {
      ...state.campaign,
      deck: updatedDeck,
      trashPile: updatedTrash,
    },
    log: [`Purged card: ${card.name}`, ...state.log],
  };
}

function initializeCombatPhase(state, path) {
  const level = state.level ?? 1;

  // Define ability power modifier based on level
  const modifyEnemyAbilityPower = ({ currentValue }) => {
    if (level > 30) return currentValue + 2;
    if (level > 15) return currentValue + 1;
    return currentValue;
  };

  const enemy = generateEnemy(state, path, modifyEnemyAbilityPower);

  // Deep copy and shuffle the deck
  const deepDeckCopy = JSON.parse(JSON.stringify(state.campaign.deck));
  const shuffledDeck = shuffleArray(deepDeckCopy);

  const newCombat = {
    enemy,
    enemyHp: enemy.hp,
    deck: shuffledDeck,
    hand: [],
    graveyard: [], // was 'discard' but rest of code uses 'graveyard'
    exile: [],
    ink: state.campaign.ink,
    maxInk: state.campaign.ink,
    books: state.campaign.books,
    maxBooks: state.campaign.books,
    pages: state.campaign.pages,
    maxPages: state.campaign.pages,
    handSize: state.campaign.handSize,
    baseBunnies: state.baseBunnies ?? 0,
    bunnies: 0,
    combatEnded: false,
  };

  let newState = {
    ...state,
    combat: newCombat,
    log: [`⚔️ Combat begins against ${enemy.name}!`, ...state.log],
  };

  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.COMBAT_START);
  newState = checkEnemyTriggers(newState, TRIGGER_EVENTS.COMBAT_START);
  console.log("🛠️ Starting combat with baseBunnies =", newCombat.baseBunnies);

  // Start the player's turn (draw hand, refill ink, setup spellbook, etc.)
  newState = startTurn(newState);

  return newState;
}

function generateEnemy(state, path, modifyEnemyAbilityPower = null) {
  const difficulty = pathMap[path?.path]?.difficulty;
  console.log("Path:", path?.path, "| Difficulty:", difficulty);

  const level = state.level ?? 1;
  const multiplier = state.enemyHealthMultiplier ?? 1;
  const isBoss = difficulty === "boss";

  // === Health Calculation ===
  const baseHealthMap = {
    easy: 10,
    medium: 13,
    hard: 16,
    boss: 25,
  };

  const perLevelIncrement = {
    easy: 4,
    medium: 5,
    hard: 6,
    boss: 10,
  };

  let base = baseHealthMap[difficulty] ?? 10;
  let increment = perLevelIncrement[difficulty] ?? 3;
  let health = (base + level * increment) * multiplier;

  // === Ability Assignment ===
  const allAbilities = Object.keys(enemyAbilityDataMap);
  const selectedAbilities = new Set();

  let numAbilities = 0;
  if (difficulty === "hard") numAbilities = 1;
  if (isBoss) numAbilities = 2;

  if (state.difficulty === DIFFICULTIES.HARD) {
    const bonusChance = Math.max(0, 0.5 - (state.luck ?? 0));
    if (Math.random() < bonusChance) numAbilities += 1;
  }

  numAbilities = Math.min(numAbilities, 3);

  while (selectedAbilities.size < numAbilities) {
    const ability =
      allAbilities[Math.floor(Math.random() * allAbilities.length)];
    selectedAbilities.add(ability);
  }

  // === Build abilities object ===
  const abilities = {};
  for (const key of selectedAbilities) {
    const data = enemyAbilityDataMap[key];
    const baseValue = data.baseValue ?? 0;
    const override = data.value ?? 0;
    let value = baseValue + override;

    if (typeof modifyEnemyAbilityPower === "function") {
      value = modifyEnemyAbilityPower({
        ability: key,
        baseValue,
        currentValue: value,
        enemyLevel: level,
        difficulty,
        isBoss,
        state,
      });
    }

    abilities[key] = value;
  }
  // === Name Generation ===
  let name;
  const smallMonsters = [
    "goblin",
    "kobold",
    "rat",
    "spider",
    "imp",
    "gremlin",
    "bat",
    "quasit",
    "skeleton",
    "zombie",
  ];

  const mediumMonsters = [
    "orc",
    "ogre",
    "gnoll",
    "troll",
    "hobgoblin",
    "ghoul",
    "harpy",
    "lizardfolk",
    "wight",
    "mimic",
  ];

  const largeMonsters = [
    "dragon",
    "manticore",
    "hydra",
    "wyvern",
    "beholder",
    "medusa",
    "chimera",
    "giant",
    "basilisk",
    "banshee",
  ];
  const vegetables = [
    "carrot",
    "broccoli",
    "spinach",
    "kale",
    "zucchini",
    "eggplant",
    "cauliflower",
    "cabbage",
    "lettuce",
    "beet",
    "radish",
    "turnip",
    "bokchoi",
    "chilli",
    "nopal",
    "durian",
    "bean",
    "yam",
    "tomato",
    "asparagus",
    "potato",
    "pumpkin",
    "bellpepper",
    "celery",
    "onion",
  ];
  const bossNames = ["Avatar of the Weasel", "Fox Spirit", "Beaglesoul"];

  if (isBoss) {
    name = bossNames[Math.floor(Math.random() * bossNames.length)];
  } else {
    // Base monster type
    let monsterList;
    if (level < 15) {
      monsterList = smallMonsters;
    } else if (level < 30) {
      monsterList = mediumMonsters;
    } else {
      monsterList = largeMonsters;
    }

    const vegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
    const monster = monsterList[Math.floor(Math.random() * monsterList.length)];

    // Prefixes based on abilities
    const prefixes = Object.keys(abilities)
      .map((ability) => enemyAbilityDataMap[ability]?.prefix)
      .filter(Boolean);

    name = [...prefixes, capitalize(vegetable), capitalize(monster)].join(" ");
  }

  // === Loot Generation ===
  const loot = generateEnemyLoot(state, difficulty, numAbilities, isBoss);

  return {
    name,
    hp: Math.round(health),
    abilities,
    loot,
  };
}

function generateEnemyLoot(state, difficulty, numAbilities, isBoss) {
  const luck = state.luck ?? 0;
  const level = state.level ?? 1;
  const deck = state.campaign?.deck ?? [];
  const allGemmedOrUnsocketable =
    deck.length > 0 && deck.every((card) => card.gem || card.unsocketable);
  const weights = {
    gold: 30,
    potion: 30,
    card: 60,
    relic: 1 + luck + numAbilities * 2,
    gem: allGemmedOrUnsocketable ? 0 : 5 + luck + numAbilities * 2,
  };

  let drops = isBoss ? 3 : 1;
  if (!isBoss) {
    const chanceTwo = 40 + luck + numAbilities * 10;
    if (Math.random() * 100 < chanceTwo) {
      drops++;
      const chanceThree = 15 + luck + numAbilities * 7;
      if (Math.random() * 100 < chanceThree) {
        drops++;
      }
    }
  }

  const usedTypes = new Set();
  const loot = [];

  if (isBoss) {
    loot.push({ type: "relic", value: generateRandomRelic(state) });
    usedTypes.add("relic");
    drops--;
  }

  while (loot.length < drops) {
    const available = Object.entries(weights).filter(
      ([type, weight]) => weight > 0 && !usedTypes.has(type)
    );

    if (available.length === 0) break;

    const totalWeight = available.reduce((sum, [_, w]) => sum + w, 0);
    let roll = Math.random() * totalWeight;

    let selected;
    for (const [type, weight] of available) {
      if (roll < weight) {
        selected = type;
        break;
      }
      roll -= weight;
    }

    usedTypes.add(selected);

    if (selected === "gold") {
      const base = { easy: 2, medium: 4, hard: 6 }[difficulty] ?? 2;
      const amount =
        (base + level + luck + numAbilities * 2) * (0.5 + Math.random());
      loot.push({ type: "gold", value: Math.max(1, Math.round(amount)) });
    } else if (selected === "card") {
      loot.push({ type: "card", value: generateRandomCard(state) });
    } else if (selected === "potion") {
      loot.push({ type: "potion", value: generateRandomPotion(state) });
    } else if (selected === "relic") {
      loot.push({ type: "relic", value: generateRandomRelic(state) });
    } else if (selected === "gem") {
      loot.push({ type: "gem", value: generateRandomGem(state) });
    }
  }

  return loot;
}
function permanentlyUpgradeRandomCardsInDeck(deck, numUpgrades = 1) {
  const upgradableCards = deck.filter((card) => !card.unupgradable);
  const shuffled = [...upgradableCards].sort(() => Math.random() - 0.5);
  const toUpgrade = shuffled.slice(0, numUpgrades);
  const upgradedCards = toUpgrade.map((card) => upgradeCard(card, 1));

  return deck.map((card) => {
    const index = toUpgrade.indexOf(card);
    return index !== -1 ? upgradedCards[index] : card;
  });
}

function addCardToCombatDeck(state, cardName) {
  const base = cardList.find((c) => c.name === cardName);
  if (!base) {
    console.warn(`Could not find card "${cardName}"`);
    return state;
  }

  const newCard = createCardInstance(cardName);
  const combatDeck = Array.isArray(state.combat?.deck) ? state.combat.deck : [];

  return {
    ...state,
    combat: {
      ...state.combat,
      deck: [...combatDeck, newCard],
    },
  };
}

//#endregion
//#region game reducer
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_GAME:
      return {
        ...createInitialState(),
        log: ["New game started."],
      };

    case ACTIONS.SET_DIFFICULTY: {
      if (state.difficulty === action.payload) {
        console.log("Difficulty already set to", action.payload);
        return state;
      }
      console.log(`Difficulty set to ${action.payload}`);
      return {
        ...state,
        difficulty: action.payload, // ✅ store at root
        log: [`Difficulty set to ${action.payload}.`, ...state.log],
      };
    }

    case ACTIONS.GENERATE_STARTER_DECK:
      return generateStarterDeck(state);

    case ACTIONS.APPLY_DIFFICULTY_MODIFIERS:
      return applyDifficultyModifiers(state);

    case ACTIONS.ADVANCE_PHASE:
      const newState = advancePhaseTo(state, action.payload);
      return handlePhaseTransitions(newState);

    case ACTIONS.CREATE_CARD_INSTANCE: {
      const newCard = createCardInstance(
        action.payload.cardName,
        action.payload.rarity,
        action.payload.upgrades,
        action.payload.gem
      );
      return {
        ...state,
        campaign: {
          ...state.campaign,
          deck: [...state.campaign.deck, newCard],
        },
        log: [`Created card: ${newCard.name}`, ...state.log],
      };
    }

    case ACTIONS.POPULATE_RELIC_OFFERINGS:
      return populateRelicOfferings(state, action.payload?.rarity);

    case ACTIONS.PICK_RELIC:
      return pickRelic(state, action.payload);

    case ACTIONS.POPULATE_PATH_OFFERINGS:
      return populatePathOfferings(state);

    case ACTIONS.PICK_PATH:
      return pickPath(state, action.payload);

    case ACTIONS.POPULATE_CARD_OFFERINGS:
      return populateCardOfferings(state);

    case ACTIONS.PICK_CARD:
      return pickCard(state, action.payload);

    case ACTIONS.POPULATE_POTION_OFFERINGS:
      return populatePotionOfferings(state);

    case ACTIONS.PICK_POTION:
      return pickPotion(state, action.payload);

    case ACTIONS.DRINK_POTION: {
      const potionIndex = action.payload;
      const potionToDrink = state.potionBelt[potionIndex];
      if (!potionToDrink) {
        console.error("Invalid potion index:", potionIndex);
        return state;
      }
      return drinkPotion(state, potionToDrink);
    }

    case ACTIONS.POPULATE_GEM_OFFERINGS:
      return populateGemOfferings(state);

    case ACTIONS.OPEN_MOD_SCREEN:
      return openModScreen(state, action.payload.mod, action.payload.origin);

    case ACTIONS.APPLY_CARD_MOD:
      return applyModToCard(state, action.payload); // payload = selected card

    case ACTIONS.SCREEN_CHANGE:
      return {
        ...state,
        previousScreen: state.currentScreen,
        currentScreen: action.payload,
      };

    case ACTIONS.POPULATE_SHOPFRONT:
      return populateShopfront(state);

    case ACTIONS.INCREASE_BASE_BUNNIES:
      return increaseBaseBunnies(state, action.payload);

    case ACTIONS.GAIN_GOLD:
      return gainGold(state, action.payload);

    case ACTIONS.PRACTICE_WANDWORK:
      return practiceWandwork(state);

    case ACTIONS.LOOT_HOARD:
      return lootHoard(state);

    case ACTIONS.REST:
      return rest(state);

    case ACTIONS.START_TURN:
      return startTurn(state, action.dispatch);

    case ACTIONS.CLOSE_COMBAT_REWARDS:
      return closeCombatRewards(state);

    case ACTIONS.CLAIM_GOLD_REWARD: {
      const { index, amount } = action.payload;
      const newRewards = [...state.offerings.combatRewards];
      newRewards.splice(index, 1);

      return {
        ...gainGold(state, amount),
        offerings: {
          ...state.offerings,
          combatRewards: newRewards,
        },
      };
    }

    case ACTIONS.DRAW_CARD:
      return drawCard(state);

    case ACTIONS.PLAY_CARD:
      return playCard(state, action.payload);

    case ACTIONS.CAST_SPELLBOOK:
      return castSpellbook(state);

    case ACTIONS.EXIT_SHOP:
      return exitShop(state);

    case ACTIONS.LOG_MESSAGE:
      return {
        ...state,
        log: [action.payload, ...state.log],
      };

    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
}
//#endregion
//#region render function
function render(state, dispatch) {
  // Get or create output div
  let output = document.getElementById("output");
  if (!output) {
    output = document.createElement("div");
    output.id = "output";
    document.body.appendChild(output);
  }
  output.innerHTML = ""; // Clear previous contents
  // //check and see if all cards in the deck are socketed
  const allCardsSocketed =
    state.campaign.deck?.length > 0 &&
    state.campaign.deck.every((card) => card.gem != null || card.unsocketable);

  //
  function renderCardList(title, cards) {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${title}</h3>`;
    const ul = document.createElement("ul");

    cards.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
      ul.appendChild(li);
    });

    section.appendChild(ul);
    output.appendChild(section);
  }

  // render utility function
  function renderModPhaseEntry(phase, label, modKey) {
    if (state.currentPhase === phase && state.currentScreen !== SCREENS.MOD) {
      const modBtn = document.createElement("button");
      modBtn.textContent = label;
      modBtn.style.fontSize = "1.5rem";
      modBtn.style.padding = "1rem 2rem";
      modBtn.onclick = () => {
        modBtn.disabled = true; // prevent double click
        dispatch({
          type: ACTIONS.OPEN_MOD_SCREEN,
          payload: {
            mod: { [modKey]: true },
            origin: phase,
          },
        });
      };
      output.appendChild(modBtn);
    }
  }

  // === Game Info ===
  const info = document.createElement("div");
  info.innerHTML = `
  <h2>Game Info</h2>
  <p><strong>Current Screen:</strong> ${state.currentScreen}</p>
  <p><strong>Phase:</strong> ${
    state.currentPhase
  } &nbsp;&nbsp; <strong>Level:</strong> ${state.level ?? 0}</p>
  <p><strong>Gold:</strong> ${state.gold}</p>
  <p><strong>Health:</strong> ${state.health}/${state.maxHealth}</p>
  <p><strong>Deck Size:</strong> ${state.campaign.deck.length}</p>
  <p><strong>Relics:</strong> ${
    state.relicBelt.length > 0
      ? Object.entries(
          state.relicBelt.reduce((acc, relic) => {
            acc[relic.name] = (acc[relic.name] || 0) + 1;
            return acc;
          }, {})
        )
          .map(([name, count]) => (count > 1 ? `${name} x${count}` : name))
          .join(", ")
      : "None"
  }</p>
`;
  output.appendChild(info);

  // === Combat Display ===
  const isCombatInspectScreen = [
    SCREENS.COMBAT_DECK,
    SCREENS.GRAVEYARD,
    SCREENS.EXILE,
  ].includes(state.currentScreen);

  if (state.currentPhase === PHASES.COMBAT && state.combat) {
    const combatSection = document.createElement("div");
    combatSection.style.border = "2px solid black";
    combatSection.style.padding = "1rem";
    combatSection.style.margin = "1rem 0";
    combatSection.innerHTML = `<h3>Combat</h3>`;

    // === Main Combat UI (skip if inspecting)
    if (!isCombatInspectScreen) {
      // Enemy Name + HP (on same line)
      const enemyBox = document.createElement("div");
      enemyBox.style.display = "flex";
      enemyBox.style.justifyContent = "space-between";
      enemyBox.style.alignItems = "center";
      enemyBox.style.fontSize = "1.5rem";
      enemyBox.style.fontWeight = "bold";
      enemyBox.style.border = "1px solid red";
      enemyBox.style.padding = "1rem";
      enemyBox.style.marginBottom = "1rem";

      // Enemy name
      const nameSpan = document.createElement("span");
      nameSpan.textContent = state.combat.enemy.name;

      // Enemy HP
      const hpSpan = document.createElement("span");
      hpSpan.textContent = `HP: ${state.combat.enemyHp}`;

      enemyBox.appendChild(nameSpan);
      enemyBox.appendChild(hpSpan);
      combatSection.appendChild(enemyBox);

      // Spellbook Pages
      const spellbook = document.createElement("div");
      spellbook.style.display = "flex";
      spellbook.style.gap = "0.5rem";
      spellbook.style.marginBottom = "1rem";
      state.combat.spellbook.forEach((page, index) => {
        const pageDiv = document.createElement("div");
        pageDiv.style.width = "60px";
        pageDiv.style.height = "90px";
        pageDiv.style.border = "1px solid #333";
        pageDiv.style.display = "flex";
        pageDiv.style.alignItems = "center";
        pageDiv.style.justifyContent = "center";
        pageDiv.style.backgroundColor =
          page === "blank page" ? "lightgrey" : "white";
        pageDiv.textContent = page === "blank page" ? "" : page.name;
        spellbook.appendChild(pageDiv);
      });

      const spellbookLabel = document.createElement("p");
      spellbookLabel.textContent = "Spellbook:";
      spellbookLabel.style.fontWeight = "bold";
      spellbookLabel.style.marginBottom = "0.25rem";
      combatSection.appendChild(spellbookLabel);
      combatSection.appendChild(spellbook);

      // Cast + Ink + Bunny Count
      const castRow = document.createElement("div");
      castRow.style.display = "flex";
      castRow.style.alignItems = "center";
      castRow.style.gap = "1rem";
      castRow.style.marginBottom = "0.5rem";

      const allPagesBlank =
        state.combat.spellbook.length > 0 &&
        state.combat.spellbook.every((page) => page === "blank page");

      const castButton = document.createElement("button");
      if (allPagesBlank) {
        castButton.textContent = "Skip Turn";
        castButton.style.backgroundColor = "#f88";
      } else {
        castButton.textContent = "Cast Spellbook";
      }
      castButton.onclick = () => dispatch({ type: ACTIONS.CAST_SPELLBOOK });

      const bunnyDisplay = document.createElement("span");
      bunnyDisplay.textContent = `BUNNIES: ${state.combat?.bunnies || 0}`;

      castRow.appendChild(castButton);
      castRow.appendChild(bunnyDisplay);
      combatSection.appendChild(castRow);

      // === INK and BOOKS Line (below cast + bunnies)
      const resourcesRow = document.createElement("div");
      resourcesRow.style.display = "flex";
      resourcesRow.style.gap = "1rem";
      resourcesRow.style.marginBottom = "1rem";

      const inkDisplay = document.createElement("span");
      inkDisplay.textContent = `INK: ${state.combat.ink}/${state.combat.maxInk}`;

      const booksDisplay = document.createElement("span");
      booksDisplay.textContent = `BOOKS: ${state.combat.books}`;

      resourcesRow.appendChild(inkDisplay);
      resourcesRow.appendChild(booksDisplay);
      combatSection.appendChild(resourcesRow);

      // Hand
      const handRow = document.createElement("div");
      handRow.style.display = "flex";
      handRow.style.gap = "0.5rem";
      handRow.style.flexWrap = "wrap";

      if (state.combat.hand && state.combat.hand.length > 0) {
        state.combat.hand.forEach((card, index) => {
          const cardBtn = document.createElement("button");

          const cardCost = card.inkCost ?? 0;
          const canAfford = cardCost <= state.combat.ink;
          const isUncastable = !!card.uncastable;

          // Display name and cost
          const costText =
            !isUncastable && card.inkCost != null
              ? ` (Cost: ${card.inkCost})`
              : "";
          cardBtn.textContent = `${card.name}${costText}`;

          // Disable the button if the card is uncastable or too expensive
          cardBtn.disabled = isUncastable || !canAfford;

          // Style disabled buttons
          if (cardBtn.disabled) {
            cardBtn.style.opacity = "0.5";
            cardBtn.style.cursor = "not-allowed";
          }

          // Only dispatch if allowed
          cardBtn.onclick = () => {
            if (!cardBtn.disabled) {
              dispatch({ type: ACTIONS.PLAY_CARD, payload: index });
            }
          };

          handRow.appendChild(cardBtn);
        });
      } else {
        const empty = document.createElement("p");
        empty.textContent = "Your hand is empty.";
        handRow.appendChild(empty);
      }

      // Hand label
      const handLabel = document.createElement("p");
      handLabel.textContent = "Hand:";
      handLabel.style.fontWeight = "bold";
      handLabel.style.marginBottom = "0.25rem";
      combatSection.appendChild(handLabel);

      combatSection.appendChild(handRow);
    }

    // === Inspect Buttons (always shown in combat)
    const inspectRow = document.createElement("div");
    inspectRow.style.marginTop = "1rem";
    inspectRow.style.display = "flex";
    inspectRow.style.gap = "0.5rem";

    [
      { label: "Combat Deck", screen: SCREENS.COMBAT_DECK },
      { label: "Graveyard", screen: SCREENS.GRAVEYARD },
      { label: "Exile", screen: SCREENS.EXILE },
    ].forEach(({ label, screen }) => {
      const btn = document.createElement("button");
      btn.textContent =
        state.currentScreen === screen ? "Return" : `Inspect ${label}`;
      btn.onclick = () => {
        if (state.currentScreen === screen) {
          returnToMain(dispatch);
        } else {
          changeScreen(dispatch, screen);
        }
      };
      inspectRow.appendChild(btn);
    });

    //label
    const inspectZoneLabel = document.createElement("p");
    inspectZoneLabel.textContent = "Inspect Zones:";
    inspectZoneLabel.style.fontWeight = "bold";
    inspectZoneLabel.style.marginBottom = "0.25rem";
    combatSection.appendChild(inspectZoneLabel);
    combatSection.appendChild(inspectRow);
    output.appendChild(combatSection);
  }

  if (state.currentScreen === SCREENS.COMBAT_DECK) {
    renderCardList("Combat Deck", state.combat?.deck || []);
  }
  if (state.currentScreen === SCREENS.GRAVEYARD) {
    renderCardList("Graveyard", state.combat?.graveyard || []);
  }
  if (state.currentScreen === SCREENS.EXILE) {
    renderCardList("Exile", state.combat?.exile || []);
  }

  // === Log ===
  const log = document.createElement("div");
  log.innerHTML = `<h3>Log</h3><ul>${state.log
    .slice(0, 5)
    .map((msg) => `<li>${msg}</li>`)
    .join("")}</ul>`;
  output.appendChild(log);

  // === Main Menu ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.currentPhase === PHASES.MAIN_MENU
  ) {
    const button = document.createElement("button");
    button.textContent = "New Game";
    button.onclick = () => {
      dispatch({
        type: ACTIONS.ADVANCE_PHASE,
        payload: PHASES.DIFFICULTY_SELECTION,
      });
    };
    output.appendChild(button);
  }

  // === Difficulty Selection ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.currentPhase === PHASES.DIFFICULTY_SELECTION
  ) {
    const difficulties = [
      DIFFICULTIES.EASY,
      DIFFICULTIES.MEDIUM,
      DIFFICULTIES.HARD,
    ];
    difficulties.forEach((difficulty) => {
      const btn = document.createElement("button");
      btn.textContent = `Start ${difficulty} Game`;
      btn.onclick = () => selectDifficultyAndBeginGame(dispatch, difficulty);
      output.appendChild(btn);
    });
  }

  // === Relic Offerings ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.offerings.relics &&
    state.offerings.relics.length > 0
  ) {
    const relicSection = document.createElement("div");
    relicSection.innerHTML = `<h3>Relic Offerings</h3>`;
    state.offerings.relics.forEach((relic, index) => {
      const btn = document.createElement("button");
      btn.textContent = `${relic.name}`;
      btn.onclick = () =>
        dispatch({ type: ACTIONS.PICK_RELIC, payload: index });
      relicSection.appendChild(btn);
    });
    output.appendChild(relicSection);
  }
  // === Path Selection ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.offerings.paths &&
    state.offerings.paths.length > 0
  ) {
    const pathSection = document.createElement("div");
    pathSection.innerHTML = `<h3>Choose a Path</h3>`;

    state.offerings.paths.forEach((path, index) => {
      const btn = document.createElement("button");

      // === Conditionally render based on anonymity ===
      if (path.anonymousNameDisplay) {
        btn.textContent = `???`;
      } else {
        btn.textContent = `${path.path}`;
      }

      btn.onclick = () => dispatch({ type: ACTIONS.PICK_PATH, payload: index });

      pathSection.appendChild(btn);
    });

    output.appendChild(pathSection);
  }

  // === Card Offerings ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.offerings.cards &&
    state.offerings.cards.length > 0
  ) {
    const cardSection = document.createElement("div");
    cardSection.innerHTML = `<h3>Choose a Card</h3>`;

    state.offerings.cards.forEach((card, index) => {
      const btn = document.createElement("button");
      btn.textContent = `${card.name} (Cost: ${card.inkCost})${
        card.upgrades ? ` +${card.upgrades}` : ""
      }${card.gem ? ` [Gem: ${card.gem.name}]` : ""}`;
      btn.onclick = () => dispatch({ type: ACTIONS.PICK_CARD, payload: index });
      cardSection.appendChild(btn);
    });

    output.appendChild(cardSection);
  }

  // === Potion Offerings ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.currentPhase === PHASES.POTION_OFFERING &&
    state.offerings.potions &&
    state.offerings.potions.length > 0
  ) {
    const potionSection = document.createElement("div");
    potionSection.innerHTML = `<h3>Choose a Potion</h3>`;

    state.offerings.potions.forEach((potion, index) => {
      const btn = document.createElement("button");
      btn.textContent = `${potion.name} (${potion.rarity})`;
      btn.onclick = () =>
        dispatch({ type: ACTIONS.PICK_POTION, payload: index });
      potionSection.appendChild(btn);
    });

    output.appendChild(potionSection);
  }

  // ==== Gem Offerings ===
  if (
    state.currentScreen !== SCREENS.DECK &&
    state.currentScreen === SCREENS.MAIN &&
    state.currentPhase === PHASES.GEM_OFFERING &&
    state.offerings.gems &&
    state.offerings.gems.length > 0
  ) {
    const gemSection = document.createElement("div");
    gemSection.innerHTML = `<h3>Choose a Gem</h3>`;

    state.offerings.gems.forEach((gem, index) => {
      const btn = document.createElement("button");
      btn.textContent = `${gem.name} (${gem.rarity})`;

      btn.onclick = () =>
        dispatch({
          type: ACTIONS.OPEN_MOD_SCREEN,
          payload: {
            mod: { gem },
            origin: PHASES.GEM_OFFERING,
          },
        });

      gemSection.appendChild(btn);
    });

    output.appendChild(gemSection);
  }
  // === Shopfront Display ===

  if (
    state.currentPhase === PHASES.SHOP &&
    state.currentScreen !== SCREENS.MOD &&
    state.offerings.shopfront.length > 0
  ) {
    const shopSection = document.createElement("div");
    shopSection.innerHTML = `<h3>Shop Inventory</h3>`;

    const list = document.createElement("ul");
    state.offerings.shopfront.forEach((entry, index) => {
      if (!entry || !entry.item || !entry.item.name) return;

      const li = document.createElement("li");

      const btn = document.createElement("button");
      const price = entry.item?.price ?? 0;
      const playerGold = state.gold ?? 0;
      const isGem = entry.type === "gem";
      const disabled = price > playerGold || (isGem && allCardsSocketed);
      btn.textContent = `${entry.type.toUpperCase()}: ${
        entry.item.name
      } (${price}g)`;
      if (disabled) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }

      // Bind correct function based on type
      btn.onclick = () => {
        switch (entry.type) {
          case "card":
            dispatch({ type: ACTIONS.PICK_CARD, payload: index });
            break;
          case "potion":
            dispatch({ type: ACTIONS.PICK_POTION, payload: index });
            break;
          case "gem":
            dispatch({
              type: ACTIONS.OPEN_MOD_SCREEN,
              payload: {
                mod: { gem: entry.item },
                origin: PHASES.SHOP,
              },
            });
            break;

          case "relic":
            dispatch({ type: ACTIONS.PICK_RELIC, payload: index });
            break;
          default:
            console.warn("Unknown shop item type:", entry.type);
        }
      };

      li.appendChild(btn);
      list.appendChild(li);
    });

    // Exit Shop Button (for future logic)
    const exitBtn = document.createElement("button");
    exitBtn.textContent = "Exit Shop";
    exitBtn.onclick = () => {
      dispatch({ type: ACTIONS.EXIT_SHOP });
    };
    shopSection.appendChild(list);
    shopSection.appendChild(exitBtn);
    output.appendChild(shopSection);
  }

  // === Mod Screen ===
  if (state.currentScreen === SCREENS.MOD && state.modData?.mod) {
    const modSection = document.createElement("div");
    modSection.innerHTML = `<h3>Choose a card to modify</h3>`;

    const mod = state.modData.mod;
    const isGemMod = !!mod.gem;

    state.campaign.deck.forEach((card) => {
      // === Filter based on mod type ===
      if (isGemMod && (card.gem || card.unsocketable)) return;
      if (mod.upgrade && card.unupgradable) return;

      const btn = document.createElement("button");
      btn.textContent = `${card.name} (Cost: ${card.inkCost})`;

      if (card.gem) {
        btn.textContent += ` [Gem: ${card.gem.name}]`;
      }

      btn.onclick = () => {
        dispatch({ type: ACTIONS.APPLY_CARD_MOD, payload: card });
      };

      modSection.appendChild(btn);
    });

    output.appendChild(modSection);
  }

  // ======= render purge, transmute, and enchant phases (AKA mod phases) ======

  renderModPhaseEntry(PHASES.PURGE, "Lethian Font", "purge");
  renderModPhaseEntry(PHASES.TRANSMUTE, "Metamorphosis", "transmute");
  renderModPhaseEntry(PHASES.ENCHANT, "Enchanted Dolmen", "upgrade");

  // ====== render hoard phase= ======
  if (state.currentPhase === PHASES.HOARD) {
    const btn = document.createElement("button");
    btn.textContent = "Loot Hoard";
    btn.style.fontSize = "1.5rem";
    btn.style.padding = "1rem 2rem";
    btn.onclick = () => {
      // Placeholder until lootHoard is implemented
      dispatch({ type: "LOOT_HOARD" }); // or just console.log("Loot Hoard")
    };
    output.appendChild(btn);
  }
  // ====== rest phase rendering ======
  if (state.currentPhase === PHASES.REST) {
    const restBtn = document.createElement("button");
    restBtn.textContent = "Fireside Rest";
    restBtn.style.fontSize = "1.5rem";
    restBtn.style.padding = "1rem 2rem";
    restBtn.onclick = () => {
      dispatch({ type: "REST" }); // Placeholder
    };

    const practiceBtn = document.createElement("button");
    practiceBtn.textContent = "Practice Wandwork";
    practiceBtn.style.fontSize = "1.5rem";
    practiceBtn.style.padding = "1rem 2rem";
    practiceBtn.onclick = () => {
      dispatch({ type: "PRACTICE_WANDWORK" }); // Placeholder
    };

    output.appendChild(restBtn);
    output.appendChild(practiceBtn);
  }

  // === Combat End Phase ===
  if (state.currentPhase === PHASES.COMBAT_END) {
    const combatEndSection = document.createElement("div");
    combatEndSection.innerHTML = `<h3>Combat Concluded</h3>`;

    const hasUnclaimedLoot =
      state.offerings?.combatRewards &&
      state.offerings.combatRewards.length > 0;

    const btn = document.createElement("button");
    btn.textContent = hasUnclaimedLoot ? "Skip Loot" : "Continue";
    btn.onclick = () => {
      dispatch({ type: ACTIONS.CLOSE_COMBAT_REWARDS });
    };

    combatEndSection.appendChild(btn);
    output.appendChild(combatEndSection);
  }
  if (
    state.currentPhase === PHASES.COMBAT_END &&
    state.offerings.combatRewards &&
    state.offerings.combatRewards.length > 0
  ) {
    const rewardSection = document.createElement("div");
    rewardSection.innerHTML = `<h3>Combat Rewards</h3>`;

    state.offerings.combatRewards.forEach((reward, index) => {
      const btn = document.createElement("button");

      let label = "";
      switch (reward.type) {
        case "gold":
          label = `Gold: ${reward.value}`;
          break;
        case "card":
          label = `Card: ${reward.value.name}`;
          break;
        case "relic":
          label = `Relic: ${reward.value.name}`;
          break;
        case "potion":
          label = `Potion: ${reward.value.name}`;
          break;
        case "gem":
          label = `Gem: ${reward.value.name}`;
          break;
        default:
          label = "Unknown Reward";
      }

      btn.textContent = label;

      const isGem = reward.type === "gem";
      const shouldDisable = isGem && allCardsSocketed;

      if (shouldDisable) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }

      if (!shouldDisable) {
        btn.onclick = () => {
          if (reward.type === "gold") {
            dispatch({
              type: ACTIONS.CLAIM_GOLD_REWARD,
              payload: { index, amount: reward.value },
            });
          } else if (reward.type === "card") {
            dispatch({ type: ACTIONS.PICK_CARD, payload: index });
          } else if (reward.type === "relic") {
            dispatch({ type: ACTIONS.PICK_RELIC, payload: index });
          } else if (reward.type === "potion") {
            dispatch({ type: ACTIONS.PICK_POTION, payload: index });
          } else if (reward.type === "gem") {
            dispatch({
              type: ACTIONS.OPEN_MOD_SCREEN,
              payload: {
                mod: { gem: reward.value },
                origin: PHASES.COMBAT_END,
              },
            });
          }
        };
      }

      rewardSection.appendChild(btn);
    });

    output.appendChild(rewardSection);
  }
  // === GAME OVER screen ====
  if (state.currentPhase === PHASES.GAME_OVER) {
    const gameOverSection = document.createElement("div");
    gameOverSection.classList.add("game-over");

    const banner = document.createElement("h1");
    banner.textContent =
      state.result === "Victory" ? "🏆 Victory!" : "💀 Defeat!";
    gameOverSection.appendChild(banner);

    const summary = document.createElement("div");
    summary.innerHTML = `
      <p>Game ended at level: ${state.level}</p>
      <h3>Decklist:</h3>
      <ul>
        ${state.campaign.deck
          .map(
            (card) =>
              `<li>${card.name}</li>
`
          )
          .join("")}
      </ul>
      <h3>Relics:</h3>
      <ul>
        ${state.relicBelt.map((relic) => `<li>${relic.name}</li>`).join("")}
      </ul>
    `;
    gameOverSection.appendChild(summary);

    const newGameBtn = document.createElement("button");
    newGameBtn.textContent = "Return to Main Menu";
    newGameBtn.onclick = () => {
      dispatch({ type: ACTIONS.NEW_GAME });
    };

    gameOverSection.appendChild(newGameBtn);
    output.appendChild(gameOverSection);
  }

  // === Deck Inspect / Return Button ===
  //deck inspect button
  if (
    (state.currentScreen === SCREENS.MAIN ||
      state.currentScreen === SCREENS.DECK) &&
    state.campaign.deck.length > 0
  ) {
    const deckBtn = document.createElement("button");
    deckBtn.textContent =
      state.currentScreen === SCREENS.MAIN ? "Inspect Deck" : "Return";
    deckBtn.onclick = () => {
      const nextScreen =
        state.currentScreen === SCREENS.MAIN ? SCREENS.DECK : SCREENS.MAIN;
      dispatch({
        type: ACTIONS.SCREEN_CHANGE,
        payload: nextScreen,
      });
    };
    output.appendChild(deckBtn);
  }
  // deck inspect screen
  if (state.currentScreen === SCREENS.DECK) {
    const deckView = document.createElement("div");
    deckView.innerHTML = `<h3>Campaign Deck</h3>`;
    const ul = document.createElement("ul");

    state.campaign.deck.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
      ul.appendChild(li);
    });

    deckView.appendChild(ul);
    output.appendChild(deckView);
  }

  // === Always-Visible Potion Belt ===
  if (state.potionBelt && state.potionBelt.length > 0) {
    const beltSection = document.createElement("div");
    beltSection.innerHTML = `<h3>Your Potions</h3>`;

    state.potionBelt.forEach((potion, index) => {
      const btn = document.createElement("button");
      btn.textContent = potion.name;

      const isCombatPhase = state.currentPhase === PHASES.COMBAT;
      const isDrinkableNow =
        potion.drinkableOutOfCombat !== false || isCombatPhase;

      if (!isDrinkableNow) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }

      btn.onclick = () => {
        if (isDrinkableNow) {
          dispatch({ type: ACTIONS.DRINK_POTION, payload: index });
        }
      };

      beltSection.appendChild(btn);
    });

    output.appendChild(beltSection);
  }
}
// #endregion

// Initialize the game app
window.onload = () => {
  createGameApp(createInitialState(), gameReducer, render);
};

//hotkeys
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dispatch({ type: ACTIONS.SCREEN_CHANGE, payload: SCREENS.MAIN });
  }
});

//#region WIP
// //------------------------------------------------WIP functions for MVP ------------------------------------------------
function startTurn(state) {
  console.log(">>> Starting new turn. Books remaining: ", state.combat.books);

  if (state.combat.books < 1) {
    return {
      ...state,
      combat: {
        ...state.combat,
        combatEnded: true,
      },
      log: ["📕 You have no books left. Combat ends.", ...state.log],
    };
  }

  // Open a new spellbook of blank pages
  const newBook = Array(state.combat.pages).fill("blank page");

  const baseBunnies = state.combat.baseBunnies ?? 0;

  // Subtract one book, set up spellbook, and apply base bunnies
  let updatedState = {
    ...state,
    combat: {
      ...state.combat,
      books: state.combat.books - 1,
      spellbook: newBook,
      bunnies: baseBunnies, // ✅ Set starting bunnies for the turn
      combatEnded: false,
    },
    log: [
      `📖 A new turn begins. 🐇 Gained ${baseBunnies} bunnies.`,
      ...state.log,
    ],
  };

  updatedState = newHand(updatedState);
  updatedState = refillInkpot(updatedState);

  return updatedState;
}

function shuffleGraveyardIntoDeck(state) {
  const graveyard = state.combat?.graveyard ?? [];
  const deck = state.combat?.deck ?? [];

  if (graveyard.length === 0) {
    return {
      ...state,
      log: ["Your graveyard is already empty.", ...state.log],
    };
  }

  // Purely combine and shuffle
  const combinedDeck = [...deck, ...graveyard];
  const shuffledDeck = shuffleArray(combinedDeck);

  let updatedState = {
    ...state,
    combat: {
      ...state.combat,
      deck: shuffledDeck,
      graveyard: [], // clear graveyard
    },
    log: ["You shuffled your graveyard into your deck.", ...state.log],
  };

  // 🔁 Check for relic triggers
  updatedState = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.SHUFFLE_GRAVEYARD_INTO_DECK
  );

  // 🧪 Check if anyone died as a result of relic effects
  updatedState = checkCombatEndViaDeath(updatedState);

  return updatedState;
}

function refillInkpot(state) {
  const maxInk = state.combat?.maxInk ?? 0;

  return {
    ...state,
    combat: {
      ...state.combat,
      ink: maxInk,
    },
    log: [`🔮 Inkpot refilled to ${maxInk}.`, ...state.log],
  };
}
function checkCombatEndViaDeath(state) {
  const playerDead = state.health <= 0;
  const enemyDead = state.combat?.enemyHp <= 0;

  if (playerDead) {
    console.log(">>> Player is dead. Ending combat.");

    return combatEnd(state, { result: "loss" });
  }

  if (enemyDead) {
    console.log(">>> Enemy is dead. Ending combat.");

    return combatEnd(state, { result: "win" });
  }

  // No one is dead — combat continues
  return state;
}
function newHand(state) {
  let updatedState = {
    ...state,
    combat: {
      ...state.combat,
      hand: [], // clear hand before drawing
    },
  };

  for (let i = 0; i < updatedState.combat.handSize; i++) {
    updatedState = drawCard(updatedState);
  }

  return updatedState;
}
function drawCard(state) {
  let updatedState = { ...state };

  // 🛠 Use the most recent combat state from the input state
  let currentCombat = updatedState.combat;

  // Step 1: If deck is empty, try to shuffle from graveyard
  if (currentCombat.deck.length === 0) {
    updatedState = shuffleGraveyardIntoDeck(updatedState);
  }

  // 🧠 Rebind again after potential shuffle
  currentCombat = updatedState.combat;

  // Step 2: If still no cards, apply fatigue
  if (currentCombat.deck.length === 0) {
    updatedState = takeDamage(updatedState, 1, { skipDeathCheck: false });
    updatedState = {
      ...updatedState,
      log: [
        "💀 Lost 1 HP to fatigue by attempting to draw from an empty deck.",
        ...updatedState.log,
      ],
    };
    return updatedState;
  }

  // Step 3: Draw the card normally
  const [drawnCard, ...remainingDeck] = currentCombat.deck;
  updatedState = {
    ...updatedState,
    combat: {
      ...currentCombat,
      deck: remainingDeck,
      hand: [...currentCombat.hand, drawnCard],
    },
    log: [`📜 Drew card: ${drawnCard.name}`, ...updatedState.log],
  };

  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.DRAW_CARD);
  updatedState = checkCardTriggers(
    updatedState,
    drawnCard,
    TRIGGER_EVENTS.DRAW_CARD
  );

  return updatedState;
}

function checkCardTriggers(state, card, triggerEvent, context = {}) {
  let updatedState = { ...state };
  const effect = card.triggers?.[triggerEvent];
  if (!effect) return updatedState;
  // === Handle DRAW_CARD triggers ===
  if (triggerEvent === TRIGGER_EVENTS.DRAW_CARD) {
    // on draw triggers go here
  }
  // === Handle PICK_CARD triggers ===
  if (triggerEvent === TRIGGER_EVENTS.PICK_CARD) {
    // on pick triggers go here
  }
  return updatedState;
}
function addBunnies(state, bunnyAdd) {
  return {
    ...state,
    combat: {
      ...state.combat,
      bunnies: (state.combat.bunnies ?? 0) + bunnyAdd,
    },
  };
}
function multiplyBunnies(state, bunnyMult) {
  return {
    ...state,
    combat: {
      ...state.combat,
      bunnies: Math.floor((state.combat.bunnies ?? 0) * bunnyMult),
    },
  };
}
function takeDamage(state, dmg, options = {}) {
  console.trace("taking damage:", dmg, "options:", options);
  const skipDeathCheck = options.skipDeathCheck ?? false;

  const updatedState = {
    ...state,
    health: Math.max(0, state.health - dmg),
    log: [`You took ${dmg} damage.`, ...state.log],
  };

  return skipDeathCheck ? updatedState : checkCombatEndViaDeath(updatedState);
}

function dealDamage(state, damage, damageTypes = [], options = {}) {
  const { isBonus = false } = options;
  const newEnemyHp = Math.max(0, state.combat.enemyHp - damage);

  console.log(
    `>> dealDamage: current enemy HP = ${
      state.combat.enemyHp
    }, damage = ${damage}, new = ${newEnemyHp}, types = [${damageTypes.join(
      ", "
    )}], isBonus = ${isBonus}`
  );

  let updatedState = {
    ...state,
    combat: {
      ...state.combat,
      enemyHp: newEnemyHp,
    },
    log: [
      `⚔️ You dealt ${damage} damage to ${state.combat.enemy.name}` +
        (damageTypes.length > 0 ? ` (${damageTypes.join(", ")})` : "") +
        ".",
      ...state.log,
    ],
  };

  // Only trigger relics if this isn't bonus damage
  if (!isBonus) {
    for (const damageType of damageTypes) {
      updatedState = checkRelicTriggers(
        updatedState,
        TRIGGER_EVENTS.DEAL_DAMAGE,
        {
          damageType,
          amount: damage,
          enemy: state.combat.enemy,
        }
      );
    }
  }

  updatedState = checkCombatEndViaDeath(updatedState);
  updatedState = checkGameOver(updatedState);

  return updatedState;
}

function playCard(state, index) {
  const hand = [...state.combat.hand];
  const card = hand[index];

  /* ── Guard clauses ─────────────────────────────────────────────────── */
  if (!card || card.uncastable) return state;
  if ((card.inkCost ?? 0) > state.combat.ink) return state;

  /* ── Step 1: deduct ink ────────────────────────────────────────────── */
  let updatedState = modifyCombatInk({ ...state }, -card.inkCost);

  /* ── Step 2: remove card from hand ─────────────────────────────────── */
  hand.splice(index, 1);
  updatedState = {
    ...updatedState,
    combat: { ...updatedState.combat, hand },
  };

  /* ── Step 3: relic triggers for PLAY_CARD ──────────────────────────── */
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.PLAY_CARD, {
    card,
  });

  /* ── INSTANT cards resolve immediately ─────────────────────────────── */
  if (card.cardType === CARD_TYPES.INSTANT) {
    //  No zone-placement here!  resolveSpell will handle graveyard/exile
    updatedState = resolveSpell(updatedState, card);
    updatedState = checkCombatEndViaDeath(updatedState);
    updatedState = checkGameOver(updatedState);
    return updatedState;
  }

  /* ── SPELL cards: place into spellbook ─────────────────────────────── */
  const spellbook = [...updatedState.combat.spellbook];
  const firstBlank = spellbook.indexOf("blank page");
  if (firstBlank === -1) return updatedState; // failsafe

  spellbook[firstBlank] = card;
  updatedState = {
    ...updatedState,
    combat: { ...updatedState.combat, spellbook },
  };

  /* ── Auto-cast when the spellbook is full ───────────────────────────── */
  if (!spellbook.includes("blank page")) {
    updatedState = castSpellbook(updatedState);
    updatedState = checkCombatEndViaDeath(updatedState);
    updatedState = checkGameOver(updatedState);
  }

  return updatedState;
}

function castSpellbook(state) {
  let updatedState = { ...state };

  // 🌀 Trigger relic effects for CAST_SPELLBOOK
  updatedState = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.CAST_SPELLBOOK
  );

  // 🔮 Cast each non-blank spell in the spellbook
  for (const card of updatedState.combat.spellbook) {
    if (typeof card !== "object" || card.name === "blank page") continue;
    updatedState = resolveSpell(updatedState, card);
  }

  // 🐇 Release bunnies (deal damage equal to bunny count)
  updatedState = releaseBunnies(updatedState);

  // ✅ If enemy is still alive
  if (updatedState.combat?.enemyHp > 0) {
    // 👇 Check if any books remain
    if (updatedState.combat.books > 0) {
      console.log(">>> Enemy survived, but books remain. Next turn begins.");
      return startTurn(updatedState);
    } else {
      console.log(">>> Enemy survived. No books left. Player loses combat.");
      return combatEnd(updatedState, { result: "loss" });
    }
  }

  // ✅ Enemy is dead → player wins
  return combatEnd(updatedState, { result: "win" });
}
function releaseBunnies(state) {
  const bunnyDamage = state.combat.bunnies ?? 0;

  if (bunnyDamage <= 0) {
    return {
      ...state,
      combat: {
        ...state.combat,
        bunnies: 0,
      },
    };
  }

  let updatedState = { ...state };

  // ✅ Pass as an array now
  updatedState = dealDamage(updatedState, bunnyDamage, [DAMAGE_TYPES.BUNNY]);

  updatedState = {
    ...updatedState,
    combat: {
      ...updatedState.combat,
      bunnies: 0,
    },
    log: [
      `Released ${bunnyDamage} bunn${bunnyDamage === 1 ? "y" : "ies"}!`,
      ...updatedState.log,
    ],
  };

  return updatedState;
}

function endTurn(state) {
  let updatedState = { ...state };

  // 🧪 Check if combat has ended via death
  updatedState = checkCombatEndViaDeath(updatedState);
  if (updatedState.combat.combatEnded) return updatedState;

  // 🪦 Move remaining cards in hand to the graveyard
  const remainingHand = updatedState.combat.hand || [];
  const updatedGraveyard = [...updatedState.combat.graveyard, ...remainingHand];

  updatedState = {
    ...updatedState,
    combat: {
      ...updatedState.combat,
      hand: [],
      graveyard: updatedGraveyard,
    },
    log: [`You ended your turn.`, ...updatedState.log],
  };

  // 🧪 Check again before starting next turn
  if (updatedState.combat.combatEnded) return updatedState;

  // 🔁 Start a new turn
  return startTurn(updatedState);
}

function resolveSpell(state, card) {
  if (!card || typeof card !== "object") return state;

  let updatedState = { ...state };
  const effects = [];

  // === Bunny Add ===
  if (card.bunnyAdd) {
    updatedState = addBunnies(updatedState, card.bunnyAdd);
    effects.push(`+${card.bunnyAdd} bunn${card.bunnyAdd === 1 ? "y" : "ies"}`);
  }

  // === Bunny Multiply ===
  if (card.bunnyMult) {
    updatedState = multiplyBunnies(updatedState, card.bunnyMult);
    effects.push(`×${card.bunnyMult} bunnies`);
  }

  // === Gain Gold ===
  if (card.goldAdd) {
    updatedState = gainGold(updatedState, card.goldAdd);
    effects.push(`+${card.goldAdd} gold`);
  }

  // === Add Ink ===
  if (card.inkAdd) {
    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        ink: updatedState.combat.ink + card.inkAdd,
      },
    };
    effects.push(`+${card.inkAdd} ink`);
  }

  // === Draw Cards ===
  if (card.cardDraw) {
    for (let i = 0; i < card.cardDraw; i++) {
      updatedState = drawCard(updatedState);
    }
    effects.push(`Drew ${card.cardDraw} card${card.cardDraw === 1 ? "" : "s"}`);
  }

  // === Health Cost ===
  if (card.healthCost) {
    updatedState = takeDamage(updatedState, card.healthCost);
    effects.push(`-${card.healthCost} HP`);
  }

  // === Permanently Upgrade Cards in Deck ===
  if (card.permanentlyUpgradeRandomCardsInDeck) {
    const numToUpgrade = Math.min(
      card.permanentlyUpgradeRandomCardsInDeck,
      updatedState.campaign.deck.length
    );
    const upgradedDeck = permanentlyUpgradeRandomCardsInDeck(
      updatedState.campaign.deck,
      numToUpgrade
    );
    updatedState = {
      ...updatedState,
      campaign: {
        ...updatedState.campaign,
        deck: upgradedDeck,
      },
    };
    effects.push(`Upgraded ${numToUpgrade} card(s) in deck`);
  }

  // === Permanently Upgrade Cards in Hand ===
  if (card.permanentlyUpgradeRandomCardsInHand) {
    const numToUpgrade = Math.min(
      card.permanentlyUpgradeRandomCardsInHand,
      updatedState.combat.hand.length
    );
    const upgradedHand = permanentlyUpgradeRandomCardsInDeck(
      updatedState.combat.hand,
      numToUpgrade
    );
    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        hand: upgradedHand,
      },
    };
    effects.push(`Upgraded ${numToUpgrade} card(s) in hand`);
  }

  // === Flat Damage ===
  if (card.damage) {
    const types =
      Array.isArray(card.damageTypes) && card.damageTypes.length > 0
        ? card.damageTypes
        : [DAMAGE_TYPES.BUNNY];

    updatedState = dealDamage(updatedState, card.damage, types);
    effects.push(`Dealt ${card.damage} ${types.join("/")} damage`);
  }

  // === Rolled Damage (e.g., Lightning) ===
  if (
    card.damageRoll &&
    typeof card.damageRoll.dice === "number" &&
    typeof card.damageRoll.sides === "number"
  ) {
    const { dice, sides, flatBonus = 0 } = card.damageRoll;
    const damage = rollDice(dice, sides, flatBonus);

    const types =
      Array.isArray(card.damageTypes) && card.damageTypes.length > 0
        ? card.damageTypes
        : [DAMAGE_TYPES.BUNNY];

    updatedState = dealDamage(updatedState, damage, types);

    const typeList = types.join(" & ");
    effects.push(`Dealt ${damage} ${typeList} damage`);
  }

  /// === Upgrade on Cast (if applicable) ===
  if (card.upgradesOnCast) {
    const upgradedCard = upgradeCard(card, card.upgradesOnCast);

    // === Update campaign deck with upgraded version
    updatedState = upgradeSpecificCardInCampaignDeck(
      updatedState,
      card,
      card.upgradesOnCast
    );

    const destination = upgradedCard.exileOnCast ? "exile" : "graveyard";
    const updatedSpellbook = updatedState.combat.spellbook.filter(
      (c) => c.name !== card.name
    );

    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        spellbook: updatedSpellbook,
        [destination]: [...updatedState.combat[destination], upgradedCard],
      },
      trashpile: [...(updatedState.trashpile || []), card],
      log: [`Cast ${card.name}: ${effects.join(", ")}`, ...updatedState.log],
    };

    return checkCombatEndViaDeath(updatedState);
  } else {
    // === Move to Exile or Graveyard ===
    const destination = card.exileOnCast ? "exile" : "graveyard";
    const updatedSpellbook = updatedState.combat.spellbook.filter(
      (c) => c.name !== card.name
    );

    updatedState = {
      ...updatedState,
      combat: {
        ...updatedState.combat,
        spellbook: updatedSpellbook,
        [destination]: [...updatedState.combat[destination], card],
      },
      trashpile: [...(updatedState.trashpile || []), card],
      log: [`Cast ${card.name}: ${effects.join(", ")}`, ...updatedState.log],
    };

    return checkCombatEndViaDeath(updatedState);
  }
}

function combatEnd(state, context = {}) {
  console.log(">>> Entered combatEnd with context:", context);

  if (!state.combat || state.currentPhase === PHASES.COMBAT_END) {
    return state; // Already ended or invalid
  }

  let updatedState = { ...state };
  const result = context.result ?? "loss";
  const victory = result === "win";
  const enemy = updatedState.combat?.enemy;

  // === Call relic triggers for COMBAT_END
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.COMBAT_END);

  // === Handle victory
  if (victory) {
    const rewards = [
      ...(updatedState.combat.rewards ?? []),
      ...(enemy?.loot ?? []),
    ];

    if (enemy?.isBoss) {
      const bossRelic = getRandomBossRelic();
      if (bossRelic) rewards.push(bossRelic);
    }

    const defeatedEnemies = [...(updatedState.defeatedEnemies ?? []), enemy];

    updatedState = {
      ...updatedState,
      defeatedEnemies,
      offerings: {
        ...updatedState.offerings,
        combatRewards: rewards,
      },
    };

    updatedState = checkGameOver(updatedState);
  } else {
    // === Handle defeat: take damage equal to enemy's remaining HP
    const remainingEnemyHp = updatedState.combat?.enemyHp ?? 0;

    if (enemy?.isBoss) {
      // Immediate game over
      updatedState = {
        ...updatedState,
        gameOverResult: "loss",
        log: [
          `☠️ You were defeated by ${enemy.name}. The journey ends here.`,
          ...updatedState.log,
        ],
      };
    } else {
      if (remainingEnemyHp > 0) {
        updatedState = takeDamage(updatedState, remainingEnemyHp, {
          skipDeathCheck: true,
        });
        updatedState = {
          ...updatedState,
          log: [
            `☠️ You were defeated by ${
              enemy?.name ?? "the enemy"
            } and took ${remainingEnemyHp} damage.`,
            ...updatedState.log,
          ],
        };
      } else {
        updatedState = {
          ...updatedState,
          log: [
            `☠️ You were defeated by ${enemy?.name ?? "the enemy."}`,
            ...updatedState.log,
          ],
        };
      }

      updatedState = checkGameOver(updatedState);
    }
  }

  // === Clean up combat state
  const cleanedCombat = {
    ...updatedState.combat,
    spellbook: [],
    hand: [],
    graveyard: [],
    bunnies: 0,
  };

  // === Determine next phase
  let finalState = {
    ...updatedState,
    combat: cleanedCombat,
  };

  if (finalState.gameOverResult) {
    finalState = advancePhaseTo(finalState, PHASES.GAME_OVER);
    finalState = {
      ...finalState,
      log: [`🛑 Game Over: ${finalState.gameOverResult}`, ...finalState.log],
    };
  } else {
    finalState = advancePhaseTo(finalState, PHASES.COMBAT_END);
  }

  return handlePhaseTransitions(finalState);
}

function closeCombatRewards(state) {
  const hasUnclaimedLoot =
    state.offerings?.combatRewards && state.offerings.combatRewards.length > 0;

  // Optional: Log message about skipping loot
  const logEntry = hasUnclaimedLoot
    ? "Skipped remaining combat loot."
    : "Combat complete.";

  const newState = {
    ...state,
    offerings: {
      ...state.offerings,
      combatRewards: [], // clear the rewards
    },
    log: [logEntry, ...state.log],
  };

  const pathState = advancePhaseTo(newState, PHASES.PATH_SELECTION);
  return handlePhaseTransitions(pathState);
}
function checkGameOver(state) {
  const playerDead = state.health <= 0;
  const defeatedBosses = (state.defeatedEnemies || []).filter(
    (enemy) => enemy.isBoss
  ).length;

  if (playerDead) {
    return {
      ...state,
      gameOverResult: "loss",
    };
  }

  if (defeatedBosses >= 3) {
    return {
      ...state,
      gameOverResult: "victory",
    };
  }

  return state;
}

function gameOver(state, result) {
  return {
    ...state,
    gameResult: result,
    currentPhase: PHASES.GAME_OVER,
    log: [`🛑 Game Over: ${result}`, ...state.log],
  };
}
function exitShop(state) {
  const cleanedState = {
    ...state,
    offerings: {
      ...state.offerings,
      shopfront: [], // Clear the shop
    },
    log: ["🛒 Exited the shop.", ...state.log],
  };

  // Use your phase transition helpers to change to the next phase
  return handlePhaseTransitions(
    advancePhaseTo(cleanedState, PHASES.PATH_SELECTION)
  );
}

function rollDice(numDice, sidesPerDie, flatBonus = 0) {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * sidesPerDie) + 1;
  }
  return total + flatBonus;
}

function upgradeSpecificCardInCampaignDeck(state, card, upgrades = 1) {
  if (!state?.campaign?.deck || !Array.isArray(state.campaign.deck)) {
    console.error("No valid campaign deck found in state.");
    return state;
  }

  const deck = [...state.campaign.deck];
  const index = deck.findIndex((c) => c.name === card.name);

  if (index === -1) {
    console.warn(`Card not found in campaign deck: ${card.name}`);
    return state;
  }

  deck[index] = upgradeCard(deck[index], upgrades);

  return {
    ...state,
    campaign: {
      ...state.campaign,
      deck,
    },
  };
}

//current bugs/fixes/additions.

// if you start a new game after losing, it seems to carry on some of the previous game state. Make sure to completely clean the state.
// game gets mega bugged if you continue to play after a defeat. Really double check the state cleanup.

//render: inspect deck / combat deck / graveyard / exile should all dispaly the #of cards in brackets.

//shop bugs
//purchasing a gem doesn't remove it from the shop, so you can buy it multiple times.

//downgrading cards doesn't affect the new fire and lightning mechanics - it should.

//potion bugs
// ponderous potion doesn't draw cards. (and should log)
// bunny brew doesn't work. (and should log)
// liquid enchantment behaves strangely - possibly not working.
// squid brew shouldnt increase max ink.

//relic bugs
//discount voucher should act immediately on pickup as well as on shopfront load.
//firemage's hat should reduce ink costs by 1, but it doesn't work correctly.
//carrot staff doesn't round numbers; it can add 0.5 bunnies, which is weird.
// lightning rod doesn't work - no cards drawn.
// whetstone doesnt work if you buy things from shop.

//bug with socketing naming (or at least displaying) - eg., Amber Bunnymancy +1 2d5+1 (checkinspect deck render as well as the naming logic, error could be in either place)

//losing to bosses does't make you lose the game (it should, but it doesn't).

//expanding the game
//consider doubling enemy HP and adding +1 book to base state. Probably more fun.
//consider a once-per-combat 'mulligan' button, allowing the player to craft the perfect spellbook or dig for their best card.
//a relic to increase the mulligan count.
// a mythic gem that makes a spell cost 1 less ink, be an instant, and exile on cast.
// implement a 'gold hoarding matters' mythic that adds bunnies based on gold.
// implement "critical hit" mechanics; cards, gems, and relics, plus three 'critical hit matters' mythics - one that boosts crit amounts,  one that increases crit chance, and one that gives crits to everything.
// implement three boss abilties keyed to the boss name: 'downgrade all cards in enemy deck', '+1 ink cost to all enemy cards', and 'enemy loses 1 hp whenever they play a card'.
