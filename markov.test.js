const { MarkovMachine } = require("./markov");

describe('markov machine', function () {

    test('set markov chains', function() {
        let mm = new MarkovMachine("This is a This test!");

        expect(mm.chains).toEqual(new Map([
            ["This", ["is", "test!"]],
            ["is", ["a"]],
            ["a", ["This"]],
            ["test!", [null]]
        ]));
    });

    test('make text from chain', function(){
        let mm = new MarkovMachine("T i a t!");
        let text = mm.makeText();

        expect(["T i a t!", "i a t!", "a t!", "t!"]).toContain(text)

    });

    test('random key from array', function(){
        expect([1, 2, 3, 4, 5]).toContain(MarkovMachine.randKey([1, 2, 3, 4, 5]));

        let arr = [1, 1, 1, 1];
        expect(MarkovMachine.randKey(arr)).toEqual(1);
    })

});