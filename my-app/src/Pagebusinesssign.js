import styled from "styled-components"

const BusinessSignUp  = () => {



    return (
        <>
            <Title>Want to sign up for Find-Your-Pro</Title>
            <Form>
                <Label>
                    Business Name:
                    <Input type="text" name="businessName"/>
                </Label>
                <Label>
                    Owner's Name:
                    <Input type="text" name="ownerName"/>
                </Label>
                <Label>
                    Email:
                    <Input type="email" name="email"/>
                </Label>
                <Services>What services Do you offer?</Services>
                <label>
                    <input type="checkbox" name="windowWashing" value="windowWashing" />
                    Window Washing
                </label>
                <label>
                    <input type="checkbox" name="poolCleaning" value="poolCleaning" />
                    Pool Cleaning
                </label>
                <label>
                    <input type="checkbox" name="carDetailing" value="carDetailing" />
                    Car Detailing
                </label>
                <Button type="submit">Sign Up</Button>
            </Form>
        </>
    )
}

const Title = styled.h1`
    text-align:center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size:2em;
`;

const Input = styled.input`
    padding: 5px;
    margin-top: 5px;
`;

const Services = styled.p`
    font-size: 2em;
    text-align:center;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
`;

export default BusinessSignUp