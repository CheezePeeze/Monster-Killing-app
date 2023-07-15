const ATTACK_VALUE = 5;
const MONSTER_ATTACK_VALUE = 9;
const STRONG_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
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
adjustHealthBars(setMaxLife);

function reset() {
	currentPlayerHealth = setMaxLife;
	currentMonsterHealth = setMaxLife;
	resetGame(setMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert("You would be dead but the bons life has saved you");
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You won");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("Monster win");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("You have a draw ");
	}
	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage;
	if (mode === MODE_ATTACK) {
		maxDamage = ATTACK_VALUE;
	} else if (mode === MODE_STRONG_ATTACK) {
		maxDamage = STRONG_ATTACK_VALUE;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
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
	endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHander);
healBtn.addEventListener("click", healPlayerHandler);
