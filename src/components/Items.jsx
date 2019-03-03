import React from 'react'

class Items extends React.Component {
  render() {
    let items = []
    let text = ''

    switch (this.props.title) {
      case 'activeItems':
        items = this.props.active.filter(item => item.checked === false)
        text = 'Активных задач нет'
        break;
      case 'completedItems':
        items = this.props.completed.filter(item => item.checked === true)
        text = 'Завершенных задач нет'
        break;
      case 'allItems':
        items = this.props.items
        text = 'Добавьте задачу'
        break;
    }

    return (
      <>
        {items.length > 0 ?
          <>
            {items.map((item, index) => (
              < div className="Todo__item" key={item.value}>
                <input
                  type="checkbox"
                  value={item.value}
                  className="Todo__checkbox"
                  checked={item.checked ? true : false}
                  onChange={() => this.props.onclickCheckBox(item.value)}
                />

                <label
                  className={item.checked ? 'Todo__item-text checked' : 'Todo__item-text'}
                >
                  {item.text}
                </label>

                <button
                  className="Todo__delete-item"
                  onClick={() => this.props.deleteItem(item.value)}
                >-</button>
                <hr className="Todo__item-hr" />
              </div>
            ))}
          </>
          :
          <p className="Todo__nothing">{text}</p>
        }
      </>
    )
  }

}

export default Items