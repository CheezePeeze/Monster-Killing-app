
const PLAYER_ATTACK_VALUE = 7;
const MONSTER_ATTACK_VALUE = 9;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let dynamicHealthBar = prompt("enter the desirable number of Health", "100");
let basicHealthBar = parseInt(dynamicHealthBar);
if (isNaN(basicHealthBar) || basicHealthBar < 0) {
	basicHealthBar = 120;
}
let currentMonsterHealth = basicHealthBar;
let currentPlayerHealth = basicHealthBar;
let hasBonusLife = true;
let battleLog = [];
adjustHealthBars(basicHealthBar);

function writeToLog(event, value, monsterHealth, playerHealth) {
	let logEntry;
	if (event === LOG_EVENT_PLAYER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
			target: "Monster",
		};
	} else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
			target: "Monster",
		};
	} else if (event === LOG_EVENT_MONSTER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
			target: "Player",
		};
	} else if (event === LOG_EVENT_PLAYER_HEAL) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
			target: "Player",
		};
	} else if (event === LOG_EVENT_GAME_OVER) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	}
	battleLog.push(logEntry);
}

function endGame() {
	currentMonsterHealth = basicHealthBar;
	currentPlayerHealth = basicHealthBar;
	resetGame(basicHealthBar);
}
function attackAction() {
	const initialPlayerHealth = currentPlayerHealth;
	const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= monsterDamage;
	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		monsterDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
	if (currentPlayerHealth < 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
	}
	if (currentMonsterHealth >= 0 && currentPlayerHealth < 0) {
		writeToLog(
			LOG_EVENT_MONSTER_ATTACK,
			"Monster WON",
			currentMonsterHealth,
			currentPlayerHealth
		);
		alert("Monster Win");
	} else if (currentPlayerHealth >= 0 && currentMonsterHealth < 0) {
		writeToLog(
			LOG_EVENT_MONSTER_ATTACK,
			"Player WON",
			currentMonsterHealth,
			currentPlayerHealth
		);
		alert("Player win ");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		writeToLog(
			LOG_EVENT_GAME_OVER,
			"A DRAW",
			currentMonsterHealth,
			currentPlayerHealth
		);
		alert("draw");
	}
	if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
		endGame();
	}
}

function switchMode(mode) {
	//! ternary operator condition
	const optDamage =
		mode === MODE_ATTACK ? MONSTER_ATTACK_VALUE : STRONG_ATTACK_VALUE;
	const logEvent =
		mode === MODE_ATTACK
			? LOG_EVENT_PLAYER_ATTACK
			: LOG_EVENT_PLAYER_STRONG_ATTACK;
	// 	//! common if else condition
	// let optDamage;
	// let logEvent;

	// if (mode === "ATTACK") {
	// 	optDamage = MONSTER_ATTACK_VALUE;
	// 	logEvent = LOG_EVENT_PLAYER_ATTACK;
	// } else if (mode === "STRONG_ATTACK") {
	// 	optDamage = STRONG_ATTACK_VALUE;
	// 	logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
	// }
	const playerDamage = dealMonsterDamage(optDamage);
	currentMonsterHealth -= playerDamage;
	writeToLog(logEvent, optDamage, currentMonsterHealth, currentPlayerHealth);
	attackAction();
}

function monsterAttackHandler() {
	return switchMode(MODE_ATTACK);
}

function strongMonsterAttackHandler() {
	return switchMode(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
	let healValue;
	if (currentPlayerHealth >= basicHealthBar - HEAL_VALUE) {
		healValue = basicHealthBar - currentPlayerHealth;
	} else {
		healValue = HEAL_VALUE;
	}
	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentMonsterHealth,
		currentPlayerHealth
	);
	increasePlayerHealth(HEAL_VALUE);
	currentPlayerHealth += HEAL_VALUE;
	attackAction();
}
function printLogHandler() {
	console.log(battleLog);
}

attackBtn.addEventListener("click", monsterAttackHandler);
strongAttackBtn.addEventListener("click", strongMonsterAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
