/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()

    for (let i = 0; i < this.words.length; i+=1){

      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)){
        chains.get(word).push(nextWord);
      } else{
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  static randKey(k) {
    /** for gathering a random key from the array. easier to 
     * implemnet as static function vs separate random  */
    return k[Math.floor(Math.random()*k.length)];
  }

  makeText(numWords = 100) {
    
    let anyKey = Array.from(this.chains.keys());
    let randomKey = MarkovMachine.randKey
    let keyWord = randomKey(anyKey);

    let val = [];

    while (val.length < numWords && keyWord !== null){
      val.push(keyWord);
      keyWord = randomKey(this.chains.get(keyWord));
    }

    return val.join(" "); // for adding spaces between joining words
  }
}

module.exports = {
  MarkovMachine,
};