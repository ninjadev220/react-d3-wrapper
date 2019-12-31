import React, { Component } from 'react';
import './Table.scss';

class Table extends Component {
    state = {
		name: '',
		height: '',
		age: ''
	}

    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

    handleRemove = (event) => {
        const newData = this.props.data.filter(d => {
            return d.name !== event.target.name;
        });
        this.props.updateData(newData);
    }

    renderRows(){
        return (
            this.props.data.map(student => {
                return (
                    <tr key={student.name}>
                        <td className='table-form__table-data'>{student.name}</td>
                        <td className='table-form__table-data'>{student.height}</td>
                        <td className='table-form__table-data'>{student.age}</td>
                        <td>
                            <button 
                                className='table-form__table-data__button'
                                name={student.name}
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
                        placeholder="Name"
                    />
                    <input 
                        className='table-form__row__input'
                        placeholder="Height"
                    />
                    <input 
                        className='table-form__row__input'
                        placeholder="Age"
                    />
                    <button
                        className='table-form__row__button'
                        type='button'
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