var express = require('express');
var app = express();
var path = require('path');
const PORT = "5555";

var toolHashs = require('./public/js/server/sha1.js');

var server = app.listen(PORT, function () {
	console.log(new Date().getTime());
	console.log('Program running on port : ' + PORT);
	//get IP
	let ifaces = require('os').networkInterfaces();
	Object.keys(ifaces).forEach(function (ifname) {
		var alias = 0;

		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				return;
			}

			if (alias >= 1) {
				// this single interface has multiple ipv4 addresses
				console.log(ifname + ':' + alias, iface.address);
			} else {
				// this interface has only one ipv4 adress
				console.log(ifname, iface.address);
			}
			++alias;
		});
	});
});

var mysql = require('mysql');
var conDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "project1"
});

conDB.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});

var io = require('socket.io').listen(server);

app.use(express.static('public'));

function getHeaderPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/header.html'));
}

function getFooterPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/footer.html'));
}

function getIndexPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
}

function getLoginPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/login.html'));
}

function getRegisterPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/register.html'));
}

function getRegisterFinishPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/register-finish.html'));
}

function getJoinPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/join.html'));
}

function getHomePage(req, res) {
	res.sendFile(path.join(__dirname + '/views/homepage.html'));
}

function getProfilePage(req, res) {
	res.sendFile(path.join(__dirname + '/views/profile.html'));
}

function getCreateQuizPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/create-quiz.html'));
}

function getFindQuizPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/find-quiz.html'));
}

function getHistoryPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/history.html'));
}

function getViewHistoryPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/view-history.html'));
}

function getRoomPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/room.html'));
}

function getRoomHostPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/room-host.html'));
}

function getRoomTeacherPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/room-teacher.html'));
}

function getRoomStudentPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/room-student.html'));
}

function getBlocklyPage(req, res) {
	res.sendFile(path.join(__dirname + '/views/blockly1.html'));
}

app.get('/', getIndexPage);
app.get('/header', getHeaderPage);
app.get('/footer', getFooterPage);
app.get('/login', getLoginPage);
app.get('/register', getRegisterPage);
app.get('/register-finish', getRegisterFinishPage);
app.get('/join', getJoinPage);
app.get('/home', getHomePage);
app.get('/profile', getProfilePage);
app.get('/create-quiz', getCreateQuizPage);
app.get('/find-quiz', getFindQuizPage);
app.get('/history', getHistoryPage);
app.get('/view-history', getViewHistoryPage);
app.get('/room', getRoomPage);
app.get('/room-host', getRoomHostPage);
app.get('/room-teacher', getRoomTeacherPage);
app.get('/room-student', getRoomStudentPage);
app.get('/blockly', getBlocklyPage);

/** ------------------------------------------------------------------------------------------- */

// client manager

var USER_DATAS = [];
function UserObj(username, key) {
	this.username = username;
	//generate token
	this.token = username + "-" + toolHashs.sha1(key + "" + new Date().getTime());
	this.room = "";
	this.timeOut = new Date().getTime();
}

function Study(name, roomKey) {
	this.name = name;
	this.token = name + "-" + toolHashs.sha1(name + roomKey + "" + new Date().getTime());
	this.room = "";
	this.socket = "";
	this.score = 0;
}

var ROOM_DATAS = [];

var RoomObj = function (hostname) {
	this.id = "[room]" + toolHashs.sha1(hostname + "" + new Date().getTime());
	this.roomKey;
	do{
		this.roomKey = Math.floor(Math.random() * 100000);
	}while(ROOM_DATAS.findIndex(x => x.roomKey == this.roomKey) > -1);
	this.host = hostname;
	this.socket = "";
	this.studys = [];
	this.status = "wait";
	this.join = function (name, roomKey) {
		let study = {};
		if (this.roomKey == roomKey) {
			if (this.studys.findIndex(x => x.name == name) == -1) {
				study = new Study(name, roomKey);
				this.studys.push(study);
			} else {
				return { study: study, status: "name" };
			}
		} else {
			return { study: study, status: "roomKey" };
		}
		return { study: study, status: true };
	}
	this.kick = function (name) {
		let indexStd = this.studys.findIndex(x => x.name == name);
		if (indexStd != -1) {
			this.studys.splice(indexStd, 1);
		}
	}
	this.getMember = function () {
		let list = [];
		for (let i in this.studys) {
			list.push(this.studys[i].name);
		}
		return list;
	}
}
//socket.id ดูไอดี socket ของ client

