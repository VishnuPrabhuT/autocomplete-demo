import "./App.css";
import { useState, useEffect } from "react";
import { Autocomplete } from "./modules/autocomplete";

function App() {
    let [ac, setac] = useState<Autocomplete | undefined>(undefined);
    let [res, setRes] = useState<string[]>([]);

    useEffect(() => {
        (async function () {
            let data: any = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            data = await data.json();
            data = data.map((item: any) => item.title);
            let autocomplete = new Autocomplete(data);

            setac(autocomplete);
        })();
    }, []);

    function search(): void {
        let ele: HTMLInputElement | null = document.querySelector(
            "#searchText"
        );

        let results: any = ac?.searchWord(ele!.value || "");
        setRes(results);
        console.log(results);
    }

    return (
        <div className="App">
            <header className="App-header">
                <label htmlFor="searchText">Enter Search Text</label>
                <input type="text" name="searchText" id="searchText" />
                <button
                    onClick={() => {
                        search();
                    }}
                >
                    Search
                </button>
                <ul>
                    {res.map((word) => {
                        return <li>{word}</li>;
                    })}
                </ul>
            </header>
        </div>
    );
}

export default App;
