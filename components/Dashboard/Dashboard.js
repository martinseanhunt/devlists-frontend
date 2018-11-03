import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

class Dashboard extends Component {
  calculateProgress = (category) => {
    console.log(category)

    if(!category.tasks) return `0%`
    if(!category.tasks.length) return `0%`

    const totalTasks = category.tasks.length
    const completedTasks = 
      category.tasks.filter(task => ['COMPLETED', 'CLOSED'].includes(task.status))
      .length
    
    // console.log(Math.floor(completedTasks*100/totalTasks))

    return `calc(${Math.floor(completedTasks*100/totalTasks)}% + 2px)`
  }

  render() {

    // TODO do we really need the user here?
    const { user, categories } = this.props

    // TODO when we can get the count of tasks aassigned to a category
    // Show the number of open tasks and a percentage bar of ompleted tasks

    // TODO make progress bar it's own component - pass in the percentage
    // as a prop

    // TODO allow user to toggle between list and card view
    return (
      <>
      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="list"/>Lists</h2>
        </SectionHeader>
      </Col>
      <Row>
        {categories && categories.map((category, i) => (
          <Col key={category.id} fourth>
            <Card>
              <CardInner>
                <h3>{category.name}</h3>
                <p>{category.description.length > 100 
                  ? category.description.substring(0,70) + '...'
                  : category.description}</p>

                <span>Tasks Completed</span>
                <div className="progress">
                  <span style={{ width: this.calculateProgress(category) }}></span>
                </div>
              </CardInner>
              <CardFooter>
                <Link href={`/tasks/` + category.slug}>
                  <a>View Tasks →</a>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
      </>
    )
  }
}

const SectionHeader = styled.div`
  padding: 30px 0;
  position: relative;
  
  h2 {
    color: #3e3f42;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    background: #fbfbfd;
    z-index: 999;
    position: relative;
    display: inline;
    padding-right: 20px;

    svg {
      font-size: 1.4rem;
      margin-right: 10px;
      color: #9ea0a5;
    }
  }

  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    display: block;
    background: #eaedf3;
    content: "";
    top: 50%;
    left: 0;
  }

`

export default Dashboard