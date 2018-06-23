var square = (x) =>x*x;
var user = {
    name : 'Andrew',
    sayHi: ()=>{
        console.log(arguments);
        console.log(`Hi. I am ${this.name}`);
    },
    sayHiAlt(){
        console.log(arguments);
        console.log(`Hi. I am ${this.name}`);
    }
};
console.log(square(10));
user.sayHi(90, 30, 1);
user.sayHiAlt(10, 23, 33);