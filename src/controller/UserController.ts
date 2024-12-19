import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async findAll(req: Request, res: Response) {
        const response: resp<Array<DBResp<Student>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
    
        try {
            // 獲取學生數據
            const students = await this.service.findAll();
    
            if (students && students.length > 0) {
                response.body = students;
                response.message = "Students retrieved successfully.";
                return res.status(200).send(response);
            } else {
                // 如果數據為空
                response.code = 404;
                response.message = "No students found.";
                return res.status(404).send(response);
            }
        } catch (error) {
            // 捕獲服務器錯誤
            console.error("Error retrieving students:", error);
            response.code = 500;
            response.message = "Internal server error.";
            return res.status(500).send(response);
        }
    }
    

    public async insertOne(Request: Request, Response: Response) {
        const resp = await this.service.insertOne(Request.body)
        Response.status(resp.code).send(resp)
    }
    public async deleteById(Request: Request, Response: Response) {
        const resp = await this.service.deleteById(Request.query.id as string)
        Response.status(resp.code).send(resp)
    }
    public async updateNameByID(Request: Request, Response: Response) {
        console.log('Request Body:', Request.body);  // 打印請求的body
        const resp = await this.service.updateNameByID(Request.body.id,Request.body)
        Response.status(resp.code).send(resp)
    }

}