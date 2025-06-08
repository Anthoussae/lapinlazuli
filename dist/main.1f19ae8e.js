// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
"use strict";

//note to self: most functions that create a new gamestate (reducer actions) will require:

// 1) the function itself
// 2) adding to the action enum.
// 3) adding to the reducer switch statement
// 4) adding to the render function.
// 5) possibly adding to the phase transition handler.

//#region enums
var _Object$freeze2;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DIFFICULTIES = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard"
});
var TRIGGER_EVENTS = Object.freeze({
  CARD_PICKUP: "CARD_PICKUP",
  RELIC_PICKUP: "RELIC_PICKUP",
  POTION_PICKUP: "POTION_PICKUP",
  DRINK_POTION: "DRINK_POTION",
  ASSIGN_SHOP_PRICES: "ASSIGN_SHOP_PRICES",
  REST: "REST",
  COMBAT_START: "COMBAT_START",
  POPULATE_PATHS: "POPULATE_PATHS"
});
var PATHS = Object.freeze({
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
  TRANSMUTE: "transmute"
});
var SCREENS = Object.freeze({
  MAIN: "main view",
  DECK: "inspect deck",
  RELICS: "inspect relic belt",
  SETTINGS: "settings",
  MOD: "modscreen"
});
var RARITIES = Object.freeze({
  BASIC_POLY: "basic-poly",
  // basic poly cards, several of which go in the starter deck.
  BASIC_MONO: "basic-mono",
  // basic mono cards, only one goes in the starter deck.
  COMMON: "common",
  // common cards
  UNCOMMON: "uncommon",
  // uncommon cards
  RARE: "rare",
  // rare cards
  MYTHIC: "mythic",
  // mythic cards
  LEGENDARY: "legendary" // legendary cards
});
var PHASES = Object.freeze({
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
  HOARD: "hoard"
});
var ACTIONS = Object.freeze({
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
  REST: "REST"
});
var CARD_TYPES = Object.freeze({
  INSTANT: "instant",
  // resolves immediately when played, does not go to the spellbook.
  SPELL: "spell" // goes to the spellbook when played, resolves when the spellbook is cast.
});
var REST_OPTIONS = Object.freeze({
  HEAL: "heal",
  PRACTICE: "practice",
  ENCHANT: "enchant"
});
//#endregion enums
//#region data maps
var difficultyModifiersMap = Object.freeze(_defineProperty(_defineProperty(_defineProperty({}, DIFFICULTIES.EASY, {
  maxHealthModifier: 100,
  goldModifier: 20,
  basicCardCountModifier: 5,
  luckModifier: 2,
  shopPriceMultiplierModifier: -0.2,
  // 20% cheaper shop prices
  restHealthRestoreModifier: 30 // heal 30 health when resting
}), DIFFICULTIES.MEDIUM, {
  maxHealthModifier: 75,
  goldModifier: 10,
  basicCardCountModifier: 8,
  luckModifier: 1,
  shopPriceMultiplierModifier: 0,
  // normal shop prices
  restHealthRestoreModifier: 25 // heal 20 health when resting
}), DIFFICULTIES.HARD, {
  maxHealthModifier: 50,
  goldModifier: 0,
  basicCardCountModifier: 11,
  luckModifier: 0,
  shopPriceMultiplierModifier: 0.2,
  // 20% more expensive shop prices
  restHealthRestoreModifier: 20 // heal 20 health when resting
}));
var pathMap = Object.freeze((_Object$freeze2 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_Object$freeze2, PATHS.EASY_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT
}), PATHS.MEDIUM_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT
}), PATHS.HARD_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT
}), PATHS.BOSS_FIGHT, {
  rarity: RARITIES.SPECIAL,
  isFight: true,
  leadsTo: PHASES.COMBAT
}), PATHS.REST, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.REST
}), PATHS.SHOP, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.SHOP
}), PATHS.RELIC_OFFERING, {
  rarity: RARITIES.MYTHIC,
  leadsTo: PHASES.RELIC_OFFERING
}), PATHS.GEM_OFFERING, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.GEM_OFFERING
}), PATHS.CARD_OFFERING, {
  rarity: RARITIES.UNCOMMON,
  leadsTo: PHASES.CARD_OFFERING
}), PATHS.ENCHANT, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.ENCHANT
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_Object$freeze2, PATHS.POTION_OFFERING, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.POTION_OFFERING
}), PATHS.HOARD, {
  rarity: RARITIES.MYTHIC,
  leadsTo: PHASES.HOARD
}), PATHS.PURGE, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.PURGE
}), PATHS.TRANSMUTE, {
  rarity: RARITIES.RARE,
  leadsTo: PHASES.TRANSMUTE
})));

//#endregion data maps
//#region data arrays of game objects
var cardList = [{
  name: "Bunnymancy",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_POLY,
  cost: 1,
  bunnyAdd: 5
}, {
  name: "Bunnyplication",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_POLY,
  cost: 2,
  bunnyMult: 2
}, {
  name: "Fairy Gold",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_MONO,
  cost: 1,
  goldAdd: 3
}, {
  name: "Enchant",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_MONO,
  cost: 2,
  permanentlyUpgradeRandomCardsInDeck: 1
}, {
  name: "Ponder",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.COMMON,
  cost: 1,
  cardDraw: 3
}, {
  name: "Inkswell",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  cost: 1,
  inkAdd: 2
}, {
  name: "Cloudfluff Conjuration",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  cost: 0,
  bunnyAdd: 4
}, {
  name: "Cloudfluff Boon",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.RARE,
  cost: 0,
  bunnyAdd: 2
}, {
  name: "Midas Touch",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.RARE,
  cost: 3,
  goldAdd: 12
}, {
  name: "Enchanted Twilight",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.RARE,
  cost: 3,
  permanentlyUpgradeRandomCardsInDeck: 2
}, {
  name: "Dusk Lotus",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.MYTHIC,
  cost: 0,
  inkAdd: 3,
  healthCost: 3,
  exile: true // Exile this card after use
}, {
  name: "Weasel's Bargain",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.UNCOMMON,
  cost: 0,
  healthCost: 2,
  goldAdd: 6
}, {
  name: "Carrot Festival",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  cost: 2,
  bunnyAdd: 14
}, {
  name: "Mega Bunnyplication",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  cost: 2,
  bunnyMult: 4
}, {
  name: "Empower",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  cost: 1,
  permanentlyUpgradeRandomCardsInHand: 1
}, {
  name: "Mass Empower",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.RARE,
  cost: 3,
  permanentlyUpgradeRandomCardsInHand: 7
}, {
  name: "Wisdom of the Warrens",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.MYTHIC,
  cost: 0,
  cardDraw: 1
}];
var gemList = [{
  name: "Amethyst",
  rarity: RARITIES.COMMON,
  bunnyAdd: 2
}, {
  name: "Lapis Lazuli",
  rarity: RARITIES.COMMON,
  bunnyMult: 1.5
}, {
  name: "Sapphire",
  rarity: RARITIES.UNCOMMON,
  cardDraw: 1
}, {
  name: "Topaz",
  rarity: RARITIES.RARE,
  goldAdd: 5
}, {
  name: "Ruby",
  rarity: RARITIES.MYTHIC,
  permanentlyUpgradeRandomCardsInDeck: 1
}];
var relicList = [{
  name: "Magic Scroll",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusPages: 1
  })
}, {
  name: "Magic Wand",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusBaseBunnies: 1
  })
}, {
  name: "Magic Egg",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusGold: 100
  })
}, {
  name: "Healing Stone",
  rarity: RARITIES.COMMON,
  // not a pickup trigger — save for future COMBAT_VICTORY event
  bonusHealthOnCombatVictory: 10
}, {
  name: "Protective Amulet",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusHealth: 10
  })
}, {
  name: "Magic Encyclopedia",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusBooks: 1
  })
}, {
  name: "Magic Inkpot",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusInk: 1
  })
}, {
  name: "Magic Wand",
  rarity: RARITIES.MYTHIC,
  // not triggered on pickup — belongs to CARD_CAST or similar
  bunnyAddOnCast: 5
}, {
  name: "Magic Keys",
  rarity: RARITIES.MYTHIC,
  // not a pickup effect — save for COMBAT_VICTORY
  goldAddOnCombatVictory: 10
}, {
  name: "Magic Quill",
  rarity: RARITIES.LEGENDARY,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusInk: 2
  })
}, {
  name: "Gold Bag",
  rarity: RARITIES.BASIC_POLY,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusGold: 25
  })
}, {
  name: "Whetstone",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.CARD_PICKUP, {
    upgradeCard: true
  })
}, {
  name: "Witch's Cauldron",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.POTION_PICKUP, {
    upgradePotion: true
  })
}, {
  name: "Crystal Vial",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.DRINK_POTION, {
    healPlayer: 5
  })
}, {
  name: "Discount Voucher",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.ASSIGN_SHOP_PRICES, {
    shopPriceMultiplier: 0.8 // 20% cheaper shop prices
  })
}, {
  name: "Sleeping Bag",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.REST, {
    healPlayer: 20 // heal 20 health when resting
  })
}, {
  name: "Toothfairy's Charm",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.REST, {
    goldAdd: 10 // gain 10 gold when resting
  })
}, {
  name: "Planetarium Mobile",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.REST, {
    permanentlyUpgradeRandomCardsInDeck: 1 // upgrade a random card in the deck when resting
  })
}, {
  name: "Dousing Rod",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.POPULATE_PATHS, {
    revealAnonymousPaths: true
  })
}];
var potionList = [{
  name: "Lesser Healing Potion",
  rarity: RARITIES.COMMON,
  healthRestore: 10
}, {
  name: "Healing Potion",
  rarity: RARITIES.UNCOMMON,
  healthRestore: 15
}, {
  name: "Greater Healing Potion",
  rarity: RARITIES.RARE,
  healthRestore: 20
}, {
  name: "Elixir of Life",
  rarity: RARITIES.MYTHIC,
  healthRestore: 50
}];
var enemyList = [{
  name: "Lettuce Goblin",
  level: 1,
  difficulty: DIFFICULTIES.EASY,
  health: 10,
  goldRewardChance: 0.5,
  gemRewardChance: 0.1,
  potionRewardChance: 0.1,
  relicRewardChance: 0.01
}];
//#endregion
//#region utility functions
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}
function weightedRandomChoice(weightedMap) {
  var entries = Object.entries(weightedMap);
  var totalWeight = entries.reduce(function (sum, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      _ = _ref3[0],
      weight = _ref3[1];
    return sum + weight;
  }, 0);
  var r = Math.random() * totalWeight;
  var cumulative = 0;
  for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
    var _entries$_i = _slicedToArray(_entries[_i], 2),
      key = _entries$_i[0],
      weight = _entries$_i[1];
    cumulative += weight;
    if (r <= cumulative) return key;
  }
}
function screenChange(state, targetScreen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    currentScreen: targetScreen,
    log: ["Screen changed to ".concat(targetScreen, ".")].concat(_toConsumableArray(state.log))
  });
}
function assignShopPrices(state) {
  var globalMultiplier = state.shopPriceMultiplier || 1;
  var basePrices = {
    card: 10,
    potion: 20,
    gem: 30,
    relic: 100
  };
  var rarityMultipliers = {
    common: 1,
    uncommon: 1.2,
    rare: 1.4,
    mythic: 1.6,
    legendary: 2
  };
  var updatedShopfront = state.offerings.shopfront.map(function (entry) {
    var _item$rarity, _item$rarity$toLowerC;
    var type = entry.type,
      item = entry.item;
    var basePrice = basePrices[type] || 0;
    var upgrades = item.upgrades || 0;
    var upgradeCost = ["card", "potion"].includes(type) ? upgrades * 5 : 0;
    var rarity = ((_item$rarity = item.rarity) === null || _item$rarity === void 0 || (_item$rarity$toLowerC = _item$rarity.toLowerCase) === null || _item$rarity$toLowerC === void 0 ? void 0 : _item$rarity$toLowerC.call(_item$rarity)) || "common";
    var rarityMultiplier = rarityMultipliers[rarity] || 1;
    var cost = Math.round((basePrice + upgradeCost) * rarityMultiplier * globalMultiplier);
    return _objectSpread(_objectSpread({}, entry), {}, {
      item: _objectSpread(_objectSpread({}, item), {}, {
        cost: cost
      })
    });
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      shopfront: updatedShopfront
    }),
    log: ["Assigned prices to shop items."].concat(_toConsumableArray(state.log))
  });
}
function anonymizeObject(obj) {
  return _objectSpread(_objectSpread({}, obj), {}, {
    anonymousNameDisplay: true
  });
}

