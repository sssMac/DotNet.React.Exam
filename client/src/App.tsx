import React, {useEffect, useState} from 'react';
import './App.css';
import './PanelsUI-v2.1.min.css';
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

function App() {
    const crimes =[[
        { id: 1, passNum: "1234 123123",criminalRec: "Есть справка об отсутствии судимости" },
        { id: 2, passNum: "1111 111111",criminalRec: "Нет справки"},
        { id: 3, passNum: "3333 333333",criminalRec: null }]]



    const formik = useFormik({
        initialValues:{
            fullName: "",
            pasSerNum: "",
            issuedBy:"",
            issuedDate: "",
            regInfo: "",
            age: '',
            autoAge: '',
            criminalRecord: "",
            creditSumm: '',
            goal: "",
            employment: "",
            otherCredits: "",
            collateralInfo: "",

        },validationSchema: yup.object({
            fullName: yup.string().required("*").matches(/([А-ЯЁ][а-яё]+[\-\s]?){3,}/, "Не корректно введено Ф.И.О").max(50),
            pasSerNum: yup.string().required("*").matches(/\d{4}\s\d{6}/, "Не корректные данные").max(11, "Не корректные данные"),
            issuedBy: yup.string().min(10, "Слишком коротко").required("*").max(50),
            issuedDate: yup.string().required("*").matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, "Пример даты: ДД.ММ.ГГГГ").max(50),
            regInfo: yup.string().required("*").matches(/^(ул.).+/, "Должно начинаться с ул.").max(50),
            age: yup.number().min(21, "Не подходящий возраст").required("*").max(50),
            autoAge: yup.number().min(0).max(50),
            criminalRecord: yup.string().required("*").max(50),
            creditSumm: yup.number().required("*").min(0).max(20000000),
            goal: yup.string().required("*").max(50),
            employment: yup.string().required("*").max(50),
            otherCredits: yup.string().required("*").max(50),
            collateralInfo: yup.string().required("*").max(50),

        }),
        onSubmit: ({fullName,pasSerNum,issuedBy,issuedDate,regInfo,age,autoAge,criminalRecord,creditSumm,goal,employment,otherCredits,collateralInfo}) => {
            let flag = false;
            for(let key in crimes[0]){
                if(crimes[0][key].passNum === pasSerNum && crimes[0][key].criminalRec === criminalRecord){
                    flag = true;
                }
            }
            if(flag){
            const passportData = `${pasSerNum} ${issuedBy} ${issuedDate} ${regInfo}`
            const checkCredit = async () => {
                try {
                    const response = await axios.post(
                        "http://localhost:5001/Credit/creditCheck",
                        {
                            fullName,passportData,age,autoAge,criminalRecord,creditSumm,goal,employment,otherCredits,collateralInfo
                        }
                    );
                    alert(`${response.data.message} \n ${response.data.summ}`)
                } catch (e) {
                    alert(e);
                }
            }
            checkCredit()}
            else{
                alert("Заявление о судимости не верно")
            }
        }
    })

    useEffect(()=> {

    })

    const hidenInput = {
        display: 'none',
    };
    const openInput = {
        display: 'block',
    };



    return (
        <div className="modal active">
            <form className="modal_wrapper bg-light" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="heading color-secondary-dark">Мгновенный кредит</div>

                <div className="block" data-label="Hello world">
                    <input
                        className="input"
                        placeholder="Ф.И.О."
                        name="fullName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        autoComplete="off"
                    />
                </div>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.fullName && formik.errors.fullName ? (
                            formik.errors.fullName
                        ) : null}
                    </div>
                </div>
                <div className="block" aria-label="Hello world">
                    <input
                        className="input"
                        type="text"
                        placeholder="Возраст"
                        name="age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                        autoComplete="off"
                    />
                </div>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.age && formik.errors.age ? (
                            formik.errors.age
                        ) : null}
                    </div>
                </div>
                <div className="horizontal">
                <input
                    className="input"
                    type="text"
                    placeholder="Серия и номер паспорта"
                    name="pasSerNum"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pasSerNum}
                    autoComplete="off"
                />
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.pasSerNum && formik.errors.pasSerNum ? (
                            formik.errors.pasSerNum
                        ) : null}
                    </div>
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder="Кем выдан"
                    name="issuedBy"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issuedBy}
                    autoComplete="off"
                />
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.issuedBy && formik.errors.issuedBy ? (
                            formik.errors.issuedBy
                        ) : null}
                    </div>
                </div>
                </div>
                <div className="horizontal">
                <input
                    className="input"
                    type="text"
                    placeholder="Дата выдачи"
                    name="issuedDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issuedDate}
                    autoComplete="off"
                />
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.issuedDate && formik.errors.issuedDate ? (
                            formik.errors.issuedDate
                        ) : null}
                    </div>
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder="Информация о прописке"
                    name="regInfo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.regInfo}
                    autoComplete="off"
                />
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.regInfo && formik.errors.regInfo ? (
                            formik.errors.regInfo
                        ) : null}
                    </div>
                </div>
                </div>
                <select
                    className="input"
                    placeholder="Трудоустройство"
                    name="employment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.employment}
                >
                    <option value="" label='Статус работы...'> </option>
                    <option value="Трудоустроен по трудовому договору">Трудоустроен по трудовому договору</option>
                    <option value="Собственное ИП">Собственное ИП</option>
                    <option value="Фрилансер">Фрилансер</option>
                    <option value="Пенсионер">Пенсионер</option>
                    <option value="Безработный">Безработный</option>
                </select>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.employment && formik.errors.employment ? (
                            formik.errors.employment
                        ) : null}
                    </div>
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder="Сумма кредита"
                    name="creditSumm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.creditSumm}
                    autoComplete="off"
                />
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.creditSumm && formik.errors.creditSumm ? (
                            formik.errors.creditSumm
                        ) : null}
                    </div>
                </div>
                <select
                    className="input"
                    placeholder="Цель"
                    name="goal"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.goal}
                >
                    <option value="" label="Выберите цель..."></option>
                    <option value="Потребительский кредит">Потребительский кредит</option>
                    <option value="Недвижимость">Недвижимость</option>
                    <option value="Перекредитование">Перекредитование</option>
                </select>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.goal && formik.errors.goal ? (
                            formik.errors.goal
                        ) : null}
                    </div>
                </div>

                <select
                    className="input"
                    placeholder="Сведения о судимости"
                    name="criminalRecord"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.criminalRecord}
                >
                    <option value="" label="Сведения..."></option>
                    <option value="Есть справка об отсутствии судимости">Есть справка об отсутствии судимости</option>
                    <option value="Нет справки">Нет справки</option>
                </select>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.criminalRecord && formik.errors.criminalRecord ? (
                            formik.errors.criminalRecord
                        ) : null}
                    </div>
                </div>

                <select
                    className="input"
                    placeholder="Наличие других кредитов"
                    name="otherCredits"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otherCredits}
                >
                    <option value="" label="Наличие других кредитов..."></option>
                    <option value="Да">Да</option>
                    <option value="Нет">Нет</option>
                </select>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.otherCredits && formik.errors.otherCredits ? (
                            formik.errors.otherCredits
                        ) : null}
                    </div>
                </div>

                <select
                    className="input"
                    placeholder="Залог"
                    name="collateralInfo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.collateralInfo}
                >
                    <option value="" label="Залог..."></option>
                    <option value="Недвижимость">Недвижимость</option>
                    <option value="Автомобиль">Автомобиль</option>
                    <option value="Поручительство">Поручительство</option>
                </select>

                <input
                    style={formik.values.collateralInfo === "Автомобиль"? openInput : hidenInput}
                    className="input"
                    type="text"
                    placeholder="Возраст авто"
                    name="autoAge"
                    required={formik.values.collateralInfo === "Автомобиль"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.autoAge}
                    autoComplete="off"
                />
                <div  className="validation">
                    <div className="color-danger error">
                        {formik.touched.autoAge && formik.errors.autoAge ? (
                            formik.errors.autoAge
                        ) : null}
                    </div>
                </div>
                <div className="validation">
                    <div className="color-danger error">
                        {formik.touched.collateralInfo && formik.errors.collateralInfo ? (
                            formik.errors.collateralInfo
                        ) : null}
                    </div>
                </div>

                <button type="submit" className="button dark color-green" onClick={() => {

                }}> Submit
                </button>

                <button type="reset" className="button dark color-red" onClick={() => {
                    formik.resetForm();
                }}> Reset
                </button>

            </form>
        </div>
    );
}

export default App;
