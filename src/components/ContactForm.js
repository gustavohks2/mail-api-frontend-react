import React, {Component} from 'react';
import Spinner from './Spinner';
import $ from 'jquery';

export default class ContactForm extends Component {

   constructor() {
      super();
      console.clear();
      this.state = {
         isSpinnerLoading: false,
         message: ""
      }
   }

   handleSubmit(evt) {
      evt.preventDefault();
      this.sendEmail(evt.target);
   }

   sendEmail(form) {
      const data = new FormData(form);
      const method = "POST";
      const url = "http://localhost:800/api/emails";
      const _this = this;

      this.setState({ isSpinnerLoading: true, message: "" });

      $.ajax({
         url,
         data,
         method,
         dataType: "json",
         processData: false,
         contentType: false,
         success: function(response) {
            _this.updateForm(response, form);
         },
         error: function(xhr, response, err) {
            console.log(err);
         }
      });
   }

   updateForm(response, form) {
      if (response.success) {
         const formData = new FormData(form);
         this.setState({ isSpinnerLoading: false, message: `Email sent to ${formData.get("to")}` });
         form.reset();
      } else if (response.errors.length > 0) {
         const messages = response.errors.map((error, i) => {
            return (
               <li>{i+1} - {error}</li>
            )
         });

      const message = (<ul>{messages}</ul>);

         this.setState({
            message,
            isSpinnerLoading: false
         });
      }
   }

   render() {
      return (
         <form className="contact-form" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
            <div className="contact-form__input-group">
               <label className="contact-form__label" htmlFor="to">Sending to</label>
               <input className="contact-form__control" id="to" type="email" name="to" placeholder="johndoe@mail.com"/>
            </div>

            <div className="contact-form__input-group">
               <label className="contact-form__label" htmlFor="subject">Subject</label>
               <input className="contact-form__control" id="subject" type="text" name="subject"/>
            </div>

            <div className="contact-form__input-group">
               <label className="contact-form__label" htmlFor="content">Content</label>
               <textarea className="contact-form__control" id="content" name="content"></textarea>
            </div>

            <div className="contact-form__input-group">
               <label className="contact-form__label" htmlFor="attachments">Attachements</label>
               <input className="contact-form__control" id="attachments" type="file" name="attachments[]" multiple/>
            </div>
            { this.state.isSpinnerLoading ? <Spinner/> : null }
            { this.state.message }
            <button className="contact-form__button" type="submit">Send</button>
         </form>
      );
   }
}