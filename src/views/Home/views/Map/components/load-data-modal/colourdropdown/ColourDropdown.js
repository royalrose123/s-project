import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import './styles/dropdown.scss'

const propTypes = {
  name: PropTypes.string,
  searchable: PropTypes.array,
  list: PropTypes.array,
  resetThenSet: PropTypes.func,
}

class ColourDropdown extends Component {
  constructor(props) {
    super(props)
    const { name } = this.props

    this.state = {
      listOpen: false,
      headerTitle: name,
      keyword: '',
    }

    this.searchField = React.createRef()
    this.close = this.close.bind(this)
  }

  static getDerivedStateFromProps(nextProps) {
    const { list, name } = nextProps

    const selectedItem = list.filter(item => item.selected)

    if (selectedItem.length) {
      return {
        headerTitle: selectedItem[0].name,
      }
    }
    return { headerTitle: name }
  }

  componentDidUpdate() {
    const { listOpen } = this.state

    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close)
      } else {
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }

  close() {
    this.setState({
      listOpen: false,
    })
  }

  selectItem(colors, name, stateKey) {
    const { resetThenSet } = this.props

    this.setState(
      {
        headerTitle: name,
        listOpen: false,
      },
      resetThenSet(name, stateKey),
    )
  }

  toggleList() {
    this.setState(
      prevState => ({
        listOpen: !prevState.listOpen,
        keyword: '',
      }),
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.listOpen && this.searchField.current) {
          this.searchField.current.focus()
          this.setState({
            keyword: '',
          })
        }
      },
    )
  }

  filterList(e) {
    this.setState({
      keyword: e.target.value.toLowerCase(),
    })
  }

  listItems() {
    const { list, searchable } = this.props
    const { keyword } = this.state

    let tempList = list

    if (keyword.length) {
      tempList = list
        .filter(item =>
          item.name
            .toLowerCase()
            .slice(0, keyword.length)
            .includes(keyword),
        )
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
    }

    if (tempList.length) {
      return tempList.map(item => (
        <button type='button' className='dd-list-item' key={item.name} onClick={() => this.selectItem(item.colors, item.name, item.type)}>
          <div style={{ width: '100%', height: '25px' }}>
            <div style={{ float: 'left', background: item.colors[0], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[1], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[2], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[3], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[4], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[5], height: '100%', width: '13.5%' }}> </div>
            <div style={{ float: 'left', background: item.colors[6], height: '100%', width: '13.5%' }}> </div>
            {item.selected && <FontAwesome name='check' />}
          </div>
        </button>
      ))
    }

    return <div className='dd-list-item no-result'>{searchable[1]}</div>
  }

  render() {
    const { searchable } = this.props
    const { listOpen, headerTitle } = this.state

    return (
      <div className='dd-wrapper'>
        <button type='button' className='dd-header' onClick={() => this.toggleList()}>
          <div className='dd-header-title'>{headerTitle}</div>
          {listOpen ? <FontAwesome name='angle-up' size='2x' /> : <FontAwesome name='angle-down' size='2x' />}
        </button>
        {listOpen && (
          <div role='list' className={`dd-list ${searchable ? 'searchable' : ''}`} onClick={e => e.stopPropagation()}>
            {searchable && (
              <input ref={this.searchField} className='dd-list-search-bar' placeholder={searchable[0]} onChange={e => this.filterList(e)} />
            )}
            <div className='dd-scroll-list'>{this.listItems()}</div>
          </div>
        )}
      </div>
    )
  }
}

ColourDropdown.propTypes = propTypes

export default ColourDropdown
