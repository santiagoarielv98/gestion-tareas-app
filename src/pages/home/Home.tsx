import { useGetTasksQuery } from '../../services/tasks'

const Home = (): JSX.Element => {
  const { data = [] } = useGetTasksQuery()

  return (
    <div>
      {data.map((task) => (
        <div key={task._id}>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
