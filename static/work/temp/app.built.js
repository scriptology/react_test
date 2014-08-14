(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
// The above declaration must remain intact at the top of the script.
// Your code here

var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

var converter = new Showdown.converter();

var Comment = React.createClass({displayName: 'Comment',
    render: function() {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            React.DOM.div( {className:"comment"}, 
                React.DOM.h2( {className:"commentAuthor"}, 
                    this.props.author
                ),
                React.DOM.span( {dangerouslySetInnerHTML:{__html: rawMarkup}} )
            )
        );
    }
});

var CommentList = React.createClass({displayName: 'CommentList',
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                Comment( {author:comment.author}, 
                    comment.text
                )
            );
        });
        return (
            React.DOM.div( {className:"commentList"}, 
                commentNodes
            )
        );
    }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
    handleSubmit: function() {
      var author = this.refs.author.getDOMNode().value.trim();
      var text = this.refs.text.getDOMNode().value.trim();
      if (!text || !author) {
        return false;
      }
      // TODO: send request to the server
      this.refs.author.getDOMNode().value = '';
      this.refs.text.getDOMNode().value = '';
      return false;
    },
    render: function() {
        return (
            React.DOM.form( {className:"commentForm", onSubmit:this.handleSubmit}, 
              React.DOM.input( {type:"text", placeholder:"Your name", ref:"author"} ),
              React.DOM.input( {type:"text", placeholder:"Say something...", ref:"text"} ),
              React.DOM.input( {type:"submit", value:"Post"} )
            )
        );
    }
});

var CommentBox = React.createClass({displayName: 'CommentBox',
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
        return (
            React.DOM.div( {className:"commentBox"}, 
                React.DOM.h1(null, "Comments"),
                CommentList( {data:this.state.data} ),
                CommentForm(null )
            )
        );
    }
});

React.renderComponent(
    CommentBox( {url:"http://localhost:63342/react_test/static/public/json/comments.json"} ),
    document.getElementById('content')
);
},{}]},{},[1]);