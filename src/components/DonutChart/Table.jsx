import React, { Component } from 'react';
import './Table.scss';

class Table extends Component {
    state = {
		company: '',
		price: '',
    }
    
    handleSubmit = () => {
        this.props.updateData([...this.props.data, this.state])
        this.setState({
            company: '',
            price: ''
        })
    }

    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

    handleRemove = (event) => {
        const newData = this.props.data.filter(d => {
            return d.company !== event.target.name;
        });
        this.props.updateData(newData);
    }

    renderRows(){
        return (
            this.props.data.map(entry => {
                return (
                    <tr key={entry.company} className={`table-form__row__white`}>
                        <td className='table-form__table-data'>{entry.company}</td>
                        <td className='table-form__table-data'>{`$${entry.price}`}</td>
                        <td>
                            <button 
                                className='table-form__table-data__button'
                                name={entry.company}
                                onClick={this.handleRemove}
                                type='button'
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render(){
        return (
            <div className='table-form'>
                <form className='table-form__row'>
                    <input 
                        className='table-form__row__input'
                        placeholder="Company"
                        name={'company'}
                        value={this.state.company}
                        onChange={this.handleChange}
                    />
                    <input 
                        className='table-form__row__input'
                        placeholder="Price"
                        name={'price'}
                        value={this.state.price}
                        onChange={this.handleChange}
                    />
                    <button
                        className='table-form__row__button'
                        type='button'
                        onClick={this.handleSubmit}
                    >
                        Add
                    </button>
                    <table className='table-form__table'>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default Table;