const fs = require('fs');


const phrases = fs.readFileSync(`./phrases.txt`, 'utf-8')

json = {
    "phrases": {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    }
}

const allPhrases = phrases.split('\r\n')

for (let index = 0; index < 5; index++) {
    json.phrases[index + 1] = allPhrases.slice(index * 100, (index * 100) + 100)
}

fs.writeFileSync(`../PhraseSets.json`, JSON.stringify(json), 'utf-8')
