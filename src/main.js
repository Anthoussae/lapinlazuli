"use strict";
//note to self: most functions that create a new gamestate (reducer actions) will require:

// 1) the function itself
// 2) adding to the action enum.
// 3) adding to the reducer switch statement
// 4) adding to the render function.
// 5) possibly adding to the phase transition handler.

//#region enums
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
});
const PATHS = Object.freeze({
  EASY_FIGHT: "easy fight",
  MEDIUM_FIGHT: "medium fight",
  HARD_FIGHT: "hard fight",
  BOSS_FIGHT: "boss fight",
  REST: "rest",
  SHOP: "shop",
  RELIC_OFFERING: "relicOffering",
  GEM_OFFERING: "gemOffering",
  CARD_OFFERING: "cardOffering",
  ENCHANT: "ENCHANT",
  POTION_OFFERING: "potionOffering",
  HOARD: "hoard",
  PURGE: "purge",
  TRANSMUTE: "transmute",
});
const SCREENS = Object.freeze({
  MAIN: "main view",
  DECK: "inspect deck",
  RELICS: "inspect relic belt",
  SETTINGS: "settings",
  MOD: "modscreen",
});
const RARITIES = Object.freeze({
  BASIC_POLY: "basic-poly", // basic poly cards, several of which go in the starter deck.
  BASIC_MONO: "basic-mono", // basic mono cards, only one goes in the starter deck.
  COMMON: "common", // common cards
  UNCOMMON: "uncommon", // uncommon cards
  RARE: "rare", // rare cards
  MYTHIC: "mythic", // mythic cards
  LEGENDARY: "legendary", // legendary cards
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
  DEATH: "death",
  VICTORY: "victory",
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
});
const CARD_TYPES = Object.freeze({
  INSTANT: "instant", // resolves immediately when played, does not go to the spellbook.
  SPELL: "spell", // goes to the spellbook when played, resolves when the spellbook is cast.
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
  },
  [DIFFICULTIES.MEDIUM]: {
    maxHealthModifier: 75,
    goldModifier: 10,
    basicCardCountModifier: 8,
    luckModifier: 1,
    shopPriceMultiplierModifier: 0, // normal shop prices
    restHealthRestoreModifier: 25, // heal 20 health when resting
  },
  [DIFFICULTIES.HARD]: {
    maxHealthModifier: 50,
    goldModifier: 0,
    basicCardCountModifier: 11,
    luckModifier: 0,
    shopPriceMultiplierModifier: 0.2, // 20% more expensive shop prices
    restHealthRestoreModifier: 20, // heal 20 health when resting
  },
});
const pathMap = Object.freeze({
  [PATHS.EASY_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
  },
  [PATHS.MEDIUM_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
  },
  [PATHS.HARD_FIGHT]: {
    rarity: RARITIES.COMMON,
    isFight: true,
    leadsTo: PHASES.COMBAT,
  },
  [PATHS.BOSS_FIGHT]: {
    rarity: RARITIES.SPECIAL,
    isFight: true,
    leadsTo: PHASES.COMBAT,
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
  [PATHS.PURGE]: { rarity: RARITIES.RARE, leadsTo: PHASES.PURGE },
  [PATHS.TRANSMUTE]: { rarity: RARITIES.RARE, leadsTo: PHASES.TRANSMUTE },
});

//#endregion data maps
//#region data arrays of game objects
const cardList = [
  {
    name: "Bunnymancy",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_POLY,
    cost: 1,
    bunnyAdd: 5,
  },
  {
    name: "Bunnyplication",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_POLY,
    cost: 2,
    bunnyMult: 2,
  },
  {
    name: "Fairy Gold",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    cost: 1,
    goldAdd: 3,
  },
  {
    name: "Enchant",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    cost: 2,
    permanentlyUpgradeRandomCardsInDeck: 1,
  },
  {
    name: "Ponder",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.COMMON,
    cost: 1,
    cardDraw: 3,
  },
  {
    name: "Inkswell",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    cost: 1,
    inkAdd: 2,
  },
  {
    name: "Cloudfluff Conjuration",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    cost: 0,
    bunnyAdd: 4,
  },
  {
    name: "Cloudfluff Boon",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.RARE,
    cost: 0,
    bunnyAdd: 2,
  },
  {
    name: "Midas Touch",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.RARE,
    cost: 3,
    goldAdd: 12,
  },
  {
    name: "Enchanted Twilight",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.RARE,
    cost: 3,
    permanentlyUpgradeRandomCardsInDeck: 2,
  },
  {
    name: "Dusk Lotus",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.MYTHIC,
    cost: 0,
    inkAdd: 3,
    healthCost: 3,
    exile: true, // Exile this card after use
  },
  {
    name: "Weasel's Bargain",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.UNCOMMON,
    cost: 0,
    healthCost: 2,
    goldAdd: 6,
  },
  {
    name: "Carrot Festival",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    cost: 2,
    bunnyAdd: 14,
  },
  {
    name: "Mega Bunnyplication",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.COMMON,
    cost: 2,
    bunnyMult: 4,
  },
  {
    name: "Empower",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.UNCOMMON,
    cost: 1,
    permanentlyUpgradeRandomCardsInHand: 1,
  },
  {
    name: "Mass Empower",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.RARE,
    cost: 3,
    permanentlyUpgradeRandomCardsInHand: 7,
  },
  {
    name: "Wisdom of the Warrens",
    cardType: CARD_TYPES.INSTANT,
    rarity: RARITIES.MYTHIC,
    cost: 0,
    cardDraw: 1,
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
  {
    name: "Sapphire",
    rarity: RARITIES.UNCOMMON,
    cardDraw: 1,
  },
  {
    name: "Topaz",
    rarity: RARITIES.RARE,
    goldAdd: 5,
  },
  {
    name: "Ruby",
    rarity: RARITIES.MYTHIC,
    permanentlyUpgradeRandomCardsInDeck: 1,
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
        bonusBaseBunnies: 1,
      },
    },
  },
  {
    name: "Magic Egg",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusGold: 100,
      },
    },
  },
  {
    name: "Healing Stone",
    rarity: RARITIES.COMMON,
    // not a pickup trigger — save for future COMBAT_VICTORY event
    bonusHealthOnCombatVictory: 10,
  },
  {
    name: "Protective Amulet",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusHealth: 10,
      },
    },
  },
  {
    name: "Magic Encyclopedia",
    rarity: RARITIES.RARE,
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
        bonusInk: 1,
      },
    },
  },
  {
    name: "Magic Wand",
    rarity: RARITIES.MYTHIC,
    // not triggered on pickup — belongs to CARD_CAST or similar
    bunnyAddOnCast: 5,
  },
  {
    name: "Magic Keys",
    rarity: RARITIES.MYTHIC,
    // not a pickup effect — save for COMBAT_VICTORY
    goldAddOnCombatVictory: 10,
  },
  {
    name: "Magic Quill",
    rarity: RARITIES.LEGENDARY,
    triggers: {
      [TRIGGER_EVENTS.RELIC_PICKUP]: {
        bonusInk: 2,
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
        healPlayer: 20, // heal 20 health when resting
      },
    },
  },
  {
    name: "Toothfairy's Charm",
    rarity: RARITIES.COMMON,
    triggers: {
      [TRIGGER_EVENTS.REST]: {
        goldAdd: 10, // gain 10 gold when resting
      },
    },
  },
  {
    name: "Planetarium Mobile",
    rarity: RARITIES.UNCOMMON,
    triggers: {
      [TRIGGER_EVENTS.REST]: {
        permanentlyUpgradeRandomCardsInDeck: 1, // upgrade a random card in the deck when resting
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
];
const enemyList = [
  {
    name: "Lettuce Goblin",
    level: 1,
    difficulty: DIFFICULTIES.EASY,
    health: 10,
    goldRewardChance: 0.5,
    gemRewardChance: 0.1,
    potionRewardChance: 0.1,
    relicRewardChance: 0.01,
  },
];
//#endregion
//#region utility functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
function screenChange(state, targetScreen) {
  return {
    ...state,
    currentScreen: targetScreen,
    log: [`Screen changed to ${targetScreen}.`, ...state.log],
  };
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

    const basePrice = basePrices[type] || 0;
    const upgrades = item.upgrades || 0;
    const upgradeCost = ["card", "potion"].includes(type) ? upgrades * 5 : 0;

    const rarity = item.rarity?.toLowerCase?.() || "common";
    const rarityMultiplier = rarityMultipliers[rarity] || 1;

    const cost = Math.round(
      (basePrice + upgradeCost) * rarityMultiplier * globalMultiplier
    );

    return {
      ...entry,
      item: {
        ...item,
        cost,
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

  // 4. Shuffle the deck
  shuffle(deck);

  // 5. Return new state with updated campaign.deck
  return {
    ...state,
    campaign: {
      ...state.campaign,
      deck,
    },
    log: [`Generated starter deck (${deck.length} cards).`, ...state.log],
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
    log: [`Applied difficulty modifiers for ${difficulty}.`, ...state.log],
  };
}

function advancePhaseTo(state, phaseAdvancedTo) {
  if (!Object.values(PHASES).includes(phaseAdvancedTo)) {
    console.error("Invalid phase passed to advancePhaseTo:", phaseAdvancedTo);
    return state;
  }

  return {
    ...state,
    currentPhase: phaseAdvancedTo,
    log: [`Advanced to phase: ${phaseAdvancedTo}`, ...state.log],
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
    currentPhase: pathData.leadsTo,
    log: [`Chose path: ${pathKey}`, ...state.log],
    offerings: {
      ...state.offerings,
      paths: [], // clear after pick
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
    log: [`Populated card offerings.`, ...state.log],
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
    log: [`Populated potion offerings.`, ...state.log],
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
    log: [`Populated relic offerings.`, ...state.log],
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
    log: [`Populated gem offerings.`, ...state.log],
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

  // === Step 2a: Exclude GEM_OFFERING if all cards are socketed ===
  const allCardsSocketed =
    state.campaign.deck?.length > 0 &&
    state.campaign.deck.every((card) => card.gem != null);

  const filteredPaths = allPaths.filter((pathObj) => {
    if (pathObj.path === PATHS.GEM_OFFERING && allCardsSocketed) return false;
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

  return {
    ...updatedState,
    misery: newMisery,
    offerings: {
      ...updatedState.offerings,
      paths: updatedPaths,
    },
    log: [
      allFights
        ? `Populated path options (all fights — misery increased to ${newMisery}).`
        : `Populated path options.`,
      ...updatedState.log,
    ],
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

  // 🛠️ Unwrap if from shop
  const pickedCard = sourceArrayName === "shopfront" ? entry.item : entry;

  if (!pickedCard) {
    console.error("No card found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const cost = entry.cost || 20;
    const charged = chargeGoldCost(state, cost, "card");
    if (charged === state) return state; // not enough gold
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
  const pickedRelic = sourceArrayName === "shopfront" ? entry.item : entry;

  if (!pickedRelic) {
    console.error("No relic found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const relicCost = entry.cost || 50;
    const chargedState = chargeGoldCost(state, relicCost, "relic");
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
  if (offerings.potions && index < offerings.potions.length) {
    sourceArrayName = "potions";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else {
    console.error("Invalid potion index:", index);
    return state;
  }

  const sourceArray = offerings[sourceArrayName];
  const entry = sourceArray[index];

  // 🛠️ Unwrap the potion if it came from the shop
  const pickedPotion = sourceArrayName === "shopfront" ? entry.item : entry;

  if (!pickedPotion) {
    console.error("No potion found at index:", index);
    return state;
  }

  // === 2. Charge cost if in shop ===
  let updatedState = state;
  if (phase === PHASES.SHOP) {
    const cost = entry.cost || 30;
    const charged = chargeGoldCost(state, cost, "potion");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 3. Apply pickup relic triggers (may upgrade the potion) ===
  const triggerResult = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.POTION_PICKUP,
    { payload: pickedPotion }
  );
  const triggeredPotion = triggerResult.result;
  updatedState = { ...triggerResult }; // ensures any other state changes are included

  // === 4. Add to top-level potion belt ===
  const updatedPotionBelt = [...updatedState.potionBelt, triggeredPotion];

  // === 5. Remove the picked potion from the offerings ===
  offerings[sourceArrayName] = sourceArray.filter((_, i) => i !== index);

  // === 6. Trash unchosen potions if from offering ===
  let updatedTrashPile = updatedState.trashPile;
  if (phase === PHASES.POTION_OFFERING) {
    updatedTrashPile = [
      ...(updatedTrashPile || []),
      ...offerings.potions.filter((_, i) => i !== index),
    ];
    offerings.potions = [];
  }

  // === 7. Build the new state ===
  const newState = {
    ...updatedState,
    potionBelt: updatedPotionBelt,
    trashPile: updatedTrashPile, // ✅ Root-level trash pile
    offerings,
    log: [`Picked potion: ${pickedPotion.name}`, ...updatedState.log],
  };

  // === 8. Advance if from offering ===
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

  let updatedState = { ...state };

  // === 1. Apply effects ===
  if (potion.healthRestore) {
    updatedState = heal(updatedState, potion.healthRestore);
  }

  // === 2. Remove potion from potionBelt and add to trash ===
  const newPotionBelt = updatedState.potionBelt.filter((p) => p !== potion);
  const newTrash = [...updatedState.trashPile, potion];

  updatedState = {
    ...updatedState,
    campaign: {
      ...updatedState.campaign,
      potionBelt: newPotionBelt,
      trashPile: newTrash,
    },
    log: [`Drank potion: ${potion.name}`, ...updatedState.log],
  };

  // === 3. Check relic triggers ===
  const triggerResult = checkRelicTriggers(
    updatedState,
    TRIGGER_EVENTS.DRINK_POTION,
    { potion }
  );

  return {
    ...triggerResult,
    log: triggerResult.log || updatedState.log,
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

  // === Charge gold if in shop ===
  if (state.currentPhase === PHASES.SHOP) {
    let cost = 50;
    if (mod?.gem?.cost !== undefined) {
      cost = mod.gem.cost;
    }

    const charged = chargeGoldCost(state, cost, "card modification");
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
  // === Step 1: Ensure 1 of each type ===
  const guaranteedTypes = ["relic", "potion", "card", "gem"];
  guaranteedTypes.forEach((type) => shopfrontTypes.push(type));

  // === Step 2: Fill remaining 8 items using weighted choice ===
  const weights = {
    card: 12,
    potion: 3,
    gem: 1,
    relic: 1,
  };

  const weightedPool = Object.entries(weights).flatMap(([type, weight]) =>
    Array(weight).fill(type)
  );

  let safetyCounter = 0;
  while (shopfrontTypes.length < 12 && safetyCounter < 100) {
    safetyCounter++;
    const chosen =
      weightedPool[Math.floor(Math.random() * weightedPool.length)];
    shopfrontTypes.push(chosen);
  }

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
    log: [
      `Populated shopfront with ${generatedItems.length} unique items.`,
      ...updatedState.log,
    ],
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

  // ✅ Step 5: Populate offerings for the new phase
  newState = handlePhaseTransitions(newState);

  return newState;
}

//#endregion
//#region state setup and game initialization
function createInitialState() {
  return {
    log: [],
    currentScreen: SCREENS.MAIN,
    currentPhase: PHASES.MAIN_MENU,

    basicCardCount: 5,
    restHealthRestore: 10,
    shopPriceMultiplier: 1,
    difficulty: null,

    maxHealth: 0,
    health: 0,
    baseBunnies: 0,

    gold: 0,

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
      ink: 3,
      books: 1,
      pages: 3,
      handSize: 5,
    },
    combat: {
      deck: [],
      hand: [],
      graveyard: [],
      exile: [],
      spellbook: [],

      baseBunnies: 0,
      ink: 0,
      maxInk: 0,
      books: 0,
      maxBooks: 0,
      pages: 0,
      bunnies: 0,
      maxPages: 0,
      handSize: 5,

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
    const candidates = cardList.filter((c) => c.rarity === rarity);
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

  const upgradeWeights = {
    0: Math.max(0, 100 - luck),
    1: 3 + luck,
    2: 2 + luck,
    3: 1 + luck,
    4: 0 + luck,
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
  const upgradeWeights = {
    0: Math.max(0, 100 - luck),
    1: 3 + luck,
    2: 2 + luck,
    3: 1 + luck,
    4: 0 + luck,
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

  // Clone the card to avoid mutating the original
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
    upgradedCard.healthCost -= 1 * level; // reduce health cost
    upgradable = true;
  }

  if (!upgradable) {
    console.error(`Card cannot be upgraded: ${card.name}`);
    return card;
  }

  // Add or increment the upgrade level
  upgradedCard.upgrades = (upgradedCard.upgrades || 0) + level;

  // Rename the card to reflect its upgrade level
  upgradedCard.name =
    card.name.replace(/\s\+\d+$/, "") + ` +${upgradedCard.upgrades}`;

  return upgradedCard;
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

  if (!gem || typeof gem !== "object" || !gem.name) {
    console.error("Invalid gem passed to socketCardWithGem:", gem);
    return card;
  }

  // Clone the card to avoid mutation
  const socketedCard = { ...card };

  // Apply gem effects
  if ("bunnyAdd" in gem) {
    socketedCard.bunnyAdd = (socketedCard.bunnyAdd || 0) + gem.bunnyAdd;
  }

  // Save the gem reference
  socketedCard.gem = gem;

  // Rename the card to include the gem name as a prefix
  socketedCard.name = `${gem.name} ${card.name}`;

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
function chargeGoldCost(state, cost, context = "purchase") {
  if (state.gold < cost) {
    console.warn(`Not enough gold for ${context}!`);
    return state; // return unmodified state
  }

  return {
    ...state,
    campaign: {
      ...state.campaign,
      gold: state.gold - cost,
    },
    log: [`Spent ${cost} gold on ${context}.`, ...state.log],
  };
}
function checkRelicTriggers(state, triggerEvent, context = {}) {
  let updatedState = { ...state };
  let result = context.payload || null;

  for (const relic of updatedState.relicBelt) {
    const effect = relic.triggers?.[triggerEvent];
    if (!effect) continue;

    // === handle DRINK_POTION effects ===
    if (triggerEvent === TRIGGER_EVENTS.DRINK_POTION && context.potion) {
      if (effect.healPlayer) {
        updatedState = heal(updatedState, effect.healPlayer);
        updatedState = {
          ...updatedState,
          log: [
            `${relic.name} healed you for ${effect.healPlayer} HP on potion use.`,
            ...updatedState.log,
          ],
        };
      }
    }

    // === Handle POTION_PICKUP effects ===
    if (
      triggerEvent === TRIGGER_EVENTS.POTION_PICKUP &&
      effect.upgradePotion &&
      result
    ) {
      result = upgradePotion(result, 1);
      updatedState = {
        ...updatedState,
        log: [
          `${relic.name} upgraded a potion on pickup!`,
          ...updatedState.log,
        ],
      };
    }

    // === Handle CARD_PICKUP effects ===
    if (
      triggerEvent === TRIGGER_EVENTS.CARD_PICKUP &&
      effect.upgradeCard &&
      result
    ) {
      result = upgradeCard(result, 1);
      updatedState = {
        ...updatedState,
        log: [`${relic.name} upgraded a card on pickup!`, ...updatedState.log],
      };
    }

    // === Handle RELIC_PICKUP effects ===
    if (triggerEvent === TRIGGER_EVENTS.RELIC_PICKUP && context.relic) {
      const campaign = { ...updatedState.campaign };
      let newHealth = updatedState.health;
      let newMaxHealth = updatedState.maxHealth;

      if (effect.bonusPages) campaign.pages += effect.bonusPages;
      if (effect.bonusInk) campaign.ink += effect.bonusInk;
      if (effect.bonusBooks) campaign.books += effect.bonusBooks;
      if (effect.bonusHealth) {
        newHealth += effect.bonusHealth;
        newMaxHealth += effect.bonusHealth;
      }
      if (effect.bonusGold) {
        updatedState = gainGold(updatedState, effect.bonusGold);
      }
      if (effect.bonusBaseBunnies) {
        updatedState = increaseBaseBunnies(
          updatedState,
          effect.bonusBaseBunnies
        );
      }

      updatedState = {
        ...updatedState,
        campaign,
        health: newHealth,
        maxHealth: newMaxHealth,
        log: [
          `${relic.name} granted bonuses on relic pickup.`,
          ...updatedState.log,
        ],
      };
    }

    // === Handle SHOP PRICE ADJUSTMENT ===
    if (
      triggerEvent === TRIGGER_EVENTS.ASSIGN_SHOP_PRICES &&
      effect.shopPriceMultiplier
    ) {
      updatedState = {
        ...updatedState,
        offerings: {
          ...updatedState.offerings,
          shopfront: updatedState.offerings.shopfront.map((entry) => {
            const adjustedCost = Math.round(
              entry.item.cost * effect.shopPriceMultiplier
            );
            return {
              ...entry,
              item: {
                ...entry.item,
                cost: adjustedCost,
              },
            };
          }),
        },
        log: [
          `Applied shop price multiplier (${effect.shopPriceMultiplier})`,
          ...updatedState.log,
        ],
      };
    }

    // === Handle REST effects ===
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

        const shuffled = [...deck].sort(() => Math.random() - 0.5);
        const toUpgrade = shuffled.slice(0, numToUpgrade);
        const upgraded = toUpgrade.map((card) => upgradeCard(card, 1));

        const upgradedDeck = deck.map((card) =>
          toUpgrade.includes(card) ? upgraded[toUpgrade.indexOf(card)] : card
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

    // === Handle POPULATE PATH effects ===

    if (
      event === TRIGGER_EVENTS.POPULATE_PATHS &&
      triggerData.revealAnonymousPaths
    ) {
      const updatedPaths = state.offerings.paths.map((path) =>
        path.anonymousNameDisplay
          ? { ...path, anonymousNameDisplay: false }
          : path
      );

      state = {
        ...state,
        offerings: {
          ...state.offerings,
          paths: updatedPaths,
        },
        log: [`${relic.name} revealed a hidden path.`, ...state.log],
      };
    }
  }

  return {
    ...updatedState,
    result,
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

  const alternatives = cardList.filter(
    (c) => c.name !== card.name && !c.unchoosableByTransmute
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
      return screenChange(state, action.payload);

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
    state.relicBelt.map((r) => r.name).join(", ") || "None"
  }</p>
`;
  output.appendChild(info);

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
      btn.textContent = `${relic.name} (${relic.rarity})`;
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
        btn.textContent = `${path.path} (${path.rarity})${
          path.isFight ? " [FIGHT]" : ""
        }`;
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
      btn.textContent = `${card.name} (Cost: ${card.cost})${
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
      const cost = entry.item?.cost ?? 0;
      const playerGold = state.gold ?? 0;
      const disabled = cost > playerGold;

      btn.textContent = `${entry.type.toUpperCase()}: ${
        entry.item.name
      } (${cost}g)`;
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
      dispatch({
        type: ACTIONS.ADVANCE_PHASE,
        payload: PHASES.PATH_SELECTION,
      });
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
      // If it's a gem mod, skip cards that already have a gem
      if (isGemMod && card.gem) return;

      const btn = document.createElement("button");
      btn.textContent =
        `${card.name} (Cost: ${card.cost})` +
        (card.upgrades ? ` +${card.upgrades}` : "") +
        (card.gem ? ` [Gem: ${card.gem.name}]` : "");

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

  // === Always-Visible Potion Belt ===
  if (state.potionBelt && state.potionBelt.length > 0) {
    const beltSection = document.createElement("div");
    beltSection.innerHTML = `<h3>Your Potions</h3>`;

    state.potionBelt.forEach((potion, index) => {
      const btn = document.createElement("button");
      btn.textContent = potion.name;
      btn.onclick = () => {
        dispatch({ type: ACTIONS.DRINK_POTION, payload: index });
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

//#region WIP
// //------------------------------------------------WIP functions for MVP ------------------------------------------------

// //@@@@@@@@@@@@ combat functions @@@@@@@@@@@@

// edits needed to render function:
// should display the enemy HP in a big square box in big font, the spellbook (effectively a row of grey squares, with one square per state.combat.pages), a "cast spellbook" button and a "BUNNIES:" display that can show numnbers on the same row, and the player's hand (a row of cards)(in that order).

// function initializeCombatPhase(state, path) {
// this function handles the start of combat. It should be called in the phase transition handler, when the the player selects one of the four combat paths (easy, medium, hard, or boss).
// the function will generate an enemy by calling the generateenemy funciton.
// then, it will prepare the combat deck. This is a deep, exact copy of the campaign deck.
// next, it will set the combat state, copying all corresponding values over from the campaign state and rest of state.

// specifically, the campaign values of:
// (campaign)   ink: 3, =====>  (combat) ink: 0, maxInk: 0,
// books: 1, =====>  books: 0, maxBooks: 0,
// pages: 3, ====>   pages: 0,maxPages: 0,
// handSize: 5, ====> handSize: 5,
// also, the state.baseBunnies vlaue gets copied over to combat.baseBunnies.

//

// finally, it will check for any combat start triggers.
//}

// function generateEnemy(state, path) {
//   // generates an enemy based on the path's difficulty and game level.
// first checks the path
//  // enemies are objects with these properties: name, health, loot.
//  names are created by combining one word from each of these two lists:
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
  "peas",
  "green bean",
  "asparagus",
  "sweet potato",
  "pumpkin",
  "bell pepper",
  "celery",
  "onion",
];
// and

//   // assigns the enemy to state.combat.enemy based on the path name and game level.
// }

// function newBook(state) {
//   //effectively a new 'turn'
//   // populaets a new spellbook, with the appropriate number of blank pages.
//   // calls 'newHand' to draw a new hand of cards.
//   // calls 'refillInkpot' to refresh the player's ink.
// }

// function newHand(state) {
//   // draws a hand of cards based on the player's hand size.
// }

// function drawCard(state) {
//   // draws a card from the player's deck into their hand.
// }

// function checkDrawCardTriggers(state, card) {
//   // Checks if the drawn card has any triggers that need to be applied
// }

// function refillInkpot(state) {
//   // refreshes the player's ink to the maximum ink amount.
// }

// function playCard(state, card) {
//   // triggered by clicking on a card in hand.
//   // plays a card from the player's hand, applying its effects.
//   // deducts the card's ink cost from ink.
//   // determines where the card moves to: spellbook, graveyard, exile, or into the deck.
//   // checks for any play card triggers.
//   // calls "resolveCardEffects" to apply the card's effects.
//   // note: If there's no space in the spellbook or the player has insufficient ink, the card cannot be played and will be displayed as grey and unselectable.
// }

// function checkPlayCardTriggers(state, card) {
//   // Checks if the played card has any triggers that need to be applied
//   // This could include effects that trigger on play, such as drawing cards, gaining gold, etc.
// }

// function castSpellbook(state) {
//   // called when the player clicks the "cast spellbook" button, or when the spellbook is full.
//   // casts the spellbook, sequentially casting each of the cards in the spellbook.
//   // checks for any spellbook triggers.
//   // checks to see if combat has ended.
//   // clears the spellbook after casting, moving all its cards to the graveyard.
//   // discards the player's hand to the graveyard.
//   // calls the 'new book' function if combat hasn't ended.
// }

// function checkCastSpellbookTriggers(state) {
//   // Checks if there are any triggers that need to be applied when casting the spellbook.
// }

// function discardCard(state, card) {
//   // discards a card from the player's hand to the graveyard.
// }

// function checkDiscardCardTriggers(state, card) {
//   // Checks if the discarded card has any triggers that need to be applied
// }

// function castSpell(state, spell) {
//   // applies the effects of a spell card from the spellbook.
//   // checks for any spell triggers.
//   // moves the spell card to the appropriate zone after casting.
// }

// function checkCastSpellTriggers(state, spell) {
//   // Checks if the spell has any triggers that need to be applied when a specific spell is cast.
// }

// function checkCombatEnd(state) {
//   // checks if combat has ended.
// }

// function combatEnd(state) {
//   // Handles the end phase after combat, such as displaying the end screen, player losing HP, allowing the player to choose rewards, or advancing to the next path.
//   // also cleans up the battle state, such as clearing the spellbook, hand, and graveyard.
// }

// function checkCombatEndTriggers(state) {
//   // handles combat end triggers
// }

// function openCombatEndScreen(state) {
//   // opens the combat end screen, showing results, rewards, etc.
// }

// function populateCombatRewards(state) {
//   // populates the combat rewards based on the combat results.
//   // generates a list of rewards, such as cards, relics, potions, etc.
//   // ensures that the rewards are appropriate for the difficulty and type of combat.
//   // returns the populated rewards list.
// }

// function checkPopulateCombatRewardsTriggers(state) {
//   // Checks if there are any triggers that modify the combat rewards, such as relics or cards.
// }

// function pickCombatReward(state, reward) {
//   // handles the selection of a reward after combat.
//   // triggered by the player clicking on a reward in the combat end screen.
// }

// function closeCombatEndScreen(state) {
//   // closes the combat end screen and advances the game phase to the next phase.
// }

// //@@@@@@@@@@@@ death and victory functions @@@@@@@@@@@@
// function checkDeath(state) {
//   //checks if the player has died, and if so, advances to the death phase.
// }
// function death(state) {
//   // Handles the death phase, such as displaying a death screen, allowing the player to restart or return to the main menu.
// }
// function victory(state) {
//   // Handles the victory phase, such as displaying a victory screen, allowing the player to continue to the next phase or return to the main menu.
// }
