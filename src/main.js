"use strict";

//data maps
const difficultyModifiersMap = Object.freeze({
  [DIFFICULTIES.EASY]: {
    maxHealthModifier: 100,
    goldModifier: 20,
    basicCardCountModifier: 5,
  },
  [DIFFICULTIES.MEDIUM]: {
    maxHealthModifier: 75,
    goldModifier: 10,
    basicCardCountModifier: 10,
  },
  [DIFFICULTIES.HARD]: {
    maxHealthModifier: 50,
    goldModifier: 0,
    basicCardCountModifier: 15,
  },
});
const pathMap = Object.freeze({
  [PATHS.EASY_FIGHT]: { frequency: 1, isFight: true },
  [PATHS.MEDIUM_FIGHT]: { frequency: 1, isFight: true },
  [PATHS.HARD_FIGHT]: { frequency: 1, isFight: true },
  [PATHS.REST]: { frequency: 1 },
  [PATHS.SHOP]: { frequency: 1 },
  [PATHS.RELIC_OFFERING]: { frequency: 1 },
  [PATHS.GEM_OFFERING]: { frequency: 1 },
  [PATHS.CARD_OFFERING]: { frequency: 1 },
  [PATHS.FORGE]: { frequency: 1 },
  [PATHS.POTION_OFFERING]: { frequency: 1 },
  [PATHS.HOARD]: { frequency: 1 },
});

//constant enums
const DIFFICULTIES = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});
const PATHS = Object.freeze({
  EASY_FIGHT: "easy fight",
  MEDIUM_FIGHT: "medium fight",
  HARD_FIGHT: "hard fight",
  REST: "rest",
  SHOP: "shop",
  RELIC_OFFERING: "relicOffering",
  GEM_OFFERING: "gemOffering",
  CARD_OFFERING: "cardOffering",
  FORGE: "forge",
  POTION_OFFERING: "potionOffering",
  HOARD: "hoard",
});
// screens are the display views that the player can navigate to.
const SCREENS = Object.freeze({
  MAIN: "main view",
  DECK: "inspect deck",
  RELICS: "inspect relic belt",
  SETTINGS: "settings",
});

