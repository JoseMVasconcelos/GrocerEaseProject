// Cadastro.
const signInView = (req, res) => {
    res.send("signIn");
}

// Login.
const loginView = (req, res) => {
    res.send("login");
}

// Exportando os métodos.
module.exports = {
    signInView,
    loginView
}