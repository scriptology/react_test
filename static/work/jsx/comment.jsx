/** @jsx React.DOM */
// The above declaration must remain intact at the top of the script.
// Your code here

var CommentBox = React.createClass({
render: function() {
  return (
    <div className="commentBox">
      Hello, world! I am a CommentBox.
    </div>
  );
}
});
React.renderComponent(
<CommentBox />,
document.getElementById('content')
);