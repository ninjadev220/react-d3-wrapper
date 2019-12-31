import React from 'react';
import './Table.scss';

const Table = ({ data }) => {
    const renderRows = () => {
        return (
            data.map(student => {
                return (
                    <tr>
                        <td className='table-form__table-data'>{student.name}</td>
                        <td className='table-form__table-data'>{student.height}</td>
                        <td className='table-form__table-data'>{student.age}</td>
                        <td>
                            <button className='table-form__table-data__button'>
                                Remove
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

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
                    {renderRows()}
                </table>
            </form>
        </div>
    )
}

export default Table;