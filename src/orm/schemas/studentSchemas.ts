import { model, Schema, Types } from "mongoose";
import { Student } from "../../interfaces/Student";

export const studentsSchemas = new Schema<Student>({
    _id: { type: Types.ObjectId, auto: true },
    userName:{ type: String, required: true },
    sid:{ type: String, required: true },
    name:{ type: String, required: true },
    department:{ type: String, required: true },
    grade:{ type: String, required: true },
    class:{ type: String, required: true },
    Email:{ type: String, required: true },
    absences:{ type: Number, required: false },
},{ collection: 'studentlist' });

export const studentsModel = model<Student>('studentlist', studentsSchemas);