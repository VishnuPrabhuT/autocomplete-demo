interface ITrieNode {
    children: { [key: string]: ITrieNode };
    data: string[];
}

interface IAutocomplete {
    root: ITrieNode;
    words: string[];
    buildTrie(words: string[]): void;
    insertWord(word: string): void;
    searchWord(word: string): string[];
}

class TrieNode implements ITrieNode {
    children: { [key: string]: TrieNode };
    data: string[];

    constructor() {
        this.children = {};
        this.data = [];
    }
}

class Autocomplete implements IAutocomplete {
    root: TrieNode;
    words: string[];

    constructor(words: string[]) {
        this.root = new TrieNode();
        this.words = words;

        this.buildTrie(words);
    }

    buildTrie(words: string[]): void {
        words.forEach((word) => {
            this.insertWord(word);
        });
        console.log(this.root);
    }

    insertWord(word: string): void {
        let node = this.root;
        for (let c of word) {
            if (!(c in node.children)) {
                node.children[c] = new TrieNode();
            }
            node = node.children[c];
            node.data.push(word);
        }
        node = this.root;
    }

    searchWord(word: string): string[] {
        let ret: string[] = [];
        let node: TrieNode = this.root;

        if (word.length === 0) {
            return this.words;
        }

        for (let c of word) {
            if (!(c in node.children)) {
                break;
            }
            node = node.children[c];
        }
        ret = node.data;

        return ret;
    }
}

export { Autocomplete };
