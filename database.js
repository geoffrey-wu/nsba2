/**
 * Stores all of the teams.
 * Each value represents ['team name', 'gm', 'player1', 'player2', ...]
 */
var teams = {

};

var gms = {
    yabioboi: { firstName: 'Yabioboi', lastName: '', email: 'yabioboi7551@gmail.com', discord: 'yabioboi#3735', grade: '8th grade', username: 'yabioboi', password: 'password' },
    DannyKoz: { firstName: 'Daniel', lastName: 'Kozintsev', email: 'dbk@hundzor.org', discord: 'DannyKoz#8202', grade: 'College', username: 'DannyKoz', password: 'password' },
    earthman: { firstName: 'Kabir', lastName: 'Rahal', email: 'krahal5000@gmail.com', discord: 'earthman#7540', grade: 'Senior', username: 'earthman', password: 'password' },
    devansh: { firstName: 'Devansh', lastName: 'Pandey', email: 'devansh.r.pandey@gmail.com', discord: 'devansh#4113', grade: 'Sophomore', username: 'devansh', password: 'password' },
    Aachen: { firstName: 'adartley123', lastName: '@gmail.com', email: 'adartley123@gmail.com', discord: 'Aachen#0024', grade: 'Senior', username: 'Aachen', password: 'password' },
    mason: { firstName: 'Mason', lastName: 'Yu', email: 'masonyuscience@gmail.com', discord: 'mason#4424', grade: 'Junior', username: 'mason', password: 'password' },
    'dan.k.memes': { firstName: 'Dan', lastName: 'Ni', email: 'dn285@cornell.edu', discord: 'dan.k.memes#5912', grade: 'College', username: 'dan.k.memes', password: 'password' },
    jasmine: { firstName: 'clob', lastName: 'tran', email: 'cobymtran@gmail.com', discord: 'jasmine#4786', grade: 'College', username: 'jasmine', password: 'password' },
    bombadil: { firstName: 'Clarence', lastName: 'Zheng', email: 'clarencekwzheng@gmail.com', discord: 'bombadil#1083', grade: 'College', username: 'bombadil', password: 'password' },
    aastha: { firstName: 'aastha', lastName: 'sharma', email: 'aastha.s.8192@gmail.com', discord: 'aastha#5938', grade: 'Senior', username: 'aastha', password: 'password' },
    'nipu d': { firstName: 'Nipun', lastName: 'Dour', email: 'nipundour@gmail.com', discord: 'nipu d#1641', grade: 'Senior', username: 'nipu d', password: 'password' },
    ThyOwnBoy: { firstName: 'Ivan', lastName: 'Philip', email: 'ivankphilip@gmail.com', discord: 'ThyOwnBoy#6424', grade: 'College', username: 'ThyOwnBoy', password: 'password' },
}

