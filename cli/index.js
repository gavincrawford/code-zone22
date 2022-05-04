const prompt = require("prompt-sync")();

let x = 0;
let cases = {};

while (true) {

    console.log(`[INPUT${x}] Press enter to cancel input feed.`);
    let inputs = [];

    while (true) {
        const i = prompt(`input${x}.${inputs.length}: `);
        if (i == "") { break } else { inputs.push(i) };
    }

    const output = prompt(`output${x}: `);

    cases[`case${x}`] = {
        inputs: inputs,
        output: output,
        type: prompt("Type (string/number): ")
    }

    if (prompt("Continue (y/n)? ") == "n") {
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
        console.log(JSON.stringify(cases));
        break;
    }

    x++;

}
