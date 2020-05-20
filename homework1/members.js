var members = [
    {name: "권세희", age: 23, selfIntro: function() {console.log(`저는 ${this.age}세 ${this.name}입니다.`)}},
    {name: "김보배", age: 26, selfIntro: function() {console.log(`저는 ${this.age}세 ${this.name}입니다.`)}},
    {name: "정효원", age: 24, selfIntro: function() {console.log(`저는 ${this.age}세 ${this.name}입니다.`)}},
    {name: "허정민", age: 24, selfIntro: function() {console.log(`저는 ${this.age}세 ${this.name}입니다.`)}}
];

members.forEach(item => item.selfIntro());