// game phases are the different stages of the game that the player advances through until they reach the end of the game.
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
  UPGRADE_CARD: "upgrade card",

  SHOP: "shop",
  PATH_SELECTION: "path selection",
  REST: "rest",
  FORGE: "forge",
  COMBAT: "combat",

  DEATH: "death",
  VICTORY: "victory",
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
});
const CARD_TYPES = Object.freeze({
  INSTANT: "instant", // resolves immediately when played, does not go to the spellbook.
  SPELL: "spell", // goes to the spellbook when played, resolves when the spellbook is cast.
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
// data arrays of game objects
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
    name: "Gold Conjuration",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    cost: 1,
    goldAdd: 3,
  },
  {
    name: "Enchant",
    cardType: CARD_TYPES.SPELL,
    rarity: RARITIES.BASIC_MONO,
    cost: 1,
    permanentlyUpgradeRandomCardsInDeck: 1,
  },
];
const gemList = [
  {
    name: "Amethyst",
    rarity: RARITIES.COMMON,
    bunnyAdd: 1,
  },
];
const relicList = [
  {
    name: "Magic Scroll",
    rarity: RARITIES.COMMON,
    bonusPages: 1,
  },
  {
    name: "Magic egg",
    rarity: RARITIES.COMMON,
    bonusGold: 100,
  },
  {
    name: "Healing Stone",
    rarity: RARITIES.COMMON,
    bonusHealthOnCombatVictory: 10,
  },
  {
    name: "Protective Amulet",
    rarity: RARITIES.UNCOMMON,
    bonusHealth: 10,
  },
  {
    name: "Magic Encyclopedia",
    rarity: RARITIES.RARE,
    bonusBooks: 1,
  },
  {
    name: "Magic Inkpot",
    rarity: RARITIES.MYTHIC,
    bonusInk: 1,
  },
  {
    name: "Magic Wand",
    rarity: RARITIES.MYTHIC,
    bunnyAddOnCast: 5,
  },
  {
    name: "Magic Keys",
    rarity: RARITIES.MYTHIC,
    goldAddOnCombatVictory: 10,
  },
  {
    name: "Magic Feather",
    rarity: RARITIES.LEGENDARY,
    bonusInk: 2,
  },
  {
    name: "Gold Bag",
    rarity: RARITIES.BASIC_POLY,
    bonusGold: 25,
  },
];
const potionList = [
  {
    name: "Lesser Healing Potion",
    rarity: RARITIES.COMMON,
    healthRestore: 20,
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

// ===========================
// ==== UTILITY FUNCTIONS ====
// ===========================

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

// ===================================
// ===== REDUCER-ACTION HANDLERS =====
// ===================================

function generateStarterDeck(state) {
  const difficulty = state.campaign.difficulty;
  if (!difficulty) {
    console.error("Cannot generate starter deck without difficulty set.");
    return state;
  }

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
  const extraCount = difficultyModifiersMap[difficulty].basicCardCountModifier;
  for (let i = 0; i < extraCount; i++) {
    const randomCard =
      basicPolyCards[Math.floor(Math.random() * basicPolyCards.length)];
    deck.push(createCardInstance(randomCard.name));
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
  const difficulty = state.campaign.difficulty;

  if (!difficulty || !difficultyModifiersMap[difficulty]) {
    console.error("Invalid or missing difficulty:", difficulty);
    return state;
  }

  const modifiers = difficultyModifiersMap[difficulty];

  const newCampaign = {
    ...state.campaign,
    maxHealth: modifiers.maxHealthModifier,
    health: modifiers.maxHealthModifier, // start at full health
    gold: modifiers.goldModifier,
    basicCardCount: modifiers.basicCardCountModifier,
  };

  return {
    ...state,
    campaign: newCampaign,
    log: [`Applied difficulty modifiers for ${difficulty}.`, ...state.log],
  };
}
function populateRelicOfferings(state, rarity = null) {
  const ownedRelics = new Set([
    ...state.campaign.relicBelt.map((r) => r.name),
    ...state.campaign.trashPile.map((r) => r.name),
  ]);

  const GOLD_BAG = "Gold Bag";
  const goldBagRelics = relicList.filter((r) => r.name === GOLD_BAG);
  const maxRelics = 3;
  const selected = [];

  // Step 1: Build candidate pool
  let candidates = relicList.filter((relic) => {
    if (relic.name === GOLD_BAG) return false;
    if (
      (relic.rarity === RARITIES.MYTHIC ||
        relic.rarity === RARITIES.LEGENDARY) &&
      ownedRelics.has(relic.name)
    ) {
      return false;
    }
    return true;
  });

  if (rarity) {
    candidates = candidates.filter((r) => r.rarity === rarity);
  }

  // Step 2: Pick 3 unique relics
  const rarityWeights = {
    [RARITIES.COMMON]: 50,
    [RARITIES.UNCOMMON]: 30,
    [RARITIES.RARE]: 15,
    [RARITIES.MYTHIC]: 4,
    [RARITIES.LEGENDARY]: 1,
  };

  while (selected.length < maxRelics) {
    let pool = candidates;

    if (!rarity) {
      const chosenRarity = weightedRandomChoice(rarityWeights);
      pool = candidates.filter((r) => r.rarity === chosenRarity);
    }

    // Filter out already selected (except Gold Bags)
    pool = pool.filter((r) => !selected.some((sel) => sel.name === r.name));

    if (pool.length === 0) {
      // fallback: add a Gold Bag
      if (goldBagRelics.length > 0) {
        selected.push({ ...goldBagRelics[0] });
      } else {
        console.warn("No Gold Bag relics available.");
      }
    } else {
      const relic = pool[Math.floor(Math.random() * pool.length)];
      selected.push({ ...relic });
    }
  }

  return {
    ...state,
    offerings: {
      ...state.offerings,
      relics: selected,
    },
    log: [`Populated relic offerings.`, ...state.log],
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
function pickRelic(state, index) {
  const phase = state.currentPhase;
  const campaign = { ...state.campaign };
  const offerings = { ...state.offerings };

  // Determine the source array
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
  const pickedRelic = sourceArray[index];

  if (!pickedRelic) {
    console.error("No relic found at index:", index);
    return state;
  }

  // Add to relic belt
  campaign.relicBelt = [...campaign.relicBelt, pickedRelic];

  // Remove from source array
  offerings[sourceArrayName] = sourceArray.filter((_, i) => i !== index);

  // If it's a relic offering phase, trash the rest
  const isOfferingPhase = [
    PHASES.MYTHIC_RELIC_OFFERING,
    PHASES.RELIC_OFFERING,
  ].includes(phase);
  if (isOfferingPhase) {
    campaign.trashPile = [
      ...campaign.trashPile,
      ...offerings.relics.filter((_, i) => i !== index),
    ];
    offerings.relics = [];
  }

  // Deduct cost if in shop (you can customize cost logic later)
  if (phase === PHASES.SHOP) {
    const relicCost = pickedRelic.cost || 50; // default cost if not specified
    if (campaign.gold < relicCost) {
      console.warn("Not enough gold for relic!");
      return state; // optionally prevent the purchase
    }
    campaign.gold -= relicCost;
  }

  // Call trigger handler
  const newState = {
    ...state,
    campaign,
    offerings,
    log: [`Picked relic: ${pickedRelic.name}`, ...state.log],
  };

  const triggeredState = checkRelicPickupTriggers
    ? checkRelicPickupTriggers(newState, pickedRelic)
    : newState;

  // Advance phase if in offering
  if (isOfferingPhase) {
    return advancePhaseTo(triggeredState, PHASES.PATH_SELECTION);
  }

  return triggeredState;
}
function checkRelicPickupTriggers(state, relic) {
  const campaign = { ...state.campaign };

  if ("bonusPages" in relic) {
    campaign.pages += relic.bonusPages;
  }

  if ("bonusGold" in relic) {
    campaign.gold += relic.bonusGold;
  }

  if ("bonusHealth" in relic) {
    campaign.maxHealth += relic.bonusHealth;
    campaign.health += relic.bonusHealth;
  }

  if ("bonusInk" in relic) {
    campaign.ink += relic.bonusInk;
  }

  if ("bonusBooks" in relic) {
    campaign.books += relic.bonusBooks;
  }

  return {
    ...state,
    campaign,
    log: [`Applied bonuses from ${relic.name}.`, ...state.log],
  };
}

// ===========================
// ===== STATE SETUP =========
// ===========================

function createInitialState() {
  return {
    log: [],
    currentScreen: SCREENS.MAIN,
    currentPhase: PHASES.MAIN_MENU,
    campaign: {
      difficulty: null,

      deck: [],
      relicBelt: [],
      potionBelt: [],
      trashPile: [],

      gold: 0,
      level: 0,

      basicCardCount: 5,

      maxHealth: 0,
      health: 0,
      ink: 3,
      books: 1,
      pages: 3,
      handSize: 5,

      enemy: null,
    },
    battle: {
      deck: [],
      hand: [],
      graveyard: [],
      exile: [],
      spellbook: [],

      relicBelt: [],
      potionBelt: [],

      health: 0,
      maxHealth: 0,
      ink: 0,
      maxInk: 0,
      books: 0,
      maxBooks: 0,
      pages: 0,
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

// ===========================
// ====== GAME MECHANICS =====
// ===========================
function createCardInstance(
  cardName = null,
  rarity = null,
  upgrades = 0,
  gem = null
) {
  let card;

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

  // Add metadata
  card.upgrades = upgrades;
  card.gem = gem;

  if (upgrades > 0) {
    card = upgradeCard(card, upgrades);
  }

  if (gem) {
    card = socketCardWithGem(card, gem);
  }

  return card;
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

// ===========================
// ===== GAME REDUCER ========
// ===========================
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_GAME:
      return {
        ...createInitialState(),
        log: ["New game started."],
      };

    case ACTIONS.SET_DIFFICULTY: {
      if (state.campaign.difficulty === action.payload) {
        console.log("Difficulty already set to", action.payload);
        return state;
      }
      console.log(`Difficulty set to ${action.payload}`);
      return {
        ...state,
        campaign: {
          ...state.campaign,
          difficulty: action.payload,
        },
        log: [`Difficulty set to ${action.payload}.`, ...state.log],
      };
    }

    case ACTIONS.GENERATE_STARTER_DECK:
      return generateStarterDeck(state);

    case ACTIONS.APPLY_DIFFICULTY_MODIFIERS:
      return applyDifficultyModifiers(state);

    case ACTIONS.ADVANCE_PHASE:
      return advancePhaseTo(state, action.payload);

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

// ===========================
// ======= RENDER ============
// ===========================
function render(state, dispatch) {
  console.clear();
  console.log(`Current Phase: ${state.currentPhase}`);
  console.log(`Current Screen: ${state.currentScreen}`);
  console.table(state.log.slice(0, 5));
}

// Initialize the game app
window.onload = () => {
  createGameApp(createInitialState(), gameReducer, render);
};

// //------------------------------------------------WIP functions------------------------------------------------

// //@@@@@@@@@ card offering functions @@@@@@@@

// function populateCardSelection(state) {
//   // populates the card selection.
// }

// function pickCard(state, card) {
//   // adds the card to the player's deck, and removes it from the offerings.
//   // checks the game for card pickup triggers.
//   // then advances the campaign phase to the next phase IF player is not in the shop.
// }

// function checkCardPickupTriggers(state, card) {
//   // Check if the card has any pickup triggers that need to be applied
// }

// //@@@@@@@@@ potion offering functions @@@@@@@@

// function populatePotionSelection(state) {
//   // populates the potion selection
// }

// function pickPotion(state, potion) {
//   // adds the potion to the player's potionBelt, and removes it from the offerings.
//   // then advances the campai
//   // gn phase to the next phase IF player is not in the shop.
// }

// function drinkPotion(state, potion) {
//   // applies the potion's effects to the player.
//   // removes the potion from the player's potionBelt.
//   // checks the game for potion use triggers.
//   // note: potions that can only be drunk in combat are grey and unclickable in the campaign phase.
// }

// function checkDrinkPotionTriggers(state, potion) {
//   // Check if there are any potion use triggers that need to be applied
// }

// //@@@@@@@@@ gem offering and upgrade offering functions @@@@@@@@

// function populateGemSelection(state) {
//   // populates the gem selection
// }
// function pickGem(state, gem) {
//   // sets the cursor to be the picked gem.
//   // initiates gem socketing process with chosen gem.
//   // exits current screen and opens the card mod screen with chosen gem as the cursor.
// }

// function manuallyUpgradeCard(state) {
//   // sets the cursor to be a little magic wand.
//   // initiates manual card upgrade process.
//   // exits current screen and opens the card mod screen with magic wand as the cursor.
// }

// function socketCardWithGem(state, gem, card) {
//   // modifies the chosen card with the gem
//   // uses modCard function to apply the gem to the card.
//   // returns cursor to normal.
//   // exits the card mod screen and returns to the main view
//   // if the player is not in the shop, advances the campaign phase to the next phase.
// }

// function checkModificationTriggers(state, card, modification) {
//   // Checks if the card has any modification triggers that need to be applied
// }

// function openModScreen(state) {
//   //opens the card mod screen, allowing the player to modify cards in their deck.
// }
// function closeModScreen(state) {
//   // closes the card mod screen and returns to the main view.
// }

// function upgradeCard(card) {
//   return card;
//   // Apply upgrades to the card based on the provided upgrades object
// }
// function socketCardWithGem(card, gem) {
//   return card;
//   // Apply gem effects to the card
//   // This is a placeholder function; actual implementation will depend on gem effects
// }

// //@@@@@@@@@@@@ shop functions @@@@@@@@@@@@
// function openShop(state) {
//   // initiates the shop phase populating the shopfront with offerings .
// }

// function exitShop(state) {
//   // exits the shop phase and advances the game state to the next phase.
// }

// function buyOffering(state, offering) {
//   // removes the offering from the shopfront and adds it to the player's inventory.
//   // deducts price.
//   // checks for relevant pickup triggers.
//   // note: offerings that the player cannot afford are greyed out and unclickable.
// }

// //@@@@@@@@@@@@ path selection functions @@@@@@@@@@@@
// function populatePathSelection(state) {
//   // populates the path selection with available paths.
// }

// function checkPopulatePathSelectionTriggers(state) {
//   // Checks if there are any triggers that modify the path selection, such as relics or cards.
// }

// function selectPath(state, path) {
//   // sets the campaign phase to the selected path.
//   // increases the game level by 1.
//   // checks for any path selection triggers.
//   // if the path is combat, sets the enemy to an appropriate enemy based on the path.
//   // advances the campaign phase to the chosen phase.
// }

// function levelUp(state) {
//   // increases the game level by 1.
// }

// function assignEnemy(state, path) {
//   // assigns an enemy to the path based on the path's difficulty and type.
// }

// function checkPathSelectionTriggers(state, path) {
//   // Checks if the path has any selection triggers that need to be applied
// }

// //@@@@@@@@@@@@ rest functions @@@@@@@@@@@@
// function beginRest(state) {
//   // heals the player the appropriate amount based on the player's max health.
//   //checks rest triggers.
//   //displays the rest phase
// }

// function checkRestTriggers(state) {
//   // Checks if the rest has any triggers that need to be applied
// }

// function endRest(state) {
//   //closes the rest phase and advances the game state to the next phase.
// }

// //@@@@@@@@@@@@@ forge functions @@@@@@@@@@@@
// function openForge(state) {
//   //opens the forge phase, allowing the player to upgrade cards in their deck.
// }
// function closeForge(state) {
//   // closes the forge phase and advances the game state to the next phase.
// }

// function randomlyUpgradeCards(state, numberOfUpgrades) {
//   // randomly upgrades a number of cards in the player's deck based on the number of upgrades.
// }

// //@@@@@@@@@@@@ combat functions @@@@@@@@@@@@
// function startCombat(state, enemy) {
//   // initializes the battle phase with the selected enemy.
//   // sets up the battle stats, including health, deck, hand, etc.
//   // advances the game state to the battle phase.
//   // creates a new spellbook (effectively a 'turn')
//   //checks for any combat start triggers.
//   console.log("Combat started against:", enemy.name);
//   state.battle.phase = "battle";
//   state.battle.enemy = enemy;
// }

// function checkStartCombatTriggers(state) {
//   // Checks if the enemy has any combat start triggers that need to be applied
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

// // Render function - placeholder for UI rendering logic
