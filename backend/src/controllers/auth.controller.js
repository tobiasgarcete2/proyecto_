const { newConex } = require("../db/db.js");
const generarJWT = require("../helpers/generarJWT.js");

const registerUser = async (req, res) => {
    const { nombre_empresa, correo, password, role } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!correo || !password || !role) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Insertar los datos en la tabla 'usuarios'
        const [userResult] = await conex.query(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", 
            [role === 'empresa' ? nombre_empresa : null, correo, password]
        );

        const userId = userResult.insertId; // Obtener el ID del usuario recién insertado

        // Insertar en la tabla auxiliar correspondiente según el rol
        if (role === 'empresa') {
            await conex.query(
                "INSERT INTO users_company (CUIT,id_user) VALUES (?,?)", 
                [CUIT,userId]
            );
        } else if (role === 'desempleado') {
            await conex.query(
                "INSERT INTO user_peoples (curriculum,CUIL,id_user) VALUES (?,?,?)", 
                [curriculum,CUIL,userId]
            );
        } else {
            return res.status(400).send("El rol especificado no es válido");
        }

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Generar el token JWT
        const token = await generarJWT({ correo });

        // Enviar el token como respuesta
        res.json("Usuario registrado correctamente");
    } catch (error) {
        // Manejar errores
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};


const login = async (req, res) => {
    const { nombre_empresa, password } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!nombre_empresa || !password) {
        return res.status(400).send("Por favor, complete todos los campos del formulario");
    }

    try {
        // Crear una nueva conexión a la base de datos
        const conex = await newConex();

        // Consulta para verificar las credenciales del usuario
        const [result] = await conex.query("SELECT id_usuario, username, password_hash FROM usuarios WHERE username = ?", [nombre_empresa]);

        // Si no se encuentra el usuario, devolver un mensaje indicando que debe registrarse
        if (result.length === 0) {
            await conex.end();
            return res.status(401).json({ message: "Usuario no registrado. Por favor, regístrese." });
        }

        // Verificar la password_hash (sin cifrar)
        const usuario = result[0];
        if (password !== usuario.password_hash) {
            await conex.end();
            return res.status(401).json({ message: "El usuario o la contraseña no coinciden" });
        }

        // Generar el token JWT con el ID del usuario
        const token = await generarJWT({ id: usuario.id_usuario });

        // Cerrar la conexión a la base de datos
        await conex.end();

        // Retornar el token con un mensaje al cliente.
        res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        // Manejar errores
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = { registerUser, login };
