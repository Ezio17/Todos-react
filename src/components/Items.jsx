import React from 'react'

class Items extends React.Component {
  render() {
    let text = ''
    let items = []

    switch (this.props.filterBy) {
      case 'active':
        items = this.props.items.filter(item => item.checked === false)
        text = 'Активных задач нет'
        break;
      case 'done':
        items = this.props.items.filter(item => item.checked === true)
        text = 'Завершенных задач нет'
        break;
      case 'all':
        items = this.props.items
        text = 'Добавьте задачу'
        break;
    }

    return (
      <>
        {items.length > 0 ?
          <>
            {items.map((item) => (
              < div className="Todo__item" key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  className="Todo__checkbox"
                  checked={item.checked ? true : false}
                  onChange={() => this.props.onclickCheckBox(item.id)}
                />

                <label
                  className={item.checked ? 'Todo__item-text checked' : 'Todo__item-text'}
                >
                  {item.text}
                </label>

                <button
                  className="Todo__delete-item"
                  onClick={() => this.props.deleteItem(item.id)}
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