//#endregion
//#region reducer-action handlers
function generateStarterDeck(state) {
  var difficulty = state.difficulty;
  if (!difficulty || !difficultyModifiersMap[difficulty]) {
    console.error("Cannot generate starter deck: invalid difficulty:", difficulty);
    return state;
  }
  var modifiers = difficultyModifiersMap[difficulty];
  var deck = [];

  // 1. Add one of each basic mono card
  var basicMonoCards = cardList.filter(function (card) {
    return card.rarity === RARITIES.BASIC_MONO;
  });
  var _iterator = _createForOfIteratorHelper(basicMonoCards),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _card = _step.value;
      deck.push(createCardInstance(_card.name));
    }

    // 2. Add 3 of each basic poly card
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var basicPolyCards = cardList.filter(function (card) {
    return card.rarity === RARITIES.BASIC_POLY;
  });
  var _iterator2 = _createForOfIteratorHelper(basicPolyCards),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _card2 = _step2.value;
      for (var _i2 = 0; _i2 < 3; _i2++) {
        deck.push(createCardInstance(_card2.name));
      }
    }

    // 3. Add additional random basic poly cards based on difficulty
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  for (var i = 0; i < modifiers.basicCardCountModifier; i++) {
    var card = generateRandomCard(state, {
      rarity: RARITIES.BASIC_POLY
    });
    if (card) deck.push(card);
  }

  // 4. Shuffle the deck
  shuffle(deck);

  // 5. Return new state with updated campaign.deck
  return _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      deck: deck
    }),
    log: ["Generated starter deck (".concat(deck.length, " cards).")].concat(_toConsumableArray(state.log))
  });
}
function applyDifficultyModifiers(state) {
  var difficulty = state.difficulty;
  if (!difficulty || !difficultyModifiersMap[difficulty]) {
    console.error("Invalid or missing difficulty:", difficulty);
    return state;
  }
  var modifiers = difficultyModifiersMap[difficulty];
  return _objectSpread(_objectSpread({}, state), {}, {
    gold: state.gold + modifiers.goldModifier,
    basicCardCount: state.basicCardCount + modifiers.basicCardCountModifier,
    luck: (state.luck || 0) + (modifiers.luckModifier || 0),
    shopPriceMultiplier: (state.shopPriceMultiplier || 1) + (modifiers.shopPriceMultiplierModifier || 0),
    restHealthRestore: (state.restHealthRestore || 0) + (modifiers.restHealthRestoreModifier || 0),
    maxHealth: state.maxHealth + modifiers.maxHealthModifier,
    health: state.health + modifiers.maxHealthModifier,
    log: ["Applied difficulty modifiers for ".concat(difficulty, ".")].concat(_toConsumableArray(state.log))
  });
}
function advancePhaseTo(state, phaseAdvancedTo) {
  if (!Object.values(PHASES).includes(phaseAdvancedTo)) {
    console.error("Invalid phase passed to advancePhaseTo:", phaseAdvancedTo);
    return state;
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    currentPhase: phaseAdvancedTo,
    log: ["Advanced to phase: ".concat(phaseAdvancedTo)].concat(_toConsumableArray(state.log))
  });
}
function handlePhaseTransitions(state) {
  var phase = state.currentPhase;
  switch (phase) {
    case PHASES.DIFFICULTY_SELECTION:
      return _objectSpread(_objectSpread({}, state), {}, {
        log: ["Choose your difficulty."].concat(_toConsumableArray(state.log))
      });
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
  var _state$level;
  var paths = state.offerings.paths;
  if (!paths || index < 0 || index >= paths.length) {
    console.error("Invalid path index:", index);
    return state;
  }
  var chosenPath = paths[index];
  var pathKey = chosenPath.path;
  var pathData = pathMap[pathKey];
  if (!pathData || !pathData.leadsTo) {
    console.error("Path has no destination phase:", pathKey);
    return state;
  }
  return handlePhaseTransitions(_objectSpread(_objectSpread({}, state), {}, {
    level: ((_state$level = state.level) !== null && _state$level !== void 0 ? _state$level : 0) + 1,
    currentPhase: pathData.leadsTo,
    log: ["Chose path: ".concat(pathKey)].concat(_toConsumableArray(state.log)),
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      paths: [] // clear after pick
    })
  }));
}
function populateCardOfferings(state) {
  var newCards = [];
  var _loop = function _loop() {
      var card = generateRandomCard(state);
      if (!card) return 0; // continue
      if (newCards.some(function (existing) {
        return existing.name === card.name;
      })) return 0; // continue
      newCards.push(card);
    },
    _ret;
  while (newCards.length < 3) {
    _ret = _loop();
    if (_ret === 0) continue;
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      cards: newCards
    }),
    log: ["Populated card offerings."].concat(_toConsumableArray(state.log))
  });
}
function populatePotionOfferings(state) {
  var selectedPotions = [];
  var usedNames = new Set();
  var attempts = 0;
  while (selectedPotions.length < 3 && attempts < 50) {
    attempts++;
    var potion = generateRandomPotion(state);
    if (!potion) continue;
    if (usedNames.has(potion.name)) continue;
    selectedPotions.push(potion);
    usedNames.add(potion.name);
  }
  if (selectedPotions.length < 3) {
    console.warn("Not enough unique potions to populate full offering.");
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      potions: selectedPotions
    }),
    log: ["Populated potion offerings."].concat(_toConsumableArray(state.log))
  });
}
function populateRelicOfferings(state) {
  var rarity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var selected = [];
  var maxRelics = 3;
  var _loop2 = function _loop2() {
    var relic = generateRandomRelic(state, {
      rarity: rarity
    });

    // Ensure uniqueness by name
    if (selected.some(function (r) {
      return r.name === relic.name;
    })) return 1; // continue
    selected.push(relic);
  };
  while (selected.length < maxRelics) {
    if (_loop2()) continue;
  }
  console.log("Selected relic offerings:", selected);
  return _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      relics: selected
    }),
    log: ["Populated relic offerings."].concat(_toConsumableArray(state.log))
  });
}
function populateGemOfferings(state) {
  var selectedGems = [];
  var usedNames = new Set();
  var attempts = 0;
  while (selectedGems.length < 3 && attempts < 50) {
    attempts++;
    var gem = generateRandomGem(state);
    if (!gem) continue;
    if (usedNames.has(gem.name)) continue;
    selectedGems.push(gem);
    usedNames.add(gem.name);
  }
  if (selectedGems.length < 3) {
    console.warn("Not enough unique gems to populate full offering.");
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      gems: selectedGems
    }),
    log: ["Populated gem offerings."].concat(_toConsumableArray(state.log))
  });
}
function populatePathOfferings(state) {
  var _state$campaign$deck;
  var luck = state.luck || 0;
  var misery = state.misery || 0;
  var level = state.level || 0;

  // === Step 0: Boss override ===
  if ([15, 30, 45].includes(level)) {
    var bossPath = _objectSpread({
      path: PATHS.BOSS_FIGHT
    }, pathMap[PATHS.BOSS_FIGHT]);
    return _objectSpread(_objectSpread({}, state), {}, {
      offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
        paths: [bossPath, bossPath, bossPath]
      }),
      log: ["Boss floor! All paths lead to a boss fight."].concat(_toConsumableArray(state.log))
    });
  }

  // === Step 1: Always pick 1 fight path ===
  var fightWeights = _defineProperty(_defineProperty(_defineProperty({}, PATHS.EASY_FIGHT, 3), PATHS.MEDIUM_FIGHT, 2), PATHS.HARD_FIGHT, 1);
  var fightPathKey = weightedRandomChoice(fightWeights);
  var fightPath = _objectSpread({
    path: fightPathKey
  }, pathMap[fightPathKey]);

  // === Step 2: Create a pool of all valid paths (excluding duplicate of picked fight) ===
  var allPaths = Object.entries(pathMap).filter(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 1),
      key = _ref5[0];
    return key !== fightPathKey;
  }).map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
      path = _ref7[0],
      data = _ref7[1];
    return _objectSpread({
      path: path
    }, data);
  });

  // === Step 2a: Exclude GEM_OFFERING if all cards are socketed ===
  var allCardsSocketed = ((_state$campaign$deck = state.campaign.deck) === null || _state$campaign$deck === void 0 ? void 0 : _state$campaign$deck.length) > 0 && state.campaign.deck.every(function (card) {
    return card.gem != null;
  });
  var filteredPaths = allPaths.filter(function (pathObj) {
    if (pathObj.path === PATHS.GEM_OFFERING && allCardsSocketed) return false;
    return true;
  });

  // === Step 3: Pick first two paths using rarity weights ===
  var rarityWeights = getLuckAdjustedRarityWeights(luck);
  var chosenRarities = [weightedRandomChoice(rarityWeights), weightedRandomChoice(rarityWeights)];
  var chosenPaths = [];
  var usedPaths = new Set([fightPathKey]);
  var _loop3 = function _loop3() {
    var rarity = _chosenRarities[_i3];
    var candidates = filteredPaths.filter(function (p) {
      return p.rarity === rarity && !usedPaths.has(p.path);
    });
    if (candidates.length > 0) {
      var pick = candidates[Math.floor(Math.random() * candidates.length)];
      usedPaths.add(pick.path);
      chosenPaths.push(pick);
    }
  };
  for (var _i3 = 0, _chosenRarities = chosenRarities; _i3 < _chosenRarities.length; _i3++) {
    _loop3();
  }

  // === Step 4: Fill in missing 2nd path if needed
  var remainingPool = filteredPaths.filter(function (p) {
    return !usedPaths.has(p.path);
  });
  while (chosenPaths.length < 2 && remainingPool.length > 0) {
    var idx = Math.floor(Math.random() * remainingPool.length);
    var pick = remainingPool.splice(idx, 1)[0];
    usedPaths.add(pick.path);
    chosenPaths.push(pick);
  }

  // === Step 5: Optional override for 3rd path using misery + luck if both are fights
  var firstTwoAreFights = chosenPaths.every(function (p) {
    return p.isFight;
  });
  var finalPaths = [fightPath].concat(chosenPaths);
  var newMisery = misery;
  if (firstTwoAreFights && misery > 0 && remainingPool.length > 0) {
    var thirdOptions = remainingPool.filter(function (p) {
      return !usedPaths.has(p.path);
    });
    if (thirdOptions.length > 0) {
      var nonFights = thirdOptions.filter(function (p) {
        return !p.isFight;
      });
      var fights = thirdOptions.filter(function (p) {
        return p.isFight;
      });
      var weightedPool = [];
      nonFights.forEach(function (p) {
        for (var i = 0; i < misery + luck; i++) weightedPool.push(p);
      });
      fights.forEach(function (p) {
        weightedPool.push(p); // 1 weight each
      });
      if (weightedPool.length > 0) {
        var _pick = weightedPool[Math.floor(Math.random() * weightedPool.length)];
        usedPaths.add(_pick.path);
        finalPaths[2] = _pick;
        if (!_pick.isFight) newMisery = misery - 1;
      }
    }
  }

  // === Step 6: Check again if all 3 are fights and increment misery
  var allFights = finalPaths.every(function (p) {
    return p.isFight;
  });
  if (allFights) newMisery++;
  console.log("Populated path options:", finalPaths);

  // === Step 6.5: Randomly anonymize one path based on (50% - luck) chance
  var anonChance = Math.max(0, 0.5 - (state.luck || 0) * 0.01); // luck is per % point
  var anonIndex = Math.floor(Math.random() * finalPaths.length);
  if (Math.random() < anonChance) {
    finalPaths[anonIndex] = anonymizeObject(finalPaths[anonIndex]);
  }

  // === Step 7: Apply relic triggers for POPULATE_PATH
  var triggerResult = checkRelicTriggers(state, TRIGGER_EVENTS.POPULATE_PATH, {
    payload: finalPaths
  });
  var updatedPaths = triggerResult.result || finalPaths;
  var updatedState = _objectSpread({}, triggerResult);
  return _objectSpread(_objectSpread({}, updatedState), {}, {
    misery: newMisery,
    offerings: _objectSpread(_objectSpread({}, updatedState.offerings), {}, {
      paths: updatedPaths
    }),
    log: [allFights ? "Populated path options (all fights \u2014 misery increased to ".concat(newMisery, ").") : "Populated path options."].concat(_toConsumableArray(updatedState.log))
  });
}
function pickCard(state, index) {
  var phase = state.currentPhase;
  var offerings = _objectSpread({}, state.offerings);
  var sourceArrayName = null;
  if (offerings.cards && index < offerings.cards.length) {
    sourceArrayName = "cards";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else if (offerings.combatRewards && index < offerings.combatRewards.length) {
    sourceArrayName = "combatRewards";
  } else {
    console.error("Invalid card index:", index);
    return state;
  }
  var sourceArray = offerings[sourceArrayName];
  var entry = sourceArray[index];

  // 🛠️ Unwrap if from shop
  var pickedCard = sourceArrayName === "shopfront" ? entry.item : entry;
  if (!pickedCard) {
    console.error("No card found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var cost = entry.cost || 20;
    var charged = chargeGoldCost(state, cost, "card");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 3. Add to campaign deck ===
  var updatedCampaign = _objectSpread(_objectSpread({}, updatedState.campaign), {}, {
    deck: [].concat(_toConsumableArray(updatedState.campaign.deck), [pickedCard])
  });

  // === 4. Remove from offerings ===
  var updatedOfferings = _objectSpread(_objectSpread({}, updatedState.offerings), {}, _defineProperty({}, sourceArrayName, sourceArray.filter(function (_, i) {
    return i !== index;
  })));

  // === 5. Apply triggers ===
  var newState = _objectSpread(_objectSpread({}, updatedState), {}, {
    campaign: updatedCampaign,
    offerings: updatedOfferings,
    log: ["Picked card: ".concat(pickedCard.name)].concat(_toConsumableArray(updatedState.log))
  });
  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.CARD_PICKUP, {
    payload: pickedCard
  });

  // === 6. Trash unchosen cards if from offering ===
  if (phase === PHASES.CARD_OFFERING) {
    var trashed = sourceArray.filter(function (_, i) {
      return i !== index;
    });
    newState = _objectSpread(_objectSpread({}, newState), {}, {
      trashPile: [].concat(_toConsumableArray(newState.trashPile || []), _toConsumableArray(trashed)),
      offerings: _objectSpread(_objectSpread({}, newState.offerings), {}, _defineProperty({}, sourceArrayName, []))
    });
    newState = handlePhaseTransitions(advancePhaseTo(newState, PHASES.PATH_SELECTION));
  }
  return newState;
}
function pickRelic(state, index) {
  var phase = state.currentPhase;
  var offerings = _objectSpread({}, state.offerings);

  // === 1. Determine the source array ===
  var sourceArrayName = null;
  if (offerings.relics && index < offerings.relics.length) {
    sourceArrayName = "relics";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else if (offerings.combatRewards && index < offerings.combatRewards.length) {
    sourceArrayName = "combatRewards";
  } else {
    console.error("Invalid relic index:", index);
    return state;
  }
  var sourceArray = offerings[sourceArrayName];
  var entry = sourceArray[index];

  // 🛠️ Unwrap relic from shopfront if needed
  var pickedRelic = sourceArrayName === "shopfront" ? entry.item : entry;
  if (!pickedRelic) {
    console.error("No relic found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var relicCost = entry.cost || 50;
    var chargedState = chargeGoldCost(state, relicCost, "relic");
    if (chargedState === state) return state; // not enough gold
    updatedState = chargedState;
  }

  // === 3. Add relic to belt ===
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    relicBelt: [].concat(_toConsumableArray(updatedState.relicBelt), [pickedRelic])
  });

  // === 4. Remove the picked relic from offerings ===
  offerings[sourceArrayName] = sourceArray.filter(function (_, i) {
    return i !== index;
  });

  // === 5. Trash unchosen relics if from offering phase ===
  var isOfferingPhase = [PHASES.MYTHIC_RELIC_OFFERING, PHASES.RELIC_OFFERING].includes(phase);
  var updatedTrashPile = updatedState.trashPile;
  if (isOfferingPhase) {
    updatedTrashPile = [].concat(_toConsumableArray(updatedTrashPile || []), _toConsumableArray(offerings.relics.filter(function (_, i) {
      return i !== index;
    })));
    offerings.relics = [];
  }

  // === 6. Build the new state ===
  var newState = _objectSpread(_objectSpread({}, updatedState), {}, {
    trashPile: updatedTrashPile,
    // ✅ Root-level trash pile
    offerings: offerings,
    log: ["Picked relic: ".concat(pickedRelic.name)].concat(_toConsumableArray(updatedState.log))
  });

  // === 7. Trigger relic effects
  var triggeredState = checkRelicTriggers(newState, TRIGGER_EVENTS.RELIC_PICKUP, {
    relic: pickedRelic
  });

  // === 8. Advance phase if in offering
  if (isOfferingPhase) {
    return handlePhaseTransitions(advancePhaseTo(triggeredState, PHASES.PATH_SELECTION));
  }
  return triggeredState;
}
function pickPotion(state, index) {
  var phase = state.currentPhase;
  var offerings = _objectSpread({}, state.offerings);

  // === 1. Determine the source array ===
  var sourceArrayName = null;
  if (offerings.potions && index < offerings.potions.length) {
    sourceArrayName = "potions";
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
  } else {
    console.error("Invalid potion index:", index);
    return state;
  }
  var sourceArray = offerings[sourceArrayName];
  var entry = sourceArray[index];

  // 🛠️ Unwrap the potion if it came from the shop
  var pickedPotion = sourceArrayName === "shopfront" ? entry.item : entry;
  if (!pickedPotion) {
    console.error("No potion found at index:", index);
    return state;
  }

  // === 2. Charge cost if in shop ===
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var cost = entry.cost || 30;
    var charged = chargeGoldCost(state, cost, "potion");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 3. Apply pickup relic triggers (may upgrade the potion) ===
  var triggerResult = checkRelicTriggers(updatedState, TRIGGER_EVENTS.POTION_PICKUP, {
    payload: pickedPotion
  });
  var triggeredPotion = triggerResult.result;
  updatedState = _objectSpread({}, triggerResult); // ensures any other state changes are included

  // === 4. Add to top-level potion belt ===
  var updatedPotionBelt = [].concat(_toConsumableArray(updatedState.potionBelt), [triggeredPotion]);

  // === 5. Remove the picked potion from the offerings ===
  offerings[sourceArrayName] = sourceArray.filter(function (_, i) {
    return i !== index;
  });

  // === 6. Trash unchosen potions if from offering ===
  var updatedTrashPile = updatedState.trashPile;
  if (phase === PHASES.POTION_OFFERING) {
    updatedTrashPile = [].concat(_toConsumableArray(updatedTrashPile || []), _toConsumableArray(offerings.potions.filter(function (_, i) {
      return i !== index;
    })));
    offerings.potions = [];
  }

  // === 7. Build the new state ===
  var newState = _objectSpread(_objectSpread({}, updatedState), {}, {
    potionBelt: updatedPotionBelt,
    trashPile: updatedTrashPile,
    // ✅ Root-level trash pile
    offerings: offerings,
    log: ["Picked potion: ".concat(pickedPotion.name)].concat(_toConsumableArray(updatedState.log))
  });

  // === 8. Advance if from offering ===
  if (phase === PHASES.POTION_OFFERING) {
    return handlePhaseTransitions(advancePhaseTo(newState, PHASES.PATH_SELECTION));
  }
  return newState;
}
function drinkPotion(state, potion) {
  if (!potion) {
    console.error("No potion passed to drinkPotion");
    return state;
  }
  var updatedState = _objectSpread({}, state);

  // === 1. Apply effects ===
  if (potion.healthRestore) {
    updatedState = heal(updatedState, potion.healthRestore);
  }

  // === 2. Remove potion from potionBelt and add to trash ===
  var newPotionBelt = updatedState.potionBelt.filter(function (p) {
    return p !== potion;
  });
  var newTrash = [].concat(_toConsumableArray(updatedState.trashPile), [potion]);
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    campaign: _objectSpread(_objectSpread({}, updatedState.campaign), {}, {
      potionBelt: newPotionBelt,
      trashPile: newTrash
    }),
    log: ["Drank potion: ".concat(potion.name)].concat(_toConsumableArray(updatedState.log))
  });

  // === 3. Check relic triggers ===
  var triggerResult = checkRelicTriggers(updatedState, TRIGGER_EVENTS.DRINK_POTION, {
    potion: potion
  });
  return _objectSpread(_objectSpread({}, triggerResult), {}, {
    log: triggerResult.log || updatedState.log
  });
}
function openModScreen(state, mod) {
  var _state$offerings$gems;
  var originPhase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var validKeys = ["upgrade", "gem", "purge", "transmute"];
  var keys = Object.keys(mod || {});
  if (keys.length !== 1 || !validKeys.includes(keys[0])) {
    console.error("Invalid mod passed to openModScreen:", mod);
    return state;
  }

  // === GEM LOGIC: Discard unchosen gems only if from gem offering ===
  if (mod.gem && (((_state$offerings$gems = state.offerings.gems) === null || _state$offerings$gems === void 0 ? void 0 : _state$offerings$gems.length) || 0) > 0) {
    var chosenGemName = mod.gem.name;
    var discardedGems = state.offerings.gems.filter(function (g) {
      return g.name !== chosenGemName;
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
        trashPile: [].concat(_toConsumableArray(state.trashPile), _toConsumableArray(discardedGems))
      }),
      offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
        gems: [] // clear offering gems
      }),
      log: ["Discarded ".concat(discardedGems.length, " unchosen gem(s).")].concat(_toConsumableArray(state.log))
    });
  }

  // === Charge gold if in shop ===
  if (state.currentPhase === PHASES.SHOP) {
    var _mod$gem;
    var cost = 50;
    if ((mod === null || mod === void 0 || (_mod$gem = mod.gem) === null || _mod$gem === void 0 ? void 0 : _mod$gem.cost) !== undefined) {
      cost = mod.gem.cost;
    }
    var charged = chargeGoldCost(state, cost, "card modification");
    if (charged === state) return state; // insufficient gold
    state = charged;
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    currentScreen: SCREENS.MOD,
    modData: {
      mod: mod,
      origin: originPhase || state.currentPhase
    },
    log: ["Opened mod screen (".concat(keys[0], ").")].concat(_toConsumableArray(state.log))
  });
}
function increaseBaseBunnies(state, amount) {
  var newAmount = Math.max(0, (state.baseBunnies || 0) + amount);
  return _objectSpread(_objectSpread({}, state), {}, {
    baseBunnies: newAmount,
    log: ["Base bunnies increased by ".concat(amount, ".")].concat(_toConsumableArray(state.log))
  });
}
function applyModToCard(state, card) {
  var _state$modData, _state$modData2;
  var mod = (_state$modData = state.modData) === null || _state$modData === void 0 ? void 0 : _state$modData.mod;
  var origin = (_state$modData2 = state.modData) === null || _state$modData2 === void 0 ? void 0 : _state$modData2.origin;
  if (!mod || !card) {
    console.warn("applyModToCard called without a valid mod or card.");
    return state;
  }
  var updatedDeck = _toConsumableArray(state.campaign.deck);
  var cardIndex = updatedDeck.findIndex(function (c) {
    return c === card;
  });
  if (cardIndex === -1) {
    console.warn("Card not found in campaign deck.");
    return state;
  }

  // Apply mod
  var modifiedCard = _objectSpread({}, card);
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
  var nextPhase = origin === PHASES.SHOP || origin === PHASES.COMBAT_END ? origin : PHASES.PATH_SELECTION;
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      deck: updatedDeck
    }),
    modData: null,
    currentScreen: SCREENS.MAIN,
    currentPhase: nextPhase,
    log: ["Applied mod to ".concat(card.name, ".")].concat(_toConsumableArray(state.log))
  });

  // If transitioning to path selection, trigger path population
  return nextPhase === PHASES.PATH_SELECTION ? handlePhaseTransitions(updatedState) : updatedState;
}
function populateShopfront(state) {
  var shopfrontTypes = [];
  // === Clear existing shop items into trash ===
  var previousItems = state.offerings.shopfront || [];
  var discardedItems = previousItems.map(function (entry) {
    return entry.item;
  });
  var updatedTrash = [].concat(_toConsumableArray(state.trashPile || []), _toConsumableArray(discardedItems));
  // === Step 1: Ensure 1 of each type ===
  var guaranteedTypes = ["relic", "potion", "card", "gem"];
  guaranteedTypes.forEach(function (type) {
    return shopfrontTypes.push(type);
  });

  // === Step 2: Fill remaining 8 items using weighted choice ===
  var weights = {
    card: 12,
    potion: 3,
    gem: 1,
    relic: 1
  };
  var weightedPool = Object.entries(weights).flatMap(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      type = _ref9[0],
      weight = _ref9[1];
    return Array(weight).fill(type);
  });
  var safetyCounter = 0;
  while (shopfrontTypes.length < 12 && safetyCounter < 100) {
    safetyCounter++;
    var chosen = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    shopfrontTypes.push(chosen);
  }

  // === Step 3: Generate actual items, avoiding duplicates ===
  var generatedItems = [];
  var usedKeys = new Set();
  for (var _i4 = 0, _shopfrontTypes = shopfrontTypes; _i4 < _shopfrontTypes.length; _i4++) {
    var type = _shopfrontTypes[_i4];
    var item = null;
    var attempt = 0;
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
        var key = "".concat(type, "-").concat(item.name);
        if (usedKeys.has(key)) continue;
        usedKeys.add(key);
        generatedItems.push({
          type: type,
          item: item
        });
        break; // done
      } catch (e) {
        console.warn("Shop item generation failed:", type, e);
      }
    }
  }

  // === Step 4: Insert shopfront and assign prices ===
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      trashPile: updatedTrash
    }),
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      shopfront: generatedItems
    })
  });
  updatedState = assignShopPrices(updatedState);
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.ASSIGN_SHOP_PRICES);
  return _objectSpread(_objectSpread({}, updatedState), {}, {
    log: ["Populated shopfront with ".concat(generatedItems.length, " unique items.")].concat(_toConsumableArray(updatedState.log))
  });
}
function gainGold(state, amount) {
  var newGold = (state.gold || 0) + amount;
  return _objectSpread(_objectSpread({}, state), {}, {
    gold: newGold,
    log: ["Gained ".concat(amount, " gold.")].concat(_toConsumableArray(state.log))
  });
}
function practiceWandwork(state) {
  // Step 1: Increase base bunnies by 1
  var newState = increaseBaseBunnies(state, 1);

  // Step 2: Advance to path selection
  newState = advancePhaseTo(newState, PHASES.PATH_SELECTION);

  // Step 3: Handle the transition (populate offerings)
  newState = handlePhaseTransitions(newState);
  return newState;
}
function lootHoard(state) {
  var _state$defeatedEnemie;
  var baseGold = 10;
  var levelBonus = state.level || 0;
  var enemiesDefeated = ((_state$defeatedEnemie = state.defeatedEnemies) === null || _state$defeatedEnemie === void 0 ? void 0 : _state$defeatedEnemie.length) || 0;
  var luck = state.luck || 0;
  var enemyBonus = enemiesDefeated * 5;
  var luckBonus = luck * 2;
  var totalGold = baseGold + levelBonus + enemyBonus + luckBonus;

  // Step 1: Gain gold
  var newState = gainGold(state, totalGold);

  // Step 2: Track hoards looted
  var hoardsLooted = (newState.hoardsLooted || 0) + 1;
  newState = _objectSpread(_objectSpread({}, newState), {}, {
    hoardsLooted: hoardsLooted,
    log: ["Looted a hoard! (".concat(totalGold, "g)")].concat(_toConsumableArray(newState.log))
  });

  // Step 3: Advance phase
  newState = advancePhaseTo(newState, PHASES.PATH_SELECTION);
  newState = handlePhaseTransitions(newState);
  return newState;
}
function rest(state) {
  var amountToHeal = state.restHealthRestore || 0;
  var currentHealth = state.health || 0;

  // Step 1: Heal the player
  var newState = heal(state, amountToHeal);
  var healedAmount = newState.health - currentHealth;

  // Step 2: Check relic triggers for REST
  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.REST);

  // Step 3: Add one summary log line
  newState = _objectSpread(_objectSpread({}, newState), {}, {
    log: ["Rested at the fire and recovered ".concat(healedAmount, " HP.")].concat(_toConsumableArray(newState.log.filter(function (msg) {
      return !msg.startsWith("Healed");
    })))
  });

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
      handSize: 5
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
      enemy: null
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
      restOptions: []
    }
  };
}
function selectDifficultyAndBeginGame(dispatch, difficulty) {
  dispatch({
    type: ACTIONS.SET_DIFFICULTY,
    payload: difficulty
  });
  dispatch({
    type: ACTIONS.GENERATE_STARTER_DECK
  });
  dispatch({
    type: ACTIONS.APPLY_DIFFICULTY_MODIFIERS
  });
  dispatch({
    type: ACTIONS.ADVANCE_PHASE,
    payload: PHASES.MYTHIC_RELIC_OFFERING
  });
}
function createGameApp(initialState, reducer, renderFn) {
  var state = initialState;
  function dispatch(action) {
    state = reducer(state, action);
    renderFn(state, dispatch); // pass dispatch so buttons etc. can use it
  }
  // Start the game
  dispatch({
    type: ACTIONS.NEW_GAME
  });
  return {
    dispatch: dispatch
  };
}

