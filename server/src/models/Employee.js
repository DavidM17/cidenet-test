const {Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    primer_apellido: {type: String, require: true},
    segundo_apellido: {type: String, require: true},
    primer_nombre: {type: String, require: true},
    otros_nombres: {type: String, require: true},
    pais_empleo: {type: String, require: true},
    tipo_identificacion: {type: String, require: true},
    numero_identificacion: {type: Number, require: true, unique: true},
    correo: {type: String, require: true},
    fecha_ingreso: {type: String, require: true},
    area: {type: String, require: true},
    estado: {type: String, require: true},
    fecha_registro: {type: String, require: true},
    fecha_edicion: {type: String, require: true},

},{
    timestamps: true,
    versionKey: false
})


module.exports = model("Employee",employeeSchema)
