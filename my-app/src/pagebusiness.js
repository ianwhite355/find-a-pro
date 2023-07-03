
import { useEffect, useState } from "react";



const BusinessPage = () => {
    const [data, setData] = useState(null)

    const storedUserData = localStorage.getItem("userData");

    const nonStringUserData = JSON.parse(storedUserData)

    useEffect(() => {
        fetch(`/api/company/${nonStringUserData}`)
        .then((response) => response.json())
        .then((parse) => {
            setData(parse.data)
        })
        .catch((error) =>{
            console.log(error)
        })

    },[])

    return (
        <p>test</p>
    )
}

export default BusinessPage