//#endregion
//#region game mechanics
function createCardInstance() {
  var cardName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var rarity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var upgrades = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var gem = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var card;
  if (rarity) {
    console.log("🔍 createCardInstance got rarity:", rarity);
  }
  if (cardName) {
    var found = cardList.find(function (c) {
      return c.name === cardName;
    });
    if (!found) {
      console.error("Card not found: ".concat(cardName));
      return null;
    }
    card = _objectSpread({}, found);
  } else if (rarity) {
    var candidates = cardList.filter(function (c) {
      return c.rarity === rarity;
    });
    if (candidates.length === 0) {
      console.error("No cards found with rarity: ".concat(rarity));
      return null;
    }
    card = _objectSpread({}, candidates[Math.floor(Math.random() * candidates.length)]);
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
  var found = relicList.find(function (r) {
    return r.name === relicName;
  });
  if (!found) {
    console.error("Relic not found: ".concat(relicName));
    return null;
  }
  return _objectSpread({}, found);
}
function createPotionInstance(potionName) {
  var upgrades = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var found = potionList.find(function (p) {
    return p.name === potionName;
  });
  if (!found) {
    console.error("Potion not found: ".concat(potionName));
    return null;
  }
  var potion = _objectSpread({}, found);
  if (upgrades > 0) {
    potion = upgradePotion(potion, upgrades);
  }
  return potion;
}
function createGemInstance(gemName) {
  var found = gemList.find(function (g) {
    return g.name === gemName;
  });
  if (!found) {
    console.error("Gem not found: ".concat(gemName));
    return null;
  }
  return _objectSpread({}, found);
}
function generateRandomRelic(state) {
  var _ref0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref0$rarity = _ref0.rarity,
    rarity = _ref0$rarity === void 0 ? null : _ref0$rarity;
  var luck = state.luck || 0;
  var ownedRelics = new Set([].concat(_toConsumableArray(state.relicBelt.map(function (r) {
    return r.name;
  })), _toConsumableArray(state.trashPile.map(function (r) {
    return r.name;
  }))));
  var GOLD_BAG = "Gold Bag";

  // Exclude Gold Bag and duplicate high-rarity relics
  var candidates = relicList.filter(function (r) {
    if (r.name === GOLD_BAG) return false;
    if ((r.rarity === RARITIES.MYTHIC || r.rarity === RARITIES.LEGENDARY) && ownedRelics.has(r.name)) {
      return false;
    }
    return true;
  });
  if (!rarity) {
    var rarityWeights = getLuckAdjustedRarityWeights(luck);
    rarity = weightedRandomChoice(rarityWeights);
  }
  var filtered = candidates.filter(function (r) {
    return r.rarity === rarity;
  });
  if (filtered.length === 0) {
    console.warn("No relics found for rarity: ".concat(rarity));
    return createRelicInstance(GOLD_BAG);
  }
  var chosen = filtered[Math.floor(Math.random() * filtered.length)];
  return _objectSpread({}, chosen);
}
function generateRandomCard(state) {
  var _state$defeatedEnemie2;
  var _ref1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref1$rarity = _ref1.rarity,
    rarity = _ref1$rarity === void 0 ? null : _ref1$rarity,
    _ref1$upgrades = _ref1.upgrades,
    upgrades = _ref1$upgrades === void 0 ? undefined : _ref1$upgrades,
    _ref1$gem = _ref1.gem,
    gem = _ref1$gem === void 0 ? null : _ref1$gem;
  var luck = state.luck || 0;
  var finalRarity = rarity || weightedRandomChoice(getLuckAdjustedRarityWeights(luck));
  var upgradeWeights = {
    0: Math.max(0, 100 - luck),
    1: 3 + luck,
    2: 2 + luck,
    3: 1 + luck,
    4: 0 + luck
  };
  var finalUpgrades = upgrades !== undefined ? upgrades : Number(weightedRandomChoice(upgradeWeights));
  var defeatedCount = ((_state$defeatedEnemie2 = state.defeatedEnemies) === null || _state$defeatedEnemie2 === void 0 ? void 0 : _state$defeatedEnemie2.length) || 0;
  var maxUpgrades = Math.min(4, Math.floor(defeatedCount / 3));
  var cappedUpgrades = Math.min(finalUpgrades, maxUpgrades);
  return createCardInstance(undefined, finalRarity, cappedUpgrades, gem);
}
function generateRandomPotion(state) {
  var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref10$rarity = _ref10.rarity,
    rarity = _ref10$rarity === void 0 ? null : _ref10$rarity,
    _ref10$upgrades = _ref10.upgrades,
    upgrades = _ref10$upgrades === void 0 ? null : _ref10$upgrades;
  var luck = state.luck || 0;
  var rarityWeights = getLuckAdjustedRarityWeights(luck);
  var upgradeWeights = {
    0: Math.max(0, 100 - luck),
    1: 3 + luck,
    2: 2 + luck,
    3: 1 + luck,
    4: 0 + luck
  };

  // === Choose rarity if not provided ===
  if (!rarity) {
    rarity = weightedRandomChoice(rarityWeights);
  }

  // === Fallback in case rarity yields no results ===
  var candidates = potionList.filter(function (p) {
    return p.rarity === rarity;
  });
  var basePotion;
  if (candidates.length === 0) {
    console.warn("No potions found for rarity: ".concat(rarity, ". Falling back to Lesser Healing Potion."));
    basePotion = potionList.find(function (p) {
      return p.name === "Lesser Healing Potion";
    });
    if (!basePotion) {
      console.error("Fallback potion 'Lesser Healing Potion' not found in potionList.");
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
function generateRandomGem(state) {
  var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref11$rarity = _ref11.rarity,
    rarity = _ref11$rarity === void 0 ? null : _ref11$rarity;
  var luck = state.luck || 0;
  var fallbackGem = createGemInstance("Amethyst");

  // Choose rarity based on luck if not specified
  if (!rarity) {
    var rarityWeights = getLuckAdjustedRarityWeights(luck);
    rarity = weightedRandomChoice(rarityWeights);
  }

  // Filter by rarity
  var candidates = gemList.filter(function (gem) {
    return gem.rarity === rarity;
  });
  if (candidates.length === 0) {
    console.warn("No gems found for rarity: ".concat(rarity, ", returning fallback gem."));
    return fallbackGem;
  }
  var chosenGem = candidates[Math.floor(Math.random() * candidates.length)];
  return _objectSpread({}, chosenGem);
}
function upgradeCard(card) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (!card || _typeof(card) !== "object") {
    console.error("Invalid card passed to upgradeCard:", card);
    return card;
  }

  // Clone the card to avoid mutating the original
  var upgradedCard = _objectSpread({}, card);
  var upgradable = false;
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
    console.error("Card cannot be upgraded: ".concat(card.name));
    return card;
  }

  // Add or increment the upgrade level
  upgradedCard.upgrades = (upgradedCard.upgrades || 0) + level;

  // Rename the card to reflect its upgrade level
  upgradedCard.name = card.name.replace(/\s\+\d+$/, "") + " +".concat(upgradedCard.upgrades);
  return upgradedCard;
}
function upgradePotion(potion) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (!potion || _typeof(potion) !== "object") {
    console.error("Invalid potion passed to upgradePotion:", potion);
    return potion;
  }

  // Clone the potion to avoid mutating the original
  var upgradedPotion = _objectSpread({}, potion);
  var upgradable = false;

  // === Upgradeable Effects ===
  if ("healthRestore" in upgradedPotion) {
    upgradedPotion.healthRestore += 2 * level;
    upgradable = true;
  }
  if (!upgradable) {
    console.error("Potion cannot be upgraded: ".concat(potion.name));
    return potion;
  }

  // === Track upgrade level ===
  upgradedPotion.upgrades = (upgradedPotion.upgrades || 0) + level;

  // === Update potion name to reflect upgrades ===
  upgradedPotion.name = potion.name.replace(/\s\+\d+$/, "") + " +".concat(upgradedPotion.upgrades);
  return upgradedPotion;
}
function socketCardWithGem(card, gem) {
  if (!card || _typeof(card) !== "object") {
    console.error("Invalid card passed to socketCardWithGem:", card);
    return card;
  }
  if (!gem || _typeof(gem) !== "object" || !gem.name) {
    console.error("Invalid gem passed to socketCardWithGem:", gem);
    return card;
  }

  // Clone the card to avoid mutation
  var socketedCard = _objectSpread({}, card);

  // Apply gem effects
  if ("bunnyAdd" in gem) {
    socketedCard.bunnyAdd = (socketedCard.bunnyAdd || 0) + gem.bunnyAdd;
  }

  // Save the gem reference
  socketedCard.gem = gem;

  // Rename the card to include the gem name as a prefix
  socketedCard.name = "".concat(gem.name, " ").concat(card.name);
  return socketedCard;
}
function getLuckAdjustedRarityWeights() {
  var luck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, RARITIES.COMMON, Math.max(20, 60 - luck * 2)), RARITIES.UNCOMMON, Math.max(20, 40 - luck)), RARITIES.RARE, Math.min(20, 5 + luck)), RARITIES.MYTHIC, Math.min(10, 2 + Math.ceil(luck / 2))), RARITIES.LEGENDARY, Math.min(5, 1 + Math.ceil(luck / 3)));
}
function chargeGoldCost(state, cost) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "purchase";
  if (state.gold < cost) {
    console.warn("Not enough gold for ".concat(context, "!"));
    return state; // return unmodified state
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      gold: state.gold - cost
    }),
    log: ["Spent ".concat(cost, " gold on ").concat(context, ".")].concat(_toConsumableArray(state.log))
  });
}
function checkRelicTriggers(state, triggerEvent) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var updatedState = _objectSpread({}, state);
  var result = context.payload || null;
  var _iterator3 = _createForOfIteratorHelper(updatedState.relicBelt),
    _step3;
  try {
    var _loop4 = function _loop4() {
      var _relic$triggers;
      var relic = _step3.value;
      var effect = (_relic$triggers = relic.triggers) === null || _relic$triggers === void 0 ? void 0 : _relic$triggers[triggerEvent];
      if (!effect) return 1; // continue

      // === handle DRINK_POTION effects ===
      if (triggerEvent === TRIGGER_EVENTS.DRINK_POTION && context.potion) {
        if (effect.healPlayer) {
          updatedState = heal(updatedState, effect.healPlayer);
          updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
            log: ["".concat(relic.name, " healed you for ").concat(effect.healPlayer, " HP on potion use.")].concat(_toConsumableArray(updatedState.log))
          });
        }
      }

      // === Handle POTION_PICKUP effects ===
      if (triggerEvent === TRIGGER_EVENTS.POTION_PICKUP && effect.upgradePotion && result) {
        result = upgradePotion(result, 1);
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          log: ["".concat(relic.name, " upgraded a potion on pickup!")].concat(_toConsumableArray(updatedState.log))
        });
      }

      // === Handle CARD_PICKUP effects ===
      if (triggerEvent === TRIGGER_EVENTS.CARD_PICKUP && effect.upgradeCard && result) {
        result = upgradeCard(result, 1);
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          log: ["".concat(relic.name, " upgraded a card on pickup!")].concat(_toConsumableArray(updatedState.log))
        });
      }

      // === Handle RELIC_PICKUP effects ===
      if (triggerEvent === TRIGGER_EVENTS.RELIC_PICKUP && context.relic) {
        var campaign = _objectSpread({}, updatedState.campaign);
        var newHealth = updatedState.health;
        var newMaxHealth = updatedState.maxHealth;
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
          updatedState = increaseBaseBunnies(updatedState, effect.bonusBaseBunnies);
        }
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          campaign: campaign,
          health: newHealth,
          maxHealth: newMaxHealth,
          log: ["".concat(relic.name, " granted bonuses on relic pickup.")].concat(_toConsumableArray(updatedState.log))
        });
      }

      // === Handle SHOP PRICE ADJUSTMENT ===
      if (triggerEvent === TRIGGER_EVENTS.ASSIGN_SHOP_PRICES && effect.shopPriceMultiplier) {
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          offerings: _objectSpread(_objectSpread({}, updatedState.offerings), {}, {
            shopfront: updatedState.offerings.shopfront.map(function (entry) {
              var adjustedCost = Math.round(entry.item.cost * effect.shopPriceMultiplier);
              return _objectSpread(_objectSpread({}, entry), {}, {
                item: _objectSpread(_objectSpread({}, entry.item), {}, {
                  cost: adjustedCost
                })
              });
            })
          }),
          log: ["Applied shop price multiplier (".concat(effect.shopPriceMultiplier, ")")].concat(_toConsumableArray(updatedState.log))
        });
      }

      // === Handle REST effects ===
      if (triggerEvent === TRIGGER_EVENTS.REST) {
        if (effect.healPlayer) {
          updatedState = heal(updatedState, effect.healPlayer);
          updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
            log: ["".concat(relic.name, " healed you for ").concat(effect.healPlayer, " HP while resting.")].concat(_toConsumableArray(updatedState.log))
          });
        }
        if (effect.goldAdd) {
          updatedState = gainGold(updatedState, effect.goldAdd);
          updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
            log: ["".concat(relic.name, " gave you ").concat(effect.goldAdd, " gold while resting.")].concat(_toConsumableArray(updatedState.log))
          });
        }
        if (effect.permanentlyUpgradeRandomCardsInDeck > 0) {
          var deck = updatedState.campaign.deck;
          var numToUpgrade = Math.min(effect.permanentlyUpgradeRandomCardsInDeck, deck.length);
          var shuffled = _toConsumableArray(deck).sort(function () {
            return Math.random() - 0.5;
          });
          var toUpgrade = shuffled.slice(0, numToUpgrade);
          var upgraded = toUpgrade.map(function (card) {
            return upgradeCard(card, 1);
          });
          var upgradedDeck = deck.map(function (card) {
            return toUpgrade.includes(card) ? upgraded[toUpgrade.indexOf(card)] : card;
          });
          updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
            campaign: _objectSpread(_objectSpread({}, updatedState.campaign), {}, {
              deck: upgradedDeck
            }),
            log: ["".concat(relic.name, " permanently upgraded ").concat(numToUpgrade, " card(s) while resting.")].concat(_toConsumableArray(updatedState.log))
          });
        }
      }

      // === Handle POPULATE PATH effects ===

      if (event === TRIGGER_EVENTS.POPULATE_PATHS && triggerData.revealAnonymousPaths) {
        var updatedPaths = state.offerings.paths.map(function (path) {
          return path.anonymousNameDisplay ? _objectSpread(_objectSpread({}, path), {}, {
            anonymousNameDisplay: false
          }) : path;
        });
        state = _objectSpread(_objectSpread({}, state), {}, {
          offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
            paths: updatedPaths
          }),
          log: ["".concat(relic.name, " revealed a hidden path.")].concat(_toConsumableArray(state.log))
        });
      }
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      if (_loop4()) continue;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return _objectSpread(_objectSpread({}, updatedState), {}, {
    result: result
  });
}
function heal(state, amount) {
  var current = state.health || 0;
  var max = state.maxHealth || 0;
  var newHealth = Math.min(current + amount, max);
  var healedAmount = newHealth - current;
  return _objectSpread(_objectSpread({}, state), {}, {
    health: newHealth,
    log: ["Healed ".concat(healedAmount, " HP.")].concat(_toConsumableArray(state.log))
  });
}
function transmuteCard(card) {
  if (!card || !card.name) {
    console.error("Invalid card passed to transmuteCard:", card);
    return null;
  }
  var alternatives = cardList.filter(function (c) {
    return c.name !== card.name && !c.unchoosableByTransmute;
  });
  if (alternatives.length === 0) {
    console.warn("No valid alternatives found to transmute ".concat(card.name, ". Returning original."));
    return _objectSpread({}, card);
  }
  var newBase = alternatives[Math.floor(Math.random() * alternatives.length)];
  return createCardInstance(newBase.name, null, card.upgrades, card.gem);
}
function purgeCard(state, card) {
  if (!card || !card.name) {
    console.error("Invalid card passed to purgeCard:", card);
    return state;
  }
  var updatedDeck = state.campaign.deck.filter(function (c) {
    return c !== card;
  });
  var updatedTrash = [].concat(_toConsumableArray(state.trashPile || []), [card]);
  return _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      deck: updatedDeck,
      trashPile: updatedTrash
    }),
    log: ["Purged card: ".concat(card.name)].concat(_toConsumableArray(state.log))
  });
}
//#endregion
//#region game reducer
function gameReducer(state, action) {
  var _action$payload;
  switch (action.type) {
    case ACTIONS.NEW_GAME:
      return _objectSpread(_objectSpread({}, createInitialState()), {}, {
        log: ["New game started."]
      });
    case ACTIONS.SET_DIFFICULTY:
      {
        if (state.difficulty === action.payload) {
          console.log("Difficulty already set to", action.payload);
          return state;
        }
        console.log("Difficulty set to ".concat(action.payload));
        return _objectSpread(_objectSpread({}, state), {}, {
          difficulty: action.payload,
          // ✅ store at root
          log: ["Difficulty set to ".concat(action.payload, ".")].concat(_toConsumableArray(state.log))
        });
      }
    case ACTIONS.GENERATE_STARTER_DECK:
      return generateStarterDeck(state);
    case ACTIONS.APPLY_DIFFICULTY_MODIFIERS:
      return applyDifficultyModifiers(state);
    case ACTIONS.ADVANCE_PHASE:
      var newState = advancePhaseTo(state, action.payload);
      return handlePhaseTransitions(newState);
    case ACTIONS.CREATE_CARD_INSTANCE:
      {
        var newCard = createCardInstance(action.payload.cardName, action.payload.rarity, action.payload.upgrades, action.payload.gem);
        return _objectSpread(_objectSpread({}, state), {}, {
          campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
            deck: [].concat(_toConsumableArray(state.campaign.deck), [newCard])
          }),
          log: ["Created card: ".concat(newCard.name)].concat(_toConsumableArray(state.log))
        });
      }
    case ACTIONS.POPULATE_RELIC_OFFERINGS:
      return populateRelicOfferings(state, (_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.rarity);
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
    case ACTIONS.DRINK_POTION:
      {
        var potionIndex = action.payload;
        var potionToDrink = state.potionBelt[potionIndex];
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
      return applyModToCard(state, action.payload);
    // payload = selected card

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
      return _objectSpread(_objectSpread({}, state), {}, {
        log: [action.payload].concat(_toConsumableArray(state.log))
      });
    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
}
//#endregion
//#region render function
function render(state, dispatch) {
  var _state$level2, _state$modData3;
  // Get or create output div
  var output = document.getElementById("output");
  if (!output) {
    output = document.createElement("div");
    output.id = "output";
    document.body.appendChild(output);
  }
  output.innerHTML = ""; // Clear previous contents

  // render utility function
  function renderModPhaseEntry(phase, label, modKey) {
    if (state.currentPhase === phase && state.currentScreen !== SCREENS.MOD) {
      var modBtn = document.createElement("button");
      modBtn.textContent = label;
      modBtn.style.fontSize = "1.5rem";
      modBtn.style.padding = "1rem 2rem";
      modBtn.onclick = function () {
        modBtn.disabled = true; // prevent double click
        dispatch({
          type: ACTIONS.OPEN_MOD_SCREEN,
          payload: {
            mod: _defineProperty({}, modKey, true),
            origin: phase
          }
        });
      };
      output.appendChild(modBtn);
    }
  }

  // === Game Info ===
  var info = document.createElement("div");
  info.innerHTML = "\n  <h2>Game Info</h2>\n  <p><strong>Current Screen:</strong> ".concat(state.currentScreen, "</p>\n  <p><strong>Phase:</strong> ").concat(state.currentPhase, " &nbsp;&nbsp; <strong>Level:</strong> ").concat((_state$level2 = state.level) !== null && _state$level2 !== void 0 ? _state$level2 : 0, "</p>\n  <p><strong>Gold:</strong> ").concat(state.gold, "</p>\n  <p><strong>Health:</strong> ").concat(state.health, "/").concat(state.maxHealth, "</p>\n  <p><strong>Deck Size:</strong> ").concat(state.campaign.deck.length, "</p>\n  <p><strong>Relics:</strong> ").concat(state.relicBelt.map(function (r) {
    return r.name;
  }).join(", ") || "None", "</p>\n");
  output.appendChild(info);

  // === Log ===
  var log = document.createElement("div");
  log.innerHTML = "<h3>Log</h3><ul>".concat(state.log.slice(0, 5).map(function (msg) {
    return "<li>".concat(msg, "</li>");
  }).join(""), "</ul>");
  output.appendChild(log);

  // === Main Menu ===
  if (state.currentScreen !== SCREENS.DECK && state.currentPhase === PHASES.MAIN_MENU) {
    var button = document.createElement("button");
    button.textContent = "New Game";
    button.onclick = function () {
      dispatch({
        type: ACTIONS.ADVANCE_PHASE,
        payload: PHASES.DIFFICULTY_SELECTION
      });
    };
    output.appendChild(button);
  }

  // === Difficulty Selection ===
  if (state.currentScreen !== SCREENS.DECK && state.currentPhase === PHASES.DIFFICULTY_SELECTION) {
    var difficulties = [DIFFICULTIES.EASY, DIFFICULTIES.MEDIUM, DIFFICULTIES.HARD];
    difficulties.forEach(function (difficulty) {
      var btn = document.createElement("button");
      btn.textContent = "Start ".concat(difficulty, " Game");
      btn.onclick = function () {
        return selectDifficultyAndBeginGame(dispatch, difficulty);
      };
      output.appendChild(btn);
    });
  }

  // === Relic Offerings ===
  if (state.currentScreen !== SCREENS.DECK && state.offerings.relics && state.offerings.relics.length > 0) {
    var relicSection = document.createElement("div");
    relicSection.innerHTML = "<h3>Relic Offerings</h3>";
    state.offerings.relics.forEach(function (relic, index) {
      var btn = document.createElement("button");
      btn.textContent = "".concat(relic.name, " (").concat(relic.rarity, ")");
      btn.onclick = function () {
        return dispatch({
          type: ACTIONS.PICK_RELIC,
          payload: index
        });
      };
      relicSection.appendChild(btn);
    });
    output.appendChild(relicSection);
  }
  // === Path Selection ===
  if (state.currentScreen !== SCREENS.DECK && state.offerings.paths && state.offerings.paths.length > 0) {
    var pathSection = document.createElement("div");
    pathSection.innerHTML = "<h3>Choose a Path</h3>";
    state.offerings.paths.forEach(function (path, index) {
      var btn = document.createElement("button");

      // === Conditionally render based on anonymity ===
      if (path.anonymousNameDisplay) {
        btn.textContent = "???";
      } else {
        btn.textContent = "".concat(path.path, " (").concat(path.rarity, ")").concat(path.isFight ? " [FIGHT]" : "");
      }
      btn.onclick = function () {
        return dispatch({
          type: ACTIONS.PICK_PATH,
          payload: index
        });
      };
      pathSection.appendChild(btn);
    });
    output.appendChild(pathSection);
  }

  // === Card Offerings ===
  if (state.currentScreen !== SCREENS.DECK && state.offerings.cards && state.offerings.cards.length > 0) {
    var cardSection = document.createElement("div");
    cardSection.innerHTML = "<h3>Choose a Card</h3>";
    state.offerings.cards.forEach(function (card, index) {
      var btn = document.createElement("button");
      btn.textContent = "".concat(card.name, " (Cost: ").concat(card.cost, ")").concat(card.upgrades ? " +".concat(card.upgrades) : "").concat(card.gem ? " [Gem: ".concat(card.gem.name, "]") : "");
      btn.onclick = function () {
        return dispatch({
          type: ACTIONS.PICK_CARD,
          payload: index
        });
      };
      cardSection.appendChild(btn);
    });
    output.appendChild(cardSection);
  }

  // === Potion Offerings ===
  if (state.currentScreen !== SCREENS.DECK && state.currentPhase === PHASES.POTION_OFFERING && state.offerings.potions && state.offerings.potions.length > 0) {
    var potionSection = document.createElement("div");
    potionSection.innerHTML = "<h3>Choose a Potion</h3>";
    state.offerings.potions.forEach(function (potion, index) {
      var btn = document.createElement("button");
      btn.textContent = "".concat(potion.name, " (").concat(potion.rarity, ")");
      btn.onclick = function () {
        return dispatch({
          type: ACTIONS.PICK_POTION,
          payload: index
        });
      };
      potionSection.appendChild(btn);
    });
    output.appendChild(potionSection);
  }

  // ==== Gem Offerings ===
  if (state.currentScreen !== SCREENS.DECK && state.currentScreen === SCREENS.MAIN && state.currentPhase === PHASES.GEM_OFFERING && state.offerings.gems && state.offerings.gems.length > 0) {
    var gemSection = document.createElement("div");
    gemSection.innerHTML = "<h3>Choose a Gem</h3>";
    state.offerings.gems.forEach(function (gem, index) {
      var btn = document.createElement("button");
      btn.textContent = "".concat(gem.name, " (").concat(gem.rarity, ")");
      btn.onclick = function () {
        return dispatch({
          type: ACTIONS.OPEN_MOD_SCREEN,
          payload: {
            mod: {
              gem: gem
            },
            origin: PHASES.GEM_OFFERING
          }
        });
      };
      gemSection.appendChild(btn);
    });
    output.appendChild(gemSection);
  }
  // === Shopfront Display ===

  if (state.currentPhase === PHASES.SHOP && state.currentScreen !== SCREENS.MOD && state.offerings.shopfront.length > 0) {
    var shopSection = document.createElement("div");
    shopSection.innerHTML = "<h3>Shop Inventory</h3>";
    var list = document.createElement("ul");
    state.offerings.shopfront.forEach(function (entry, index) {
      var _entry$item$cost, _entry$item, _state$gold;
      if (!entry || !entry.item || !entry.item.name) return;
      var li = document.createElement("li");
      var btn = document.createElement("button");
      var cost = (_entry$item$cost = (_entry$item = entry.item) === null || _entry$item === void 0 ? void 0 : _entry$item.cost) !== null && _entry$item$cost !== void 0 ? _entry$item$cost : 0;
      var playerGold = (_state$gold = state.gold) !== null && _state$gold !== void 0 ? _state$gold : 0;
      var disabled = cost > playerGold;
      btn.textContent = "".concat(entry.type.toUpperCase(), ": ").concat(entry.item.name, " (").concat(cost, "g)");
      if (disabled) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }

      // Bind correct function based on type
      btn.onclick = function () {
        switch (entry.type) {
          case "card":
            dispatch({
              type: ACTIONS.PICK_CARD,
              payload: index
            });
            break;
          case "potion":
            dispatch({
              type: ACTIONS.PICK_POTION,
              payload: index
            });
            break;
          case "gem":
            dispatch({
              type: ACTIONS.OPEN_MOD_SCREEN,
              payload: {
                mod: {
                  gem: entry.item
                },
                origin: PHASES.SHOP
              }
            });
          case "relic":
            dispatch({
              type: ACTIONS.PICK_RELIC,
              payload: index
            });
            break;
          default:
            console.warn("Unknown shop item type:", entry.type);
        }
      };
      li.appendChild(btn);
      list.appendChild(li);
    });

    // Exit Shop Button (for future logic)
    var exitBtn = document.createElement("button");
    exitBtn.textContent = "Exit Shop";
    exitBtn.onclick = function () {
      dispatch({
        type: ACTIONS.ADVANCE_PHASE,
        payload: PHASES.PATH_SELECTION
      });
    };
    shopSection.appendChild(list);
    shopSection.appendChild(exitBtn);
    output.appendChild(shopSection);
  }

  // === Mod Screen ===
  if (state.currentScreen === SCREENS.MOD && (_state$modData3 = state.modData) !== null && _state$modData3 !== void 0 && _state$modData3.mod) {
    var modSection = document.createElement("div");
    modSection.innerHTML = "<h3>Choose a card to modify</h3>";
    var mod = state.modData.mod;
    var isGemMod = !!mod.gem;
    state.campaign.deck.forEach(function (card) {
      // If it's a gem mod, skip cards that already have a gem
      if (isGemMod && card.gem) return;
      var btn = document.createElement("button");
      btn.textContent = "".concat(card.name, " (Cost: ").concat(card.cost, ")") + (card.upgrades ? " +".concat(card.upgrades) : "") + (card.gem ? " [Gem: ".concat(card.gem.name, "]") : "");
      btn.onclick = function () {
        dispatch({
          type: ACTIONS.APPLY_CARD_MOD,
          payload: card
        });
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
    var btn = document.createElement("button");
    btn.textContent = "Loot Hoard";
    btn.style.fontSize = "1.5rem";
    btn.style.padding = "1rem 2rem";
    btn.onclick = function () {
      // Placeholder until lootHoard is implemented
      dispatch({
        type: "LOOT_HOARD"
      }); // or just console.log("Loot Hoard")
    };
    output.appendChild(btn);
  }
  // ====== rest phase rendering ======
  if (state.currentPhase === PHASES.REST) {
    var restBtn = document.createElement("button");
    restBtn.textContent = "Fireside Rest";
    restBtn.style.fontSize = "1.5rem";
    restBtn.style.padding = "1rem 2rem";
    restBtn.onclick = function () {
      dispatch({
        type: "REST"
      }); // Placeholder
    };
    var practiceBtn = document.createElement("button");
    practiceBtn.textContent = "Practice Wandwork";
    practiceBtn.style.fontSize = "1.5rem";
    practiceBtn.style.padding = "1rem 2rem";
    practiceBtn.onclick = function () {
      dispatch({
        type: "PRACTICE_WANDWORK"
      }); // Placeholder
    };
    output.appendChild(restBtn);
    output.appendChild(practiceBtn);
  }
  // === Deck Inspect / Return Button ===
  //deck inspect button
  if ((state.currentScreen === SCREENS.MAIN || state.currentScreen === SCREENS.DECK) && state.campaign.deck.length > 0) {
    var deckBtn = document.createElement("button");
    deckBtn.textContent = state.currentScreen === SCREENS.MAIN ? "Inspect Deck" : "Return";
    deckBtn.onclick = function () {
      var nextScreen = state.currentScreen === SCREENS.MAIN ? SCREENS.DECK : SCREENS.MAIN;
      dispatch({
        type: ACTIONS.SCREEN_CHANGE,
        payload: nextScreen
      });
    };
    output.appendChild(deckBtn);
  }
  // deck inspect screen
  if (state.currentScreen === SCREENS.DECK) {
    var deckView = document.createElement("div");
    deckView.innerHTML = "<h3>Campaign Deck</h3>";
    var ul = document.createElement("ul");
    state.campaign.deck.forEach(function (card) {
      var li = document.createElement("li");
      li.textContent = card.name;
      ul.appendChild(li);
    });
    deckView.appendChild(ul);
    output.appendChild(deckView);
  }

  // === Always-Visible Potion Belt ===

  // === Always-Visible Potion Belt ===
  if (state.potionBelt && state.potionBelt.length > 0) {
    var beltSection = document.createElement("div");
    beltSection.innerHTML = "<h3>Your Potions</h3>";
    state.potionBelt.forEach(function (potion, index) {
      var btn = document.createElement("button");
      btn.textContent = potion.name;
      btn.onclick = function () {
        dispatch({
          type: ACTIONS.DRINK_POTION,
          payload: index
        });
      };
      beltSection.appendChild(btn);
    });
    output.appendChild(beltSection);
  }
}
// #endregion

// Initialize the game app
window.onload = function () {
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
var vegetables = ["carrot", "broccoli", "spinach", "kale", "zucchini", "eggplant", "cauliflower", "cabbage", "lettuce", "beet", "radish", "turnip", "peas", "green bean", "asparagus", "sweet potato", "pumpkin", "bell pepper", "celery", "onion"];
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
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63233" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map