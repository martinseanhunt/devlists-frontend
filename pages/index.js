import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import User from '../components/providers/User'
import Dashboard from '../components/Dashboard/Dashboard'

// TODO Should tasks be moved in to their own query for each category on the page? 
// I think that probably makes more sense! 

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      id
      name
      description
      slug
      tasks {
        id
        status
      }
    }
  }
`

// TOdo Rename category to task type

// TOdo Attatch tasks to category so we can get them when querying categorues

// TODO improve error

// TODO standardise capitalisation in component folder names

const Index = () => (
  <User>
    {({data}) => (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({data, error, loading}) => {
          if (error) return <p>Something went wrong</p>
          if (loading) return <p>Loading...</p>

          return (
            <Dashboard
              me={data.me}
              categories={data.categories}
            />
          )
        }} 
      </Query>
    )}
  </User>
)

export default Index