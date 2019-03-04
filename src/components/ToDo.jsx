import React from 'react'
import Items from './Items'

class ToDo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      id: 0,
      filterBy: 'all',
      newTextInput: '',
    }

    this.addNewItem = () => {
      if (this.state.newTextInput.length === 0) {
        return
      }

      this.setState(({ items, newTextInput, id }) => {
        let newTodo = {
          id,
          text: this.state.newTextInput,
          checked: false,
        }

        return {
          items: [...items, newTodo],
          newTextInput: '',
          id: id + 1,
        }
      })
    }

    this.handleKeyPress = () => {
      if (event.key === "Enter") {
        this.addNewItem()
      }
    }

    this.newText = (text) => {
      this.setState(() => {
        return {
          newTextInput: text
        }
      })
    }

    this.clickCheckbox = (id) => {
      let newItems = this.state.items.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked
          }
        }
        return todo;
      })

      this.setState({
        items: newItems,
      })
    }

    this.deleteItem = (id) => {
      let newItem = [...this.state.items];
      this.setState({
        items: newItem.filter(item => item.id !== id),
      })
    }
  }

  render() {
    let { filterBy } = this.state;
    return (
      <div className="Todo">
        <h1 className="Todo__title">Todos</h1>
        <div className="Todo__items">

          <Items
            items={this.state.items}
            onclickCheckBox={this.clickCheckbox}
            active={this.state.activeItems}
            completed={this.state.completedItems}
            filterBy={this.state.filterBy}
            deleteItem={this.deleteItem}
          />

        </div>
        <div className="Todo__input-button">
          <input
            type="text"
            className="Todo__input"
            placeholder="Что нужно сделать?"
            value={this.state.newTextInput}
            onChange={(event) => {
              this.newText(event.target.value)
            }}
            onKeyPress={event => this.handleKeyPress()}
          />
          <button onClick={this.addNewItem}>Add</button>
        </div>
        <div className="Todo__buttons">

          <button
            className={filterBy === 'all' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.setState({ filterBy: 'all' })}
          >
            All
          </button>

          <button
            className={filterBy === 'active' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.setState({ filterBy: 'active' })}
          >
            Active
          </button>

          <button
            className={filterBy === 'done' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.setState({ filterBy: 'done' })}
          >
            Completed
          </button>
        </div>
      </div>

    )
  }
}

export default ToDo