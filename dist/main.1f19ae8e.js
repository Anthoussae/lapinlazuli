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

//#region enums
var _Object$freeze3;
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ENEMY_ABILITIES = Object.freeze({
  INK_DRINK: "inkDrink",
  INCREASE_HEALTH: "increaseHealth",
  HAND_SIZE_REDUCTION: "handSizeReduction",
  ADD_PEBBLES: "addOnePebble",
  ADD_MERCURY: "addTwoMercury",
  ADD_CLUTTER: "addThreeClutter",
  DOWNGRADE_CARDS: "downgradeCards"
});
var DAMAGE_TYPES = Object.freeze({
  BUNNY: "Bunny",
  FIRE: "Fire",
  LIGHTNING: "Lightning",
  POISON: "Poison"
});
var SPECIAL_CARD_SUBTYPES = Object.freeze({
  CURSE: "curse",
  UNIQUE: "unique",
  STATUS: "status"
});
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
  POPULATE_PATHS: "POPULATE_PATHS",
  SHUFFLE_GRAVEYARD_INTO_DECK: "SHUFFLE_GRAVEYARD_INTO_DECK",
  PLAY_CARD: "PLAY_CARD",
  CAST_SPELLBOOK: "CAST_SPELLBOOK",
  COMBAT_END: "COMBAT_END",
  DEAL_DAMAGE: "DEAL_DAMAGE",
  DRAW_CARD: "DRAW_CARD"
});
var PATHS = Object.freeze({
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
  TRANSMUTE: "Transmute"
});
var SCREENS = Object.freeze({
  MAIN: "main view",
  DECK: "inspect deck",
  SETTINGS: "settings",
  MOD: "modscreen",
  COMBAT_DECK: "combat deck",
  GRAVEYARD: "graveyard",
  EXILE: "exile"
});
var RARITIES = Object.freeze({
  BASIC_POLY: "basic-poly",
  // basic poly cards, several of which go in the starter deck.
  BASIC_MONO: "basic-mono",
  // basic mono cards, only one goes in the starter deck.
  COMMON: "common",
  UNCOMMON: "uncommon",
  RARE: "rare",
  MYTHIC: "mythic",
  LEGENDARY: "legendary"
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
  GAME_OVER: "game over",
  PURGE: "purge",
  HOARD: "hoard"
});
var ACTIONS = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
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
  DRAW_CARD: "DRAW_CARD"
}, "PICK_CARD", "PICK_CARD"), "CLOSE_COMBAT_REWARDS", "CLOSE_COMBAT_REWARDS"), "CLAIM_GOLD_REWARD", "CLAIM_GOLD_REWARD"), "PLAY_CARD", "PLAY_CARD"), "CAST_SPELLBOOK", "CAST_SPELLBOOK"), "EXIT_SHOP", "EXIT_SHOP"), "MULLIGAN", "MULLIGAN"));
var CARD_TYPES = Object.freeze({
  INSTANT: "instant",
  // resolves immediately when played, does not go to the spellbook.
  SPELL: "spell",
  // goes to the spellbook when played, resolves when the spellbook is cast.
  CURSE: "curse",
  // negative card that can be removed or purged.
  STATUS: "status" // temporary effect card, like a buff or debuff.
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
  restHealthRestoreModifier: 30,
  // heal 30 health when resting
  enemyHealthMultiplierModifier: -0.2 // 20% less health for enemies
}), DIFFICULTIES.MEDIUM, {
  maxHealthModifier: 75,
  goldModifier: 10,
  basicCardCountModifier: 8,
  luckModifier: 1,
  shopPriceMultiplierModifier: 0,
  // normal shop prices
  restHealthRestoreModifier: 25,
  // heal 20 health when resting
  enemyHealthMultiplierModifier: 0
}), DIFFICULTIES.HARD, {
  maxHealthModifier: 50,
  goldModifier: 0,
  basicCardCountModifier: 11,
  luckModifier: 0,
  shopPriceMultiplierModifier: 0.2,
  // 20% more expensive shop prices
  restHealthRestoreModifier: 20,
  // heal 20 health when resting
  enemyHealthMultiplierModifier: 0.2 // 20% more health for enemies
}));
var pathMap = Object.freeze((_Object$freeze3 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_Object$freeze3, PATHS.EASY_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT,
  difficulty: DIFFICULTIES.EASY
}), PATHS.MEDIUM_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT,
  difficulty: DIFFICULTIES.MEDIUM
}), PATHS.HARD_FIGHT, {
  rarity: RARITIES.COMMON,
  isFight: true,
  leadsTo: PHASES.COMBAT,
  difficulty: DIFFICULTIES.HARD
}), PATHS.BOSS_FIGHT, {
  rarity: RARITIES.SPECIAL,
  isFight: true,
  leadsTo: PHASES.COMBAT,
  difficulty: "boss"
}), PATHS.REST, {
  rarity: RARITIES.UNCOMMON,
  leadsTo: PHASES.REST
}), PATHS.SHOP, {
  rarity: RARITIES.UNCOMMON,
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
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_Object$freeze3, PATHS.POTION_OFFERING, {
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
var enemyAbilityDataMap = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ENEMY_ABILITIES.INK_DRINK, {
  baseValue: 1,
  incrementValue: 1,
  description: "Reduces player's ink at combat start",
  prefix: "Inkdrinking"
}), ENEMY_ABILITIES.INCREASE_HEALTH, {
  baseValue: 1.5,
  incrementValue: 0.5,
  description: "Increases enemy HP",
  prefix: "Tanky"
}), ENEMY_ABILITIES.HAND_SIZE_REDUCTION, {
  baseValue: 2,
  incrementValue: 1,
  description: "Reduces player's hand size at combat start",
  prefix: "Maddening"
}), ENEMY_ABILITIES.ADD_PEBBLES, {
  baseValue: 1,
  incrementValue: 2,
  description: "Adds Sisyphus' Pebble to your deck at combat start",
  prefix: "Sisyphean"
}), ENEMY_ABILITIES.ADD_MERCURY, {
  baseValue: 2,
  incrementValue: 2,
  description: "Adds Mercury Droplets to your deck at combat start",
  prefix: "Mercurial"
}), ENEMY_ABILITIES.ADD_CLUTTER, {
  baseValue: 3,
  incrementValue: 2,
  description: "Adds Clutter cards to your deck at combat start",
  prefix: "Messy"
}), ENEMY_ABILITIES.DOWNGRADE_CARDS, {
  baseValue: 3,
  incrementValue: 2,
  description: "Downgrades random cards in your combat deck at combat start",
  prefix: "Withering"
});

