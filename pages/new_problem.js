import Header from "../components/header";

const NewProblem = () => {

    let cases = [
        {
            inputs: {
                input0: "120",
                input1: "1"
            },
            output: {
                type: "number",
                value: 120.0
            }
        }
    ];

    function addInput() {
        // make label
        const label = document.createElement("label");
        label.setAttribute("for", "input");
        label.innerHTML = "=>";
        // make input box
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "input");
        input.setAttribute("placeholder", "Input");
        input.setAttribute("class", "form-control");
        // append elements
        document.getElementById("inputs").appendChild(label);
        document.getElementById("inputs").appendChild(input);
        document.getElementById("inputs").appendChild(document.createElement("br"));
    }

    function addCase() {
        const inputs = document.getElementById("inputs");
        const output = document.getElementById("output").value;
        const type = document.getElementById("type").value;

        const case_inputs = {};
        const case_output = {
            type: type,
            value: output
        };

        let iterator = 0;
        for (let idx = 0; idx < inputs.childElementCount; idx += 1) {
            const item = inputs.children[idx];
            if (item.nodeName == "INPUT") {
                case_inputs[`input${iterator}`] = item.value;
                iterator++;
            }
        }

        console.debug(case_inputs);
        console.debug(case_output);

        cases += {
            inputs: case_inputs,
            output: case_output
        };

    }

    return (
        <>
            <Header/>
            <div>
                <div className="grid grid-cols-2 gap-4 px-4 py-2">

                    <div className="bg-gray-200 rounded p-2">
                        <label htmlFor="title" className="px-2">Title</label>
                        <input type="text" name="title" id="title"/>
                        <label htmlFor="description" className="px-2">Description</label>
                        <input name="description" id="description"></input>
                        <br/>
                        <label htmlFor="difficulty" className="px-2">Difficulty</label>
                        <input type="number" name="difficulty" id="difficulty" min="0" max="8"/>
                        <label htmlFor="points" className="px-2">Points</label>
                        <input type="number" name="points" id="points" min="0" max="8"/>
                    </div>

                    <div className="bg-gray-200 rounded p-2">
                        <div className="text-2xl">Test Cases</div>
                        <br/>

                        <div>
                            {/* cases in construction get their inputs and outputs put here */}
                            <div id="inputs"></div>
                            <label htmlFor="title" className="px-2">{"<="}</label>
                            <input id="output" placeholder="Output" type="text"/> as
                            <select id="type" className="bg-white">
                                <option value="float">number</option>
                                <option value="string">string</option>
                            </select>
                        </div>

                        <button className="rounded-full px-2 bg-blue-300" onClick={addInput}>Add input</button>
                        <button className="rounded-full px-2 bg-blue-300" onClick={addCase}>Add case</button>

                        <div>
                            {
                                // cases in construction get their inputs and outputs put here
                                cases.map((case_, idx) => (
                                    <div key={idx}>
                                        <div className="text-2xl">Case {idx}</div>
                                        <div className="flex justify-end">
                                            <button className="rounded-full px-2 bg-red-300">X</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default NewProblem;
