var teams = {
    team1: ['thedoge']
};

var users = {
    thedoge: { firstName: 'Geoffrey', lastName: 'Wu', email: 'geoffreywu1000@gmail.com', discord: 'thedoge#1189', grade: 'College', username: 'thedoge', password: 'ninjakiwi' },
    ThisIsDenry: { firstName: 'Henry', lastName: 'Ding', email: 'hding24@choate.edu', discord: 'ThisIsDenry#0446', grade: 'Sophomore', username: 'ThisIsDenry', password: 'password' },
    chickennugget: { firstName: 'Architesh', lastName: 'Prasad', email: 'architesh.prasad@gmail.com', discord: 'chickennugget#5317', grade: 'Senior', username: 'chickennugget', password: 'password' },
    Fez_Keyreb: { firstName: 'Caleb', lastName: 'Zhao', email: 'cablez326@gmail.com', discord: 'Fez_Keyreb#1555', grade: 'Senior', username: 'Fez_Keyreb', password: 'password' },
    VulcanForge: { firstName: 'Isaac', lastName: 'Zhu', email: 'isaaczhu@gmail.com', discord: 'VulcanForge#8172', grade: 'Senior', username: 'VulcanForge', password: 'password' },
    aurum: { firstName: 'Saheb', lastName: 'Gulati', email: 'saheb4gulati@gmail.com', discord: 'aurum#9391', grade: 'Sophomore', username: 'aurum', password: 'password' },
    cryo: { firstName: 'Peter', lastName: 'Bennett', email: 'pgkbennett@gmail.com', discord: 'cryo#3499', grade: 'Junior', username: 'cryo', password: 'password' },
    Hoatzin: { firstName: 'Jaime', lastName: 'Yu', email: 'jaimelyu@gmail.com', discord: 'Hoatzin#4913', grade: 'Senior', username: 'Hoatzin', password: 'password' },
    arjunkie: { firstName: 'Arjun', lastName: 'Gonuguntla', email: 'gonuguntla.arjun@gmail.com', discord: 'arjunkie#5771', grade: 'Senior', username: 'arjunkie', password: 'password' },
    cymbidium: { firstName: 'Emmy', lastName: '', email: 'zn4.oh2.h2o@gmail.com', discord: 'cymbidium#2318', grade: 'Junior', username: 'cymbidium', password: 'password' },
    aditya: { firstName: 'Aditya', lastName: 'Sivakumar', email: 'adisiv2005@gmail.com', discord: '᲼᲼᲼᲼#8115', grade: 'Senior', username: '᲼᲼᲼᲼', password: 'password' },
    SirMrDudeManGuy: { firstName: 'Raul', lastName: 'Passement', email: 'rpassement2000@gmail.com', discord: 'SirMrDudeManGuy #2448', grade: 'College', username: 'SirMrDudeManGuy ', password: 'password' },
    akul: { firstName: 'Akul', lastName: 'Saxena', email: 'akulsaxena04@gmail.com', discord: 'akul#2711', grade: 'College', username: 'akul', password: 'password' },
    TechnologicalError: { firstName: 'Atharva', lastName: 'Pathak', email: 'apathak3141592@gmail.com', discord: 'TechnologicalError#9832', grade: 'College', username: 'TechnologicalError', password: 'password' },
    Cyaniphor: { firstName: 'Adhitya', lastName: 'Chandra', email: 'adhitya.chandrakumar@gmail.com', discord: 'Cyaniphor#5302', grade: 'Junior', username: 'Cyaniphor', password: 'password' },
    Bomjoe: { firstName: 'Rohit', lastName: 'Hari', email: 'bob.omjoe@gmail.com', discord: 'Bomjoe#9924', grade: 'Senior', username: 'Bomjoe', password: 'password' },
    Viraj: { firstName: 'Viraj', lastName: 'Negandhi', email: 'virajcnegandhi@gmail.com', discord: 'Viraj#0062', grade: 'Senior', username: 'Viraj', password: 'password' },
    a_new_rag: { firstName: 'Anurag', lastName: 'Sodhi', email: 'anusoda976@gmail.com', discord: 'a new rag#0464', grade: 'Junior', username: 'a new rag', password: 'password' },
    ne: { firstName: 'Ne', lastName: 'Dassanayake', email: 'nethakasd@gmail.com', discord: 'ne#8428', grade: 'College', username: 'ne', password: 'password' },
    katy1243: { firstName: 'Katy', lastName: 'Yang', email: 'katy.yang1243@gmail.com', discord: 'katy1243#3263', grade: 'Junior', username: 'katy1243', password: 'password' },
    smol_boi_eli: { firstName: 'Eli', lastName: 'Park', email: 'minseok.park.nc@gmail.com', discord: 'smol boi eli#0562', grade: 'Senior', username: 'smol boi eli', password: 'password' },
    GidTheKid2: { firstName: 'Gideon', lastName: 'Tzafriri', email: 'giditz08@gmail.com', discord: 'GidTheKid2#5584', grade: 'College', username: 'GidTheKid2', password: 'password' },
    Frozensnakes20: { firstName: 'Parthiv', lastName: 'Saravanan', email: 'parthivsarov@hotmail.com', discord: 'Frozensnakes20#1883', grade: 'Freshman', username: 'Frozensnakes20', password: 'password' },
    thecoolchicken: { firstName: 'Rishabh', lastName: '', email: 'rishabhswamy12@gmail.com', discord: 'thecoolchicken#4612', grade: 'College', username: 'thecoolchicken', password: 'password' },
    hexacyanoferrate: { firstName: 'Tanish', lastName: 'Kumar', email: 'tanish.ohs@gmail.com', discord: 'hexacyanoferrate#6716', grade: 'Senior', username: 'hexacyanoferrate', password: 'password' },
    Deadbird402: { firstName: 'Edward', lastName: '', email: 'liedwa06@gmail.com', discord: 'Deadbird402#7703', grade: 'Junior', username: 'Deadbird402', password: 'password' },
    Vish: { firstName: 'Vish', lastName: '', email: 'vishwareddy@gmail.com', discord: 'Vish#8148', grade: 'College', username: 'Vish', password: 'password' },
    minitarrasque: { firstName: 'Isaac', lastName: 'Mammel', email: 'purplepotatoes3@gmail.com', discord: 'minitarrasque#6312', grade: 'College', username: 'minitarrasque', password: 'password' },
    Fingy: { firstName: 'Finny', lastName: 'Valorz', email: 'finnyvalorz@gmail.com', discord: 'Fingy#7153', grade: 'College', username: 'Fingy', password: 'password' },
    noxin: { firstName: 'Noxin', lastName: 'Hanna', email: 'nixonhanna95@gmail.com', discord: 'noxin#0840', grade: 'Junior', username: 'noxin', password: 'password' },
    RussellGeorgi: { firstName: 'Russell', lastName: 'Georgi', email: 'russellgeorgi@gmail.com', discord: 'RussellGeorgi#1178', grade: 'Junior', username: 'RussellGeorgi', password: 'password' },
    pyro: { firstName: 'Patrick', lastName: 'Bennett', email: 'prkbennett@gmail.com', discord: 'pyro#3310', grade: 'Junior', username: 'pyro', password: 'password' },
    oof7373: { firstName: 'Vishnu', lastName: 'Mangipudi', email: 'vishnumangipudi@gmail.com', discord: 'oof7373#2366', grade: 'Freshman', username: 'oof7373', password: 'password' },
    powerpunch2006: { firstName: 'Jishnu', lastName: 'Sanyal', email: 'jishnusanyal2006@gmail.com', discord: 'powerpunch2006#8726', grade: 'Junior', username: 'powerpunch2006', password: 'password' },
    kahtrashcan: { firstName: 'Sarthak', lastName: '', email: 'sarthaka1878@gmail.com', discord: 'kahtrashcan#1966', grade: 'Senior', username: 'kahtrashcan', password: 'password' },
};

function getUsers() {
    return users;
}

function getTeams() {
    return teams;
}

/**
 * 
 * @param {String} username
 * @param {JSON} user 
 * 
 * @returns {Number} -1 if username already exists, 0 if username is valid, 1 if username is invalid 
 */
function addUser(username, user) {
    if (!(username in users)) {
        users[username] = user;
        console.log(user);
        return 0;
    } else {
        return -1;
    }
}

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;