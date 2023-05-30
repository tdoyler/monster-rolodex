import { Component } from "react";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
	const [searchField, setSearchField] = useState("");

	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	// The useEffect function is only going to call this API once.
	// This will happen because the array at the end of the function is empty or has no dependencies so nothing is going to change
	// So nothing should trigger a re-render
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	// Just calling the API below cause an infinite loop. This is because even though the value is the same
	// it's not the same thing in memory which cause a re-render everytime
	// fetch("https://jsonplaceholder.typicode.com/users")
	// 	.then((response) => response.json())
	// 	.then((users) => setMonsters(users));

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchField);
		});
		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monster Rolodex</h1>
			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder="Search Monster"
				className="monsters-search-box"
			/>

			<CardList monsters={filteredMonsters} key={monsters.id} />
		</div>
	);
};

// The below is the class component
// class App extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			// monsters array is left empty so it can show if there is a problem with the API Call.
// 			monsters: [],
// 			searchField: "",
// 		};
// 		console.log("constructor");
// 	}
// 	// The below API Call is requested the first time the page is render only.
// 	componentDidMount() {
// 		console.log("componentDidMount");
// 		fetch("https://jsonplaceholder.typicode.com/users")
// 			.then((response) => response.json())
// 			.then((users) =>
// 				this.setState(
// 					() => {
// 						return { monsters: users };
// 					},
// 					() => {
// 						console.log(this.state);
// 					}
// 				)
// 			);
// 	}

// 	onSearchChange = (event) => {
// 		const searchField = event.target.value.toLowerCase();

// 		this.setState(() => {
// 			return { searchField };
// 		});
// 	};
// 	render() {
// 		console.log("render");

// 		const { monsters, searchField } = this.state;
// 		const { onSearchChange } = this;
// 		// state.searchField is being used to be able to remove letters and still have the search field correctly
// 		const filteredMonsters = monsters.filter((monster) => {
// 			return monster.name.toLowerCase().includes(searchField);
// 		});
// 		return (
// 			<div className="App">
// 				<h1 className="app-title">Monster Rolodex</h1>
// 				<SearchBox
// 					onChangeHandler={onSearchChange}
// 					placeholder="Search Monster"
// 					className="monsters-search-box"
// 				/>
// 				<CardList monsters={filteredMonsters} />
// 			</div>
// 		);
// 	}
// }

export default App;
