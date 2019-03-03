import React from 'react'
import Items from './Items'

class ToDo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      activeItems: [],
      completedItems: [],
      value: 0,
      title: 'allItems',
      newTextInput: '',
    }

    this.addNewItem = () => {
      if (this.state.newTextInput.length === 0) {
        return
      }

      this.setState(({ items, newTextInput, value }) => {

        let newTodo = {
          value,
          text: newTextInput,
          checked: false,
        }

        return {
          items: [...items, newTodo],
          activeItems: [...items.filter(item => item.checked === false), newTodo],
          newTextInput: '',
          value: value + 1,
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

    this.clickCheckbox = (value) => {
      let newItems = this.state.items.map(todo => {
        if (todo.value === value) {
          return {
            ...todo,
            checked: !todo.checked
          }
        }
        return todo;
      })

      this.setState({
        items: newItems,
        activeItems: newItems,
        completedItems: newItems,
      })
    }

    this.activeItems = (title) => {
      this.setState({
        activeItems: this.state.items.filter(item => item.checked === false),
        title,
      })
    }

    this.completedItems = (title) => {
      this.setState({
        completedItems: this.state.items.filter(item => item.checked === true),
        title,
      })
    }

    this.allItems = (title) => {
      this.setState({
        title,
      })
    }

    this.deleteItem = (value) => {
      let newItem = [...this.state.items];
      let deleteItem = newItem.filter(item => item.value !== value)
      this.setState({
        items: deleteItem,
        activeItems: deleteItem.filter(item => item.checked === false),
        completedItems: deleteItem.filter(item => item.checked === true),
      })
    }
  }

  render() {
    let { title } = this.state;
    return (
      <div className="Todo">
        <h1 className="Todo__title">Todos</h1>
        <div className="Todo__items">

          <Items
            items={this.state.items}
            onclickCheckBox={this.clickCheckbox}
            active={this.state.activeItems}
            completed={this.state.completedItems}
            title={this.state.title}
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
              this.newText(event.target.value, event.target)
            }}
            onKeyPress={event => this.handleKeyPress()}
          />
          <button onClick={this.addNewItem}>Add</button>
        </div>
        <div className="Todo__buttons">

          <button
            className={title === 'allItems' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.allItems('allItems')}
          >
            All
          </button>

          <button
            className={title === 'activeItems' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.activeItems('activeItems')}
          >
            Active
          </button>

          <button
            className={title === 'completedItems' ?
              'Todo__button Todo__active-button' : 'Todo__button'}
            onClick={() => this.completedItems('completedItems')}
          >
            Completed
          </button>
        </div>
      </div>

    )
  }
}

export default ToDo