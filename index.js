// JSON object
// 1. stringify: Convert an object to a JSON string
// 2. parse: Convert a JSON string to an object

// var myDog = {name: 'Milu', age: 1, dead: false};
// var myDogString = JSON.stringify(myDog);

// var myCatString = '{"name": "Tom", "age": 2, "dead": true}';
// var myCat = JSON.parse(myCatString);
// console.log(myCat.name);

// Exercise
// 1. Show all students
// 2. Create a new student
// 3. Save
// 4. Exit

var fs = require('fs');
var readlineSync = require('readline-sync');

var students = [];

function student(name, gender, weight) {
    this.name = name;
    this.gender = gender;
    this.weight = weight;
}

function loadData() {
    var data = fs.readFileSync('./data.json', { encoding: 'utf8'});
    var list = JSON.parse(data);
    return list;
}

function showMenu() {
    console.log('-----------MENU-------------');
    console.log('1. Show all students');
    console.log('2. Create a new student');
    console.log('3. Save');
    console.log('4. Exit');
    console.log('----------------------------');
    var chooseAnswer = readlineSync.question('Choose: ');

    switch (chooseAnswer) {
        case '1': 
            showStudents();
            showMenu();
            break;
        case '2':
            createStudents();
            showMenu();
            break;
        case '3':
            saveStudents();
            showMenu();
            break;
        case '4':
            checkHaveData();
            break;
        default:
            console.log('Wrong option, please choose again!');
            showMenu();
    }
}

function showStudents() {
    if (!fs.readFileSync('./data.json', { encoding: 'utf8'})) {
        console.log('Nobody in here, please add new student!')
    } else {
        console.log('---------LIST STUDENTS-----------')

        var list = loadData();

        for( var i = 0; i < list.length; i++) {
            console.log('* Student ' + (i+1) + ': ');
            console.log('--- Name: ' + list[i].name);
            console.log('--- Gender: ' + list[i].gender);
            console.log('--- Weight: ' + list[i].weight);
        }
        console.log('----------------------------------');
    }
}

function createStudents() {
    var name = readlineSync.question('Your name: ');
    var gender = readlineSync.question('Your gender (Male/Female/Other): ');
    var weight = readlineSync.question('Your weight: ');
    students.name = name;
    students.gender = gender;
    students.weight = parseInt(weight);

    var createStudent = new student(name, gender, weight);
    students.push(createStudent);
}

function saveStudents() {
    if(!students.length) {
        console.log('Nothing to save, please add new student!');
    } else {

        if(!fs.readFileSync('./data.json', { encoding: 'utf8'})) {
            fs.writeFileSync('./data.json',JSON.stringify(students), { encoding: 'utf8'});
            console.log(JSON.stringify(students));
            console.log('Save done!!! ')
            students = [];
        } else {
            var list = loadData();
            var dataNew = [...list, ...students];
            fs.writeFileSync('./data.json',JSON.stringify(dataNew), { encoding: 'utf8'});
            console.log('Save done!!! ')
            students = [];
        }
    }
}

function checkHaveData() {
    if(!students.length) {
        console.log('Bye!!!');
    } else {
        var question = readlineSync.question('Have a data, do you want save it? (y/n): ');
        if(question === 'y') {
            if(!fs.readFileSync('./data.json', { encoding: 'utf8'})) {
                fs.writeFileSync('./data.json',JSON.stringify(students), { encoding: 'utf8'});
                console.log(JSON.stringify(students));
                console.log('Save done!!! ')
                students = [];
            } else {
                var list = loadData();
                var dataNew = [...list, ...students];
                fs.writeFileSync('./data.json',JSON.stringify(dataNew), { encoding: 'utf8'});
                console.log('Save done!!! ')
                students = [];
            }
        } else {
            console.log('Bye!!!');
        }
    }
}

function main() {
    showMenu();
}

main();