io.sockets.on('connection', function (socket) {

	/*conDB.query("SELECT * FROM teacher",
		function (err, result, fields) {
			if (err) throw err;
			//console.log(result);
		}
	);*/

	socket.on('login', function (data) { // (username, key)
		try {
			console.log("login");
			let username = data.username;
			let key = data.key;
			if (typeof username === 'undefined' || typeof key === 'undefined') { //check not value
				return;
			}
			if (username == "" || key == "") { //check empty
				return;
			}

			dbCheckLogin(username, key, function (cb) {
				if (cb.err) {
					if (cb.msg == "password") {
						console.log(key);
						io.to(socket.id).emit("login", { status: false });
					} else {
						console.log(cb.msg);
					}
				} else {
					console.log(username + ' is logon.');
					let userData = createUser(username, key);
					console.log(cb);
					io.to(socket.id).emit("login", { user: cb.user, token: userData.token, status: true });
				}
			});
			//check password
			/*if(ฐานช้อมูล.key != key){
				//send status login false to client
				socket.emit("login",{status:false});
				return;
			}*/
			/*let userData = createUser(username , key);
			//callback
			io.to(socket.id).emit("login",{username:username,token:userData.token,status:true});
			console.log("login >> "+userData.username , userData.token);

			console.log(USER_DATAS);*/

		} catch (error) {
			console.log(error);
		}
	});

	socket.on('register', function (data) { // (username, key)
		try {
			console.log("register");
			let firstname = data.firstname;
			let lastname = data.lastname;
			let username = data.username;
			let password = data.password;
			let confirmpassword = data.confirmpassword;
			let email = data.email;
			if (typeof firstname === 'undefined' || typeof lastname === 'undefined' || typeof username === 'undefined'
				|| typeof password === 'undefined' || typeof confirmpassword === 'undefined' || typeof email === 'undefined') { //check not value
				return;
			}
			if (firstname == "" || lastname == "" || username == "" || password == "" || confirmpassword == "" || email == "") { //check empty
				return;
			}

			dbCheckRegister(username, function (cb) {
				if (cb.err) {
					if (cb.msg == "username") {
						console.log(cb.msg);
						io.to(socket.id).emit("register", { msgerror: "ชื่อผู้ใช้ซ้ำ" });
					} else {
						console.log(cb.msg);
						io.to(socket.id).emit("register", { msgerror: "เกิดข้อผิดพลาด" });
					}
				} else if (password != confirmpassword) {
					console.log("password");
					io.to(socket.id).emit("register", { msgerror: "รหัสผ่านไม่ตรงกัน" });
				} else {
					dbInsertRegister(firstname, lastname, username, password, email, function (cb) {
						if (cb.err) {
							console.log(cb.msg);
							io.to(socket.id).emit("register", { msgerror: "เกิดข้อผิดพลาด" });
						} else {
							console.log(username + ' is register.');
							io.to(socket.id).emit("register", { msgerror: "" });
						}
					});
				}
			});

		} catch (error) {
			console.log(error);
		}
	});

	socket.on('create room', function (data) { // (token)
		try {
			let token = data.token;
			let indexUser = USER_DATAS.findIndex(x => x.token == token);
			if (indexUser == -1) {
				return;
			}
			let hostname = USER_DATAS[indexUser].username;
			let room = createRoom(hostname);
			console.log(USER_DATAS);
			console.log('room created!');
			socket.emit('create room', { room: room.id, roomKey: room.roomKey });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('join room', function (data) { // (name, roomKey)
		try {
			let name = data.name;
			let roomKey = data.roomKey;
			let indexRoom = ROOM_DATAS.findIndex(x => x.roomKey == roomKey);
			console.log(indexRoom, roomKey, 'join');
			if (indexRoom == -1) {
				socket.emit('join room', { status: "roomKey" });
				return;
			}
			let tmp = ROOM_DATAS[indexRoom].join(name, roomKey);
			socket.emit('join room', { study: tmp.study, room: ROOM_DATAS[indexRoom].id, status: tmp.status });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('enter room', function (data) { // (roomId, token)
		try {
			let roomId = data.room;
			let token = data.token;
			let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
			console.log(indexRoom, roomId, 'enter');
			if (indexRoom == -1) {
				return;
			}
			let indexUser = USER_DATAS.findIndex(x => x.token == token);
			let indexStd = ROOM_DATAS[indexRoom].studys.findIndex(x => x.token == token);
			if (indexUser != -1) {
				if (ROOM_DATAS[indexRoom].host == USER_DATAS[indexUser].username) {
					ROOM_DATAS[indexRoom].socket = socket.id;
				}
			} else if (indexStd != -1) {
				ROOM_DATAS[indexRoom].studys[indexStd].socket = socket.id;
			} else {
				return;
			}
			sendRoom(ROOM_DATAS[indexRoom].id, 'room member list', ROOM_DATAS[indexRoom].getMember());
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('QA-tch', function (data) { // (roomId, token)
		try {
			let roomId = data.room;
			let token = data.token;
			let std = data.std;
			let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
			console.log(indexRoom, roomId, 'enter');
			if (indexRoom == -1) {
				return;
			}
			for (let i in std) {
				let indexStd = ROOM_DATAS[indexRoom].studys.findIndex(x => x.name == std[i].name);
				console.log("Xxxxxxxxx", indexStd);
				if (indexStd == -1) {
					break;
				}
				console.log("x");
				io.to(ROOM_DATAS[indexRoom].studys[indexStd].socket).emit('QA-std', { check: std[i].check, score: std[i].score });
			}
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('QA-std', function (data) { // (roomId, token)
		try {
			let roomId = data.room;
			let token = data.token;
			let text = data.text;
			let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
			console.log(indexRoom, roomId, 'enter');
			if (indexRoom == -1) {
				return;
			}
			let indexStd = ROOM_DATAS[indexRoom].studys.findIndex(x => x.token == token);
			let name = "";
			if (indexStd != -1) { //student
				name = ROOM_DATAS[indexRoom].studys[indexStd].name;
			} else {
				return;
			}
			console.log(name + " :" + text);
			sendTeacher(ROOM_DATAS[indexRoom].id, 'QA-tch', { name: name, text: text });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('test', function (data) {
		try {
			test1(data.id);
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('save-quiz', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('save-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbInsertQuiz(data.qname, data.qdesc, username, data.xmlcode, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('save-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('save-quiz', { err: false, qid: cb.msg.insertId });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('update-quiz', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('save-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbUpdateQuiz(data.qid, data.qname, data.qdesc, username, data.xmlcode, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('save-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('save-quiz', { err: false, qid: data.qid });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('delete-quiz', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('save-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbDeleteQuiz(data.qid, username, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('delete-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('delete-quiz', { err: false, qid: data.qid });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('get-quiz-username', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('get-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbSelectQuizByUsername(username, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('get-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('get-quiz', { err: false, qlist: cb.msg });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('get-quiz-id', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('get-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbSelectQuiz(data.qid, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('get-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('get-quiz', { err: false, qlist: cb.msg });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('get-quiz-find', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('get-quiz', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}

			dbSelectQuizAll(function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('get-quiz', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('get-quiz', { err: false, qlist: cb.msg });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('save-history', function (data) {
		try {
			let history = data.history;
			let username = tokenToUsername(data.token);
			if (username == "") {
				console.log("USERNAME TO TOKEN WRONG");
				return;
			}
			dbInsertHistory(username, history, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
				} else {
					console.log(cb.msg);
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('get-history-username', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('get-history', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}

			dbSelectHistoryUsername(username, function (cb) {
				if (cb.err) {
					console.log("\n\n\n");
					console.log(cb.msg);
					console.log("\n\n\n");
					socket.emit('get-history', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('get-history', { err: false, historys: cb.msg });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('delete-history', function (data) {
		try {
			let username = tokenToUsername(data.token);
			if (username == "") {
				socket.emit('get-history', { err: true, msg: "ระบบไม่สามารถตรวจสอบชื่อผู้ใข้ได้ กรุณาเข้าสู่ระบบอีกครั้ง" });
				return;
			}
			dbDeleteHistory(data.hid, username, function (cb) {
				if (cb.err) {
					console.log(cb.msg);
					socket.emit('delete-history', { err: true, msg: "เกิดข้อผิดพลาดกับฐานข้อมูล" });
				} else {
					socket.emit('delete-history', { err: false, hid: data.hid });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});


	/*socket.on('room member list', function(data) { // (roomId)
		try {
			console.log(ROOM_DATAS);
			let memberList = [];
			if(typeof data.room !== "undefined"){
				let indexRoom = ROOM_DATAS.findIndex(x => x.id==data.room);
				if(indexRoom == -1){
					console.log(777);
					return;
				}
				memberList = ROOM_DATAS[indexRoom].getMember();
			}
			else if(typeof data.token !== "undefined"){
				let token = data.token;
				let indexUser = USER_DATAS.findIndex(x => x.token==token);
				if(indexUser==-1){
					console.log(555);
					return;
				}
				let indexRoom = ROOM_DATAS.findIndex(x => x.id==USER_DATAS[indexUser].room);
				if(indexRoom == -1){
					return;
				}
				console.log(666);
				memberList = ROOM_DATAS[indexRoom].getMember();
			}
			console.log('what',memberList);
			socket.emit('room member list', {memberList: memberList});
		} catch (error) {
			console.log(error);
		}
	});*/

	/** when socket disconnect */
	socket.on('disconnect', function () {
		for (let i in ROOM_DATAS) {
			let indexStd = ROOM_DATAS[i].studys.findIndex(x => x.socket == socket.id);
			if (indexStd != -1) {
				ROOM_DATAS[i].kick(ROOM_DATAS[i].studys[indexStd].name);
				sendRoom(ROOM_DATAS[i].id, 'room member list', ROOM_DATAS[i].getMember());
				break;
			}
		}
		console.log(socket.id + " disconnect.");
	});
});

//********************************************** */

function getUserList() {
	let userList = [];
	for (var i in USER_DATAS) {
		userList.push(USER_DATAS[i].username);
	}
	return userList;
}

function createUser(username, key) {
	let indexUser = USER_DATAS.findIndex(x => x.username == username);
	let userData = new UserObj(username, key);
	if (indexUser == -1) {
		USER_DATAS.push(userData);
	} else {
		USER_DATAS[indexUser] = userData;
	}
	return userData;
}

function createRoom(hostname) {
	let room = new RoomObj(hostname);
	ROOM_DATAS.push(room);
	USER_DATAS[USER_DATAS.findIndex(x => x.username == hostname)].room = room.id;
	console.log(ROOM_DATAS);
	return room;
}

function tokenToUsername(token) {
	let indexUser = USER_DATAS.findIndex(x => x.token == token);
	if (indexUser < 0) {
		return "";
	}
	return USER_DATAS[indexUser].username;
}

function checkToken(token) {
	let indexUser = USER_DATAS.findIndex(x => x.token == token);
	if (indexUser < 0) {
		return false;
	}
	// check token timeout
	if (USER_DATAS[indexUser].timeOut < new Date().getTime()) {
		return false;
	}
	//get date --> new Date(new Date().getTime()));
	// 1 sec. = 1000 , 30 min = 30*60*1000 = 1800000
	USER_DATAS[indexUser].timeOut += 1800000;
	return true;
}

function sendRoom(roomId, title, data) {
	let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
	console.log(roomId, title, data);
	for (let i in ROOM_DATAS[indexRoom].studys) {
		io.to(ROOM_DATAS[indexRoom].studys[i].socket).emit(title, data);
	}
	//data.unshift('HOST');
	io.to(ROOM_DATAS[indexRoom].socket).emit(title, data);
}

function sendTeacher(roomId, title, data) {
	let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
	console.log(roomId, title, data);
	//data.unshift('HOST');
	io.to(ROOM_DATAS[indexRoom].socket).emit(title, data);
}

function sendStudent(roomId, title, data) {
	let indexRoom = ROOM_DATAS.findIndex(x => x.id == roomId);
	console.log(roomId, title, data);
	for (let i in ROOM_DATAS[indexRoom].studys) {
		io.to(ROOM_DATAS[indexRoom].studys[i].socket).emit(title, data);
	}
}

/*
 ................................................ |===================| .........................................................
 ................................................ |===================| .........................................................
 ................................................ |===================| .........................................................
 ................................................ |==== DATA BASE ====| .........................................................
 ................................................ |===================| .........................................................
 ................................................ |===================| .........................................................
 ................................................ |===================| .........................................................
 */
//login
function dbCheckLogin(username, password, callback) {
	try {
		conDB.query("SELECT * FROM teacher WHERE username = '" + username + "' AND password = '" + password + "'", function (err, results, fields) {
			if (err) {
				callback({ err: true, msg: err });
			} else if (results.length < 1) {
				callback({ err: true, msg: "password" });
			} else if (results.length == 1) {
				console.log(results[0])
				callback({ err: false, msg: results, user: results[0] })
			} else {
				callback({ err: true, msg: "unknown" })
			}
		});
	} catch (e) {
		console.log(e);
	}
}

//register
function dbCheckRegister(username, callback) {
	conDB.query("SELECT * FROM teacher WHERE username = '" + username + "'", function (err, results, fields) {
		if (err) {
			callback({ err: true, msg: err });
		} else if (results.length < 1) {
			callback({ err: false, msg: "" });
		} else if (results.length == 1) {
			callback({ err: true, msg: "username" })
		} else {
			callback({ err: true, msg: "unknown" })
		}
	});
}

function dbInsertRegister(firstname, lastname, username, password, email, callback) {
	let key = toolHashs.sha1(password);
	conDB.query("INSERT INTO teacher (firstname,lastname,username,password,email) VALUES ( '" +
		firstname + "','" + lastname + "','" + username + "','" + key + "','" + email + "')", function (err, results) {
			if (err) {
				callback({ err: true, msg: err });
			} else {
				callback({ err: false, msg: "" });
			}
		});
}

//quiz
function dbInsertQuiz(name, desc, username, xmlcode, callback) {
	conDB.query("INSERT INTO quiz (name, description, username, xmlcode) VALUES ( '" +
		name + "','" + desc + "','" + username + "','" + xmlcode + "')", function (err, results) {
			if (err) {
				callback({ err: true, msg: err });
			} else {
				callback({ err: false, msg: results });
			}
		});
}

function dbSelectQuiz(id, callback) {
	conDB.query("SELECT * FROM quiz WHERE qid = " + id, function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

function dbSelectQuizByUsername(username, callback) {
	conDB.query("SELECT * FROM quiz WHERE username = '" + username + "'" + " ORDER BY qid DESC", function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

function dbSelectQuizAll(callback) {
	conDB.query("SELECT qid, name, description, quiz.username, xmlcode, firstName, lastName FROM quiz, teacher WHERE quiz.username = teacher.username"
		, function (err, results) {
			if (err) {
				callback({ err: true, msg: err });
			} else {
				callback({ err: false, msg: results });
			}
		});
}

function dbDeleteQuiz(id, username, callback) {
	conDB.query("DELETE FROM quiz WHERE qid = " + id + " AND username = '" + username + "'", function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

function dbUpdateQuiz(id, name, desc, username, xmlcode, callback) {
	let strSql = "UPDATE quiz " +
		"SET name = '" + name + "', " +
		"description = '" + desc + "', " +
		"xmlcode = '" + xmlcode + "' " +
		"WHERE qid=" + id +
		" AND username='" + username + "'";
	conDB.query(strSql, function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

function dbSelectHistoryUsername(username, callback) {
	let sqlStr = "SELECT hid, history.qid, history.username, date, students, name "+
	" FROM history,quiz WHERE history.username = '" + username + "' AND history.qid=quiz.qid "+
	" ORDER BY hid DESC";
	conDB.query(sqlStr, function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

function dbDeleteHistory(id, username, callback) {
	conDB.query("DELETE FROM history WHERE hid = " + id + " AND username = '" + username + "'", function (err, results) {
		if (err) {
			callback({ err: true, msg: err });
		} else {
			callback({ err: false, msg: results });
		}
	});
}

//quiz
function dbInsertHistory(username, history, callback) {
	console.log("\n\n\n");
	console.log(history);
	console.log("\n\n\n");
	let sqlStr = "INSERT INTO history (qid, username, date, students) VALUES("+
	"'"+history.qid+"',"+
	"'"+username+"',"+
	"'"+history.date+"',"+
	"'"+history.students+"'"+
	")";
	conDB.query(sqlStr, function (err, results) {
			if (err) {
				console.log(err,"HISTORY");
				callback({ err: true, msg: err });
			} else {
				console.log(results,"HISTORY");
				callback({ err: false, msg: results });
			}
		});
}

function test1(id) {
	dbUpdateQuiz(1, "q1", "555abc", "code na ja na", function (cb) {
		if (cb.err) {
			console.log(cb.msg);
		} else {
			console.log("OK!!! ", cb.msg);
		}
	});
}