var players = {
    ThisIsDenry: { firstName: 'Henry', lastName: 'Ding', email: 'hding24@choate.edu', discord: 'ThisIsDenry#0446', grade: 'Sophomore', username: 'ThisIsDenry', password: 'password' },
    chickennugget: { firstName: 'Architesh', lastName: 'Prasad', email: 'architesh.prasad@gmail.com', discord: 'chickennugget#5317', grade: 'Senior', username: 'chickennugget', password: 'password' },
    Fez_Keyreb: { firstName: 'Caleb', lastName: 'Zhao', email: 'cablez326@gmail.com', discord: 'Fez_Keyreb#1555', grade: 'Senior', username: 'Fez_Keyreb', password: 'password' },
    VulcanForge: { firstName: 'Isaac', lastName: 'Zhu', email: 'isaaczhu@gmail.com', discord: 'VulcanForge#8172', grade: 'Senior', username: 'VulcanForge', password: 'password' },
    aurum: { firstName: 'Saheb', lastName: 'Gulati', email: 'saheb4gulati@gmail.com', discord: 'aurum#9391', grade: 'Sophomore', username: 'aurum', password: 'password' },
    cryo: { firstName: 'Peter', lastName: 'Bennett', email: 'pgkbennett@gmail.com', discord: 'cryo#3499', grade: 'Junior', username: 'cryo', password: 'password' },
    Hoatzin: { firstName: 'Jaime', lastName: 'Yu', email: 'jaimelyu@gmail.com', discord: 'Hoatzin#4913', grade: 'Senior', username: 'Hoatzin', password: 'password' },
    arjunkie: { firstName: 'Arjun', lastName: 'Gonuguntla', email: 'gonuguntla.arjun@gmail.com', discord: 'arjunkie#5771', grade: 'Senior', username: 'arjunkie', password: 'password' },
    cymbidium: { firstName: 'Emmy', lastName: '', email: 'zn4.oh2.h2o@gmail.com', discord: 'cymbidium#2318', grade: 'Junior', username: 'cymbidium', password: 'password' },
    Aditya: { firstName: 'Aditya', lastName: 'Sivakumar', email: 'adisiv2005@gmail.com', discord: '᲼᲼᲼᲼#8115', grade: 'Senior', username: '᲼᲼᲼᲼', password: 'password' },
    SirMrDudeManGuy : { firstName: 'Raul', lastName: 'Passement', email: 'rpassement2000@gmail.com', discord: 'SirMrDudeManGuy #2448', grade: 'College', username: 'SirMrDudeManGuy ', password: 'password' },
    akul: { firstName: 'Akul', lastName: 'Saxena', email: 'akulsaxena04@gmail.com', discord: 'akul#2711', grade: 'College', username: 'akul', password: 'password' },
    TechnologicalError: { firstName: 'Atharva', lastName: 'Pathak', email: 'apathak3141592@gmail.com', discord: 'TechnologicalError#9832', grade: 'College', username: 'TechnologicalError', password: 'password' },
    Cyaniphor: { firstName: 'Adhitya', lastName: 'Chandra', email: 'adhitya.chandrakumar@gmail.com', discord: 'Cyaniphor#5302', grade: 'Junior', username: 'Cyaniphor', password: 'password' },
    Bomjoe: { firstName: 'Rohit', lastName: 'Hari', email: 'bob.omjoe@gmail.com', discord: 'Bomjoe#9924', grade: 'Senior', username: 'Bomjoe', password: 'password' },
    Viraj: { firstName: 'Viraj', lastName: 'Negandhi', email: 'virajcnegandhi@gmail.com', discord: 'Viraj#0062', grade: 'Senior', username: 'Viraj', password: 'password' },
    'a new rag': { firstName: 'Anurag', lastName: 'Sodhi', email: 'anusoda976@gmail.com', discord: 'a new rag#0464', grade: 'Junior', username: 'a new rag', password: 'password' },
    ne: { firstName: 'Ne', lastName: 'Dassanayake', email: 'nethakasd@gmail.com', discord: 'ne#8428', grade: 'College', username: 'ne', password: 'password' },
    katy1243: { firstName: 'Katy', lastName: 'Yang', email: 'katy.yang1243@gmail.com', discord: 'katy1243#3263', grade: 'Junior', username: 'katy1243', password: 'password' },
    'smol boi eli': { firstName: 'Eli', lastName: 'Park', email: 'minseok.park.nc@gmail.com', discord: 'smol boi eli#0562', grade: 'Senior', username: 'smol boi eli', password: 'password' },
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
    'Amiable Jaekelopterus': { firstName: 'Alexander', lastName: 'Franks', email: 'alexkfranks@gmail.com', discord: 'Amiable Jaekelopterus#6289', grade: 'Senior', username: 'Amiable Jaekelopterus', password: 'password' },
    ChessFun: { firstName: 'Richard', lastName: 'Zhu', email: 'rzhu666@gmail.com', discord: 'ChessFun#5640', grade: 'Senior', username: 'ChessFun', password: 'password' },
    bcao0003: { firstName: 'Boheng', lastName: 'Cao', email: 'bcao32767@gmail.com', discord: 'bcao0003#7441', grade: 'Junior', username: 'bcao0003', password: 'password' },
    LukaIsOP: { firstName: 'Aatreyo', lastName: 'Bhattacharyya', email: 'aatreyo.bhattacharyya@gmail.com', discord: 'LukaIsOP#5558', grade: 'Sophomore', username: 'LukaIsOP', password: 'password' },
    'onerous yakovlev': { firstName: 'Vincent', lastName: 'Du', email: '1418577@gmail.com', discord: 'onerous yakovlev#1476', grade: 'Middle School', username: 'onerous yakovlev', password: 'password' },
    sophie: { firstName: 'Sophie', lastName: '', email: 'sophie.ling.wang@gmail.com', discord: 'sophie#1782', grade: 'Senior', username: 'sophie', password: 'password' },
    'nipu d': { firstName: 'Nipun', lastName: 'Dour', email: 'nipundour@gmail.com', discord: 'nipu d#1641', grade: 'Senior', username: 'nipu d', password: 'password' },
    n95: { firstName: 'Bob', lastName: 'Chen', email: 'bobthefam78@gmail.com', discord: 'n95#4890', grade: 'Sophomore', username: 'n95', password: 'password' },
    TukiTats: { firstName: 'Ronak', lastName: 'Jaisalmeria', email: 'ronak.jaisalmeria@gmail.com', discord: 'TukiTats#7012', grade: 'College', username: 'TukiTats', password: 'password' },
    WeisPickle: { firstName: 'Owen', lastName: 'Weisenberger', email: 'owisepickle@gmail.com', discord: 'WeisPickle#1350', grade: 'Sophomore', username: 'WeisPickle', password: 'password' },
    BeanBoi13: { firstName: 'Saathvik', lastName: 'Gowda', email: 'saathvikgowda2007@gmail.com', discord: 'BeanBoi13#9471', grade: 'Sophomore', username: 'BeanBoi13', password: 'password' },
    ClownFrogg: { firstName: 'Harry', lastName: 'Jin', email: 'redbirdy319@gmail.com', discord: 'ClownFrogg 𓆏#3571', grade: 'Sophomore', username: 'ClownFrogg 𓆏', password: 'password' },
    jucijuce: { firstName: 'Justin', lastName: 'Chen', email: 'jschen6178@gmail.com', discord: 'jucijuce#1534', grade: 'Senior', username: 'jucijuce', password: 'password' },
    reverse: { firstName: 'Yuchen', lastName: 'Li', email: 'yuchenli713@gmail.com', discord: 'reverse#7326', grade: 'College', username: 'reverse', password: 'password' },
    dannyridel: { firstName: 'Daniel', lastName: 'Lu', email: 'dannyridel@protonmail.com', discord: 'dannyridel#2256', grade: 'Sophomore', username: 'dannyridel', password: 'password' },
    DanDan0101: { firstName: 'Daniel', lastName: 'Sun', email: 'danielcsun@hotmail.com', discord: 'DanDan0101#5928', grade: 'College', username: 'DanDan0101', password: 'password' },
    abcisosm5: { firstName: 'William', lastName: 'Huang', email: 'williamhuang678@gmail.com', discord: 'abcisosm5#8971', grade: 'College', username: 'abcisosm5', password: 'password' },
    rbald02: { firstName: 'Ridings', lastName: '', email: 'ridingsbald@gmail.com', discord: 'rbald02#6476', grade: 'College', username: 'rbald02', password: 'password' },
    somath: { firstName: 'Srijan', lastName: 'Oduru', email: 'srijanoduru9@gmail.com', discord: 'somath#6820', grade: 'College', username: 'somath', password: 'password' },
    APandasBamboo: { firstName: 'Sashank', lastName: 'Ganapathiraju', email: 'sashank9912@gmail.com', discord: 'APandasBamboo#3338', grade: 'College', username: 'APandasBamboo', password: 'password' },
    gorilla97: { firstName: 'Pranav', lastName: 'Kosuri', email: 'pranav.kosuri1@gmail.com', discord: 'gorilla97#4016', grade: 'College', username: 'gorilla97', password: 'password' },
    HA: { firstName: 'Harsh', lastName: 'Ambardekar', email: 'ambardekarharsh@gmail.com', discord: 'HA#7810', grade: 'Junior', username: 'HA', password: 'password' },
    DanZ137: { firstName: 'Daniel', lastName: '', email: 'dczhang11@gmail.com', discord: 'DanZ137#6479', grade: 'College', username: 'DanZ137', password: 'password' },
    mmoz999: { firstName: 'Leon', lastName: '', email: 'liang000liang@gmail.com', discord: 'mmoz999#1975', grade: 'College', username: 'mmoz999', password: 'password' },
    MangoPotato: { firstName: 'Rushil', lastName: 'Shah', email: 'rushilshah2@yahoo.com', discord: 'MangoPotato#5460', grade: 'Junior', username: 'MangoPotato', password: 'password' },
    steviewonder24 : { firstName: 'Jacob', lastName: 'Stevens', email: 'jqsefc03@gmail.com', discord: 'steviewonder24 #7171', grade: 'College', username: 'steviewonder24 ', password: 'password' },
};

function getGMs() {
    return gms;
}

function getGM(gmName) {
    return gms[gmName];
}

function getPlayer(playerName) {
    if (playerName in players) {
        return players[playerName];
    } else {
        return null;
    }
}

function getPlayers() {
    return players;
}

function getTeam(teamname) {
    if (teamname in teams) {
        return teams[teamname];
    } else {
        return null;
    }
}

function getTeams() {
    return teams;
}

/**
 * Adds the player to the database. If the player already exists, it will update the player's information.
 * @param {String} playerName
 * @param {JSON} player 
 * 
 * @returns {Number} -1 if username already exists, 0 if username is valid, 1 if username is invalid 
 */
function addPlayer(playerName, player) {
    let status = 1;
    if (!(playerName in players)) {
        console.log(player);
        status = 0
    } else {
        status = -1;
    }
    players[playerName] = player;
    return status;
}

module.exports = {
    addPlayer, getGM, getGMs, getPlayer, getPlayers, getTeam, getTeams
};