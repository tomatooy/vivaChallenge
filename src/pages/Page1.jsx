import React from 'react'
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Page1() {
    const firstNameAlert = useRef()
    const lastNameAlert = useRef()
    const dateAlert = useRef()
    const ssnAlert = useRef()
    const navigate = useNavigate()
    const [SSN, setSSN] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [saveDate, setSaveDate] = useState("")
    const [validDOB, setValidDOB] = useState(false)
    const [validSSN, setValidSSN] = useState(false)
    const [validFirstName, setValidFN] = useState(false)
    const [validLastName, setValidLN] = useState(false)
    const [disabledNext, setNext] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        if (e.target.value.length > 0) {
            setValidFN(true)
            firstNameAlert.current.textContent = ""
        }
        else {
            setValidFN(false)
            firstNameAlert.current.textContent = "*First name cannot be empty"
        }
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
        if (e.target.value.length > 0) {
            setValidLN(true)
            lastNameAlert.current.textContent = ""
        }
        else {
            setValidLN(false)
            lastNameAlert.current.textContent = "*Last name cannot be empty"
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        let numValue = value.replace(/\D/g, "")
        let newSSN = numValue
        if (numValue.length >= 9) {
            const firstChar = numValue.charAt(0)
            for (let i = 0; i < numValue.length; i++) {
                if (numValue.charAt(i) !== firstChar) {
                    ssnAlert.current.textContent = ""
                    setSSN(newSSN)
                    setValidSSN(true)
                    return
                }
            }
            ssnAlert.current.textContent = "*All digits must not be the same number"
            setValidSSN(false)
        }
        setValidSSN(false)
        setSSN(newSSN)
    }


    const format = (v) => {
        v = v.slice(0, 11).replace(/-/g, "")
        if (v.length <= 3) {
            return v
        }
        if (v.length > 3 && v.length <= 5) {
            return `${v.slice(0, 3)}-${v.slice(3)}`
        }
        if (v.length > 5) {
            return `${v.slice(0, 3)}-${v.slice(3, 5)}-${v.slice(5)}`
        }
    }

    const handleDateChange = (e) => {
        setSaveDate(e.target.value)
        const selectedDate = new Date(e.target.value)
        const d = new Date(Date.now() - selectedDate.getTime())
        const years = d.getFullYear() - 1970
        if (years > 125 || years < 18) {
            dateAlert.current.textContent = "*Age must be in between 125-18"
            setValidDOB(false)
        }
        else {
            dateAlert.current.textContent = ""
            setValidDOB(true)
        }
    }
    const handleSubmit = () => {
        setFirstLoad(false)
        if (validSSN && validDOB) {
            window.localStorage.setItem('ssn', SSN)
            window.localStorage.setItem('date', saveDate)
            window.localStorage.setItem('validDOB', validDOB)
            window.localStorage.setItem('validSSN', validSSN)
            window.localStorage.setItem('firstName', firstName)
            window.localStorage.setItem('lastName', lastName)
            window.localStorage.setItem('page1Loaded', firstLoad)
            window.localStorage.setItem('validFN', validFirstName)
            window.localStorage.setItem('validLN', validLastName)
            navigate('/page2')
        }
        if (!validSSN)
            ssnAlert.current.textContent = "*Please enter valid SSN"
        if (!validDOB)
            dateAlert.current.textContent = "*Please enter valid DOB"
        if (!validFirstName)
            firstNameAlert.current.textContent = "*First name cannot be empty"
        if (!validLastName)
            lastNameAlert.current.textContent = "*Last name cannot be empty"

    }
    useEffect(() => {
        if (window.localStorage.getItem('ssn') != null) {
            setSSN(window.localStorage.getItem('ssn'))
        }
        setSaveDate(window.localStorage.getItem('date'))
        setValidDOB(JSON.parse(window.localStorage.getItem('validDOB')))
        setValidSSN(JSON.parse(window.localStorage.getItem('validSSN')))
        setFirstName(window.localStorage.getItem('firstName'))
        setLastName(window.localStorage.getItem('lastName'))
        setValidFN(JSON.parse(window.localStorage.getItem('validFN')))
        setValidLN(JSON.parse(window.localStorage.getItem('validLN')))
        if (window.localStorage.getItem('page1Loaded') != null) {
            setFirstLoad(JSON.parse(window.localStorage.getItem('page1Loaded')))
        }
    }, [])


    useEffect(() => {
        if (firstLoad===false) {
            setNext(!(validSSN && validDOB && validFirstName && validLastName))
        }
        
    },[validFirstName,validLastName,validSSN,validDOB,firstLoad])



    return (
        <div className="container">
        <h2>Loan Application(1/2)</h2>
            <form autoComplete="on">
                <div className="row">
                    <div className="col-sm">
                        <label>First Name</label>
                        <input type="text" class="form-control" required="required" placeholder="First Name" onChange={handleFirstName} value={firstName} />
                        <small ref={firstNameAlert}></small>
                    </div>
                    <div class="col-sm">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input type="text" class="form-control" placeholder="Last Name" required="required" onChange={handleLastName} value={lastName} />
                        <small ref={lastNameAlert}></small>
                    </div>
                </div>
                <div className="row">
                    <div class="col-sm">
                        <label >Date of Birth</label>
                        <input type="date" class="form-control" required="required" onChange={e => handleDateChange(e)} value={saveDate} />
                        <small ref={dateAlert}></small>
                    </div>
                    <div class="col-sm">
                        <label>SSN <sp /><small>xxx-xx-xxxx</small></label>
                        <input type="text" class="form-control" required="required" onChange={handleChange} value={format(SSN)} maxlength="11" placeholder="SSN"/>
                        <small ref={ssnAlert}></small>
                    </div>
                </div>
                <br />
            </form>
            <div className="col-sm right_button"><button class="btn btn-primary" disabled={disabledNext} onClick={handleSubmit}>Next &gt;</button></div>
        </div>
    );
}
