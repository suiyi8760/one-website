import { useQuery } from 'urql'
import { graphql } from '../gql'

export default function App() {
  const [result] = useQuery({
    query: graphql(`
      query GetDrafts {
        drafts {
          content
          id
          published
          title
        }
      }
    `)
  })

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <div>Drafts</div>
      <ul>
        {data?.drafts?.map(todo => (
          <li key={todo?.id}>{todo?.title}</li>
        ))}
      </ul>
    </>
  )
}