//#endregion data maps
//#region data arrays of game objects
var cardList = [{
  name: "Bunnymancy",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_POLY,
  inkCost: 1,
  bunnyAdd: 6
}, {
  name: "Bunnyplication",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_POLY,
  inkCost: 1,
  bunnyMult: 2
}, {
  name: "Fairy Gold",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_MONO,
  inkCost: 1,
  goldAdd: 8
}, {
  name: "Enchant Bookshelf",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.BASIC_MONO,
  inkCost: 1,
  permanentlyUpgradeRandomCardsInDeck: 1
}, {
  name: "Ponder",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.COMMON,
  inkCost: 1,
  cardDraw: 3,
  exileOnCast: true
}, {
  name: "Inkswell",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  inkCost: 1,
  inkAdd: 2,
  exileOnCast: true
}, {
  name: "Cloudfluff Conjuration",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  inkCost: 0,
  bunnyAdd: 8
}, {
  name: "Cloudfluff Boon",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.RARE,
  inkCost: 0,
  bunnyAdd: 4,
  exileOnCast: true
}, {
  name: "Midas Touch",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.RARE,
  inkCost: 1,
  goldAddPerCardInDeck: 1
},
// {
//   name: "Enchant Library",
//   cardType: CARD_TYPES.SPELL,
//   rarity: RARITIES.RARE,
//   inkCost: 2,
//   permanentlyUpgradeRandomCardsInDeck: 3,
// },
{
  name: "Dusk Lotus",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.MYTHIC,
  inkCost: 0,
  inkAdd: 3,
  exileOnCast: true
}, {
  name: "Weasel's Bargain",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  inkCost: 0,
  goldAdd: 8,
  exileOnCast: true
}, {
  name: "Carrot Festival",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  inkCost: 1,
  bunnyAddPerCardInDeck: 1
}, {
  name: "Mega Bunnyplication",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.COMMON,
  inkCost: 2,
  bunnyMult: 3.5
}, {
  name: "Enchant Fingertips",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  inkCost: 1,
  permanentlyUpgradeRandomCardsInHand: 1,
  exileOnCast: true
}, {
  name: "Healing Light",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.RARE,
  inkCost: 1,
  healPerCardInDeck: 1
},
// {
//   name: "Enchant Hands",
//   cardType: CARD_TYPES.INSTANT,
//   rarity: RARITIES.RARE,
//   inkCost: 2,
//   permanentlyUpgradeRandomCardsInHand: 7,
// },
{
  name: "Wisdom of the Warrens",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.MYTHIC,
  inkCost: 0,
  cardDraw: 1,
  exileOnCast: true
}, {
  name: "Magic Missile",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.COMMON,
  inkCost: 1,
  damage: 6,
  inkCostIncreasePerLevel: 1,
  damageMultiplierPerLevel: 2,
  damageTypes: [DAMAGE_TYPES.FIRE]
}, {
  name: "Fireball",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  inkCost: 3,
  damage: 30,
  inkCostIncreasePerLevel: 1,
  damageMultiplierPerLevel: 2,
  damageTypes: [DAMAGE_TYPES.FIRE]
}, {
  name: "Lightning Bolt 1d4",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.COMMON,
  inkCost: 1,
  upgradesOnCast: 1,
  exileOnCast: true,
  damageTypes: [DAMAGE_TYPES.LIGHTNING],
  damageRoll: {
    dice: 1,
    sides: 4,
    flatBonus: 0
  }
}, {
  name: "Thunderstrike 2d2",
  cardType: CARD_TYPES.INSTANT,
  rarity: RARITIES.UNCOMMON,
  inkCost: 2,
  upgradesOnCast: 2,
  exileOnCast: true,
  damageTypes: [DAMAGE_TYPES.LIGHTNING],
  damageRoll: {
    dice: 2,
    sides: 2,
    flatBonus: 0
  }
}, {
  name: "Vampire Bunnies",
  cardType: CARD_TYPES.SPELL,
  rarity: RARITIES.RARE,
  inkCost: 1,
  heal: 5,
  bunnyAdd: 5
}, {
  name: "Weaken",
  rarity: RARITIES.UNCOMMON,
  inkCost: 1,
  cardType: CARD_TYPES.SPELL,
  damageTypes: [DAMAGE_TYPES.POISON],
  weakenEnemyHpPercent: 0.15 // 15% max HP as bonus poison damage
},
// === Curses ===
{
  name: "Sisyphus' Pebble",
  cardType: CARD_TYPES.CURSE,
  unupgradable: true,
  unsocketable: true,
  uncastable: true,
  specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE
  // No effect; added to deck via events, not in loot pool
}, {
  name: "Clutter",
  cardType: CARD_TYPES.CURSE,
  unupgradable: true,
  unsocketable: true,
  uncastable: true,
  specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE
  // Added to combat deck by enemies; no effect
}, {
  name: "Mirage",
  cardType: CARD_TYPES.CURSE,
  unupgradable: true,
  unsocketable: true,
  inkCost: 0,
  exileOnCast: true,
  specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE
}, {
  name: "Mercury Droplet",
  cardType: CARD_TYPES.INSTANT,
  inkCost: 1,
  unupgradable: true,
  unsocketable: true,
  exileOnCast: true,
  specialSubtype: SPECIAL_CARD_SUBTYPES.CURSE
}];
var gemList = [{
  name: "Amethyst",
  rarity: RARITIES.COMMON,
  bunnyAdd: 3
}, {
  name: "Lapis Lazuli",
  rarity: RARITIES.COMMON,
  bunnyMult: 1.5
},
// {
//   name: "Sapphire",
//   rarity: RARITIES.UNCOMMON,
//   cardDrawOnDraw: 1,
// },
{
  name: "Topaz",
  rarity: RARITIES.COMMON,
  goldAdd: 7
}, {
  name: "Jet",
  rarity: RARITIES.RARE,
  permanentlyUpgradeRandomCardsInDeck: 1
}, {
  name: "Ruby",
  rarity: RARITIES.RARE,
  damage: 5,
  damageTypes: [DAMAGE_TYPES.FIRE],
  damageMultiplierPerLevel: 2
},
// {
//   name: "Amber",
//   rarity: RARITIES.MYTHIC,
//   damageRoll: {
//     dice: 1,
//     sides: 4,
//     flatBonus: 0,
//   },
//   upgradesOnCast: 1,
//   damageTypes: [DAMAGE_TYPES.LIGHTNING],
// },
{
  name: "Moonstone",
  rarity: RARITIES.UNCOMMON,
  heal: 10
}, {
  name: "Emerald",
  rarity: RARITIES.UNCOMMON,
  weakenEnemyHpPercent: 0.1,
  // Deals bonus damage equal to 10% of enemy max HP
  damageTypes: [DAMAGE_TYPES.POISON]
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
    bonusBaseBunnies: 3
  })
},
// {
//   name: "Fabergé Egg",
//   rarity: RARITIES.COMMON,
//   triggers: {
//     [TRIGGER_EVENTS.RELIC_PICKUP]: {
//       bonusGold: 100,
//     },
//   },
// },
{
  name: "Heartstone",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusHealth: 100
  })
}, {
  name: "Cowbell",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    BonusMulligans: 1
  })
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
  name: "Encyclopedia",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusBooks: 1
  })
}, {
  name: "Inkpot",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusInk: 2
  })
}, {
  name: "Cardsleeves",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    permanentlyUpgradeRandomCardsInDeck: 5
  })
},
// {
//   name: "Magic Quill",
//   rarity: RARITIES.LEGENDARY,
//   triggers: {
//     [TRIGGER_EVENTS.RELIC_PICKUP]: {
//       bonusInk: 2,
//     },
//   },
// },
{
  name: "Gold Bag",
  rarity: RARITIES.BASIC_POLY,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusGold: 25
  })
}, {
  name: "Whetstone",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.CARD_PICKUP, {
    upgradeCard: true
  })
}, {
  name: "Porcelain Koi",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.CARD_PICKUP, {
    bonusGold: 5,
    bonusHealth: 20
  })
}, {
  name: "Witch's Cauldron",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.POTION_PICKUP, {
    upgradePotion: true
  })
}, {
  name: "Glittering Vial",
  rarity: RARITIES.UNCOMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.DRINK_POTION, {
    healPlayer: 5
  })
},
// {
//   name: "Discount Voucher",
//   rarity: RARITIES.COMMON,
//   triggers: {
//     [TRIGGER_EVENTS.ASSIGN_SHOP_PRICES]: {
//       shopPriceMultiplier: 0.8, // 20% cheaper shop prices
//     },
//   },
// },
// {
//   name: "Sleeping Bag",
//   rarity: RARITIES.COMMON,
//   triggers: {
//     [TRIGGER_EVENTS.REST]: {
//       healPlayer: 50,
//     },
//   },
// },
// {
//   name: "Toothfairy's Charm",
//   rarity: RARITIES.COMMON,
//   triggers: {
//     [TRIGGER_EVENTS.REST]: {
//       goldAdd: 50,
//     },
//   },
// },
// {
//   name: "Planetarium Mobile",
//   rarity: RARITIES.UNCOMMON,
//   triggers: {
//     [TRIGGER_EVENTS.REST]: {
//       permanentlyUpgradeRandomCardsInDeck: 2, // upgrade random cards in the deck when resting
//     },
//   },
// },
{
  name: "Dousing Rod",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.POPULATE_PATHS, {
    revealAnonymousPaths: true
  })
}, {
  name: "Gem of Weakness",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.COMBAT_START, {
    weakenEnemyHpPercent: 0.1 // 10% reduction
  })
}, {
  name: "Phylactery",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.SHUFFLE_GRAVEYARD_INTO_DECK, {
    healPlayer: 5
  })
}, {
  name: "Crystal Ball",
  rarity: RARITIES.MYTHIC,
  triggers: _defineProperty({}, TRIGGER_EVENTS.DRAW_CARD, {
    bunnyAdd: 1
  })
}, {
  name: "Arcane Brush",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.PLAY_CARD, {
    bunnyAdd: 2
  })
}, {
  name: "Golden Carrot",
  rarity: RARITIES.LEGENDARY,
  bossOnly: true,
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusBooks: 1,
    bonusPages: 1,
    bonusInk: 1
  })
}, {
  name: "Voynich Manuscript",
  rarity: RARITIES.RARE,
  triggers: _defineProperty({}, TRIGGER_EVENTS.CAST_SPELLBOOK, {
    healPlayer: 5
  })
}, {
  name: "Corsair's Coin",
  rarity: RARITIES.COMMON,
  triggers: _defineProperty({}, TRIGGER_EVENTS.COMBAT_END, {
    goldAdd: 25
  })
}, {
  name: "Carrot Staff",
  rarity: RARITIES.MYTHIC,
  description: "increases all Bunny damage you deal.",
  triggers: _defineProperty({}, TRIGGER_EVENTS.DEAL_DAMAGE, {
    damageTypeTrigger: DAMAGE_TYPES.BUNNY,
    multiplyDamage: 1.5
  })
}, {
  name: "Lightning Rod",
  rarity: RARITIES.MYTHIC,
  description: "Whenever you cast a Lightning spell, draw 2 cards.",
  triggers: _defineProperty({}, TRIGGER_EVENTS.PLAY_CARD, {
    ifLightningDrawCards: 2
  })
},
// {
//   name: "Firemage's Hat",
//   rarity: RARITIES.MYTHIC,
//   description: "All Fire cards cost 1 less ink.",
//   triggers: {
//     [TRIGGER_EVENTS.RELIC_PICKUP]: {
//       reduceInkCostOfFireCardsInDeck: 1,
//     },
//     [TRIGGER_EVENTS.CARD_PICKUP]: {
//       reduceInkCostIfFire: 1,
//     },
//   },
// },
{
  name: "Thinking Cap",
  rarity: RARITIES.MYTHIC,
  description: "Your hand size is permanently increased by 3.",
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusHandSize: 3
  })
}, {
  name: "Silk Gloves",
  rarity: RARITIES.COMMON,
  description: "Your hand size is permanently increased by 1.",
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusHandSize: 1
  })
}, {
  name: "Ring of Athena",
  rarity: RARITIES.RARE,
  description: "Your hand size is permanently increased by 2.",
  triggers: _defineProperty({}, TRIGGER_EVENTS.RELIC_PICKUP, {
    bonusHandSize: 2
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
}, {
  name: "Squid Brew",
  rarity: RARITIES.UNCOMMON,
  bonusInk: 1,
  drinkableOutOfCombat: false
}, {
  name: "Hearty Soup",
  rarity: RARITIES.RARE,
  increaseMaxHp: 10
}, {
  name: "Coconut Juice",
  rarity: RARITIES.COMMON,
  increaseMaxHp: 2
}, {
  name: "Ponderous Potion",
  rarity: RARITIES.UNCOMMON,
  cardDraw: 2,
  drinkableOutOfCombat: false
}, {
  name: "Bunny Brew",
  rarity: RARITIES.COMMON,
  bunnyAdd: 5,
  drinkableOutOfCombat: false
}, {
  name: "Warren Elixir",
  rarity: RARITIES.RARE,
  bunnyMult: 2,
  drinkableOutOfCombat: false
}];
//#endregion
//#region utility functions
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function shuffleArray(originalArray) {
  var array = _toConsumableArray(originalArray); // copy to avoid mutation
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
  return array;
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
function changeScreen(dispatch, screen) {
  dispatch({
    type: ACTIONS.SCREEN_CHANGE,
    payload: screen
  });
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
    if (!item || !item.name) {
      console.warn("Invalid shop item during price assignment:", entry);
      return entry;
    }
    var basePrice = basePrices[type] || 0;
    var upgrades = item.upgrades || 0;
    var upgradeCost = ["card", "potion"].includes(type) ? upgrades * 5 : 0;
    var rarity = ((_item$rarity = item.rarity) === null || _item$rarity === void 0 || (_item$rarity$toLowerC = _item$rarity.toLowerCase) === null || _item$rarity$toLowerC === void 0 ? void 0 : _item$rarity$toLowerC.call(_item$rarity)) || "common";
    var rarityMultiplier = rarityMultipliers[rarity] || 1;
    var price = Math.round((basePrice + upgradeCost) * rarityMultiplier * globalMultiplier);
    return _objectSpread(_objectSpread({}, entry), {}, {
      item: _objectSpread(_objectSpread({}, item), {}, {
        price: price
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

  // 4. Shuffle the deck (pure)
  var shuffledDeck = shuffleArray(deck);

  // 5. Return new state with updated campaign.deck
  return _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      deck: shuffledDeck
    }),
    log: _toConsumableArray(state.log)
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
    enemyHealthMultiplier: (state.enemyHealthMultiplier || 1) + (modifiers.enemyHealthMultiplierModifier || 0)
  });
}
function advancePhaseTo(state, phaseAdvancedTo) {
  console.log(">>> Advancing to phase:", phaseAdvancedTo);
  if (!Object.values(PHASES).includes(phaseAdvancedTo)) {
    console.error("Invalid phase passed to advancePhaseTo:", phaseAdvancedTo);
    return state;
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    currentPhase: phaseAdvancedTo
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
    case PHASES.COMBAT:
      return initializeCombatPhase(state, state.currentPath);
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
    currentPath: chosenPath,
    // ✅ store the path here
    currentPhase: pathData.leadsTo,
    log: ["Chose path: ".concat(pathKey)].concat(_toConsumableArray(state.log)),
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      paths: []
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
    })
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
    })
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
    })
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
    })
  });
}
function populatePathOfferings(state) {
  var _state$campaign$deck, _state$campaign$deck2;
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

  // === Step 2: Create pool of all valid paths (excluding duplicate of picked fight) ===
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
  var bossLevels = [15, 30, 45];
  var isBossLevel = bossLevels.includes(level);
  var allCardsSocketed = ((_state$campaign$deck = state.campaign.deck) === null || _state$campaign$deck === void 0 ? void 0 : _state$campaign$deck.length) > 0 && state.campaign.deck.every(function (card) {
    return card.gem != null || card.unsocketable;
  });
  var allCardsUnupgradable = ((_state$campaign$deck2 = state.campaign.deck) === null || _state$campaign$deck2 === void 0 ? void 0 : _state$campaign$deck2.length) > 0 && state.campaign.deck.every(function (card) {
    return card.unupgradable;
  });
  var filteredPaths = allPaths.filter(function (pathObj) {
    if (pathObj.path === PATHS.BOSS_FIGHT && !isBossLevel) return false;
    if (pathObj.path === PATHS.GEM_OFFERING && allCardsSocketed) return false;
    if (pathObj.path === PATHS.ENCHANT && allCardsUnupgradable) return false;
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

  // === Step 6.5: Replace SHOP if player is broke
  if (state.gold < 100) {
    var shopIndex = finalPaths.findIndex(function (p) {
      return p.path === PATHS.SHOP;
    });
    if (shopIndex !== -1) {
      var replaceableOptions = [PATHS.REST, PATHS.PURGE, PATHS.TRANSMUTE, PATHS.CARD_OFFERING, PATHS.RELIC_OFFERING, PATHS.ENCHANT_OFFERING];
      var existingPaths = new Set(finalPaths.map(function (p) {
        return p.path;
      }));
      var replacements = replaceableOptions.filter(function (p) {
        return !existingPaths.has(p);
      });
      if (replacements.length > 0) {
        var replacement = replacements[Math.floor(Math.random() * replacements.length)];
        var replacementData = pathMap[replacement];
        if (replacementData) {
          finalPaths[shopIndex] = _objectSpread({
            path: replacement
          }, replacementData);
          console.log("\uD83D\uDCB0 Replaced SHOP with ".concat(replacement, " because player has < 100 gold."));
        } else {
          console.warn("\u26A0\uFE0F No data found in pathMap for replacement path: ".concat(replacement));
        }
      }
    }
  }

  // === Step 7: Randomly anonymize one path based on (50% - luck) chance
  var anonChance = Math.max(0, 0.5 - (state.luck || 0) * 0.01);
  var anonIndex = Math.floor(Math.random() * finalPaths.length);
  if (Math.random() < anonChance) {
    finalPaths[anonIndex] = anonymizeObject(finalPaths[anonIndex]);
  }

  // === Step 8: Apply relic triggers
  var triggerResult = checkRelicTriggers(state, TRIGGER_EVENTS.POPULATE_PATH, {
    payload: finalPaths
  });
  var updatedPaths = triggerResult.result || finalPaths;
  var updatedState = _objectSpread({}, triggerResult);

  // Final sanity check for undefineds
  var _iterator3 = _createForOfIteratorHelper(updatedPaths),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var path = _step3.value;
      if (!path || !path.path) {
        console.warn("⚠️ Invalid path in final offerings:", path);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  console.log("📍 Populating path offerings with:", updatedPaths);
  return _objectSpread(_objectSpread({}, updatedState), {}, {
    misery: newMisery,
    offerings: _objectSpread(_objectSpread({}, updatedState.offerings), {}, {
      paths: updatedPaths
    })
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

  // 🛠️ Unwrap
  var pickedCard = sourceArrayName === "shopfront" ? entry.item : sourceArrayName === "combatRewards" ? entry.value : entry;
  if (!pickedCard || !pickedCard.name) {
    console.warn("⚠️ Picked card is invalid:", pickedCard);
  }
  if (!pickedCard) {
    console.error("No card found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var _entry$item;
    var price = ((_entry$item = entry.item) === null || _entry$item === void 0 ? void 0 : _entry$item.price) !== undefined ? entry.item.price : 20;
    var charged = chargeGoldPrice(state, price, "card");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 3. Trigger relics BEFORE adding to deck ===
  var triggerResult = checkRelicTriggers(updatedState, TRIGGER_EVENTS.CARD_PICKUP, {
    payload: pickedCard
  });
  var upgradedCard = triggerResult.result || pickedCard;
  updatedState = _objectSpread(_objectSpread({}, triggerResult), {}, {
    result: undefined
  });

  // === 4. Add to campaign deck ===
  var updatedCampaign = _objectSpread(_objectSpread({}, updatedState.campaign), {}, {
    deck: [].concat(_toConsumableArray(updatedState.campaign.deck), [upgradedCard])
  });

  // === 5. Remove from offerings ===
  var updatedOfferings = _objectSpread(_objectSpread({}, updatedState.offerings), {}, _defineProperty({}, sourceArrayName, sourceArray.filter(function (_, i) {
    return i !== index;
  })));

  // === 6. Build new state ===
  var newState = _objectSpread(_objectSpread({}, updatedState), {}, {
    campaign: updatedCampaign,
    offerings: updatedOfferings,
    log: ["Picked card: ".concat(upgradedCard.name)].concat(_toConsumableArray(updatedState.log))
  });

  // === 7. Trash if from offering ===
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
  var pickedRelic = sourceArrayName === "shopfront" ? entry.item : sourceArrayName === "combatRewards" ? entry.value : entry;
  if (!pickedRelic) {
    console.error("No relic found at index:", index);
    return state;
  }

  // === 2. Charge gold if in shop ===
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var _entry$item$price, _entry$item2;
    var relicPrice = (_entry$item$price = (_entry$item2 = entry.item) === null || _entry$item2 === void 0 ? void 0 : _entry$item2.price) !== null && _entry$item$price !== void 0 ? _entry$item$price : 50;
    var chargedState = chargeGoldPrice(state, relicPrice, "relic");
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
  var _offerings$combatRewa;
  var phase = state.currentPhase;
  var offerings = _objectSpread({}, state.offerings);

  // === 1. Determine the source array ===
  var sourceArrayName = null;
  var sourceArray = null;
  if (offerings.potions && index < offerings.potions.length) {
    sourceArrayName = "potions";
    sourceArray = offerings.potions;
  } else if (offerings.shopfront && index < offerings.shopfront.length) {
    sourceArrayName = "shopfront";
    sourceArray = offerings.shopfront;
  } else if (phase === PHASES.COMBAT_END && offerings.combatRewards && ((_offerings$combatRewa = offerings.combatRewards[index]) === null || _offerings$combatRewa === void 0 ? void 0 : _offerings$combatRewa.type) === "potion") {
    sourceArrayName = "combatRewards";
    sourceArray = offerings.combatRewards;
  } else {
    console.error("Invalid potion index:", index);
    return state;
  }
  var entry = sourceArray[index];

  // === 2. Unwrap the potion if needed ===
  var pickedPotion;
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
  var updatedState = state;
  if (phase === PHASES.SHOP) {
    var _entry$item$price2, _entry$item3;
    var price = (_entry$item$price2 = (_entry$item3 = entry.item) === null || _entry$item3 === void 0 ? void 0 : _entry$item3.price) !== null && _entry$item$price2 !== void 0 ? _entry$item$price2 : 30;
    var charged = chargeGoldPrice(state, price, "potion");
    if (charged === state) return state; // not enough gold
    updatedState = charged;
  }

  // === 4. Apply pickup relic triggers (may upgrade the potion) ===
  var triggerResult = checkRelicTriggers(updatedState, TRIGGER_EVENTS.POTION_PICKUP, {
    payload: pickedPotion
  });
  var triggeredPotion = triggerResult.result;
  updatedState = _objectSpread({}, triggerResult); // includes possible log/relic changes

  // === 5. Add to potion belt ===
  var updatedPotionBelt = [].concat(_toConsumableArray(updatedState.potionBelt), [triggeredPotion]);

  // === 6. Remove picked potion from source
  offerings[sourceArrayName] = sourceArray.filter(function (_, i) {
    return i !== index;
  });

  // === 7. Trash unchosen potions if from potion offering
  var updatedTrashPile = updatedState.trashPile;
  if (phase === PHASES.POTION_OFFERING && sourceArrayName === "potions") {
    updatedTrashPile = [].concat(_toConsumableArray(updatedTrashPile || []), _toConsumableArray(offerings.potions.filter(function (_, i) {
      return i !== index;
    })));
    offerings.potions = [];
  }

  // === 8. Build new state
  var newState = _objectSpread(_objectSpread({}, updatedState), {}, {
    potionBelt: updatedPotionBelt,
    trashPile: updatedTrashPile,
    offerings: offerings,
    log: ["Picked potion: ".concat(pickedPotion.name)].concat(_toConsumableArray(updatedState.log))
  });

  // === 9. Advance phase if from potion offering
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
  console.log("🧪 Drinking potion:", potion);
  var updatedState = _objectSpread({}, state);

  // === 1. Apply effects ===
  if (potion.healthRestore) {
    updatedState = heal(updatedState, potion.healthRestore);
  }
  if (potion.bonusInk && state.currentPhase === PHASES.COMBAT) {
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
        ink: updatedState.combat.ink + potion.bonusInk
      }),
      log: ["Gained ".concat(potion.bonusInk, " bonus ink from ").concat(potion.name)].concat(_toConsumableArray(updatedState.log))
    });
  }
  if (potion.increaseMaxHp) {
    var amount = potion.increaseMaxHp;
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      maxHealth: updatedState.maxHealth + amount,
      health: updatedState.health + amount,
      log: ["Max and current HP increased by ".concat(amount, " from ").concat(potion.name)].concat(_toConsumableArray(updatedState.log))
    });
  }

  // === Upgrade cards in hand (if applicable) ===
  if (potion.upgradeCardsInHand && state.currentPhase === PHASES.COMBAT && updatedState.combat.hand) {
    var hand = _toConsumableArray(updatedState.combat.hand);
    var upgradable = hand.filter(function (card) {
      return !card.unupgradable && typeof card.upgrades === "number";
    });
    var numToUpgrade = Math.min(potion.upgradeCardsInHand, upgradable.length);
    var shuffled = _toConsumableArray(upgradable).sort(function () {
      return Math.random() - 0.5;
    });
    var toUpgrade = shuffled.slice(0, numToUpgrade);
    var _newHand = hand.map(function (card) {
      if (toUpgrade.includes(card)) {
        return _objectSpread(_objectSpread({}, card), {}, {
          upgrades: card.upgrades + 1
        });
      }
      return card;
    });
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
        hand: _newHand
      }),
      log: ["Upgraded ".concat(toUpgrade.length, " card(s) in hand with ").concat(potion.name)].concat(_toConsumableArray(updatedState.log))
    });
  }

  // === Always apply draw, bunnyAdd, bunnyMult if present ===
  if (potion.cardDraw && state.currentPhase === PHASES.COMBAT) {
    for (var i = 0; i < potion.cardDraw; i++) {
      updatedState = drawCard(updatedState);
    }
  }
  if (potion.bunnyAdd) {
    updatedState = addBunnies(updatedState, potion.bunnyAdd);
  }
  if (potion.bunnyMult) {
    updatedState = multiplyBunnies(updatedState, potion.bunnyMult);
  }

  // === 2. Remove potion from belt and add to trash ===
  var belt = updatedState.potionBelt || [];
  var index = belt.findIndex(function (p) {
    return p.name === potion.name;
  });
  var newPotionBelt = index >= 0 ? [].concat(_toConsumableArray(belt.slice(0, index)), _toConsumableArray(belt.slice(index + 1))) : belt;
  var newTrash = [].concat(_toConsumableArray(updatedState.trashPile), [potion]);
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    potionBelt: newPotionBelt,
    trashPile: newTrash
  });

  // === 3. Trigger relic effects
  var triggered = checkRelicTriggers(updatedState, TRIGGER_EVENTS.DRINK_POTION, {
    potion: potion
  });
  return _objectSpread(_objectSpread({}, triggered), {}, {
    log: triggered.log || updatedState.log
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

  // === If the chosen gem came from combat rewards, remove it ===
  if (mod.gem && state.currentPhase === PHASES.COMBAT_END && Array.isArray(state.offerings.combatRewards)) {
    var updatedRewards = state.offerings.combatRewards.filter(function (reward) {
      return reward.type !== "gem" || reward.value.name !== mod.gem.name;
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
        combatRewards: updatedRewards
      }),
      log: ["Picked gem: ".concat(mod.gem.name)].concat(_toConsumableArray(state.log))
    });
  }

  // === Charge gold if in shop ===
  if (state.currentPhase === PHASES.SHOP) {
    var _mod$gem$price, _mod$gem;
    var price = (_mod$gem$price = mod === null || mod === void 0 || (_mod$gem = mod.gem) === null || _mod$gem === void 0 ? void 0 : _mod$gem.price) !== null && _mod$gem$price !== void 0 ? _mod$gem$price : 50;
    var charged = chargeGoldPrice(state, price, "card modification");
    if (charged === state) return state; // insufficient gold
    state = charged;
  }

  // Remove purchased gem from shopfront
  if (mod.gem && Array.isArray(state.offerings.shopfront)) {
    var updatedShopfront = state.offerings.shopfront.filter(function (entry) {
      return !(entry.type === "gem" && entry.item.name === mod.gem.name);
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
        shopfront: updatedShopfront
      }),
      log: ["Purchased gem: ".concat(mod.gem.name)].concat(_toConsumableArray(state.log))
    });
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
  // === Step 1: Populate exactly 3 of each item type ===
  var typeCounts = {
    card: 3,
    potion: 3,
    gem: 3,
    relic: 3
  };
  for (var _i4 = 0, _Object$entries = Object.entries(typeCounts); _i4 < _Object$entries.length; _i4++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2),
      type = _Object$entries$_i[0],
      count = _Object$entries$_i[1];
    for (var i = 0; i < count; i++) {
      shopfrontTypes.push(type);
    }
  }

  // === Step 3: Generate actual items, avoiding duplicates ===
  var generatedItems = [];
  var usedKeys = new Set();
  for (var _i5 = 0, _shopfrontTypes = shopfrontTypes; _i5 < _shopfrontTypes.length; _i5++) {
    var _type = _shopfrontTypes[_i5];
    var item = null;
    var attempt = 0;
    while (attempt < 20) {
      attempt++;
      try {
        switch (_type) {
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
        var key = "".concat(_type, "-").concat(item.name);
        if (usedKeys.has(key)) continue;
        usedKeys.add(key);
        generatedItems.push({
          type: _type,
          item: item
        });
        break; // done
      } catch (e) {
        console.warn("Shop item generation failed:", _type, e);
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
    log: _toConsumableArray(updatedState.log)
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

  //Step 5: Populate offerings for the new phase
  newState = handlePhaseTransitions(newState);
  return newState;
}
function toggleDeckInspect(state, dispatch) {
  var isInspectingDeck = state.currentScreen === SCREENS.DECK;
  var returnTo = state.previousScreen || SCREENS.MAIN;
  dispatch({
    type: ACTIONS.SCREEN_CHANGE,
    payload: isInspectingDeck ? returnTo : SCREENS.DECK
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
    stage: 0,
    misery: 0,
    hoardsLooted: 0,
    defeatedEnemies: [],
    trashPile: [],
    relicBelt: [],
    potionBelt: [],
    campaign: {
      mulligans: 0,
      deck: [],
      ink: 4,
      books: 1,
      pages: 4,
      handSize: 6
    },
    combat: {
      mulligans: 0,
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
      return c.rarity === rarity && !["curse", "unique", "status"].includes(c.specialSubtype);
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
function getRandomBossRelic() {
  var bossRelics = relicList.filter(function (r) {
    return r.bossOnly;
  });
  if (bossRelics.length === 0) return null;
  var chosen = bossRelics[Math.floor(Math.random() * bossRelics.length)];
  return _objectSpread({}, chosen);
}
function generateRandomRelic(state) {
  var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref8$rarity = _ref8.rarity,
    rarity = _ref8$rarity === void 0 ? null : _ref8$rarity;
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
    if (r.bossOnly) return false; // ← new line to exclude boss-only relics from general pool
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
  var _state$level2, _state$defeatedEnemie2;
  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref9$rarity = _ref9.rarity,
    rarity = _ref9$rarity === void 0 ? null : _ref9$rarity,
    _ref9$upgrades = _ref9.upgrades,
    upgrades = _ref9$upgrades === void 0 ? undefined : _ref9$upgrades,
    _ref9$gem = _ref9.gem,
    gem = _ref9$gem === void 0 ? null : _ref9$gem;
  var luck = state.luck || 0;
  var finalRarity = rarity || weightedRandomChoice(getLuckAdjustedRarityWeights(luck));
  var level = (_state$level2 = state.level) !== null && _state$level2 !== void 0 ? _state$level2 : 0;
  var totalFortune = (luck !== null && luck !== void 0 ? luck : 0) + level;
  var upgradeWeights = {
    0: Math.max(0, 60 - totalFortune),
    1: 5 + totalFortune,
    2: 3 + totalFortune,
    3: 2 + totalFortune,
    4: 0 + totalFortune
  };
  var finalUpgrades = upgrades !== undefined ? upgrades : Number(weightedRandomChoice(upgradeWeights));
  var defeatedCount = ((_state$defeatedEnemie2 = state.defeatedEnemies) === null || _state$defeatedEnemie2 === void 0 ? void 0 : _state$defeatedEnemie2.length) || 0;
  var maxUpgrades = Math.min(4, Math.floor(defeatedCount / 3));
  var cappedUpgrades = Math.min(finalUpgrades, maxUpgrades);
  return createCardInstance(undefined, finalRarity, cappedUpgrades, gem);
}
function generateRandomPotion(state) {
  var _state$level3;
  var _ref0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref0$rarity = _ref0.rarity,
    rarity = _ref0$rarity === void 0 ? null : _ref0$rarity,
    _ref0$upgrades = _ref0.upgrades,
    upgrades = _ref0$upgrades === void 0 ? null : _ref0$upgrades;
  var luck = state.luck || 0;
  var rarityWeights = getLuckAdjustedRarityWeights(luck);
  var level = (_state$level3 = state.level) !== null && _state$level3 !== void 0 ? _state$level3 : 0;
  var totalFortune = (luck !== null && luck !== void 0 ? luck : 0) + level;
  var upgradeWeights = {
    0: Math.max(0, 70 - totalFortune),
    1: 5 + totalFortune,
    2: 3 + totalFortune,
    3: 2 + totalFortune,
    4: 0 + totalFortune
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
  var _ref1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref1$rarity = _ref1.rarity,
    rarity = _ref1$rarity === void 0 ? null : _ref1$rarity;
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
  if (card.unupgradable) {
    console.warn("Card ".concat(card.name, " is marked unupgradable."));
    return card;
  }
  var upgradedCard = _objectSpread({}, card);
  var upgradable = false;
  if ("bunnyAdd" in upgradedCard) {
    upgradedCard.bunnyAdd += 3 * level;
    upgradable = true;
  }
  if ("bunnyAddPerCardInDeck" in upgradedCard) {
    upgradedCard.bunnyAddPerCardInDeck += 0.5 * level;
    upgradable = true;
  }
  if ("goldAddPerCardInDeck" in upgradedCard) {
    upgradedCard.goldAddPerCardInDeck += 0.5 * level;
    upgradable = true;
  }
  if ("healPerCardInDeck" in upgradedCard) {
    upgradedCard.healPerCardInDeck += 0.5 * level;
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
  if ("heal" in upgradedCard) {
    upgradedCard.heal += 5 * level;
    upgradable = true;
  }

  // ✅ New: Weaken effect scaling
  if ("weakenEnemyHpPercent" in upgradedCard) {
    upgradedCard.weakenEnemyHpPercent += 0.05 * level;
    upgradable = true;
  }

  // === Upgrade damageRoll (any type) ===
  if (upgradedCard.damageRoll) {
    upgradedCard.damageRoll = _objectSpread(_objectSpread({}, upgradedCard.damageRoll), {}, {
      dice: upgradedCard.damageRoll.dice + level,
      sides: upgradedCard.damageRoll.sides + level,
      flatBonus: upgradedCard.damageRoll.flatBonus + level
    });
    upgradable = true;
  }

  // === Increase inkCost by per-level amount ===
  if ("inkCostIncreasePerLevel" in upgradedCard && typeof upgradedCard.inkCost === "number") {
    upgradedCard.inkCost += upgradedCard.inkCostIncreasePerLevel * level;
    upgradable = true;
  }

  // === Multiply base damage by per-level multiplier ===
  if ("damageMultiplierPerLevel" in upgradedCard && typeof upgradedCard.damage === "number") {
    upgradedCard.damage *= Math.pow(upgradedCard.damageMultiplierPerLevel, level);
    upgradable = true;
  }

  // Add or increment the upgrade level
  upgradedCard.upgrades = (upgradedCard.upgrades || 0) + level;

  // === Smart renaming ===
  var baseName = card.name.replace(/\s\+\d+$/, "") // remove trailing "+3"
  .replace(/\s\d+d\d+(\s?\+\d+)?$/, ""); // remove "3d6" or "3d6 +3"

  if (upgradedCard.damageRoll) {
    var _upgradedCard$damageR = upgradedCard.damageRoll,
      _upgradedCard$damageR2 = _upgradedCard$damageR.dice,
      dice = _upgradedCard$damageR2 === void 0 ? 1 : _upgradedCard$damageR2,
      sides = _upgradedCard$damageR.sides,
      _upgradedCard$damageR3 = _upgradedCard$damageR.flatBonus,
      flatBonus = _upgradedCard$damageR3 === void 0 ? 0 : _upgradedCard$damageR3;
    upgradedCard.name = "".concat(baseName, " ").concat(dice, "d").concat(sides).concat(flatBonus > 0 ? "+".concat(flatBonus) : "");
  } else {
    upgradedCard.name = "".concat(baseName, " +").concat(upgradedCard.upgrades);
  }
  return upgradedCard;
}
function downgradeCard(card) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (!card || _typeof(card) !== "object") {
    console.error("Invalid card passed to downgradeCard:", card);
    return card;
  }
  if (card.undowngradable) {
    console.warn("Card ".concat(card.name, " is marked undowngradable."));
    return card;
  }
  var downgradedCard = _objectSpread({}, card);
  var originalLevel = downgradedCard.upgrades || 0;
  var newLevel = Math.max(originalLevel - level, -1);
  var levelDiff = originalLevel - newLevel;
  var applyHalvedBase = function applyHalvedBase() {
    if ("bunnyAdd" in card) downgradedCard.bunnyAdd = Math.floor(card.bunnyAdd / 2);
    if ("bunnyAddPerCardInDeck" in card) downgradedCard.bunnyAddPerCardInDeck = 0.5;
    if ("bunnyMult" in card) downgradedCard.bunnyMult = Math.floor(card.bunnyMult / 2);
    if ("goldAdd" in card) downgradedCard.goldAdd = Math.floor(card.goldAdd / 2);
    if ("goldAddPerCardInDeck" in card) downgradedCard.goldAddPerCardInDeck = 0.5;
    if ("permanentlyUpgradeRandomCardsInDeck" in card) downgradedCard.permanentlyUpgradeRandomCardsInDeck = Math.floor(card.permanentlyUpgradeRandomCardsInDeck / 2);
    if ("permanentlyUpgradeRandomCardsInHand" in card) downgradedCard.permanentlyUpgradeRandomCardsInHand = Math.floor(card.permanentlyUpgradeRandomCardsInHand / 2);
    if ("cardDraw" in card) downgradedCard.cardDraw = Math.floor(card.cardDraw / 2);
    if ("inkAdd" in card) downgradedCard.inkAdd = Math.floor(card.inkAdd / 2);
    if ("healthCost" in card) downgradedCard.healthCost = Math.floor(card.healthCost * 1.5);
    if ("heal" in card) downgradedCard.heal = Math.max(1, Math.floor(card.heal / 2));
    if ("healPerCardInDeck" in card) downgradedCard.healPerCardInDeck = 0.5;
    if ("weakenEnemyHpPercent" in card) downgradedCard.weakenEnemyHpPercent = 0.1;
    if (typeof card.damage === "number") downgradedCard.damage = Math.ceil(card.damage / 2);
    if (card.damageRoll) {
      downgradedCard.damageRoll = {
        dice: Math.max(1, Math.floor(card.damageRoll.dice / 2)),
        sides: Math.max(1, Math.floor(card.damageRoll.sides / 2)),
        flatBonus: Math.max(0, Math.floor(card.damageRoll.flatBonus / 2))
      };
    }
  };
  if (newLevel === -1) {
    applyHalvedBase();
  } else {
    if ("bunnyAdd" in downgradedCard) downgradedCard.bunnyAdd -= 3 * levelDiff;
    if ("bunnyAddPerCardInDeck" in downgradedCard) {
      downgradedCard.bunnyAddPerCardInDeck = Math.max(0.5, downgradedCard.bunnyAddPerCardInDeck - 0.5 * levelDiff);
    }
    if ("bunnyMult" in downgradedCard) downgradedCard.bunnyMult -= 0.5 * levelDiff;
    if ("goldAdd" in downgradedCard) downgradedCard.goldAdd -= 2 * levelDiff;
    if ("goldAddPerCardInDeck" in downgradedCard) {
      downgradedCard.goldAddPerCardInDeck = Math.max(0.5, downgradedCard.goldAddPerCardInDeck - 0.5 * levelDiff);
    }
    if ("permanentlyUpgradeRandomCardsInDeck" in downgradedCard) downgradedCard.permanentlyUpgradeRandomCardsInDeck -= levelDiff;
    if ("permanentlyUpgradeRandomCardsInHand" in downgradedCard) downgradedCard.permanentlyUpgradeRandomCardsInHand -= levelDiff;
    if ("cardDraw" in downgradedCard) downgradedCard.cardDraw -= levelDiff;
    if ("inkAdd" in downgradedCard) downgradedCard.inkAdd -= levelDiff;
    if ("healthCost" in downgradedCard) downgradedCard.healthCost += levelDiff;
    if ("heal" in downgradedCard) downgradedCard.heal = Math.max(1, downgradedCard.heal - 5 * levelDiff);
    if ("healPerCardInDeck" in downgradedCard) {
      downgradedCard.healPerCardInDeck = Math.max(0.5, downgradedCard.healPerCardInDeck - 0.5 * levelDiff);
    }
    if ("weakenEnemyHpPercent" in downgradedCard) {
      downgradedCard.weakenEnemyHpPercent = Math.max(0.1, downgradedCard.weakenEnemyHpPercent - 0.05 * levelDiff);
    }
    if ("inkCostIncreasePerLevel" in downgradedCard && typeof downgradedCard.inkCost === "number") {
      downgradedCard.inkCost -= downgradedCard.inkCostIncreasePerLevel * levelDiff;
    }
    if ("damageMultiplierPerLevel" in downgradedCard && typeof downgradedCard.damage === "number") {
      downgradedCard.damage = Math.ceil(downgradedCard.damage / Math.pow(downgradedCard.damageMultiplierPerLevel, levelDiff));
    }
    if (downgradedCard.damageRoll) {
      downgradedCard.damageRoll = _objectSpread(_objectSpread({}, downgradedCard.damageRoll), {}, {
        dice: Math.max(1, downgradedCard.damageRoll.dice - levelDiff),
        sides: Math.max(1, downgradedCard.damageRoll.sides - levelDiff),
        flatBonus: Math.max(0, downgradedCard.damageRoll.flatBonus - levelDiff)
      });
    }
  }
  downgradedCard.upgrades = newLevel;
  var baseName = card.name.replace(/\s\+\d+$/, "").replace(/\s\d+d\d+(\s?\+\d+)?$/, "");
  if (downgradedCard.damageRoll) {
    var _downgradedCard$damag = downgradedCard.damageRoll,
      _downgradedCard$damag2 = _downgradedCard$damag.dice,
      dice = _downgradedCard$damag2 === void 0 ? 1 : _downgradedCard$damag2,
      sides = _downgradedCard$damag.sides,
      _downgradedCard$damag3 = _downgradedCard$damag.flatBonus,
      flatBonus = _downgradedCard$damag3 === void 0 ? 0 : _downgradedCard$damag3;
    downgradedCard.name = "".concat(baseName, " ").concat(dice, "d").concat(sides).concat(flatBonus > 0 ? "+".concat(flatBonus) : "");
  } else if (newLevel > 0) {
    downgradedCard.name = "".concat(baseName, " +").concat(newLevel);
  } else if (newLevel === -1) {
    downgradedCard.name = "".concat(baseName, " -1");
  } else {
    downgradedCard.name = baseName;
  }
  return downgradedCard;
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
  if (card.unsocketable) {
    console.warn("Card ".concat(card.name, " is marked unsocketable."));
    return card;
  }
  if (!gem || _typeof(gem) !== "object" || !gem.name) {
    console.error("Invalid gem passed to socketCardWithGem:", gem);
    return card;
  }
  var socketedCard = _objectSpread({}, card);
  var upgradeLevel = socketedCard.upgrades || 0;
  var applyEffect = function applyEffect(key, baseAmount, perUpgrade) {
    socketedCard[key] = (socketedCard[key] || 0) + baseAmount + perUpgrade * upgradeLevel;
  };

  // === Standard effects ===

  if ("bunnyAdd" in gem) applyEffect("bunnyAdd", gem.bunnyAdd, 3);
  if ("bunnyMult" in gem) applyEffect("bunnyMult", gem.bunnyMult, 0.5);
  if ("goldAdd" in gem) applyEffect("goldAdd", gem.goldAdd, 2);
  if ("permanentlyUpgradeRandomCardsInDeck" in gem) applyEffect("permanentlyUpgradeRandomCardsInDeck", gem.permanentlyUpgradeRandomCardsInDeck, 1);
  if ("permanentlyUpgradeRandomCardsInHand" in gem) applyEffect("permanentlyUpgradeRandomCardsInHand", gem.permanentlyUpgradeRandomCardsInHand, 1);
  if ("damage" in gem) applyEffect("damage", gem.damage, 5);
  if ("damageType" in gem) socketedCard.damageType = gem.damageType;
  if ("cardDraw" in gem) applyEffect("cardDraw", gem.cardDraw, 1);
  if ("inkAdd" in gem) applyEffect("inkAdd", gem.inkAdd, 1);
  if ("healthCost" in gem) applyEffect("healthCost", gem.healthCost, -1);
  if ("heal" in gem) applyEffect("heal", gem.heal, 5);
  if ("weakenEnemyHpPercent" in gem) {
    socketedCard.weakenEnemyHpPercent = (socketedCard.weakenEnemyHpPercent || 0) + gem.weakenEnemyHpPercent;
  }

  // === Add upgradesOnCast property ===
  if ("upgradesOnCast" in gem) {
    socketedCard.upgradesOnCast = (socketedCard.upgradesOnCast || 0) + gem.upgradesOnCast;
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
      socketedCard.damage *= Math.pow(gem.damageMultiplierPerLevel, upgradeLevel);
    }
  }

  // === Merge damageTypes (if gem has them) ===
  if (Array.isArray(gem.damageTypes)) {
    socketedCard.damageTypes = Array.isArray(socketedCard.damageTypes) ? _toConsumableArray(socketedCard.damageTypes) : [];
    var _iterator4 = _createForOfIteratorHelper(gem.damageTypes),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var dmgType = _step4.value;
        if (!socketedCard.damageTypes.includes(dmgType)) {
          socketedCard.damageTypes.push(dmgType);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  // === Add damageRoll support (e.g., Amber) ===

  if ("damageRoll" in gem && _typeof(gem.damageRoll) === "object") {
    var _socketedCard$damageR, _socketedCard$damageR2, _socketedCard$damageR3;
    var gemRoll = gem.damageRoll;
    var baseDice = gemRoll.dice || 0;
    var baseSides = gemRoll.sides || 0;
    var baseBonus = gemRoll.flatBonus || 0;
    socketedCard.damageRoll = {
      dice: (((_socketedCard$damageR = socketedCard.damageRoll) === null || _socketedCard$damageR === void 0 ? void 0 : _socketedCard$damageR.dice) || 0) + baseDice + upgradeLevel,
      sides: (((_socketedCard$damageR2 = socketedCard.damageRoll) === null || _socketedCard$damageR2 === void 0 ? void 0 : _socketedCard$damageR2.sides) || 0) + baseSides + upgradeLevel,
      flatBonus: (((_socketedCard$damageR3 = socketedCard.damageRoll) === null || _socketedCard$damageR3 === void 0 ? void 0 : _socketedCard$damageR3.flatBonus) || 0) + baseBonus + upgradeLevel
    };
  }

  // === Attach gem and rename card ===

  socketedCard.gem = gem;

  // Build name suffix if there's a damageRoll
  var nameSuffix = "";
  if (socketedCard.damageRoll && typeof socketedCard.damageRoll.dice === "number" && typeof socketedCard.damageRoll.sides === "number") {
    var _socketedCard$damageR4 = socketedCard.damageRoll,
      dice = _socketedCard$damageR4.dice,
      sides = _socketedCard$damageR4.sides,
      flatBonus = _socketedCard$damageR4.flatBonus;
    nameSuffix = " ".concat(dice, "d").concat(sides).concat(flatBonus ? "+".concat(flatBonus) : "");
  }

  // Final name: GemName OriginalName + dice suffix if present
  socketedCard.name = "".concat(gem.name, " ").concat(card.name.replace(/\s\d+d\d+(\+\d+)?$/, "")).concat(nameSuffix);
  return socketedCard;
}
function getLuckAdjustedRarityWeights() {
  var luck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, RARITIES.COMMON, Math.max(20, 60 - luck * 2)), RARITIES.UNCOMMON, Math.max(20, 40 - luck)), RARITIES.RARE, Math.min(20, 5 + luck)), RARITIES.MYTHIC, Math.min(10, 2 + Math.ceil(luck / 2))), RARITIES.LEGENDARY, Math.min(5, 1 + Math.ceil(luck / 3)));
}
function chargeGoldPrice(state, price) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "purchase";
  if (state.gold < price) {
    console.warn("Not enough gold for ".concat(context, "!"));
    return state; // return unmodified state
  }
  return _objectSpread(_objectSpread({}, state), {}, {
    gold: state.gold - price,
    // ✅ correct location
    log: ["Spent ".concat(price, " gold on ").concat(context, ".")].concat(_toConsumableArray(state.log))
  });
}
function checkRelicTriggers(state, triggerEvent) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    damageType: null
  };
  var updatedState = _objectSpread({}, state);
  var result = context.payload || null;

  // === Special case: Relic is being picked up ===
  if (triggerEvent === TRIGGER_EVENTS.RELIC_PICKUP && context.relic) {
    var _relic$triggers, _updatedState$offerin;
    var relic = context.relic;
    var effect = (_relic$triggers = relic.triggers) === null || _relic$triggers === void 0 ? void 0 : _relic$triggers[triggerEvent];
    if (!effect) return _objectSpread(_objectSpread({}, updatedState), {}, {
      result: result
    });
    var campaign = _objectSpread({}, updatedState.campaign);
    var newHealth = updatedState.health;
    var newMaxHealth = updatedState.maxHealth;
    if (effect.reduceInkCostOfFireCardsInDeck > 0) {
      var modifiedCount = 0;
      campaign.deck = campaign.deck.map(function (card) {
        if (Array.isArray(card.damageTypes) && card.damageTypes.includes(DAMAGE_TYPES.FIRE) && typeof card.inkCost === "number") {
          modifiedCount++;
          return _objectSpread(_objectSpread({}, card), {}, {
            inkCost: Math.max(0, card.inkCost - effect.reduceInkCostOfFireCardsInDeck)
          });
        }
        return card;
      });
      if (modifiedCount > 0) {
        updatedState.log.unshift("".concat(relic.name, " reduced the ink cost of ").concat(modifiedCount, " fire card(s) in your deck."));
      }
    }
    if (effect.bonusPages) {
      campaign.pages += effect.bonusPages;
      updatedState.log.unshift("".concat(relic.name, " gave you +").concat(effect.bonusPages, " max pages."));
    }
    if (effect.BonusMulligans) {
      var _campaign$mulligans;
      campaign.mulligans = ((_campaign$mulligans = campaign.mulligans) !== null && _campaign$mulligans !== void 0 ? _campaign$mulligans : 0) + effect.BonusMulligans;
      updatedState.log.unshift("".concat(relic.name, " gave you +").concat(effect.BonusMulligans, " mulligan."));
    }
    if (effect.bonusInk) {
      campaign.ink += effect.bonusInk;
      updatedState.log.unshift("".concat(relic.name, " gave you +").concat(effect.bonusInk, " max ink."));
    }
    if (effect.bonusBooks) {
      campaign.books += effect.bonusBooks;
      updatedState.log.unshift("".concat(relic.name, " gave you +").concat(effect.bonusBooks, " max books."));
    }
    if (effect.bonusHandSize) {
      campaign.handSize += effect.bonusHandSize;
      updatedState.log.unshift("".concat(relic.name, " increased your hand size by ").concat(effect.bonusHandSize, "."));
    }
    if (effect.bonusHealth) {
      newHealth += effect.bonusHealth;
      newMaxHealth += effect.bonusHealth;
      updatedState.log.unshift("".concat(relic.name, " increased your max health by ").concat(effect.bonusHealth, " HP."));
    }
    if (effect.bonusGold) {
      updatedState = gainGold(updatedState, effect.bonusGold);
      updatedState.log.unshift("".concat(relic.name, " gave you ").concat(effect.bonusGold, " gold."));
    }
    if (effect.bonusBaseBunnies) {
      updatedState = increaseBaseBunnies(updatedState, effect.bonusBaseBunnies);
      updatedState.log.unshift("".concat(relic.name, " added ").concat(effect.bonusBaseBunnies, " base bunnies."));
    }
    if (effect.permanentlyUpgradeRandomCardsInDeck > 0) {
      var deck = campaign.deck;
      var numToUpgrade = Math.min(effect.permanentlyUpgradeRandomCardsInDeck, deck.length);
      campaign.deck = permanentlyUpgradeRandomCardsInDeck(deck, numToUpgrade);
      updatedState.log.unshift("".concat(relic.name, " permanently upgraded ").concat(numToUpgrade, " card(s) in your deck."));
    }
    if (effect.shopPriceMultiplier && state.currentPhase === PHASES.SHOP && (_updatedState$offerin = updatedState.offerings) !== null && _updatedState$offerin !== void 0 && _updatedState$offerin.shopfront) {
      var newMultiplier = getShopPriceMultiplier(updatedState);
      var updatedShopfront = updatedState.offerings.shopfront.map(function (entry) {
        var _item$rarity2, _item$rarity2$toLower;
        var type = entry.type,
          item = entry.item;
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
        var basePrice = basePrices[type] || 0;
        var upgrades = item.upgrades || 0;
        var upgradeCost = ["card", "potion"].includes(type) ? upgrades * 5 : 0;
        var rarity = ((_item$rarity2 = item.rarity) === null || _item$rarity2 === void 0 || (_item$rarity2$toLower = _item$rarity2.toLowerCase) === null || _item$rarity2$toLower === void 0 ? void 0 : _item$rarity2$toLower.call(_item$rarity2)) || "common";
        var rarityMultiplier = rarityMultipliers[rarity] || 1;
        var price = Math.round((basePrice + upgradeCost) * rarityMultiplier * newMultiplier);
        return _objectSpread(_objectSpread({}, entry), {}, {
          item: _objectSpread(_objectSpread({}, item), {}, {
            price: price
          })
        });
      });
      updatedState.offerings.shopfront = updatedShopfront;
      updatedState.log.unshift("".concat(relic.name, " triggered and updated shop prices."));
    }
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      campaign: campaign,
      health: newHealth,
      maxHealth: newMaxHealth
    });
    return _objectSpread(_objectSpread({}, updatedState), {}, {
      result: result
    });
  }

  // === General case: loop through all relics and handle triggers ===
  var _iterator5 = _createForOfIteratorHelper(updatedState.relicBelt),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _relic$triggers2;
      var _relic = _step5.value;
      if (!_relic.triggers || _typeof(_relic.triggers) !== "object") continue;
      var allTriggerKeys = Object.keys(_relic.triggers);
      var _effect = (_relic$triggers2 = _relic.triggers) === null || _relic$triggers2 === void 0 ? void 0 : _relic$triggers2[triggerEvent];
      if (!_effect) continue;

      // === Handle Lightning spell draw trigger
      if (triggerEvent === TRIGGER_EVENTS.PLAY_CARD && _effect.ifLightningDrawCards > 0) {
        var card = context.card || context.payload;
        var isLightning = Array.isArray(card === null || card === void 0 ? void 0 : card.damageTypes) && card.damageTypes.includes(DAMAGE_TYPES.LIGHTNING);
        if (isLightning) {
          updatedState.log.unshift("".concat(_relic.name, " triggered and drew ").concat(_effect.ifLightningDrawCards, " card").concat(_effect.ifLightningDrawCards > 1 ? "s" : "", " because you played a Lightning card!"));
          for (var i = 0; i < _effect.ifLightningDrawCards; i++) {
            updatedState = drawCard(updatedState);
          }
        }
      }

      // === Other trigger types
      if (triggerEvent === TRIGGER_EVENTS.COMBAT_START && _effect.weakenEnemyHpPercent > 0) {
        updatedState = weakenEnemyByPercent(updatedState, _effect.weakenEnemyHpPercent);
        updatedState.log.unshift("".concat(_relic.name, " weakened the enemy by ").concat(_effect.weakenEnemyHpPercent * 100, "%!"));
      }
      if (_effect.bunnyAdd) {
        updatedState.combat = _objectSpread(_objectSpread({}, updatedState.combat), {}, {
          bunnies: (updatedState.combat.bunnies || 0) + _effect.bunnyAdd
        });
        updatedState.log.unshift("".concat(_relic.name, " summoned ").concat(_effect.bunnyAdd, " bunny").concat(_effect.bunnyAdd === 1 ? "" : "ies", "!"));
      }
      if (_effect.permanentlyUpgradeRandomCardsInDeck > 0) {
        var _campaign = _objectSpread({}, updatedState.campaign);
        var _deck = _campaign.deck;
        var _numToUpgrade = Math.min(_effect.permanentlyUpgradeRandomCardsInDeck, _deck.length);
        _campaign.deck = permanentlyUpgradeRandomCardsInDeck(_deck, _numToUpgrade);
        updatedState.campaign = _campaign;
        updatedState.log.unshift("".concat(_relic.name, " permanently upgraded ").concat(_numToUpgrade, " card(s) in your deck."));
      }

      // === Support for Whetstone ===
      if (triggerEvent === TRIGGER_EVENTS.CARD_PICKUP && _effect.upgradeCard) {
        var cardToUpgrade = context.card || context.payload;
        if (cardToUpgrade) {
          console.log("\uD83E\uDE93 ".concat(_relic.name, " is upgrading a picked-up card: ").concat(cardToUpgrade.name));
          var upgraded = upgradeCard(cardToUpgrade, 1);
          updatedState.log.unshift("".concat(_relic.name, " upgraded ").concat(cardToUpgrade.name, " into ").concat(upgraded.name, "."));
          result = upgraded;
        } else {
          console.warn("\u26A0\uFE0F ".concat(_relic.name, " triggered upgradeCard but no card was provided."));
        }
      }

      // === Support for Porcelain Koi ===
      if (triggerEvent === TRIGGER_EVENTS.CARD_PICKUP) {
        var pickedCard = context.card || context.payload;
        if (_effect.bonusHealth) {
          updatedState.health += _effect.bonusHealth;
          updatedState.maxHealth += _effect.bonusHealth;
          updatedState.log.unshift("".concat(_relic.name, " increased your max health by ").concat(_effect.bonusHealth).concat(pickedCard !== null && pickedCard !== void 0 && pickedCard.name ? " (from picking ".concat(pickedCard.name, ")") : "", "."));
        }
        if (_effect.bonusGold) {
          updatedState = gainGold(updatedState, _effect.bonusGold);
          updatedState.log.unshift("".concat(_relic.name, " granted you ").concat(_effect.bonusGold, " gold").concat(pickedCard !== null && pickedCard !== void 0 && pickedCard.name ? " (from picking ".concat(pickedCard.name, ")") : "", "."));
        }
      }

      // === Add additional relic effects here ===
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return _objectSpread(_objectSpread({}, updatedState), {}, {
    result: result
  });
}
function checkEnemyTriggers(state, triggerEvent) {
  var _updatedState$combat;
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var updatedState = _objectSpread({}, state);
  var enemy = (_updatedState$combat = updatedState.combat) === null || _updatedState$combat === void 0 ? void 0 : _updatedState$combat.enemy;
  if (!enemy) return updatedState;
  var abilities = enemy.abilities || {};
  var logMessages = [];
  if (triggerEvent === TRIGGER_EVENTS.COMBAT_START) {
    // Ink Drink effect
    if (abilities[ENEMY_ABILITIES.INK_DRINK]) {
      var amount = abilities[ENEMY_ABILITIES.INK_DRINK];
      var newMaxInk = Math.max(0, updatedState.combat.maxInk - amount);
      var newInk = Math.min(updatedState.combat.ink, newMaxInk); // Ensure current ink doesn't exceed new max

      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
          maxInk: newMaxInk,
          ink: newInk
        })
      });
      logMessages.push("".concat(enemy.name, " drained ").concat(amount, " max ink at the start of combat!"));
    }

    // Increase Health effect
    if (abilities[ENEMY_ABILITIES.INCREASE_HEALTH]) {
      var multiplier = abilities[ENEMY_ABILITIES.INCREASE_HEALTH]; // e.g., 1.5

      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
          enemyHp: Math.floor(updatedState.combat.enemyHp * multiplier),
          enemy: _objectSpread(_objectSpread({}, updatedState.combat.enemy), {}, {
            hp: Math.floor(updatedState.combat.enemy.hp * multiplier)
          })
        })
      });
      logMessages.push("".concat(enemy.name, " increased its health by ").concat(Math.round((multiplier - 1) * 100), "%!"));
    }

    // Downgrade Cards at Combat Start
    if (abilities[ENEMY_ABILITIES.DOWNGRADE_CARDS]) {
      var _amount = abilities[ENEMY_ABILITIES.DOWNGRADE_CARDS];
      var deck = _toConsumableArray(updatedState.combat.deck);
      var downgradable = deck.filter(function (card) {
        return !card.undowngradable;
      });
      var shuffled = _toConsumableArray(downgradable).sort(function () {
        return Math.random() - 0.5;
      });
      var toDowngrade = shuffled.slice(0, _amount);
      var updatedDeck = deck.map(function (card) {
        return toDowngrade.includes(card) ? downgradeCard(card, 1) : card;
      });
      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
          deck: updatedDeck
        })
      });
      logMessages.push("".concat(enemy.name, " downgraded ").concat(toDowngrade.length, " card(s) in your deck!"));
    }

    // Hand Size Reduction
    if (abilities[ENEMY_ABILITIES.HAND_SIZE_REDUCTION]) {
      var _amount2 = abilities[ENEMY_ABILITIES.HAND_SIZE_REDUCTION];
      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
          handSize: Math.max(1, updatedState.combat.handSize - _amount2)
        })
      });
      logMessages.push("".concat(enemy.name, " reduces your hand size by ").concat(_amount2, "!"));
    }

    // === Add curses at combat start ===
    if (triggerEvent === TRIGGER_EVENTS.COMBAT_START) {
      var _abilities = enemy.abilities || {};
      if (_abilities[ENEMY_ABILITIES.ADD_PEBBLES]) {
        var _amount3 = _abilities[ENEMY_ABILITIES.ADD_PEBBLES];
        for (var i = 0; i < _amount3; i++) {
          updatedState = addCardToCombatDeck(updatedState, "Sisyphus' Pebble");
        }
        logMessages.push("".concat(enemy.name, " added ").concat(_amount3, " Sisyphus' Pebble to your deck!"));
      }
      if (_abilities[ENEMY_ABILITIES.ADD_MERCURY]) {
        var _amount4 = _abilities[ENEMY_ABILITIES.ADD_MERCURY];
        for (var _i6 = 0; _i6 < _amount4; _i6++) {
          updatedState = addCardToCombatDeck(updatedState, "Mercury Droplet");
        }
        logMessages.push("".concat(enemy.name, " added ").concat(_amount4, " Mercury Droplet(s) to your deck!"));
      }
      if (_abilities[ENEMY_ABILITIES.ADD_CLUTTER]) {
        var _amount5 = _abilities[ENEMY_ABILITIES.ADD_CLUTTER];
        for (var _i7 = 0; _i7 < _amount5; _i7++) {
          updatedState = addCardToCombatDeck(updatedState, "Clutter");
        }
        logMessages.push("".concat(enemy.name, " added ").concat(_amount5, " Clutter card(s) to your deck!"));
      }
    }
  }
  if (logMessages.length > 0) {
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      log: ["\u26A0\uFE0F Enemy ability activated!"].concat(logMessages, _toConsumableArray(updatedState.log))
    });
  }
  return updatedState;
}
function modifyCombatInk(state, amount) {
  var _state$combat$ink, _state$combat, _state$combat$maxInk, _state$combat2;
  var current = (_state$combat$ink = (_state$combat = state.combat) === null || _state$combat === void 0 ? void 0 : _state$combat.ink) !== null && _state$combat$ink !== void 0 ? _state$combat$ink : 0;
  var max = (_state$combat$maxInk = (_state$combat2 = state.combat) === null || _state$combat2 === void 0 ? void 0 : _state$combat2.maxInk) !== null && _state$combat$maxInk !== void 0 ? _state$combat$maxInk : 0;
  var newInk = Math.max(0, Math.min(current + amount, max));
  var actualChange = newInk - current;

  // let changeMessage =
  //   actualChange === 0
  //     ? `Ink unchanged.`
  //     : actualChange > 0
  //     ? `Gained ${actualChange} ink.`
  //     : `Spent ${Math.abs(actualChange)} ink.`;

  return _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      ink: newInk
    })
    // log: [changeMessage, ...state.log],
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

  // Define excluded subtypes (easily extendable)
  var excludedSubtypes = new Set([SPECIAL_CARD_SUBTYPES.CURSE
  // Add more subtypes here in future
  ]);
  var alternatives = cardList.filter(function (c) {
    return c.name !== card.name && !c.unchoosableByTransmute && (!c.specialSubtype || !excludedSubtypes.has(c.specialSubtype));
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
function initializeCombatPhase(state, path) {
  var _state$level4, _state$stage, _state$campaign$mulli, _state$baseBunnies;
  var level = (_state$level4 = state.level) !== null && _state$level4 !== void 0 ? _state$level4 : 1;
  var stage = (_state$stage = state.stage) !== null && _state$stage !== void 0 ? _state$stage : 0;

  // Define ability power modifier based on level
  var modifyEnemyAbilityPower = function modifyEnemyAbilityPower(_ref11) {
    var currentValue = _ref11.currentValue;
    if (stage === 2) return currentValue + 2;
    if (stage === 1) return currentValue + 1;
    return currentValue;
  };
  var enemy = generateEnemy(state, path, modifyEnemyAbilityPower);

  // Deep copy and shuffle the deck
  var deepDeckCopy = JSON.parse(JSON.stringify(state.campaign.deck));
  var shuffledDeck = shuffleArray(deepDeckCopy);
  var newCombat = {
    enemy: enemy,
    enemyHp: enemy.hp,
    deck: shuffledDeck,
    hand: [],
    graveyard: [],
    // was 'discard' but rest of code uses 'graveyard'
    exile: [],
    mulligans: (_state$campaign$mulli = state.campaign.mulligans) !== null && _state$campaign$mulli !== void 0 ? _state$campaign$mulli : 0,
    ink: state.campaign.ink,
    maxInk: state.campaign.ink,
    books: state.campaign.books,
    maxBooks: state.campaign.books,
    pages: state.campaign.pages,
    maxPages: state.campaign.pages,
    handSize: state.campaign.handSize,
    baseBunnies: (_state$baseBunnies = state.baseBunnies) !== null && _state$baseBunnies !== void 0 ? _state$baseBunnies : 0,
    bunnies: 0,
    combatEnded: false
  };
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    combat: newCombat,
    log: ["\u2694\uFE0F Combat begins against ".concat(enemy.name, "!")].concat(_toConsumableArray(state.log))
  });
  newState = checkRelicTriggers(newState, TRIGGER_EVENTS.COMBAT_START);
  newState = checkEnemyTriggers(newState, TRIGGER_EVENTS.COMBAT_START);
  console.log("🛠️ Starting combat with baseBunnies =", newCombat.baseBunnies);

  // Start the player's turn (draw hand, refill ink, setup spellbook, etc.)
  newState = startTurn(newState);
  return newState;
}
function generateEnemy(state, path) {
  var _pathMap$path$path, _state$level5, _state$stage2, _state$enemyHealthMul, _baseHealthMap$diffic, _perLevelIncrement$di, _perStageMultiplier$s;
  var modifyEnemyAbilityPower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var difficulty = (_pathMap$path$path = pathMap[path === null || path === void 0 ? void 0 : path.path]) === null || _pathMap$path$path === void 0 ? void 0 : _pathMap$path$path.difficulty;
  console.log("Path:", path === null || path === void 0 ? void 0 : path.path, "| Difficulty:", difficulty);
  var level = (_state$level5 = state.level) !== null && _state$level5 !== void 0 ? _state$level5 : 1;
  var stage = (_state$stage2 = state.stage) !== null && _state$stage2 !== void 0 ? _state$stage2 : 0;
  console.log("Generating enemy at stage ".concat(stage));
  var multiplier = (_state$enemyHealthMul = state.enemyHealthMultiplier) !== null && _state$enemyHealthMul !== void 0 ? _state$enemyHealthMul : 1;
  var isBoss = difficulty === "boss";

  // === Health Calculation ===
  var baseHealthMap = {
    easy: 10,
    medium: 13,
    hard: 16,
    boss: 25
  };
  var perLevelIncrement = {
    easy: 4,
    medium: 5,
    hard: 6,
    boss: 10
  };
  var perStageMultiplier = {
    0: 1,
    1: 2,
    2: 3
  };
  var base = (_baseHealthMap$diffic = baseHealthMap[difficulty]) !== null && _baseHealthMap$diffic !== void 0 ? _baseHealthMap$diffic : 10;
  var increment = (_perLevelIncrement$di = perLevelIncrement[difficulty]) !== null && _perLevelIncrement$di !== void 0 ? _perLevelIncrement$di : 3;
  var stageMultiplier = (_perStageMultiplier$s = perStageMultiplier[stage]) !== null && _perStageMultiplier$s !== void 0 ? _perStageMultiplier$s : 1;
  var health = (base + level * increment) * multiplier * stageMultiplier;

  // === Ability Assignment ===
  var allAbilities = Object.keys(enemyAbilityDataMap);
  var selectedAbilities = new Set();
  var numAbilities = 0;
  if (difficulty === "medium") numAbilities = 1;else if (difficulty === "hard") numAbilities = 2;
  if (isBoss) numAbilities = 0;
  if (state.difficulty === DIFFICULTIES.HARD) {
    var _state$luck;
    var bonusChance = Math.max(0, 0.5 - ((_state$luck = state.luck) !== null && _state$luck !== void 0 ? _state$luck : 0));
    if (Math.random() < bonusChance) numAbilities += 1;
  }
  numAbilities = Math.min(numAbilities, 3);
  while (selectedAbilities.size < numAbilities) {
    var ability = allAbilities[Math.floor(Math.random() * allAbilities.length)];
    selectedAbilities.add(ability);
  }

  // === Build abilities object ===
  var abilities = {};
  var _iterator6 = _createForOfIteratorHelper(selectedAbilities),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _data$baseValue, _data$incrementValue, _state$stage3;
      var key = _step6.value;
      var data = enemyAbilityDataMap[key];
      var baseValue = (_data$baseValue = data.baseValue) !== null && _data$baseValue !== void 0 ? _data$baseValue : 0;
      var _increment = (_data$incrementValue = data.incrementValue) !== null && _data$incrementValue !== void 0 ? _data$incrementValue : 0;
      var _stage = (_state$stage3 = state.stage) !== null && _state$stage3 !== void 0 ? _state$stage3 : 0;
      var value = baseValue + _increment * _stage;
      console.log("\u2192 Ability: ".concat(key, " | Base: ").concat(baseValue, ", Incr: ").concat(_increment, ", Stage: ").concat(_stage, ", Final Value: ").concat(value));
      if (typeof modifyEnemyAbilityPower === "function") {
        value = modifyEnemyAbilityPower({
          ability: key,
          baseValue: baseValue,
          increment: _increment,
          currentValue: value,
          stage: _stage,
          enemyLevel: level,
          difficulty: difficulty,
          isBoss: isBoss,
          state: state
        });
      }
      abilities[key] = value;
    }
    // === Name Generation ===
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  var name;
  var smallMonsters = ["goblin", "kobold", "rat", "spider", "imp", "gremlin", "bat", "quasit", "skeleton", "zombie"];
  var mediumMonsters = ["orc", "ogre", "gnoll", "troll", "hobgoblin", "ghoul", "harpy", "lizardfolk", "wight", "mimic"];
  var largeMonsters = ["dragon", "manticore", "hydra", "wyvern", "beholder", "medusa", "chimera", "giant", "basilisk", "banshee"];
  var vegetables = ["carrot", "broccoli", "spinach", "kale", "zucchini", "eggplant", "cauliflower", "cabbage", "lettuce", "beet", "radish", "turnip", "bokchoi", "chilli", "nopal", "durian", "bean", "yam", "tomato", "asparagus", "potato", "pumpkin", "bellpepper", "celery", "onion"];
  var bossNames = ["Avatar of the Weasel", "Fox Spirit", "Beaglesoul"];
  if (isBoss) {
    var _state$defeatedEnemie3;
    var defeated = (_state$defeatedEnemie3 = state.defeatedEnemies) !== null && _state$defeatedEnemie3 !== void 0 ? _state$defeatedEnemie3 : [];

    // Filter out bosses that have already been defeated
    var remainingBosses = bossNames.filter(function (boss) {
      return !defeated.includes(boss);
    });
    if (remainingBosses.length === 0) {
      console.warn("All bosses have already been defeated!");
      name = "???"; // or throw an error or return null or fallback enemy
    } else {
      name = remainingBosses[Math.floor(Math.random() * remainingBosses.length)];
    }
  } else {
    // Base monster type
    var monsterList;
    if (stage === 0) {
      monsterList = smallMonsters;
    } else if (stage === 1) {
      monsterList = mediumMonsters;
    } else {
      monsterList = largeMonsters;
    }
    var vegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
    var monster = monsterList[Math.floor(Math.random() * monsterList.length)];

    // Prefixes based on abilities
    var prefixes = Object.keys(abilities).map(function (ability) {
      var _enemyAbilityDataMap$;
      return (_enemyAbilityDataMap$ = enemyAbilityDataMap[ability]) === null || _enemyAbilityDataMap$ === void 0 ? void 0 : _enemyAbilityDataMap$.prefix;
    }).filter(Boolean);
    name = [].concat(_toConsumableArray(prefixes), [capitalize(vegetable), capitalize(monster)]).join(" ");
  }

  // === Loot Generation ===
  var loot = generateEnemyLoot(state, difficulty, numAbilities, isBoss);
  return {
    name: name,
    hp: Math.round(health),
    abilities: abilities,
    loot: loot,
    isBoss: isBoss
  };
}
function generateEnemyLoot(state, difficulty, numAbilities, isBoss) {
  var _state$luck2, _state$level6, _state$campaign$deck3, _state$campaign;
  var luck = (_state$luck2 = state.luck) !== null && _state$luck2 !== void 0 ? _state$luck2 : 0;
  var level = (_state$level6 = state.level) !== null && _state$level6 !== void 0 ? _state$level6 : 1;
  var deck = (_state$campaign$deck3 = (_state$campaign = state.campaign) === null || _state$campaign === void 0 ? void 0 : _state$campaign.deck) !== null && _state$campaign$deck3 !== void 0 ? _state$campaign$deck3 : [];
  var allGemmedOrUnsocketable = deck.length > 0 && deck.every(function (card) {
    return card.gem || card.unsocketable;
  });
  var weights = {
    gold: 30,
    potion: 30,
    card: 40,
    relic: 5 + luck + numAbilities * 4,
    gem: allGemmedOrUnsocketable ? 0 : 5 + luck + numAbilities * 4
  };
  var drops = isBoss ? 3 : 1;
  if (!isBoss) {
    var chanceTwo = 50 + luck + numAbilities * 20;
    if (Math.random() * 100 < chanceTwo) {
      drops++;
      var chanceThree = 35 + luck + numAbilities * 15;
      if (Math.random() * 100 < chanceThree) {
        drops++;
      }
    }
  }
  var usedTypes = new Set();
  var loot = [];
  if (isBoss) {
    var bossRelic = getRandomBossRelic();
    if (bossRelic) {
      loot.push({
        type: "relic",
        value: bossRelic
      });
      usedTypes.add("relic"); // still prevents duplicate relic drops
      drops--;
    } else {
      console.warn("No boss relics available in relicList!");
    }
  }
  while (loot.length < drops) {
    var available = Object.entries(weights).filter(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
        type = _ref13[0],
        weight = _ref13[1];
      return weight > 0 && !usedTypes.has(type);
    });
    if (available.length === 0) break;
    var totalWeight = available.reduce(function (sum, _ref14) {
      var _ref15 = _slicedToArray(_ref14, 2),
        _ = _ref15[0],
        w = _ref15[1];
      return sum + w;
    }, 0);
    var roll = Math.random() * totalWeight;
    var selected = void 0;
    var _iterator7 = _createForOfIteratorHelper(available),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _step7$value = _slicedToArray(_step7.value, 2),
          type = _step7$value[0],
          weight = _step7$value[1];
        if (roll < weight) {
          selected = type;
          break;
        }
        roll -= weight;
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    usedTypes.add(selected);
    if (selected === "gold") {
      var _easy$medium$hard$dif;
      var base = (_easy$medium$hard$dif = {
        easy: 3,
        medium: 5,
        hard: 8
      }[difficulty]) !== null && _easy$medium$hard$dif !== void 0 ? _easy$medium$hard$dif : 2;
      var amount = (base + level + luck + numAbilities * 3) * (0.5 + Math.random());
      loot.push({
        type: "gold",
        value: Math.max(1, Math.round(amount))
      });
    } else if (selected === "card") {
      loot.push({
        type: "card",
        value: generateRandomCard(state)
      });
    } else if (selected === "potion") {
      loot.push({
        type: "potion",
        value: generateRandomPotion(state)
      });
    } else if (selected === "relic") {
      loot.push({
        type: "relic",
        value: generateRandomRelic(state)
      });
    } else if (selected === "gem") {
      loot.push({
        type: "gem",
        value: generateRandomGem(state)
      });
    }
  }
  return loot;
}
function permanentlyUpgradeRandomCardsInDeck(deck) {
  var numUpgrades = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var upgradableCards = deck.filter(function (card) {
    return !card.unupgradable;
  });
  var shuffled = _toConsumableArray(upgradableCards).sort(function () {
    return Math.random() - 0.5;
  });
  var toUpgrade = shuffled.slice(0, numUpgrades);
  var upgradedCards = toUpgrade.map(function (card) {
    return upgradeCard(card, 1);
  });
  return deck.map(function (card) {
    var index = toUpgrade.indexOf(card);
    return index !== -1 ? upgradedCards[index] : card;
  });
}
function addCardToCombatDeck(state, cardName) {
  var _state$combat3;
  var base = cardList.find(function (c) {
    return c.name === cardName;
  });
  if (!base) {
    console.warn("Could not find card \"".concat(cardName, "\""));
    return state;
  }
  var newCard = createCardInstance(cardName);
  var combatDeck = Array.isArray((_state$combat3 = state.combat) === null || _state$combat3 === void 0 ? void 0 : _state$combat3.deck) ? _toConsumableArray(state.combat.deck) : [];
  var insertIndex = Math.floor(Math.random() * (combatDeck.length + 1));
  combatDeck.splice(insertIndex, 0, newCard); // insert at random index

  return _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      deck: combatDeck
    })
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
      return _objectSpread(_objectSpread({}, state), {}, {
        previousScreen: state.currentScreen,
        currentScreen: action.payload
      });
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
    case ACTIONS.MULLIGAN:
      return mulligan(state);
    case ACTIONS.CLAIM_GOLD_REWARD:
      {
        var _action$payload2 = action.payload,
          index = _action$payload2.index,
          amount = _action$payload2.amount;
        var newRewards = _toConsumableArray(state.offerings.combatRewards);
        newRewards.splice(index, 1);
        return _objectSpread(_objectSpread({}, gainGold(state, amount)), {}, {
          offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
            combatRewards: newRewards
          })
        });
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
  var _state$campaign$deck4, _state$level7, _state$modData3;
  // Get or create output div
  var output = document.getElementById("output");
  if (!output) {
    output = document.createElement("div");
    output.id = "output";
    document.body.appendChild(output);
  }
  output.innerHTML = ""; // Clear previous contents
  // //check and see if all cards in the deck are socketed
  var allCardsSocketed = ((_state$campaign$deck4 = state.campaign.deck) === null || _state$campaign$deck4 === void 0 ? void 0 : _state$campaign$deck4.length) > 0 && state.campaign.deck.every(function (card) {
    return card.gem != null || card.unsocketable;
  });

  //
  function renderCardList(title, cards) {
    var section = document.createElement("div");
    section.innerHTML = "<h3>".concat(title, "</h3>");
    var ul = document.createElement("ul");
    cards.forEach(function (card) {
      var li = document.createElement("li");
      li.textContent = card.name;
      ul.appendChild(li);
    });
    section.appendChild(ul);
    output.appendChild(section);
  }

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
  info.innerHTML = "\n  <h2>Game Info</h2>\n  <p><strong>Current Screen:</strong> ".concat(state.currentScreen, "</p>\n  <p><strong>Phase:</strong> ").concat(state.currentPhase, " &nbsp;&nbsp; <strong>Level:</strong> ").concat((_state$level7 = state.level) !== null && _state$level7 !== void 0 ? _state$level7 : 0, "</p>\n  <p><strong>Gold:</strong> ").concat(state.gold, "</p>\n  <p><strong>Health:</strong> ").concat(state.health, "/").concat(state.maxHealth, "</p>\n  <p><strong>Deck Size:</strong> ").concat(state.campaign.deck.length, "</p>\n  <p><strong>Relics:</strong> ").concat(state.relicBelt.length > 0 ? Object.entries(state.relicBelt.reduce(function (acc, relic) {
    acc[relic.name] = (acc[relic.name] || 0) + 1;
    return acc;
  }, {})).map(function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 2),
      name = _ref17[0],
      count = _ref17[1];
    return count > 1 ? "".concat(name, " x").concat(count) : name;
  }).join(", ") : "None", "</p>\n");
  output.appendChild(info);

  // === Combat Display ===
  var isCombatInspectScreen = [SCREENS.COMBAT_DECK, SCREENS.GRAVEYARD, SCREENS.EXILE].includes(state.currentScreen);
  if (state.currentPhase === PHASES.COMBAT && state.combat) {
    var combatSection = document.createElement("div");
    combatSection.style.border = "2px solid black";
    combatSection.style.padding = "1rem";
    combatSection.style.margin = "1rem 0";
    combatSection.innerHTML = "<h3>Combat</h3>";

    // === Main Combat UI (skip if inspecting)
    if (!isCombatInspectScreen) {
      var _state$combat4, _state$combat$mulliga, _state$combat5;
      // Enemy Name + HP (on same line)
      var enemyBox = document.createElement("div");
      enemyBox.style.display = "flex";
      enemyBox.style.justifyContent = "space-between";
      enemyBox.style.alignItems = "center";
      enemyBox.style.fontSize = "1.5rem";
      enemyBox.style.fontWeight = "bold";
      enemyBox.style.border = "1px solid red";
      enemyBox.style.padding = "1rem";
      enemyBox.style.marginBottom = "1rem";

      // Enemy name
      var nameSpan = document.createElement("span");
      nameSpan.textContent = state.combat.enemy.name;

      // Enemy HP
      var hpSpan = document.createElement("span");
      hpSpan.textContent = "HP: ".concat(state.combat.enemyHp);
      enemyBox.appendChild(nameSpan);
      enemyBox.appendChild(hpSpan);
      combatSection.appendChild(enemyBox);

      // Spellbook Pages
      var spellbook = document.createElement("div");
      spellbook.style.display = "flex";
      spellbook.style.gap = "0.5rem";
      spellbook.style.marginBottom = "1rem";
      state.combat.spellbook.forEach(function (page, index) {
        var pageDiv = document.createElement("div");
        pageDiv.style.width = "60px";
        pageDiv.style.height = "90px";
        pageDiv.style.border = "1px solid #333";
        pageDiv.style.display = "flex";
        pageDiv.style.alignItems = "center";
        pageDiv.style.justifyContent = "center";
        pageDiv.style.backgroundColor = page === "blank page" ? "lightgrey" : "white";
        pageDiv.textContent = page === "blank page" ? "" : page.name;
        spellbook.appendChild(pageDiv);
      });
      var spellbookLabel = document.createElement("p");
      spellbookLabel.textContent = "Spellbook:";
      spellbookLabel.style.fontWeight = "bold";
      spellbookLabel.style.marginBottom = "0.25rem";
      combatSection.appendChild(spellbookLabel);
      combatSection.appendChild(spellbook);

      // Cast + Ink + Bunny Count
      var castRow = document.createElement("div");
      castRow.style.display = "flex";
      castRow.style.alignItems = "center";
      castRow.style.gap = "1rem";
      castRow.style.marginBottom = "0.5rem";
      var allPagesBlank = state.combat.spellbook.length > 0 && state.combat.spellbook.every(function (page) {
        return page === "blank page";
      });
      var castButton = document.createElement("button");
      if (allPagesBlank) {
        castButton.textContent = "Skip Turn";
        castButton.style.backgroundColor = "#f88";
      } else {
        castButton.textContent = "Cast Spellbook";
      }
      castButton.onclick = function () {
        return dispatch({
          type: ACTIONS.CAST_SPELLBOOK
        });
      };
      var bunnyDisplay = document.createElement("span");
      bunnyDisplay.textContent = "BUNNIES: ".concat(((_state$combat4 = state.combat) === null || _state$combat4 === void 0 ? void 0 : _state$combat4.bunnies) || 0);
      castRow.appendChild(castButton);
      castRow.appendChild(castButton);

      // === Mulligan Button ===
      var mulliganBtn = document.createElement("button");
      var remaining = (_state$combat$mulliga = (_state$combat5 = state.combat) === null || _state$combat5 === void 0 ? void 0 : _state$combat5.mulligans) !== null && _state$combat$mulliga !== void 0 ? _state$combat$mulliga : 0;
      mulliganBtn.textContent = "Mulligan (".concat(remaining, ")");
      if (remaining <= 0) {
        mulliganBtn.disabled = true;
        mulliganBtn.style.backgroundColor = "#ccc";
        mulliganBtn.style.cursor = "not-allowed";
      } else {
        mulliganBtn.onclick = function () {
          dispatch({
            type: ACTIONS.MULLIGAN
          });
        };
      }
      castRow.appendChild(mulliganBtn);
      castRow.appendChild(bunnyDisplay);
      combatSection.appendChild(castRow);

      // === INK and BOOKS Line (below cast + bunnies)
      var resourcesRow = document.createElement("div");
      resourcesRow.style.display = "flex";
      resourcesRow.style.gap = "1rem";
      resourcesRow.style.marginBottom = "1rem";
      var inkDisplay = document.createElement("span");
      inkDisplay.textContent = "INK: ".concat(state.combat.ink, "/").concat(state.combat.maxInk);
      var booksDisplay = document.createElement("span");
      booksDisplay.textContent = "BOOKS: ".concat(state.combat.books);
      resourcesRow.appendChild(inkDisplay);
      resourcesRow.appendChild(booksDisplay);
      combatSection.appendChild(resourcesRow);

      // Hand
      var handRow = document.createElement("div");
      handRow.style.display = "flex";
      handRow.style.gap = "0.5rem";
      handRow.style.flexWrap = "wrap";
      if (state.combat.hand && state.combat.hand.length > 0) {
        state.combat.hand.forEach(function (card, index) {
          var _card$inkCost;
          var cardBtn = document.createElement("button");
          var cardCost = (_card$inkCost = card.inkCost) !== null && _card$inkCost !== void 0 ? _card$inkCost : 0;
          var canAfford = cardCost <= state.combat.ink;
          var isUncastable = !!card.uncastable;

          // Display name and cost
          var costText = !isUncastable && card.inkCost != null ? " (Cost: ".concat(card.inkCost, ")") : "";
          cardBtn.textContent = "".concat(card.name).concat(costText);

          // Disable the button if the card is uncastable or too expensive
          cardBtn.disabled = isUncastable || !canAfford;

          // Style disabled buttons
          if (cardBtn.disabled) {
            cardBtn.style.opacity = "0.5";
            cardBtn.style.cursor = "not-allowed";
          }

          // Only dispatch if allowed
          cardBtn.onclick = function () {
            if (!cardBtn.disabled) {
              dispatch({
                type: ACTIONS.PLAY_CARD,
                payload: index
              });
            }
          };
          handRow.appendChild(cardBtn);
        });
      } else {
        var empty = document.createElement("p");
        empty.textContent = "Your hand is empty.";
        handRow.appendChild(empty);
      }

      // Hand label
      var handLabel = document.createElement("p");
      handLabel.textContent = "Hand:";
      handLabel.style.fontWeight = "bold";
      handLabel.style.marginBottom = "0.25rem";
      combatSection.appendChild(handLabel);
      combatSection.appendChild(handRow);
    }

    // === Inspect Buttons (always shown in combat)
    var inspectRow = document.createElement("div");
    inspectRow.style.marginTop = "1rem";
    inspectRow.style.display = "flex";
    inspectRow.style.gap = "0.5rem";
    [{
      label: "Combat Deck (".concat(state.combat.deck.length, ")"),
      screen: SCREENS.COMBAT_DECK
    }, {
      label: "Graveyard (".concat(state.combat.graveyard.length, ")"),
      screen: SCREENS.GRAVEYARD
    }, {
      label: "Exile (".concat(state.combat.exile.length, ")"),
      screen: SCREENS.EXILE
    }].forEach(function (_ref18) {
      var label = _ref18.label,
        screen = _ref18.screen;
      var btn = document.createElement("button");
      btn.textContent = state.currentScreen === screen ? "Return" : "Inspect ".concat(label);
      btn.onclick = function () {
        if (state.currentScreen === screen) {
          returnToMain(dispatch);
        } else {
          changeScreen(dispatch, screen);
        }
      };
      inspectRow.appendChild(btn);
    });

    //label
    var inspectZoneLabel = document.createElement("p");
    inspectZoneLabel.textContent = "Inspect Zones:";
    inspectZoneLabel.style.fontWeight = "bold";
    inspectZoneLabel.style.marginBottom = "0.25rem";
    combatSection.appendChild(inspectZoneLabel);
    combatSection.appendChild(inspectRow);
    output.appendChild(combatSection);
  }
  if (state.currentScreen === SCREENS.COMBAT_DECK) {
    var _state$combat6;
    renderCardList("Combat Deck", ((_state$combat6 = state.combat) === null || _state$combat6 === void 0 ? void 0 : _state$combat6.deck) || []);
  }
  if (state.currentScreen === SCREENS.GRAVEYARD) {
    var _state$combat7;
    renderCardList("Graveyard", ((_state$combat7 = state.combat) === null || _state$combat7 === void 0 ? void 0 : _state$combat7.graveyard) || []);
  }
  if (state.currentScreen === SCREENS.EXILE) {
    var _state$combat8;
    renderCardList("Exile", ((_state$combat8 = state.combat) === null || _state$combat8 === void 0 ? void 0 : _state$combat8.exile) || []);
  }

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
      btn.textContent = "".concat(relic.name);
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
        btn.textContent = "".concat(path.path);
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
      btn.textContent = "".concat(card.name, " (Cost: ").concat(card.inkCost, ")").concat(card.gem ? " [Gem: ".concat(card.gem.name, "]") : "");
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
      var _entry$item$price3, _entry$item4, _state$gold;
      if (!entry || !entry.item || !entry.item.name) return;
      var li = document.createElement("li");
      var btn = document.createElement("button");
      var price = (_entry$item$price3 = (_entry$item4 = entry.item) === null || _entry$item4 === void 0 ? void 0 : _entry$item4.price) !== null && _entry$item$price3 !== void 0 ? _entry$item$price3 : 0;
      var playerGold = (_state$gold = state.gold) !== null && _state$gold !== void 0 ? _state$gold : 0;
      var isGem = entry.type === "gem";
      var disabled = price > playerGold || isGem && allCardsSocketed;
      btn.textContent = "".concat(entry.type.toUpperCase(), ": ").concat(entry.item.name, " (").concat(price, "g)");
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
            break;
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
        type: ACTIONS.EXIT_SHOP
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
      // === Filter based on mod type ===
      if (isGemMod && (card.gem || card.unsocketable)) return;
      if (mod.upgrade && card.unupgradable) return;
      var btn = document.createElement("button");
      btn.textContent = "".concat(card.name, " (Cost: ").concat(card.inkCost, ")");
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

  // === Combat End Phase ===
  if (state.currentPhase === PHASES.COMBAT_END) {
    var _state$offerings;
    var combatEndSection = document.createElement("div");
    combatEndSection.innerHTML = "<h3>Combat Concluded</h3>";
    var hasUnclaimedLoot = ((_state$offerings = state.offerings) === null || _state$offerings === void 0 ? void 0 : _state$offerings.combatRewards) && state.offerings.combatRewards.length > 0;
    var _btn = document.createElement("button");
    _btn.textContent = hasUnclaimedLoot ? "Skip Loot" : "Continue";
    _btn.onclick = function () {
      dispatch({
        type: ACTIONS.CLOSE_COMBAT_REWARDS
      });
    };
    combatEndSection.appendChild(_btn);
    output.appendChild(combatEndSection);
  }
  if (state.currentPhase === PHASES.COMBAT_END && state.offerings.combatRewards && state.offerings.combatRewards.length > 0) {
    var rewardSection = document.createElement("div");
    rewardSection.innerHTML = "<h3>Combat Rewards</h3>";
    state.offerings.combatRewards.forEach(function (reward, index) {
      var btn = document.createElement("button");
      var label = "";
      switch (reward.type) {
        case "gold":
          label = "Gold: ".concat(reward.value);
          break;
        case "card":
          label = "Card: ".concat(reward.value.name);
          break;
        case "relic":
          label = "Relic: ".concat(reward.value.name);
          break;
        case "potion":
          label = "Potion: ".concat(reward.value.name);
          break;
        case "gem":
          label = "Gem: ".concat(reward.value.name);
          break;
        default:
          label = "Unknown Reward";
      }
      btn.textContent = label;
      var isGem = reward.type === "gem";
      var shouldDisable = isGem && allCardsSocketed;
      if (shouldDisable) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }
      if (!shouldDisable) {
        btn.onclick = function () {
          if (reward.type === "gold") {
            dispatch({
              type: ACTIONS.CLAIM_GOLD_REWARD,
              payload: {
                index: index,
                amount: reward.value
              }
            });
          } else if (reward.type === "card") {
            dispatch({
              type: ACTIONS.PICK_CARD,
              payload: index
            });
          } else if (reward.type === "relic") {
            dispatch({
              type: ACTIONS.PICK_RELIC,
              payload: index
            });
          } else if (reward.type === "potion") {
            dispatch({
              type: ACTIONS.PICK_POTION,
              payload: index
            });
          } else if (reward.type === "gem") {
            dispatch({
              type: ACTIONS.OPEN_MOD_SCREEN,
              payload: {
                mod: {
                  gem: reward.value
                },
                origin: PHASES.COMBAT_END
              }
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
    var gameOverSection = document.createElement("div");
    gameOverSection.classList.add("game-over");
    var banner = document.createElement("h1");
    banner.textContent = state.result === "Victory" ? "🏆 Victory!" : "💀 Defeat!";
    gameOverSection.appendChild(banner);
    var summary = document.createElement("div");
    summary.innerHTML = "\n      <p>Game ended at level: ".concat(state.level, "</p>\n      <h3>Decklist:</h3>\n      <ul>\n        ").concat(state.campaign.deck.map(function (card) {
      return "<li>".concat(card.name, "</li>\n");
    }).join(""), "\n      </ul>\n      <h3>Relics:</h3>\n      <ul>\n        ").concat(state.relicBelt.map(function (relic) {
      return "<li>".concat(relic.name, "</li>");
    }).join(""), "\n      </ul>\n    ");
    gameOverSection.appendChild(summary);
    var newGameBtn = document.createElement("button");
    newGameBtn.textContent = "Return to Main Menu";
    newGameBtn.onclick = function () {
      dispatch({
        type: ACTIONS.NEW_GAME
      });
    };
    gameOverSection.appendChild(newGameBtn);
    output.appendChild(gameOverSection);
  }

  // === Deck Inspect / Return Button ===
  //deck inspect button
  if ((state.currentScreen === SCREENS.MAIN || state.currentScreen === SCREENS.DECK) && state.campaign.deck.length > 0) {
    var deckBtn = document.createElement("button");
    deckBtn.textContent = state.currentScreen === SCREENS.MAIN ? "Inspect Deck (".concat(state.campaign.deck.length, ")") : "Return";
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
  if (state.potionBelt && state.potionBelt.length > 0) {
    var beltSection = document.createElement("div");
    beltSection.innerHTML = "<h3>Your Potions</h3>";
    state.potionBelt.forEach(function (potion, index) {
      var btn = document.createElement("button");
      btn.textContent = potion.name;
      var isCombatPhase = state.currentPhase === PHASES.COMBAT;
      var isDrinkableNow = potion.drinkableOutOfCombat !== false || isCombatPhase;
      if (!isDrinkableNow) {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      }
      btn.onclick = function () {
        if (isDrinkableNow) {
          dispatch({
            type: ACTIONS.DRINK_POTION,
            payload: index
          });
        }
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

//hotkeys
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    dispatch({
      type: ACTIONS.SCREEN_CHANGE,
      payload: SCREENS.MAIN
    });
  }
});

//#region WIP
// //------------------------------------------------WIP functions for MVP ------------------------------------------------
function startTurn(state) {
  var _state$combat$baseBun;
  console.log(">>> Starting new turn. Books remaining: ", state.combat.books);
  if (state.combat.books < 1) {
    return _objectSpread(_objectSpread({}, state), {}, {
      combat: _objectSpread(_objectSpread({}, state.combat), {}, {
        combatEnded: true
      }),
      log: ["📕 You have no books left. Combat ends."].concat(_toConsumableArray(state.log))
    });
  }

  // Open a new spellbook of blank pages
  var newBook = Array(state.combat.pages).fill("blank page");
  var baseBunnies = (_state$combat$baseBun = state.combat.baseBunnies) !== null && _state$combat$baseBun !== void 0 ? _state$combat$baseBun : 0;

  // Subtract one book, set up spellbook, and apply base bunnies
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      books: state.combat.books - 1,
      spellbook: newBook,
      bunnies: baseBunnies,
      // ✅ Set starting bunnies for the turn
      combatEnded: false
    }),
    log: ["\uD83D\uDCD6 A new turn begins. \uD83D\uDC07 Gained ".concat(baseBunnies, " bunnies.")].concat(_toConsumableArray(state.log))
  });
  updatedState = newHand(updatedState);
  updatedState = refillInkpot(updatedState);
  return updatedState;
}
function shuffleGraveyardIntoDeck(state) {
  var _state$combat$graveya, _state$combat9, _state$combat$deck, _state$combat0;
  var graveyard = (_state$combat$graveya = (_state$combat9 = state.combat) === null || _state$combat9 === void 0 ? void 0 : _state$combat9.graveyard) !== null && _state$combat$graveya !== void 0 ? _state$combat$graveya : [];
  var deck = (_state$combat$deck = (_state$combat0 = state.combat) === null || _state$combat0 === void 0 ? void 0 : _state$combat0.deck) !== null && _state$combat$deck !== void 0 ? _state$combat$deck : [];
  if (graveyard.length === 0) {
    return _objectSpread(_objectSpread({}, state), {}, {
      log: ["Your graveyard is already empty."].concat(_toConsumableArray(state.log))
    });
  }

  // Purely combine and shuffle
  var combinedDeck = [].concat(_toConsumableArray(deck), _toConsumableArray(graveyard));
  var shuffledDeck = shuffleArray(combinedDeck);
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      deck: shuffledDeck,
      graveyard: [] // clear graveyard
    }),
    log: ["You shuffled your graveyard into your deck."].concat(_toConsumableArray(state.log))
  });

  // 🔁 Check for relic triggers
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.SHUFFLE_GRAVEYARD_INTO_DECK);

  // 🧪 Check if anyone died as a result of relic effects
  updatedState = checkCombatEndViaDeath(updatedState);
  return updatedState;
}
function refillInkpot(state) {
  var _state$combat$maxInk2, _state$combat1;
  var maxInk = (_state$combat$maxInk2 = (_state$combat1 = state.combat) === null || _state$combat1 === void 0 ? void 0 : _state$combat1.maxInk) !== null && _state$combat$maxInk2 !== void 0 ? _state$combat$maxInk2 : 0;
  return _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      ink: maxInk
    }),
    log: ["\uD83D\uDD2E Inkpot refilled to ".concat(maxInk, ".")].concat(_toConsumableArray(state.log))
  });
}
function checkCombatEndViaDeath(state) {
  var _state$combat10;
  var playerDead = state.health <= 0;
  var enemyDead = ((_state$combat10 = state.combat) === null || _state$combat10 === void 0 ? void 0 : _state$combat10.enemyHp) <= 0;
  if (playerDead) {
    console.log(">>> Player is dead. Ending combat.");
    return combatEnd(state, {
      result: "loss"
    });
  }
  if (enemyDead) {
    console.log(">>> Enemy is dead. Ending combat.");
    return combatEnd(state, {
      result: "win"
    });
  }

  // No one is dead — combat continues
  return state;
}
function newHand(state) {
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      hand: [] // clear hand before drawing
    })
  });
  for (var i = 0; i < updatedState.combat.handSize; i++) {
    updatedState = drawCard(updatedState);
  }
  return updatedState;
}
function drawCard(state) {
  var updatedState = _objectSpread({}, state);

  // 🛠 Use the most recent combat state from the input state
  var currentCombat = updatedState.combat;

  // Step 1: If deck is empty, try to shuffle from graveyard
  if (currentCombat.deck.length === 0) {
    updatedState = shuffleGraveyardIntoDeck(updatedState);
  }

  // 🧠 Rebind again after potential shuffle
  currentCombat = updatedState.combat;

  // Step 2: If still no cards, apply fatigue
  if (currentCombat.deck.length === 0) {
    updatedState = takeDamage(updatedState, 1, {
      skipDeathCheck: false
    });
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      log: ["💀 Lost 1 HP to fatigue by attempting to draw from an empty deck."].concat(_toConsumableArray(updatedState.log))
    });
    return updatedState;
  }

  // Step 3: Draw the card normally
  var _currentCombat$deck = _toArray(currentCombat.deck),
    drawnCard = _currentCombat$deck[0],
    remainingDeck = _currentCombat$deck.slice(1);
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, currentCombat), {}, {
      deck: remainingDeck,
      hand: [].concat(_toConsumableArray(currentCombat.hand), [drawnCard])
    })
    // log: [`📜 Drew card: ${drawnCard.name}`, ...updatedState.log],
  });
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.DRAW_CARD);
  updatedState = checkCardTriggers(updatedState, drawnCard, TRIGGER_EVENTS.DRAW_CARD);
  return updatedState;
}
function checkCardTriggers(state, card, triggerEvent) {
  var _card$triggers;
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var updatedState = _objectSpread({}, state);
  var effect = (_card$triggers = card.triggers) === null || _card$triggers === void 0 ? void 0 : _card$triggers[triggerEvent];
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
  var _state$combat$bunnies;
  return _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      bunnies: ((_state$combat$bunnies = state.combat.bunnies) !== null && _state$combat$bunnies !== void 0 ? _state$combat$bunnies : 0) + bunnyAdd
    })
  });
}
function multiplyBunnies(state, bunnyMult) {
  var _state$combat$bunnies2;
  return _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      bunnies: Math.floor(((_state$combat$bunnies2 = state.combat.bunnies) !== null && _state$combat$bunnies2 !== void 0 ? _state$combat$bunnies2 : 0) * bunnyMult)
    })
  });
}
function takeDamage(state, dmg) {
  var _options$skipDeathChe;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  console.trace("taking damage:", dmg, "options:", options);
  var skipDeathCheck = (_options$skipDeathChe = options.skipDeathCheck) !== null && _options$skipDeathChe !== void 0 ? _options$skipDeathChe : false;
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    health: Math.max(0, state.health - dmg),
    log: ["You took ".concat(dmg, " damage.")].concat(_toConsumableArray(state.log))
  });
  return skipDeathCheck ? updatedState : checkCombatEndViaDeath(updatedState);
}
function dealDamage(state, damage) {
  var damageTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$isBonus = options.isBonus,
    isBonus = _options$isBonus === void 0 ? false : _options$isBonus;
  var newEnemyHp = Math.max(0, state.combat.enemyHp - damage);
  console.log(">> dealDamage: current enemy HP = ".concat(state.combat.enemyHp, ", damage = ").concat(damage, ", new = ").concat(newEnemyHp, ", types = [").concat(damageTypes.join(", "), "], isBonus = ").concat(isBonus));
  var updatedState = _objectSpread(_objectSpread({}, state), {}, {
    combat: _objectSpread(_objectSpread({}, state.combat), {}, {
      enemyHp: newEnemyHp
    }),
    log: ["\u2694\uFE0F You dealt ".concat(damage, " damage to ").concat(state.combat.enemy.name) + (damageTypes.length > 0 ? " (".concat(damageTypes.join(", "), ")") : "") + "."].concat(_toConsumableArray(state.log))
  });

  // Only trigger relics if this isn't bonus damage
  if (!isBonus) {
    var _iterator8 = _createForOfIteratorHelper(damageTypes),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var damageType = _step8.value;
        updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.DEAL_DAMAGE, {
          damageType: damageType,
          amount: damage,
          enemy: state.combat.enemy
        });
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  }
  updatedState = checkCombatEndViaDeath(updatedState);
  updatedState = checkGameOver(updatedState);
  return updatedState;
}
function playCard(state, index) {
  var _card$inkCost2;
  var hand = _toConsumableArray(state.combat.hand);
  var card = hand[index];

  /* ── Guard clauses ─────────────────────────────────────────────────── */
  if (!card || card.uncastable) return state;
  if (((_card$inkCost2 = card.inkCost) !== null && _card$inkCost2 !== void 0 ? _card$inkCost2 : 0) > state.combat.ink) return state;

  /* ── Step 1: deduct ink ────────────────────────────────────────────── */
  var updatedState = modifyCombatInk(_objectSpread({}, state), -card.inkCost);

  /* ── Step 2: remove card from hand ─────────────────────────────────── */
  hand.splice(index, 1);
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
      hand: hand
    })
  });

  /* ── Step 3: relic triggers for PLAY_CARD ──────────────────────────── */
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.PLAY_CARD, {
    card: card
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
  var spellbook = _toConsumableArray(updatedState.combat.spellbook);
  var firstBlank = spellbook.indexOf("blank page");
  if (firstBlank === -1) return updatedState; // failsafe

  spellbook[firstBlank] = card;
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
      spellbook: spellbook
    })
  });

  /* ── Auto-cast when the spellbook is full ───────────────────────────── */
  if (!spellbook.includes("blank page")) {
    updatedState = castSpellbook(updatedState);
    updatedState = checkCombatEndViaDeath(updatedState);
    updatedState = checkGameOver(updatedState);
  }
  return updatedState;
}
function castSpellbook(state) {
  var _updatedState$combat2;
  var updatedState = _objectSpread({}, state);

  // 🌀 Trigger relic effects for CAST_SPELLBOOK
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.CAST_SPELLBOOK);

  // 🔮 Cast each non-blank spell in the spellbook
  var _iterator9 = _createForOfIteratorHelper(updatedState.combat.spellbook),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var card = _step9.value;
      if (_typeof(card) !== "object" || card.name === "blank page") continue;
      updatedState = resolveSpell(updatedState, card);
    }

    // 🐇 Release bunnies (deal damage equal to bunny count)
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  updatedState = releaseBunnies(updatedState);

  // ✅ If enemy is still alive
  if (((_updatedState$combat2 = updatedState.combat) === null || _updatedState$combat2 === void 0 ? void 0 : _updatedState$combat2.enemyHp) > 0) {
    // 👇 Check if any books remain
    if (updatedState.combat.books > 0) {
      console.log(">>> Enemy survived, but books remain. Next turn begins.");
      return startTurn(updatedState);
    } else {
      console.log(">>> Enemy survived. No books left. Player loses combat.");
      return combatEnd(updatedState, {
        result: "loss"
      });
    }
  }

  // ✅ Enemy is dead → player wins
  return combatEnd(updatedState, {
    result: "win"
  });
}
function releaseBunnies(state) {
  var _state$combat$bunnies3;
  var bunnyDamage = (_state$combat$bunnies3 = state.combat.bunnies) !== null && _state$combat$bunnies3 !== void 0 ? _state$combat$bunnies3 : 0;
  if (bunnyDamage <= 0) {
    return _objectSpread(_objectSpread({}, state), {}, {
      combat: _objectSpread(_objectSpread({}, state.combat), {}, {
        bunnies: 0
      })
    });
  }
  var updatedState = _objectSpread({}, state);

  // ✅ Pass as an array now
  updatedState = dealDamage(updatedState, bunnyDamage, [DAMAGE_TYPES.BUNNY]);
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
      bunnies: 0
    }),
    log: ["Released ".concat(bunnyDamage, " bunn").concat(bunnyDamage === 1 ? "y" : "ies", "!")].concat(_toConsumableArray(updatedState.log))
  });
  return updatedState;
}
function endTurn(state) {
  var updatedState = _objectSpread({}, state);

  // 🧪 Check if combat has ended via death
  updatedState = checkCombatEndViaDeath(updatedState);
  if (updatedState.combat.combatEnded) return updatedState;

  // 🪦 Move remaining cards in hand to the graveyard
  var remainingHand = updatedState.combat.hand || [];
  var updatedGraveyard = [].concat(_toConsumableArray(updatedState.combat.graveyard), _toConsumableArray(remainingHand));
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
      hand: [],
      graveyard: updatedGraveyard
    }),
    log: ["You ended your turn."].concat(_toConsumableArray(updatedState.log))
  });

  // 🧪 Check again before starting next turn
  if (updatedState.combat.combatEnded) return updatedState;

  // 🔁 Start a new turn
  return startTurn(updatedState);
}
function resolveSpell(state, card) {
  if (!card || _typeof(card) !== "object") return state;
  var updatedState = _objectSpread({}, state);
  var effects = [];

  // === Bunny Add ===
  if (card.bunnyAdd) {
    updatedState = addBunnies(updatedState, card.bunnyAdd);
    effects.push("+".concat(card.bunnyAdd, " bunn").concat(card.bunnyAdd === 1 ? "y" : "ies"));
  }

  // === Bunny Add Based on Deck Size Multiplier ===
  if (typeof card.bunnyAddPerCardInDeck === "number") {
    var multiplier = card.bunnyAddPerCardInDeck;
    var deckSize = updatedState.campaign.deck.length;
    var bunnyAmount = Math.floor(deckSize * multiplier);
    if (bunnyAmount > 0) {
      updatedState = addBunnies(updatedState, bunnyAmount);
      effects.push("+".concat(bunnyAmount, " bunnies (").concat(multiplier, "\xD7 deck size)"));
    }
  }

  // === Gain Gold Based on Deck Size Multiplier ===
  if (typeof card.goldAddPerCardInDeck === "number") {
    var _multiplier = card.goldAddPerCardInDeck;
    var _deckSize = updatedState.campaign.deck.length;
    var goldAmount = Math.floor(_deckSize * _multiplier);
    if (goldAmount > 0) {
      updatedState = gainGold(updatedState, goldAmount);
      effects.push("+".concat(goldAmount, " gold (").concat(_multiplier, "\xD7 deck size)"));
    }
  }

  // === Heal Based on Deck Size Multiplier ===
  if (card.healPerCardInDeck) {
    var _multiplier2 = card.healPerCardInDeck;
    var _deckSize2 = updatedState.campaign.deck.length;
    var healAmount = Math.floor(_deckSize2 * _multiplier2);
    if (healAmount > 0) {
      updatedState = heal(updatedState, healAmount);
      effects.push("+".concat(healAmount, " HP (").concat(_multiplier2, "\xD7 deck size)"));
    }
  }

  // === Bunny Multiply ===
  if (card.bunnyMult) {
    updatedState = multiplyBunnies(updatedState, card.bunnyMult);
    effects.push("\xD7".concat(card.bunnyMult, " bunnies"));
  }

  // === Gain Gold ===
  if (card.goldAdd) {
    updatedState = gainGold(updatedState, card.goldAdd);
    effects.push("+".concat(card.goldAdd, " gold"));
  }

  // === Add Ink ===
  if (card.inkAdd) {
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
        ink: updatedState.combat.ink + card.inkAdd
      })
    });
    effects.push("+".concat(card.inkAdd, " ink"));
  }

  // === Draw Cards ===
  if (card.cardDraw) {
    for (var i = 0; i < card.cardDraw; i++) {
      updatedState = drawCard(updatedState);
    }
    effects.push("Drew ".concat(card.cardDraw, " card").concat(card.cardDraw === 1 ? "" : "s"));
  }

  // === Health Cost ===
  if (card.healthCost) {
    updatedState = takeDamage(updatedState, card.healthCost);
    effects.push("-".concat(card.healthCost, " HP"));
  }

  // === Heal ===
  if (card.heal) {
    updatedState = heal(updatedState, card.heal);
    effects.push("+".concat(card.heal, " HP"));
  }

  // === Permanently Upgrade Cards in Deck ===
  if (card.permanentlyUpgradeRandomCardsInDeck) {
    var numToUpgrade = Math.min(card.permanentlyUpgradeRandomCardsInDeck, updatedState.campaign.deck.length);
    var upgradedDeck = permanentlyUpgradeRandomCardsInDeck(updatedState.campaign.deck, numToUpgrade);
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      campaign: _objectSpread(_objectSpread({}, updatedState.campaign), {}, {
        deck: upgradedDeck
      })
    });
    effects.push("Upgraded ".concat(numToUpgrade, " card(s) in deck"));
  }

  // === Permanently Upgrade Cards in Hand ===
  if (card.permanentlyUpgradeRandomCardsInHand) {
    var _numToUpgrade2 = Math.min(card.permanentlyUpgradeRandomCardsInHand, updatedState.combat.hand.length);
    var upgradedHand = permanentlyUpgradeRandomCardsInDeck(updatedState.combat.hand, _numToUpgrade2);
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, {
        hand: upgradedHand
      })
    });
    effects.push("Upgraded ".concat(_numToUpgrade2, " card(s) in hand"));
  }

  // === Weaken Enemy by Percent (e.g., Poison)
  if (card.weakenEnemyHpPercent > 0) {
    var _updatedState$combat$;
    var percent = card.weakenEnemyHpPercent;
    var baseHp = ((_updatedState$combat$ = updatedState.combat.enemy) === null || _updatedState$combat$ === void 0 ? void 0 : _updatedState$combat$.hp) || 0;
    var poisonDamage = Math.floor(baseHp * percent);
    if (poisonDamage > 0) {
      updatedState = dealDamage(updatedState, poisonDamage, [DAMAGE_TYPES.POISON], {
        isBonus: true
      });
      effects.push("Dealt ".concat(poisonDamage, " poison damage (max HP % effect)"));
    }
  }

  // === Flat Damage ===
  if (card.damage) {
    var types = Array.isArray(card.damageTypes) && card.damageTypes.length > 0 ? card.damageTypes : [DAMAGE_TYPES.BUNNY];
    updatedState = dealDamage(updatedState, card.damage, types);
    effects.push("Dealt ".concat(card.damage, " ").concat(types.join("/"), " damage"));
  }

  // === Rolled Damage (e.g., Lightning) ===
  if (card.damageRoll && typeof card.damageRoll.dice === "number" && typeof card.damageRoll.sides === "number") {
    var _card$damageRoll = card.damageRoll,
      dice = _card$damageRoll.dice,
      sides = _card$damageRoll.sides,
      _card$damageRoll$flat = _card$damageRoll.flatBonus,
      flatBonus = _card$damageRoll$flat === void 0 ? 0 : _card$damageRoll$flat;
    var damage = rollDice(dice, sides, flatBonus);
    var _types = Array.isArray(card.damageTypes) && card.damageTypes.length > 0 ? card.damageTypes : [DAMAGE_TYPES.BUNNY];
    updatedState = dealDamage(updatedState, damage, _types);
    var typeList = _types.join(" & ");
    effects.push("Dealt ".concat(damage, " ").concat(typeList, " damage"));
  }

  /// === Upgrade on Cast (if applicable) ===
  if (card.upgradesOnCast) {
    var upgradedCard = upgradeCard(card, card.upgradesOnCast);

    // === Update campaign deck with upgraded version
    updatedState = upgradeSpecificCardInCampaignDeck(updatedState, card, card.upgradesOnCast);
    var destination = upgradedCard.exileOnCast ? "exile" : "graveyard";
    var updatedSpellbook = updatedState.combat.spellbook.filter(function (c) {
      return c.name !== card.name;
    });
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, _defineProperty({
        spellbook: updatedSpellbook
      }, destination, [].concat(_toConsumableArray(updatedState.combat[destination]), [upgradedCard]))),
      trashpile: [].concat(_toConsumableArray(updatedState.trashpile || []), [card]),
      log: ["Cast ".concat(card.name, ": ").concat(effects.join(", "))].concat(_toConsumableArray(updatedState.log))
    });
    return checkCombatEndViaDeath(updatedState);
  } else {
    // === Move to Exile or Graveyard ===
    var _destination = card.exileOnCast ? "exile" : "graveyard";
    var _updatedSpellbook = updatedState.combat.spellbook.filter(function (c) {
      return c.name !== card.name;
    });
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      combat: _objectSpread(_objectSpread({}, updatedState.combat), {}, _defineProperty({
        spellbook: _updatedSpellbook
      }, _destination, [].concat(_toConsumableArray(updatedState.combat[_destination]), [card]))),
      trashpile: [].concat(_toConsumableArray(updatedState.trashpile || []), [card]),
      log: ["Cast ".concat(card.name, ": ").concat(effects.join(", "))].concat(_toConsumableArray(updatedState.log))
    });
    return checkCombatEndViaDeath(updatedState);
  }
}
function combatEnd(state) {
  var _context$result, _updatedState$combat3;
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  console.log(">>> Entered combatEnd with context:", context);
  if (!state.combat || state.currentPhase === PHASES.COMBAT_END) {
    return state; // Already ended or invalid
  }
  var updatedState = _objectSpread({}, state);
  var result = (_context$result = context.result) !== null && _context$result !== void 0 ? _context$result : "loss";
  var victory = result === "win";
  var enemy = (_updatedState$combat3 = updatedState.combat) === null || _updatedState$combat3 === void 0 ? void 0 : _updatedState$combat3.enemy;

  // === Call relic triggers for COMBAT_END
  updatedState = checkRelicTriggers(updatedState, TRIGGER_EVENTS.COMBAT_END);

  // === Handle victory
  if (victory) {
    var _updatedState$combat$2, _enemy$loot, _updatedState$defeate;
    var rewards = [].concat(_toConsumableArray((_updatedState$combat$2 = updatedState.combat.rewards) !== null && _updatedState$combat$2 !== void 0 ? _updatedState$combat$2 : []), _toConsumableArray((_enemy$loot = enemy === null || enemy === void 0 ? void 0 : enemy.loot) !== null && _enemy$loot !== void 0 ? _enemy$loot : []));
    var defeatedEnemies = [].concat(_toConsumableArray((_updatedState$defeate = updatedState.defeatedEnemies) !== null && _updatedState$defeate !== void 0 ? _updatedState$defeate : []), [enemy]);
    if (enemy !== null && enemy !== void 0 && enemy.isBoss) {
      var _updatedState$stage;
      var bossRelic = getRandomBossRelic();
      if (bossRelic) rewards.push(bossRelic);
      var newStage = ((_updatedState$stage = updatedState.stage) !== null && _updatedState$stage !== void 0 ? _updatedState$stage : 0) + 1;
      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        stage: newStage,
        log: ["\uD83C\uDFC6 You defeated a boss! Stage increased to ".concat(newStage, ".")].concat(_toConsumableArray(updatedState.log))
      });
    }
    updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
      defeatedEnemies: defeatedEnemies
    });
    console.log("[DEBUG] Boss defeated, checking for game over. Stage =", updatedState.stage);

    // 🧠 Check if the game is over BEFORE assigning rewards
    updatedState = checkGameOver(updatedState);
    if (!updatedState.gameOverResult) {
      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        offerings: _objectSpread(_objectSpread({}, updatedState.offerings), {}, {
          combatRewards: rewards
        })
      });
    }
  } else {
    var _updatedState$combat$3, _updatedState$combat4;
    // === Handle defeat
    var remainingEnemyHp = (_updatedState$combat$3 = (_updatedState$combat4 = updatedState.combat) === null || _updatedState$combat4 === void 0 || (_updatedState$combat4 = _updatedState$combat4.enemy) === null || _updatedState$combat4 === void 0 ? void 0 : _updatedState$combat4.hp) !== null && _updatedState$combat$3 !== void 0 ? _updatedState$combat$3 : 0;
    if (enemy !== null && enemy !== void 0 && enemy.isBoss) {
      updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
        gameOverResult: "loss",
        log: ["\u2620\uFE0F You were defeated by the boss ".concat(enemy.name, ". Your journey ends here.")].concat(_toConsumableArray(updatedState.log))
      });
    } else {
      if (remainingEnemyHp > 0) {
        var _enemy$name;
        updatedState = takeDamage(updatedState, remainingEnemyHp, {
          skipDeathCheck: true
        });
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          log: ["\u2620\uFE0F You were defeated by ".concat((_enemy$name = enemy === null || enemy === void 0 ? void 0 : enemy.name) !== null && _enemy$name !== void 0 ? _enemy$name : "the enemy", " and took ").concat(remainingEnemyHp, " damage.")].concat(_toConsumableArray(updatedState.log))
        });
      } else {
        var _enemy$name2;
        updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
          log: ["\u2620\uFE0F You were defeated by ".concat((_enemy$name2 = enemy === null || enemy === void 0 ? void 0 : enemy.name) !== null && _enemy$name2 !== void 0 ? _enemy$name2 : "the enemy.")].concat(_toConsumableArray(updatedState.log))
        });
      }
      console.log("[DEBUG] Player defeated. Health:", updatedState.health);
      updatedState = checkGameOver(updatedState);
    }
  }

  // === Clean up combat state
  var cleanedCombat = _objectSpread(_objectSpread({}, updatedState.combat), {}, {
    spellbook: [],
    hand: [],
    graveyard: [],
    bunnies: 0
  });

  // === Determine next phase
  var finalState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: cleanedCombat
  });
  console.log("[DEBUG] Final combatEnd state. Game over?", finalState.gameOverResult);
  if (finalState.gameOverResult) {
    finalState = advancePhaseTo(finalState, PHASES.GAME_OVER);
    finalState = _objectSpread(_objectSpread({}, finalState), {}, {
      log: ["\uD83D\uDED1 Game Over: ".concat(finalState.gameOverResult)].concat(_toConsumableArray(finalState.log))
    });
  } else {
    finalState = advancePhaseTo(finalState, PHASES.COMBAT_END);
  }
  return handlePhaseTransitions(finalState);
}
function closeCombatRewards(state) {
  var _state$offerings2;
  var hasUnclaimedLoot = ((_state$offerings2 = state.offerings) === null || _state$offerings2 === void 0 ? void 0 : _state$offerings2.combatRewards) && state.offerings.combatRewards.length > 0;

  // Optional: Log message about skipping loot
  var logEntry = hasUnclaimedLoot ? "Skipped remaining combat loot." : "Combat complete.";
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      combatRewards: [] // clear the rewards
    }),
    log: [logEntry].concat(_toConsumableArray(state.log))
  });
  var pathState = advancePhaseTo(newState, PHASES.PATH_SELECTION);
  return handlePhaseTransitions(pathState);
}
function checkGameOver(state) {
  var playerDead = state.health <= 0;
  var defeatedBosses = (state.defeatedEnemies || []).filter(function (enemy) {
    return enemy.isBoss;
  }).length;
  console.log("[DEBUG] checkGameOver called. Health:", state.health, "Bosses defeated:", defeatedBosses);
  if (playerDead) {
    return _objectSpread(_objectSpread({}, state), {}, {
      gameOverResult: "loss"
    });
  }
  if (defeatedBosses >= 3) {
    return _objectSpread(_objectSpread({}, state), {}, {
      gameOverResult: "victory"
    });
  }
  return state;
}
function gameOver(state, result) {
  return _objectSpread(_objectSpread({}, state), {}, {
    gameResult: result,
    currentPhase: PHASES.GAME_OVER,
    log: ["\uD83D\uDED1 Game Over: ".concat(result)].concat(_toConsumableArray(state.log))
  });
}
function exitShop(state) {
  var cleanedState = _objectSpread(_objectSpread({}, state), {}, {
    offerings: _objectSpread(_objectSpread({}, state.offerings), {}, {
      shopfront: [] // Clear the shop
    }),
    log: ["🛒 Exited the shop."].concat(_toConsumableArray(state.log))
  });

  // Use your phase transition helpers to change to the next phase
  return handlePhaseTransitions(advancePhaseTo(cleanedState, PHASES.PATH_SELECTION));
}
function rollDice(numDice, sidesPerDie) {
  var flatBonus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var total = 0;
  for (var i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * sidesPerDie) + 1;
  }
  return total + flatBonus;
}
function upgradeSpecificCardInCampaignDeck(state, card) {
  var _state$campaign2;
  var upgrades = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!(state !== null && state !== void 0 && (_state$campaign2 = state.campaign) !== null && _state$campaign2 !== void 0 && _state$campaign2.deck) || !Array.isArray(state.campaign.deck)) {
    console.error("No valid campaign deck found in state.");
    return state;
  }
  var deck = _toConsumableArray(state.campaign.deck);
  var index = deck.findIndex(function (c) {
    return c.name === card.name;
  });
  if (index === -1) {
    console.warn("Card not found in campaign deck: ".concat(card.name));
    return state;
  }
  deck[index] = upgradeCard(deck[index], upgrades);
  return _objectSpread(_objectSpread({}, state), {}, {
    campaign: _objectSpread(_objectSpread({}, state.campaign), {}, {
      deck: deck
    })
  });
}
function getShopPriceMultiplier(state) {
  return state.relicBelt.reduce(function (multiplier, relic) {
    var _relic$triggers3;
    var effect = (_relic$triggers3 = relic.triggers) === null || _relic$triggers3 === void 0 ? void 0 : _relic$triggers3[TRIGGER_EVENTS.ASSIGN_SHOP_PRICES];
    return effect !== null && effect !== void 0 && effect.shopPriceMultiplier ? multiplier * effect.shopPriceMultiplier : multiplier;
  }, 1);
}
function mulligan(state) {
  var updatedState = _objectSpread({}, state);
  var combat = updatedState.combat;
  if (!combat || combat.mulligans <= 0) {
    console.warn("Cannot mulligan: no mulligans remaining.");
    return updatedState;
  }
  var handSize = combat.hand.length;

  // Move hand to graveyard
  updatedState = _objectSpread(_objectSpread({}, updatedState), {}, {
    combat: _objectSpread(_objectSpread({}, combat), {}, {
      hand: [],
      graveyard: [].concat(_toConsumableArray(combat.graveyard), _toConsumableArray(combat.hand)),
      mulligans: combat.mulligans - 1
    }),
    log: ["\uD83D\uDD04 Mulliganed ".concat(handSize, " card(s).")].concat(_toConsumableArray(updatedState.log))
  });

  // Draw the same number of cards
  for (var i = 0; i < handSize; i++) {
    updatedState = drawCard(updatedState);
  }
  return updatedState;
}
function weakenEnemyByPercent(state, percent) {
  var _state$combat11;
  if (!(state !== null && state !== void 0 && (_state$combat11 = state.combat) !== null && _state$combat11 !== void 0 && _state$combat11.enemy) || typeof state.combat.enemy.hp !== "number" || percent <= 0) {
    console.warn("Invalid state or percent passed to weakenEnemyByPercent.");
    return state;
  }
  var enemyMaxHp = state.combat.enemy.hp;
  var damage = Math.floor(enemyMaxHp * percent);
  if (damage <= 0) {
    console.log("No damage dealt by weakenEnemyByPercent (percent = ".concat(percent, ")."));
    return state;
  }
  return dealDamage(state, damage, [], {
    isBonus: true
  });
}

