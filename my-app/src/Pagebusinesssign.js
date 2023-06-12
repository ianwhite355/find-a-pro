import styled from "styled-components"

const BusinessSignUp  = () => {



    return (
        <>
            <Title>Want to sign up for Find-Your-Pro</Title>
            <Form>
                <DifferentNames>
                    <Label>
                        Business Name:
                        <Input type="text" name="businessName"/>
                    </Label>
                    <Label>
                        Owner's Name:
                        <Input type="text" name="ownerName"/>
                    </Label>
                </DifferentNames>
                <DifferentNames>
                    <Label>
                        Email:
                        <Input type="email" name="email"/>
                    </Label>
                    <Label>
                        Phone Number:
                        <Input type="number" name="phoneNumber"/>
                    </Label>
                </DifferentNames>
                <Services>What services Do you offer?</Services>
                <ThereServices>
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
                </ThereServices>
                <Button type="submit">Sign Up</Button>
            </Form>
        </>
    )
}

const Title = styled.h1`
    text-align:center;
    font-size: 2em;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DifferentNames = styled.div`
    display: flex;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 10px;
    font-size:2em;
`;

const Input = styled.input`
    padding: 5px;
    margin-top: 5px;
`;

const ThereServices = styled.div`
`


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