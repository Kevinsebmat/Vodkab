import React from "react";
import { withRouter } from "react-router-dom";
import "./review_form.scss";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.review && this.props.formtype === 'updateForm') {
      this.props.review.rating = this.props.review.rating.toString();
      this.props.review.author = this.props.review.author._id
    }
    this.state = this.props.review;
    console.log(this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitR = this.submitR.bind(this);
  }

  componentDidMount() {
    if (this.props.formtype === "updateForm") {
      this.props.fetchReview(this.props.match.params.reviewId)      
      this.props.fetchDrink(); 
    } else {
      this.props.fetchDrink(this.props.match.params.id);
    }
  }

  loginMust() {
    alert("Log In User before submitting Review");
  }

  submitR() {
    this.props.history.push(`/drink/${this.props.match.params.id}`);
  }

  update(v) {
    return (e) =>
      this.setState({
        [v]: e.target.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formtype === "updateForm") {
      this.props.action(this.props.match.params.reviewId, this.state)
    } else {
      this.props.createReview(this.props.match.params.id, this.state);
    }

    this.submitR();
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="review-errors" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    if (this.props.drink === undefined ) return null;
    // console.log(this.props.review);
    // console.log(this.state);
    if (this.state === undefined && this.props.formtype === 'updateForm') return null;
    return (
      <div className="form-box">
        <h1 className="rtitle">Write a Review for {this.props.drink.title}!</h1>
        <form className="rform" onSubmit={this.handleSubmit}>
          <label className="star-label">
            Please select a rating
            <div className="star">
              <input
                type="radio"
                id="star5"
                name="rate"
                value="5"
                defaultChecked={this.props.review.rating === "5"}
                onClick={this.update("rating")}
              />
              <label htmlFor="star5" title="text" />
              <input
                type="radio"
                id="star4"
                name="rate"
                value="4"
                defaultChecked={this.props.review.rating === "4"} 
                onClick={this.update("rating")}
              />
              <label htmlFor="star4" title="text" />
              <input
                type="radio"
                id="star3"
                name="rate"
                value="3"
                defaultChecked={this.props.review.rating === "3"}
                onClick={this.update("rating")}
              />
              <label htmlFor="star3" title="text" />
              <input
                type="radio"
                id="star2"
                name="rate"
                value="2"
                defaultChecked={this.props.review.rating === "2"}
                onClick={this.update("rating")}
              />
              <label htmlFor="star2" title="text" />
              <input
                type="radio"
                id="star1"
                name="rate"
                value="1"
                defaultChecked={this.props.review.rating === "1"}
                onClick={this.update("rating")}
              />
              <label htmlFor="star1" title="text" />
            </div>
          </label>
          <label>
            Review
            <textarea
              value={this.state.body}
              onChange={this.update("body")}
              placeholder="Please leave a review for this drink!"
            />
          </label>
          <button className="submit-button">Submit Review</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ReviewForm);
