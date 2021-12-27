import React from "react";

export default function ContactUsModalContent() {
    return (
        <div className={"custom-modal-content"}>
            <h2>Contact Us</h2>
            <form>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name={"email"} id={"email"}/>
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Email</label>
                    <input type="tel" name={"phone"} id={"phone"}/>
                </div>
                <div className="input-group">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" cols="30" rows="10" />
                </div>
            </form>
        </div>
    )
}
