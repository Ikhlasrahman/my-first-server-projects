"use client";

import { useState } from "react";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

const AddUserPage = () => {
    const [submitError, setSubmitError] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        setSubmitError("");
        setSubmitMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log('after submission',result)

            if (!response.ok) {
                throw new Error(result.message || "Unable to add user.");
            }

            setSubmitMessage(result.message || "User added successfully.");
            form.reset();
        } catch (error) {
            setSubmitError(
                error instanceof TypeError
                    ? "Could not reach the user API. Start the Express server with `npm run server` from the project root, then try again."
                    : error instanceof Error
                        ? error.message
                        : "Unable to add user.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className='text text-3xl'>Add User</h2>
            <Form className="w-full max-w-96" onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>Profile Settings</Fieldset.Legend>
                    <Description>Update your profile information.</Description>
                    <FieldGroup>
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>Name</Label>
                            <Input placeholder="John Doe" />
                            <FieldError />
                        </TextField>
                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button type="submit">
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                        <Button type="reset" variant="secondary">
                            Cancel
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
            {submitError && <p role="alert">{submitError}</p>}
            {submitMessage && <p role="status">{submitMessage}</p>}
        </div>
    );
};

export default AddUserPage;