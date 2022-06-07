import { RequestHandler, Response,Request, NextFunction } from 'express';

import {Questionnaire} from "../models/Questionnaire";

const QUEST: Questionnaire[] = [];
export const checkCredit:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.passportData)
        const fullName = (req.body as { fullName:string } ).fullName;
        const passportData = (req.body as { passportData:string } ).passportData;
        const age = (req.body as { age:number } ).age;
        const autoAge = (req.body as { autoAge:number } ).autoAge;
        const criminalRecord = (req.body as { criminalRecord:string } ).criminalRecord;
        const creditSumm = (req.body as { creditSumm:number } ).creditSumm;
        const goal = (req.body as { goal:string } ).goal;
        const employment = (req.body as { employment:string } ).employment;
        const otherCredits = (req.body as { otherCredits:string } ).otherCredits;
        const collateralInfo = (req.body as { collateralInfo:string } ).collateralInfo;

        let summ = 0;

        if(age > 20 && age < 29 && creditSumm < 1000000){
            summ += 12;
        }
        else if (age > 20 && age < 29 && creditSumm >= 1000000 && creditSumm <=3000000){
            summ += 9;
        }
        else if (age > 20 && age < 29 && creditSumm >3000000){

        }
        else if (age >= 29 && age <= 59){
            summ += 14;
        }
        else if (age >= 60 && age <= 72 && collateralInfo !== "Без залога"){
            summ += 8;
        }

        if(criminalRecord === "Есть справка об отсутствии судимости"){
            summ += 15;
        }

        if(employment === "Трудоустроен по трудовому договору"){
            summ += 14;
        }
        else if (employment === "Собственное ИП"){
            summ += 12;
        }
        else if (employment === "Фрилансер"){
            summ += 8;
        }
        else if (employment === "Пенсионер" && age < 70){
            summ += 5;
        }

        if(goal === "Потребительский кредит"){
            summ +=14;
        }
        else if(goal === "Недвижимость"){
            summ +=8;
        }
        else if(goal === "Перекредитование"){
            summ +=12;
        }

        if(collateralInfo === "Недвижимость"){
            summ += 14;
        }
        else if (collateralInfo === "Автомобиль" && autoAge <= 3){
            summ +=8;
        }
        else if (collateralInfo === "Автомобиль" && autoAge > 3){
            summ +=3;
        }
        else if (collateralInfo === "Поручительство" && autoAge > 3){
            summ +=12;
        }

        if(otherCredits === "Нет" && goal !== "Перекредитование"){
            summ +=15;
        }

        if(creditSumm >=0 && creditSumm <= 1000000){
            summ += 12;
        }
        else if(creditSumm >=1000001 && creditSumm <= 5000000){
            summ += 14;
        }
        else if(creditSumm >=5000001 && creditSumm <= 10000000){
            summ += 8;
        }

        let message;

        if(summ < 80){
            message = "Кредит отклонен"
        }
        else if (summ >=80 && summ <= 83){
            message = "Кредит одобрен со ставкой 80 - 30%"
        }
        else if (summ >=84 && summ <= 87){
            message = "Кредит одобрен со ставкой 84 - 26%"
        }
        else if (summ >=88 && summ <= 91){
            message = "Кредит одобрен со ставкой 88 - 22%"
        }
        else if (summ >=92 && summ <= 95){
            message = "Кредит одобрен со ставкой 92 - 19%"
        }
        else if (summ >=96 && summ <= 99){
            message = "Кредит одобрен со ставкой 96 - 15%"
        }
        else if (summ >=100){
            message = "Кредит одобрен со ставкой 100 - 12,5%"
        }

        return res.status(200).json({
            message,
            summ,
        })
    } catch (e) {
        console.log(e)
    }
}