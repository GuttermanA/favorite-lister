import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default DraggableList = (props) => {
  return (
    <Droppable droppableId="list" type="MOVIE">
      {(provided, snapshot) => (

        <div
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey', height:`${500 + (500 * this.props.favoriteList.length)}px` }}
          {...provided.droppableProps}
        >

        {props.list.length ? (props.list):(<Card style={{height:"300px"}}>
          <Card.Content>
            <Card.Header>
              Add Movies
            </Card.Header>
            <Card.Description>
              Add and reorder through drag and drop.
            </Card.Description>
          </Card.Content>
        </Card>)}
        {provided.placeholder}
      </div>

    )}
  </Droppable>
  )
}
