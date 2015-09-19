import React from 'react';
var levenshtein = require('fast-levenshtein');
var storage = require('simplestorage.js');

var strings = [
	'vasu',
	'kolla',
	'vasu kolla',
	'vinay',
	'vijay',
	'maish'
];

strings.sort();

var stringsMatched = storage.get('matches') || [];
var sorter = function(a, b){
	return a[1] - b[1]
};

var localSort = function(a, b){

	return a[2].indexOf(stringsMatched) < b[2].indexOf(stringsMatched) && a[1] > 3
}

var App = React.createClass({
	getInitialState: function(){
		return {
			suggestion: [],
			selected: ''
		}
	},
	handleChange: function(event){

		var input = event.target.value,
			words = []

		for(var i = 0; i < strings.length; i++){
			var distance = levenshtein.get(input, strings[i]);
			distance < 6 && words.push([i, distance, strings[i]]);		
		}
		
		var d = words.sort(sorter);

		// var d = d.sort(localSort)
		
		this.setState({
			suggestion: d,
			selected: input
		})
		
	},
	add: function(word){

		var words = storage.get('matches') || [];
		
		words.push(word[2]);

		this.setState({
			selected: word[2]
		})

		storage.set('matches', words);

		stringsMatched = words;
	},
	render: function(){

		return (
			<div>
				<input type="text" placeholder="Start typing" onChange = {this.handleChange} value={this.state.selected} autocomplete="off" />

				{this.state.suggestion.map(function(str){
					var bounds = this.add.bind(this, str);
					return <div onClick = {bounds}>{str[2]}</div>
				}.bind(this))}
			</div>
		)
	}
});


React.render(<App />, document.getElementById('root'));