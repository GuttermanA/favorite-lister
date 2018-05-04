import React from 'react'
import { Header, Container } from 'semantic-ui-react'


const AboutPage = () => {
  return (
    <Container text>

      <Header as="h1" content="About"/>
      <p>
        This website is a project built at Flatiron school built by Alexander Gutterman and Alexey Katalkin to demostrate an understanding of <a href="https://reactjs.org/">React.js</a> and <a href="http://guides.rubyonrails.org/api_app.html">Rails API</a>. At this website you can:
      </p>

      <ul>
        <li>Search a database of movies provided by <a href="https://www.themoviedb.org/">The Movie DB</a> </li>
        <li>Select movies from the search results and save them to an ordered list</li>
        <li>View, edit, and updated the saved lists</li>
      </ul>

      <p>
        The UI for adding, reordering, and removing from lists is full draggable and dropped using the <a href="https://github.com/atlassian/react-beautiful-dnd" target="_blank" rel='noreferrer noopener'>react-beautiful-dnd</a> library.
      </p>

      <p>
        To get started search the movie database or view the saved lists through the menu above.
      </p>

      <p>
        <strong>Project:</strong> <a href="https://github.com/GuttermanA/favorite-lister" target="_blank" rel='noreferrer noopener'>Frontend</a> | <a href="https://github.com/GuttermanA/favorite-lister-backend" target="_blank" rel='noreferrer noopener'>Backend</a>
      </p>

      <p>
        <strong>Alexander Gutterman:</strong> <a href="https://github.com/GuttermanA" target="_blank" rel='noreferrer noopener'>Github</a> | <a href="https://www.linkedin.com/in/alexander-gutterman-0186a94b/" target="_blank" rel='noreferrer noopener'>LinkedIn</a>
      </p>

      <p>
        <strong>Alexey Katalkin: </strong> <a href="https://github.com/Raskovan" target="_blank" rel='noreferrer noopener'>Github</a> | <a href="https://www.linkedin.com/in/alexey-katalkin-945590161/" target="_blank" rel='noreferrer noopener'>LinkedIn</a>
      </p>

    </Container>


  )
}

export default AboutPage
