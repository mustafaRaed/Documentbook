import React from 'react'
import '../App.css';

class Searchbar extends React.Component {

    constructor(props) {
        super(props);
        this.items = [
            'David',
            'Damien',
            'Adam',
            'Sarah',
            'Sigrid',
            'Hanna',
            'Jane',
            'Nelly',
            'Agnes',
            'Liz',
            'Unni',
        ];
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions(){
        const { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    setSearch(){
        console.log("Click")
    }

    render () {
        const { text } = this.state;
    return (
            <div className="search">
                <div>
                    <div className="input-group mb-3">
                        <input value={text} onChange={this.onTextChanged} className="form-control" type="text" aria-label="Search"/>
                        <div className="input-group-append">
                        <span className="input-group-text" onClick={this.setSearch}>{String.fromCharCode(8981)}</span>
                        </div>
                    </div>
                    <ul className="searchBar">
                        {this.renderSuggestions()}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Searchbar