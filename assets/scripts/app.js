const ATTACK_VALUE = 5;
const MONSTER_ATTACK_VALUE = 9;
const STRONG_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let setMaxLife = 100;
let currentMonsterHealth = setMaxLife;
let currentPlayerHealth = setMaxLife;

adjustHealthBars(setMaxLife);

function endRound() {}

function attackMonster(mode) {
	let maxDamage;
	if (mode === "ATTACK") {
		maxDamage = ATTACK_VALUE;
	} else if (mode === "STRONG_ATTACK") {
		maxDamage = STRONG_ATTACK_VALUE;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;
	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You won");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("Monster win");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("You have a draw ");
	}
}
function attackHandler() {
	return attackMonster("ATTACK");
}
function strongAttackHander() {
	return attackMonster("STRONG_ATTACK");
}
function healPlayerHandler() {
	increasePlayerHealth(HEAL_VALUE);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHander);
healBtn.addEventListener("click", healPlayerHandler);
