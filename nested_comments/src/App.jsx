import NestedComments from "./components/nested-comments"
import commentsData from "./data/comments.json"

const App = () => {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData} //for scalabity we use here
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={() => {}}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
    </div>
  )
}

export default App
