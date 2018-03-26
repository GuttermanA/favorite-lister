import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import ItemTypes from './Constants'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
		}
	},


  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log(dropResult);
    console.log(item);

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
    }
  },
}

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
})

class MovieCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		posterPath: PropTypes.string.isRequired,
	}



  handleClick = () => {
    if (this.props.handleAdd) {
      this.props.handleAdd(this.props.movie)
    } else if (this.props.handleRemove) {
      this.props.handleRemove(this.props.movie)
    }
  }

  render() {
    const {
      posterPath,
      isDragging,
			connectDragSource,
    } = this.props
    const poster = `http://image.tmdb.org/t/p/w500/${posterPath}`
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      <div>
        <Card style={{opacity}} >
          <Image src={poster} />
        </Card>
      </div>

    )
  }



}

export default DragSource(ItemTypes.MOVIE, cardSource, collect)(MovieCard);
