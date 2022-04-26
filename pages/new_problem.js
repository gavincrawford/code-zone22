import Header from "../components/header";

const NewProblem = () => {

    function addInput() {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "input");
        input.setAttribute("placeholder", "Input");
        input.setAttribute("class", "form-control");
        document.getElementById("inputs").appendChild(input);
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
                            <input type="text"/>
                        </div>

                        <button className="rounded-full px-2 bg-blue-300" onClick={addInput}>Add input</button>
                        <button className="rounded-full px-2 bg-blue-300">Add case</button>

                        <div>
                            {/* finished input/output pairs get stored here, but can be removed */}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default NewProblem;
