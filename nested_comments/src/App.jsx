import NestedComments from "./components/nested-comments"
import commentsData from "./data/comments.json"

const App = () => {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={() => {}}
      />
    </div>
  )
}

export default App
