const ATTACK_VALUE = 5;
const MONSTER_ATTACK_VALUE = 9;
const STRONG_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt(
	"Enter the health value for you and the monster",
	"100"
);
let setMaxLife = parseInt(enteredValue);
if (isNaN(setMaxLife) || setMaxLife <= 0) {
	setMaxLife = 100;
}
let currentMonsterHealth = setMaxLife;
let currentPlayerHealth = setMaxLife;
let hasBonusLife = true;
let battleLog = [];
adjustHealthBars(setMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
	let logEntry;
	if (event === LOG_EVENT_PLAYER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: "Monster",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: "Monster",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (event === LOG_EVENT_MONSTER_ATTACK) {
		logEntry = {
			event: event,
			value: value,
			target: "Player",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (event === LOG_EVENT_PLAYER_HEAL) {
		logEntry = {
			event: event,
			value: value,
			target: "Player",
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
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
function reset() {
	currentPlayerHealth = setMaxLife;
	currentMonsterHealth = setMaxLife;
	resetGame(setMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;
	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		playerDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert("You would be dead but the bons life has saved you");
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You won");
		writeToLog(
			LOG_EVENT_GAME_OVER,
			"PLAYER WON",
			currentMonsterHealth,
			currentPlayerHealth
		);
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("Monster win");
		writeToLog(
			LOG_EVENT_GAME_OVER,
			"MONSTER WON",
			currentMonsterHealth,
			currentPlayerHealth
		);
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("You have a draw ");
		writeToLog(
			LOG_EVENT_GAME_OVER,
			"A DRAW",
			currentMonsterHealth,
			currentPlayerHealth
		);
	}
	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage;
	let logEvent;
	if (mode === MODE_ATTACK) {
		maxDamage = ATTACK_VALUE;
		logEvent = LOG_EVENT_PLAYER_ATTACK;
	} else if (mode === MODE_STRONG_ATTACK) {
		maxDamage = STRONG_ATTACK_VALUE;
		logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
	endRound();
}
function attackHandler() {
	return attackMonster(MODE_ATTACK);
}
function strongAttackHander() {
	return attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
	let healValue;
	if (currentPlayerHealth >= setMaxLife - HEAL_VALUE) {
		healValue = setMaxLife - currentPlayerHealth;
	} else {
		healValue = HEAL_VALUE;
	}
	increasePlayerHealth(HEAL_VALUE);
	currentPlayerHealth += HEAL_VALUE;
	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentMonsterHealth,
		currentPlayerHealth
	);
	endRound();
}
function printLogHandler() {
	console.log(battleLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHander);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