//current bugs/fixes/additions.

//bug with socketing naming (or at least displaying) - eg., Amber Bunnymancy +1 2d5+1 (checkinspect deck render as well as the naming logic, error could be in either place)
// same bug in card offerings too?

//unknown reward dropping from boss
//possible bug between enchant fingertips and thunder cards

//damage taken when losing comabt is too high.

//expanding the game
// a mythic gem that makes a spell cost 1 less ink, be an instant, and exile on cast.

// implement "critical hit" mechanics; cards, gems, and relics, plus three 'critical hit matters' mythics - one that boosts crit amounts,  one that increases crit chance, and one that gives crits to everything.
// a relic that gives the cast spellbook button +10% chance for a 200% crit.
// a gem that gives the card a 10% chance for double effect on cast.

// implement three boss abilties keyed to the boss name: 'downgrade all cards in enemy deck', '+1 ink cost to all enemy cards', and 'enemy loses 1 hp whenever they play a card'.
// IMPORTANT: implement an enemy ablity that exiles 3 random cards from your deck at combat start, increment value 2. ("Milling")
// IMPORTANT: implement an enemy ability that removes the 1 most-upgraded card in your deck ("Lobotomizing"), increment value 1.

// a potion that does (20+(10*upgrades))*(stage+1) damage.

// enemies with resistances: X% bunny, X% lightning, X% fire, etc.

//reward deck size mechanics:
// make mega bunniplication mult bunnies based on decksize.
// make hand of midas add gold based on decksize.
// make healing light heal based on decksize.
// make rest mechanic heal 2x decksize.

// a relic that on pickup gives you +HP based on the #cards in the campaign deck.
// a relic that on pickup gives you +baseBunnies based on the #cards in the campaign deck.

// a potion that heals based on the #cards in the campaign deck.

//structure & organization:
// refactor into proper file management system - it's really getting too bloated.
// reorganize properly during refactor.
// ensure that all actions and game reducer elements are correctly named and traced on the whitelist.

//implement //firemages hat
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56162" + '/');
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