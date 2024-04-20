const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
let xpText = document.querySelector(".xp");
let healthText = document.querySelector(".health");
let goldText = document.querySelector(".gold");
const text = document.querySelector(".text");

let xp = 0;
let health = 200;
let gold = 300;
let curruntWeapon = 0;
let fighting;
let monsterName;
let monsterHealth = 200
let MonsterStats;

const inventory = ["stick"];

xpText.innerText = xp;
healthText.innerText = health;
goldText.innerText = gold;

let monsterStatsText = document.querySelector(".MonsterStats");
let monsterHealthText  = document.querySelector(".MonsterHealth");
let monsterNameText  = document.querySelector(".MonsterName");

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const locations = [
  {
    name: "town",
    "button text": ["Go to store", "Go to cave", "fight a dragon"],
    "button function": [goStore, goCave, fightDragon],
    text: " Your in town square",
  },
  {
    name: "store",
    "button text": [
      "buy health(10 gold)",
      "buy weapon(20 gold)",
      "go back to town",
    ],
    "button function": [buyYourHealth, buyWeapon, goTown],
    text: " Your in store",
  },

  {
    name: "cave",
    "button text": ["fight wolf", "fight lion", "go back to town"],
    "button function": [fightWolf, fightLion, goTown],
    text: " Your just entered a cave filled with beasts",
  },

  {
    name: "fight",
    "button text": ["attack", "run", "go back to town"],
    "button function": [attack, run, goTown],
    text: " Your monster is near",
  },
];

const weapons = [
  {
    name: "knive",
   power: 25,
  },
  {
    name: "Gun",
   power: 55,
  },
  {
    name: "grenade bomb",
   power: 125,
  },
];

const monsters = [
  { name: "wolf", level: 5, monstershealth: 105 },
  { name: "lion", level: 15, monstershealth: 125 },
  { name: "dragon", level: 25, monstershealth: 155 },
];

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button function"][0];
  button2.onclick = location["button function"][1];
  button3.onclick = location["button function"][2];

  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

//stores

function buyYourHealth() {
  if (gold >= 10) {
    gold -= 10;
    goldText.innerText = gold;

    health += 10;
    healthText.innerText = health;
  } else {
    text.innerText = "You dont have enough gold";
  }
}

function buyWeapon() {
  if (curruntWeapon < weapons.length - 1) {
    if (gold >= 40) {
      gold -= 40;
      goldText.innerText = gold;
      //    console.log(curruntWeapon)
      curruntWeapon++;
      let newWeapon = weapons[curruntWeapon].name;
      text.innerText = "You have purchased" + " " + newWeapon;
      inventory.push(newWeapon);
      text.innerText = "in your inventory you have acquired" + " " + inventory;
      console.log(newWeapon);
    }
  } else {
    text.innerText = "You have already acquired power weapons";
  }
}

function goFight() {
  update(locations[3]);
  monsterName = monsters[fighting].name
  monsterHealth = monsters[fighting].monstershealth
  MonsterStats = monsters[fighting].level

  

  monsterNameText.innerText = monsterName;
  monsterStatsText.innerText = MonsterStats
  monsterHealthText.innerText = monsterHealth
}

//cave monster

function fightWolf() {
  fighting = 0;
  goFight();
}

function fightLion() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

//fight

function attack() {
    
        text.innerText = "You are fighting" + "" + monsters[fighting].name + "..."  + "attack" 
        text.innerText +=   "." + "You attack it with " + weapons[curruntWeapon].name

        health -=  monsters[fighting].level
        healthText.innerText = health

        
        monsterHealth -= weapons[curruntWeapon].power + Math.floor(Math.random()  *  xp) + 1
        monsterHealthText.innerText = monsterHealth
     
       
        if(health <= 0){
            lose()
        }else if(monsterHealth <= 0){
              defeatMonster()
        }
   
   
}

function run() {
    text.innerText = "You Life is low! , Run!!!"
    update(locations[0])
}

function lose(){
    text.innerText = "You lose"
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level  * 6.7) 
    goldText.innerText = gold
     xp += monsters[fighting].level
    xpText.innerText = xp
    text.innerText = "You've defeated the" + "" + monsters[fighting].name
    monsterHealthText.innerText = "Defeated"
     
    update(locations[0])
}