import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'; // reduxForm allows component to talk to reduxstore
import {Link} from 'react-router-dom';
import {connect} from  'react-redux';
import {createPost} from '../actions';


class  PostsNew extends Component {
    // 3 different state of form aware of in fields..
    // pristine means no input entered in yet or selected
    // touched means user selected it and now away from await
    //invalid, got some error msage and need to show to user

    renderField(field) {
        //destructuring
        const {meta: {touched, error}} = field;
        const className= `form-group ${touched && error ? 'has-danger': ''}`;
        //onChange={field.input.onChange}
        //onBlur={field.input.onBlur}
        //onFocus={field.input.onFocus}
        return (
            <div className={className}>
                <label> {field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error : '' }
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // props passed from react router to handle navigation

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        const{handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger"> Cancel</Link>

            </form>
        );
    }
}

function validate(values) {

    const errors = {};
    // validate the inputs from 'values'
    if(!values.title) {
        errors.title = "Enter a Title!"
    }
    if(!values.categories) {
        errors.categories= "Enter some categories!"
    }
    if(!values.content) {
        errors.content = "Enter a content!"
    }
    // if errors is empty, form is assigned to submit
    // if errors  have any properties, form will be assumed invalid hence not submit
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm' // more like name of the form
})(
  connect(null, {createPost}) (PostsNew)
);