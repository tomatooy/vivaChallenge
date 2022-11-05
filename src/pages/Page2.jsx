import React from 'react'
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ModalComponent from "../Modal"

export default function Page2() {
    const navigate = useNavigate()
    const emploryerNameRef = useRef()
    const salaryRef = useRef()
    const [loanOffer, changeOffer] = useState("3a")
    const [firstLoad, setFirstLoad] = useState(true)
    const [employerName, setEmployerName] = useState("")
    const [salary, setSalary] = useState()
    const [validSalary, setValidSalary] = useState(false)
    const [validEmployerName, setValidEmployerName] = useState(false)
    const [workStatus, setWorkStatus] = useState("fulltime")
    const [disabledNext, setNext] = useState(false)


    const handleBack = () => {
        setFirstLoad(false)
        window.localStorage.setItem('employerName', employerName)
        window.localStorage.setItem('salary', salary)
        window.localStorage.setItem('validEmployerName', validEmployerName)
        window.localStorage.setItem('validSalary', validSalary)
        window.localStorage.setItem('workStatus', workStatus)
        window.localStorage.setItem('page2Loaded', firstLoad)
        navigate('/')
    }
    useEffect(() => {
        if(!JSON.parse(window.localStorage.getItem("firstLoad"))){
        setEmployerName(window.localStorage.getItem('employerName'))
        setSalary(window.localStorage.getItem('salary'))
        if(window.localStorage.getItem('validEmployerName')!= null){
            setValidEmployerName(JSON.parse(window.localStorage.getItem('validEmployerName')))
        }
        if(window.localStorage.getItem('validSalary')!= null){
            setValidSalary(JSON.parse(window.localStorage.getItem('validSalary')))
        }
        if(window.localStorage.getItem('workStatus')!=null){
        setWorkStatus(window.localStorage.getItem('workStatus'))
        }
        if(window.localStorage.getItem('page2Loaded')!=null){
            setFirstLoad(JSON.parse(window.localStorage.getItem('page2Loaded')))
        }
        }
    }, [])

    const onSalaryChange = (e) => {
        if (e.target.value >= 1000) {
            setValidSalary(true)
            setSalary(e.target.value)
            salaryRef.current.textContent = ""
        }
        else {
            setValidSalary(false)
            setSalary(e.target.value)
            salaryRef.current.textContent = "*salary must be greater than 1000"
        }
    }

    const handleEmployerName = (e) => {
        if (e.target.value.length > 0) {
            setEmployerName(e.target.value)
            setValidEmployerName(true)
            emploryerNameRef.current.textContent = ""
        }
        else {
            setEmployerName(e.target.value)
            setValidEmployerName(false)
            emploryerNameRef.current.textContent = "*Employer name cannot be Empty"
        }
    }

    useEffect(() => {
        if (validSalary && validEmployerName) {
            console.log(workStatus)
            setNext(false)
            if (salary >= 15000 && workStatus === "fulltime") {
                changeOffer("3b")
            }
            else {
                changeOffer("3a")
            }
            return
        }
        setNext(true)

    }, [validSalary, validEmployerName, salary, workStatus, loanOffer])

    useEffect(() => {
        if (!firstLoad)
            setNext(!(validSalary && validEmployerName))
    }, [validSalary, validEmployerName, firstLoad])

    const workStatChange = (selected) => {
        setWorkStatus(selected)
    }

    return (
        <div className="container">
        <h2>Loan Application(2/2)</h2>
            <form>
                <div className="row">
                    <label>Employer Name</label>
                    <input type="text" class="form-control" required="required" placeholder="Employer Name" value={employerName} onChange={handleEmployerName} />
                    <small ref={emploryerNameRef}></small>
                </div>
                <div className="row">
                    <label>Gross Salary</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" min="0" class="form-control" onChange={onSalaryChange} value={salary} />
                    </div>
                    <small ref={salaryRef}></small>
                </div>
                <div className="row">
                    <label>Work Status</label>
                    <select className="form-control" onChange={e => workStatChange(e.target.value)} value={workStatus}>
                        <option value="fulltime">Full-Time</option>
                        <option value="parttime">Part-Time</option>
                    </select>
                </div>
                <div className="rowButton">
                    <button class="btn btn-primary" type="submit" onClick={handleBack} >&lt; Back</button>
                    <ModalComponent disabledNext={disabledNext} loanOffer={loanOffer} />
                </div>
            </form>

        </div>
    )
}
